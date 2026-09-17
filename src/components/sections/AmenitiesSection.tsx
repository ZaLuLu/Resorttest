import React from 'react';
import { Waves, Sparkles, Activity, Smile, Sun, ArrowUpRight } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';
import { FluidWaterCard } from '../3d/FluidWaterCard';
import { CinematicReveal } from '../common/CinematicReveal';
import { Clay3DCard } from '../3d/Clay3DCard';

export const AmenitiesSection: React.FC = () => {
  const otherAmenities = [
    {
      id: 'amenities-02',
      image: '/images/amenities/kids-play-trampoline.png',
      badge: 'Family & Kids',
      name: 'Kids Trampoline & Play Arena',
      description: 'Enclosed jumping trampoline and open soft lawn for young ones to play freely under the palms.',
      timeSlot: '03:30 PM · Afternoon Play',
      variant: 'sand' as const,
      icon: Smile,
    },
    {
      id: 'amenities-03',
      image: '/images/amenities/badminton-court.png',
      badge: 'Active Sports',
      name: 'Bamboo Lawn Badminton',
      description: 'Lively matches on manicured grass naturally sheltered by towering green bamboo canopies.',
      timeSlot: '04:30 PM · Golden Hour Rally',
      variant: 'water' as const,
      icon: Activity,
    },
    {
      id: 'amenities-04',
      image: '/images/resort/garden-lawn.jpeg',
      badge: 'Open Grounds',
      name: 'Outdoor Volleyball Lawn',
      description: 'Spirited team rallies and social matches across expansive open lawn grounds.',
      timeSlot: '05:15 PM · Sunset Match',
      variant: 'sand' as const,
      icon: Sun,
    },
    {
      id: 'amenities-05',
      image: '/images/resort/garden-terrace.jpeg',
      badge: 'Coffee & Decks',
      name: 'Raised Garden Terraces',
      description: 'Elevated seating platforms for hot Coorg estate coffee, evening tea, and starlit conversations.',
      timeSlot: '07:30 PM · Starlit Evening',
      variant: 'water' as const,
      icon: Sparkles,
    },
  ];

  return (
    <section id="amenities" className="relative w-full py-20 sm:py-28 bg-[#FAF6EF] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <CinematicReveal className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-4 py-1.5 text-xs font-bold text-[#116B7B] shadow-sm">
            <Waves className="w-4 h-4 text-[#1A96AA]" />
            <span>Resort Amenities & Living Water</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#132422] font-serif leading-tight">
            Curated spaces for recreation, water, and stillness.
          </h2>
          <p className="text-sm sm:text-base text-[#344E4A] font-medium leading-relaxed">
            Every amenity is naturally woven into our tropical Kushalnagar landscape. Interact with our water card to experience live surface ripples.
          </p>
        </CinematicReveal>

        {/* Featured Water Spotlight + Amenity Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Fluid Water Feature Card (5 Cols) */}
          <div className="lg:col-span-5 h-full">
            <CinematicReveal delay={0.1} duration={0.8} className="h-full">
              <FluidWaterCard
                imageSrc="/images/amenities/swimming-pool.png"
                title="Palm-Fringed Swimming Pool"
                subtitle="Daily 7:00 AM – 7:00 PM"
                badge="Living Water Simulation"
                description="Crystal-clear pool with a dedicated shallow relaxation section, flanked by tropical coconut palms, timber loungers, and lush estate greenery."
                className="h-full flex flex-col justify-between"
              />
            </CinematicReveal>
          </div>

          {/* 4 Supporting Amenity Cards (7 Cols in 2x2 Grid) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {otherAmenities.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <CinematicReveal key={item.id} delay={0.15 + idx * 0.1} duration={0.7}>
                  <Clay3DCard
                    variant={item.variant}
                    maxTilt={10}
                    glareOpacity={0.25}
                    className="h-full p-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <ClayImage
                        src={item.image}
                        alt={item.name}
                        aspectRatio="16:10"
                        clayVariant={item.variant}
                        badge={item.badge}
                        className="w-full shadow-sm rounded-2xl"
                      />

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <IconComp className="w-3.5 h-3.5 text-[#1A96AA]" />
                          <span className="text-[11px] font-bold text-[#635546]">
                            {item.timeSlot}
                          </span>
                        </div>

                        <h3 className="text-base font-extrabold text-[#132422] font-serif leading-snug">
                          {item.name}
                        </h3>

                        <p className="text-xs text-[#344E4A] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Clay3DCard>
                </CinematicReveal>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
export default AmenitiesSection;
