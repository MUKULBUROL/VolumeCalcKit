import React from "react";

interface AdSlotProps {
  slotId?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slotId = "default-slot", className = "" }) => {
  // If ads are disabled or no ad client configured, collapse cleanly without blank space
  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  if (!adsEnabled) {
    return null;
  }

  return (
    <div
      className={`my-8 p-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-center ${className}`}
      data-ad-slot={slotId}
    >
      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-1">
        Advertisement
      </span>
      <div className="min-h-[90px] flex items-center justify-center text-xs text-slate-400">
        Ad Slot
      </div>
    </div>
  );
};
