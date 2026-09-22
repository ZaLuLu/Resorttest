import React from 'react';
import { Trees, Sun, Waves, ShieldCheck } from 'lucide-react';
import { Diorama3DParallax } from '../3d/Diorama3DParallax';
import { CinematicReveal } from '../common/CinematicReveal';

export const WelcomeSection: React.FC = () => {
  return (
    <section id="welcome-section" className="relative w-full py-12 sm:py-16 bg-[#FAF6EF] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Clay Narrative & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <CinematicReveal className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#A3733E] shadow-sm">
                <Trees className="w-4 h-4 text-[#A3733E]" />
                <span>Unhurried Natural Rhythm</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#131E1C] font-display leading-[1.18] heading-balance">
                Slow down, breathe fresh mountain air, and settle into Kodagu's gentle cadence.
              </h2>

              <p className="text-sm sm:text-base text-[#314240] font-normal leading-relaxed prose-pretty">
                Tucked away in the peaceful green foothills of Kushalnagar, Coorg Laya Resort is designed for genuine relaxation, multi-generational family vacations, and memorable open-air celebrations. Surrounded by leafy bamboo canopies, fresh breezes, and coffee plantation trails, our property offers strictly 15 private guest suites and an expansive 500-guest event lawn.
              </p>
            </CinematicReveal>

            {/* 3 Metric Pill Cards - Balanced 3-Col Layout */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-3">
              <CinematicReveal delay={0.1}>
                <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] text-left shadow-sm">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EFE8DC] flex items-center justify-center text-[#A3733E] mb-2">
                    <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#131E1C]">850m ASL</h4>
                  <p className="text-[10px] sm:text-xs text-[#586E6B] font-semibold line-clamp-1">Highland Climate</p>
                </div>
              </CinematicReveal>

              <CinematicReveal delay={0.15}>
                <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] text-left shadow-sm">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#E5F3F5] flex items-center justify-center text-[#137586] mb-2">
                    <Trees className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#131E1C]">15 Suites</h4>
                  <p className="text-[10px] sm:text-xs text-[#586E6B] font-semibold line-clamp-1">~45 Guests</p>
                </div>
              </CinematicReveal>

              <CinematicReveal delay={0.2}>
                <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] text-left shadow-sm">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EFE8DC] flex items-center justify-center text-[#A3733E] mb-2">
                    <Waves className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h4 className="font-display text-base sm:text-lg font-bold text-[#131E1C]">500 Lawn</h4>
                  <p className="text-[10px] sm:text-xs text-[#586E6B] font-semibold line-clamp-1">Celebrations</p>
                </div>
              </CinematicReveal>
            </div>
          </div>

          {/* Right: Multi-Layer 3D Depth Diorama Viewer */}
          <div className="lg:col-span-5">
            <CinematicReveal delay={0.2} duration={0.8}>
              <div className="relative">
                <Diorama3DParallax
                  imageSrc="/images/resort/covered-seating.jpeg"
                  badge="Verandah Lounge"
                  title="Verandah Covered Seating Deck"
                  subtitle="Coorg Laya Heritage Grounds"
                />

                {/* Floating Verified Sanctuary Badge - Safe bounded placement */}
                <div className="absolute -bottom-3 right-2 sm:-right-2 z-30 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-[#132422] text-[#FAF6EF] flex items-center gap-2 border border-white/20 shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1A96AA]" />
                  <span className="text-[11px] sm:text-xs font-bold">Verified Sanctuary</span>
                </div>
              </div>
            </CinematicReveal>
          </div>

        </div>
      </div>
    </section>
  );
};
export default WelcomeSection;
