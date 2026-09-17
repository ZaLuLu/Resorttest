import React, { useState } from 'react';
import { Camera, Box, LayoutGrid, Maximize2, X } from 'lucide-react';
import { SpatialShowcase3D, SpatialItem } from '../3d/SpatialShowcase3D';
import { ClayImage } from '../common/ClayImage';
import { CinematicReveal } from '../common/CinematicReveal';

export const GallerySection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<SpatialItem | null>(null);

  const spatialPhotos: SpatialItem[] = [
    { id: 'gal-1', src: '/images/resort/resort-exteriors.jpeg', title: 'Resort Architecture & Palm Walkways', category: 'Resort', tag: 'Architecture' },
    { id: 'gal-2', src: '/images/amenities/swimming-pool.png', title: 'Palm-Fringed Swimming Pool & Lounge', category: 'Pool & Sports', tag: 'Recreation' },
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
    <section id="gallery" className="relative w-full py-20 sm:py-28 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Header & View Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <CinematicReveal className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
              <Camera className="w-4 h-4 text-[#A3733E]" />
              <span>Visual Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#132422] font-serif leading-tight">
              Moments across Coorg Laya.
            </h2>
            <p className="text-sm text-[#344E4A] font-medium leading-relaxed">
              Explore our authentic resort spaces in an interactive 3D curved perspective carousel or browse the categorized photo grid.
            </p>
          </CinematicReveal>

          {/* 3D vs Grid Mode Toggle */}
          <CinematicReveal delay={0.15}>
            <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm self-start md:self-auto">
              <button
                onClick={() => setViewMode('3d')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  viewMode === '3d'
                    ? 'bg-[#1A96AA] text-white shadow-md'
                    : 'text-[#344E4A] hover:text-[#116B7B]'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>3D Cylinder</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#1A96AA] text-white shadow-md'
                    : 'text-[#344E4A] hover:text-[#116B7B]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Grid View</span>
              </button>
            </div>
          </CinematicReveal>
        </div>

        {/* 3D Cylindrical Perspective Carousel View */}
        {viewMode === '3d' && (
          <CinematicReveal delay={0.2} duration={0.8} className="w-full">
            <SpatialShowcase3D items={spatialPhotos} />
          </CinematicReveal>
        )}

        {/* Grid Mode with Filter Pills */}
        {viewMode === 'grid' && (
          <div className="space-y-8">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#132422] text-white shadow-md'
                      : 'bg-[#FAF6EF] text-[#344E4A] border border-[#E4D9C8] hover:bg-[#E5F3F5] hover:text-[#116B7B]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhotos.map((item, idx) => (
                <CinematicReveal key={item.id} delay={idx * 0.08} duration={0.6}>
                  <div
                    onClick={() => setLightboxPhoto(item)}
                    className="cursor-pointer rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-3 shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                      <ClayImage
                        src={item.src}
                        alt={item.title}
                        aspectRatio="4:3"
                        clayVariant="water"
                        badge={item.category}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="pt-3 px-1 flex items-center justify-between">
                      <h4 className="font-serif text-sm font-bold text-[#132422] line-clamp-1">
                        {item.title}
                      </h4>
                      <span className="w-8 h-8 rounded-full bg-[#E5F3F5] text-[#116B7B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </CinematicReveal>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Grid Lightbox Modal */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#132422]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            onClick={() => setLightboxPhoto(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white text-[#132422] flex items-center justify-center shadow-lg hover:scale-105 transition-all z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 sm:p-6 shadow-2xl space-y-4"
          >
            <img
              src={lightboxPhoto.src}
              alt={lightboxPhoto.title}
              className="w-full max-h-[65vh] object-contain rounded-2xl"
            />
            <div className="flex items-center justify-between text-[#132422] pt-2 px-2">
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                {lightboxPhoto.title}
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-[#116B7B] bg-[#E5F3F5]">
                {lightboxPhoto.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default GallerySection;
