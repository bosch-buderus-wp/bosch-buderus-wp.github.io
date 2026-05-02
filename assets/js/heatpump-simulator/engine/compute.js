// Engine: heat pump compute logic (pure, no DOM)
// Exposes window.HeatpumpEngine = { computeState, DEFAULTS, THERMAL_PROFILES, ... }
(function () {
  /**
   * Default simulation parameters.
   */
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
    modulationMode: "electrical", // "capacity" | "electrical"
    efficiencyModulation: "on", // "off" | "on"
  };

  /**
   * Physical constants and simulation approaches.
   */
  const CONST = {
    cp_J_per_kgK: 4180, // J/(kg*K)
    TE_APPROACH_K: 7, // Evaporator temperature approach
    TC_APPROACH_K: 4, // Condenser temperature approach
    SUPERHEAT_K: 10, // Degree of superheat
    SYSTEM_OVERHEAD_FACTOR: 1.03, // System overhead factor (piping losses, aux pumps, defrosting)
    dp_ref_mbar: 150, // Reference pressure for hydraulic flow scaling
  };

  const {
    cp_J_per_kgK: cp,
    TE_APPROACH_K: TE_APPROACH,
    TC_APPROACH_K: TC_APPROACH,
    SUPERHEAT_K,
    ETA_LIFT_REF_K,
    dp_ref_mbar: dp_ref,
  } = CONST;

  // Thermal performance profiles (Capacity and COP anchors at W35)
  const THERMAL_PROFILES = {
    "4 kW": {
      "-10": { Qmax_kW: 3.63, COPmax: 2.7 },
      "-7": { Qmax_kW: 3.92, COPmax: 2.89 },
      "+2": { Qmax_kW: 4.31, COPmax: 3.21, Qlower_kW: 2.09, COPlower: 3.94 },
      "+7": {
        Qmax_kW: 4.99,
        COPmax: 3.59,
        Qlower_kW: 2.84,
        COPlower: 4.85,
        QmaxW55: 4.53,
      },
    },
    "5 kW": {
      "-10": { Qmax_kW: 5.45, COPmax: 2.59 },
      "-7": { Qmax_kW: 5.42, COPmax: 2.51 },
      "+2": { Qmax_kW: 6.43, COPmax: 2.91, Qlower_kW: 2.41, COPlower: 3.92 },
      "+7": {
        Qmax_kW: 6.8,
        COPmax: 3.16,
        Qlower_kW: 2.84,
        COPlower: 4.85,
        QmaxW55: 6.18,
      },
    },
    "7 kW": {
      "-10": { Qmax_kW: 5.86, COPmax: 2.23 },
      "-7": { Qmax_kW: 6.71, COPmax: 2.36 },
      "+2": { Qmax_kW: 7.09, COPmax: 2.83, Qlower_kW: 2.87, COPlower: 4.06 },
      "+7": {
        Qmax_kW: 7.97,
        COPmax: 3.07,
        Qlower_kW: 2.84,
        COPlower: 4.85,
        QmaxW55: 7.45,
      },
    },
    "10 kW": {
      "-10": { Qmax_kW: 9.99, COPmax: 2.72 },
      "-7": { Qmax_kW: 9.57, COPmax: 2.47 },
      "+2": { Qmax_kW: 11.66, COPmax: 2.84, Qlower_kW: 4.59, COPlower: 4.48 },
      "+7": {
        Qmax_kW: 12.67,
        COPmax: 3.0,
        Qlower_kW: 5.58,
        COPlower: 4.84,
        QmaxW55: 12.07,
      },
    },
    "12 kW": {
      "-10": { Qmax_kW: 11.82, COPmax: 2.46 },
      "-7": { Qmax_kW: 11.56, COPmax: 2.43 },
      "+2": { Qmax_kW: 12.61, COPmax: 2.64, Qlower_kW: 4.59, COPlower: 4.48 },
      "+7": {
        Qmax_kW: 12.9,
        COPmax: 2.71,
        Qlower_kW: 5.58,
        COPlower: 4.84,
        QmaxW55: 12.84,
      },
    },
  };

  // Electrical limits for modulation mapping
  const ELECTRICAL_PROFILES = {
    "4 kW": { minPowerConsW: 300, maxPowerConsW: 1340, minMod: 0.26 },
    "5 kW": { minPowerConsW: 300, maxPowerConsW: 2210, minMod: 0.18 },
    "7 kW": { minPowerConsW: 300, maxPowerConsW: 2510, minMod: 0.15 },
    "10 kW": { minPowerConsW: 500, maxPowerConsW: 4110, minMod: 0.13 },
    "12 kW": { minPowerConsW: 500, maxPowerConsW: 4780, minMod: 0.12 },
  };

  // Thermodynamic calibration parameters per model
  const COP_PARAMS = {
    "4 kW": {
      etaCarnot: 0.6,
      ETA_LIFT_FACTOR_PER_K: 0.004,
      ETA_LIFT_REF_K: 47.6,
    },
    "5 kW": {
      etaCarnot: 0.635,
      ETA_LIFT_FACTOR_PER_K: 0.006,
      ETA_LIFT_REF_K: 47.6,
    },
    "7 kW": {
      etaCarnot: 0.62,
      ETA_LIFT_FACTOR_PER_K: 0.004,
      ETA_LIFT_REF_K: 47.6,
    },
    "10 kW": {
      etaCarnot: 0.652,
      ETA_LIFT_FACTOR_PER_K: -0.013,
      ETA_LIFT_REF_K: 47.6,
    },
    "12 kW": {
      etaCarnot: 0.65,
      ETA_LIFT_FACTOR_PER_K: -0.009,
      ETA_LIFT_REF_K: 47.6,
    },
  };

  // --- Utility Functions ---

  function clamp(x, a, b) {
    return Math.max(a, Math.min(b, x));
  }

  function toK(C) {
    return C + 273.15;
  }

  /**
   * Scaled mass flow calculation (kg/s) based on pump pressure.
   */
  function computeMassFlow_kgps(flowAt150Lph, pumpPressureMbar) {
    const k_h = flowAt150Lph / 3600.0;
    return k_h * Math.sqrt(Math.max(20, pumpPressureMbar) / dp_ref);
  }

  /**
   * Retrieves capacity anchor points for a specific model.
   */
  function getCapacityPoints(modelName) {
    const spec = THERMAL_PROFILES[modelName];
    if (!spec) return [];
    return Object.keys(spec)
      .map((k) => ({ Ta: parseInt(k, 10), data: spec[k] }))
      .filter((e) => !Number.isNaN(e.Ta))
      .map((e) => ({ Ta: e.Ta, kW: e.data.Qmax_kW }))
      .sort((a, b) => a.Ta - b.Ta);
  }

  /**
   * Interpolates maximum thermal capacity at W35.
   */
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

  /**
   * Calculates target flow temperature based on heating curve settings.
   */
  function flowTargetCurve(
    ambientTempC,
    stdOutdoorTempC,
    flowTempAt20C,
    flowTempAtStdOutdoorC,
  ) {
    const x0 = stdOutdoorTempC;
    const y0 = flowTempAtStdOutdoorC;
    const x1 = 20;
    const y1 = flowTempAt20C;
    const t = (ambientTempC - x0) / Math.max(1e-6, x1 - x0);
    const y = y0 + t * (y1 - y0);
    return Math.max(15, Math.min(60, y));
  }

  /**
   * Calculates the building load scale factor per DIN EN 12831.
   */
  function din12831LoadScale(ambientTempC, heatingLimitC, theta_e_design_C) {
    const denomK = Math.max(1, heatingLimitC - theta_e_design_C);
    const frac = (heatingLimitC - ambientTempC) / denomK;
    return Math.max(0, frac);
  }

  /**
   * Derives electrical base load and max consumption for modulation mapping.
   */
  function deriveElectricalBaseAndMax(modelName) {
    const p = ELECTRICAL_PROFILES[modelName];
    if (!p) return { baseW: 0, pelMaxW: 1 };
    const baseW = Math.max(0, p.minMod * p.maxPowerConsW - p.minPowerConsW);
    const pelMaxW = Math.max(1e-9, p.maxPowerConsW);
    return { baseW, pelMaxW };
  }

  /**
   * Prepares efficiency calibration curves (mopt and alpha) from profile data.
   */
  function buildModulationEfficiencyCalib(modelName) {
    const spec = THERMAL_PROFILES[modelName] || {};
    const keys = Object.keys(spec)
      .map((k) => ({ Ta: parseInt(k, 10), data: spec[k] }))
      .filter((e) => !Number.isNaN(e.Ta))
      .sort((a, b) => a.Ta - b.Ta);

    const anchors = [];
    for (const { Ta, data } of keys) {
      if (
        data &&
        data.Qmax_kW != null &&
        data.COPmax != null &&
        data.Qlower_kW != null &&
        data.COPlower != null
      ) {
        const mopt = data.Qlower_kW / Math.max(1e-9, data.Qmax_kW);
        const r = data.COPlower / Math.max(1e-9, data.COPmax);
        const alpha = Math.max(
          0,
          (r - 1) / Math.max(1e-9, (1 - mopt) * (1 - mopt)),
        );
        anchors.push({ Ta, mopt, alpha });
      }
    }

    function interp(x, arr, key) {
      if (arr.length === 0) return null;
      if (x <= arr[0].Ta) return arr[0][key];
      if (x >= arr[arr.length - 1].Ta) return arr[arr.length - 1][key];
      for (let i = 0; i < arr.length - 1; i++) {
        const a = arr[i],
          b = arr[i + 1];
        if (x >= a.Ta && x <= b.Ta) {
          const t = (x - a.Ta) / (b.Ta - a.Ta);
          return a[key] + t * (b[key] - a[key]);
        }
      }
      return arr[arr.length - 1][key];
    }

    return {
      moptAt: (Ta) => {
        const v = interp(Ta, anchors, "mopt");
        return v == null ? 0.5 : clamp(v, 0.4, 0.7);
      },
      alphaAt: (Ta) => {
        const v = interp(Ta, anchors, "alpha");
        return v == null ? 1.0 : clamp(v, 0.3, 2.5);
      },
    };
  }

  /**
   * Predicts steady-state COP based on Carnot efficiency and temperature lift.
   */
  function estimateCOP(T_flowOutC, ambientTempC, modelName = DEFAULTS.hpModel) {
    const Te_elec = ambientTempC - TE_APPROACH;
    const Tc_elec = T_flowOutC + TC_APPROACH;
    const dT_lift_K = toK(Tc_elec) - toK(Te_elec);
    const COP_carnot = toK(Tc_elec) / dT_lift_K;

    const cp_params = COP_PARAMS[modelName] || COP_PARAMS[DEFAULTS.hpModel];
    const eta_eff =
      cp_params.etaCarnot *
      (1 +
        cp_params.ETA_LIFT_FACTOR_PER_K *
          (cp_params.ETA_LIFT_REF_K - dT_lift_K));

    return eta_eff * COP_carnot;
  }

  /**
   * Calculates max thermal capacity considering flow temperature derating.
   */
  function capacityAt(Ta, Tflow, modelName) {
    const pts = getCapacityPoints(modelName);
    if (!pts || pts.length < 2) return 0;
    const cap35 = hp_capacity_w35(Ta, pts);

    // Derate slope k: linear capacity loss between W35 and W55 anchors at A7
    const spec = THERMAL_PROFILES[modelName];
    const cap35_A7 = hp_capacity_w35(7, pts);
    const cap55_A7 = spec?.["+7"]?.QmaxW55;
    const k = cap55_A7 && cap35_A7 > 0 ? (1 - cap55_A7 / cap35_A7) / 20 : 0;

    const derate = 1 - k * (Tflow - 35);
    return Math.max(0, cap35 * derate);
  }

  /**
   * Estimates minimum thermal capacity from minimum electrical input and COP.
   */
  function minCapacityAt(Ta, Tflow, modelName) {
    const p = ELECTRICAL_PROFILES[modelName];
    if (!p) return 0;

    const cop = estimateCOP(Tflow, Ta, modelName);
    return Math.max(0, (p.minPowerConsW * cop) / 1000);
  }

  /**
   * Resolves the hydronic temperatures in the buffer/bypass network.
   */
  function resolveHydronicTemperatures(
    Q_load_W,
    targetFlowC,
    mPrimary,
    mHeating,
    spreadK,
  ) {
    const deltaT_heating = Q_load_W / Math.max(1e-9, mHeating * cp);
    const T_heatingReturn = targetFlowC - deltaT_heating;

    if (mPrimary <= 1e-6) {
      return {
        T_primFlow: T_heatingReturn + spreadK,
        T_primRet: T_heatingReturn,
        T_heatFlow: targetFlowC,
        T_heatRet: T_heatingReturn,
      };
    }

    let T_primFlow, T_primRet, T_heatFlow, T_heatRet;
    if (mPrimary >= mHeating) {
      // Surplus primary flow: return water is mixed with flow water (downward bypass)
      const bypassRatio = (mPrimary - mHeating) / mPrimary;
      T_primRet = T_heatingReturn + bypassRatio * spreadK;
      T_primFlow = T_primRet + spreadK;
      T_heatFlow = T_primFlow;
    } else {
      // Deficit primary flow: return water is mixed into supply (upward bypass)
      const mixRatio = mPrimary / mHeating;
      T_primRet = T_heatingReturn;
      T_primFlow = T_primRet + spreadK;
      T_heatFlow = T_heatingReturn + mixRatio * spreadK;
    }

    return {
      T_primFlow: Math.max(T_primRet + spreadK, T_primFlow),
      T_primRet,
      T_heatFlow,
      T_heatRet: T_heatingReturn,
    };
  }

  /**
   * Primary engine interface: calculates system state from parameters.
   */
  function computeState(params) {
    const ambientTempC = params.ambientTempC;
    const mHeating_kgps = computeMassFlow_kgps(
      params.heatingFlowAt150mbarLph,
      params.heatingPumpPressureMbar,
    );
    const designLoadW = Math.max(0, params.buildingHeatLoadAtStdKw) * 1000;

    // 1. Target heating flow temperature per linear curve between standard outdoor temperature and 20°C
    const targetFlowC = flowTargetCurve(
      ambientTempC,
      params.stdOutdoorTempC,
      params.flowTempAt20C,
      params.flowTempAtStdOutdoorC,
    );

    // 2. Compute building heat load target per DIN EN 12831
    const buildingLoadW =
      designLoadW *
      din12831LoadScale(
        ambientTempC,
        params.heatingLimitC,
        params.stdOutdoorTempC,
      );

    // 3. Primary-side flow from available heat and chosen spread
    const deltaT_primaryK = Math.max(0.5, params.primarySpreadK);
    const mPrimary_kgps =
      buildingLoadW > 0 ? buildingLoadW / (cp * deltaT_primaryK) : 0;

    // 4. Equivalent required secondary-side deltaT to satisfy building load
    const hydraulics = resolveHydronicTemperatures(
      buildingLoadW,
      targetFlowC,
      mPrimary_kgps,
      mHeating_kgps,
      deltaT_primaryK,
    );

    // 5. Estimate COP
    const COP_base = estimateCOP(
      hydraulics.T_primFlow,
      ambientTempC,
      params.hpModel,
    );

    // 6. Compute electrical power Pel
    const Pel_ideal = buildingLoadW / Math.max(1e-9, COP_base);

    // 7.a Compute capacity-based modulation, smooth in ambient temperature
    const capMaxW =
      capacityAt(ambientTempC, targetFlowC, params.hpModel) * 1000;
    const capMinW =
      minCapacityAt(ambientTempC, targetFlowC, params.hpModel) * 1000;
    const modCapacity = clamp(buildingLoadW / Math.max(1e-9, capMaxW), 0, 1);

    // 7.b Electrical-based path, optionally with modulation-dependent efficiency
    let Pel_out = Pel_ideal;
    let COP_out = COP_base;
    let modElectrical;

    if (params.efficiencyModulation === "on") {
      const { baseW, pelMaxW } = deriveElectricalBaseAndMax(params.hpModel);
      const calib = buildModulationEfficiencyCalib(params.hpModel);
      const mopt = calib.moptAt(ambientTempC);
      const alpha = calib.alphaAt(ambientTempC);

      // Apply modulation penalty (efficiency loss at both high and low deviations from optimum)
      const penalty = 1 + alpha * Math.pow(modCapacity - mopt, 2);
      // Realistic system overhead (piping losses, aux pumps, defrosting)
      Pel_out = (Pel_ideal + baseW) * penalty * CONST.SYSTEM_OVERHEAD_FACTOR;
      COP_out = buildingLoadW / Math.max(1e-9, Pel_out);

      modElectrical = Pel_out / Math.max(1e-9, pelMaxW);
    } else {
      const { baseW, pelMaxW } = deriveElectricalBaseAndMax(params.hpModel);
      modElectrical = (Pel_ideal + baseW) / Math.max(1e-9, pelMaxW);
    }

    const modulation =
      params.modulationMode === "electrical" ? modElectrical : modCapacity;

    return {
      inputs: {
        ...params,
        heatingFlowTargetC: targetFlowC,
      },
      flows: {
        primaryMassFlow: mPrimary_kgps,
        heatingMassFlow: mHeating_kgps,
      },
      heat: {
        heatingPowerW: buildingLoadW,
        buildingLoadW: buildingLoadW,
        minHeatingPowerW: capMinW,
        maxHeatingPowerW: capMaxW,
        electricalPowerW: Pel_out,
        COP: COP_out,
      },
      derived: {
        modulation,
        modulationCapacity: modCapacity,
        modulationElectrical: modElectrical,
      },
      temps: {
        evapTempC: ambientTempC - TE_APPROACH,
        suctionTempC: ambientTempC - TE_APPROACH + SUPERHEAT_K,
        condTempC: hydraulics.T_primFlow + TC_APPROACH,
        compOutTempC:
          ambientTempC -
          TE_APPROACH +
          SUPERHEAT_K +
          0.85 *
            (hydraulics.T_primFlow +
              TC_APPROACH -
              (ambientTempC - TE_APPROACH)),
        primaryFlowTempC: hydraulics.T_primFlow,
        primaryReturnTempC: hydraulics.T_primRet,
        heatingFlowTempC: hydraulics.T_heatFlow,
        heatingReturnTempC: hydraulics.T_heatRet,
      },
    };
  }

  const api = {
    capacityAt: capacityAt,
    minCapacityAt: minCapacityAt,
    computeBuildingHeatLoad_W: function (Q, Ta, TL, Te) {
      return Q * din12831LoadScale(Ta, TL, Te);
    },
    flowTargetCurve: flowTargetCurve,
    computeState: computeState,
    estimateCOP: estimateCOP,
    COP_PARAMS: COP_PARAMS,
    DEFAULTS: DEFAULTS,
    THERMAL_PROFILES: THERMAL_PROFILES,
    ELECTRICAL_PROFILES: ELECTRICAL_PROFILES,
  };

  if (typeof window !== "undefined") {
    window.HeatpumpEngine = api;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})();
