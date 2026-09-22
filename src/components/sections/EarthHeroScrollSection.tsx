import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Compass, Volume2, MapPin } from 'lucide-react';
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

    const isMobile = window.innerWidth < 768;
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: isMobile ? '+=1600' : '+=3000',
      pin: pinRef.current,
      pinSpacing: true,
      scrub: isMobile ? 0.8 : 1.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const handleTriggerZoom = () => {
    if (!containerRef.current) return;
    const isMobile = window.innerWidth < 768;
    const scrollDistance = isMobile ? 1600 : 3000;
    const targetY = containerRef.current.offsetTop + scrollDistance * 0.85;

    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(targetY, {
        duration: 2.8,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });
    }
  };

  const p = scrollProgress;

  // Phase 0: Space Intro Typography (0 -> 0.35)
  const spaceIntroOpacity = p < 0.22 ? 1 : Math.max(0, 1 - (p - 0.22) / 0.14);
  const spaceIntroY = (p / 0.35) * -20;

  // Phase 1: Regional Approach Telemetry Badge (0.32 -> 0.72)
  let destinationTextOpacity = 0;
  if (p >= 0.32 && p <= 0.72) {
    if (p < 0.42) {
      destinationTextOpacity = (p - 0.32) / 0.1;
    } else if (p > 0.6) {
      destinationTextOpacity = Math.max(0, 1 - (p - 0.6) / 0.12);
    } else {
      destinationTextOpacity = 1;
    }
  }

  // Phase 2: Natural Mist Dissolve to Resort Grounds (0.75 -> 1.0)
  // Replaces the blue screen flash with a seamless warm golden mist dissolve
  const resortBgOpacity = p < 0.74 ? 0 : Math.min(1, (p - 0.74) / 0.16);
  const resortBgScale = 1.06 - Math.max(0, (p - 0.74) / 0.26) * 0.06;

  // Phase 3: Monumental LAYA Branding & Hero CTAs (0.8 -> 1.0)
  const layaBlockOpacity = p < 0.8 ? 0 : Math.min(1, (p - 0.8) / 0.14);
  const layaBlockScale = 0.96 + Math.min(0.04, ((p - 0.8) / 0.2) * 0.04);
  const layaBlockY = Math.max(0, (1 - (p - 0.8) / 0.2) * 24);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050608] select-none touch-pan-y">
      {/* Pinned Viewport Stage */}
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#050608] text-white touch-pan-y"
      >
        {/* 3D Realistic Earth Canvas with Pure Cinematic Scroll Scrub */}
        <RealisticEarthCanvas progress={scrollProgress} />

        {/* PHASE 0: Space Orbit View - Luxury Brand Headline & Narrative */}
        <div
          className="absolute left-4 sm:left-10 md:left-14 lg:left-20 top-20 sm:top-1/2 sm:-translate-y-1/2 max-w-sm sm:max-w-md lg:max-w-lg z-20 pointer-events-none transition-all duration-200 space-y-3 sm:space-y-4 text-white"
          style={{
            opacity: spaceIntroOpacity,
            transform: `translateY(calc(0% + ${spaceIntroY}px))`,
            display: spaceIntroOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          {/* Authentic Location Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold tracking-kicker uppercase text-[#FAF6EF] shadow-lg">
            <Compass className="w-3.5 h-3.5 text-[#C7A583]" />
            <span>Kushalnagar · Kodagu, Karnataka</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white leading-[1.1] heading-balance">
            Where Time Slows to{' '}
            <span className="font-accent italic font-semibold text-[#FAF6EF] block sm:inline">
              Nature’s Rhythm
            </span>
          </h1>

          <p className="text-xs sm:text-base text-white/85 leading-relaxed font-normal prose-pretty">
            A secluded sanctuary along the Kaveri River corridor. 15 private suites wrapped in lush Western Ghats flora, birdsong, and open celebration grounds.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] sm:text-xs font-medium text-[#C7A583]">
            <span className="px-2.5 py-1 rounded-md bg-black/40 border border-white/10">15 Suites</span>
            <span className="px-2.5 py-1 rounded-md bg-black/40 border border-white/10">500-Guest River Lawn</span>
            <span className="px-2.5 py-1 rounded-md bg-black/40 border border-white/10">Kaveri Proximity</span>
          </div>
        </div>

        {/* Subtle Luxury Scroll Cue */}
        <button
          onClick={handleTriggerZoom}
          className="absolute inset-x-4 sm:inset-x-auto sm:right-10 md:right-14 lg:right-20 bottom-6 sm:bottom-10 z-20 pointer-events-auto flex items-center gap-2 text-xs text-white/70 hover:text-white tracking-widest uppercase font-semibold transition-all duration-200 cursor-pointer group"
          style={{
            opacity: spaceIntroOpacity,
            display: spaceIntroOpacity > 0.01 ? 'flex' : 'none',
          }}
        >
          <span>Scroll to Enter Sanctuary</span>
          <span className="text-[#C7A583] group-hover:translate-y-0.5 transition-transform duration-200">↓</span>
          <div className="w-8 h-[1px] bg-white/40 group-hover:bg-[#C7A583] transition-colors duration-200" />
        </button>

        {/* PHASE 1 OVERLAY: Clean Regional Destination Arrival Badge */}
        <div
          className="absolute left-4 sm:left-12 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 max-w-xs sm:max-w-sm z-20 pointer-events-none transition-all duration-150"
          style={{
            opacity: destinationTextOpacity,
            display: destinationTextOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          <div className="p-5 sm:p-6 rounded-3xl bg-black/75 backdrop-blur-xl border border-white/20 space-y-2 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-kicker text-[#C7A583] font-bold">
                Destination Approach
              </span>
              <span className="text-[10px] text-white/60 font-mono">12.3375° N, 75.8062° E</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#E63946]" />
              Kushalnagar, Coorg
            </h3>
            <p className="text-xs text-white/85 font-normal leading-relaxed pt-1">
              Gateway to River Kaveri, Tibetan monasteries, and verdant coffee estates. Descending to resort grounds.
            </p>
          </div>
        </div>

        {/* PHASE 2 & 3: Seamless Mist Transition into Resort Grounds */}
        <div
          className="absolute inset-0 z-30 pointer-events-auto overflow-hidden transition-opacity duration-300"
          style={{
            opacity: resortBgOpacity,
            display: resortBgOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          {/* High-Resolution Authentic Resort Grounds Photography */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url('/images/resort/resort-exteriors.jpeg')`,
              transform: `scale(${resortBgScale})`,
            }}
          />

          {/* Warm Morning Mist Scrim (replaces harsh blue screen with soft golden ambient light) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25 md:to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10" />

          {/* Clean Editorial Hero Content Layer */}
          <div
            className="relative h-full w-full flex flex-col justify-between pt-20 sm:pt-28 pb-6 sm:pb-10 px-5 sm:px-12 lg:px-16 text-white z-20 max-w-7xl mx-auto overflow-y-auto sm:overflow-hidden"
            style={{
              opacity: layaBlockOpacity,
              transform: `translateY(${layaBlockY}px) scale(${layaBlockScale})`,
              transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
            }}
          >
            {/* Top spacer */}
            <div className="h-2 sm:h-4" />

            {/* Left-Aligned Hero Editorial Block */}
            <div className="my-auto max-w-xl lg:max-w-2xl text-left space-y-4 sm:space-y-5">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold tracking-kicker uppercase text-[#C7A583]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Kushalnagar · Coorg, Karnataka</span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-display font-bold tracking-tight uppercase leading-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
                  COORG LAYA
                </h2>
                <p className="text-lg sm:text-2xl font-accent italic font-semibold text-[#FAF6EF] leading-snug drop-shadow-sm">
                  Riverside Stillness, Untouched Nature
                </p>
              </div>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-lg font-normal prose-pretty">
                Immerse in nature’s rhythm along the tranquil Kaveri riverside. Unwind in 15 boutique suites surrounded by lush Western Ghats flora, birdsong, and open starlit lawns.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <button
                  onClick={onOpenEnquiry}
                  className="px-6 sm:px-7 py-3 rounded-full bg-[#0F3C28] hover:bg-[#165338] text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center gap-2 border border-[#A3733E]/60 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Book Stay / Enquire</span>
                  <ChevronRight className="w-4 h-4 text-[#C7A583]" />
                </button>

                <a
                  href="#birdsong"
                  className="px-5 sm:px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-[#C7A583]" />
                  <span>Birdsong Audio</span>
                </a>
              </div>
            </div>

            {/* Bottom Highlights Capsules - Authentic Resort Specs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/15">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-medium text-white/90">
                  🏡 15 Private Suites (Up to ~45 Guests)
                </span>
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-medium text-white/90">
                  🌿 500-Guest Riverfront Lawn
                </span>
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-medium text-white/90">
                  🏊 Palm Swimming Pool
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
