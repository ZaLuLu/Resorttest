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

  // Phase 2: Natural Resort Reveal (0.75 -> 1.0)
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

        {/* PHASE 0 OVERLAY: Elegant Space Intro Typography */}
        <div
          className="absolute left-4 sm:left-12 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-md lg:max-w-lg z-20 pointer-events-none transition-all duration-150 space-y-3 sm:space-y-4 text-white"
          style={{
            opacity: spaceIntroOpacity,
            transform: `translateY(calc(-50% + ${spaceIntroY}px))`,
            display: spaceIntroOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white/90">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Kushalnagar · Kodagu, Karnataka</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight text-white leading-[1.15]">
            A Journey to <br />
            <span className="italic font-light text-white/95">
              Riverside Serenity
            </span>
          </h2>

          <p className="text-xs sm:text-base text-white/80 leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
            Scroll to descend through the clouds into our central sanctuary in the Western Ghats.
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs tracking-widest text-white/60 uppercase font-medium">
            <span>Scroll to Enter</span>
            <div className="w-8 h-[1px] bg-white/50 animate-pulse" />
          </div>
        </div>

        {/* PHASE 1 OVERLAY: Clean Regional Destination Arrival Badge */}
        <div
          className="absolute left-4 sm:left-12 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-sm z-20 pointer-events-none transition-all duration-150"
          style={{
            opacity: destinationTextOpacity,
            display: destinationTextOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          <div className="p-5 sm:p-6 rounded-3xl bg-black/60 backdrop-blur-md border border-white/20 space-y-2 text-white shadow-2xl">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#D4AF37] font-bold block">
              Destination Approach
            </span>
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Kushalnagar, Coorg
            </h3>
            <p className="text-xs text-white/80 leading-relaxed pt-1">
              Gateway to River Kaveri, Tibetan monasteries, and verdant coffee estates.
            </p>
          </div>
        </div>

        {/* PHASE 3 & 4: Natural Resort Backdrop & Monumental LAYA Reveal */}
        <div
          className="absolute inset-0 z-30 pointer-events-auto overflow-hidden transition-opacity duration-300"
          style={{
            opacity: resortBgOpacity,
            display: resortBgOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url('/images/resort/resort-exteriors.jpeg')`,
              transform: `scale(${resortBgScale})`,
            }}
          />

          {/* Directional Scrim: Darkens left side for crisp typography contrast, keeping the white cottage bright & unobstructed on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10 md:to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

          {/* Clean Editorial Hero Content Layer */}
          <div
            className="relative h-full w-full flex flex-col justify-between pt-20 sm:pt-28 pb-5 sm:pb-8 px-5 sm:px-12 lg:px-16 text-white z-20 max-w-7xl mx-auto overflow-y-auto sm:overflow-hidden"
            style={{
              opacity: layaBlockOpacity,
              transform: `translateY(${layaBlockY}px) scale(${layaBlockScale})`,
              transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
            }}
          >
            {/* Top spacer to ensure clean separation below the navbar */}
            <div className="h-2 sm:h-4" />

            {/* Left-Aligned Hero Editorial Block */}
            <div className="my-auto max-w-xl lg:max-w-2xl text-left space-y-4 sm:space-y-5">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#E5C158]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Kushalnagar · Coorg</span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-extrabold tracking-tight uppercase leading-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                  LAYA
                </h1>
                <p className="text-lg sm:text-2xl font-serif italic text-white/95 leading-snug drop-shadow-sm font-light">
                  Your Eco-Luxury Sanctuary in Coorg
                </p>
              </div>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-lg font-light">
                Immerse in nature’s rhythm along the tranquil Kaveri riverside. Unwind in private suites surrounded by lush Western Ghats flora and birdsong.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <button
                  onClick={onOpenEnquiry}
                  className="px-6 sm:px-7 py-3 rounded-full bg-[#132422] hover:bg-[#1E3633] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center gap-2 border border-[#D4AF37]/60 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Book / Enquire</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <a
                  href="#birdsong"
                  className="px-5 sm:px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-[#E5C158]" />
                  <span>Birdsong Audio</span>
                </a>
              </div>
            </div>

            {/* Bottom Highlights Capsules */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-medium text-white/90">
                  🌿 Riverside Sanctuary
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-medium text-white/90">
                  🏊 Palm Swimming Pool
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-medium text-white/90">
                  🏡 15 Private Suites
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-white/85 tracking-widest uppercase">
                <span>Scroll to Explore</span>
                <span className="animate-bounce">↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthHeroScrollSection;
