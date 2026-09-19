import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight, BedDouble, Maximize2, Users, Eye, Sparkles, Check } from 'lucide-react';
import { SuiteSpecData } from './SuiteInspectionCard3D';

interface CardStackScrollProps {
  suites: SuiteSpecData[];
  onBookNow: (suiteId: string) => void;
}

interface StackCardProps {
  suite: SuiteSpecData;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  total: number;
  onBookNow: (suiteId: string) => void;
}

const StackCard: React.FC<StackCardProps> = ({
  suite,
  index,
  progress,
  range,
  targetScale,
  total,
  onBookNow,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer motion scroll-driven scale & rotation (skiper16 & skiper17 pattern)
  const scale = useTransform(progress, range, [1, targetScale]);
  const rotate = useTransform(
    progress,
    range,
    [index % 2 === 0 ? 0 : -0.5, (index % 2 === 0 ? 1 : -1) * (index * 0.75)]
  );

  return (
    <div
      ref={containerRef}
      className="sticky top-24 sm:top-28 flex items-center justify-center mb-12 sm:mb-16"
      style={{
        top: `calc(100px + ${index * 24}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
          rotate,
          transformOrigin: 'top center',
        }}
        className="w-full max-w-5xl rounded-3xl sm:rounded-4xl bg-[#FAF6EF] border-2 border-[#E4D9C8] p-5 sm:p-8 md:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.18),_inset_0_2px_4px_rgba(255,255,255,0.95)] overflow-hidden transition-colors"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left: Suite Photo */}
          <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#E8DFD1] shadow-md group">
            <img
              src={suite.image}
              alt={suite.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 px-3.5 py-1.5 rounded-full bg-[#FAF6EF]/95 backdrop-blur-md border border-[#DFD3C0] text-xs font-bold text-[#116B7B] shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
              <span>0{index + 1} · {suite.category}</span>
            </div>

            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#132422]/90 backdrop-blur-md text-white text-xs font-bold">
              {suite.startingRate} / Night
            </div>
          </div>

          {/* Right: Spec Breakdown & Reserve Button */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#A3733E] uppercase tracking-wider mb-1">
                <BedDouble className="w-3.5 h-3.5" />
                <span>Sanctuary Suite Quarters</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#132422]">
                {suite.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed mt-1">
                {suite.description}
              </p>
            </div>

            {/* Quick Spec Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              <div className="p-2.5 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0]">
                <span className="text-[10px] font-bold text-[#635546] uppercase block">Area</span>
                <span className="text-xs font-extrabold text-[#132422]">{suite.sqft}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0]">
                <span className="text-[10px] font-bold text-[#635546] uppercase block">Capacity</span>
                <span className="text-xs font-extrabold text-[#132422]">{suite.capacity}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold text-[#635546] uppercase block">Bed</span>
                <span className="text-xs font-extrabold text-[#132422] truncate block">{suite.bedType.split('+')[0]}</span>
              </div>
            </div>

            {/* Highlights Checklist */}
            <div className="space-y-1.5 pt-1">
              {suite.highlights.slice(0, 3).map((hl, hIdx) => (
                <div key={hIdx} className="flex items-center gap-2 text-xs font-medium text-[#132422]">
                  <div className="w-4 h-4 rounded-full bg-[#E5F3F5] text-[#116B7B] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Book Now Button */}
            <div className="pt-2">
              <button
                onClick={() => onBookNow(suite.id)}
                className="w-full sm:w-auto px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1A96AA] to-[#116B7B] hover:from-[#158092] hover:to-[#0D5764] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reserve {suite.name}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
};

export const CardStackScroll: React.FC<CardStackScrollProps> = ({ suites, onBookNow }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative w-full py-6">
      {suites.map((suite, index) => {
        const targetScale = 1 - (suites.length - index) * 0.04;
        return (
          <StackCard
            key={suite.id}
            suite={suite}
            index={index}
            progress={scrollYProgress}
            range={[index * (1 / suites.length), 1]}
            targetScale={targetScale}
            total={suites.length}
            onBookNow={onBookNow}
          />
        );
      })}
    </div>
  );
};

export default CardStackScroll;
