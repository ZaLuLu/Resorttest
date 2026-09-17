import React from 'react';
import { Waves, Sparkles, Activity, Smile, Sun, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';
import { FluidWaterCard } from '../3d/FluidWaterCard';
import { CinematicReveal } from '../common/CinematicReveal';
import { Clay3DCard } from '../3d/Clay3DCard';

export const AmenitiesSection: React.FC = () => {
  return (
    <section id="amenities" className="relative w-full py-20 sm:py-28 bg-[#FAF6EF] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E4D9C8] pb-8">
          <CinematicReveal className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-4 py-1.5 text-xs font-bold text-[#116B7B] shadow-sm">
              <Waves className="w-4 h-4 text-[#1A96AA]" />
              <span>Resort Amenities · Kushalnagar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#132422] font-serif leading-tight">
              Curated spaces for recreation, water, and stillness.
            </h2>
          </CinematicReveal>

          <CinematicReveal delay={0.15}>
            <p className="text-xs sm:text-sm text-[#344E4A] max-w-xs font-medium leading-relaxed">
              An asynchronous editorial tour across our palm-fringed waters, soft lawn courts, and raised garden terraces.
            </p>
          </CinematicReveal>
        </div>

        {/* Asynchronous Editorial Magazine Bento Layout */}
        <div className="space-y-8">
          
          {/* Item 01: Full-Width Panoramic Palm Pool Spotlight */}
          <CinematicReveal duration={0.8}>
            <div className="relative rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 sm:p-6 shadow-[0_20px_45px_rgba(22,41,38,0.08)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Pool Liquid Water Interactive Canvas (7 Cols) */}
              <div className="lg:col-span-7">
                <FluidWaterCard
                  imageSrc="/images/amenities/swimming-pool.png"
                  title="Palm-Fringed Swimming Pool"
                  subtitle="Daily 7:00 AM – 7:00 PM"
                  badge="01 · Living Water Simulation"
                  description="Crystal-clear pool with a dedicated circular shallow relaxation section, flanked by towering tropical coconut palms, timber loungers, and lush estate greenery."
                />
              </div>

              {/* Editorial Side Narrative (5 Cols) */}
              <div className="lg:col-span-5 p-4 sm:p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold text-[#A3733E]/30">
                    № 01
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#E5F3F5] text-[#116B7B] text-xs font-bold border border-[#BCE2E7]">
                    Water & Sun
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#132422] leading-snug">
                  Unwind in crystal-clear waters under open Kodagu skies.
                </h3>

                <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed">
                  Hover or glide your cursor across the pool surface on the left to experience our real-time fluid wave caustics and solar light refraction.
                </p>

                <div className="space-y-2 pt-2 border-t border-[#E4D9C8]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#132422]">
                    <CheckCircle2 className="w-4 h-4 text-[#1A96AA]" />
                    <span>Dedicated circular shallow kids & lounge pool</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#132422]">
                    <CheckCircle2 className="w-4 h-4 text-[#1A96AA]" />
                    <span>Solar hot showers adjoining pool deck</span>
                  </div>
                </div>
              </div>

            </div>
          </CinematicReveal>

          {/* Items 02 & 03: Asymmetrical Mid Tier (Tall Portrait + Widescreen Landscape) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Item 02: Kids Trampoline (5 Cols - Tall Editorial Card) */}
            <div className="lg:col-span-5">
              <CinematicReveal delay={0.1} duration={0.8} className="h-full">
                <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-extrabold text-[#A3733E]/30">
                        № 02
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#EFE8DC] text-[#A3733E] text-xs font-bold border border-[#DFD3C0]">
                        Family Fun
                      </span>
                    </div>

                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1] shadow-sm">
                      <ClayImage
                        src="/images/amenities/kids-play-trampoline.png"
                        alt="Kids Play Area & Trampoline at Coorg Laya"
                        aspectRatio="4:3"
                        clayVariant="sand"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#635546] mb-1">
                        <Smile className="w-3.5 h-3.5 text-[#A3733E]" />
                        <span>03:30 PM · Afternoon Play</span>
                      </div>
                      <h4 className="font-serif text-xl font-bold text-[#132422]">
                        Kids Jumping Trampoline & Play Arena
                      </h4>
                      <p className="text-xs text-[#344E4A] leading-relaxed mt-1">
                        Heavy-duty steel-sprung trampoline with safety netting surrounded by soft manicured lawn grass.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E4D9C8] flex items-center justify-between text-[11px] font-bold text-[#116B7B]">
                    <span>Enclosed Safety Netting</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
                  </div>
                </div>
              </CinematicReveal>
            </div>

            {/* Item 03: Bamboo Lawn Badminton (7 Cols - Widescreen Landscape Card) */}
            <div className="lg:col-span-7">
              <CinematicReveal delay={0.2} duration={0.8} className="h-full">
                <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-extrabold text-[#A3733E]/30">
                        № 03
                      </span>
                      <span className="px-3 py-1 rounded-full bg-[#E5F3F5] text-[#116B7B] text-xs font-bold border border-[#BCE2E7]">
                        Active Sports
                      </span>
                    </div>

                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#E8DFD1] shadow-sm">
                      <ClayImage
                        src="/images/amenities/badminton-court.png"
                        alt="Bamboo Lawn Badminton Court at Coorg Laya"
                        aspectRatio="16:9"
                        clayVariant="water"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#635546] mb-1">
                        <Activity className="w-3.5 h-3.5 text-[#1A96AA]" />
                        <span>04:30 PM · Golden Hour Rally</span>
                      </div>
                      <h4 className="font-serif text-xl font-bold text-[#132422]">
                        Bamboo Lawn Badminton Court
                      </h4>
                      <p className="text-xs text-[#344E4A] leading-relaxed mt-1">
                        Lively friendly matches on grass courts naturally sheltered by towering green bamboo canopies.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E4D9C8] flex items-center justify-between text-[11px] font-bold text-[#116B7B]">
                    <span>Racquets & Shuttles Provided Free</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
                  </div>
                </div>
              </CinematicReveal>
            </div>

          </div>

          {/* Items 04 & 05: Staggered Bottom Tier (Volleyball Lawn & Raised Garden Terraces) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Item 04: Volleyball Lawn */}
            <CinematicReveal delay={0.15}>
              <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-extrabold text-[#A3733E]/30">№ 04</span>
                    <span className="px-3 py-1 rounded-full bg-[#EFE8DC] text-[#A3733E] text-xs font-bold border border-[#DFD3C0]">Open Grounds</span>
                  </div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                    <ClayImage
                      src="/images/resort/garden-lawn.jpeg"
                      alt="Outdoor Volleyball Lawn"
                      aspectRatio="16:10"
                      clayVariant="sand"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#132422]">Outdoor Volleyball Lawn</h4>
                  <p className="text-xs text-[#344E4A] leading-relaxed">Spirited team rallies and social matches across expansive open lawn grounds.</p>
                </div>
              </div>
            </CinematicReveal>

            {/* Item 05: Raised Garden Terraces */}
            <CinematicReveal delay={0.25}>
              <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-extrabold text-[#A3733E]/30">№ 05</span>
                    <span className="px-3 py-1 rounded-full bg-[#E5F3F5] text-[#116B7B] text-xs font-bold border border-[#BCE2E7]">Coffee & Decks</span>
                  </div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                    <ClayImage
                      src="/images/resort/garden-terrace.jpeg"
                      alt="Raised Garden Terraces"
                      aspectRatio="16:10"
                      clayVariant="water"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#132422]">Raised Garden Terraces</h4>
                  <p className="text-xs text-[#344E4A] leading-relaxed">Elevated seating platforms for hot Coorg coffee, evening tea, and starlit conversations.</p>
                </div>
              </div>
            </CinematicReveal>

          </div>

        </div>

      </div>
    </section>
  );
};
export default AmenitiesSection;
