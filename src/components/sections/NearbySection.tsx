import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CinematicReveal } from '../common/CinematicReveal';
import { NearbyInteractiveMap } from '../interactive/NearbyInteractiveMap';
import { SvgRiverPathScroll } from '../interactive/SvgRiverPathScroll';

export const NearbySection: React.FC = () => {
  return (
    <section id="nearby" className="relative w-full py-12 sm:py-16 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Title Header */}
        <CinematicReveal className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-3.5 py-1 text-xs font-bold text-[#A3733E] shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#A3733E]" />
            <span className="tracking-wide">KUSHALNAGAR STRATEGIC BASE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#132422] font-display leading-tight heading-balance">
            Explore Kodagu Attractions
          </h2>

          <p className="text-sm sm:text-base text-[#2C413E] font-normal leading-relaxed prose-pretty max-w-xl mx-auto">
            Coorg Laya puts you minutes away from the Kaveri river bridge, Tibetan monastery, elephant habitats, and waterfalls.
          </p>
        </CinematicReveal>

        {/* Actionable Kaveri River Itinerary Circuit */}
        <CinematicReveal delay={0.1} duration={0.6}>
          <SvgRiverPathScroll />
        </CinematicReveal>

        {/* Local 2D Emoji Regional Map */}
        <CinematicReveal delay={0.15} duration={0.6}>
          <NearbyInteractiveMap />
        </CinematicReveal>

        <div className="text-center pt-2">
          <Link
            to="/nearby"
            className="px-7 py-3.5 rounded-full text-xs font-bold tracking-wide uppercase text-white bg-[#137586] hover:bg-[#0F5E6C] shadow-md inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>View Full Sightseeing Itinerary & Driving Directions</span>
            <ArrowRight className="w-4 h-4 text-[#FAF7F2]" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default NearbySection;
