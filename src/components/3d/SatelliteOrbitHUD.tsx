import React from 'react';
import { ArrowDown, Radio } from 'lucide-react';

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
      {/* 1. VIEWPORT CORNER HUD BRACKETS - High-Tech Aerospace Emerald */}
      <div className="absolute top-3 left-3 sm:top-6 sm:left-6 w-8 h-8 border-t-2 border-l-2 border-emerald-400/80 shadow-[0_0_12px_rgba(52,211,153,0.5)] pointer-events-none" />
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 border-t-2 border-r-2 border-emerald-400/80 shadow-[0_0_12px_rgba(52,211,153,0.5)] pointer-events-none" />
      <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-8 h-8 border-b-2 border-l-2 border-emerald-400/80 shadow-[0_0_12px_rgba(52,211,153,0.5)] pointer-events-none" />
      <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 w-8 h-8 border-b-2 border-r-2 border-emerald-400/80 shadow-[0_0_12px_rgba(52,211,153,0.5)] pointer-events-none" />

      {/* 2. TOP TELEMETRY BAR - Emerald Aerospace & Gold Telemetry */}
      <div className="w-full flex items-start justify-between gap-4 font-mono text-[10px] sm:text-xs">
        {/* Top-Left: Satellite Recon Status */}
        <div className="space-y-1 bg-[#050C08]/90 backdrop-blur-xl px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-emerald-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.2)]">
          <div className="flex items-center gap-2 text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-300" />
            <span className="font-bold tracking-widest uppercase">SAT-VIEW // LAYA-SURVEYOR 01</span>
          </div>
          <div className="text-emerald-200/90 text-[10px] sm:text-[11px] flex items-center gap-2 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>OPTICAL FEED: 4K NASA BLUE MARBLE</span>
          </div>
        </div>

        {/* Top-Right: Dynamic Coordinates & Altitude Gauge */}
        <div className="text-right space-y-1 bg-[#050C08]/90 backdrop-blur-xl px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-emerald-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.2)]">
          <div className="text-slate-300 tracking-wider">
            COORD: <span className="text-white font-bold">12.3375° N, 75.8062° E</span>
          </div>
          <div className="flex items-center justify-end gap-2 text-[11px] sm:text-xs">
            <span className="text-slate-400">ALTITUDE:</span>
            <span className="text-amber-300 font-bold tracking-wider">{altitudeText}</span>
          </div>
          <div className="text-[9px] sm:text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
            {statusText}
          </div>
        </div>
      </div>

      {/* 3. CENTER TARGETING RETICLE OVER PIN */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="relative rounded-full border border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.25)] flex items-center justify-center transition-all duration-300"
          style={{
            width: p < 0.45 ? '160px' : p < 0.75 ? '90px' : '50px',
            height: p < 0.45 ? '160px' : p < 0.75 ? '90px' : '50px',
          }}
        >
          {/* Subtle open micro-ring at target center */}
          <div className="w-2.5 h-2.5 rounded-full border border-emerald-300/60 bg-emerald-400/10 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />

          {/* Precision Aerospace Cardinal Amber Ticks */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-[1.5px] bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.8)]" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-[1.5px] bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.8)]" />
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-[1.5px] bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.8)]" />
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3 w-[1.5px] bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.8)]" />
        </div>
      </div>

      {/* 4. TACTILE, ULTRA-READABLE CLICKABLE CALL TO ACTION (Bottom Center) */}
      <div className="w-full flex flex-col items-center justify-center pb-3 sm:pb-6 pointer-events-auto">
        <button
          onClick={onTriggerZoom}
          className="group relative px-4 sm:px-7 py-3 sm:py-3.5 rounded-full bg-neutral-950/95 hover:bg-[#07160E]/95 backdrop-blur-2xl border-2 border-emerald-400/70 hover:border-white text-white shadow-[0_12px_45px_rgba(0,0,0,0.95),0_0_30px_rgba(16,185,129,0.3)] flex items-center gap-3 sm:gap-4 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
        >
          {/* Tactile Emerald Action Node with Pulsing Ping Indicator */}
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-black flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.55)] group-hover:scale-110 transition-transform duration-200 shrink-0">
            <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping pointer-events-none" />
            <ArrowDown className="w-5 h-5 text-black stroke-[2.5] animate-bounce" />
          </div>

          <div className="text-left">
            <span className="block text-sm sm:text-base md:text-[17px] font-sans font-bold text-white tracking-wide leading-snug drop-shadow-sm group-hover:text-emerald-100 transition-colors">
              Scroll to find the most beautiful resort in Coorg ↓
            </span>
            <span className="block text-[10px] sm:text-xs text-emerald-400 font-mono font-semibold tracking-wider uppercase mt-0.5">
              1,200 KM ORBIT → RIVERSIDE SANCTUARY · CLICK OR SCROLL
            </span>
          </div>

          {/* Explicit 'ENTER ↓' Action Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 group-hover:bg-white text-black font-mono font-bold text-xs tracking-wider transition-all duration-200 shadow-[0_0_12px_rgba(52,211,153,0.4)] shrink-0 ml-1">
            <span>ENTER</span>
            <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SatelliteOrbitHUD;
