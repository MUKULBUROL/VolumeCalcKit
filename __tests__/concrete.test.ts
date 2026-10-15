import { describe, it, expect } from "vitest";
import { calculateConcrete } from "@/lib/calculators/concrete";

describe("Concrete Slab & Bag Estimator", () => {
  it("calculates rectangular slab volume and bag counts accurately", () => {
    // 20 ft x 10 ft x 4 inches with 10% waste buffer
    // Raw: 20 * 10 * (4/12) = 66.6667 cu ft (2.469 yd3)
    // Buffered (+10%): 73.3333 cu ft (2.716 yd3)
    // 80-lb bags: ceil(73.3333 / 0.60) = 123 bags
    // 60-lb bags: ceil(73.3333 / 0.45) = 163 bags
    const res = calculateConcrete({
      structureType: "slab",
      slabLength: 20,
      slabWidth: 10,
      slabThickness: 4,
      slabDimensionUnit: "ft",
      slabThicknessUnit: "in",
      wastePercentage: 10,
      precision: 2,
    });

    expect(res.isValid).toBe(true);
    expect(res.extra?.rawVolumeCuFt).toBeCloseTo(66.67, 1);
    expect(res.extra?.rawVolumeCuYd).toBeCloseTo(2.47, 2);
    expect(res.extra?.bufferedVolumeCuYd).toBeCloseTo(2.72, 2);
    expect(res.extra?.bags80lb).toBe(123);
    expect(res.extra?.bags60lb).toBe(163);
  });

  it("calculates cylindrical Sonotube columns correctly", () => {
    // 12 inch diameter (r = 0.5 ft), 4 ft depth, 4 columns, 0% waste
    // Single column = π * (0.5)^2 * 4 = π ≈ 3.14159 cu ft
    // 4 columns = 4π ≈ 12.566 cu ft
    // Bags (80 lb) = ceil(12.566 / 0.6) = 21 bags
    const res = calculateConcrete({
      structureType: "column",
      columnDiameter: 12,
      columnDepth: 4,
      columnQuantity: 4,
      columnDiameterUnit: "in",
      columnDepthUnit: "ft",
      wastePercentage: 0,
      precision: 2,
    });

    expect(res.isValid).toBe(true);
    expect(res.extra?.rawVolumeCuFt).toBeCloseTo(4 * Math.PI, 2);
    expect(res.extra?.bags80lb).toBe(Math.ceil((4 * Math.PI) / 0.6));
  });

  it("calculates continuous footing volume correctly", () => {
    // 30 ft length, 1.5 ft width (18 in), 1 ft depth (12 in), 10% waste
    // Raw = 30 * 1.5 * 1 = 45 cu ft (1.667 yd3)
    // Buffered (+10%) = 49.5 cu ft (1.833 yd3)
    // Bags (80 lb) = ceil(49.5 / 0.6) = 83 bags
    const res = calculateConcrete({
      structureType: "footing",
      footingLength: 30,
      footingWidth: 1.5,
      footingDepth: 1,
      footingDimensionUnit: "ft",
      wastePercentage: 10,
      precision: 2,
    });

    expect(res.isValid).toBe(true);
    expect(res.extra?.rawVolumeCuFt).toBeCloseTo(45.0, 1);
    expect(res.extra?.bufferedVolumeCuFt).toBeCloseTo(49.5, 1);
    expect(res.extra?.bags80lb).toBe(83);
  });

  it("calculates project cost estimate properly", () => {
    // 10 yd3 at $140/yd3 = $1,400
    const res = calculateConcrete({
      structureType: "slab",
      slabLength: 30,
      slabWidth: 18,
      slabThickness: 6, // 30 * 18 * 0.5 = 270 cu ft = 10.0 yd3
      slabDimensionUnit: "ft",
      slabThicknessUnit: "in",
      wastePercentage: 0,
      costPerUnit: 140,
      costMode: "per_yard",
      precision: 2,
    });

    expect(res.isValid).toBe(true);
    expect(res.extra?.totalCostEstimate).toBeCloseTo(1400, 0);
  });

  it("rejects non-positive dimensions gracefully", () => {
    const res = calculateConcrete({
      structureType: "slab",
      slabLength: -10,
      slabWidth: 10,
      slabThickness: 4,
      slabDimensionUnit: "ft",
      slabThicknessUnit: "in",
      wastePercentage: 10,
      precision: 2,
    });

    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBeDefined();
  });
});
