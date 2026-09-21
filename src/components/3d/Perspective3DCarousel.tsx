import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, MoveHorizontal } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';

export interface Carousel3DItem {
  id: string;
  title: string;
  category: string;
  image: string;
  badge?: string;
}

interface Perspective3DCarouselProps {
  items: Carousel3DItem[];
  onSelectItem?: (item: Carousel3DItem) => void;
  radius?: number;
}

export const Perspective3DCarousel: React.FC<Perspective3DCarouselProps> = ({
  items,
  onSelectItem,
  radius = 420,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = items.length;
  const angleStep = 360 / Math.min(total, 8); // Arc layout

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Drag handling with gesture inertia
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 45) {
      prev();
    } else if (dragOffset < -45) {
      next();
    }
    setDragOffset(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 40) {
      prev();
    } else if (dragOffset < -40) {
      next();
    }
    setDragOffset(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-full py-8 select-none flex flex-col items-center">
      {/* 3D Stage Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px' }}
      >
        {items.map((item, idx) => {
          // Calculate offset relative to current active index
          let offset = (idx - currentIndex + total) % total;
          if (offset > total / 2) offset -= total;

          // Only render visible arc items
          const isVisible = Math.abs(offset) <= 3;
          if (!isVisible) return null;

          const angle = offset * 36; // degrees
          const isCenter = offset === 0;
          const scale = isCenter ? 1 : Math.max(0.72, 1 - Math.abs(offset) * 0.14);
          const opacity = isCenter ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.28);
          const zIndex = 20 - Math.abs(offset) * 5;
          const xTranslate = offset * 210; // spread horizontally
          const zTranslate = -Math.abs(offset) * 120; // push back in 3D

          return (
            <motion.div
              key={item.id}
              animate={{
                x: xTranslate + (isDragging ? dragOffset * 0.5 : 0),
                z: zTranslate,
                rotateY: -offset * 22,
                scale,
                opacity,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              style={{
                position: 'absolute',
                zIndex,
                transformStyle: 'preserve-3d',
              }}
              onClick={() => {
                if (isCenter && onSelectItem) {
                  onSelectItem(item);
                } else {
                  setCurrentIndex(idx);
                }
              }}
              className="w-[260px] sm:w-[320px] md:w-[360px] shrink-0"
            >
              <div
                className={`clay-card p-3 border-2 border-white transition-all duration-300 ${
                  isCenter
                    ? 'shadow-[0_20px_45px_rgba(22,41,38,0.14)] ring-2 ring-water-500/40'
                    : 'shadow-md brightness-90 hover:brightness-100'
                }`}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <ClayImage
                    src={item.image}
                    alt={item.title}
                    aspectRatio="4:3"
                    clayVariant={isCenter ? 'water' : 'sand'}
                    badge={item.badge || item.category}
                    className="w-full shadow-sm"
                  />

                  {/* Active Card Zoom Overlay */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F3C28]/85 via-transparent to-transparent flex items-end justify-between p-4 text-white">
                      <span className="text-xs font-display font-bold drop-shadow-md">
                        {item.title}
                      </span>
                      <span className="size-8 rounded-full bg-white/95 text-[#0F3C28] flex items-center justify-center shadow-md">
                        <Maximize2 className="size-3.5" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Title Bar */}
                <div className="pt-2 px-1 flex items-center justify-between">
                  <span className="text-xs font-display font-bold text-[#131E1C] truncate">
                    {item.title}
                  </span>
                  <span className="clay-pill px-2 py-0.5 text-[0.62rem] font-semibold text-[#137586] bg-water-50">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3D Navigation Controls */}
      <div className="flex items-center gap-6 mt-4 z-20">
        <motion.button
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          className="size-11 rounded-full bg-white text-riverbed-900 border border-[#D5E5E7] shadow-md flex items-center justify-center hover:bg-water-50 transition-all cursor-pointer"
          aria-label="Previous 3D Slide"
        >
          <ChevronLeft className="size-5" />
        </motion.button>

        <div className="flex items-center gap-2">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-water-600 shadow-sm'
                  : 'w-2.5 bg-sand-300 hover:bg-water-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          className="size-11 rounded-full bg-white text-riverbed-900 border border-[#D5E5E7] shadow-md flex items-center justify-center hover:bg-water-50 transition-all cursor-pointer"
          aria-label="Next 3D Slide"
        >
          <ChevronRight className="size-5" />
        </motion.button>
      </div>

      {/* Helper Tag */}
      <div className="flex items-center gap-2 pt-3 text-[0.7rem] font-bold text-riverbed-500">
        <MoveHorizontal className="size-3.5 text-water-500 animate-pulse" />
        <span>Drag 3D carousel or click arrows</span>
      </div>
    </div>
  );
};
export default Perspective3DCarousel;
