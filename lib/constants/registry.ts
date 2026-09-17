import { CalculatorMeta } from "@/types/calculator";

export const CALCULATORS_REGISTRY: CalculatorMeta[] = [
  {
    slug: "volume-calculator",
    title: "Volume Calculator – Calculate 3D Shape Volume | VolumeCalcKit",
    h1: "Volume Calculator",
    shortDescription:
      "Calculate the volume of any 3D shape including cubes, prisms, cylinders, spheres, and cones with instant unit conversions.",
    metaDescription:
      "Calculate 3D shape volume for cylinders, spheres, cones, cubes, and rectangular prisms. Includes step-by-step formulas and instant unit conversions.",
    category: "geometry",
    keywords: [
      "volume calculator",
      "calculate volume",
      "volume of shapes",
      "volume formulas",
      "3d volume calculator",
    ],
    relatedCalculators: [
      "cylinder-volume-calculator",
      "rectangular-prism-volume-calculator",
      "sphere-volume-calculator",
      "cone-volume-calculator",
      "cube-volume-calculator",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "V = Base Area × Height (varies by geometric solid)",
    popular: true,
  },
  {
    slug: "cbm-calculator",
    title: "CBM Calculator – CM, Inches, MM & Shipping Volume",
    h1: "CBM Calculator",
    shortDescription:
      "Calculate shipment CBM from carton length, width, height and quantity. Enter dimensions in cm, mm, meters, inches or feet and get total cubic meters and cubic feet instantly.",
    metaDescription:
      "Calculate CBM from cm, mm, inches or meters for one or multiple cartons. Get total cubic meters, cubic feet and shipment volume instantly.",
    category: "shipping",
    keywords: [
      "cbm calculator",
      "cbm calculator in cm",
      "cbm calculator in inches",
      "cbm calculator online",
      "cbm calculator in mm",
      "cbm calculator formula",
      "cbm calculator from inches",
    ],
    relatedCalculators: [
      "cft-to-cbm-calculator",
      "container-cbm-calculator",
      "cubic-meter-calculator",
      "cubic-feet-calculator",
      "volumetric-weight-calculator",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "CBM = Length(m) × Width(m) × Height(m) × Quantity",
    popular: true,
  },
  {
    slug: "cft-to-cbm-calculator",
    title: "CFT to CBM Calculator – Cubic Feet to Cubic Meters",
    h1: "CFT to CBM Calculator",
    shortDescription:
      "Convert cubic feet (CFT) to cubic meters (CBM) or CBM to CFT instantly with standard SI conversion factors.",
    metaDescription:
      "Convert cubic feet to cubic meters (CFT to CBM) or CBM to CFT instantly. Accurate standard SI conversion factors for freight and cargo.",
    category: "shipping",
    keywords: [
      "cft to cbm calculator",
      "cubic feet to cbm",
      "cft to cubic meter",
      "cbm to cft",
      "convert cft to cbm",
      "cubic feet to cubic meters",
    ],
    relatedCalculators: [
      "cbm-calculator",
      "container-cbm-calculator",
      "cubic-feet-calculator",
      "cubic-meter-calculator",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "1 CBM ≈ 35.3147 CFT (CFT ÷ 35.3147)",
    popular: true,
  },
  {
    slug: "container-cbm-calculator",
    title: "Container CBM Calculator – 20ft, 40ft & 40HC",
    h1: "Container CBM Calculator",
    shortDescription:
      "Calculate cargo CBM and estimate container capacity requirements for 20ft, 40ft, and 40ft High Cube containers.",
    metaDescription:
      "Calculate cargo CBM and estimate container capacity requirements for 20ft, 40ft and 40ft High Cube standard shipping containers.",
    category: "shipping",
    keywords: [
      "container cbm calculator",
      "20ft container cbm",
      "40ft container cbm",
      "40hc cbm",
      "shipping container cbm calculator",
      "container capacity calculator",
    ],
    relatedCalculators: [
      "cbm-calculator",
      "cft-to-cbm-calculator",
      "cubic-meter-calculator",
      "volumetric-weight-calculator",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "20ft: 28–30 CBM | 40ft: 58–62 CBM | 40HC: 68–72 CBM",
    popular: true,
  },
  {
    slug: "tank-volume-calculator",
    title: "Tank Volume Calculator – Litres, Gallons & Partial Fill",
    h1: "Tank Volume Calculator",
    shortDescription:
      "Calculate water tank volume and liquid capacity in litres, gallons and cubic meters for rectangular, vertical cylindrical and horizontal tanks.",
    metaDescription:
      "Calculate water tank volume and liquid capacity in litres, gallons and cubic meters for rectangular, vertical cylindrical and horizontal tanks.",
    category: "capacity",
    keywords: [
      "tank volume calculator",
      "water tank volume calculator",
      "water volume calculator",
      "tank volume calculator litres",
      "tank capacity calculator",
      "cylindrical tank volume calculator",
      "horizontal tank volume calculator",
      "tank volume gallons",
    ],
    relatedCalculators: [
      "cylinder-volume-calculator",
      "pipe-volume-calculator",
      "aquarium-volume-calculator",
      "volume-converter",
      "rectangular-prism-volume-calculator",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "V = Base Area × Height (with dip segment partial fill)",
    popular: true,
  },
  {
    slug: "cylinder-volume-calculator",
    title: "Cylinder Volume Calculator – Radius, Diameter & Litres",
    h1: "Cylinder Volume Calculator",
    shortDescription:
      "Calculate cylinder volume from radius or diameter and height. Get results in cubic units, litres, gallons, cubic feet and cubic meters.",
    metaDescription:
      "Calculate cylinder volume from radius or diameter and height. Get results in cubic units, litres, gallons, cubic feet and cubic meters.",
    category: "geometry",
    keywords: [
      "cylinder volume calculator",
      "volume of cylinder calculator",
      "cylinder capacity calculator",
      "cylinder volume using diameter",
      "cylinder volume in litres",
      "cylinder volume gallons",
      "cylinder volume formula",
    ],
    relatedCalculators: [
      "tank-volume-calculator",
      "pipe-volume-calculator",
      "aquarium-volume-calculator",
      "cone-volume-calculator",
      "volume-converter",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "V = π × r² × h = (π/4) × d² × h",
    popular: true,
  },
  {
    slug: "pipe-volume-calculator",
    title: "Pipe Volume Calculator – Water Capacity in Litres & Gallons",
    h1: "Pipe Volume Calculator",
    shortDescription:
      "Calculate pipe internal volume, fluid capacity in litres and gallons, volume per foot/meter, and water weight from inside diameter.",
    metaDescription:
      "Calculate pipe internal volume, liquid capacity in liters and gallons, volume per foot and per meter, and approximate water weight.",
    category: "capacity",
    keywords: [
      "pipe volume calculator",
      "pipe capacity calculator",
      "water volume in pipe",
      "pipe volume litres",
      "pipe volume gallons",
      "pipe volume per foot",
      "pipe volume per meter",
    ],
    relatedCalculators: [
      "cylinder-volume-calculator",
      "tank-volume-calculator",
      "aquarium-volume-calculator",
      "volume-converter",
      "cubic-feet-calculator",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "V = π × (ID / 2)² × Length",
    popular: false,
  },
  {
    slug: "aquarium-volume-calculator",
    title: "Aquarium Volume Calculator – Litres & Gallons",
    h1: "Aquarium Volume Calculator",
    shortDescription:
      "Calculate aquarium water volume in litres, US gallons and Imperial gallons from tank dimensions. Estimate gross and usable fish tank capacity.",
    metaDescription:
      "Calculate aquarium water volume in litres, US gallons and Imperial gallons from tank dimensions. Estimate gross and usable fish tank capacity.",
    category: "capacity",
    keywords: [
      "aquarium volume calculator",
      "fish tank volume calculator",
      "aquarium litres calculator",
      "aquarium gallons calculator",
      "aquarium capacity calculator",
      "water volume calculator aquarium",
      "fish tank gallons calculator",
    ],
    relatedCalculators: [
      "tank-volume-calculator",
      "cylinder-volume-calculator",
      "pipe-volume-calculator",
      "volume-converter",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "Liters = (L × W × H in cm) / 1,000 | Gal = (L × W × H in in) / 231",
    popular: false,
  },
  {
    slug: "cubic-feet-calculator",
    title: "Cubic Feet Calculator (cu ft) – Volume & Cost Estimator",
    h1: "Cubic Feet Calculator",
    shortDescription:
      "Calculate volume in cubic feet (ft³) from inches, feet, yards, or metric dimensions with optional material pricing estimation.",
    metaDescription:
      "Calculate cubic feet (cu ft) from length, width, and height. Includes unit conversions to cubic yards, liters, and estimated material pricing.",
    category: "shipping",
    keywords: [
      "cubic feet calculator",
      "calculate cubic feet",
      "cu ft calculator",
      "cubic footage",
      "cubic feet to yards",
    ],
    relatedCalculators: [
      "cft-to-cbm-calculator",
      "cbm-calculator",
      "cubic-yard-calculator",
      "cubic-meter-calculator",
      "rectangular-prism-volume-calculator",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "Volume (ft³) = Length(ft) × Width(ft) × Height(ft) × Qty",
    popular: true,
  },
  {
    slug: "cubic-meter-calculator",
    title: "Cubic Meter Calculator (m³) – Volume & Capacity",
    h1: "Cubic Meter Calculator",
    shortDescription:
      "Calculate volume in cubic meters (m³) from millimeters, centimeters, meters, inches, or feet with complete conversions.",
    metaDescription:
      "Convert dimensions to cubic meters (m³ / cu m). Instant conversions to liters, cubic centimeters, cubic feet, and gallons.",
    category: "shipping",
    keywords: [
      "cubic meter calculator",
      "m3 calculator",
      "calculate cubic meters",
      "cubic metre calculator",
      "m3 to liters",
    ],
    relatedCalculators: [
      "cbm-calculator",
      "cft-to-cbm-calculator",
      "cubic-feet-calculator",
      "volume-converter",
      "cubic-yard-calculator",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "Volume (m³) = Length(m) × Width(m) × Height(m) × Qty",
    popular: true,
  },
  {
    slug: "cubic-yard-calculator",
    title: "Cubic Yard Calculator (yd³) – Soil, Concrete, Mulch & Gravel",
    h1: "Cubic Yard Calculator",
    shortDescription:
      "Calculate cubic yards (yd³) from length, width, and depth in feet, inches, or meters. Includes material pricing estimation.",
    metaDescription:
      "Calculate cubic yards for landscaping, concrete, topsoil, mulch, and gravel. Includes cost estimation per yard and cubic feet conversion.",
    category: "shipping",
    keywords: [
      "cubic yard calculator",
      "calculate cubic yards",
      "soil calculator",
      "concrete cubic yards",
      "mulch calculator",
    ],
    relatedCalculators: [
      "cubic-feet-calculator",
      "cubic-meter-calculator",
      "rectangular-prism-volume-calculator",
      "volume-converter",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "Volume (yd³) = (Length × Width × Depth in feet) / 27",
    popular: false,
  },
  {
    slug: "volumetric-weight-calculator",
    title: "Volumetric Weight Calculator – Dimensional Weight for Air & Courier",
    h1: "Volumetric Weight Calculator",
    shortDescription:
      "Calculate dimensional weight and chargeable shipping weight using standard 5000, 6000, or custom courier divisors.",
    metaDescription:
      "Calculate volumetric (dimensional) weight and determine chargeable weight for air freight, DHL, FedEx, UPS, and express couriers.",
    category: "shipping",
    keywords: [
      "volumetric weight calculator",
      "dimensional weight calculator",
      "chargeable weight calculator",
      "air freight volumetric weight",
      "dhl volumetric weight",
    ],
    relatedCalculators: [
      "cbm-calculator",
      "cft-to-cbm-calculator",
      "container-cbm-calculator",
      "cubic-meter-calculator",
      "cubic-feet-calculator",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "Volumetric Weight (kg) = (L × W × H in cm) / Divisor",
    popular: false,
  },
  {
    slug: "volume-converter",
    title: "Volume Converter – Liters, Gallons, m³, ft³, and Ounces",
    h1: "Volume Converter",
    shortDescription:
      "Convert instantly between liters, milliliters, cubic meters, cubic feet, cubic inches, US gallons, and imperial gallons.",
    metaDescription:
      "Accurate volume and capacity unit converter. Convert between metric, US customary, and Imperial liquid and cubic measurements instantly.",
    category: "conversion",
    keywords: [
      "volume converter",
      "liters to gallons",
      "cubic feet to cubic meters",
      "ml to oz",
      "gallons to liters",
    ],
    relatedCalculators: [
      "cft-to-cbm-calculator",
      "cbm-calculator",
      "cubic-feet-calculator",
      "cubic-meter-calculator",
      "cylinder-volume-calculator",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "Exact SI normalized conversion factors",
    popular: true,
  },
  {
    slug: "rectangular-prism-volume-calculator",
    title: "Rectangular Prism Volume Calculator – Box & Cuboid",
    h1: "Rectangular Prism Volume Calculator",
    shortDescription:
      "Calculate the volume, surface area, and space diagonal of rectangular prisms, boxes, and cuboids.",
    metaDescription:
      "Calculate rectangular prism (box) volume, surface area, and corner-to-corner space diagonal. Supports mixed measurement units.",
    category: "geometry",
    keywords: [
      "rectangular prism volume calculator",
      "box volume calculator",
      "cuboid volume",
      "volume of a rectangular prism",
      "prism surface area",
    ],
    relatedCalculators: [
      "cube-volume-calculator",
      "cubic-feet-calculator",
      "cbm-calculator",
      "volume-calculator",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "V = Length × Width × Height",
    popular: false,
  },
  {
    slug: "cube-volume-calculator",
    title: "Cube Volume Calculator – Side Length, Surface Area & Diagonals",
    h1: "Cube Volume Calculator",
    shortDescription:
      "Calculate cube volume, surface area, face diagonal, and space diagonal from edge length with instant unit conversions.",
    metaDescription:
      "Calculate the volume of a cube (V = a³) with step-by-step formulas, surface area, face diagonal, and space diagonal calculations.",
    category: "geometry",
    keywords: [
      "cube volume calculator",
      "volume of a cube",
      "cube formula",
      "cube surface area",
      "cube space diagonal",
    ],
    relatedCalculators: [
      "rectangular-prism-volume-calculator",
      "sphere-volume-calculator",
      "volume-calculator",
      "volume-converter",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "V = a³",
    popular: false,
  },
  {
    slug: "sphere-volume-calculator",
    title: "Sphere Volume Calculator – Radius, Diameter & Surface Area",
    h1: "Sphere Volume Calculator",
    shortDescription:
      "Calculate sphere volume, surface area, and circumference from radius or diameter with full mathematical derivation.",
    metaDescription:
      "Calculate the volume of a sphere (V = 4/3 π r³) from radius or diameter. Accurate surface area and circumference calculations.",
    category: "geometry",
    keywords: [
      "sphere volume calculator",
      "volume of a sphere",
      "sphere formula",
      "sphere surface area",
      "ball volume",
    ],
    relatedCalculators: [
      "cylinder-volume-calculator",
      "cone-volume-calculator",
      "volume-calculator",
      "volume-converter",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "V = ⁴⁄₃ × π × r³",
    popular: false,
  },
  {
    slug: "cone-volume-calculator",
    title: "Cone Volume Calculator – Radius, Height & Slant Height",
    h1: "Cone Volume Calculator",
    shortDescription:
      "Calculate cone volume, slant height, base area, and lateral surface area from radius or diameter and vertical height.",
    metaDescription:
      "Calculate cone volume (V = 1/3 π r² h), slant height, and surface area. Instant conversions to liters, gallons, and cubic units.",
    category: "geometry",
    keywords: [
      "cone volume calculator",
      "volume of a cone",
      "cone formula",
      "cone slant height",
      "cone surface area",
    ],
    relatedCalculators: [
      "cylinder-volume-calculator",
      "sphere-volume-calculator",
      "volume-calculator",
      "volume-converter",
    ],
    lastReviewed: "2026-03-10",
    formulaSummary: "V = ⅓ × π × r² × h",
    popular: false,
  },
];

export const SITE_CONFIG = {
  name: "VolumeCalcKit",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com",
  tagline: "Volume, Capacity & Cubic Measurement Calculators",
  description:
    "Fast, accurate, and ad-friendly online volume, capacity, CBM, tank, and cubic measurement calculators with instant unit conversions.",
  author: "VolumeCalcKit Engineering",
};

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATORS_REGISTRY.find((c) => c.slug === slug);
}

export function getPopularCalculators(): CalculatorMeta[] {
  return CALCULATORS_REGISTRY.filter((c) => c.popular);
}

export function getCalculatorsByCategory(category: string): CalculatorMeta[] {
  return CALCULATORS_REGISTRY.filter((c) => c.category === category);
}

export function getRelatedCalculators(slug: string): CalculatorMeta[] {
  const current = getCalculatorBySlug(slug);
  if (!current) return [];
  return current.relatedCalculators
    .map((s) => getCalculatorBySlug(s))
    .filter((c): c is CalculatorMeta => c !== undefined);
}
