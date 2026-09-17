import React from 'react';
import { Feather } from 'lucide-react';
import { VinylBirdsongPlayer } from '../3d/VinylBirdsongPlayer';
import { CinematicReveal } from '../common/CinematicReveal';

export const BirdsongNatureSection: React.FC = () => {
  return (
    <section id="birdsong" className="relative w-full py-20 sm:py-28 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <CinematicReveal className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-4 py-1.5 text-xs font-bold text-[#116B7B] shadow-sm">
            <Feather className="w-4 h-4 text-[#1A96AA]" />
            <span>Acoustic Nature Experience</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#132422] font-serif leading-tight">
            Wake Up to Living Birdsong
          </h2>

          <p className="text-sm sm:text-base text-[#344E4A] leading-relaxed">
            Sheltered by bamboo thickets and silver oaks, indigenous bird species awaken the resort at first dawn. Experience our interactive 33⅓ RPM natural soundscape player below.
          </p>
        </CinematicReveal>

        {/* 3D Vinyl Player Turntable */}
        <CinematicReveal delay={0.2} duration={0.8}>
          <VinylBirdsongPlayer />
        </CinematicReveal>

      </div>
    </section>
  );
};
export default BirdsongNatureSection;
