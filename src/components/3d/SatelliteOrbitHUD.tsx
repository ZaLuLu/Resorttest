import React from 'react';
import { ArrowDown } from 'lucide-react';

interface SatelliteOrbitHUDProps {
  progress: number;
  onTriggerZoom: () => void;
}

export const SatelliteOrbitHUD: React.FC<SatelliteOrbitHUDProps> = ({
  progress,
  onTriggerZoom,
}) => {
  const p = progress;

  // Fade out HUD as we break through into the resort grounds (0.68 -> 0.76)
  const hudOpacity = p < 0.68 ? 1 : Math.max(0, 1 - (p - 0.68) / 0.08);

  if (hudOpacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-5 sm:p-8 md:p-12 select-none transition-opacity duration-200"
      style={{ opacity: hudOpacity }}
    >
      {/* 1. TOP GEOGRAPHIC MARKERS: Coordinates on Left, Elevation on Right (Clean & Non-Glassmorphic) */}
      <div className="w-full flex items-start justify-between gap-4">
        {/* Left: Latitude & Longitude */}
        <div className="text-left">
          <span className="block font-mono text-[11px] sm:text-xs tracking-[0.22em] font-semibold text-[#D4AF37] uppercase">
            12.3375° N · 75.8062° E
          </span>
          <span className="block font-sans text-[10px] sm:text-[11px] text-white/70 tracking-widest uppercase mt-0.5 font-medium">
            Kodagu Highlands · Karnataka
          </span>
        </div>

        {/* Right: Elevation */}
        <div className="text-right">
          <span className="block font-mono text-[11px] sm:text-xs tracking-[0.22em] font-semibold text-[#D4AF37] uppercase">
            Elevation 850m ASL
          </span>
          <span className="block font-sans text-[10px] sm:text-[11px] text-white/70 tracking-widest uppercase mt-0.5 font-medium">
            Kaveri River Basin
          </span>
        </div>
      </div>

      {/* 2. REFINED, COMPACT 'SCROLL DOWN' BUTTON (Solid Luxury, Zero Glassmorphism) */}
      <div className="w-full flex justify-center pb-4 sm:pb-8 pointer-events-auto">
        <button
          onClick={onTriggerZoom}
          className="group px-7 sm:px-8 py-3 rounded-full bg-[#0B1210] hover:bg-[#14231F] text-[#FAF6EF] font-semibold text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-2.5 border border-[#C7A583]/70 hover:border-[#D4AF37] shadow-[0_12px_32px_rgba(0,0,0,0.9)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
        >
          <span>Scroll Down</span>
          <ArrowDown className="w-4 h-4 text-[#D4AF37] group-hover:translate-y-0.5 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default SatelliteOrbitHUD;
