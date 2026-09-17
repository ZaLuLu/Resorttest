import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass, MoveHorizontal, ArrowRight, Sparkles, Waves } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';
import { fadeUp, staggerContainer, springTransition } from '../../utils/motionVariants';

interface ActivitiesSectionProps {
  onOpenEnquiry?: () => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ onOpenEnquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const activities = [
    {
      id: 'activities-01',
      image: '/images/amenities/swimming-pool.png',
      badge: 'Water & Sun',
      title: 'Poolside Swimming & Deck Relaxation',
      energy: 'Relaxed · All Day',
      description: 'Take leisure laps or unwind in the shallow circular lounge framed by tropical palms and blue skies.',
      clayType: 'water' as const,
    },
    {
      id: 'activities-02',
      image: '/images/amenities/kids-play-trampoline.png',
      badge: 'Active Play',
      title: 'Kids Trampoline & Lawn Games',
      energy: 'High Energy · Safe Fun',
      description: 'Enclosed jumping trampoline and open grass running space for children to play freely in clean mountain air.',
      clayType: 'sand' as const,
    },
    {
      id: 'activities-03',
      image: '/images/amenities/badminton-court.png',
      badge: 'Friendly Match',
      title: 'Bamboo Lawn Badminton Rallies',
      energy: 'Moderate · Afternoon',
      description: 'Pick up racquets for friendly rallies on our landscaped grass court sheltered by natural bamboo borders.',
      clayType: 'water' as const,
    },
    {
      id: 'activities-04',
      image: '/images/resort/covered-seating.jpeg',
      badge: 'Evening Chill',
      title: 'Verandah Lounge & Stargazing',
      energy: 'Gentle · Starlit Night',
      description: 'Savor steaming hot local coffee on the covered verandah and watch the clear, starlit Kodagu skies.',
      clayType: 'sand' as const,
    },
  ];

  return (
    <section id="activities" className="relative w-full py-20 sm:py-28 bg-sand-100/40 text-riverbed-900 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-4 py-1.5 text-xs font-bold text-sand-600 shadow-clay-pill">
              <Compass className="size-4 text-sand-600" />
              <span>Sanctuary Experiences</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-riverbed-900 leading-tight">
              Curated Kodagu activities for everyone.
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-water-700 self-start md:self-auto clay-pill px-4 py-2 bg-white">
            <MoveHorizontal className="size-4 text-water-500 animate-pulse" />
            <span>Swipe or drag experiences</span>
          </div>
        </div>

        {/* Drag-Based Horizontal Clay Carousel */}
        <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing py-3">
          <motion.div
            drag="x"
            dragConstraints={containerRef}
            whileTap={{ cursor: 'grabbing' }}
            className="flex gap-6 w-max"
          >
            {activities.map((act) => (
              <motion.div
                key={act.id}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={springTransition}
                className={`w-[290px] sm:w-[340px] md:w-[380px] p-4 border-2 border-white space-y-4 shrink-0 ${
                  act.clayType === 'water' ? 'clay-card-water' : 'clay-card-sand'
                }`}
              >
                <ClayImage
                  src={act.image}
                  alt={act.title}
                  aspectRatio="4:3"
                  clayVariant={act.clayType}
                  badge={act.badge}
                  className="w-full shadow-clay-sm"
                />

                <div className="space-y-2">
                  <span className="clay-pill px-2.5 py-0.5 text-[0.68rem] font-bold text-water-800 bg-white/90 inline-block">
                    {act.energy}
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-riverbed-900 leading-snug">
                    {act.title}
                  </h3>
                  <p className="text-xs text-riverbed-600 font-medium leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
export default ActivitiesSection;
