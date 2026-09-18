import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, MapPin, Clock, ArrowRight, ExternalLink, 
  Navigation, Car, Waves, Trees, Sparkles, Home
} from 'lucide-react';

export interface NearbyDestination {
  id: string;
  name: string;
  category: 'River & Wildlife' | 'Heritage & Culture' | 'Waterfalls & Views' | 'Reservoirs';
  dist: string;
  time: string;
  description: string;
  bestTime: string;
  highlights: string[];
  image: string;
  googleMapsUrl: string;
  // Position on stylized 2D map (0 to 100 percentage coordinates)
  mapX: number;
  mapY: number;
}

export const NEARBY_DESTINATIONS: NearbyDestination[] = [
  {
    id: 'nisargadhama',
    name: 'Kaveri Nisargadhama',
    category: 'River & Wildlife',
    dist: '3.8 km',
    time: '8 mins',
    description: 'A 64-acre ecological island formed by River Kaveri, famous for its hanging rope bridge, dense bamboo thickets, and gentle deer park.',
    bestTime: '9:00 AM – 11:30 AM',
    highlights: ['Hanging Rope Bridge', 'River Kaveri Island', 'Bamboo Forest Walkways', 'Deer Park'],
    image: '/images/nearby/hanging-bridge.png',
    googleMapsUrl: 'https://maps.google.com/?q=Kaveri+Nisargadhama+Kushalnagar+Coorg',
    mapX: 42,
    mapY: 52,
  },
  {
    id: 'golden-temple',
    name: 'Tibetan Golden Temple (Namdroling)',
    category: 'Heritage & Culture',
    dist: '6.5 km',
    time: '12 mins',
    description: 'One of the largest Tibetan Buddhist monastic centers in India, renowned for its 40ft golden Buddha statues, ornate thangkas, and peaceful chanting halls.',
    bestTime: '10:00 AM – 4:00 PM',
    highlights: ['40ft Golden Buddha Statues', 'Tibetan Monastery & Chants', 'Bylakuppe Cultural Market', 'Prayer Wheels'],
    image: '/images/nearby/nearby-attractions-overview.png',
    googleMapsUrl: 'https://maps.google.com/?q=Namdroling+Monastery+Golden+Temple+Bylakuppe',
    mapX: 68,
    mapY: 62,
  },
  {
    id: 'harangi-dam',
    name: 'Harangi Dam & Reservoir',
    category: 'Reservoirs',
    dist: '9.2 km',
    time: '18 mins',
    description: 'A masonry dam built across the Harangi tributary of River Kaveri, offering sweeping backwater views, cool breezes, and lush gardens.',
    bestTime: '4:00 PM – 6:30 PM (Sunset)',
    highlights: ['Scenic Dam Crest View', 'Tranquil Reservoir Backwaters', 'Evening Sunset Breeze', 'Lakeside Gardens'],
    image: '/images/nearby/kaveri-river.png',
    googleMapsUrl: 'https://maps.google.com/?q=Harangi+Dam+Hudgur+Coorg',
    mapX: 38,
    mapY: 24,
  },
  {
    id: 'dubare',
    name: 'Dubare Elephant Camp',
    category: 'River & Wildlife',
    dist: '14.5 km',
    time: '25 mins',
    description: 'Historic elephant training camp on the banks of River Kaveri. Experience morning elephant river bathing, feeding, and tranquil boat rides.',
    bestTime: '8:30 AM – 10:30 AM (Bathing)',
    highlights: ['Elephant River Bathing', 'Kaveri Riverboat Crossing', 'Naturalist Guided Sessions', 'Riverside Jungle Trails'],
    image: '/images/resort/garden-lawn.jpeg',
    googleMapsUrl: 'https://maps.google.com/?q=Dubare+Elephant+Camp+Coorg',
    mapX: 62,
    mapY: 82,
  },
  {
    id: 'chiklihole',
    name: 'Chiklihole Reservoir',
    category: 'Reservoirs',
    dist: '16.0 km',
    time: '25 mins',
    description: 'A serene, semi-circular dam reservoir tucked into the forests between Kushalnagar and Madikeri, celebrated for mirror-like sunset reflections.',
    bestTime: '4:30 PM – 6:15 PM',
    highlights: ['Unique Semi-Circular Spillway', 'Dense Forest Solitude', 'Spectacular Sunset Reflections', 'Quiet Nature Walks'],
    image: '/images/resort/covered-seating.jpeg',
    googleMapsUrl: 'https://maps.google.com/?q=Chiklihole+Reservoir+Coorg',
    mapX: 30,
    mapY: 68,
  },
  {
    id: 'rajas-seat',
    name: "Raja's Seat (Madikeri)",
    category: 'Waterfalls & Views',
    dist: '29.0 km',
    time: '40 mins',
    description: 'The historic seasonal garden where the Rajas of Kodagu watched evening sunsets. Perched on a cliff with 180° views across misty Western Ghats valleys.',
    bestTime: '5:15 PM – 6:45 PM (Sunset)',
    highlights: ['Panoramic Valley Sunset Views', 'Historic Royal Pavilion', 'Musical Fountain & Gardens', 'Toy Train for Kids'],
    image: '/images/resort/garden-terrace.jpeg',
    googleMapsUrl: 'https://maps.google.com/?q=Rajas+Seat+Madikeri+Coorg',
    mapX: 14,
    mapY: 42,
  },
  {
    id: 'abbey-falls',
    name: 'Abbey Falls',
    category: 'Waterfalls & Views',
    dist: '35.0 km',
    time: '50 mins',
    description: 'A roaring 70-foot waterfall cascading between private coffee plantations and spice bushes, crossed by a hanging view bridge.',
    bestTime: '9:00 AM – 1:00 PM',
    highlights: ['70-Foot Cascading Waterfall', 'Coffee & Spice Plantation Trails', 'Hanging View Suspension Deck', 'Lush Rainforest Canopy'],
    image: '/images/rooms/room-interior-neutral.jpeg',
    googleMapsUrl: 'https://maps.google.com/?q=Abbey+Falls+Madikeri+Coorg',
    mapX: 12,
    mapY: 22,
  },
];

