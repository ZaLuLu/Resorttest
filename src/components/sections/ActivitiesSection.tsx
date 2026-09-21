import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, Clock, CheckCircle2, Zap, ArrowUpRight } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';
import { CinematicReveal } from '../common/CinematicReveal';

interface ActivitiesSectionProps {
  onOpenEnquiry?: () => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ onOpenEnquiry }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const mobileActivitiesTrackRef = React.useRef<HTMLDivElement>(null);

  const scrollToActivity = (idx: number) => {
    setActiveIdx(idx);
    if (mobileActivitiesTrackRef.current) {
      const cardWidth = mobileActivitiesTrackRef.current.offsetWidth * 0.84;
      mobileActivitiesTrackRef.current.scrollTo({
        left: idx * (cardWidth + 16),
        behavior: 'smooth',
      });
    }
  };

  const activities = [
    {
      id: 'act-01',
      index: '01',
      image: '/images/amenities/swimming-pool.jpeg',
      badge: 'Water Recreation',
      title: 'Palm Pool & Shallow Lounging',
      timeSlot: '11:00 AM – 03:00 PM',
      energy: 'Relaxed Floating',
      energyLevel: 45,
      description: 'Take refreshing leisure laps or unwind in the shallow circular lounge framed by towering coconut palms, timber loungers, and pure mountain air.',
      highlights: ['Shallow relaxation area', 'Tropical palm canopy', 'Poolside loungers'],
      variant: 'water' as const,
    },
    {
      id: 'act-02',
      index: '02',
      image: '/images/amenities/kids-play-trampoline.png',
      badge: 'Family & Kids',
      title: 'Kids Trampoline & Soft Lawns',
      timeSlot: '03:30 PM – 05:00 PM',
      energy: 'High Energy Fun',
      energyLevel: 90,
      description: 'Enclosed jumping trampoline with full-perimeter mesh netting and open manicured lawn running space for children to play safely under the sun.',
      highlights: ['Enclosed safety netting', 'Soft manicured grass', 'Supervised play zone'],
      variant: 'sand' as const,
    },
    {
      id: 'act-03',
      index: '03',
      image: '/images/amenities/badminton-court.png',
      badge: 'Active Sports',
      title: 'Bamboo Lawn Badminton',
      timeSlot: '05:00 PM – 06:30 PM',
      energy: 'Friendly Matches',
      energyLevel: 75,
      description: 'Lively friendly rallies on grass courts sheltered naturally by towering green bamboo canopies during the golden sunset hour.',
      highlights: ['Natural bamboo shelter', 'Tournament racquets provided', 'Sunset grass court'],
      variant: 'water' as const,
    },
    {
      id: 'act-04',
      index: '04',
      image: '/images/resort/covered-seating.jpeg',
      badge: 'Evening Chill',
      title: 'Verandah Lounge & Stargazing',
      timeSlot: '07:30 PM – 10:00 PM',
      energy: 'Starlit Stillness',
      energyLevel: 25,
      description: 'Savor freshly brewed hot Coorg estate coffee on the covered verandah and gaze at the unpolluted night skies before sanctuary quiet hours.',
      highlights: ['Fresh estate coffee', 'Unpolluted night sky', 'Quiet sanctuary hours'],
      variant: 'sand' as const,
    },
  ];

  return (
    <section id="activities" className="relative w-full py-12 sm:py-16 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E4D9C8] pb-8">
          <CinematicReveal className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#A3733E] shadow-sm">
              <Compass className="w-4 h-4 text-[#A3733E]" />
              <span>Sanctuary Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#131E1C] font-display leading-tight heading-balance">
              Curated Kodagu activities for everyone.
            </h2>
            <p className="text-sm text-[#314240] font-normal leading-relaxed prose-pretty">
              Hover or click any panel to expand its details, energy level, and daily timing.
            </p>
          </CinematicReveal>

          <CinematicReveal delay={0.15} direction="left">
            <span className="text-xs font-semibold text-[#137586] px-4 py-2 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm inline-flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#137586]" />
              <span>4 Interactive Experience Panels</span>
            </span>
          </CinematicReveal>
        </div>

        {/* 3D Interactive Expanding Bento Accordion Stage (Desktop) */}
        <div className="hidden lg:flex gap-4 min-h-[550px] w-full items-stretch">
          {activities.map((act, idx) => {
            const isExpanded = activeIdx === idx;
            return (
              <motion.div
                key={act.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                animate={{
                  flex: isExpanded ? 3.6 : 1,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative rounded-3xl overflow-hidden border cursor-pointer transition-all duration-300 flex flex-col ${
                  isExpanded
                    ? 'bg-[#FAF6EF] border-[#1A96AA] shadow-[0_22px_50px_rgba(26,150,170,0.2),_inset_0_2px_4px_rgba(255,255,255,0.9)]'
                    : 'bg-[#EFE8DC] border-[#DFD3C0] hover:border-[#A3733E]/50 shadow-sm'
                }`}
              >
                {isExpanded ? (
                  /* Expanded Active Panel Content */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 h-full flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-4">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-[#132422] text-[#FAF6EF] text-xs font-bold font-mono flex items-center justify-center shadow-sm">
                            {act.index}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-[#E5F3F5] text-[#116B7B] text-xs font-bold border border-[#BCE2E7]">
                            {act.badge}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#635546] bg-white/80 px-3 py-1 rounded-full border border-[#E4D9C8]">
                          <Clock className="w-3.5 h-3.5 text-[#1A96AA]" />
                          <span>{act.timeSlot}</span>
                        </div>
                      </div>

                      {/* Photo Banner with Clay Frame */}
                      <div className="relative h-[250px] rounded-2xl overflow-hidden bg-[#E8DFD1] shadow-sm group/img">
                        <ClayImage
                          src={act.image}
                          alt={act.title}
                          aspectRatio="16:10"
                          clayVariant="water"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-106"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#131E1C]/85 via-[#131E1C]/20 to-transparent pointer-events-none" />
                        <div className="absolute bottom-3.5 left-4 right-4 z-10 text-white">
                          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight heading-balance text-white">
                            {act.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description & Inclusions */}
                      <p className="text-xs sm:text-sm text-[#314240] leading-relaxed font-normal prose-pretty">
                        {act.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {act.highlights.map((hl, hIdx) => (
                          <span
                            key={hIdx}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#131E1C] bg-[#EFE8DC] px-2.5 py-1 rounded-full border border-[#DFD3C0]"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#137586]" />
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Row with Animated Energy Meter */}
                    <div className="pt-3 border-t border-[#E4D9C8] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-[#A3733E]" />
                          <span className="text-xs font-semibold text-[#131E1C]">{act.energy}</span>
                        </div>
                        {/* Energy Bar */}
                        <div className="w-20 h-2 rounded-full bg-[#E8DFD1] overflow-hidden hidden sm:block">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${act.energyLevel}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="h-full bg-[#137586] rounded-full"
                          />
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenEnquiry) onOpenEnquiry();
                        }}
                        className="clay-btn-water text-xs font-bold shadow-md cursor-pointer !py-2 !px-4"
                      >
                        <span>Plan Activity</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  /* Collapsed Vertical Typographic Spine */
                  <div className="h-full p-4 flex flex-col justify-between items-center py-8">
                    <span className="w-8 h-8 rounded-full bg-[#FAF6EF] text-[#A3733E] text-xs font-bold font-mono flex items-center justify-center border border-[#DFD3C0] shadow-sm">
                      {act.index}
                    </span>

                    {/* Vertical Title */}
                    <div className="flex-1 flex items-center justify-center my-4">
                      <span
                        className="font-serif text-sm font-bold text-[#132422] tracking-wider uppercase [writing-mode:vertical-rl] rotate-180 line-clamp-1"
                      >
                        {act.title}
                      </span>
                    </div>

                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A96AA] animate-pulse" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* MOBILE VIEW: Smooth Horizontal Snap Deck with Experience Tabs */}
        <div className="flex lg:hidden flex-col gap-4">
          {/* Quick Experience Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {activities.map((act, idx) => (
              <button
                key={act.id}
                onClick={() => scrollToActivity(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                  activeIdx === idx
                    ? 'bg-[#137586] text-white shadow-sm'
                    : 'bg-[#FAF6EF] text-[#344E4A] border border-[#E4D9C8]'
                }`}
              >
                <span className="font-mono text-[10px] mr-1 opacity-70">{act.index}</span>
                <span>{act.badge}</span>
              </button>
            ))}
          </div>

          {/* Mobile Snap Track */}
          <div
            ref={mobileActivitiesTrackRef}
            className="snap-touch-track no-scrollbar gap-4 px-1 py-1"
            onScroll={(e) => {
              const target = e.currentTarget;
              const scrollLeft = target.scrollLeft;
              const itemWidth = target.offsetWidth * 0.84;
              const index = Math.round(scrollLeft / (itemWidth + 16));
              if (index !== activeIdx && index >= 0 && index < activities.length) {
                setActiveIdx(index);
              }
            }}
          >
            {activities.map((act) => (
              <div
                key={act.id}
                className="snap-touch-item w-[84vw] max-w-[340px] rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Header info */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-extrabold text-[#A3733E]/40">
                      № {act.index}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E5F3F5] text-[#116B7B] text-[10px] font-bold border border-[#BCE2E7]">
                      {act.badge}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                    <img
                      src={act.image}
                      alt={act.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-sm text-[10px] font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#A3733E]" />
                      <span>{act.timeSlot}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#131E1C]">
                      {act.title}
                    </h4>
                    <p className="text-xs text-[#344E4A] leading-relaxed mt-1 line-clamp-2">
                      {act.description}
                    </p>
                  </div>

                  {/* Energy Meter */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E4D9C8]">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#131E1C]">
                      <Zap className="w-3.5 h-3.5 text-[#A3733E]" />
                      <span>{act.energy}</span>
                    </div>
                    <div className="w-20 h-1.5 rounded-full bg-[#E8DFD1] overflow-hidden">
                      <div
                        className="h-full bg-[#137586] rounded-full"
                        style={{ width: `${act.energyLevel}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-4">
                  <button
                    onClick={() => {
                      if (onOpenEnquiry) onOpenEnquiry();
                    }}
                    className="w-full py-2.5 rounded-full bg-[#137586] hover:bg-[#105B69] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                  >
                    <span>Plan This Activity</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {activities.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToActivity(dotIdx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIdx === dotIdx ? 'w-6 bg-[#137586]' : 'w-1.5 bg-[#D5C7B2]'
                }`}
                aria-label={`Go to activity ${dotIdx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ActivitiesSection;
