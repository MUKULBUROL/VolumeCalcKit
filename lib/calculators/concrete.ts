import { LengthUnit, PrecisionOption } from "@/types/units";
import { toMeters, fromMeters } from "@/lib/conversions/length";
import { fromCubicMeters, getStandardVolumeConversions } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export type ConcreteStructureType = "slab" | "column" | "footing";

export interface ConcreteInputs {
  structureType: ConcreteStructureType;
  // Slab
  slabLength?: number;
  slabWidth?: number;
  slabThickness?: number; // usually in inches or cm
  slabDimensionUnit?: LengthUnit; // ft or m
  slabThicknessUnit?: LengthUnit; // in or cm

  // Column / Sonotube
  columnDiameter?: number; // usually in inches or cm
  columnDepth?: number; // usually in feet or meters
  columnQuantity?: number;
  columnDiameterUnit?: LengthUnit;
  columnDepthUnit?: LengthUnit;

  // Footing / Trench
  footingLength?: number;
  footingWidth?: number;
  footingDepth?: number;
  footingDimensionUnit?: LengthUnit;

  // Waste & Cost Options
  wastePercentage: number; // e.g. 10%
  costPerUnit?: number;
  costMode?: "per_yard" | "per_bag_80" | "per_bag_60";
  precision: PrecisionOption;
}

export interface ConcreteExtra {
  structureType: ConcreteStructureType;
  rawVolumeCuFt: number;
  rawVolumeCuYd: number;
  bufferedVolumeCuFt: number;
  bufferedVolumeCuYd: number;
  bufferedVolumeM3: number;
  wastePercentage: number;
  bags80lb: number;
  bags60lb: number;
  bags40lb: number;
  readyMixTruckloads: number;
  waterRequiredGal: number;
  curedWeightLbs: number;
  curedWeightTons: number;
  totalCostEstimate?: number;
  formatted: {
    rawVolumeCuYd: string;
    bufferedVolumeCuYd: string;
    bufferedVolumeCuFt: string;
    bufferedVolumeM3: string;
    bags80lb: string;
    bags60lb: string;
    readyMixTruckloads: string;
    waterRequiredGal: string;
    curedWeightLbs: string;
    curedWeightTons: string;
    totalCostEstimate?: string;
  };
}

