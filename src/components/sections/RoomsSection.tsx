import React from 'react';
import { BedDouble, ArrowUpRight } from 'lucide-react';
import { SuiteInspectionCard3D, SuiteSpecData } from '../3d/SuiteInspectionCard3D';
import { CinematicReveal } from '../common/CinematicReveal';

interface RoomsSectionProps {
  onOpenEnquiry: () => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onOpenEnquiry }) => {
  const suites: SuiteSpecData[] = [
    {
      id: 'rooms-01',
      image: '/images/rooms/room-interior-neutral.jpeg',
      name: 'Calm Olive Suite',
      category: 'Olive Garden Suite',
      sqft: '380 sq.ft',
      capacity: 'Up to 3 Guests',
      bedType: 'King Plush + Daybed',
      view: 'Lush Garden Vista',
      highlights: [
        'Garden-facing double windows',
        'Handcrafted vanity dressing nook',
        'Private en-suite hot rainshower',
        'Complimentary estate breakfast',
      ],
      startingRate: '₹4,500',
      description: 'Comfortable minimalist quarters with garden-facing windows, vanity dressing mirror, and private en-suite bathroom.',
    },
    {
      id: 'rooms-02',
      image: '/images/rooms/room-interior-green.jpeg',
      name: 'Emerald Botanical Suite',
      category: 'Nature Accent Suite',
      sqft: '420 sq.ft',
      capacity: 'Up to 3 Guests',
      bedType: 'Custom King Timber Bed',
      view: 'Coffee Plantation View',
      highlights: [
        'Botanical accent wall & timber ceiling',
        'Private walkout balcony corridor',
        'Organic forest bath amenities',
        'Highland cross-breeze ventilation',
      ],
      startingRate: '₹5,200',
      description: 'Nature-inspired botanical feature wall, warm timber roof detailing, and relaxed highland comfort for deep rest.',
    },
    {
      id: 'rooms-03',
      image: '/images/rooms/room-interior-beds.jpeg',
      name: 'Family Twin Haven',
      category: 'Multi-Bed Family Suite',
      sqft: '480 sq.ft',
      capacity: 'Up to 4 Guests',
      bedType: 'Twin Queen Beds',
      view: 'Open Lawn & Pool Vista',
      highlights: [
        'Dual plush beds for family comfort',
        'Direct ground-level lawn access',
        'Spacious wardrobe & luggage bay',
        'Ideal for groups & family reunions',
      ],
      startingRate: '₹6,000',
      description: 'Spacious interconnecting beds and floor plan tailored for family holidays, group retreats, and celebrations.',
    },
    {
      id: 'rooms-04',
      image: '/images/rooms/room-interior-seating.jpeg',
      name: 'Verandah Lounge Suite',
      category: 'Executive Verandah',
      sqft: '450 sq.ft',
      capacity: 'Up to 3 Guests',
      bedType: 'King Bed + Lounge Sofas',
      view: 'Shaded Palm Walkway',
      highlights: [
        'Integrated sitting lounge salon',
        'Direct step-out to shaded palm paths',
        'Teak wood workstations & seating',
        'Soundproof acoustic mountain comfort',
      ],
      startingRate: '₹5,600',
      description: 'Adjoining sitting nook with comfortable couches and direct step-out access to shaded palm walkways.',
    },
  ];

  return (
    <section id="rooms" className="relative w-full py-20 sm:py-28 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <CinematicReveal className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
              <BedDouble className="w-4 h-4 text-[#A3733E]" />
              <span>Living Quarters & Suites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#132422] font-serif leading-tight">
              15 private suites crafted for peaceful mountain nights.
            </h2>
            <p className="text-sm sm:text-base text-[#344E4A] font-medium leading-relaxed">
              Accommodating up to approximately 45 overnight guests across restful garden-facing suites. Click <strong>Specs</strong> to flip and inspect floor layouts.
            </p>
          </CinematicReveal>

          <CinematicReveal delay={0.2}>
            <button
              onClick={onOpenEnquiry}
              className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1A96AA] to-[#116B7B] hover:from-[#158092] hover:to-[#0D5764] shadow-[0_8px_20px_rgba(26,150,170,0.35)] transition-all flex items-center gap-2"
            >
              <span>Reserve All 15 Suites</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </CinematicReveal>
        </div>

        {/* 3D Interactive Suite Cards Grid with 180° Flip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suites.map((suite, idx) => (
            <CinematicReveal key={suite.id} delay={idx * 0.12} duration={0.7}>
              <SuiteInspectionCard3D
                suite={suite}
                onBookNow={() => onOpenEnquiry()}
              />
            </CinematicReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
export default RoomsSection;
