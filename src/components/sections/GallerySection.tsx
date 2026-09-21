import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Box, LayoutGrid, Maximize2, X, Sparkles } from 'lucide-react';
import { SpatialShowcase3D, SpatialItem } from '../3d/SpatialShowcase3D';
import { ClayImage } from '../common/ClayImage';
import { CinematicReveal } from '../common/CinematicReveal';

export const GallerySection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<SpatialItem | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeMobileIdx, setActiveMobileIdx] = useState<number>(0);
  const [showAllModal, setShowAllModal] = useState<boolean>(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const spatialPhotos: SpatialItem[] = [
    { id: 'gal-1', src: '/images/resort/resort-exteriors.jpeg', title: 'Resort Architecture & Palm Walkways', category: 'Resort', tag: 'Architecture' },
    { id: 'gal-2', src: '/images/amenities/swimming-pool.jpeg', title: 'Palm-Fringed Swimming Pool & Lounge', category: 'Pool & Sports', tag: 'Recreation' },
    { id: 'gal-3', src: '/images/rooms/room-interior-neutral.jpeg', title: 'Calm Olive Suite Quarters', category: 'Suites', tag: 'Living' },
    { id: 'gal-4', src: '/images/rooms/room-interior-green.jpeg', title: 'Emerald Botanical Accent Suite', category: 'Suites', tag: 'Living' },
    { id: 'gal-5', src: '/images/amenities/badminton-court.png', title: 'Bamboo Lawn Badminton Court', category: 'Pool & Sports', tag: 'Sports' },
    { id: 'gal-6', src: '/images/amenities/kids-play-trampoline.png', title: 'Kids Play Arena & Trampoline', category: 'Pool & Sports', tag: 'Kids' },
    { id: 'gal-7', src: '/images/resort/garden-terrace.jpeg', title: 'Raised Garden Terraces & Decks', category: 'Resort', tag: 'Estate' },
    { id: 'gal-8', src: '/images/resort/covered-seating.jpeg', title: 'Verandah Covered Lounge Space', category: 'Resort', tag: 'Lounge' },
    { id: 'gal-9', src: '/images/resort/outdoor-mural.jpeg', title: 'Outdoor Floral Foliage Mural', category: 'Resort', tag: 'Heritage' },
  ];

  const categories = ['All', 'Resort', 'Suites', 'Pool & Sports'];

  const filteredPhotos = selectedCategory === 'All'
    ? spatialPhotos
    : spatialPhotos.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="relative w-full py-12 sm:py-16 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E4D9C8] pb-8">
          <CinematicReveal className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-semibold tracking-kicker uppercase text-[#A3733E] shadow-sm">
              <Camera className="w-4 h-4 text-[#A3733E]" />
              <span>Visual Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#131E1C] font-display leading-tight heading-balance">
              Moments across Coorg Laya.
            </h2>
            <p className="text-sm text-[#314240] font-normal leading-relaxed prose-pretty">
              Explore our authentic resort spaces in an interactive 3D curved perspective carousel or browse the categorized photo grid.
            </p>
          </CinematicReveal>

          {/* 3D vs Grid Mode Toggle */}
          <CinematicReveal delay={0.15} direction="left">
            <div className="flex items-center gap-1 p-1 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm self-start md:self-auto relative">
              <button
                onClick={() => setViewMode('3d')}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer z-10 ${
                  viewMode === '3d'
                    ? 'text-white'
                    : 'text-[#314240] hover:text-[#137586]'
                }`}
              >
                {viewMode === '3d' && (
                  <motion.div
                    layoutId="galleryViewPill"
                    className="absolute inset-0 rounded-full bg-[#137586] -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Box className="w-4 h-4" />
                <span>3D Cylinder</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer z-10 ${
                  viewMode === 'grid'
                    ? 'text-white'
                    : 'text-[#314240] hover:text-[#137586]'
                }`}
              >
                {viewMode === 'grid' && (
                  <motion.div
                    layoutId="galleryViewPill"
                    className="absolute inset-0 rounded-full bg-[#137586] -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <LayoutGrid className="w-4 h-4" />
                <span>Grid View</span>
              </button>
            </div>
          </CinematicReveal>
        </div>

        {/* MOBILE VIEW: Ergonomic Horizontal Snap Carousel */}
        {isMobile ? (
          <div className="space-y-5">
            {/* Category Filter Pills & Counter */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-bold text-[#A3733E]">
                  Photo {Math.min(activeMobileIdx + 1, filteredPhotos.length)} of {filteredPhotos.length}
                </span>
                <button
                  onClick={() => setShowAllModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] text-[11px] font-bold text-[#137586] hover:bg-[#E5F3F5] transition-colors cursor-pointer"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>View All ({spatialPhotos.length})</span>
                </button>
              </div>

              {/* Scrollable Category Chips */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setActiveMobileIdx(0);
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex-shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-[#132422] text-white shadow-sm'
                        : 'bg-[#FAF6EF] text-[#344E4A] border border-[#E4D9C8]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Horizontal Snap Track */}
            <div
              className="snap-touch-track no-scrollbar gap-4 px-1 py-1"
              onScroll={(e) => {
                const target = e.currentTarget;
                const scrollLeft = target.scrollLeft;
                const itemWidth = target.offsetWidth * 0.84;
                const index = Math.round(scrollLeft / (itemWidth + 16));
                if (index !== activeMobileIdx && index >= 0 && index < filteredPhotos.length) {
                  setActiveMobileIdx(index);
                }
              }}
            >
              {filteredPhotos.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxPhoto(item)}
                  className="snap-touch-item w-[84vw] max-w-[340px] rounded-3xl overflow-hidden bg-[#FAF6EF] border border-[#E4D9C8] shadow-md active:scale-98 transition-transform cursor-pointer"
                >
                  <div className="relative aspect-[4/3] bg-[#E8DFD1] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.tag}
                    </div>
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] font-mono text-[#A3733E] font-bold uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#131E1C] line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {filteredPhotos.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeMobileIdx === dotIdx ? 'w-6 bg-[#137586]' : 'w-1.5 bg-[#D5C7B2]'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* DESKTOP / LAPTOP VIEW: 3D Cylinder or Categorized Grid */
          <>
            {/* 3D Cylindrical Perspective Carousel View */}
            {viewMode === '3d' && (
              <CinematicReveal delay={0.2} duration={0.8} spring className="w-full">
                <SpatialShowcase3D items={spatialPhotos} />
              </CinematicReveal>
            )}

            {/* Grid Mode with Filter Pills */}
            {viewMode === 'grid' && (
              <div className="space-y-8">
                {/* Filter Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#132422] text-white shadow-md'
                          : 'bg-[#FAF6EF] text-[#344E4A] border border-[#E4D9C8] hover:bg-[#E5F3F5] hover:text-[#116B7B]'
                      }`}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>

                {/* Photo Grid */}
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence>
                    {filteredPhotos.map((item, idx) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        key={item.id}
                        onClick={() => setLightboxPhoto(item)}
                        className="group relative rounded-3xl overflow-hidden bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#E8DFD1]">
                          <ClayImage
                            src={item.src}
                            alt={item.title}
                            aspectRatio="4:3"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#132422]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                            <span className="text-[11px] font-bold text-[#A3733E] uppercase tracking-wider">{item.tag}</span>
                            <h4 className="font-serif text-lg font-bold">{item.title}</h4>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </>
        )}

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full bg-[#FAF6EF] rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-4 sm:p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] bg-black rounded-2xl overflow-hidden">
                <img
                  src={lightboxPhoto.src}
                  alt={lightboxPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between text-[#132422] pt-2 px-2">
                <div>
                  <span className="text-xs font-bold text-[#116B7B] uppercase tracking-wider">{lightboxPhoto.category}</span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold">{lightboxPhoto.title}</h3>
                </div>
                <button
                  onClick={() => setLightboxPhoto(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1A96AA] hover:bg-[#116B7B] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile "View All" Modal Sheet */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end sm:justify-center p-0 sm:p-6"
            onClick={() => setShowAllModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative max-h-[85vh] w-full max-w-2xl mx-auto bg-[#FAF6EF] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sheet Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#E4D9C8]">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#131E1C]">Resort Photo Archive</h3>
                  <p className="text-xs text-[#586E6B]">{spatialPhotos.length} moments across Coorg Laya</p>
                </div>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="w-8 h-8 rounded-full bg-[#EFE8DC] text-[#132422] flex items-center justify-center cursor-pointer hover:bg-[#E4D9C8]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 2-Column Compact Grid */}
              <div className="overflow-y-auto p-4 grid grid-cols-2 gap-3 max-h-[70vh]">
                {spatialPhotos.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setShowAllModal(false);
                      setLightboxPhoto(item);
                    }}
                    className="group relative rounded-2xl overflow-hidden bg-[#E8DFD1] aspect-[4/3] cursor-pointer shadow-sm active:scale-95 transition-transform"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2 text-white">
                      <span className="text-[10px] font-bold line-clamp-1">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default GallerySection;
