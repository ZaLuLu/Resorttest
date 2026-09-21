import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BedDouble, ArrowUpRight, Sparkles, Layers, LayoutGrid } from 'lucide-react';
import { SuiteInspectionCard3D, SuiteSpecData } from '../3d/SuiteInspectionCard3D';
import { CardStackScroll } from '../3d/CardStackScroll';
import { CinematicReveal } from '../common/CinematicReveal';

interface RoomsSectionProps {
  onOpenEnquiry: () => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onOpenEnquiry }) => {
  const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack');
  const [isMobile, setIsMobile] = useState(false);
  const [activeSuiteIdx, setActiveSuiteIdx] = useState<number>(0);
  const mobileTrackRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSuite = (idx: number) => {
    setActiveSuiteIdx(idx);
    if (mobileTrackRef.current) {
      const cardWidth = mobileTrackRef.current.offsetWidth * 0.84;
      mobileTrackRef.current.scrollTo({
        left: idx * (cardWidth + 16),
        behavior: 'smooth',
      });
    }
  };

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
      image: '/images/rooms/verandah-suite.jpeg',
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
    <section id="rooms" className="relative w-full py-12 sm:py-16 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E4D9C8] pb-8">
          <CinematicReveal className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#A3733E] shadow-sm">
              <BedDouble className="w-4 h-4 text-[#A3733E]" />
              <span>Living Quarters & Suites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#131E1C] font-display leading-tight heading-balance">
              15 private suites crafted for peaceful mountain nights.
            </h2>
            <p className="text-sm sm:text-base text-[#314240] font-normal leading-relaxed prose-pretty">
              Accommodating up to approximately 45 overnight guests across restful garden-facing suites.
            </p>
          </CinematicReveal>

          {/* Desktop View Switcher & Action Button */}
          <CinematicReveal delay={0.15} direction="left" className="flex flex-wrap items-center gap-3">
            {!isMobile && (
              <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm relative">
                <button
                  onClick={() => setViewMode('stack')}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer z-10 ${
                    viewMode === 'stack' ? 'text-white' : 'text-[#314240] hover:text-[#137586]'
                  }`}
                >
                  {viewMode === 'stack' && (
                    <motion.div
                      layoutId="activeRoomView"
                      className="absolute inset-0 rounded-full bg-[#137586] -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Layers className="w-3.5 h-3.5" />
                  <span className="tracking-wide">Card Stack</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer z-10 ${
                    viewMode === 'grid' ? 'text-white' : 'text-[#314240] hover:text-[#137586]'
                  }`}
                >
                  {viewMode === 'grid' && (
                    <motion.div
                      layoutId="activeRoomView"
                      className="absolute inset-0 rounded-full bg-[#137586] -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="tracking-wide">Grid</span>
                </button>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenEnquiry}
              className="px-6 py-3 rounded-full bg-[#137586] hover:bg-[#105B69] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Reserve All 15 Suites</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </CinematicReveal>
        </div>

        {/* MOBILE VIEW: Mobile Suite Snap Slider with Tabs */}
        {isMobile ? (
          <div className="space-y-4">
            {/* Quick Suite Selector Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {suites.map((suite, idx) => (
                <button
                  key={suite.id}
                  onClick={() => scrollToSuite(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                    activeSuiteIdx === idx
                      ? 'bg-[#137586] text-white shadow-sm'
                      : 'bg-[#FAF6EF] text-[#344E4A] border border-[#E4D9C8]'
                  }`}
                >
                  <span className="font-mono text-[10px] mr-1 opacity-70">0{idx + 1}</span>
                  <span>{suite.name.replace(' Suite', '')}</span>
                </button>
              ))}
            </div>

            {/* Mobile Horizontal Snap Track */}
            <div
              ref={mobileTrackRef}
              className="snap-touch-track no-scrollbar gap-4 px-1 py-1"
              onScroll={(e) => {
                const target = e.currentTarget;
                const scrollLeft = target.scrollLeft;
                const itemWidth = target.offsetWidth * 0.84;
                const index = Math.round(scrollLeft / (itemWidth + 16));
                if (index !== activeSuiteIdx && index >= 0 && index < suites.length) {
                  setActiveSuiteIdx(index);
                }
              }}
            >
              {suites.map((suite) => (
                <div
                  key={suite.id}
                  className="snap-touch-item w-[84vw] max-w-[340px] rounded-3xl overflow-hidden bg-[#FAF6EF] border border-[#E4D9C8] shadow-md flex flex-col justify-between"
                >
                  <div>
                    {/* Image with Price Badge */}
                    <div className="relative aspect-[4/3] bg-[#E8DFD1] overflow-hidden">
                      <img
                        src={suite.image}
                        alt={suite.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider">
                        {suite.category}
                      </div>
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#137586] text-white text-xs font-bold shadow-md">
                        {suite.startingRate} <span className="text-[10px] font-normal opacity-90">/ night</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#131E1C] leading-snug">
                          {suite.name}
                        </h3>
                        <p className="text-xs text-[#586E6B] font-medium pt-0.5">
                          {suite.sqft} · {suite.capacity} · {suite.bedType}
                        </p>
                      </div>

                      <p className="text-xs text-[#314240] leading-relaxed line-clamp-2">
                        {suite.description}
                      </p>

                      <div className="space-y-1.5 pt-1 border-t border-[#E4D9C8]">
                        {suite.highlights.slice(0, 2).map((hl, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-[#132422]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#137586]" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={onOpenEnquiry}
                      className="w-full py-2.5 rounded-full bg-[#137586] hover:bg-[#105B69] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                    >
                      <span>Reserve This Suite</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {suites.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => scrollToSuite(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSuiteIdx === dotIdx ? 'w-6 bg-[#137586]' : 'w-1.5 bg-[#D5C7B2]'
                  }`}
                  aria-label={`Go to suite ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : viewMode === 'stack' ? (
          /* DESKTOP VIEW: Card Stack Scroll (skiper16/skiper17) */
          <CardStackScroll suites={suites} onBookNow={() => onOpenEnquiry()} />
        ) : (
          /* DESKTOP VIEW: 4-Column Flip Inspection Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suites.map((suite, idx) => (
              <CinematicReveal key={suite.id} delay={idx * 0.08} duration={0.6}>
                <SuiteInspectionCard3D
                  suite={suite}
                  onBookNow={() => onOpenEnquiry()}
                />
              </CinematicReveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default RoomsSection;
