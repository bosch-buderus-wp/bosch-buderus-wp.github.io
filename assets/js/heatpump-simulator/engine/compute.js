// Engine: heat pump compute logic (pure, no DOM)
// Exposes window.HeatpumpEngine = { computeState, DEFAULTS, CAP_MODELS_W35 }
(function () {
  const DEFAULTS = {
    ambientTempC: 0.0,
    stdOutdoorTempC: -13.6,
    flowTempAt20C: 22,
    flowTempAtStdOutdoorC: 39,
    primarySpreadK: 3.5,
    buildingHeatLoadAtStd_kW: 4.7,
    heatingPumpPressureMbar: 150,
    heatingFlowAt150mbar_lph: 750,
    capModel: "4 kW",
  };

  // Physical constants and approaches
  const CONST = {
    cp_J_per_kgK: 4180, // J/(kg*K)
    etaCarnot: 0.45,
    TE_APPROACH_K: 5, // K
    TC_APPROACH_K: 5, // K
    TE_APPROACH_ELEC_K: 3, // K
    TC_APPROACH_ELEC_K: 3, // K
    dp_ref_mbar: 150, // mbar
  };
  const {
    cp_J_per_kgK: cp,
    etaCarnot: eta_carnot,
    TE_APPROACH_K: TE_APPROACH,
    TC_APPROACH_K: TC_APPROACH,
    TE_APPROACH_ELEC_K: TE_APPROACH_ELEC,
    TC_APPROACH_ELEC_K: TC_APPROACH_ELEC,
    dp_ref_mbar: dp_ref,
  } = CONST;

  // Capacity curves at W35 provided by spec
  const CAP_MODELS_W35 = {
    "4 kW": [
      { Ta: -10, kW: 3.63 },
      { Ta: -7, kW: 3.92 },
      { Ta: 2, kW: 4.31 },
      { Ta: 7, kW: 4.99 },
    ],
    "5 kW": [
      { Ta: -10, kW: 5.45 },
      { Ta: -7, kW: 5.42 },
      { Ta: 2, kW: 6.43 },
      { Ta: 7, kW: 6.8 },
    ],
    "7 kW": [
      { Ta: -10, kW: 5.86 },
      { Ta: -7, kW: 6.71 },
      { Ta: 2, kW: 7.09 },
      { Ta: 7, kW: 7.97 },
    ],
  };

  // Additional anchor points at A7/W55 provided by spec (kW)
  const CAP_A7_W55 = {
    "4 kW": 4.53,
    "5 kW": 6.18,
    "7 kW": 7.45,
  };

  function clamp(x, a, b) {
    return Math.max(a, Math.min(b, x));
  }
  function toK(C) {
    return C + 273.15;
  }
  function k_h_from_calibration(m_h150_lph) {
    return m_h150_lph / 3600.0;
  }

  function hp_capacity_w35(Ta, pts) {
    if (!pts || !pts.length) return 0;
    if (Ta <= pts[0].Ta) {
      const slope = (pts[1].kW - pts[0].kW) / (pts[1].Ta - pts[0].Ta);
      return Math.max(0, pts[0].kW + slope * (Ta - pts[0].Ta));
    }
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i],
        b = pts[i + 1];
      if (Ta >= a.Ta && Ta <= b.Ta) {
        const t = (Ta - a.Ta) / (b.Ta - a.Ta);
        return a.kW + t * (b.kW - a.kW);
      }
    }
    const n = pts.length;
    const slope =
      (pts[n - 1].kW - pts[n - 2].kW) / (pts[n - 1].Ta - pts[n - 2].Ta);
    return Math.max(0, pts[n - 1].kW + slope * (Ta - pts[n - 1].Ta));
  }

  function flow_target_curve(
    ambientTempC,
    stdOutdoorTempC,
    flowTempAt20C,
    flowTempAtStdOutdoorC
  ) {
    const x0 = stdOutdoorTempC;
    const y0 = flowTempAtStdOutdoorC;
    const x1 = 20;
    const y1 = flowTempAt20C;
    const t = (ambientTempC - x0) / Math.max(1e-6, x1 - x0);
    const y = y0 + t * (y1 - y0);
    return Math.max(15, Math.min(60, y));
  }

  // --- Building load per DIN EN 12831 ---
  const DEFAULT_THETA_I_C = 20; // indoor reference temperature θ_i (approx. 20°C)

  function din12831LoadScale(ambientTempC, theta_i_C, theta_e_design_C) {
    // (θ_i − Ta) / (θ_i − θ_e,design) with protective denominator and clamping
    const denomK = Math.max(1, theta_i_C - theta_e_design_C);
    const frac = (theta_i_C - ambientTempC) / denomK;
    return clamp(frac, 0, 1);
  }

  function computeBuildingHeatLoad_W(
    Q_design_W,
    ambientTempC,
    theta_i_C,
    theta_e_design_C
  ) {
    /*
     * Building heat load model per DIN EN 12831:
     *   Φ_H(Ta) = Φ_design * (θ_i − Ta) / (θ_i − θ_e,design)
     * with clamping to [0, 1] for temperatures above θ_i or far below θ_e,design.
     */
    const scale = din12831LoadScale(ambientTempC, theta_i_C, theta_e_design_C);
    return Q_design_W * scale;
  }

  // --- Modulation & performance ---
  function computeModulation(Q_load_target_W, Q_cap_max_W) {
    return clamp(Q_load_target_W / Math.max(1e-9, Q_cap_max_W), 0, 1);
  }

  function estimateCOP(T_primaryFlowOutC, ambientTempC) {
    // Mirror the existing thermodynamic estimate logic exactly
    const Te_elec = ambientTempC - TE_APPROACH_ELEC;
    const Tc_elec = T_primaryFlowOutC + TC_APPROACH_ELEC;
    const dT_lift_K = Math.max(5, toK(Tc_elec) - toK(Te_elec));
    const COP_carnot = toK(Tc_elec) / dT_lift_K;
    return clamp(eta_carnot * COP_carnot, 1.0, 7.0);
  }

  // Compute derating slope per model from A7/W35 and A7/W55 anchors
  function computeDerateSlopePerK(modelName) {
    const pts = CAP_MODELS_W35[modelName];
    if (!pts) return 0;
    // Interpolate capacity at Ta=7°C for W35 curve
    const cap35_A7 = hp_capacity_w35(7, pts);
    const cap55_A7 = CAP_A7_W55[modelName];
    if (!cap55_A7 || cap35_A7 <= 0) return 0;
    // Linear derate: cap(Tflow) = cap35 * (1 - k*(Tflow-35)), with cap(55)=cap55
    // => k = (1 - cap55/cap35) / 20 [per K]
    return (1 - cap55_A7 / cap35_A7) / 20;
  }

  function capacityAt(Ta, Tflow, modelName) {
    const pts = CAP_MODELS_W35[modelName];
    if (!pts) return 0;
    const cap35 = hp_capacity_w35(Ta, pts);
    const k = computeDerateSlopePerK(modelName);
    const derate = 1 - k * (Tflow - 35);
    return Math.max(0, cap35 * derate);
  }

  function computeState(params) {
    // Inputs unpacking

    const ambientTempC = params.ambientTempC;
    const pumpPressureMbar = Math.max(20, params.heatingPumpPressureMbar);
    const k_h = k_h_from_calibration(params.heatingFlowAt150mbar_lph);
    const mHeating_kgps = k_h * Math.sqrt(pumpPressureMbar / dp_ref);

    const deltaT_primaryK = Math.max(0.5, params.primarySpreadK);
    const designLoadW = Math.max(0, params.buildingHeatLoadAtStd_kW) * 1000;

    // Target heating flow temperature per linear curve between standard outdoor temperature and 20°C
    const heatingFlowTargetC = flow_target_curve(
      ambientTempC,
      params.stdOutdoorTempC,
      params.flowTempAt20C,
      params.flowTempAtStdOutdoorC
    );

    // Capacity at current ambient and target flow temperature (linear derating from W35 to W55)
    const capMaxW =
      capacityAt(ambientTempC, heatingFlowTargetC, params.capModel) * 1000;

    // Compute building heat load target per DIN EN 12831
    const theta_i_C = DEFAULT_THETA_I_C;
    const buildingLoadW = computeBuildingHeatLoad_W(
      designLoadW,
      ambientTempC,
      theta_i_C,
      params.stdOutdoorTempC
    );

    // Equivalent required secondary-side deltaT to satisfy building load
    const deltaT_heatingK = buildingLoadW / Math.max(1e-6, mHeating_kgps * cp);

    // Analytic modulation, smooth in ambient temperature
    const mod = computeModulation(buildingLoadW, capMaxW);

    const Te = ambientTempC - TE_APPROACH;
    const T_suction = Te + 5;

    // Available heat at current modulation (with flow-temp derating)
    const Q_available =
      capacityAt(ambientTempC, heatingFlowTargetC, params.capModel) *
      1000 *
      clamp(mod, 0, 1);
    let Qh_cap = Math.max(0, Q_available);

    // Primary-side flow from available heat and chosen spread
    let mPrimary_kgps = Qh_cap > 0 ? Qh_cap / (cp * deltaT_primaryK) : 0;

    // Hydronic temperature network resolution
    let T_primaryFlowOutC, T_primaryReturnInC, T_heatingFlowC, T_heatingReturnC;
    if (mPrimary_kgps <= 1e-6) {
      T_heatingFlowC = heatingFlowTargetC;
      T_heatingReturnC = T_heatingFlowC - deltaT_heatingK;
      T_primaryReturnInC = T_heatingReturnC;
      T_primaryFlowOutC = T_primaryReturnInC + deltaT_primaryK;
    } else {
      T_heatingReturnC = heatingFlowTargetC - deltaT_heatingK;
      if (mPrimary_kgps >= mHeating_kgps) {
        const f_down =
          (mPrimary_kgps - mHeating_kgps) / Math.max(1e-6, mPrimary_kgps);
        T_primaryReturnInC = T_heatingReturnC + f_down * deltaT_primaryK;
        T_primaryFlowOutC = T_primaryReturnInC + deltaT_primaryK;
        T_heatingFlowC = T_primaryFlowOutC;
      } else {
        const f_up = mPrimary_kgps / Math.max(1e-6, mHeating_kgps);
        T_primaryReturnInC = T_heatingReturnC;
        T_primaryFlowOutC = T_primaryReturnInC + deltaT_primaryK;
        T_heatingFlowC = T_heatingReturnC + f_up * deltaT_primaryK;
      }
    }
    if (T_primaryFlowOutC < T_primaryReturnInC) {
      T_primaryFlowOutC = T_primaryReturnInC + Math.abs(deltaT_primaryK);
    }

    const Tc = T_primaryFlowOutC + TC_APPROACH;

    // COP estimation
    const COP = estimateCOP(T_primaryFlowOutC, ambientTempC);

    let Qh = Qh_cap;
    const Pel = Qh / COP;

    const T_comp_out = T_suction + 0.9 * (Tc - Te) + 5;
    const Q_load = mHeating_kgps * cp * deltaT_heatingK;

    return {
      inputs: {
        ambientTempC: ambientTempC,
        stdOutdoorTempC: params.stdOutdoorTempC,
        flowTempAt20C: params.flowTempAt20C,
        flowTempAtStdOutdoorC: params.flowTempAtStdOutdoorC,
        primarySpreadK: deltaT_primaryK,
        buildingHeatLoadAtStd_kW: params.buildingHeatLoadAtStd_kW,
        heatingPumpPressureMbar: pumpPressureMbar,
        heatingFlowAt150mbar_lph: params.heatingFlowAt150mbar_lph,
        capModel: params.capModel,
      },
      flows: { primaryMassFlow: mPrimary_kgps, heatingMassFlow: mHeating_kgps },
      heat: {
        heatingPowerW: Qh,
        buildingLoadW: Q_load,
        electricalPowerW: Pel,
        COP: COP,
      },
      derived: { modulation: mod },
      temps: {
        evapTempC: Te,
        suctionTempC: T_suction,
        condTempC: Tc,
        compOutTempC: T_comp_out,
        primaryFlowTempC: T_primaryFlowOutC,
        primaryReturnTempC: T_primaryReturnInC,
        heatingFlowTempC: T_heatingFlowC,
        heatingReturnTempC: T_heatingReturnC,
      },
    };
  }

  const api = {
    computeState,
    DEFAULTS,
    CAP_MODELS_W35,
  };
  if (typeof window !== "undefined") {
    window.HeatpumpEngine = api;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})();
