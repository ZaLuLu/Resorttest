import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ClayImage } from '../common/ClayImage';
import { CinematicReveal } from '../common/CinematicReveal';
import { FluidWaterCard } from '../3d/FluidWaterCard';
import { FanOutCardDeck, PostcardItem } from '../3d/FanOutCardDeck';

export const NearbySection: React.FC = () => {
  const destinations = [
    { name: "Kaveri Nisargadhama (Hanging Bridge)", dist: "4 km", time: "8 mins", type: "Riverside Island & Deer Park" },
    { name: "Dubare Elephant Camp", dist: "18 km", time: "25 mins", type: "Elephant River Bathing & Rafting" },
    { name: "Tibetan Golden Temple (Bylakuppe)", dist: "6 km", time: "12 mins", type: "Namdroling Monastery & Culture" },
    { name: "Raja's Seat Sunset Viewpoint", dist: "28 km", time: "40 mins", type: "Madikeri Valley Panorama" },
    { name: "Abbey Falls", dist: "35 km", time: "50 mins", type: "Coffee Plantation Waterfall" },
  ];

  const postcards: PostcardItem[] = [
    {
      id: 'pc-1',
      image: '/images/nearby/kaveri-river.png',
      title: 'Kaveri Nisargadhama',
      badge: 'Riverside Island',
      dist: '4 km · 8 mins',
      description: 'Hanging suspension bridge over the Kaveri, bamboo groves, and deer park.',
    },
    {
      id: 'pc-2',
      image: '/images/nearby/nearby-attractions-overview.png',
      title: 'Tibetan Golden Temple',
      badge: 'Namdroling',
      dist: '6 km · 12 mins',
      description: 'Majestic 40ft golden statues and serene Buddhist chanting halls in Bylakuppe.',
    },
    {
      id: 'pc-3',
      image: '/images/resort/garden-lawn.jpeg',
      title: 'Dubare Elephant Camp',
      badge: 'Elephant Haven',
      dist: '18 km · 25 mins',
      description: 'Historic elephant river camp with morning river bathing and boat rides.',
    },
    {
      id: 'pc-4',
      image: '/images/resort/garden-terrace.jpeg',
      title: "Raja's Seat Madikeri",
      badge: 'Sunset Viewpoint',
      dist: '28 km · 40 mins',
      description: 'Historic vantage pavilion overlooking mist-filled valleys and sunsets.',
    },
    {
      id: 'pc-5',
      image: '/images/rooms/room-interior-neutral.jpeg',
      title: 'Abbey Falls Cascades',
      badge: 'Plantation Falls',
      dist: '35 km · 50 mins',
      description: 'Roaring waterfall nestled amidst dense coffee bushes and spice trees.',
    },
  ];

  return (
    <section id="nearby" className="relative w-full py-20 sm:py-28 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Grid: Destinations & Live Kaveri Fluid Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Destination List in Clay Container */}
          <div className="lg:col-span-6 space-y-6">
            <CinematicReveal className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
                <Compass className="w-4 h-4 text-[#A3733E]" />
                <span>Sanctuary Hub in Kushalnagar</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#132422] font-serif leading-tight">
                Explore Kodagu from your central riverside base.
              </h2>

              <p className="text-sm sm:text-base text-[#344E4A] font-medium leading-relaxed">
                Coorg Laya Resort puts you minutes away from the Kaveri suspension bridge, elephant river experiences, and misty Western Ghats viewpoints.
              </p>
            </CinematicReveal>

            {/* Destination List */}
            <div className="space-y-3 pt-2">
              {destinations.map((dest, idx) => (
                <CinematicReveal key={idx} delay={idx * 0.08} duration={0.6}>
                  <div className="p-3.5 rounded-2xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E5F3F5] text-[#116B7B] flex items-center justify-center shadow-sm">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#132422]">{dest.name}</h4>
                        <span className="text-xs text-[#635546] font-medium">{dest.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-0.5 text-xs font-bold text-[#116B7B] bg-[#E5F3F5] rounded-full inline-block">
                        {dest.dist}
                      </span>
                      <span className="text-[11px] text-[#A3733E] font-bold block pt-0.5">{dest.time}</span>
                    </div>
                  </div>
                </CinematicReveal>
              ))}
            </div>

            <CinematicReveal delay={0.4} className="pt-2">
              <Link
                to="/nearby"
                className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1A96AA] to-[#116B7B] hover:from-[#158092] hover:to-[#0D5764] shadow-[0_8px_20px_rgba(26,150,170,0.3)] inline-flex items-center gap-2 transition-all"
              >
                <span>View Complete Tourism Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </CinematicReveal>
          </div>

          {/* Right Showcase: Interactive River Card + Regional Map */}
          <div className="lg:col-span-6 space-y-6">
            {/* Kaveri River Live Fluid Caustics Card */}
            <CinematicReveal delay={0.2} duration={0.8}>
              <FluidWaterCard
                imageSrc="/images/nearby/kaveri-river.png"
                title="Kaveri River & Island Sanctuaries"
                subtitle="4 km from Resort · 8 mins drive"
                badge="Living Kaveri Waters"
                description="Glide your cursor to experience the fluid water ripples of the holy Kaveri, flowing through ancient bamboo canopies and teak bridges."
              />
            </CinematicReveal>

            {/* Regional Map Radar Frame */}
            <CinematicReveal delay={0.3} duration={0.8}>
              <div className="rounded-3xl overflow-hidden bg-[#FAF6EF] border border-[#E4D9C8] p-3 shadow-md relative">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 150, damping: 14, delay: 0.2 }}
                  className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full bg-[#132422]/90 text-[#FAF6EF] px-4 py-1.5 shadow-md border border-white/20"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1A96AA] animate-ping" />
                  <span className="text-xs font-extrabold text-[#74B4C0]">Coorg Laya Pin</span>
                </motion.div>

                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                  <ClayImage
                    src="/images/nearby/nearby-attractions-overview.png"
                    alt="Regional Tourism Radar Map around Kushalnagar Kodagu"
                    aspectRatio="16:10"
                    clayVariant="water"
                    badge="Kushalnagar Tourism Hub"
                    className="w-full h-full object-cover shadow-sm"
                  />
                </div>
              </div>
            </CinematicReveal>
          </div>

        </div>

        {/* Tactile 3D Fan-Out Postcard Deck Component */}
        <CinematicReveal delay={0.2} duration={0.8}>
          <div className="rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 sm:p-10 shadow-sm">
            <FanOutCardDeck
              cards={postcards}
              title="Kodagu Sightseeing Postcard Collection"
              subtitle="Hover or tap any postcard to fan out the 3D deck and explore details"
            />
          </div>
        </CinematicReveal>

      </div>
    </section>
  );
};
export default NearbySection;
