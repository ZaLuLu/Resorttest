import React, { useState } from 'react';
import { DestinationItem, RESORT_COORDINATES } from '../../data/nearbyDestinationsData';
import { MapPin, Compass, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface OfflineRegionalMapProps {
  activeDestId: string;
  onSelectDest: (id: string) => void;
  filteredDestinations: DestinationItem[];
}

export const OfflineRegionalMap: React.FC<OfflineRegionalMapProps> = ({
  activeDestId,
  onSelectDest,
  filteredDestinations,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 1.75));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-[#D5C7B2] bg-[#F7F2EB] shadow-sm select-none">
      
      {/* Zoomable Map Container */}
      <div 
        className="relative w-full h-full transition-transform duration-300 ease-out origin-center"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* High-Resolution Offline Regional Cartographic Map Image */}
        <img
          src="/images/nearby/kodagu-regional-map.jpg"
          alt="Kodagu Coorg Regional Map"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Subtle Vignette & Framing Border */}
        <div className="absolute inset-0 border border-black/5 pointer-events-none" />

        {/* ========================================================================= */}
        {/* CENTRAL RESORT PIN (COORG LAYA ORIGIN BASE)                              */}
        {/* ========================================================================= */}
        <div
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-105"
          style={{ left: `${RESORT_COORDINATES.mapX}%`, top: `${RESORT_COORDINATES.mapY}%` }}
          title="Coorg Laya Resort (Kushalnagar Central Base)"
        >
          {/* Refined Minimalist Resort Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#132422] text-white border border-[#A3733E] shadow-md">
            <span className="text-xs">🏡</span>
            <span className="text-[11px] font-bold text-white tracking-tight whitespace-nowrap">
              Coorg Laya
            </span>
          </div>
          <div className="text-[8px] font-bold uppercase tracking-wider text-[#132422] bg-[#FAF6EF] px-1.5 py-0.5 rounded shadow-sm border border-[#D5C7B2] text-center mt-0.5 whitespace-nowrap mx-auto w-max">
            Resort Base
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESTINATION PINS (CLEAN EDITORIAL LUXURY MARKERS)                       */}
        {/* ========================================================================= */}
        {filteredDestinations.map((dest) => {
          const isSelected = activeDestId === dest.id;

          return (
            <div
              key={dest.id}
              onClick={() => onSelectDest(dest.id)}
              className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                isSelected ? 'scale-110 z-40' : 'hover:scale-105 opacity-95 hover:opacity-100'
              }`}
              style={{ left: `${dest.mapX}%`, top: `${dest.mapY}%` }}
            >
              <div className="flex flex-col items-center">
                
                {/* Distance Badge */}
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap mb-1 transition-all border shadow-sm ${
                  isSelected
                    ? 'bg-[#A3733E] text-white border-[#8B5E2B]'
                    : 'bg-[#FAF6EF] text-[#233835] border-[#D5C7B2]'
                }`}>
                  {dest.dist}
                </span>

                {/* Minimalist Solid Pin Dot */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-sm border-2 ${
                  isSelected
                    ? 'bg-[#132422] text-white border-[#A3733E]'
                    : 'bg-[#FAF6EF] text-[#132422] border-[#786C5E] hover:border-[#132422]'
                }`}>
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4AF37]' : 'text-[#132422]'}`} />
                </div>

                {/* Name Label */}
                <span className={`mt-0.5 text-[9px] font-bold text-center max-w-[85px] leading-tight px-1.5 py-0.5 rounded border shadow-sm transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#132422] text-white border-[#132422]'
                    : 'bg-[#FAF6EF]/95 text-[#132422] border-[#D5C7B2]'
                }`}>
                  {dest.shortName}
                </span>

              </div>
            </div>
          );
        })}

      </div>

      {/* Map Header Info (Top-Left) */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#D5C7B2] text-[11px] font-semibold text-[#132422] shadow-sm">
        <Compass className="w-3.5 h-3.5 text-[#A3733E]" />
        <span>Kodagu Regional Map</span>
      </div>

      {/* Clean Zoom Controls (Top-Right) */}
      <div className="absolute top-3 right-3 z-10 flex items-center bg-white/95 backdrop-blur-sm rounded-xl p-1 shadow-sm border border-[#D5C7B2] gap-1">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded-lg text-[#132422] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded-lg text-[#132422] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        {zoomLevel !== 1 && (
          <button
            onClick={handleResetZoom}
            className="p-1.5 rounded-lg text-[#132422] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Subtle Legend (Bottom-Left) */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-sm border border-[#D5C7B2] text-[10px] font-medium text-[#4B5563] shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#132422]" />
          <span className="font-bold text-[#132422]">Coorg Laya</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#A3733E]" />
          <span>Selected Attraction</span>
        </div>
      </div>

    </div>
  );
};

export default OfflineRegionalMap;
