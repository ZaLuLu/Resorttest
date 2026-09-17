import React from 'react';
import { 
  Compass, MapPin, Clock, ArrowRight, Sun, CloudRain, 
  Car, ShieldCheck, Waves, Camera, Navigation, ArrowUpRight
} from 'lucide-react';
import { NearbySection } from '../components/sections/NearbySection';
import { PageHeader } from '../components/common/PageHeader';
import { CinematicReveal } from '../components/common/CinematicReveal';
import { Clay3DCard } from '../components/3d/Clay3DCard';
import { ClayImage } from '../components/common/ClayImage';

interface NearbyPageProps {
  onOpenEnquiry: () => void;
}

export const NearbyPage: React.FC<NearbyPageProps> = ({ onOpenEnquiry }) => {
  const allDestinations = [
    {
      name: 'Kaveri Nisargadhama (Hanging Bridge)',
      dist: '4 km',
      time: '8 mins',
      type: 'Riverside Island & Deer Park',
      bestTime: '9:00 AM – 11:30 AM',
      highlight: 'Bamboo groves, suspension bridge across Kaveri, and tree-top walkways.',
      image: '/images/nearby/kaveri-river.png',
    },
    {
      name: 'Tibetan Golden Temple (Bylakuppe)',
      dist: '6 km',
      time: '12 mins',
      type: 'Namdroling Monastery',
      bestTime: '10:00 AM – 4:00 PM',
      highlight: 'Second largest Tibetan settlement in India with majestic 40ft golden statues.',
      image: '/images/nearby/nearby-attractions-overview.png',
    },
    {
      name: 'Dubare Elephant Camp',
      dist: '18 km',
      time: '25 mins',
      type: 'Elephant River Habitat & Rafting',
      bestTime: '8:30 AM – 10:30 AM',
      highlight: 'Observe elephant bathing in Kaveri river and natural forest wildlife trails.',
      image: '/images/resort/garden-lawn.jpeg',
    },
    {
      name: 'Harangi Reservoir & Backwaters',
      dist: '12 km',
      time: '20 mins',
      type: 'Dam & Sunset Scenic Lake',
      bestTime: '4:30 PM – 6:30 PM',
      highlight: 'Serene lakeside breeze, calm water reflections, and scenic picnic vistas.',
      image: '/images/amenities/swimming-pool.png',
    },
    {
      name: "Raja's Seat (Madikeri)",
      dist: '28 km',
      time: '40 mins',
      type: 'Historic Sunset Viewpoint',
      bestTime: '5:00 PM – 6:45 PM',
      highlight: 'Panoramic valley sunset views where Kodagu kings enjoyed evening skies.',
      image: '/images/resort/garden-terrace.jpeg',
    },
    {
      name: 'Abbey Falls (Coffee Waterfall)',
      dist: '35 km',
      time: '50 mins',
      type: 'Coffee Plantation Cascades',
      bestTime: '9:00 AM – 1:00 PM',
      highlight: 'Roaring waterfall nestled amidst spice and coffee plantations with a bridge.',
      image: '/images/rooms/room-interior-neutral.jpeg',
    },
  ];

  const roadTrips = [
    {
      title: 'The Kushalnagar Half-Day Circuit',
      duration: '4 – 5 Hours',
      badge: 'Easy & Relaxed',
      stops: [
        '09:00 AM: Depart Coorg Laya Resort',
        '09:15 AM: Kaveri Nisargadhama hanging bridge & deer park',
        '11:00 AM: Tibetan Golden Temple & Namdroling Monastery',
        '01:00 PM: Return to resort for lunch by the palm pool',
      ],
      description: 'Ideal for arrival or departure days with short scenic drives under 15 minutes.',
    },
    {
      title: 'The Full-Day Kodagu Highlands Circuit',
      duration: '7 – 8 Hours',
      badge: 'Comprehensive Explorer',
      stops: [
        '08:30 AM: Dubare Elephant Camp morning interaction',
        '11:30 AM: Madikeri Fort & Omkareshwara Temple',
        '01:30 PM: Traditional Coorg Pandi/Vegetarian lunch in Madikeri',
        '03:00 PM: Abbey Falls coffee plantation walk',
        '05:30 PM: Sunset at Raja’s Seat overlooking the valley',
      ],
      description: 'The ultimate sightseeing tour covering misty peaks, waterfalls, and cultural landmarks.',
    },
  ];

  return (
    <div className="pt-24 pb-28 bg-[#FAF6EF] text-[#132422] space-y-20 select-none">
      
      {/* Page Header */}
      <PageHeader
        badge="Regional Exploration"
        title="Kodagu & Kaveri Attractions"
        description="Coorg Laya Resort in Kushalnagar is your central base to explore the Kaveri waterways, Tibetan monasteries, and misty Western Ghats viewpoints."
        actionText="Plan Your Day Trip"
        onActionClick={onOpenEnquiry}
        bgImage="/images/nearby/kaveri-river.png"
      />

      {/* Main Interactive Nearby Section (With Live Fluid Water Caustics) */}
      <NearbySection />

      {/* Destination Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <CinematicReveal className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Compass className="w-4 h-4 text-[#A3733E]" />
            <span>Curated Sightseeing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#132422] font-serif leading-tight">
            Top Attractions Around Coorg Laya
          </h2>
          <p className="text-sm text-[#344E4A] leading-relaxed">
            Verified travel times, distances, and optimal visiting windows directly from our resort reception.
          </p>
        </CinematicReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allDestinations.map((dest, idx) => (
            <CinematicReveal key={idx} delay={idx * 0.08}>
              <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 space-y-4 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#E5F3F5] text-[#116B7B] border border-[#BCE2E7]">
                      {dest.dist} · {dest.time}
                    </span>
                    <span className="text-xs text-[#635546] font-semibold">{dest.bestTime}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#132422]">
                    {dest.name}
                  </h3>
                  <span className="text-xs font-bold text-[#A3733E] block">
                    {dest.type}
                  </span>
                  <p className="text-xs text-[#344E4A] leading-relaxed">
                    {dest.highlight}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E4D9C8]/60 flex items-center justify-between">
                  <span className="text-[11px] text-[#116B7B] font-bold">Taxi / Self-Drive Available</span>
                  <button
                    onClick={onOpenEnquiry}
                    className="p-2 rounded-xl bg-[#EFE8DC] hover:bg-[#E4D9C8] text-[#132422] transition-colors"
                    title="Enquire sightseeing taxi"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>

      {/* Curated Road Trip Circuits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <CinematicReveal className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-4 py-1.5 text-xs font-bold text-[#116B7B] shadow-sm">
            <Car className="w-4 h-4 text-[#1A96AA]" />
            <span>Recommended Road Trips</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#132422] font-serif">
            Day-Trip Itineraries from Coorg Laya
          </h2>
        </CinematicReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roadTrips.map((trip, idx) => (
            <CinematicReveal key={idx} delay={idx * 0.15}>
              <Clay3DCard
                variant={idx === 0 ? 'sand' : 'water'}
                maxTilt={6}
                glareOpacity={0.2}
                className="p-6 sm:p-8 h-full flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#116B7B] border border-[#BCE2E7] shadow-sm">
                      {trip.badge}
                    </span>
                    <span className="text-xs font-bold text-[#A3733E]">
                      {trip.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#132422]">
                    {trip.title}
                  </h3>
                  <p className="text-xs text-[#344E4A] leading-relaxed">
                    {trip.description}
                  </p>

                  <ul className="space-y-2 pt-3 border-t border-[#E4D9C8]">
                    {trip.stops.map((stop, sIdx) => (
                      <li key={sIdx} className="text-xs text-[#132422] font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1A96AA] shrink-0" />
                        <span>{stop}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E4D9C8]">
                  <button
                    onClick={onOpenEnquiry}
                    className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#1A96AA] to-[#116B7B] hover:from-[#158092] hover:to-[#0D5764] shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Request Resort Cab / Driver</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Clay3DCard>
            </CinematicReveal>
          ))}
        </div>
      </div>

    </div>
  );
};

export default NearbyPage;
