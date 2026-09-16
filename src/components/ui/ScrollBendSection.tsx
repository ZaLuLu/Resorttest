import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Waves, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScrollBendSectionProps {
  onOpenEnquiry: () => void;
}

export const ScrollBendSection: React.FC<ScrollBendSectionProps> = ({ onOpenEnquiry }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // 3D cylindrical perspective curvature
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [14, 0, -14]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], ['40px', '28px', '40px']);

  return (
    <section 
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-sand-50 overflow-hidden select-none border-b border-ink-primary/8"
      style={{ perspective: '1200px' }}
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-to-r from-powder-200/40 via-butter-200/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-powder-300 bg-powder-50 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] font-semibold text-powder-700">
            <Waves className="size-3.5 text-powder-600" />
            <span>Chapter 4 · The Living Canvas</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal text-ink-primary">
            Water, Sun & Endless Green
          </h2>

          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
            Feel the natural curvature of the landscape as daylight dances across the swimming pool and expansive garden lawns in Kushalnagar.
          </p>
        </div>

        {/* 3D Cylindrical Scroll-Bend Frame */}
        <motion.div
          style={{
            rotateX,
            scale,
            borderRadius,
            transformStyle: 'preserve-3d',
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full aspect-[16/10] sm:aspect-[21/10] overflow-hidden border border-ink-primary/10 shadow-2xl bg-sand-100 group"
        >
          {/* Main Panorama Image */}
          <img
            src="https://coorglayaresort.com/_next/static/immutable/media/swimming-pool.3-bcab5o_i5-q.png"
            alt="Swimming pool with circular shallow deck and towering palms at Coorg Laya Resort"
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/90 via-ink-primary/20 to-transparent" />

          {/* Floating Card Detail Overlay */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 text-white">
            <div className="space-y-2 max-w-xl">
              <span className="inline-block rounded-full bg-butter-400 px-3.5 py-1 text-[0.65rem] uppercase tracking-wider font-bold text-ink-primary shadow-sm">
                Poolside Serenity
              </span>
              <h3 className="font-heading text-2xl sm:text-4xl font-medium text-white">
                Circular Shallow Deck & Palm Canopies
              </h3>
              <p className="text-xs sm:text-sm text-sand-200 font-light leading-relaxed">
                Enjoy peaceful morning laps and relaxing afternoon swims surrounded by the fresh mountain breeze of the Western Ghats.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-7 py-3 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all shadow-xl cursor-pointer border border-butter-500/20"
              >
                <span>Plan Your Visit</span>
                <Sparkles className="size-3.5 text-ink-primary" />
              </button>

              <Link
                to="/amenities"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-white/20 transition-all backdrop-blur-md"
              >
                <span>All Facilities</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Caption Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-ink-muted pt-2 border-t border-ink-primary/8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-butter-600" />
            <span>Dedicated pool and relaxation deck maintained for resident guests</span>
          </div>
          <span className="font-mono text-[0.68rem] text-powder-700 font-semibold">
            Kushalnagar · Kodagu
          </span>
        </div>
      </div>
    </section>
  );
};
