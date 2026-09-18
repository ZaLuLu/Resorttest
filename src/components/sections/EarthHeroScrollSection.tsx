import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Compass, Volume2 } from 'lucide-react';
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

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=3000',
      pin: pinRef.current,
      pinSpacing: true,
      scrub: 0.5,
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

  // Phase 0: Space Intro Typography (0 -> 0.35)
  const spaceIntroOpacity = p < 0.2 ? 1 : Math.max(0, 1 - (p - 0.2) / 0.15);
  const spaceIntroY = (p / 0.35) * -25;

  // Phase 1: Clean Editorial Destination Marker (0.28 -> 0.72)
  let destinationTextOpacity = 0;
  if (p >= 0.28 && p <= 0.72) {
    if (p < 0.4) {
      destinationTextOpacity = (p - 0.28) / 0.12;
    } else if (p > 0.6) {
      destinationTextOpacity = Math.max(0, 1 - (p - 0.6) / 0.12);
    } else {
      destinationTextOpacity = 1;
    }
  }

  // Phase 2: Natural Resort Reveal (0.75 -> 1.0) - NO Color Overlays
  const resortBgOpacity = p < 0.75 ? 0 : Math.min(1, (p - 0.75) / 0.15);
  const resortBgScale = 1.08 - Math.max(0, (p - 0.75) / 0.25) * 0.08;

  // Phase 3: LAYA Brand Title & Hero CTAs (0.8 -> 1.0)
  const layaBlockOpacity = p < 0.8 ? 0 : Math.min(1, (p - 0.8) / 0.14);
  const layaBlockScale = 0.95 + Math.min(0.05, ((p - 0.8) / 0.2) * 0.05);
  const layaBlockY = Math.max(0, (1 - (p - 0.8) / 0.2) * 30);

  return (
    <div ref={containerRef} className="relative w-full bg-[#000000] select-none">
      {/* Pinned Viewport Stage */}
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#000000] text-white"
      >
        {/* 3D Realistic Earth Canvas */}
        <RealisticEarthCanvas progress={scrollProgress} />

        {/* ========================================================================= */}
        {/* PHASE 0 OVERLAY: Elegant Space Intro Typography                           */}
        {/* ========================================================================= */}
        <div
          className="absolute left-6 sm:left-12 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-sm sm:max-w-md lg:max-w-lg z-20 pointer-events-none transition-all duration-150 space-y-4 text-white"
          style={{
            opacity: spaceIntroOpacity,
            transform: `translateY(calc(-50% + ${spaceIntroY}px))`,
            display: spaceIntroOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-white/90">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Kushalnagar · Kodagu, Karnataka</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif tracking-tight text-white leading-[1.15]">
            A Journey to <br />
            <span className="italic font-light text-white/95">
              Riverside Serenity
            </span>
          </h2>

          <p className="text-sm md:text-base text-white/80 leading-relaxed font-light">
            Scroll to descend through the clouds into our central sanctuary in the Western Ghats.
          </p>

          <div className="flex items-center gap-3 pt-3 text-xs tracking-widest text-white/60 uppercase font-medium">
            <span>Scroll to Enter</span>
            <div className="w-8 h-[1px] bg-white/50 animate-pulse" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 1 OVERLAY: Clean Regional Destination Arrival Badge                */}
        {/* ========================================================================= */}
        <div
          className="absolute left-6 sm:left-12 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-sm z-20 pointer-events-none transition-all duration-150"
          style={{
            opacity: destinationTextOpacity,
            display: destinationTextOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          <div className="p-6 rounded-3xl bg-black/60 backdrop-blur-md border border-white/20 space-y-2 text-white shadow-2xl">
            <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold block">
              Destination Approach
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Kushalnagar, Coorg
            </h3>
            <p className="text-xs text-white/80 leading-relaxed pt-1">
              Gateway to River Kaveri, Tibetan monasteries, and verdant coffee estates.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHASE 3 & 4: High-Res Natural Resort Backdrop (NO Color Overlay)          */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-0 z-30 pointer-events-auto overflow-hidden transition-opacity duration-300"
          style={{
            opacity: resortBgOpacity,
            display: resortBgOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          {/* Natural, Crisp High-Resolution Resort Exterior (Zero Tint / Zero Muddy Filter) */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url('/images/resort/resort-exteriors.jpeg')`,
              transform: `scale(${resortBgScale})`,
            }}
          />

          {/* Minimal Top & Bottom Edge Vignettes for Text Legibility (Leaves Center Clear) */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/75 via-black/30 to-transparent pointer-events-none" />

          {/* ========================================================================= */}
          {/* MONUMENTAL "LAYA" TITLE (MATCHING LOGO TYPOGRAPHY) & LUXURY CTAs        */}
          {/* ========================================================================= */}
          <div
            className="relative h-full w-full flex flex-col justify-between p-6 sm:p-10 md:p-14 text-white z-40 max-w-7xl mx-auto"
            style={{
              opacity: layaBlockOpacity,
              transform: `translateY(${layaBlockY}px) scale(${layaBlockScale})`,
              transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
            }}
          >
            {/* Top Subtitle Bar */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wider text-white/90 border-b border-white/20 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-serif tracking-widest uppercase">COORG LAYA RESORT</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-white/80 font-light text-xs tracking-widest uppercase">
                <span>15 Boutique Suites</span>
                <span>•</span>
                <span>Swimming Pool</span>
                <span>•</span>
                <span>500-Guest Lawn</span>
              </div>
            </div>

            {/* Central Monumental Brand Title */}
            <div className="my-auto text-center space-y-4 sm:space-y-6 pt-6">
              <span className="text-xs sm:text-sm tracking-[0.3em] uppercase text-white/90 font-medium drop-shadow-md">
                Welcome to Nature’s Rhythm
              </span>

              {/* LAYA BRAND LOGO WORDMARK */}
              <h1 className="text-7xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-serif font-extrabold tracking-[0.18em] uppercase leading-none select-none text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] transition-all">
                LAYA
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-xl md:text-2xl font-serif text-white/95 max-w-2xl mx-auto italic font-light tracking-wide drop-shadow-md">
                Your Eco-Luxury Sanctuary in Kushalnagar, Coorg
              </p>

              {/* Commercial Luxury Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={onOpenEnquiry}
                  className="px-8 py-4 rounded-full bg-[#132422] hover:bg-[#1E3633] text-white font-bold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-2.5 shadow-xl border border-white/20 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Book Your Stay / Enquire</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <a
                  href="#birdsong"
                  className="px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-semibold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-white" />
                  <span>Explore Experience</span>
                </a>
              </div>
            </div>

            {/* Bottom Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/20 text-xs text-white/80 font-medium">
              <div>🌿 Riverside Sanctuary</div>
              <div>🏊 Palm Swimming Pool</div>
              <div>🏡 15 Private Suites</div>
              <div className="text-right text-white font-bold">Scroll to Explore ↓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthHeroScrollSection;
