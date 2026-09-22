import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Volume2, Sparkles, ArrowUpRight, Camera, ChevronDown } from 'lucide-react';
import { RealisticEarthCanvas } from '../3d/RealisticEarthCanvas';
import { SatelliteOrbitHUD } from '../3d/SatelliteOrbitHUD';
import { LayaHeroLogo } from '../common/LayaHeroLogo';

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
  const [activeBackdrop, setActiveBackdrop] = useState(0);

  // Available high-resolution authentic resort grounds photography
  const resortBackdrops = [
    {
      id: 'villas',
      name: 'Suites & Villas',
      image: '/images/resort/resort-exteriors.jpeg',
      tag: 'Boutique Architecture',
    },
    {
      id: 'lawn',
      name: '500-Guest Lawn',
      image: '/images/resort/garden-lawn.jpeg',
      tag: 'Celebration Grounds',
    },
    {
      id: 'pool',
      name: 'Palm Pool Deck',
      image: '/images/resort/swimming-pool.jpeg',
      tag: 'Spring Relaxation',
    },
    {
      id: 'terrace',
      name: 'Bamboo Terrace',
      image: '/images/resort/garden-terrace.jpeg',
      tag: 'Morning Mist Verandah',
    },
  ];

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

  // Phase 2: Natural Mist Dissolve to Resort Grounds (0.74 -> 1.0)
  const resortBgOpacity = p < 0.74 ? 0 : Math.min(1, (p - 0.74) / 0.16);
  const resortBgScale = 1.05 - Math.max(0, (p - 0.74) / 0.26) * 0.05;

  // Phase 3: Monumental LAYA Branding & Hero CTAs (0.78 -> 1.0)
  const layaBlockOpacity = p < 0.78 ? 0 : Math.min(1, (p - 0.78) / 0.14);
  const layaBlockScale = 0.97 + Math.min(0.03, ((p - 0.78) / 0.22) * 0.03);
  const layaBlockY = Math.max(0, (1 - (p - 0.78) / 0.22) * 20);

  return (
    <div ref={containerRef} className="relative w-full bg-[#050608] select-none touch-pan-y">
      {/* Pinned Viewport Stage */}
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#050608] text-white touch-pan-y"
      >
        {/* 3D Realistic Earth Canvas with Pure Cinematic Scroll Scrub */}
        <RealisticEarthCanvas progress={scrollProgress} />

        {/* SATELLITE ORBIT HUD: Live corner coordinates, descending altitude & prominent scroll button */}
        <SatelliteOrbitHUD
          progress={scrollProgress}
          onTriggerZoom={handleTriggerZoom}
        />

        {/* PHASE 0: Space Orbit View - Elevated Visibility with Prominent Golden Laya */}
        <div
          className="absolute left-5 sm:left-12 md:left-16 lg:left-24 top-16 sm:top-[34%] sm:-translate-y-1/2 max-w-sm sm:max-w-md lg:max-w-xl z-20 pointer-events-none transition-all duration-200 space-y-4 text-white"
          style={{
            opacity: spaceIntroOpacity,
            transform: `translateY(calc(0% + ${spaceIntroY}px))`,
            display: spaceIntroOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          {/* Subtle Hairline Geographic Origin */}
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#FFD23F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD23F]" />
            <span>Western Ghats · Uncharted Stillness</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white leading-[1.12] heading-balance">
            Hidden in the misty canopy,{' '}
            <span className="block mt-2 font-accent italic font-bold">
              <span className="text-[#FFD23F] text-5xl sm:text-7xl md:text-8xl drop-shadow-[0_4px_24px_rgba(255,210,63,0.35)]">
                Laya
              </span>{' '}
              <span className="text-[#FAF6EF]/90 text-3xl sm:text-5xl md:text-6xl font-medium">
                awaits.
              </span>
            </span>
          </h1>

          <p className="text-xs sm:text-base text-white/80 leading-relaxed font-normal prose-pretty pt-1">
            Along a secluded curve of River Kaveri lies an untamed rhythm of flowing waters and morning birdsong. Far from the world’s noise, waiting to be discovered.
          </p>

          <div className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-[#FAF6EF]/60 pt-1">
            <span className="w-6 h-px bg-[#FFD23F]/60" />
            <span>Descend to explore</span>
          </div>
        </div>

        {/* PHASE 2 & 3: High-End Sanctuary Grounds Presentation */}
        <div
          className="absolute inset-0 z-30 pointer-events-auto overflow-hidden transition-opacity duration-300"
          style={{
            opacity: resortBgOpacity,
            display: resortBgOpacity > 0.01 ? 'block' : 'none',
          }}
        >
          {/* Layered Background Imagery with Cinematic Crossfade */}
          {resortBackdrops.map((backdrop, idx) => (
            <div
              key={backdrop.id}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
                activeBackdrop === idx ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${backdrop.image}')`,
                transform: `scale(${resortBgScale})`,
                transitionProperty: 'opacity, transform',
                transitionDuration: '1000ms, 700ms',
              }}
            />
          ))}

          {/* Luxury Editorial Lighting & Vignette Scrim (Replaces flat lighting with deep Aman-style warmth) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.4)_0%,_rgba(7,14,13,0.85)_100%)] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D0B] via-[#060D0B]/40 to-black/60 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(212,175,55,0.12)_0%,_transparent_60%)] pointer-events-none z-10" />

          {/* Centered Luxury Brand Presentation Layer */}
          <div
            className="relative h-full w-full flex flex-col justify-between pt-16 sm:pt-20 pb-6 sm:pb-8 px-4 sm:px-8 text-white z-20 max-w-6xl mx-auto overflow-y-auto sm:overflow-hidden text-center"
            style={{
              opacity: layaBlockOpacity,
              transform: `translateY(${layaBlockY}px) scale(${layaBlockScale})`,
              transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
            }}
          >
            {/* Top clean negative space (coordinates removed for pristine sky) */}
            <div className="h-2 sm:h-4" />

            {/* Core Brand Centerpiece: Hand-Vectorized Laya Calligraphy Mark (Scaled to monumental presence) */}
            <div className="my-auto flex flex-col items-center justify-center py-1 sm:py-2">
              <div className="w-full max-w-[520px] sm:max-w-[680px] md:max-w-[800px] lg:max-w-[880px]">
                <LayaHeroLogo
                  triggerAnimation={scrollProgress >= 0.74}
                  color="#FAF6EF"
                  accentColor="#D4AF37"
                />
              </div>

              {/* Centered Luxury Estate Action Buttons (Replaces generic glass pills) */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 pt-4 sm:pt-6">
                {/* Primary CTA: Deep Forest Emerald with Gold Edge & Luminous Sheen */}
                <button
                  onClick={onOpenEnquiry}
                  className="group relative px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-b from-[#14422F] to-[#0A261B] hover:from-[#1A543C] hover:to-[#0F3526] text-[#FAF6EF] font-bold text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-3 border border-[#D4AF37]/65 shadow-[0_12px_32px_rgba(0,0,0,0.65),_inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_14px_38px_rgba(212,175,55,0.35)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300" />
                  <span>Reserve Your Stay</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                {/* Secondary CTA: Brushed Brass Hairline Wireframe & Obsidian Backing */}
                <a
                  href="#birdsong"
                  className="group relative px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#081210]/85 hover:bg-[#112320] text-[#FAF6EF] font-medium text-xs sm:text-sm tracking-[0.12em] uppercase transition-all duration-300 flex items-center gap-2.5 border border-[#C7A583]/45 shadow-[0_10px_28px_rgba(0,0,0,0.55)] hover:border-[#D4AF37] hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Kaveri & Birdsong Audio</span>
                </a>
              </div>
            </div>

            {/* Bottom Bar: Ambient Photo Switcher & Curated Estate Specs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10 text-xs text-white/80">
              
              {/* Subtle Resort Backdrop Switcher */}
              <div className="flex items-center gap-1.5 sm:gap-2 bg-black/40 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                <Camera className="w-3.5 h-3.5 text-[#C7A583] ml-1 mr-0.5" />
                <span className="text-[10px] uppercase font-semibold text-white/60 hidden md:inline">
                  View Grounds:
                </span>
                {resortBackdrops.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveBackdrop(idx)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                      activeBackdrop === idx
                        ? 'bg-[#D4AF37] text-[#0A1412] font-bold shadow-sm'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Anchored Estate Specifications */}
              <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-medium text-[#FAF6EF]/90">
                <span className="hidden sm:inline">🏡 15 Private Suites</span>
                <span className="hidden sm:inline text-[#D4AF37]">·</span>
                <span>🌿 500-Guest River Lawn</span>
                <span className="text-[#D4AF37]">·</span>
                <span>🏊 Palm Spring Pool</span>
              </div>

              {/* Scroll Indicator */}
              <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-[#C7A583]">
                <span>Scroll to Explore</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthHeroScrollSection;