export const NearbyInteractiveMap: React.FC = () => {
  const [activeDestId, setActiveDestId] = useState<string>('nisargadhama');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'River & Wildlife', 'Heritage & Culture', 'Reservoirs', 'Waterfalls & Views'];

  const filteredDestinations = selectedCategory === 'All'
    ? NEARBY_DESTINATIONS
    : NEARBY_DESTINATIONS.filter(d => d.category === selectedCategory);

  const activeDest = NEARBY_DESTINATIONS.find(d => d.id === activeDestId) || NEARBY_DESTINATIONS[0];

  // Coorg Laya Resort coordinates on map canvas (center-ish hub in Kushalnagar)
  const RESORT_MAP_X = 52;
  const RESORT_MAP_Y = 48;

  return (
    <div className="w-full rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 sm:p-8 md:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.12)] space-y-8 select-none">
      
      {/* Top Header & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-[#E4D9C8] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E5F3F5] text-[#116B7B] border border-[#BCE2E7] px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#1A96AA]" />
            <span>Kushalnagar Tourism Hub · Verified Distances</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#132422]">
            Interactive Nearby Destinations Explorer
          </h3>
          <p className="text-xs sm:text-sm text-[#344E4A] font-medium">
            Explore road routes and driving distances radiating from your central sanctuary at Coorg Laya Resort.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1A96AA] text-white shadow-md'
                    : 'bg-[#EFE8DC] text-[#344E4A] hover:bg-[#E5DBCB]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Interactive 2D Roadmap Canvas (Left/Center) + Active Detail Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ========================================================================= */}
        {/* INTERACTIVE STYLIZED MAP CANVAS (7 Cols)                                 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl bg-[#EFE8DC] border-2 border-[#DFD3C0] shadow-[inset_0_2px_8px_rgba(0,0,0,0.06),_0_12px_30px_rgba(0,0,0,0.08)] overflow-hidden">
            
            {/* Background Topographic Contours & Forest Texture */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#1A96AA 1px, transparent 1px), radial-gradient(#635546 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px',
              }}
            />

            {/* Stylized River Kaveri (Animated Water Ribbon) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="kaveriRiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1A96AA" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0.5" />
                </linearGradient>
                <filter id="glowFilter">
                  <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* River Kaveri Path winding through Western Ghats & Kushalnagar */}
              <path
                d="M 5,10 Q 25,35 45,46 T 58,54 T 75,70 T 95,90"
                fill="none"
                stroke="url(#kaveriRiverGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M 5,10 Q 25,35 45,46 T 58,54 T 75,70 T 95,90"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeDasharray="2 4"
                opacity="0.6"
              />

              {/* Route Lines connecting Resort to all Destinations */}
              {NEARBY_DESTINATIONS.map((dest) => {
                const isActive = activeDestId === dest.id;
                return (
                  <g key={`route-${dest.id}`}>
                    <path
                      d={`M ${RESORT_MAP_X},${RESORT_MAP_Y} Q ${(RESORT_MAP_X + dest.mapX) / 2 + (dest.mapY > RESORT_MAP_Y ? -4 : 4)},${(RESORT_MAP_Y + dest.mapY) / 2} ${dest.mapX},${dest.mapY}`}
                      fill="none"
                      stroke={isActive ? '#1A96AA' : '#9CA3AF'}
                      strokeWidth={isActive ? '2.5' : '1.2'}
                      strokeDasharray={isActive ? 'none' : '3 3'}
                      filter={isActive ? 'url(#glowFilter)' : undefined}
                      opacity={isActive ? 1 : 0.45}
                      className="transition-all duration-300"
                    />

                    {/* Animated Travel Pulse along Active Route */}
                    {isActive && (
                      <circle r="2" fill="#FFFFFF">
                        <animateMotion
                          path={`M ${RESORT_MAP_X},${RESORT_MAP_Y} Q ${(RESORT_MAP_X + dest.mapX) / 2 + (dest.mapY > RESORT_MAP_Y ? -4 : 4)},${(RESORT_MAP_Y + dest.mapY) / 2} ${dest.mapX},${dest.mapY}`}
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* River Kaveri Label */}
            <div className="absolute top-[28%] left-[20%] text-[10px] font-mono tracking-widest text-[#116B7B]/70 uppercase font-bold rotate-12 pointer-events-none">
              ≈ River Kaveri ≈
            </div>

            {/* ========================================================================= */}
            {/* CENTRAL RESORT PIN (HOME BASE 🏡)                                         */}
            {/* ========================================================================= */}
            <div
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${RESORT_MAP_X}%`, top: `${RESORT_MAP_Y}%` }}
              title="Coorg Laya Resort (Origin Base)"
            >
              {/* Radar Pulsing Circle */}
              <div className="absolute -inset-3 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
              
              {/* House Badge Container */}
              <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#132422] text-white border-2 border-emerald-400 shadow-[0_4px_14px_rgba(0,0,0,0.35)] hover:scale-105 transition-transform">
                <span className="text-sm">🏡</span>
                <span className="text-[11px] font-bold tracking-tight text-white whitespace-nowrap">
                  Coorg Laya
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Sub-label */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-black/75 text-[9px] font-mono text-emerald-300 whitespace-nowrap pointer-events-none">
                ORIGIN BASE
              </span>
            </div>

            {/* ========================================================================= */}
            {/* DESTINATION MARKERS & DISTANCE PILLS                                     */}
            {/* ========================================================================= */}
            {NEARBY_DESTINATIONS.map((dest) => {
              const isActive = activeDestId === dest.id;
              const isFilteredOut = selectedCategory !== 'All' && dest.category !== selectedCategory;

              return (
                <div
                  key={dest.id}
                  onClick={() => setActiveDestId(dest.id)}
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                    isFilteredOut ? 'opacity-30 scale-90' : 'opacity-100'
                  }`}
                  style={{ left: `${dest.mapX}%`, top: `${dest.mapY}%` }}
                >
                  {/* Marker Pin */}
                  <div className={`relative flex flex-col items-center group ${isActive ? 'scale-110 z-30' : 'hover:scale-105'}`}>
                    
                    {/* Distance Pill floating above marker */}
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all shadow-sm mb-1 ${
                      isActive
                        ? 'bg-[#1A96AA] text-white border border-[#1A96AA] shadow-[0_2px_8px_rgba(26,150,170,0.4)]'
                        : 'bg-white/95 text-[#233835] border border-[#D5C7B2]'
                    }`}>
                      {dest.dist}
                    </div>

                    {/* Pin Circle */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
                      isActive
                        ? 'bg-[#EF4444] text-white ring-4 ring-red-400/30 shadow-[0_4px_12px_rgba(239,68,68,0.4)]'
                        : 'bg-[#FAF6EF] text-[#132422] border-2 border-[#B8A78F] hover:border-[#1A96AA]'
                    }`}>
                      <MapPin className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#1A96AA]'}`} />
                    </div>

                    {/* Destination Name Label */}
                    <span className={`mt-1 text-[10px] font-bold text-center max-w-[90px] leading-tight px-1 rounded transition-colors ${
                      isActive
                        ? 'bg-[#132422] text-white font-extrabold'
                        : 'text-[#132422] bg-[#FAF6EF]/90 shadow-sm'
                    }`}>
                      {dest.name.split('(')[0].trim()}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Map Legend (Bottom-Left) */}
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/90 border border-[#D5C7B2] backdrop-blur-sm text-[10px] font-mono text-[#4B5563]">
              <div className="flex items-center gap-1">
                <span>🏡</span>
                <span className="font-bold text-[#132422]">Laya Base</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span>Selected Destination</span>
              </div>
            </div>

          </div>

          <p className="text-[11px] font-mono text-[#635546] text-center">
            💡 Click any pin on the map or select a card below to view details and live driving route.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE DESTINATION DETAIL PREVIEW CARD (5 Cols)                          */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDest.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-3xl bg-[#FAF6EF] border-2 border-[#E4D9C8] p-5 sm:p-6 shadow-md space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Destination High-Res Photo Container with Verified Badge */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DFD1] shadow-inner">
                  <img
                    src={activeDest.image}
                    alt={activeDest.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category & Distance Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#132422]/90 text-white border border-white/20 backdrop-blur-md shadow-sm">
                      {activeDest.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                    <div className="flex items-center gap-1.5 bg-[#1A96AA] px-3 py-1 rounded-full shadow-sm">
                      <Car className="w-3.5 h-3.5" />
                      <span>{activeDest.dist} · {activeDest.time}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-amber-300" />
                      <span className="text-[11px] font-mono">{activeDest.bestTime}</span>
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#132422]">
                    {activeDest.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed mt-1.5">
                    {activeDest.description}
                  </p>
                </div>

                {/* Key Highlights */}
                <div>
                  <span className="text-[11px] font-bold text-[#A3733E] uppercase tracking-wider block mb-2">
                    Key Highlights:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeDest.highlights.map((h, hIdx) => (
                      <span
                        key={hIdx}
                        className="text-xs font-semibold text-[#162926] bg-[#EFE8DC] px-2.5 py-1 rounded-xl border border-[#DFD3C0]"
                      >
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Button: Open in Google Maps */}
              <div className="pt-4 border-t border-[#E4D9C8] flex items-center gap-3">
                <a
                  href={activeDest.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-2xl bg-[#1A96AA] hover:bg-[#126877] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-[0_4px_14px_rgba(26,150,170,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* QUICK SELECTOR CARDS GRID                                                */}
      {/* ========================================================================= */}
      <div className="pt-2 border-t border-[#E4D9C8]">
        <div className="flex items-center justify-between pb-3">
          <span className="text-xs font-bold text-[#635546] uppercase tracking-wider">
            All 7 Regional Destinations ({filteredDestinations.length})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredDestinations.map((dest) => {
            const isSelected = activeDestId === dest.id;
            return (
              <div
                key={dest.id}
                onClick={() => setActiveDestId(dest.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#132422] text-white border-[#132422] shadow-md scale-[1.02]'
                    : 'bg-[#FAF6EF] text-[#233835] border-[#E4D9C8] hover:bg-[#F3EDE2]'
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#E8DFD1]">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className={`font-serif text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-[#132422]'}`}>
                    {dest.name.split('(')[0].trim()}
                  </h5>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-bold ${isSelected ? 'text-[#38BDF8]' : 'text-[#116B7B]'}`}>
                      {dest.dist}
                    </span>
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className={`text-[10px] truncate ${isSelected ? 'text-white/70' : 'text-[#635546]'}`}>
                      {dest.time}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default NearbyInteractiveMap;
