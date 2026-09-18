import React from 'react';
import { Compass, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicReveal } from '../common/CinematicReveal';
import { NearbyInteractiveMap } from '../interactive/NearbyInteractiveMap';
import { FanOutCardDeck, PostcardItem } from '../3d/FanOutCardDeck';

export const NearbySection: React.FC = () => {
  const postcards: PostcardItem[] = [
    {
      id: 'pc-1',
      image: '/images/nearby/hanging-bridge.png',
      title: 'Kaveri Nisargadhama',
      badge: 'Riverside Island',
      dist: '3.8 km · 8 mins',
      description: 'Hanging suspension bridge over the Kaveri, bamboo groves, and peaceful deer park.',
    },
    {
      id: 'pc-2',
      image: '/images/nearby/nearby-attractions-overview.png',
      title: 'Tibetan Golden Temple',
      badge: 'Namdroling',
      dist: '6.5 km · 12 mins',
      description: 'Majestic 40ft golden statues and serene Buddhist chanting halls in Bylakuppe.',
    },
    {
      id: 'pc-3',
      image: '/images/resort/garden-lawn.jpeg',
      title: 'Dubare Elephant Camp',
      badge: 'Elephant Haven',
      dist: '14.5 km · 25 mins',
      description: 'Historic elephant river camp with morning river bathing and natural boat rides.',
    },
    {
      id: 'pc-4',
      image: '/images/resort/garden-terrace.jpeg',
      title: "Raja's Seat Madikeri",
      badge: 'Sunset Viewpoint',
      dist: '29.0 km · 40 mins',
      description: 'Historic vantage pavilion overlooking mist-filled valleys and sunsets.',
    },
    {
      id: 'pc-5',
      image: '/images/rooms/room-interior-neutral.jpeg',
      title: 'Abbey Falls Cascades',
      badge: 'Plantation Falls',
      dist: '35.0 km · 50 mins',
      description: 'Roaring waterfall nestled amidst dense coffee bushes and spice trees.',
    },
  ];

  return (
    <section id="nearby" className="relative w-full py-20 sm:py-28 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Title Header */}
        <CinematicReveal className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Compass className="w-4 h-4 text-[#A3733E]" />
            <span>Kushalnagar Strategic Sanctuary Base</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#132422] font-serif leading-tight">
            Explore Kodagu from your central riverside base.
          </h2>

          <p className="text-sm sm:text-base text-[#344E4A] font-medium leading-relaxed">
            Coorg Laya Resort puts you minutes away from the Kaveri suspension bridge, Tibetan monastery, elephant river habitats, and scenic Western Ghats viewpoints.
          </p>
        </CinematicReveal>

        {/* Interactive Google Maps Route & Distance Explorer Hub */}
        <CinematicReveal delay={0.15} duration={0.8}>
          <NearbyInteractiveMap />
        </CinematicReveal>

        {/* Tactile 3D Fan-Out Postcard Deck Component */}
        <CinematicReveal delay={0.25} duration={0.8}>
          <div className="rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 sm:p-10 shadow-sm space-y-6">
            <FanOutCardDeck
              cards={postcards}
              title="Kodagu Sightseeing Postcard Collection"
              subtitle="Hover or tap any postcard to fan out the 3D deck and explore details"
            />
            
            <div className="text-center pt-4">
              <Link
                to="/nearby"
                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1A96AA] to-[#116B7B] hover:from-[#158092] hover:to-[#0D5764] shadow-[0_8px_20px_rgba(26,150,170,0.35)] inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>View Full Tourism Itinerary & Directions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </CinematicReveal>

      </div>
    </section>
  );
};

export default NearbySection;
