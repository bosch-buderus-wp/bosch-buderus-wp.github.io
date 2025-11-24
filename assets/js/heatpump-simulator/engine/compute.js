// Engine: heat pump compute logic (pure, no DOM)
// Exposes window.HeatpumpEngine = { computeState, DEFAULTS, CAP_MODELS_W35 }
(function () {
  const DEFAULTS = {
    hpModel: "4 kW",
    stdOutdoorTempC: -13.6,
    flowTempAt20C: 22,
    flowTempAtStdOutdoorC: 39,
    buildingHeatLoadAtStdKw: 4.7,
    heatingLimitC: 15,
    primarySpreadK: 3.5,
    heatingPumpPressureMbar: 150,
    heatingFlowAt150mbarLph: 750,
    ambientTempC: 0.0,
    // Modulation mode:
    //  - "capacity" (default): modulation from building load vs. available thermal capacity
    //  - "electrical": modulation from electrical power (incl. base loads) vs. model electrical max
    modulationMode: "electrical",
  };

  // Physical constants and approaches
  const CONST = {
    cp_J_per_kgK: 4180, // J/(kg*K)
    etaCarnot: 0.55,
    TE_APPROACH_K: 7, // K
    TC_APPROACH_K: 5, // K
    SUPERHEAT_K: 10, // K
    // Lift factor increases efficiency at low lift and decreases at high lift around a reference
    ETA_LIFT_FACTOR_PER_K: 0.016, // 1/K
    ETA_LIFT_REF_K: 47.6, // K (~A7/W35 typical lift)
    dp_ref_mbar: 150, // mbar
  };
  const {
    cp_J_per_kgK: cp,
    etaCarnot: eta_carnot,
    TE_APPROACH_K: TE_APPROACH,
    TC_APPROACH_K: TC_APPROACH,
    SUPERHEAT_K,
    ETA_LIFT_FACTOR_PER_K,
    ETA_LIFT_REF_K,
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
    "10 kW": [
      { Ta: -10, kW: 9.99 },
      { Ta: -7, kW: 9.57 },
      { Ta: 2, kW: 11.66 },
      { Ta: 7, kW: 12.67 },
    ],
    "12 kW": [
      { Ta: -10, kW: 11.82 },
      { Ta: -7, kW: 11.56 },
      { Ta: 2, kW: 12.61 },
      { Ta: 7, kW: 12.9 },
    ],
  };

  // Additional anchor points at A7/W55 provided by spec (kW)
  const CAP_A7_W55 = {
    "4 kW": 4.53,
    "5 kW": 6.18,
    "7 kW": 7.45,
    "10 kW": 12.07,
    "12 kW": 12.84,
  };

  // Electrical profiles per model to support Pel-based modulation mapping
  const ELECTRICAL_PROFILES = {
    "4 kW": { minPowerConsW: 300, maxPowerConsW: 1340, minMod: 0.26 },
    "5 kW": { minPowerConsW: 300, maxPowerConsW: 2210, minMod: 0.18 },
    "7 kW": { minPowerConsW: 300, maxPowerConsW: 2510, minMod: 0.15 },
    "10 kW": { minPowerConsW: 500, maxPowerConsW: 4110, minMod: 0.13 },
    "12 kW": { minPowerConsW: 500, maxPowerConsW: 4780, minMod: 0.12 },
  };

  const COP_PARAMS = {
    "4 kW": {
      etaCarnot: 0.55,
      ETA_LIFT_FACTOR_PER_K: 0.0158,
      ETA_LIFT_REF_K: 47.6,
    },
    "5 kW": {
      etaCarnot: 0.534,
      ETA_LIFT_FACTOR_PER_K: 0.0211,
      ETA_LIFT_REF_K: 47.6,
    },
    "7 kW": {
      etaCarnot: 0.565,
      ETA_LIFT_FACTOR_PER_K: 0.0128,
      ETA_LIFT_REF_K: 47.6,
    },
    "10 kW": {
      etaCarnot: 0.657,
      ETA_LIFT_FACTOR_PER_K: -0.00767,
      ETA_LIFT_REF_K: 47.6,
    },
    "12 kW": {
      etaCarnot: 0.657,
      ETA_LIFT_FACTOR_PER_K: -0.00767,
      ETA_LIFT_REF_K: 47.6,
    },
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

  function flowTargetCurve(
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
  function din12831LoadScale(ambientTempC, heatingLimitC, theta_e_design_C) {
    // (θ_i − Ta) / (θ_i − θ_e,design) with protective denominator
    // No upper clamping: allow extrapolation colder than design (load > design)
    const denomK = Math.max(1, heatingLimitC - theta_e_design_C);
    const frac = (heatingLimitC - ambientTempC) / denomK;
    return Math.max(0, frac);
  }

  function computeBuildingHeatLoad_W(
    Q_design_W,
    ambientTempC,
    heatingLimitC,
    theta_e_design_C
  ) {
    /*
     * Building heat load model per DIN EN 12831:
     *   Φ_H(Ta) = Φ_design * (θ_i − Ta) / (θ_i − θ_e,design)
     * We do not clamp above 1 anymore: load can increase beyond design for Ta < θ_e,design.
     * Values are still clamped at 0 for Ta > θ_i.
     */
    const scale = din12831LoadScale(
      ambientTempC,
      heatingLimitC,
      theta_e_design_C
    );
    return Q_design_W * scale;
  }

  // --- Modulation & performance ---
  function computeThermalModulation(Q_load_target_W, Q_cap_max_W) {
    return clamp(Q_load_target_W / Math.max(1e-9, Q_cap_max_W), 0, 1);
  }

  // From the anchors, derive a base-load and an electrical max so that
  //   mod = (Pel + baseW) / pelMaxW
  // satisfies (Pel_anchor -> mod_anchor) and (Pel_full -> 1.0)
  function deriveElectricalBaseAndMax(modelName) {
    const p = ELECTRICAL_PROFILES[modelName];
    if (!p) return { baseW: 0, pelMaxW: Math.max(1e-6, 1) };
    const Pel0 = p.minPowerConsW; // minimal electrical power consumption at minimal modulation
    const m0 = p.minMod; // target minimal possible modulation fraction
    const PelF = p.maxPowerConsW; // total electrical at 100% modulation
    // Interpret PelF as total electrical max. Then choose pelMaxW = PelF and solve for baseW:
    //   m0 = (Pel0 + baseW) / PelF  => baseW = m0*PelF - Pel0
    const baseW = Math.max(0, m0 * PelF - Pel0);
    const pelMaxW = Math.max(1e-9, PelF);
    return { baseW, pelMaxW };
  }

  function computeElectricModulation(pelW, modelName) {
    const { baseW, pelMaxW } = deriveElectricalBaseAndMax(modelName);
    return (pelW + baseW) / Math.max(1e-9, pelMaxW);
  }

  function estimateCOP(
    T_primaryFlowOutC,
    ambientTempC,
    modelName = DEFAULTS.hpModel
  ) {
    // Mirror the existing thermodynamic estimate logic exactly
    const Te_elec = ambientTempC - TE_APPROACH;
    const Tc_elec = T_primaryFlowOutC + TC_APPROACH;
    const dT_lift_K = toK(Tc_elec) - toK(Te_elec);
    const COP_carnot = toK(Tc_elec) / dT_lift_K;

    // Adjust effective fraction of Carnot around a reference lift
    // If dT < ref: eta increases; if dT > ref: eta decreases.
    const cp_params = COP_PARAMS[modelName] || COP_PARAMS[DEFAULTS.hpModel];
    const eta_eff =
      cp_params.etaCarnot *
      (1 +
        cp_params.ETA_LIFT_FACTOR_PER_K *
          (cp_params.ETA_LIFT_REF_K - dT_lift_K));

    return eta_eff * COP_carnot;
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
    const k_h = k_h_from_calibration(params.heatingFlowAt150mbarLph);
    const mHeating_kgps = k_h * Math.sqrt(pumpPressureMbar / dp_ref);

    const deltaT_primaryK = Math.max(0.5, params.primarySpreadK);
    const designLoadW = Math.max(0, params.buildingHeatLoadAtStdKw) * 1000;

    // 1. Target heating flow temperature per linear curve between standard outdoor temperature and 20°C
    const heatingFlowTargetC = flowTargetCurve(
      ambientTempC,
      params.stdOutdoorTempC,
      params.flowTempAt20C,
      params.flowTempAtStdOutdoorC
    );

    // 2. Compute building heat load target per DIN EN 12831
    const heatingLimitC = params.heatingLimitC;
    const buildingLoadW = computeBuildingHeatLoad_W(
      designLoadW,
      ambientTempC,
      heatingLimitC,
      params.stdOutdoorTempC
    );

    // 3. Equivalent required secondary-side deltaT to satisfy building load
    const deltaT_heatingK = buildingLoadW / Math.max(1e-6, mHeating_kgps * cp);

    const Te = ambientTempC - TE_APPROACH;
    const T_suction = Te + SUPERHEAT_K;

    // Available heat at current modulation (with flow-temp derating)
    // const Q_available =
    //   capacityAt(ambientTempC, heatingFlowTargetC, params.hpModel) *
    //   1000 *
    //   modCapacity;
    // let Qh_cap = Math.max(0, Q_available);
    let Qh_cap = buildingLoadW;

    // 4. Primary-side flow from available heat and chosen spread
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

    // 5. Estimate COP
    const COP = estimateCOP(T_primaryFlowOutC, ambientTempC, params.hpModel);

    // 6. Compute electrical power Pel
    let Qh = Qh_cap;
    const Pel = Qh / Math.max(1e-9, COP);

    // 7.a Compute capacity-based modulation, smooth in ambient temperature
    // Capacity at current ambient and target flow temperature (linear derating from W35 to W55)
    const capMaxW =
      capacityAt(ambientTempC, heatingFlowTargetC, params.hpModel) * 1000;
    const modCapacity = computeThermalModulation(buildingLoadW, capMaxW);

    // 7.b Compute electrical-based modulation from Pel against model electrical max incl. base loads
    const modElectrical = computeElectricModulation(Pel, params.hpModel);

    const modulation =
      params.modulationMode === "electrical" ? modElectrical : modCapacity;

    const T_comp_out = T_suction + 0.85 * (Tc - Te); // TODO
    const Q_load = mHeating_kgps * cp * deltaT_heatingK;
    console.log(Q_load, buildingLoadW);

    return {
      inputs: {
        ambientTempC: ambientTempC,
        stdOutdoorTempC: params.stdOutdoorTempC,
        flowTempAt20C: params.flowTempAt20C,
        flowTempAtStdOutdoorC: params.flowTempAtStdOutdoorC,
        primarySpreadK: deltaT_primaryK,
        buildingHeatLoadAtStdKw: params.buildingHeatLoadAtStdKw,
        heatingPumpPressureMbar: pumpPressureMbar,
        heatingFlowAt150mbarLph: params.heatingFlowAt150mbarLph,
        hpModel: params.hpModel,
      },
      flows: { primaryMassFlow: mPrimary_kgps, heatingMassFlow: mHeating_kgps },
      heat: {
        heatingPowerW: Qh,
        buildingLoadW: Q_load,
        electricalPowerW: Pel,
        COP: COP,
      },
      derived: {
        modulation,
        modulationCapacity: modCapacity,
        modulationElectrical: modElectrical,
      },
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
    capacityAt,
    computeBuildingHeatLoad_W,
    flowTargetCurve,
    computeState,
    estimateCOP,
    COP_PARAMS,
    DEFAULTS,
    CAP_MODELS_W35,
    ELECTRICAL_PROFILES,
  };
  if (typeof window !== "undefined") {
    window.HeatpumpEngine = api;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})();
