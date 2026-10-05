import React from "react";

export const HeroVisualBlueprint: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full max-w-lg mx-auto ${className}`}>
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <svg
        viewBox="0 0 520 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
        aria-hidden="true"
      >
        {/* Isometric Grid Floor */}
        <g stroke="currentColor" className="text-blue-500/10 dark:text-blue-400/15" strokeWidth="1">
          <line x1="60" y1="260" x2="260" y2="150" />
          <line x1="120" y1="290" x2="320" y2="180" />
          <line x1="180" y1="320" x2="380" y2="210" />
          <line x1="260" y1="150" x2="460" y2="260" />
          <line x1="200" y1="180" x2="400" y2="290" />
          <line x1="140" y1="210" x2="340" y2="320" />
        </g>

        {/* 1. Main Isometric Blueprint Box / CBM Container */}
        <g className="transition-all duration-300 hover:opacity-100 opacity-95">
          {/* Top Face */}
          <polygon
            points="260,60 360,115 260,170 160,115"
            className="fill-blue-500/15 stroke-blue-400"
            strokeWidth="2"
          />
          {/* Left Face */}
          <polygon
            points="160,115 260,170 260,270 160,215"
            className="fill-blue-600/25 stroke-blue-400"
            strokeWidth="2"
          />
          {/* Right Face */}
          <polygon
            points="260,170 360,115 360,215 260,270"
            className="fill-blue-700/35 stroke-blue-400"
            strokeWidth="2"
          />

          {/* Internal Wireframe Lines */}
          <line x1="160" y1="115" x2="260" y2="170" stroke="rgba(56,189,248,0.4)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="260" y1="60" x2="260" y2="170" stroke="rgba(56,189,248,0.4)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Dimension Arrows & Text */}
          {/* Length (L) */}
          <line x1="140" y1="225" x2="240" y2="280" className="stroke-cyan-400" strokeWidth="1.5" />
          <circle cx="140" cy="225" r="2.5" className="fill-cyan-400" />
          <circle cx="240" cy="280" r="2.5" className="fill-cyan-400" />
          <text x="175" y="270" className="fill-cyan-300 font-mono text-[12px] font-bold">L (Length)</text>

          {/* Width (W) */}
          <line x1="280" y1="280" x2="380" y2="225" className="stroke-cyan-400" strokeWidth="1.5" />
          <circle cx="280" cy="280" r="2.5" className="fill-cyan-400" />
          <circle cx="380" cy="225" r="2.5" className="fill-cyan-400" />
          <text x="340" y="270" className="fill-cyan-300 font-mono text-[12px] font-bold">W (Width)</text>

          {/* Height (H) */}
          <line x1="135" y1="115" x2="135" y2="215" className="stroke-blue-400" strokeWidth="1.5" />
          <line x1="130" y1="115" x2="140" y2="115" className="stroke-blue-400" strokeWidth="1.5" />
          <line x1="130" y1="215" x2="140" y2="215" className="stroke-blue-400" strokeWidth="1.5" />
          <text x="75" y="170" className="fill-blue-300 font-mono text-[12px] font-bold">H (Height)</text>
        </g>

        {/* 2. Floating Secondary Cylindrical Pipe (Top-Right) */}
        <g transform="translate(370, 40) scale(0.65)" className="opacity-80">
          <ellipse cx="70" cy="30" rx="35" ry="14" className="fill-cyan-500/20 stroke-cyan-400" strokeWidth="2" />
          <path d="M 35 30 L 35 110 A 35 14 0 0 0 105 110 L 105 30" className="fill-cyan-600/20 stroke-cyan-400" strokeWidth="2" />
          <ellipse cx="70" cy="30" rx="20" ry="8" className="stroke-cyan-300 stroke-dashed" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="45" y="140" className="fill-cyan-300 font-mono text-[14px] font-bold">Pipe / Dia</text>
        </g>

        {/* 3. Floating Secondary Tank Geometry (Top-Left) */}
        <g transform="translate(25, 45) scale(0.6)" className="opacity-80">
          <ellipse cx="50" cy="50" rx="18" ry="32" className="fill-blue-500/20 stroke-blue-400" strokeWidth="2" />
          <path d="M 50 18 L 130 18 A 18 32 0 0 1 130 82 L 50 82" className="fill-blue-600/20 stroke-blue-400" strokeWidth="2" />
          <ellipse cx="130" cy="50" rx="18" ry="32" className="stroke-blue-400" strokeWidth="2" />
          <text x="50" y="110" className="fill-blue-300 font-mono text-[14px] font-bold">Tank / Liquid</text>
        </g>
      </svg>
    </div>
  );
};
