import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';
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
      badge: 'Riverside Island & Deer Park',
      dist: '3.8 km · 8 mins',
      elevation: '815m MSL',
      description: 'Hanging suspension rope bridge over flowing Kaveri river, dense bamboo groves, and peaceful deer reserve.',
      googleMapsUrl: 'https://maps.google.com/?q=Kaveri+Nisargadhama+Kushalnagar+Coorg',
    },
    {
      id: 'pc-2',
      image: '/images/nearby/nearby-attractions-overview.png',
      title: 'Tibetan Golden Temple',
      badge: 'Namdroling Monastic Center',
      dist: '6.5 km · 12 mins',
      elevation: '835m MSL',
      description: 'Towering 40ft gold-plated Buddha statues, ornate Tibetan murals, prayer wheels, and serene chanting halls.',
      googleMapsUrl: 'https://maps.google.com/?q=Namdroling+Monastery+Golden+Temple+Bylakuppe',
    },
    {
      id: 'pc-3',
      image: '/images/nearby/dubare-camp.jpg',
      title: 'Dubare Elephant Camp',
      badge: 'Kaveri Elephant Sanctuary',
      dist: '14.5 km · 25 mins',
      elevation: '810m MSL',
      description: 'Historic elephant river camp with morning river bathing in Kaveri waters and naturalist-led forest sessions.',
      googleMapsUrl: 'https://maps.google.com/?q=Dubare+Elephant+Camp+Coorg',
    },
    {
      id: 'pc-4',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
      title: "Raja's Seat (Madikeri)",
      badge: 'Historic Sunset Viewpoint',
      dist: '29.0 km · 40 mins',
      elevation: '1,150m MSL',
      description: 'Historic royal stone pavilion perched on a cliff edge overlooking layered mist valleys and sunsets across Western Ghats.',
      googleMapsUrl: 'https://maps.google.com/?q=Rajas+Seat+Madikeri+Coorg',
    },
    {
      id: 'pc-5',
      image: '/images/nearby/abbey-falls.jpg',
      title: 'Abbey Falls Cascades',
      badge: 'Plantation Waterfall',
      dist: '35.0 km · 50 mins',
      elevation: '1,060m MSL',
      description: 'Roaring 70-foot waterfall cascading between private coffee estates, aromatic pepper vines, and spice trees.',
      googleMapsUrl: 'https://maps.google.com/?q=Abbey+Falls+Madikeri+Coorg',
    },
    {
      id: 'pc-6',
      image: '/images/nearby/kaveri-river.png',
      title: 'Harangi Dam & Reservoir',
      badge: 'Lakeside Reservoir',
      dist: '9.2 km · 18 mins',
      elevation: '850m MSL',
      description: 'Sweeping reservoir backwaters with lakeside promenades, cool valley winds, and serene evening reflection views.',
      googleMapsUrl: 'https://maps.google.com/?q=Harangi+Dam+Hudgur+Coorg',
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

        {/* Interactive Offline Regional Cartographic Map Showcase */}
        <CinematicReveal delay={0.15} duration={0.8}>
          <NearbyInteractiveMap />
        </CinematicReveal>

        {/* Luxury Editorial Postcard Gallery */}
        <CinematicReveal delay={0.25} duration={0.8}>
          <div className="rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 sm:p-10 shadow-sm space-y-6">
            <FanOutCardDeck
              cards={postcards}
              title="Kodagu Sightseeing Postcard Collection"
              subtitle="Verified distances and authentic highlights within scenic reach of Coorg Laya Resort"
            />
            
            <div className="text-center pt-4">
              <Link
                to="/nearby"
                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#132422] hover:bg-[#1E3633] shadow-md inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>View Full Tourism Itinerary & Directions</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        </CinematicReveal>

      </div>
    </section>
  );
};

export default NearbySection;
