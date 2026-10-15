import React from "react";

export type DiagramType =
  | "cylinder"
  | "sphere"
  | "cone"
  | "conical_frustum"
  | "cube"
  | "rectangular_prism"
  | "tank_vertical"
  | "tank_horizontal"
  | "pipe"
  | "cbm_box"
  | "pool"
  | "concrete_slab";

interface DiagramSVGProps {
  type: DiagramType;
  className?: string;
  fillPercentage?: number;
}

export const DiagramSVG: React.FC<DiagramSVGProps> = ({
  type,
  className = "w-full max-w-[220px] h-auto mx-auto",
  fillPercentage = 0,
}) => {
  switch (type) {
    case "cbm_box":
      return (
        <svg
          viewBox="0 0 280 200"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="CBM box dimension diagram"
        >
          {/* 3D Isometric Cardboard Box */}
          {/* Top Face */}
          <polygon
            points="140,30 220,70 140,110 60,70"
            className="fill-amber-800/20 dark:fill-amber-700/30 stroke-amber-600 dark:stroke-amber-400"
            strokeWidth="1.5"
          />
          {/* Tape line across top */}
          <line x1="100" y1="50" x2="180" y2="90" className="stroke-amber-500/60 dark:stroke-amber-300/40" strokeWidth="6" strokeDasharray="4 2" />

          {/* Left Face */}
          <polygon
            points="60,70 140,110 140,175 60,135"
            className="fill-amber-900/30 dark:fill-amber-800/40 stroke-amber-600 dark:stroke-amber-400"
            strokeWidth="1.5"
          />

          {/* Right Face */}
          <polygon
            points="140,110 220,70 220,135 140,175"
            className="fill-amber-950/40 dark:fill-amber-900/50 stroke-amber-600 dark:stroke-amber-400"
            strokeWidth="1.5"
          />

          {/* Dimension Lines and Arrows matching Image 3 */}
          {/* Height (H) - Vertical on left */}
          <line x1="45" y1="70" x2="45" y2="135" className="stroke-blue-500 dark:stroke-cyan-400" strokeWidth="1.5" />
          <line x1="40" y1="70" x2="50" y2="70" className="stroke-blue-500 dark:stroke-cyan-400" strokeWidth="1.5" />
          <line x1="40" y1="135" x2="50" y2="135" className="stroke-blue-500 dark:stroke-cyan-400" strokeWidth="1.5" />
          <text x="38" y="105" textAnchor="end" className="fill-blue-600 dark:fill-cyan-400 text-[11px] font-mono font-bold">
            Height (H)
          </text>

          {/* Width (W) - Bottom Left */}
          <line x1="50" y1="145" x2="130" y2="185" className="stroke-blue-500 dark:stroke-cyan-400" strokeWidth="1.5" />
          <circle cx="50" cy="145" r="2" className="fill-blue-500 dark:fill-cyan-400" />
          <circle cx="130" cy="185" r="2" className="fill-blue-500 dark:fill-cyan-400" />
          <text x="75" y="180" className="fill-blue-600 dark:fill-cyan-400 text-[11px] font-mono font-bold">
            Width (W)
          </text>

          {/* Length (L) - Bottom Right */}
          <line x1="150" y1="185" x2="230" y2="145" className="stroke-blue-500 dark:stroke-cyan-400" strokeWidth="1.5" />
          <circle cx="150" cy="185" r="2" className="fill-blue-500 dark:fill-cyan-400" />
          <circle cx="230" cy="145" r="2" className="fill-blue-500 dark:fill-cyan-400" />
          <text x="200" y="180" className="fill-blue-600 dark:fill-cyan-400 text-[11px] font-mono font-bold">
            Length (L)
          </text>
        </svg>
      );
    case "cylinder":
      return (
        <svg
          viewBox="0 0 200 200"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Cylinder dimension diagram"
        >
          <ellipse cx="100" cy="50" rx="60" ry="20" className="fill-blue-50 dark:fill-blue-950/60 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <path
            d="M 40 50 L 40 150 A 60 20 0 0 0 160 150 L 160 50"
            className="fill-blue-50/40 dark:fill-blue-950/30 stroke-slate-800 dark:stroke-slate-200"
            strokeWidth="2"
          />
          <path
            d="M 40 150 A 60 20 0 0 1 160 150"
            className="stroke-slate-400 dark:stroke-slate-500 stroke-dashed"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line x1="100" y1="50" x2="160" y2="50" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" />
          <circle cx="100" cy="50" r="2.5" className="fill-blue-600 dark:fill-blue-400" />
          <text x="125" y="44" className="fill-blue-700 dark:fill-blue-300 text-[11px] font-mono font-bold">r (radius)</text>
          
          <line x1="175" y1="50" x2="175" y2="150" className="stroke-slate-600 dark:stroke-slate-400" strokeWidth="1.5" />
          <line x1="170" y1="50" x2="180" y2="50" className="stroke-slate-600 dark:stroke-slate-400" strokeWidth="1.5" />
          <line x1="170" y1="150" x2="180" y2="150" className="stroke-slate-600 dark:stroke-slate-400" strokeWidth="1.5" />
          <text x="184" y="105" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-mono font-bold">h (height)</text>
        </svg>
      );

    case "sphere":
      return (
        <svg
          viewBox="0 0 200 200"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Sphere dimension diagram"
        >
          <circle cx="100" cy="100" r="70" className="fill-indigo-50/50 dark:fill-indigo-950/50 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <ellipse cx="100" cy="100" rx="70" ry="24" className="stroke-slate-400 dark:stroke-slate-500 stroke-dashed" strokeWidth="1.5" strokeDasharray="4 3" />
          <path d="M 30 100 A 70 24 0 0 0 170 100" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="1.5" />
          <line x1="100" y1="100" x2="170" y2="100" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" />
          <circle cx="100" cy="100" r="2.5" className="fill-blue-600 dark:fill-blue-400" />
          <text x="128" y="92" className="fill-blue-700 dark:fill-blue-300 text-[11px] font-mono font-bold">r (radius)</text>
        </svg>
      );

    case "cone":
      return (
        <svg
          viewBox="0 0 200 200"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Cone dimension diagram"
        >
          <ellipse cx="100" cy="160" rx="60" ry="20" className="fill-amber-50/60 dark:fill-amber-950/50 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <path d="M 40 160 L 100 40 L 160 160" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <line x1="100" y1="40" x2="100" y2="160" className="stroke-slate-400 dark:stroke-slate-500 stroke-dashed" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="100" y1="160" x2="160" y2="160" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" />
          <circle cx="100" cy="160" r="2" className="fill-blue-600 dark:fill-blue-400" />
          <text x="125" y="154" className="fill-blue-700 dark:fill-blue-300 text-[11px] font-mono font-bold">r</text>
          <text x="84" y="100" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-mono font-bold">h</text>
          <text x="140" y="95" className="fill-amber-700 dark:fill-amber-300 text-[11px] font-mono font-bold">slant (s)</text>
        </svg>
      );

    case "conical_frustum":
      return (
        <svg
          viewBox="0 0 220 180"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Conical frustum dimension diagram"
        >
          {/* Top smaller ellipse */}
          <ellipse cx="110" cy="40" rx="36" ry="12" className="fill-slate-100 dark:fill-slate-800 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          {/* Body lines */}
          <path
            d="M 74 40 L 40 140 A 70 20 0 0 0 180 140 L 146 40"
            className="fill-slate-50 dark:fill-slate-800/50 stroke-slate-800 dark:stroke-slate-200"
            strokeWidth="2"
          />
          {/* Bottom larger ellipse dashed back arc */}
          <path d="M 40 140 A 70 20 0 0 1 180 140" className="stroke-slate-400 dark:stroke-slate-600 stroke-dashed" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Radius top line */}
          <line x1="110" y1="40" x2="146" y2="40" className="stroke-cyan-500" strokeWidth="2" />
          <circle cx="110" cy="40" r="2.5" className="fill-cyan-500" />
          <text x="116" y="34" className="fill-cyan-600 dark:fill-cyan-400 text-[10px] font-mono font-bold">r₁ (top)</text>
          {/* Radius bottom line */}
          <line x1="110" y1="140" x2="180" y2="140" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" />
          <circle cx="110" cy="140" r="2.5" className="fill-blue-600 dark:fill-blue-400" />
          <text x="120" y="156" className="fill-blue-700 dark:fill-blue-300 text-[10px] font-mono font-bold">r₂ (bottom)</text>
          {/* Height vertical center line */}
          <line x1="110" y1="40" x2="110" y2="140" className="stroke-slate-500 stroke-dashed" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="82" y="92" className="fill-slate-700 dark:fill-slate-200 text-[11px] font-mono font-bold">Height (h)</text>
          {/* Slant height label */}
          <text x="168" y="90" className="fill-amber-600 dark:fill-amber-400 text-[10px] font-mono font-bold">Slant (s)</text>
        </svg>
      );

    case "cube":
      return (
        <svg
          viewBox="0 0 200 200"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Cube dimension diagram"
        >
          <rect x="40" y="70" width="80" height="80" className="fill-emerald-50 dark:fill-emerald-950/50 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <path d="M 40 70 L 80 30 L 160 30 L 120 70 Z" className="fill-emerald-100/70 dark:fill-emerald-900/40 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <path d="M 120 70 L 160 30 L 160 110 L 120 150 Z" className="fill-emerald-200/50 dark:fill-emerald-900/60 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <text x="75" y="165" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-mono font-bold">a (side)</text>
          <text x="25" y="115" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-mono font-bold">a</text>
          <text x="145" y="140" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-mono font-bold">a</text>
        </svg>
      );

    case "rectangular_prism":
      return (
        <svg
          viewBox="0 0 220 180"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Rectangular prism dimension diagram"
        >
          <rect x="30" y="60" width="110" height="80" className="fill-sky-50 dark:fill-sky-950/50 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <path d="M 30 60 L 70 20 L 180 20 L 140 60 Z" className="fill-sky-100/70 dark:fill-sky-900/40 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <path d="M 140 60 L 180 20 L 180 100 L 140 140 Z" className="fill-sky-200/50 dark:fill-sky-900/60 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <text x="80" y="155" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-mono font-bold">Length (l)</text>
          <text x="6" y="105" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-mono font-bold">Height (h)</text>
          <text x="165" y="130" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-mono font-bold">Width (w)</text>
        </svg>
      );

    case "tank_vertical":
      return (
        <svg
          viewBox="0 0 200 200"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Vertical tank dimension diagram"
        >
          <ellipse cx="100" cy="40" rx="55" ry="18" className="fill-slate-100 dark:fill-slate-800 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <path
            d="M 45 40 L 45 160 A 55 18 0 0 0 155 160 L 155 40"
            className="fill-slate-50 dark:fill-slate-800/50 stroke-slate-800 dark:stroke-slate-200"
            strokeWidth="2"
          />
          {fillPercentage > 0 && (
            <path
              d={`M 45 ${160 - (fillPercentage * 1.2)} L 45 160 A 55 18 0 0 0 155 160 L 155 ${160 - (fillPercentage * 1.2)} A 55 18 0 0 1 45 ${160 - (fillPercentage * 1.2)}`}
              className="fill-blue-500/40 dark:fill-blue-500/50 stroke-blue-600 dark:stroke-blue-400"
              strokeWidth="1.5"
            />
          )}
          <text x="82" y="32" className="fill-slate-700 dark:fill-slate-200 text-[10px] font-mono font-bold">Diameter (D)</text>
          <text x="162" y="105" className="fill-slate-700 dark:fill-slate-200 text-[10px] font-mono font-bold">Height (H)</text>
        </svg>
      );

    case "tank_horizontal":
      return (
        <svg
          viewBox="0 0 220 160"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Horizontal tank dimension diagram"
        >
          <ellipse cx="50" cy="80" rx="25" ry="45" className="fill-slate-100 dark:fill-slate-800 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <path d="M 50 35 L 170 35 A 25 45 0 0 1 170 125 L 50 125" className="fill-slate-50 dark:fill-slate-800/50 stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <ellipse cx="170" cy="80" rx="25" ry="45" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          
          {fillPercentage > 0 && (
            <path
              d="M 50 100 L 170 100 A 25 25 0 0 1 170 125 L 50 125 A 25 25 0 0 1 50 100"
              className="fill-blue-500/40 dark:fill-blue-500/50"
            />
          )}

          <text x="95" y="25" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-mono font-bold">Length (L)</text>
          <text x="10" y="85" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-mono font-bold">Dia (D)</text>
        </svg>
      );

    case "pipe":
      return (
        <svg
          viewBox="0 0 220 140"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Pipe dimension diagram"
        >
          <ellipse cx="40" cy="70" rx="20" ry="40" className="stroke-slate-800 dark:stroke-slate-200 fill-slate-200 dark:fill-slate-700" strokeWidth="2" />
          <path d="M 40 30 L 180 30 A 20 40 0 0 1 180 110 L 40 110" className="stroke-slate-800 dark:stroke-slate-200 fill-slate-100 dark:fill-slate-800" strokeWidth="2" />
          <ellipse cx="180" cy="70" rx="20" ry="40" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />

          <ellipse cx="40" cy="70" rx="14" ry="28" className="stroke-blue-600 dark:stroke-blue-400 fill-blue-50 dark:fill-blue-950/50" strokeWidth="2" />
          <line x1="40" y1="42" x2="40" y2="98" className="stroke-blue-600 dark:stroke-blue-400 stroke-dashed" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="45" y="73" className="fill-blue-700 dark:fill-blue-300 text-[10px] font-mono font-bold">Inside Dia (ID)</text>
          <text x="95" y="20" className="fill-slate-800 dark:fill-slate-200 text-[11px] font-mono font-bold">Length (L)</text>
        </svg>
      );

    case "pool":
      return (
        <svg
          viewBox="0 0 240 160"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Swimming pool with shallow and deep end slope"
        >
          {/* Water Surface Polygon */}
          <polygon
            points="30,40 180,40 210,65 60,65"
            className="fill-cyan-400/30 dark:fill-cyan-500/30 stroke-cyan-500 dark:stroke-cyan-400"
            strokeWidth="1.5"
          />
          {/* Pool Walls with sloped bottom */}
          <line x1="30" y1="40" x2="30" y2="80" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <line x1="60" y1="65" x2="60" y2="105" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <line x1="30" y1="80" x2="180" y2="120" className="stroke-blue-600 dark:stroke-blue-400" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="60" y1="105" x2="210" y2="145" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <line x1="180" y1="40" x2="180" y2="120" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <line x1="210" y1="65" x2="210" y2="145" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <line x1="180" y1="120" x2="210" y2="145" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          <line x1="30" y1="80" x2="60" y2="105" className="stroke-slate-800 dark:stroke-slate-200" strokeWidth="2" />
          
          {/* Dimension Labels */}
          <text x="100" y="32" className="fill-slate-800 dark:fill-slate-200 text-[10px] font-mono font-bold">Length (L)</text>
          <text x="5" y="65" className="fill-blue-600 dark:fill-blue-400 text-[9px] font-mono font-bold">Shallow</text>
          <text x="185" y="100" className="fill-blue-700 dark:fill-blue-300 text-[9px] font-mono font-bold">Deep End</text>
          <text x="135" y="60" className="fill-slate-700 dark:fill-slate-300 text-[9px] font-mono">Width (W)</text>
        </svg>
      );

    case "concrete_slab":
      return (
        <svg
          viewBox="0 0 240 160"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Concrete slab dimension diagram"
        >
          {/* Top Face - Concrete gray texture */}
          <polygon
            points="30,50 170,30 215,85 75,105"
            className="fill-slate-300 dark:fill-slate-700 stroke-slate-700 dark:stroke-slate-300"
            strokeWidth="1.5"
          />
          {/* Front edge - Slab thickness */}
          <polygon
            points="75,105 215,85 215,115 75,135"
            className="fill-slate-400 dark:fill-slate-800 stroke-slate-700 dark:stroke-slate-300"
            strokeWidth="1.5"
          />
          {/* Left edge - Slab thickness */}
          <polygon
            points="30,50 75,105 75,135 30,80"
            className="fill-slate-500/80 dark:fill-slate-900 stroke-slate-700 dark:stroke-slate-300"
            strokeWidth="1.5"
          />
          {/* Dimension Lines */}
          <text x="80" y="30" className="fill-slate-800 dark:fill-slate-200 text-[10px] font-mono font-bold">Length (L)</text>
          <text x="160" y="105" className="fill-slate-800 dark:fill-slate-200 text-[10px] font-mono font-bold">Width (W)</text>
          <text x="15" y="105" className="fill-amber-600 dark:fill-amber-400 text-[10px] font-mono font-bold">Thickness (T)</text>
        </svg>
      );

    default:
      return null;
  }
};
