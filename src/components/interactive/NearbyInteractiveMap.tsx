import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, Clock, ExternalLink, 
  Navigation, Car, Mountain, Lightbulb
} from 'lucide-react';
import { 
  NEARBY_DESTINATIONS_DATA, 
  CATEGORIES_LIST,
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
    <div className="w-full rounded-3xl sm:rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 sm:p-7 shadow-sm space-y-6 select-none">
      
      {/* Category Filter Pills (Minimal & Clean) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4D9C8] pb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-[#635546] uppercase mr-1">
            Category:
          </span>
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
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

        <span className="text-xs font-semibold text-[#116B7B]">
          💡 Click any 2D emoji on map to inspect
        </span>
      </div>

      {/* Main Grid: Local Map (7 Cols) + Active Detail Card (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* MAP COLUMN */}
        <div className="lg:col-span-7">
          <OfflineRegionalMap
            activeDestId={activeDestId}
            onSelectDest={setActiveDestId}
            filteredDestinations={filteredDestinations}
          />
        </div>

        {/* ACTIVE DESTINATION SHOWCASE CARD */}
        <div className="lg:col-span-5 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDest.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 shadow-sm space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                  <img
                    src={activeDest.image}
                    alt={activeDest.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Category & Emoji Pill */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#132422]/90 text-white backdrop-blur-md shadow-sm">
                      {activeDest.emoji} {activeDest.category}
                    </span>
                  </div>

                  {/* Distance & Time Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs font-bold">
                    <div className="flex items-center gap-1.5 bg-[#A3733E] px-2.5 py-1 rounded-full shadow-sm">
                      <Car className="w-3.5 h-3.5" />
                      <span>{activeDest.dist} · {activeDest.time}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-amber-300" />
                      <span className="text-[11px]">{activeDest.recommendedDuration}</span>
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#132422] flex items-center gap-1.5">
                    <span>{activeDest.emoji}</span>
                    <span>{activeDest.name}</span>
                  </h4>
                  <p className="text-xs text-[#344E4A] leading-relaxed mt-1">
                    {activeDest.description}
                  </p>
                </div>

                {/* Insider Concierge Tip Box */}
                <div className="rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] p-2.5 text-xs text-[#132422] space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#A3733E] text-[11px]">
                    <Lightbulb className="w-3 h-3" />
                    <span>Resort Concierge Tip:</span>
                  </div>
                  <p className="text-[11px] text-[#344E4A] leading-relaxed">
                    {activeDest.insiderTip}
                  </p>
                </div>

                {/* Timings & Entry info */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#E4D9C8]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#635546] block">Best Hours</span>
                    <span className="font-semibold text-[#132422] text-xs">{activeDest.bestTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#635546] block">Entry Fee</span>
                    <span className="font-semibold text-[#132422] text-xs">{activeDest.entryFee}</span>
                  </div>
                </div>

              </div>

              {/* Single Clean Action: Open in Google Maps */}
              <div className="pt-2 border-t border-[#E4D9C8]">
                <a
                  href={activeDest.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#132422] hover:bg-[#1E3633] text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Open Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Quick 2D Emoji Selector Grid */}
      <div className="pt-2 border-t border-[#E4D9C8]">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {filteredDestinations.map((dest) => {
            const isSelected = activeDestId === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => setActiveDestId(dest.id)}
                className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-[#132422] text-white border-[#132422] shadow-sm'
                    : 'bg-[#FAF6EF] text-[#233835] border-[#E4D9C8] hover:bg-[#EFE8DC]'
                }`}
              >
                <span className="text-xl leading-none mb-1">{dest.emoji}</span>
                <span className={`text-[11px] font-bold truncate max-w-full ${isSelected ? 'text-white' : 'text-[#132422]'}`}>
                  {dest.shortName}
                </span>
                <span className={`text-[9px] font-mono mt-0.5 ${isSelected ? 'text-[#D4AF37]' : 'text-[#A3733E]'}`}>
                  {dest.dist}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default NearbyInteractiveMap;
