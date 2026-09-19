import React, { useState } from 'react';
import { DestinationItem, RESORT_COORDINATES } from '../../data/nearbyDestinationsData';
import { Compass, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

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
        {/* Local Map Tile Image */}
        <img
          src="/images/nearby/kodagu-regional-map.jpg"
          alt="Kodagu Coorg Local Map"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Central Resort Pin: Coorg Laya Origin Base */}
        <div
          className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110"
          style={{ left: `${RESORT_COORDINATES.mapX}%`, top: `${RESORT_COORDINATES.mapY}%` }}
          title="Coorg Laya Resort (Kushalnagar Base)"
        >
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#132422] text-white border-2 border-[#D4AF37] shadow-lg">
            <span className="text-sm">🏡</span>
            <span className="text-[11px] font-extrabold text-white tracking-tight whitespace-nowrap">
              Coorg Laya
            </span>
          </div>
        </div>

        {/* Destination Pins with 2D Emojis */}
        {filteredDestinations.map((dest) => {
          const isSelected = activeDestId === dest.id;

          return (
            <div
              key={dest.id}
              onClick={() => onSelectDest(dest.id)}
              className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                isSelected ? 'scale-110 z-40' : 'hover:scale-105 opacity-90 hover:opacity-100'
              }`}
              style={{ left: `${dest.mapX}%`, top: `${dest.mapY}%` }}
            >
              <div className="flex flex-col items-center group">
                
                {/* 2D Emoji Pill Marker */}
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border shadow-md transition-all ${
                  isSelected
                    ? 'bg-[#132422] text-white border-[#D4AF37] ring-2 ring-[#1A96AA]/40 scale-105'
                    : 'bg-white/95 text-[#132422] border-[#D5C7B2] hover:border-[#132422]'
                }`}>
                  <span className="text-sm leading-none">{dest.emoji}</span>
                  <span className="text-[10px] font-bold whitespace-nowrap">{dest.shortName}</span>
                </div>

                {/* Distance Sub-badge */}
                <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded mt-0.5 shadow-sm border ${
                  isSelected
                    ? 'bg-[#A3733E] text-white border-[#8B5E2B]'
                    : 'bg-[#FAF6EF]/90 text-[#344E4A] border-[#D5C7B2]'
                }`}>
                  {dest.dist}
                </span>

              </div>
            </div>
          );
        })}

      </div>

      {/* Map Header Info (Top-Left) */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-sm border border-[#D5C7B2] text-[11px] font-bold text-[#132422] shadow-sm">
        <Compass className="w-3.5 h-3.5 text-[#A3733E]" />
        <span>Kodagu Local Map</span>
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

    </div>
  );
};

export default OfflineRegionalMap;
