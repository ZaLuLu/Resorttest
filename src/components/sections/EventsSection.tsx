import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Users, Calendar, ArrowUpRight, Award, Heart } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';
import { Clay3DCard } from '../3d/Clay3DCard';
import { SplitTextReveal } from '../common/SplitTextReveal';
import { springTransition, fadeUp } from '../../utils/motionVariants';

interface EventsSectionProps {
  onOpenEnquiry: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenEnquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section
      ref={containerRef}
      id="events"
      className="relative w-full py-20 sm:py-28 bg-sand-50/70 text-riverbed-900 overflow-hidden select-none"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="clay-card-sand p-6 sm:p-10 md:p-12 border-2 border-white shadow-[0_20px_50px_rgba(181,135,91,0.1)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-4 py-1.5 text-xs font-bold text-sand-700 shadow-clay-pill">
                <Users className="size-4 text-sand-600" />
                <span>Grand Open-Air Celebrations</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-riverbed-900 leading-[1.14]">
                <SplitTextReveal text="Host weddings, milestones, and family reunions for up to 500 guests." />
              </h2>

              <p className="text-sm sm:text-base text-riverbed-600 font-medium leading-relaxed">
                Expansive manicured green lawns bordered by tall palms and tropical foliage. Ideal for wedding mandap setups, banquet dining, corporate retreats, and full resort private buyouts.
              </p>

              {/* 2 Clay Stat Metric Cards */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="clay-card p-4 border-2 border-white shadow-sm">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-water-600 block">500</span>
                  <span className="text-xs font-semibold text-riverbed-600">Lawn Guest Capacity</span>
                </div>
                <div className="clay-card p-4 border-2 border-white shadow-sm">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-sand-600 block">15</span>
                  <span className="text-xs font-semibold text-riverbed-600">Full Buyout Suites</span>
                </div>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springTransition}
                  onClick={onOpenEnquiry}
                  className="clay-btn-water text-xs sm:text-sm font-bold shadow-md cursor-pointer"
                >
                  <span>Request Event & Wedding Dates</span>
                  <ArrowUpRight className="size-4" />
                </motion.button>
              </div>
            </div>

            {/* Right Parallax 3D Tilt Card */}
            <div className="lg:col-span-6 relative">
              <motion.div style={{ y: parallaxY }} className="w-full">
                <Clay3DCard variant="sand" maxTilt={10} glareOpacity={0.25} className="p-3">
                  <ClayImage
                    src="/images/concepts/events/decorated-outdoor-lawn-concept.png"
                    alt="500-Guest Celebration Lawn at Coorg Laya Resort"
                    aspectRatio="4:3"
                    clayVariant="sand"
                    badge="500-Guest Lawn Stage"
                    className="w-full shadow-sm"
                  />

                  {/* Floating Clay Event Badge */}
                  <div className="absolute -bottom-2 -left-2 clay-pill bg-white px-4 py-2 flex items-center gap-2 border-2 border-white shadow-md z-30">
                    <Heart className="size-4 text-sand-500" />
                    <span className="text-xs font-bold text-riverbed-800">Boutique Celebrations</span>
                  </div>
                </Clay3DCard>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
export default EventsSection;
