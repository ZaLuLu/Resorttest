import React from 'react';
import { ArrowDown, Radio, Crosshair } from 'lucide-react';

interface SatelliteOrbitHUDProps {
  progress: number;
  onTriggerZoom: () => void;
}

export const SatelliteOrbitHUD: React.FC<SatelliteOrbitHUDProps> = ({
  progress,
  onTriggerZoom,
}) => {
  const p = progress;

  // Fade out HUD as we break through the morning mist into the resort grounds (0.70 -> 0.78)
  const hudOpacity = p < 0.68 ? 1 : Math.max(0, 1 - (p - 0.68) / 0.09);

  if (hudOpacity <= 0.01) return null;

  // Dynamic descending altitude calculation based on scroll progress
  let altitudeText = '1,200 KM';
  let statusText = 'ORBITAL SCANNING';

  if (p < 0.45) {
    const km = Math.round(1200 - (p / 0.45) * 750);
    altitudeText = `${km.toLocaleString()} KM`;
    statusText = 'ORBITAL RECON';
  } else if (p < 0.75) {
    const km = Math.max(2, Math.round(450 - ((p - 0.45) / 0.3) * 448));
    altitudeText = km > 5 ? `${km} KM` : `${km} KM (LOW ORBIT)`;
    statusText = 'TARGET LOCKED // KODAGU HIGHLANDS';
  } else {
    altitudeText = '850 M (GROUND ZERO)';
    statusText = 'TOUCHDOWN // COORG LAYA RESORT';
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-8 md:p-10 select-none transition-opacity duration-200"
      style={{ opacity: hudOpacity }}
    >
      {/* 1. VIEWPORT CORNER HUD BRACKETS */}
      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 w-8 h-8 border-t-2 border-l-2 border-[#C7A583]/50 pointer-events-none" />
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 border-t-2 border-r-2 border-[#C7A583]/50 pointer-events-none" />
      <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-8 h-8 border-b-2 border-l-2 border-[#C7A583]/50 pointer-events-none" />
      <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 w-8 h-8 border-b-2 border-r-2 border-[#C7A583]/50 pointer-events-none" />

      {/* 2. TOP TELEMETRY BAR */}
      <div className="w-full flex items-start justify-between gap-4 font-mono text-[10px] sm:text-xs">
        {/* Top-Left: Satellite Recon Status */}
        <div className="space-y-1 bg-black/40 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-2 text-[#C7A583]">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span className="font-bold tracking-wider uppercase">SAT-VIEW // LAYA-SURVEYOR</span>
          </div>
          <div className="text-white/70 text-[10px] sm:text-[11px] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>OPTICAL FEED: 4K MULTISPECTRAL</span>
          </div>
        </div>

        {/* Top-Right: Dynamic Coordinates & Altitude Gauge */}
        <div className="text-right space-y-1 bg-black/40 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/10 shadow-lg">
          <div className="text-white/60 tracking-wider">
            COORD: <span className="text-[#FAF6EF] font-semibold">12.3375° N, 75.8062° E</span>
          </div>
          <div className="flex items-center justify-end gap-2 text-[11px] sm:text-xs">
            <span className="text-white/60">ALTITUDE:</span>
            <span className="text-[#C7A583] font-bold tracking-wider">{altitudeText}</span>
          </div>
          <div className="text-[9px] sm:text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
            {statusText}
          </div>
        </div>
      </div>

      {/* 3. CENTER TARGETING RETICLE OVER GLOBE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="relative rounded-full border border-[#C7A583]/25 flex items-center justify-center transition-all duration-300"
          style={{
            width: p < 0.45 ? '180px' : p < 0.75 ? '120px' : '70px',
            height: p < 0.45 ? '180px' : p < 0.75 ? '120px' : '70px',
          }}
        >
          <Crosshair className="w-6 h-6 text-[#C7A583]/60 animate-pulse" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-[#C7A583]/80" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-[#C7A583]/80" />
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 h-2 w-[1px] bg-[#C7A583]/80" />
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 h-2 w-[1px] bg-[#C7A583]/80" />
        </div>
      </div>

      {/* 4. BIG, UNMISSABLE SCROLL CALL TO ACTION (Bottom Center) */}
      <div className="w-full flex flex-col items-center justify-center pb-2 sm:pb-4 pointer-events-auto">
        <button
          onClick={onTriggerZoom}
          className="group relative px-6 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-black/80 via-[#0F3C28]/85 to-black/80 hover:from-[#165338] hover:via-[#A3733E]/80 hover:to-[#165338] backdrop-blur-xl border border-[#C7A583]/60 hover:border-[#FAF6EF] text-white shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_24px_rgba(199,165,131,0.3)] flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Pulsing down indicator */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#A3733E]/30 border border-[#C7A583] flex items-center justify-center group-hover:bg-[#C7A583] group-hover:text-black transition-all duration-300">
            <ArrowDown className="w-4 h-4 text-[#FAF6EF] group-hover:text-black animate-bounce" />
          </div>

          <div className="text-left">
            <span className="block text-xs sm:text-sm md:text-base font-display font-bold uppercase tracking-wider text-white group-hover:text-[#FAF6EF]">
              Scroll to find the most beautiful resort in Coorg ↓
            </span>
            <span className="block text-[10px] sm:text-xs text-[#C7A583] font-medium tracking-wide font-mono">
              1,200 KM ORBIT → RIVERSIDE SANCTUARY · CLICK OR SCROLL
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SatelliteOrbitHUD;
