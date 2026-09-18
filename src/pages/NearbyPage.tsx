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
      name: 'Kaveri Nisargadhama',
      dist: '3.8 km',
      time: '8 mins',
      type: 'Riverside Island & Deer Park',
      bestTime: '9:00 AM – 11:30 AM',
      highlight: 'Bamboo groves, suspension bridge across Kaveri river, and treetop walkways.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
      mapQuery: 'Kaveri+Nisargadhama+Kushalnagar',
    },
    {
      name: 'Tibetan Golden Temple (Namdroling)',
      dist: '6.5 km',
      time: '12 mins',
      type: 'Tibetan Monastery & Heritage',
      bestTime: '10:00 AM – 4:00 PM',
      highlight: 'Major Tibetan settlement with ornate prayer halls and 40ft golden Buddha statues.',
      image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&q=80',
      mapQuery: 'Namdroling+Monastery+Golden+Temple+Bylakuppe',
    },
    {
      name: 'Harangi Dam & Reservoir',
      dist: '9.2 km',
      time: '18 mins',
      type: 'Dam & Sunset Scenic Lake',
      bestTime: '4:30 PM – 6:30 PM',
      highlight: 'Serene lakeside breeze, calm water reflections, and scenic evening views.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
      mapQuery: 'Harangi+Reservoir+Kushalnagar',
    },
    {
      name: 'Dubare Elephant Camp',
      dist: '14.5 km',
      time: '25 mins',
      type: 'Elephant Sanctuary & Kaveri Rafting',
      bestTime: '8:30 AM – 10:30 AM',
      highlight: 'Observe elephant bathing rituals in Kaveri river and explore tranquil forest trails.',
      image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&q=80',
      mapQuery: 'Dubare+Elephant+Camp+Coorg',
    },
    {
      name: 'Chiklihole Reservoir',
      dist: '16.0 km',
      time: '25 mins',
      type: 'Secluded Forest Lake & Dam',
      bestTime: '3:30 PM – 6:00 PM',
      highlight: 'Curved spillway dam nestled in dense evergreen woods, peaceful and uncrowded.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
      mapQuery: 'Chiklihole+Reservoir+Coorg',
    },
    {
      name: "Raja's Seat (Madikeri)",
      dist: '29.0 km',
      time: '40 mins',
      type: 'Historic Valley Sunset Viewpoint',
      bestTime: '5:00 PM – 6:45 PM',
      highlight: 'Panoramic Western Ghats sunset terrace where Kodagu kings spent peaceful evenings.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
      mapQuery: 'Rajas+Seat+Madikeri',
    },
    {
      name: 'Abbey Falls (Madikeri)',
      dist: '35.0 km',
      time: '50 mins',
      type: 'Coffee Estate Waterfall',
      bestTime: '9:00 AM – 1:00 PM',
      highlight: 'Roaring cascade nestled inside spice and coffee plantations with a suspension viewbridge.',
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80',
      mapQuery: 'Abbey+Falls+Madikeri',
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
              <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] overflow-hidden shadow-sm hover:shadow-md hover:border-[#1A96AA]/40 transition-all h-full flex flex-col justify-between group">
                <div className="relative h-44 overflow-hidden bg-[#EFE8DC]">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF6EF]/90 backdrop-blur-md text-[#116B7B] border border-[#BCE2E7] shadow-sm">
                      {dest.dist} · {dest.time}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-semibold text-[#FFD285] block uppercase tracking-wider">
                      {dest.type}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white drop-shadow-sm line-clamp-1">
                      {dest.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#635546] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#A3733E]" />
                      <span>Best Hours: {dest.bestTime}</span>
                    </div>
                    <p className="text-xs text-[#344E4A] leading-relaxed">
                      {dest.highlight}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E4D9C8]/60 flex items-center gap-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${dest.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#E5F3F5] hover:bg-[#D2EDF2] text-[#116B7B] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-[#BCE2E7]"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Google Maps</span>
                    </a>
                    <button
                      onClick={onOpenEnquiry}
                      className="py-2 px-3 rounded-xl bg-[#EFE8DC] hover:bg-[#E4D9C8] text-[#132422] font-semibold text-xs transition-colors flex items-center justify-center gap-1 border border-[#D5C7B2]"
                      title="Enquire cab transfer"
                    >
                      <span>Taxi</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
