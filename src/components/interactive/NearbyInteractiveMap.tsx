import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, MapPin, Clock, ExternalLink, 
  Navigation, Car, Mountain, Lightbulb
} from 'lucide-react';
import { 
  DestinationItem, 
  NEARBY_DESTINATIONS_DATA, 
  CATEGORIES_LIST,
  RESORT_COORDINATES 
} from '../../data/nearbyDestinationsData';
import { OfflineRegionalMap } from './OfflineRegionalMap';

export const NearbyInteractiveMap: React.FC = () => {
  const [activeDestId, setActiveDestId] = useState<string>('nisargadhama');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredDestinations = selectedCategory === 'All'
    ? NEARBY_DESTINATIONS_DATA
    : NEARBY_DESTINATIONS_DATA.filter(d => d.category === selectedCategory);

  const activeDest = NEARBY_DESTINATIONS_DATA.find(d => d.id === activeDestId) || NEARBY_DESTINATIONS_DATA[0];

  return (
    <div className="w-full rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 sm:p-8 md:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.08)] space-y-8 select-none">
      
      {/* ========================================================================= */}
      {/* TOP HEADER & CATEGORY FILTER BAR                                         */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-[#E4D9C8] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EFE8DC] text-[#132422] border border-[#D5C7B2] px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#A3733E]" />
            <span>Kushalnagar Strategic Hub · Verified Road Distances</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#132422]">
            Kodagu Attractions Around Coorg Laya
          </h3>
          <p className="text-xs sm:text-sm text-[#344E4A] font-medium">
            Discover verified travel distances and driving durations from our central Kushalnagar sanctuary.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] text-xs font-bold text-[#132422]">
            <Navigation className="w-4 h-4 text-[#A3733E]" />
            <span>Regional Travel Guide</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-[#635546] uppercase tracking-wider mr-1">
          Filter By:
        </span>
        {CATEGORIES_LIST.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#132422] text-white shadow-sm'
                  : 'bg-[#EFE8DC] text-[#344E4A] hover:bg-[#E5DBCB] border border-[#DFD3C0]/60'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MAIN GRID: OFFLINE MAP (7 Cols) + ACTIVE DETAIL CARD (5 Cols)             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* MAP COLUMN */}
        <div className="lg:col-span-7 space-y-3">
          <OfflineRegionalMap
            activeDestId={activeDestId}
            onSelectDest={setActiveDestId}
            filteredDestinations={filteredDestinations}
          />

          <div className="flex items-center justify-between text-[11px] text-[#635546] px-1 font-medium">
            <span>💡 Select any pin on the map or click a destination card below.</span>
            <span className="hidden sm:inline-block font-bold text-[#A3733E]">
              📍 Regional Cartographic Guide
            </span>
          </div>
        </div>

        {/* ACTIVE DESTINATION SHOWCASE CARD (5 Cols) */}
        <div className="lg:col-span-5 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDest.id}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 sm:p-6 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DFD1] shadow-inner">
                  <img
                    src={activeDest.image}
                    alt={activeDest.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Category & Altitude Pill */}
                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#132422]/90 text-white border border-white/20 backdrop-blur-md shadow-sm">
                      {activeDest.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 text-[#D4AF37] border border-white/20 backdrop-blur-md shadow-sm flex items-center gap-1">
                      <Mountain className="w-3 h-3" />
                      <span>{activeDest.elevation}</span>
                    </span>
                  </div>

                  {/* Distance & Time Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                    <div className="flex items-center gap-1.5 bg-[#A3733E] px-3 py-1 rounded-full shadow-sm">
                      <Car className="w-3.5 h-3.5" />
                      <span>{activeDest.dist} · {activeDest.time}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      <Clock className="w-3 h-3 text-amber-300" />
                      <span className="text-[11px] font-mono">{activeDest.recommendedDuration}</span>
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

                {/* Insider Concierge Tip Box */}
                <div className="rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] p-3 text-xs text-[#132422] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#A3733E]">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Resort Concierge Tip:</span>
                  </div>
                  <p className="text-[11px] text-[#344E4A] leading-relaxed">
                    {activeDest.insiderTip}
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

                {/* Timings & Entry info */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#E4D9C8]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#635546] block">Best Hours</span>
                    <span className="font-semibold text-[#132422]">{activeDest.bestTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#635546] block">Entry Guidelines</span>
                    <span className="font-semibold text-[#132422]">{activeDest.entryFee}</span>
                  </div>
                </div>

              </div>

              {/* Single Clean Action: Open in Google Maps */}
              <div className="pt-4 border-t border-[#E4D9C8]">
                <a
                  href={activeDest.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#132422] hover:bg-[#1E3633] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#D4AF37]" />
                  <span>Open in Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* QUICK SELECTOR DESTINATION CARDS GRID                                     */}
      {/* ========================================================================= */}
      <div className="pt-2 border-t border-[#E4D9C8]">
        <div className="flex items-center justify-between pb-3">
          <span className="text-xs font-bold text-[#635546] uppercase tracking-wider">
            All Regional Destinations ({filteredDestinations.length})
          </span>
          <span className="text-xs text-[#A3733E] font-medium">
            Click any card to select destination
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {filteredDestinations.map((dest) => {
            const isSelected = activeDestId === dest.id;
            return (
              <div
                key={dest.id}
                onClick={() => setActiveDestId(dest.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-[#132422] text-white border-[#132422] shadow-sm scale-[1.02]'
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
                    {dest.shortName}
                  </h5>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[10px] font-bold ${isSelected ? 'text-[#D4AF37]' : 'text-[#A3733E]'}`}>
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
