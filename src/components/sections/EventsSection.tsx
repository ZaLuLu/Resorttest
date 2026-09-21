import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, ArrowUpRight, Heart, Crown, Sparkles } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';
import { Clay3DCard } from '../3d/Clay3DCard';
import { SplitTextReveal } from '../common/SplitTextReveal';
import { springTransition } from '../../utils/motionVariants';

interface EventsSectionProps {
  onOpenEnquiry: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ onOpenEnquiry }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section
      ref={containerRef}
      id="events"
      className="relative w-full py-12 sm:py-16 bg-[#FAF6EF] text-[#132422] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="rounded-3xl sm:rounded-4xl bg-[#FAF6EF] p-6 sm:p-10 md:p-12 border-2 border-[#E4D9C8] shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#A3733E] shadow-sm">
                <Users className="size-4 text-[#A3733E]" />
                <span>Grand Open-Air Celebrations</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#131E1C] leading-[1.14] heading-balance">
                Host weddings, milestones, and family reunions for up to 500 guests.
              </h2>

              <p className="text-sm sm:text-base text-[#314240] font-normal leading-relaxed prose-pretty">
                Expansive manicured green lawns bordered by tall palms and tropical foliage. Ideal for wedding mandap setups, banquet dining, corporate retreats, and full resort private buyouts.
              </p>

              {/* 2 Clay Stat Metric Cards */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#137586] block">500</span>
                  <span className="text-xs font-semibold text-[#586E6B]">Lawn Guest Capacity</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#A3733E] block">15</span>
                  <span className="text-xs font-semibold text-[#586E6B]">Full Buyout Suites</span>
                </div>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={springTransition}
                  onClick={onOpenEnquiry}
                  className="px-6 py-3.5 rounded-full bg-[#137586] hover:bg-[#105B69] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Request Event & Wedding Dates</span>
                  <ArrowUpRight className="size-4" />
                </motion.button>
              </div>
            </div>

            {/* Right Parallax 3D Tilt Card */}
            <div className="lg:col-span-6 relative">
              <motion.div style={{ y: parallaxY }} className="w-full">
                <Clay3DCard variant="sand" maxTilt={8} glareOpacity={0.25} className="p-3">
                  <ClayImage
                    src="/images/concepts/events/decorated-outdoor-lawn-concept.png"
                    alt="500-Guest Celebration Lawn at Coorg Laya Resort"
                    aspectRatio="4:3"
                    clayVariant="sand"
                    badge="500-Guest Lawn Stage"
                    className="w-full shadow-sm rounded-2xl"
                  />

                  {/* Floating Event Badge */}
                  <div className="absolute -bottom-2 -left-2 rounded-2xl bg-[#FAF6EF] px-4 py-2 flex items-center gap-2 border border-[#E4D9C8] shadow-md z-30">
                    <Heart className="size-4 text-[#A3733E]" />
                    <span className="text-xs font-bold text-[#132422]">Boutique Celebrations</span>
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
