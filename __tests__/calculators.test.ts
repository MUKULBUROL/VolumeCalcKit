import { describe, it, expect } from "vitest";
import { calculateCylinder } from "@/lib/calculators/cylinder";
import { calculateCube } from "@/lib/calculators/cube";
import { calculateSphere } from "@/lib/calculators/sphere";
import { calculateCone } from "@/lib/calculators/cone";
import { calculateRectangularPrism } from "@/lib/calculators/rectangular-prism";
import { calculateCbm } from "@/lib/calculators/cbm";
import { calculateCubicFeet } from "@/lib/calculators/cubic-feet";
import { calculateCubicMeter } from "@/lib/calculators/cubic-meter";
import { calculateTankVolume } from "@/lib/calculators/tank";
import { calculatePipeVolume } from "@/lib/calculators/pipe";
import { calculateCubicYard } from "@/lib/calculators/cubic-yard";
import { calculateVolumetricWeight } from "@/lib/calculators/volumetric-weight";
import { calculateVolumeConverter } from "@/lib/calculators/volume-converter";
import { calculateCftCbm } from "@/lib/calculators/cft-to-cbm";
import { calculateContainerCbm } from "@/lib/calculators/container-cbm";
import { calculateAquariumVolume } from "@/lib/calculators/aquarium";
import { formatNumber } from "@/lib/utils/format";

