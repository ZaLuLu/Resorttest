import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';

interface MosaicPhoto {
  id: string;
  src: string;
  badge: string;
  title: string;
  description: string;
  tag: string;
  ratio: '4:3' | '1:1' | '3:2' | '16:10';
}

export const FloatingParallaxMosaic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Tightly calibrated and smooth transform ranges
  const col1Y = useTransform(scrollYProgress, [0, 1], [40, -80]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [-60, 50]);
  const col3Y = useTransform(scrollYProgress, [0, 1], [50, -90]);
  const col4Y = useTransform(scrollYProgress, [0, 1], [-50, 60]);

  const column1: MosaicPhoto[] = [
    {
      id: 'mos-1',
      src: '/images/resort/resort-exteriors.jpeg',
      badge: '01 · Architecture',
      title: 'Palm-Fringed Entry Corridors',
      description: 'Shaded sandstone walkways welcoming guests into 15 private garden suites.',
      tag: 'Sanctuary Living',
      ratio: '4:3',
    },
    {
      id: 'mos-2',
      src: '/images/rooms/room-interior-green.jpeg',
      badge: '02 · Suites',
      title: 'Emerald Botanical Living Quarters',
      description: 'Handcrafted timber ceilings with natural cross-breezes and plantation views.',
      tag: 'Restful Sleep',
      ratio: '1:1',
    },
  ];

  const column2: MosaicPhoto[] = [
    {
      id: 'mos-3',
      src: '/images/amenities/swimming-pool.png',
      badge: '03 · Living Water',
      title: 'Palm-Fringed Swimming Pool',
      description: 'Circular shallow relaxation section shaded by tall tropical coconut trees.',
      tag: 'Crystal Waters',
      ratio: '1:1',
    },
    {
      id: 'mos-4',
      src: '/images/resort/garden-lawn.jpeg',
      badge: '04 · Lawns',
      title: '500-Capacity Celebration Greens',
      description: 'Expansive manicured open lawns under clear, starlit Western Ghats skies.',
      tag: 'Celebrations',
      ratio: '4:3',
    },
  ];

  const column3: MosaicPhoto[] = [
    {
      id: 'mos-5',
      src: '/images/amenities/badminton-court.png',
      badge: '05 · Recreation',
      title: 'Bamboo Lawn Badminton Court',
      description: 'Lively friendly rallies on grass courts sheltered by green bamboo groves.',
      tag: 'Active Sports',
      ratio: '4:3',
    },
    {
      id: 'mos-6',
      src: '/images/rooms/room-interior-neutral.jpeg',
      badge: '06 · Suites',
      title: 'Calm Olive Garden Quarters',
      description: 'Minimalist dressing vanities and private en-suite rainfall shower comfort.',
      tag: 'Serene Rest',
      ratio: '1:1',
    },
  ];

  const column4: MosaicPhoto[] = [
    {
      id: 'mos-7',
      src: '/images/nearby/kaveri-river.png',
      badge: '07 · Waterways',
      title: 'Kaveri River Hanging Bridge',
      description: 'Just 4 km from resort gates. Flowing river waters, bamboo islands, and deer parks.',
      tag: 'Nature Tourism',
      ratio: '1:1',
    },
    {
      id: 'mos-8',
      src: '/images/resort/garden-terrace.jpeg',
      badge: '08 · Dining Decks',
      title: 'Raised Garden Terraces',
      description: 'Elevated timber platforms for hot Coorg estate coffee and evening conversations.',
      tag: 'Morning Coffee',
      ratio: '4:3',
    },
  ];

  const renderCard = (photo: MosaicPhoto) => (
    <div
      key={photo.id}
      style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}
      className="group relative rounded-3xl overflow-hidden bg-[#FAF6EF] border border-[#E4D9C8] p-3 shadow-[0_12px_28px_rgba(22,41,38,0.08),_inset_0_2px_4px_rgba(255,255,255,0.9)] transition-all duration-300 hover:shadow-[0_24px_50px_rgba(26,150,170,0.18)] hover:border-[#1A96AA]"
    >
      <div className="relative rounded-2xl overflow-hidden bg-[#E8DFD1]">
        <ClayImage
          src={photo.src}
          alt={photo.title}
          aspectRatio={photo.ratio}
          clayVariant="water"
          badge={photo.badge}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#132422]/85 via-[#132422]/20 to-transparent pointer-events-none" />

        {/* Floating Quick Tag */}
        <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#74B4C0] block mb-0.5">
            {photo.tag}
          </span>
          <h4 className="font-serif text-sm sm:text-base font-bold text-white leading-tight">
            {photo.title}
          </h4>
        </div>
      </div>

      {/* Description below photo */}
      <div className="p-3 bg-[#FAF6EF]">
        <p className="text-xs text-[#344E4A] leading-relaxed line-clamp-2">
          {photo.description}
        </p>
      </div>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 sm:py-28 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none"
    >
      {/* Center Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-4 py-1.5 text-xs font-bold text-[#116B7B] shadow-sm">
          <Sparkles className="w-4 h-4 text-[#1A96AA]" />
          <span>Full-Viewport Kinetic Parallax Canvas</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#132422] font-serif leading-tight max-w-3xl mx-auto">
          The Living Canvas of Coorg Laya
        </h2>

        <p className="text-xs sm:text-sm text-[#344E4A] max-w-xl mx-auto leading-relaxed">
          Scroll down to watch our real resort spaces glide across 3D floating parallax currents. Hover any space to inspect its details.
        </p>
      </div>

      {/* 4-Column Floating Parallax Grid with GPU Promotion */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          
          {/* Column 1 (Ascending) */}
          <motion.div
            style={{ y: prefersReduced ? 0 : col1Y, willChange: 'transform' }}
            className="space-y-6"
          >
            {column1.map(renderCard)}
          </motion.div>

          {/* Column 2 (Descending) */}
          <motion.div
            style={{ y: prefersReduced ? 0 : col2Y, willChange: 'transform' }}
            className="space-y-6 pt-0 sm:pt-8 lg:pt-12"
          >
            {column2.map(renderCard)}
          </motion.div>

          {/* Column 3 (Ascending) */}
          <motion.div
            style={{ y: prefersReduced ? 0 : col3Y, willChange: 'transform' }}
            className="space-y-6 pt-0 sm:pt-4 lg:pt-6"
          >
            {column3.map(renderCard)}
          </motion.div>

          {/* Column 4 (Descending) */}
          <motion.div
            style={{ y: prefersReduced ? 0 : col4Y, willChange: 'transform' }}
            className="space-y-6 pt-0 sm:pt-10 lg:pt-16"
          >
            {column4.map(renderCard)}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FloatingParallaxMosaic;
