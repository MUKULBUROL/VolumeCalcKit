import { describe, it, expect } from "vitest";
import { calculatePoolVolume } from "@/lib/calculators/pool";

describe("Swimming Pool Volume Calculator", () => {
  it("calculates rectangular pool with sloped shallow and deep end correctly", () => {
    // 16 x 32 ft, 3.5 ft shallow, 8.0 ft deep
    // Avg depth = 5.75 ft, Area = 512 sq ft
    // Vol ft3 = 512 * 5.75 = 2,944 ft3
    // Gal = 2,944 * 7.48052 ≈ 22,023 gal
    const res = calculatePoolVolume({
      shape: "rectangular",
      length: 32,
      width: 16,
      shallowDepth: 3.5,
      deepDepth: 8.0,
      dimensionUnit: "ft",
      precision: 0,
    });

    expect(res.isValid).toBe(true);
    expect(res.extra?.usGallons).toBeCloseTo(22023, -1);
    expect(res.extra?.avgDepthFt).toBeCloseTo(5.75, 2);
    expect(res.extra?.surfaceAreaSqFt).toBeCloseTo(512, 1);
    expect(res.extra?.chlorineShockLb).toBeCloseTo(2.2, 1);
  });

  it("calculates round swimming pool volume correctly", () => {
    // Diameter = 24 ft (r = 12 ft), constant depth = 4 ft
    // Area = π * 12^2 = 144π ≈ 452.389 sq ft
    // Vol = 452.389 * 4 = 1,809.56 ft3
    // Gal = 1,809.56 * 7.48052 ≈ 13,536 gal
    const res = calculatePoolVolume({
      shape: "round",
      diameter: 24,
      shallowDepth: 4,
      deepDepth: 4,
      dimensionUnit: "ft",
      precision: 0,
    });

    expect(res.isValid).toBe(true);
    expect(res.extra?.usGallons).toBeCloseTo(13536, -1);
    expect(res.extra?.surfaceAreaSqFt).toBeCloseTo(144 * Math.PI, 1);
  });

  it("calculates oval swimming pool volume correctly", () => {
    // Length = 30 ft, Width = 15 ft, avg depth = 4.5 ft
    // Area = π * 15 * 7.5 ≈ 353.43 sq ft
    // Vol = 353.43 * 4.5 ≈ 1,590.43 ft3
    // Gal = 1,590.43 * 7.48052 ≈ 11,897 gal
    const res = calculatePoolVolume({
      shape: "oval",
      length: 30,
      width: 15,
      shallowDepth: 4,
      deepDepth: 5,
      dimensionUnit: "ft",
      precision: 0,
    });

    expect(res.isValid).toBe(true);
    expect(res.extra?.usGallons).toBeCloseTo(11897, -1);
  });

  it("calculates kidney shaped swimming pool volume using industry factor", () => {
    // Length = 32 ft, WidthA = 14 ft, WidthB = 18 ft, avg depth = 5 ft
    // Area = 0.45 * (14 + 18) * 32 = 0.45 * 32 * 32 = 460.8 sq ft
    // Vol = 460.8 * 5 = 2,304 ft3
    // Gal = 2,304 * 7.48052 ≈ 17,235 gal
    const res = calculatePoolVolume({
      shape: "kidney",
      length: 32,
      widthA: 14,
      widthB: 18,
      shallowDepth: 4,
      deepDepth: 6,
      dimensionUnit: "ft",
      precision: 0,
    });

    expect(res.isValid).toBe(true);
    expect(res.extra?.surfaceAreaSqFt).toBeCloseTo(460.8, 1);
    expect(res.extra?.usGallons).toBeCloseTo(17235, -1);
  });

  it("handles metric measurements correctly", () => {
    // 10m x 5m, 1m shallow, 2m deep -> avg depth = 1.5m
    // Volume = 10 * 5 * 1.5 = 75 m3 = 75,000 Liters
    const res = calculatePoolVolume({
      shape: "rectangular",
      length: 10,
      width: 5,
      shallowDepth: 1,
      deepDepth: 2,
      dimensionUnit: "m",
      precision: 0,
    });

    expect(res.isValid).toBe(true);
    expect(res.extra?.volumeM3).toBeCloseTo(75, 2);
    expect(res.extra?.liters).toBeCloseTo(75000, 0);
  });

  it("rejects zero or negative dimensions gracefully", () => {
    const res = calculatePoolVolume({
      shape: "rectangular",
      length: 0,
      width: 10,
      shallowDepth: 3,
      deepDepth: 6,
      dimensionUnit: "ft",
      precision: 0,
    });

    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBeDefined();
  });
});