describe("Calculators Math Verification", () => {
  describe("Cylinder Calculator", () => {
    it("r = 1m, h = 1m should return π m³", () => {
      const res = calculateCylinder({
        inputType: "radius",
        radiusOrDiameter: 1,
        radiusOrDiameterUnit: "m",
        height: 1,
        heightUnit: "m",
        outputVolumeUnit: "m3",
        precision: 4,
      });

      expect(res.isValid).toBe(true);
      expect(res.primaryValue).toBeCloseTo(Math.PI, 6);
    });

    it("Diameter = 40cm, Height = 1m should calculate correctly to ~125.664 L", () => {
      const res = calculateCylinder({
        inputType: "diameter",
        radiusOrDiameter: 40,
        radiusOrDiameterUnit: "cm",
        height: 1,
        heightUnit: "m",
        outputVolumeUnit: "l",
        precision: 3,
      });

      expect(res.isValid).toBe(true);
      // r = 0.2m, h = 1m -> V = π * 0.04 * 1 = 0.1256637 m3 = 125.6637 L
      expect(res.primaryValue).toBeCloseTo(125.6637, 3);
      expect(res.extra?.baseAreaM2).toBeCloseTo(Math.PI * 0.04, 5);
      expect(res.extra?.circumferenceM).toBeCloseTo(2 * Math.PI * 0.2, 5);
    });

    it("rejects zero or negative dimensions gracefully", () => {
      const res = calculateCylinder({
        inputType: "radius",
        radiusOrDiameter: -5,
        radiusOrDiameterUnit: "cm",
        height: 10,
        heightUnit: "cm",
        outputVolumeUnit: "m3",
        precision: 4,
      });
      expect(res.isValid).toBe(false);
      expect(res.errorMessage).toBeDefined();
    });
  });

  describe("Cube Calculator", () => {
    it("side = 2m should return 8 m³, surface area = 24 m², diagonals accurate", () => {
      const res = calculateCube({
        sideLength: 2,
        sideUnit: "m",
        outputVolumeUnit: "m3",
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      expect(res.primaryValue).toBe(8);
      expect(res.extra?.surfaceAreaM2).toBe(24);
      expect(res.extra?.faceDiagonalM).toBeCloseTo(2 * Math.SQRT2, 5);
      expect(res.extra?.spaceDiagonalM).toBeCloseTo(2 * Math.sqrt(3), 5);
    });
  });

  describe("Sphere Calculator", () => {
    it("r = 1m should return ~4.18879 m³ and surface area = 4π", () => {
      const res = calculateSphere({
        inputType: "radius",
        radiusOrDiameter: 1,
        lengthUnit: "m",
        outputVolumeUnit: "m3",
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      expect(res.primaryValue).toBeCloseTo((4 / 3) * Math.PI, 5);
      expect(res.extra?.surfaceAreaM2).toBeCloseTo(4 * Math.PI, 5);
      expect(res.extra?.circumferenceM).toBeCloseTo(2 * Math.PI, 5);
    });
  });

  describe("Cone Calculator", () => {
    it("r = 1m, h = 3m should return π m³ and correct slant height", () => {
      const res = calculateCone({
        inputType: "radius",
        radiusOrDiameter: 1,
        radiusOrDiameterUnit: "m",
        height: 3,
        heightUnit: "m",
        outputVolumeUnit: "m3",
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      expect(res.primaryValue).toBeCloseTo(Math.PI, 6);
      expect(res.extra?.slantHeightM).toBeCloseTo(Math.sqrt(1 + 9), 5);
    });
  });

  describe("Rectangular Prism Calculator", () => {
    it("2m × 3m × 4m should return 24 m³ and correct space diagonal", () => {
      const res = calculateRectangularPrism({
        length: 2,
        width: 3,
        height: 4,
        lengthUnit: "m",
        widthUnit: "m",
        heightUnit: "m",
        outputVolumeUnit: "m3",
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      expect(res.primaryValue).toBe(24);
      expect(res.extra?.surfaceAreaM2).toBe(2 * (6 + 8 + 12)); // 52
      expect(res.extra?.spaceDiagonalM).toBeCloseTo(Math.sqrt(4 + 9 + 16), 5);
    });
  });

  describe("CBM Calculator", () => {
    it("60cm × 40cm × 35cm with qty 20 should return exactly 1.68 m³", () => {
      const res = calculateCbm([
        {
          id: "1",
          name: "Cartons A",
          length: 60,
          width: 40,
          height: 35,
          lengthUnit: "cm",
          quantity: 20,
          weightUnit: "kg",
        },
      ]);

      expect(res.isValid).toBe(true);
      // 0.6 * 0.4 * 0.35 * 20 = 1.68 m3
      expect(res.totalCbm).toBeCloseTo(1.68, 4);
      expect(res.totalQuantity).toBe(20);
      expect(res.totalCuFt).toBeCloseTo(1.68 / (0.3048 ** 3), 2);
    });

    it("handles multiple items and mixed units", () => {
      const res = calculateCbm([
        {
          id: "1",
          name: "Item 1",
          length: 1,
          width: 1,
          height: 1,
          lengthUnit: "m",
          quantity: 1,
          weightUnit: "kg",
        },
        {
          id: "2",
          name: "Item 2",
          length: 100,
          width: 100,
          height: 100,
          lengthUnit: "cm",
          quantity: 1,
          weightUnit: "kg",
        },
      ]);
      expect(res.isValid).toBe(true);
      expect(res.totalCbm).toBeCloseTo(2, 4);
    });
  });

  describe("Cubic Feet Calculator", () => {
    it("2ft × 3ft × 4ft with qty 1 should return 24 ft³ and calculate cost", () => {
      const res = calculateCubicFeet({
        length: 2,
        width: 3,
        height: 4,
        lengthUnit: "ft",
        widthUnit: "ft",
        heightUnit: "ft",
        quantity: 1,
        costPerCuFt: 5,
        precision: 2,
      });
      expect(res.isValid).toBe(true);
      expect(res.primaryValue).toBeCloseTo(24, 2);
      expect(res.extra?.estimatedCost).toBeCloseTo(120, 2);
    });
  });

  describe("Cubic Meter Calculator", () => {
    it("mixed units: 2m × 50cm × 1000mm should return 1 m³", () => {
      const res = calculateCubicMeter({
        length: 2,
        width: 50,
        height: 1000,
        lengthUnit: "m",
        widthUnit: "cm",
        heightUnit: "mm",
        quantity: 1,
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      expect(res.primaryValue).toBeCloseTo(1, 6);
      expect(res.extra?.volumeLiters).toBeCloseTo(1000, 4);
    });
  });

  describe("Cubic Yard Calculator", () => {
    it("9ft × 9ft × 1ft should return exactly 3 yd³", () => {
      const res = calculateCubicYard({
        length: 9,
        width: 9,
        depth: 1,
        lengthUnit: "ft",
        widthUnit: "ft",
        depthUnit: "ft",
        precision: 3,
      });
      expect(res.isValid).toBe(true);
      // 9 * 9 * 1 = 81 cu ft / 27 = 3 yd3
      expect(res.primaryValue).toBeCloseTo(3, 3);
      expect(res.extra?.volumeCuFt).toBeCloseTo(81, 3);
    });
  });

  describe("Tank Volume Calculator", () => {
    it("calculates rectangular tank capacity", () => {
      const res = calculateTankVolume({
        shape: "rectangular",
        length: 2,
        width: 1,
        height: 1.5,
        lengthUnit: "m",
        widthUnit: "m",
        heightUnit: "m",
        diameterUnit: "m",
        depthUnit: "m",
        precision: 2,
      });
      expect(res.isValid).toBe(true);
      // 2 * 1 * 1.5 = 3 m3 = 3000 L
      expect(res.extra?.maxLiters).toBeCloseTo(3000, 1);
    });

    it("handles horizontal cylinder edge case: depth = 0", () => {
      const res = calculateTankVolume({
        shape: "horizontal_cylinder",
        diameter: 2,
        length: 10,
        liquidDepth: 0,
        lengthUnit: "m",
        widthUnit: "m",
        heightUnit: "m",
        diameterUnit: "m",
        depthUnit: "m",
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      expect(res.extra?.currentLiters).toBe(0);
      expect(res.extra?.fillPercentage).toBe(0);
    });

    it("handles horizontal cylinder exact 50% fill at depth = radius", () => {
      const res = calculateTankVolume({
        shape: "horizontal_cylinder",
        diameter: 2,
        length: 10,
        liquidDepth: 1, // depth = radius
        lengthUnit: "m",
        widthUnit: "m",
        heightUnit: "m",
        diameterUnit: "m",
        depthUnit: "m",
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      expect(res.extra?.fillPercentage).toBeCloseTo(50.0, 1);
      const totalCapacityL = Math.PI * 1 * 1 * 10 * 1000;
      expect(res.extra?.currentLiters).toBeCloseTo(totalCapacityL / 2, 1);
    });

    it("handles horizontal cylinder 100% fill at depth = diameter", () => {
      const res = calculateTankVolume({
        shape: "horizontal_cylinder",
        diameter: 2,
        length: 10,
        liquidDepth: 2, // depth = diameter
        lengthUnit: "m",
        widthUnit: "m",
        heightUnit: "m",
        diameterUnit: "m",
        depthUnit: "m",
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      expect(res.extra?.fillPercentage).toBeCloseTo(100.0, 1);
      const totalCapacityL = Math.PI * 1 * 1 * 10 * 1000;
      expect(res.extra?.currentLiters).toBeCloseTo(totalCapacityL, 1);
    });
  });

  describe("Pipe Volume Calculator", () => {
    it("uses internal diameter to calculate fluid capacity and water weight", () => {
      const res = calculatePipeVolume({
        insideDiameter: 10,
        diameterUnit: "cm",
        length: 10,
        lengthUnit: "m",
        precision: 3,
      });
      expect(res.isValid).toBe(true);
      // r = 0.05m -> V = π * 0.0025 * 10 = 0.025π m3 ≈ 78.5398 L
      expect(res.primaryValue).toBeCloseTo(78.54, 1);
      expect(res.extra?.waterWeightKg).toBeCloseTo(78.54, 1);
    });
  });

  describe("Volumetric Weight Calculator", () => {
    it("calculates volumetric weight with 5000 & 6000 divisor and determines chargeable weight", () => {
      const res = calculateVolumetricWeight({
        length: 50,
        width: 40,
        height: 30,
        lengthUnit: "cm",
        quantity: 1,
        actualWeightPerItem: 10,
        actualWeightUnit: "kg",
        divisor: 5000,
        precision: 2,
      });
      expect(res.isValid).toBe(true);
      // 50 * 40 * 30 / 5000 = 60000 / 5000 = 12 kg
      expect(res.extra?.volumetricWeightKg).toBeCloseTo(12, 2);
      expect(res.extra?.actualTotalWeightKg).toBe(10);
      expect(res.extra?.chargeableWeightKg).toBe(12); // Volumetric is higher
    });
  });

  describe("Volume Converter", () => {
    it("converts between liters and US gallons stably", () => {
      const res = calculateVolumeConverter({
        value: 100,
        fromUnit: "l",
        toUnit: "us_gal",
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      // 100 L / 3.785411784 ≈ 26.4172 US gal
      expect(res.primaryValue).toBeCloseTo(26.4172, 3);
    });

    it("converts between cubic meters and liters", () => {
      const res = calculateVolumeConverter({
        value: 2.5,
        fromUnit: "m3",
        toUnit: "l",
        precision: 2,
      });
      expect(res.isValid).toBe(true);
      expect(res.primaryValue).toBe(2500);
    });
  });

  describe("CFT to CBM Calculator", () => {
    it("converts 100 CFT to ~2.8317 CBM", () => {
      const res = calculateCftCbm({
        value: 100,
        direction: "cft-to-cbm",
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      expect(res.cbm).toBeCloseTo(2.8317, 3);
      expect(res.liters).toBeCloseTo(2831.68, 1);
    });

    it("converts 1 CBM to ~35.3147 CFT", () => {
      const res = calculateCftCbm({
        value: 1,
        direction: "cbm-to-cft",
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      expect(res.cft).toBeCloseTo(35.3147, 3);
    });
  });

  describe("Container CBM Calculator", () => {
    it("calculates 350 cartons of 50x40x30 cm and evaluates 20ft/40ft fit", () => {
      const res = calculateContainerCbm({
        length: 50,
        width: 40,
        height: 30,
        unit: "cm",
        quantity: 350,
        precision: 4,
      });
      expect(res.isValid).toBe(true);
      // single box = 0.06 CBM, 350 * 0.06 = 21.0 CBM
      expect(res.unitCbm).toBeCloseTo(0.06, 4);
      expect(res.totalCbm).toBeCloseTo(21.0, 3);
      expect(res.comparisons.length).toBe(3);
      // 21 CBM fits in a 20ft container (28-30 CBM capacity)
      expect(res.comparisons[0].containersNeededPractical).toBe(1);
    });
  });

  describe("Aquarium Volume Calculator", () => {
    it("calculates 90x45x45 cm rectangular aquarium with 10% displacement", () => {
      const res = calculateAquariumVolume({
        shape: "rectangular",
        length: 90,
        width: 45,
        height: 45,
        unit: "cm",
        displacementPercent: 10,
        waterType: "freshwater",
        precision: 2,
      });
      expect(res.isValid).toBe(true);
      // 90 * 45 * 45 / 1000 = 182.25 L gross
      expect(res.grossLiters).toBeCloseTo(182.25, 2);
      expect(res.grossUsGallons).toBeCloseTo(48.15, 2);
      // 182.25 * 0.9 = 164.025 L net
      expect(res.netLiters).toBeCloseTo(164.025, 2);
      expect(res.waterWeightKg).toBeCloseTo(164.025, 1);
    });

    it("calculates cylindrical aquarium volume accurately", () => {
      const res = calculateAquariumVolume({
        shape: "cylinder",
        length: 0,
        width: 0,
        height: 60,
        diameter: 50,
        unit: "cm",
        displacementPercent: 0,
        waterType: "freshwater",
        precision: 2,
      });
      expect(res.isValid).toBe(true);
      // r = 25 cm = 0.25 m, h = 0.6 m -> V = π * 0.0625 * 0.6 * 1000 ≈ 117.81 L
      expect(res.grossLiters).toBeCloseTo(117.81, 1);
    });
  });

  describe("Edge-Case Validation & Robustness", () => {
    it("formatNumber safely handles NaN, Infinity, -Infinity, undefined, null", () => {
      expect(formatNumber(undefined)).toBe("—");
      expect(formatNumber(null)).toBe("—");
      expect(formatNumber(NaN)).toBe("—");
      expect(formatNumber(Infinity)).toBe("—");
      expect(formatNumber(-Infinity)).toBe("—");
      expect(formatNumber(0)).toBe("0");
      expect(formatNumber(1234.5678, 2)).toBe("1,234.57");
    });

    it("Tank calculator rejects negative liquid depth", () => {
      const res = calculateTankVolume({
        shape: "rectangular",
        length: 2,
        width: 1,
        height: 1.5,
        lengthUnit: "m",
        widthUnit: "m",
        heightUnit: "m",
        diameterUnit: "m",
        liquidDepth: -1,
        depthUnit: "m",
        precision: 2,
      });
      expect(res.isValid).toBe(false);
      expect(res.errorMessage).toBe("Liquid depth cannot be a negative number.");
    });

    it("CBM calculator rejects non-positive quantity and negative weight", () => {
      const resZeroQty = calculateCbm([
        {
          id: "1",
          name: "Item",
          length: 10,
          width: 10,
          height: 10,
          lengthUnit: "cm",
          quantity: 0,
          weightUnit: "kg",
        },
      ]);
      expect(resZeroQty.isValid).toBe(false);
      expect(resZeroQty.errorMessage).toContain("invalid quantity");

      const resNegWeight = calculateCbm([
        {
          id: "1",
          name: "Item",
          length: 10,
          width: 10,
          height: 10,
          lengthUnit: "cm",
          quantity: 1,
          weightPerItem: -5,
          weightUnit: "kg",
        },
      ]);
      expect(resNegWeight.isValid).toBe(false);
      expect(resNegWeight.errorMessage).toContain("cannot be negative");
    });

    it("Volumetric weight calculator rejects non-positive quantity and negative weight", () => {
      const res = calculateVolumetricWeight({
        length: 50,
        width: 40,
        height: 30,
        lengthUnit: "cm",
        quantity: -1,
        actualWeightUnit: "kg",
        divisor: 5000,
        precision: 2,
      });
      expect(res.isValid).toBe(false);
      expect(res.errorMessage).toContain("Quantity must be a positive number");

      const resWeight = calculateVolumetricWeight({
        length: 50,
        width: 40,
        height: 30,
        lengthUnit: "cm",
        quantity: 1,
        actualWeightPerItem: -10,
        actualWeightUnit: "kg",
        divisor: 5000,
        precision: 2,
      });
      expect(resWeight.isValid).toBe(false);
      expect(resWeight.errorMessage).toContain("Actual weight cannot be negative");
    });

    it("Cubic feet calculator rejects non-positive quantity and negative cost", () => {
      const resQty = calculateCubicFeet({
        length: 2,
        width: 3,
        height: 4,
        lengthUnit: "ft",
        widthUnit: "ft",
        heightUnit: "ft",
        quantity: 0,
        precision: 2,
      });
      expect(resQty.isValid).toBe(false);

      const resCost = calculateCubicFeet({
        length: 2,
        width: 3,
        height: 4,
        lengthUnit: "ft",
        widthUnit: "ft",
        heightUnit: "ft",
        quantity: 1,
        costPerCuFt: -5,
        precision: 2,
      });
      expect(resCost.isValid).toBe(false);
    });

    it("Volume converter rejects negative volume", () => {
      const res = calculateVolumeConverter({
        value: -10,
        fromUnit: "l",
        toUnit: "m3",
        precision: 4,
      });
      expect(res.isValid).toBe(false);
      expect(res.errorMessage).toContain("non-negative number");
    });
  });
});

