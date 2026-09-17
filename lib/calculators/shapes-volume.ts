import { LengthUnit, VolumeUnit, PrecisionOption } from "@/types/units";
import { calculateCube, CubeInputs } from "./cube";
import { calculateRectangularPrism, RectangularPrismInputs } from "./rectangular-prism";
import { calculateCylinder, CylinderInputs } from "./cylinder";
import { calculateSphere, SphereInputs } from "./sphere";
import { calculateCone, ConeInputs } from "./cone";
import { CalculationResult } from "@/types/calculator";

export type ShapeType = "cube" | "rectangular_prism" | "cylinder" | "sphere" | "cone";

export interface UniversalVolumeInputs {
  shape: ShapeType;
  // Cube
  cubeSide?: number;
  cubeUnit?: LengthUnit;
  // Rectangular Prism
  rectLength?: number;
  rectWidth?: number;
  rectHeight?: number;
  rectLengthUnit?: LengthUnit;
  rectWidthUnit?: LengthUnit;
  rectHeightUnit?: LengthUnit;
  // Cylinder
  cylInputType?: "radius" | "diameter";
  cylRadiusOrDiameter?: number;
  cylRadiusUnit?: LengthUnit;
  cylHeight?: number;
  cylHeightUnit?: LengthUnit;
  // Sphere
  sphereInputType?: "radius" | "diameter";
  sphereRadiusOrDiameter?: number;
  sphereUnit?: LengthUnit;
  // Cone
  coneInputType?: "radius" | "diameter";
  coneRadiusOrDiameter?: number;
  coneRadiusUnit?: LengthUnit;
  coneHeight?: number;
  coneHeightUnit?: LengthUnit;
  // General Output
  outputVolumeUnit: VolumeUnit;
  precision: PrecisionOption;
}

export function calculateUniversalVolume(
  inputs: UniversalVolumeInputs
): CalculationResult {
  const { shape, outputVolumeUnit, precision } = inputs;

  switch (shape) {
    case "cube":
      return calculateCube({
        sideLength: inputs.cubeSide || 0,
        sideUnit: inputs.cubeUnit || "m",
        outputVolumeUnit,
        precision,
      });

    case "rectangular_prism":
      return calculateRectangularPrism({
        length: inputs.rectLength || 0,
        width: inputs.rectWidth || 0,
        height: inputs.rectHeight || 0,
        lengthUnit: inputs.rectLengthUnit || "m",
        widthUnit: inputs.rectWidthUnit || "m",
        heightUnit: inputs.rectHeightUnit || "m",
        outputVolumeUnit,
        precision,
      });

    case "cylinder":
      return calculateCylinder({
        inputType: inputs.cylInputType || "radius",
        radiusOrDiameter: inputs.cylRadiusOrDiameter || 0,
        radiusOrDiameterUnit: inputs.cylRadiusUnit || "m",
        height: inputs.cylHeight || 0,
        heightUnit: inputs.cylHeightUnit || "m",
        outputVolumeUnit,
        precision,
      });

    case "sphere":
      return calculateSphere({
        inputType: inputs.sphereInputType || "radius",
        radiusOrDiameter: inputs.sphereRadiusOrDiameter || 0,
        lengthUnit: inputs.sphereUnit || "m",
        outputVolumeUnit,
        precision,
      });

    case "cone":
      return calculateCone({
        inputType: inputs.coneInputType || "radius",
        radiusOrDiameter: inputs.coneRadiusOrDiameter || 0,
        radiusOrDiameterUnit: inputs.coneRadiusUnit || "m",
        height: inputs.coneHeight || 0,
        heightUnit: inputs.coneHeightUnit || "m",
        outputVolumeUnit,
        precision,
      });

    default:
      return {
        isValid: false,
        errorMessage: "Please select a valid geometric shape.",
      };
  }
}
