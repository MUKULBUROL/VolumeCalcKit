import { describe, it, expect } from "vitest";
import { calculateFrustum } from "@/lib/calculators/frustum";

describe("Conical Frustum Calculator", () => {
  it("calculates frustum volume correctly with known geometry", () => {
    // r1 = 1m, r2 = 2m, h = 3m
    // V = (1/3) * π * 3 * (1^2 + 1*2 + 2^2) = π * (1 + 2 + 4) = 7π ≈ 21.991148 m³
    const res = calculateFrustum({
      topType: "radius",
      topRadiusOrDiameter: 1,
      topUnit: "m",
      bottomType: "radius",
      bottomRadiusOrDiameter: 2,
      bottomUnit: "m",
      height: 3,
      heightUnit: "m",
      outputVolumeUnit: "m3",
      precision: 4,
    });

    expect(res.isValid).toBe(true);
    expect(res.primaryValue).toBeCloseTo(7 * Math.PI, 5);
    // Slant height s = sqrt((2 - 1)^2 + 3^2) = sqrt(10) ≈ 3.162277
    expect(res.extra?.slantHeightM).toBeCloseTo(Math.sqrt(10), 5);
    // Lateral area = π * (r1 + r2) * s = π * 3 * sqrt(10) ≈ 29.8037
    expect(res.extra?.lateralSurfaceAreaM2).toBeCloseTo(3 * Math.PI * Math.sqrt(10), 4);
  });

  it("calculates correctly using diameters in cm", () => {
    // Top diameter = 30cm (r1 = 15cm = 0.15m)
    // Bottom diameter = 26cm (r2 = 13cm = 0.13m)
    // Height = 38cm (0.38m)
    // V = (1/3) * π * 0.38 * (0.15^2 + 0.15*0.13 + 0.13^2)
    // V = (1/3) * π * 0.38 * (0.0225 + 0.0195 + 0.0169) = (1/3) * π * 0.38 * 0.0589 ≈ 0.0234386 m³ = 23.4386 L
    const res = calculateFrustum({
      topType: "diameter",
      topRadiusOrDiameter: 30,
      topUnit: "cm",
      bottomType: "diameter",
      bottomRadiusOrDiameter: 26,
      bottomUnit: "cm",
      height: 38,
      heightUnit: "cm",
      outputVolumeUnit: "l",
      precision: 3,
    });

    expect(res.isValid).toBe(true);
    expect(res.primaryValue).toBeCloseTo(23.439, 2);
  });

  it("handles identical top and bottom radii (cylinder degeneration)", () => {
    // r1 = 2m, r2 = 2m, h = 5m -> standard cylinder: V = π * 2^2 * 5 = 20π ≈ 62.83185 m³
    const res = calculateFrustum({
      topType: "radius",
      topRadiusOrDiameter: 2,
      topUnit: "m",
      bottomType: "radius",
      bottomRadiusOrDiameter: 2,
      bottomUnit: "m",
      height: 5,
      heightUnit: "m",
      outputVolumeUnit: "m3",
      precision: 4,
    });

    expect(res.isValid).toBe(true);
    expect(res.primaryValue).toBeCloseTo(20 * Math.PI, 4);
    expect(res.extra?.slantHeightM).toBeCloseTo(5, 5);
  });

  it("rejects non-positive dimensions with appropriate error", () => {
    const res = calculateFrustum({
      topType: "radius",
      topRadiusOrDiameter: 0,
      topUnit: "m",
      bottomType: "radius",
      bottomRadiusOrDiameter: 2,
      bottomUnit: "m",
      height: 3,
      heightUnit: "m",
      outputVolumeUnit: "m3",
      precision: 4,
    });

    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBeDefined();
  });
});
