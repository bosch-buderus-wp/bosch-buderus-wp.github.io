import { describe, it, expect } from "vitest";
import Engine from "../compute.js";

// Common approximate helper for relative/absolute checks
function approx(actual, expected, { abs = null, rel = 0.06 } = {}) {
  const diff = Math.abs(actual - expected);
  if (abs != null) return diff <= abs;
  const denom = Math.max(1e-9, Math.abs(expected));
  return diff / denom <= rel;
}

describe("HeatpumpEngine.computeState", () => {
  it("returns structured outputs with defaults", () => {
    const out = Engine.computeState(Engine.DEFAULTS);
    expect(out).toBeTruthy();
    expect(out.inputs).toBeTruthy();
    expect(out.flows).toBeTruthy();
    expect(out.temps).toBeTruthy();
    expect(out.heat).toBeTruthy();
    expect(out.derived).toBeTruthy();
  });

  it("capacity interpolation tendency: heatingPowerW decreasing with ambient temp (tendency)", () => {
    const TaVals = [10, 7, 2, 0, -2, -7];
    let prev = -Infinity;
    for (const Ta of TaVals) {
      const s = Engine.computeState({ ...Engine.DEFAULTS, ambientTempC: Ta });
      expect(s.heat.heatingPowerW).toBeGreaterThanOrEqual(0);
      if (prev > -Infinity && Ta >= -10) {
        expect(s.heat.heatingPowerW + 1e-6).toBeGreaterThanOrEqual(prev);
      }
      prev = s.heat.heatingPowerW;
    }
  });

  it("snapshot at 9°C matches verified measurements within tolerances", () => {
    const inputs = {
      ...Engine.DEFAULTS,
      ambientTempC: 6.0,
      modulationMode: "capacity",
    };
    const out = Engine.computeState(inputs);
    const expected = {
      derived: { modulation: 0.3 },
      flows: { primaryMassFlow: 0.105, heatingMassFlow: 0.2083 },
      temps: {
        evapTempC: 4.0,
        suctionTempC: 9.0,
        primaryReturnTempC: 27.38,
        primaryFlowTempC: 30.88,
        heatingFlowTempC: 29.08,
        heatingReturnTempC: 27.38,
        compOutTempC: 40.35,
        condTempC: 34.3,
      },
      heat: {
        heatingPowerW: 1479,
        electricalPowerW: 330,
        buildingLoadW: 1479,
        COP: 5.39,
      },
    };

    const rel = 0.06;
    const absSmall = 0.4;
    console.log(out, expected);
    expect(
      approx(out.derived.modulation, expected.derived.modulation, { rel })
    ).toBe(true);

    expect(
      approx(out.flows.primaryMassFlow, expected.flows.primaryMassFlow, { rel })
    ).toBe(true);
    expect(
      approx(out.flows.heatingMassFlow, expected.flows.heatingMassFlow, { rel })
    ).toBe(true);

    // expect(
    //   approx(out.temps.evapTempC, expected.temps.evapTempC, { abs: absSmall })
    // ).toBe(true);
    // expect(
    //   approx(out.temps.suctionTempC, expected.temps.suctionTempC, {
    //     abs: absSmall,
    //   })
    // ).toBe(true);
    expect(
      approx(out.temps.primaryReturnTempC, expected.temps.primaryReturnTempC, {
        abs: 0.6,
      })
    ).toBe(true);
    expect(
      approx(out.temps.primaryFlowTempC, expected.temps.primaryFlowTempC, {
        abs: 0.6,
      })
    ).toBe(true);
    expect(
      approx(out.temps.heatingFlowTempC, expected.temps.heatingFlowTempC, {
        abs: 0.6,
      })
    ).toBe(true);
    expect(
      approx(out.temps.heatingReturnTempC, expected.temps.heatingReturnTempC, {
        abs: 0.6,
      })
    ).toBe(true);
    expect(
      approx(out.temps.compOutTempC, expected.temps.compOutTempC, { abs: 1.0 })
    ).toBe(true);
    // expect(
    //   approx(out.temps.condTempC, expected.temps.condTempC, { abs: 0.8 })
    // ).toBe(true);

    expect(
      approx(out.heat.heatingPowerW, expected.heat.heatingPowerW, { rel })
    ).toBe(true);
    expect(
      approx(out.heat.electricalPowerW, expected.heat.electricalPowerW, {
        rel: 0.25,
      })
    ).toBe(true);
    expect(
      approx(out.heat.buildingLoadW, expected.heat.buildingLoadW, { rel })
    ).toBe(true);
    expect(approx(out.heat.COP, expected.heat.COP, { rel })).toBe(true);
  });

  it("invariants: sensible bounds and ordering", () => {
    const s = Engine.computeState(Engine.DEFAULTS);
    expect(s.derived.modulation).toBeGreaterThanOrEqual(0);
    expect(s.derived.modulation).toBeLessThanOrEqual(1);
    expect(s.temps.primaryFlowTempC).toBeGreaterThanOrEqual(
      s.temps.primaryReturnTempC
    );
    expect(s.heat.heatingPowerW).toBeGreaterThanOrEqual(0);
    expect(s.heat.electricalPowerW).toBeGreaterThanOrEqual(0);
  });
});
describe("HeatpumpEngine COP calibration (4kW, W35)", () => {
  // Spec 4kW:
  //   * A-10/W35 with 3.63 kW thermal power output (max modulation): COP=2.7
  //   * A-7/W35 with 3.92 kW thermal power output (max modulation): COP=2.89
  //   * A+2/W35 with 4.31 kW thermal power output (max modulation): COP=3.21
  //   * A+2/W35 with 2.09 kW thermal power output (lower modulation): COP=3.94
  //   * A+7/W35 with 4.99 kW thermal power output (max modulation): COP=3.59
  //   * A+7/W35 with 2.84 kW thermal power output (lower modulation): COP=4.85
  it("matches target COPs at A-7/W35, A+2/W35, A+7/W35 within tolerance", () => {
    const W35 = 35;
    const tolAbs = 0.08; // absolute tolerance for COP matching

    const cop_Aneg7 = Engine.estimateCOP(W35, -7, "4 kW");
    const cop_Apos2 = Engine.estimateCOP(W35, 2, "4 kW");
    const cop_Apos7 = Engine.estimateCOP(W35, 7, "4 kW");

    expect(Math.abs(cop_Aneg7 - 2.89)).toBeLessThanOrEqual(tolAbs);
    expect(Math.abs(cop_Apos2 - 3.94)).toBeLessThanOrEqual(tolAbs);
    expect(Math.abs(cop_Apos7 - 4.85)).toBeLessThanOrEqual(tolAbs);
  });
});
