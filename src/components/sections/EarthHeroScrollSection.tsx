import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, ChevronRight } from 'lucide-react';
import { RealisticEarthCanvas } from '../3d/RealisticEarthCanvas';

gsap.registerPlugin(ScrollTrigger);

interface EarthHeroScrollSectionProps {
  onOpenEnquiry: () => void;
}

export const EarthHeroScrollSection: React.FC<EarthHeroScrollSectionProps> = ({
  onOpenEnquiry,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    // Create GSAP ScrollTrigger that pins the viewport securely
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=3200', // 3200px scroll distance for smooth scrubbing control
      pin: pinRef.current,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const p = scrollProgress;

  // Phase 0: Space HUD on Left Side (0 -> 0.35)
  const spaceHudOpacity = p < 0.2 ? 1 : Math.max(0, 1 - (p - 0.2) / 0.15);
  const spaceHudY = (p / 0.35) * -30;

  // Phase 1: Small Side Telemetry on Left Side (0.28 -> 0.72)
  let targetHudOpacity = 0;
  if (p >= 0.25 && p <= 0.72) {
    if (p < 0.38) {
      targetHudOpacity = (p - 0.25) / 0.13;
    } else if (p > 0.6) {
      targetHudOpacity = Math.max(0, 1 - (p - 0.6) / 0.12);
    } else {
      targetHudOpacity = 1;
    }
  }

  // Phase 2: Clean Cloud Dive (No centered text obstructing the view)
  // Phase 3: Resort Background Reveal (0.75 -> 1.0)
  const resortBgOpacity = p < 0.75 ? 0 : Math.min(1, (p - 0.75) / 0.15);
  const resortBgScale = 1.12 - Math.max(0, (p - 0.75) / 0.25) * 0.12;

  // Phase 4: Monumental Block "LAYA" Title & CTAs (0.8 -> 1.0)
  const layaBlockOpacity = p < 0.8 ? 0 : Math.min(1, (p - 0.8) / 0.14);
  const layaBlockY = Math.max(0, (1 - (p - 0.8) / 0.2) * 40);

  return (
    <div ref={containerRef} className="relative w-full bg-[#000000] select-none">
      {/* Pinned Stage Viewport */}
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#000000] text-white"
      >
        {/* 3D Realistic Earth Canvas (Centered in Middle with Clean Pinpoint) */}
        <RealisticEarthCanvas progress={scrollProgress} />

        {/* ========================================================================= */}
        {/* PHASE 0 OVERLAY: Monochrome Typewriter Typography on Left Side             */}
        {/* ========================================================================= */}
        <div
          className="absolute left-6 sm:left-12 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-sm sm:max-w-md lg:max-w-lg z-20 pointer-events-none transition-all duration-150 font-['Courier_Prime',_'Courier_New',_monospace] space-y-4 text-white"
          style={{
            opacity: spaceHudOpacity,
            transform: `translateY(calc(-50% + ${spaceHudY}px))`,
            display: spaceHudOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          {/* Monochrome Typewriter Kicker */}
          <div className="flex items-center gap-2 text-xs tracking-[0.25em] text-white/50 uppercase">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span>// 01. A PRIVATE BOTANICAL RETREAT</span>
          </div>

          {/* Typewriter Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl tracking-tight text-white font-normal leading-[1.18]">
            A Journey to <br />
            <span className="text-white/90 font-bold">
              Untouched Nature
            </span>
          </h2>

          {/* Typewriter Paragraph */}
          <p className="text-sm md:text-base text-white/70 tracking-normal leading-relaxed pt-1">
            Scroll to descend through space into the mist-cradled canopy of the Western Ghats.
          </p>

          {/* Typewriter Scroll Prompt */}
          <div className="flex items-center gap-3 pt-4 text-[11px] tracking-[0.25em] text-white/40 uppercase">
            <span>SCROLL TO DESCEND</span>
            <div className="w-8 h-[1px] bg-white/40 animate-pulse" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 1 OVERLAY: Sleek Minimal Side Telemetry on Left Side                 */}
        {/* ========================================================================= */}
        <div
          className="absolute left-6 sm:left-12 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-sm z-20 pointer-events-none transition-all duration-150 font-['Courier_Prime',_'Courier_New',_monospace]"
          style={{
            opacity: targetHudOpacity,
            display: targetHudOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          <div className="p-5 border-l-2 border-white bg-black/85 backdrop-blur-sm space-y-2 text-white">
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] text-white uppercase font-bold">
              <span className="w-2 h-2 bg-white rounded-full animate-ping" />
              <span>// LOCATION FOUND</span>
            </div>

            <div className="text-xl sm:text-2xl font-bold tracking-tight text-white pt-1">
              COORG, KARNATAKA
            </div>

            <div className="text-xs text-white/75 space-y-1 pt-1 leading-relaxed">
              <div>LAT 12°20′15″ N · LON 75°48′22″ E</div>
              <div>ELEVATION 1,150M · WESTERN GHATS</div>
              <div className="text-white font-bold pt-2 border-t border-white/20">
                LAYA RESORT & BOTANICAL RETREAT
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 3: Photorealistic Resort Backdrop & Monumental Block LAYA           */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 z-30 pointer-events-auto overflow-hidden transition-all duration-200"
          style={{
            opacity: resortBgOpacity,
            display: resortBgOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          {/* Real High-Resolution Resort Exterior Photography */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/resort/resort-exteriors.jpeg')`,
              transform: `scale(${resortBgScale})`,
            }}
          />

          {/* Deep Cinematic Monochrome & Forest Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-[#000000]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-transparent to-[#000000]" />

          {/* ========================================================================= */}
          {/* MONUMENTAL ARCHITECTURAL BLOCK "LAYA" REVEAL                            */}
          {/* ========================================================================= */}
          <div
            className="relative h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 text-white z-40 max-w-7xl mx-auto transition-all duration-200"
            style={{
              opacity: layaBlockOpacity,
              transform: `translateY(${layaBlockY}px)`,
            }}
          >
            {/* Top Brand Subtitle Line */}
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-['Courier_Prime',_'Courier_New',_monospace] tracking-[0.25em] text-white/80 uppercase border-b border-white/20 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>SANCTUARY IN THE CRADLE OF NATURE</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-white/60">
                <span>15 BOUTIQUE SUITES</span>
                <span>•</span>
                <span>500-GUEST LAWN</span>
                <span>•</span>
                <span>KODAGU, KARNATAKA</span>
              </div>
            </div>

            {/* Central Monumental Block Title */}
            <div className="my-auto text-center space-y-6 pt-10">
              <p className="text-xs md:text-sm font-['Courier_Prime',_'Courier_New',_monospace] tracking-[0.4em] uppercase text-white/70 font-medium">
                // WELCOME TO YOUR SANCTUARY
              </p>

              {/* GIGANTIC ARCHITECTURAL BLOCK LETTERS */}
              <h1 className="text-8xl sm:text-9xl md:text-[13rem] lg:text-[16rem] font-bold tracking-[0.22em] uppercase leading-none select-none font-serif text-white drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]">
                LAYA
              </h1>

              {/* Poetic Sub-title */}
              <p className="text-lg sm:text-2xl font-serif text-white/90 max-w-2xl mx-auto italic font-light tracking-wide">
                Coorg’s Premier Eco-Luxury Haven & Botanical Resort
              </p>

              {/* Solid Luxury Actions */}
              <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
                <button
                  onClick={onOpenEnquiry}
                  className="px-9 py-4 bg-[#1A96AA] hover:bg-[#126877] text-white font-medium text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-3 shadow-[0_10px_30px_rgba(26,150,170,0.4)] cursor-pointer"
                >
                  <span>Book Your Stay / Enquire</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href="#birdsong"
                  className="px-8 py-4 bg-black/50 hover:bg-black/80 border border-white/40 hover:border-white text-white font-medium text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4 text-white" />
                  <span>Listen to Birdsong</span>
                </a>
              </div>
            </div>

            {/* Bottom Highlights Line */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/20 text-xs font-['Courier_Prime',_'Courier_New',_monospace] tracking-wider text-white/70">
              <div>100% ECO-RESTORED FOREST</div>
              <div>KAVERI RIVER SANCTUARY</div>
              <div>SWIMMING POOL & LOUNGE</div>
              <div className="text-right text-white">SCROLL TO EXPLORE SUITES ↓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
