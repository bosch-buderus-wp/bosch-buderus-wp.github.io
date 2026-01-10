import { describe, it, expect } from "vitest";
import engine from "../compute.js";

describe("User Scenario Validation", () => {
  it("should calculate COP for specified 7 kW model configuration", () => {
    const params = {
      ...engine.DEFAULTS,
      ambientTempC: -7,
      stdOutdoorTempC: -13.6,
      flowTempAt20C: 23,
      flowTempAtStdOutdoorC: 38,
      primarySpreadK: 4.2,
      buildingHeatLoadAtStdKw: 10.2,
      heatingPumpPressureMbar: 620,
      heatingFlowAt150mbarLph: 740,
      hpModel: "7 kW",
      efficiencyModulation: "on",
    };

    const state = engine.computeState(params);

    console.log("\n--- User Config Results ---");
    console.log(`Model: ${state.inputs.hpModel}`);
    console.log(`Ambient Temp: ${state.inputs.ambientTempC} °C`);
    console.log(`Flow Temp: ${state.temps.heatingFlowTempC.toFixed(2)} °C`);
    console.log(`Load: ${state.heat.buildingLoadW.toFixed(0)} W`);
    console.log(`Power Output: ${state.heat.heatingPowerW.toFixed(0)} W`);
    console.log(`Modulation: ${(state.derived.modulation * 100).toFixed(1)} %`);
    console.log(`COP: ${state.heat.COP.toFixed(2)}`);

    // Expected spec for Full Load A-7/W35 is 2.36.
    // This config is slightly above 100% modulation (7.8 kW load vs 6.7 kW capacity),
    // so it should be close to the full load COP.
    expect(state.heat.COP).toBeLessThan(2.6);
    expect(state.heat.COP).toBeGreaterThan(2.2);
  });
});
