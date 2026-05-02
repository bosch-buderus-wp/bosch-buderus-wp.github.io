import { describe, it, expect } from "vitest";
import engine from "../compute.js";

const { THERMAL_PROFILES, DEFAULTS, ELECTRICAL_PROFILES } = engine;

describe("Minimum thermal capacity approximation", () => {
  it("uses minimum electrical input times model-specific COP", () => {
    const Ta = 7;
    const Tflow = 35;

    Object.keys(ELECTRICAL_PROFILES).forEach((model) => {
      const expected =
        (ELECTRICAL_PROFILES[model].minPowerConsW *
          engine.estimateCOP(Tflow, Ta, model)) /
        1000;

      expect(engine.minCapacityAt(Ta, Tflow, model)).toBeCloseTo(expected, 6);
    });
  });

  it("exposes minimum and maximum heating power in computeState", () => {
    const state = engine.computeState(DEFAULTS);

    expect(state.heat.minHeatingPowerW).toBeGreaterThan(0);
    expect(state.heat.maxHeatingPowerW).toBeGreaterThan(
      state.heat.minHeatingPowerW
    );
  });
});

describe("Heat Pump Engine Specification Validation", () => {
  Object.keys(THERMAL_PROFILES).forEach((model) => {
    describe(`Model: ${model}`, () => {
      const profile = THERMAL_PROFILES[model];
      Object.keys(profile).forEach((taStr) => {
        const Ta = parseInt(taStr, 10);
        const data = profile[taStr];

        const testPoints = [];
        if (data.COPmax !== undefined) {
          testPoints.push({
            load: data.Qmax_kW,
            targetCOP: data.COPmax,
            label: "Full Load",
          });
        }
        if (data.COPlower !== undefined) {
          testPoints.push({
            load: data.Qlower_kW,
            targetCOP: data.COPlower,
            label: "Part Load",
          });
        }

        testPoints.forEach(({ load, targetCOP, label }) => {
          it(`should reach COP ${targetCOP} at A${Ta}/W35 (${label})`, () => {
            const loadW = load * 1000;
            const spreadK = 5.0; // Typical spread
            const cp = 4180;

            // To ensure no temperature is lost in the buffer (primaryFlowTempC = heatingFlowTempC),
            // we must ensure that primary mass flow matches heating mass flow.
            //
            // 1. mPrimary = loadW / (cp * deltaT_primaryK)
            // 2. mHeating = (heatingFlowLph / 3600) * sqrt(pressure / 150)
            //
            // Setting pressure = 150 and deltaT_primaryK = spreadK:
            // heatingFlowLph = (loadW / (cp * spreadK)) * 3600
            const targetFlowLph = (loadW / (cp * spreadK)) * 3600;

            const params = {
              ...DEFAULTS,
              hpModel: model,
              ambientTempC: Ta,
              // Force W35 target temperature
              stdOutdoorTempC: Ta,
              flowTempAtStdOutdoorC: 35,
              flowTempAt20C: 35,
              buildingHeatLoadAtStdKw: load,
              heatingLimitC: Ta + 10,
              primarySpreadK: spreadK,
              heatingPumpPressureMbar: 150,
              heatingFlowAt150mbarLph: targetFlowLph,
              efficiencyModulation: "on",
            };

            const state = engine.computeState(params);

            // Test Setup Verification
            // Verify building load matches expectation
            expect(state.heat.buildingLoadW).toBeCloseTo(loadW, 1);
            // Verify hydronics are "balanced" so no temperature is lost in buffer
            // We allow a small margin for numerical stability
            expect(state.temps.heatingFlowTempC).toBeCloseTo(35, 0.5);
            expect(state.temps.primaryFlowTempC).toBeCloseTo(35, 0.5);

            // COP Validation
            const actualCOP = state.heat.COP;
            const errorPercent = Math.abs(actualCOP - targetCOP) / targetCOP;

            // The user requested +- 10% tolerance
            expect(errorPercent).toBeLessThan(0.1);
          });
        });
      });
    });
  });
});
