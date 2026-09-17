import React from "react";

export type DiagramType =
  | "cylinder"
  | "sphere"
  | "cone"
  | "cube"
  | "rectangular_prism"
  | "tank_vertical"
  | "tank_horizontal"
  | "pipe";

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

    default:
      return null;
  }
};
