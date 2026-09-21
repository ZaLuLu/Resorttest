import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Sparkles, Activity, Smile, Sun, ArrowUpRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';
import { FluidWaterCard } from '../3d/FluidWaterCard';
import { CinematicReveal } from '../common/CinematicReveal';
import { Clay3DCard } from '../3d/Clay3DCard';

export const AmenitiesSection: React.FC = () => {
  return (
    <section id="amenities" className="relative w-full py-12 sm:py-16 bg-[#FAF6EF] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E4D9C8] pb-8">
          <CinematicReveal className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#137586] shadow-sm">
              <Waves className="w-4 h-4 text-[#137586]" />
              <span>Resort Amenities · Kushalnagar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#131E1C] font-display leading-tight heading-balance">
              Curated spaces for recreation, water, and stillness.
            </h2>
          </CinematicReveal>

          <CinematicReveal delay={0.15} direction="left">
            <p className="text-xs sm:text-sm text-[#314240] max-w-xs font-normal leading-relaxed prose-pretty">
              An asynchronous editorial tour across our palm-fringed waters, soft lawn courts, and raised garden terraces.
            </p>
          </CinematicReveal>
        </div>

        {/* Asynchronous Editorial Magazine Bento Layout */}
        <div className="space-y-8">
          
          {/* Item 01: Full-Width Panoramic Palm Pool Spotlight */}
          <CinematicReveal duration={0.8} spring>
            <div className="relative rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 sm:p-6 shadow-[0_20px_45px_rgba(22,41,38,0.08)] hover:shadow-[0_28px_55px_rgba(19,117,134,0.18)] transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Pool Liquid Water Interactive Canvas (7 Cols) */}
              <div className="lg:col-span-7">
                <FluidWaterCard
                  imageSrc="/images/amenities/swimming-pool.jpeg"
                  title="Palm-Fringed Swimming Pool"
                  subtitle="Daily 7:00 AM – 7:00 PM"
                  badge="01 · Living Water Simulation"
                  description="Crystal-clear pool with a dedicated circular shallow relaxation section, flanked by towering tropical coconut palms, timber loungers, and lush estate greenery."
                />
              </div>

              {/* Editorial Side Narrative (5 Cols) */}
              <div className="lg:col-span-5 p-4 sm:p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-extrabold text-[#A3733E]/40">
                    № 01
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#E5F3F5] text-[#137586] text-xs font-semibold tracking-wider uppercase border border-[#BCE2E7]">
                    Water & Sun
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#131E1C] leading-snug heading-balance">
                  Unwind in crystal-clear waters under open Kodagu skies.
                </h3>

                <p className="text-xs sm:text-sm text-[#314240] font-normal leading-relaxed prose-pretty">
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

          {/* MOBILE VIEW: Horizontal Snap Deck for Secondary Amenities (02 - 05) */}
          <div className="lg:hidden space-y-6">
            <div className="flex items-center justify-between px-1 pt-2">
              <span className="text-xs font-mono font-bold text-[#A3733E]">
                More Resort Spaces · Swipe to explore
              </span>
              <span className="text-xs text-[#586E6B] font-semibold">4 Spaces</span>
            </div>

            <div className="snap-touch-track no-scrollbar gap-4 px-1 py-1">
              {/* Item 02: Kids Trampoline */}
              <div className="snap-touch-item w-[84vw] max-w-[340px] rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-extrabold text-[#A3733E]/40">№ 02</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EFE8DC] text-[#A3733E] text-[10px] font-bold border border-[#DFD3C0]">
                      Family Fun
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                    <img
                      src="/images/amenities/kids-play-trampoline.png"
                      alt="Kids Play Area & Trampoline"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#635546] mb-1">
                      <Smile className="w-3 h-3 text-[#A3733E]" />
                      <span>03:30 PM · Afternoon Play</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#132422]">
                      Kids Jumping Trampoline & Play Arena
                    </h4>
                    <p className="text-xs text-[#344E4A] leading-relaxed mt-1 line-clamp-2">
                      Heavy-duty steel-sprung trampoline with safety netting surrounded by soft lawn grass.
                    </p>
                  </div>
                </div>
                <div className="pt-3 mt-2 border-t border-[#E4D9C8] flex items-center justify-between text-[11px] font-bold text-[#116B7B]">
                  <span>Enclosed Safety Netting</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
                </div>
              </div>

              {/* Item 03: Badminton Court */}
              <div className="snap-touch-item w-[84vw] max-w-[340px] rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-extrabold text-[#A3733E]/40">№ 03</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E5F3F5] text-[#116B7B] text-[10px] font-bold border border-[#BCE2E7]">
                      Active Sports
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                    <img
                      src="/images/amenities/badminton-court.png"
                      alt="Bamboo Lawn Badminton Court"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#635546] mb-1">
                      <Activity className="w-3 h-3 text-[#1A96AA]" />
                      <span>04:30 PM · Golden Hour Rally</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#132422]">
                      Bamboo Lawn Badminton Court
                    </h4>
                    <p className="text-xs text-[#344E4A] leading-relaxed mt-1 line-clamp-2">
                      Lively friendly matches on grass courts naturally sheltered by green bamboo canopies.
                    </p>
                  </div>
                </div>
                <div className="pt-3 mt-2 border-t border-[#E4D9C8] flex items-center justify-between text-[11px] font-bold text-[#116B7B]">
                  <span>Racquets Provided Free</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
                </div>
              </div>

              {/* Item 04: Volleyball Lawn */}
              <div className="snap-touch-item w-[84vw] max-w-[340px] rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-extrabold text-[#A3733E]/40">№ 04</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EFE8DC] text-[#A3733E] text-[10px] font-bold border border-[#DFD3C0]">
                      Open Grounds
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                    <img
                      src="/images/resort/garden-lawn.jpeg"
                      alt="Outdoor Volleyball Lawn"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#635546] mb-1">
                      <Sun className="w-3 h-3 text-[#A3733E]" />
                      <span>05:00 PM · Sunset Rallies</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#132422]">
                      Outdoor Volleyball Lawn
                    </h4>
                    <p className="text-xs text-[#344E4A] leading-relaxed mt-1 line-clamp-2">
                      Spirited team rallies and social matches across expansive open lawn grounds.
                    </p>
                  </div>
                </div>
                <div className="pt-3 mt-2 border-t border-[#E4D9C8] flex items-center justify-between text-[11px] font-bold text-[#116B7B]">
                  <span>Spacious Green Lawns</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
                </div>
              </div>

              {/* Item 05: Raised Garden Terraces */}
              <div className="snap-touch-item w-[84vw] max-w-[340px] rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 shadow-md flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-extrabold text-[#A3733E]/40">№ 05</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E5F3F5] text-[#116B7B] text-[10px] font-bold border border-[#BCE2E7]">
                      Coffee & Decks
                    </span>
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                    <img
                      src="/images/resort/garden-terrace.jpeg"
                      alt="Raised Garden Terraces"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#635546] mb-1">
                      <Clock className="w-3 h-3 text-[#1A96AA]" />
                      <span>All Day · Open Access</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#132422]">
                      Raised Garden Terraces
                    </h4>
                    <p className="text-xs text-[#344E4A] leading-relaxed mt-1 line-clamp-2">
                      Elevated seating platforms for hot Coorg coffee, evening tea, and conversations.
                    </p>
                  </div>
                </div>
                <div className="pt-3 mt-2 border-t border-[#E4D9C8] flex items-center justify-between text-[11px] font-bold text-[#116B7B]">
                  <span>Plantation Views</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP VIEW: Asymmetrical Mid & Bottom Tiers */}
          <div className="hidden lg:block space-y-8">
            {/* Items 02 & 03: Asymmetrical Mid Tier (Tall Portrait + Widescreen Landscape) */}
            <div className="grid grid-cols-12 gap-8 items-stretch">
              
              {/* Item 02: Kids Trampoline (5 Cols - Tall Editorial Card) */}
              <div className="col-span-5">
                <CinematicReveal delay={0.1} duration={0.8} spring className="h-full">
                  <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between group">
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
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#635546] mb-1">
                          <Smile className="w-3.5 h-3.5 text-[#A3733E]" />
                          <span>03:30 PM · Afternoon Play</span>
                        </div>
                        <h4 className="font-serif text-xl font-bold text-[#132422] group-hover:text-[#116B7B] transition-colors">
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
              <div className="col-span-7">
                <CinematicReveal delay={0.2} duration={0.8} spring className="h-full">
                  <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between group">
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
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#635546] mb-1">
                          <Activity className="w-3.5 h-3.5 text-[#1A96AA]" />
                          <span>04:30 PM · Golden Hour Rally</span>
                        </div>
                        <h4 className="font-serif text-xl font-bold text-[#132422] group-hover:text-[#116B7B] transition-colors">
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
            <div className="grid grid-cols-2 gap-8">
              
              {/* Item 04: Volleyball Lawn */}
              <CinematicReveal delay={0.15} spring>
                <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
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
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#132422] group-hover:text-[#116B7B] transition-colors">Outdoor Volleyball Lawn</h4>
                    <p className="text-xs text-[#344E4A] leading-relaxed">Spirited team rallies and social matches across expansive open lawn grounds.</p>
                  </div>
                </div>
              </CinematicReveal>

              {/* Item 05: Raised Garden Terraces */}
              <CinematicReveal delay={0.25} spring>
                <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
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
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#132422] group-hover:text-[#116B7B] transition-colors">Raised Garden Terraces</h4>
                    <p className="text-xs text-[#344E4A] leading-relaxed">Elevated seating platforms for hot Coorg coffee, evening tea, and starlit conversations.</p>
                  </div>
                </div>
              </CinematicReveal>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default AmenitiesSection;

