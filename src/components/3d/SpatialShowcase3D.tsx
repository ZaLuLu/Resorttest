import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles, Pause, Play } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';

export interface SpatialItem {
  id: string;
  src: string;
  title: string;
  category: string;
  tag: string;
}

interface SpatialShowcase3DProps {
  items: SpatialItem[];
  autoPlay?: boolean;
  className?: string;
}

export const SpatialShowcase3D: React.FC<SpatialShowcase3DProps> = ({
  items,
  autoPlay = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [lightboxItem, setLightboxItem] = useState<SpatialItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!isPlaying || isDragging) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, isDragging, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
    dragDistanceRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragDistanceRef.current = clientX - startXRef.current;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDistanceRef.current < -50) {
      nextSlide();
    } else if (dragDistanceRef.current > 50) {
      prevSlide();
    }
  };

  return (
    <div className={`relative w-full overflow-hidden select-none py-10 ${className}`}>
      {/* 3D Spatial Carousel Stage */}
      <div
        className="relative h-[480px] w-full flex items-center justify-center [perspective:1400px] cursor-grab active:cursor-grabbing"
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center [transform-style:preserve-3d]">
          {items.map((item, index) => {
            // Calculate relative offset around the ring
            let offset = (index - currentIndex) % total;
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Compute 3D cylinder transform coordinates
            const translateX = offset * 280;
            const translateZ = -Math.abs(offset) * 140;
            const rotateY = offset * -28;
            const scale = isCenter ? 1 : 0.82;
            const opacity = isCenter ? 1 : Math.max(0.4, 1 - Math.abs(offset) * 0.35);

            return (
              <motion.div
                key={item.id}
                className="absolute w-[320px] sm:w-[380px] h-[440px] rounded-3xl [transform-style:preserve-3d] cursor-pointer"
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => {
                  if (isCenter) {
                    setLightboxItem(item);
                  } else {
                    setCurrentIndex(index);
                  }
                }}
              >
                <div
                  className={`relative w-full h-full rounded-3xl overflow-hidden bg-[#FAF6EF] border transition-all duration-300 ${
                    isCenter
                      ? 'border-[#1A96AA] shadow-[0_24px_50px_rgba(22,41,38,0.22),_0_0_0_1px_rgba(26,150,170,0.4),_inset_0_2px_4px_rgba(255,255,255,0.9)]'
                      : 'border-[#E4D9C8] shadow-[0_12px_28px_rgba(22,41,38,0.08)]'
                  }`}
                >
                  {/* Photo with Clay Framing */}
                  <ClayImage
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient Depth Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#132422]/90 via-[#132422]/20 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-[#132422]/80 backdrop-blur-md border border-white/20 text-[#FAF6EF] text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
                      {item.category}
                    </span>

                    {isCenter && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxItem(item);
                        }}
                        className="pointer-events-auto p-2 rounded-full bg-white/30 backdrop-blur-md hover:bg-white text-white hover:text-[#132422] transition-colors border border-white/20 shadow-md"
                        title="Expand Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#C7A583] block mb-1 font-mono">
                      {item.tag}
                    </span>
                    <h4 className="text-xl font-bold text-white font-display leading-tight">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls Bar */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prevSlide}
          className="w-11 h-11 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] text-[#132422] hover:bg-[#1A96AA] hover:text-white hover:border-[#1A96AA] shadow-sm flex items-center justify-center transition-all duration-200"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EFE8DC] border border-[#DFD3C0]">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-6 bg-[#1A96AA]' : 'w-2 bg-[#C2B5A0] hover:bg-[#A3733E]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-11 h-11 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] text-[#132422] hover:bg-[#1A96AA] hover:text-white hover:border-[#1A96AA] shadow-sm flex items-center justify-center transition-all duration-200"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pause/Play Toggle */}
        <button
          onClick={() => setIsPlaying(prev => !prev)}
          className="w-11 h-11 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] text-[#344E4A] hover:bg-[#FAF6EF] hover:text-[#116B7B] shadow-sm flex items-center justify-center transition-colors"
          aria-label={isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
          title={isPlaying ? 'Pause 3D auto-rotation' : 'Play 3D auto-rotation'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#132422]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl max-h-[90vh] w-full rounded-3xl overflow-hidden bg-[#FAF6EF] border border-white/20 shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative flex-1 min-h-[350px] md:min-h-[500px] bg-black">
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-[#FAF6EF]">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#116B7B]/10 text-[#116B7B] text-xs font-bold uppercase tracking-wider inline-block">
                    {lightboxItem.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#132422] font-serif mt-3">
                    {lightboxItem.title}
                  </h3>
                  <p className="text-sm text-[#344E4A] mt-2 leading-relaxed">
                    Captured on-site at Coorg Laya Resort, Karnataka. Preserving natural Western Ghats heritage and tranquil luxury.
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E4D9C8] flex items-center justify-between">
                  <span className="text-xs text-[#635546] font-semibold">{lightboxItem.tag}</span>
                  <button
                    onClick={() => setLightboxItem(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1A96AA] hover:bg-[#116B7B] transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
