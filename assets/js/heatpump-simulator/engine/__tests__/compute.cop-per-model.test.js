import { describe, it, expect } from "vitest";
import Engine from "../compute.js";

describe("HeatpumpEngine COP calibration (4kW, W35)", () => {
  it("matches target COPs at A-7/W35, A+2/W35, A+7/W35 within tolerance", () => {
    const W35 = 35;
    const tolAbs = 0.08;
    const cop_Aneg7 = Engine.estimateCOP(W35, -7, "4 kW");
    const cop_Apos2 = Engine.estimateCOP(W35, 2, "4 kW");
    const cop_Apos7 = Engine.estimateCOP(W35, 7, "4 kW");
    expect(Math.abs(cop_Aneg7 - 2.89)).toBeLessThanOrEqual(tolAbs);
    expect(Math.abs(cop_Apos2 - 3.94)).toBeLessThanOrEqual(tolAbs);
    expect(Math.abs(cop_Apos7 - 4.85)).toBeLessThanOrEqual(tolAbs);
  });
});

describe("HeatpumpEngine COP calibration (5kW, W35)", () => {
  it("matches target COPs at A+2/W35 and A+7/W35 within tolerance", () => {
    const W35 = 35;
    const tolAbs = 0.08;
    const cop_Apos2 = Engine.estimateCOP(W35, 2, "5 kW");
    const cop_Apos7 = Engine.estimateCOP(W35, 7, "5 kW");
    expect(Math.abs(cop_Apos2 - 3.92)).toBeLessThanOrEqual(tolAbs);
    expect(Math.abs(cop_Apos7 - 4.85)).toBeLessThanOrEqual(tolAbs);
  });
});

describe("HeatpumpEngine COP calibration (7kW, W35)", () => {
  it("matches target COPs at A+2/W35 and A+7/W35 within tolerance", () => {
    const W35 = 35;
    const tolAbs = 0.08;
    const cop_Apos2 = Engine.estimateCOP(W35, 2, "7 kW");
    const cop_Apos7 = Engine.estimateCOP(W35, 7, "7 kW");
    expect(Math.abs(cop_Apos2 - 4.06)).toBeLessThanOrEqual(tolAbs);
    expect(Math.abs(cop_Apos7 - 4.85)).toBeLessThanOrEqual(tolAbs);
  });
});

describe("HeatpumpEngine COP calibration (10kW, W35)", () => {
  it("matches target COPs at A+2/W35 and A+7/W35 within tolerance", () => {
    const W35 = 35;
    const tolAbs = 0.08;
    const cop_Apos2 = Engine.estimateCOP(W35, 2, "10 kW");
    const cop_Apos7 = Engine.estimateCOP(W35, 7, "10 kW");
    expect(Math.abs(cop_Apos2 - 4.48)).toBeLessThanOrEqual(tolAbs);
    expect(Math.abs(cop_Apos7 - 4.84)).toBeLessThanOrEqual(tolAbs);
  });
});

describe("HeatpumpEngine COP calibration (12kW, W35)", () => {
  it("matches target COPs at A+2/W35 and A+7/W35 within tolerance", () => {
    const W35 = 35;
    const tolAbs = 0.08;
    const cop_Apos2 = Engine.estimateCOP(W35, 2, "12 kW");
    const cop_Apos7 = Engine.estimateCOP(W35, 7, "12 kW");
    expect(Math.abs(cop_Apos2 - 4.48)).toBeLessThanOrEqual(tolAbs);
    expect(Math.abs(cop_Apos7 - 4.84)).toBeLessThanOrEqual(tolAbs);
  });
});
