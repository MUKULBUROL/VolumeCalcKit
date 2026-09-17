import { describe, it, expect } from "vitest";
import { convertLength, toMeters, fromMeters } from "@/lib/conversions/length";
import {
  convertVolume,
  toCubicMeters,
  fromCubicMeters,
} from "@/lib/conversions/volume";
import { convertWeight, toKg, fromKg } from "@/lib/conversions/weight";

describe("Length Unit Conversions", () => {
  it("converts meters correctly", () => {
    expect(toMeters(100, "cm")).toBe(1);
    expect(toMeters(1000, "mm")).toBe(1);
    expect(toMeters(1, "km")).toBe(1000);
    expect(toMeters(1, "m")).toBe(1);
    expect(toMeters(12, "in")).toBeCloseTo(0.3048, 6);
    expect(toMeters(3, "ft")).toBeCloseTo(0.9144, 6);
    expect(toMeters(1, "yd")).toBeCloseTo(0.9144, 6);
  });

  it("converts between non-meter units accurately", () => {
    expect(convertLength(12, "in", "ft")).toBeCloseTo(1, 6);
    expect(convertLength(36, "in", "yd")).toBeCloseTo(1, 6);
    expect(convertLength(100, "cm", "m")).toBe(1);
    expect(convertLength(1, "m", "cm")).toBe(100);
    expect(convertLength(0, "in", "m")).toBe(0);
    expect(convertLength(1, "in", "cm")).toBeCloseTo(2.54, 6);
  });
});

describe("Volume Unit Conversions", () => {
  it("converts liters to cubic meters", () => {
    expect(toCubicMeters(1000, "l")).toBeCloseTo(1, 6);
    expect(fromCubicMeters(1, "l")).toBeCloseTo(1000, 6);
  });

  it("converts US and Imperial gallons to liters correctly without confusion", () => {
    // 1 US gallon = 3.785411784 liters
    const litersInUsGallon = convertVolume(1, "us_gal", "l");
    expect(litersInUsGallon).toBeCloseTo(3.785411784, 6);

    // 1 Imperial gallon = 4.54609 liters
    const litersInImpGallon = convertVolume(1, "imp_gal", "l");
    expect(litersInImpGallon).toBeCloseTo(4.54609, 6);

    // Reverse conversions
    expect(convertVolume(3.785411784, "l", "us_gal")).toBeCloseTo(1, 6);
    expect(convertVolume(4.54609, "l", "imp_gal")).toBeCloseTo(1, 6);
  });

  it("converts cubic feet to cubic meters and yards", () => {
    // 27 cu ft = 1 cu yd
    const cuYards = convertVolume(27, "ft3", "yd3");
    expect(cuYards).toBeCloseTo(1, 6);

    // 1 cu m = ~35.3147 cu ft (exact 1 / 0.3048^3)
    const cuFt = convertVolume(1, "m3", "ft3");
    expect(cuFt).toBeCloseTo(35.3146667, 4);

    // 1 cu ft ≈ 28.316846592 L
    expect(convertVolume(1, "ft3", "l")).toBeCloseTo(28.316846592, 6);
  });

  it("converts cubic inches to cubic centimeters", () => {
    // 1 in^3 = (2.54)^3 cm^3 = 16.387064 cm^3
    expect(convertVolume(1, "in3", "cm3")).toBeCloseTo(16.387064, 6);
  });
});

describe("Weight Conversions", () => {
  it("converts kg and lbs accurately", () => {
    // 1 lb = 0.45359237 kg
    expect(toKg(1, "lb")).toBeCloseTo(0.45359237, 7);
    expect(fromKg(1, "lb")).toBeCloseTo(2.2046226, 5);
    expect(convertWeight(100, "kg", "lb")).toBeCloseTo(220.46226, 2);
  });
});