export function calculateConcrete(
  inputs: ConcreteInputs
): CalculationResult<ConcreteExtra> {
  const {
    structureType,
    slabLength = 0,
    slabWidth = 0,
    slabThickness = 0,
    slabDimensionUnit = "ft",
    slabThicknessUnit = "in",
    columnDiameter = 0,
    columnDepth = 0,
    columnQuantity = 1,
    columnDiameterUnit = "in",
    columnDepthUnit = "ft",
    footingLength = 0,
    footingWidth = 0,
    footingDepth = 0,
    footingDimensionUnit = "ft",
    wastePercentage = 10,
    costPerUnit,
    costMode = "per_yard",
    precision = 2,
  } = inputs;

  let rawVolumeM3 = 0;
  let formulaDesc = "";

  if (structureType === "slab") {
    if (slabLength <= 0 || slabWidth <= 0 || slabThickness <= 0) {
      return {
        isValid: false,
        errorMessage: "Slab length, width, and thickness must be positive numbers greater than zero.",
      };
    }
    const lM = toMeters(slabLength, slabDimensionUnit);
    const wM = toMeters(slabWidth, slabDimensionUnit);
    const tM = toMeters(slabThickness, slabThicknessUnit);
    rawVolumeM3 = lM * wM * tM;
    formulaDesc = `Volume = Length × Width × Thickness`;
  } else if (structureType === "column") {
    if (columnDiameter <= 0 || columnDepth <= 0 || columnQuantity <= 0) {
      return {
        isValid: false,
        errorMessage: "Column diameter, depth, and quantity must be positive numbers.",
      };
    }
    const dM = toMeters(columnDiameter, columnDiameterUnit);
    const depthM = toMeters(columnDepth, columnDepthUnit);
    const rM = dM / 2;
    const singleM3 = Math.PI * rM * rM * depthM;
    rawVolumeM3 = singleM3 * columnQuantity;
    formulaDesc = `Volume = π × (Diameter ÷ 2)² × Depth × Quantity`;
  } else if (structureType === "footing") {
    if (footingLength <= 0 || footingWidth <= 0 || footingDepth <= 0) {
      return {
        isValid: false,
        errorMessage: "Footing length, width, and depth must be positive numbers.",
      };
    }
    const lM = toMeters(footingLength, footingDimensionUnit);
    const wM = toMeters(footingWidth, footingDimensionUnit);
    const dM = toMeters(footingDepth, footingDimensionUnit);
    rawVolumeM3 = lM * wM * dM;
    formulaDesc = `Volume = Length × Width × Depth`;
  }

  const wasteMultiplier = 1 + Math.max(0, wastePercentage) / 100;
  const bufferedVolumeM3 = rawVolumeM3 * wasteMultiplier;

  const rawVolumeCuFt = fromCubicMeters(rawVolumeM3, "ft3");
  const rawVolumeCuYd = fromCubicMeters(rawVolumeM3, "yd3");

  const bufferedVolumeCuFt = fromCubicMeters(bufferedVolumeM3, "ft3");
  const bufferedVolumeCuYd = fromCubicMeters(bufferedVolumeM3, "yd3");

  // Bag yields:
  // Standard 80-lb bag = 0.60 cu ft (45 bags per cubic yard)
  // Standard 60-lb bag = 0.45 cu ft (60 bags per cubic yard)
  // Standard 40-lb bag = 0.30 cu ft (90 bags per cubic yard)
  const bags80lb = Math.ceil(bufferedVolumeCuFt / 0.60);
  const bags60lb = Math.ceil(bufferedVolumeCuFt / 0.45);
  const bags40lb = Math.ceil(bufferedVolumeCuFt / 0.30);

  // Ready mix trucks carry ~10 cubic yards
  const readyMixTruckloads = bufferedVolumeCuYd / 10;

  // Water requirement: ~0.75 gallons per 80-lb bag
  const waterRequiredGal = bags80lb * 0.75;

  // Cured concrete weight: ~145 lbs/cu ft (~3,915 lbs/yd3 or 2,320 kg/m3)
  const curedWeightLbs = bufferedVolumeCuFt * 145;
  const curedWeightTons = curedWeightLbs / 2000;

  // Cost estimation
  let totalCostEstimate: number | undefined;
  if (costPerUnit && costPerUnit > 0) {
    if (costMode === "per_yard") {
      totalCostEstimate = bufferedVolumeCuYd * costPerUnit;
    } else if (costMode === "per_bag_80") {
      totalCostEstimate = bags80lb * costPerUnit;
    } else if (costMode === "per_bag_60") {
      totalCostEstimate = bags60lb * costPerUnit;
    }
  }

  const primaryFormatted = `${formatNumber(bufferedVolumeCuYd, precision)} yd³`;

  const conversions = getStandardVolumeConversions(bufferedVolumeM3, "yd3").map(
    (c) => ({
      unit: c.unit,
      unitLabel: c.unitLabel,
      value: c.value,
      formatted: formatNumber(c.value, precision),
    })
  );

  const steps = [
    {
      title: "1. Raw Geometric Volume",
      formula: formulaDesc,
      substitution: `Raw Volume = ${formatNumber(rawVolumeCuFt, 2)} ft³ (${formatNumber(rawVolumeCuYd, 2)} cubic yards)`,
      result: `${formatNumber(rawVolumeCuYd, 2)} yd³`,
      explanation: "Direct mathematical volume before excavation loss or spillage buffer.",
    },
    {
      title: `2. Safety & Excavation Buffer (+${wastePercentage}%)`,
      formula: `Total Volume = Raw Volume × (1 + ${wastePercentage}%)`,
      substitution: `${formatNumber(rawVolumeCuYd, 2)} yd³ × ${(wasteMultiplier).toFixed(2)}`,
      result: `${formatNumber(bufferedVolumeCuYd, precision)} yd³ (${formatNumber(bufferedVolumeCuFt, 1)} ft³)`,
      explanation: "Contractor standard safety margin to prevent coming up short on site.",
    },
    {
      title: "3. Pre-Mixed Concrete Bag Requirements",
      formula: "Bags (80 lb) = Volume (ft³) ÷ 0.60 ft³/bag | Bags (60 lb) = Volume (ft³) ÷ 0.45 ft³/bag",
      substitution: `${formatNumber(bufferedVolumeCuFt, 1)} ft³ ÷ 0.60 = ${bags80lb} bags (80 lb) | ÷ 0.45 = ${bags60lb} bags (60 lb)`,
      result: `${bags80lb} × 80-lb bags OR ${bags60lb} × 60-lb bags`,
      explanation: "Standard Home Depot / Lowe's bagged concrete mix yield counts.",
    },
  ];

  return {
    isValid: true,
    primaryValue: bufferedVolumeCuYd,
    primaryUnit: "yd³",
    primaryFormatted,
    conversions,
    steps,
    extra: {
      structureType,
      rawVolumeCuFt,
      rawVolumeCuYd,
      bufferedVolumeCuFt,
      bufferedVolumeCuYd,
      bufferedVolumeM3,
      wastePercentage,
      bags80lb,
      bags60lb,
      bags40lb,
      readyMixTruckloads,
      waterRequiredGal,
      curedWeightLbs,
      curedWeightTons,
      totalCostEstimate,
      formatted: {
        rawVolumeCuYd: `${formatNumber(rawVolumeCuYd, 2)} yd³`,
        bufferedVolumeCuYd: `${formatNumber(bufferedVolumeCuYd, 2)} yd³`,
        bufferedVolumeCuFt: `${formatNumber(bufferedVolumeCuFt, 1)} ft³`,
        bufferedVolumeM3: `${formatNumber(bufferedVolumeM3, 2)} m³`,
        bags80lb: `${bags80lb} bags`,
        bags60lb: `${bags60lb} bags`,
        readyMixTruckloads: readyMixTruckloads >= 1
          ? `~${formatNumber(readyMixTruckloads, 1)} truckloads (10 yd³ each)`
          : `Less than 1 truckload (${formatNumber(bufferedVolumeCuYd, 1)} yd³ of 10 yd³ truck)`,
        waterRequiredGal: `~${formatNumber(waterRequiredGal, 0)} gal (${formatNumber(waterRequiredGal * 3.78541, 0)} L)`,
        curedWeightLbs: `${formatNumber(curedWeightLbs, 0)} lbs`,
        curedWeightTons: `${formatNumber(curedWeightTons, 1)} US tons`,
        totalCostEstimate: totalCostEstimate
          ? `$${formatNumber(totalCostEstimate, 2)}`
          : undefined,
      },
    },
  };
}
