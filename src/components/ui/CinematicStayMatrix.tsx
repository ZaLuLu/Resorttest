import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BedDouble, Users, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resortData } from '../../data/resortData';

const roomPhotos = [
  {
    id: "photo-1",
    title: "Calm Olive Accent Interior",
    tag: "Guest Room Interior",
    image: "https://coorglayaresort.com/_next/static/immutable/media/room-interior-neutral.0i73oyjwh6ntv.jpeg",
    description: "Comfortable double bed with crisp white linens, matching wardrobe, dressing mirror, and peaceful views.",
  },
  {
    id: "photo-2",
    title: "Emerald Botanical Wall Feature",
    tag: "Guest Room Interior",
    image: "https://coorglayaresort.com/_next/static/immutable/media/room-interior-green.1pq4un8cgzr7r.jpeg",
    description: "Inviting guest room featuring decorative botanical wall pattern, wooden ceiling, and ambient warm lighting.",
  },
  {
    id: "photo-3",
    title: "Verandah & Garden Lounge",
    tag: "Outdoor Verandah",
    image: "https://coorglayaresort.com/_next/static/immutable/media/covered-seating.14m2n6fnxsknf.jpeg",
    description: "Shaded verandah lounge area with plush sofas and garden greenery right outside your room door.",
  },
];

interface CinematicStayMatrixProps {
  onOpenEnquiry: () => void;
}

export const CinematicStayMatrix: React.FC<CinematicStayMatrixProps> = ({ onOpenEnquiry }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#f4f0e8] border-b border-[#18191b]/10 overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a368]/40 bg-white px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.25em] font-semibold text-[#8c6d3f]">
            <BedDouble className="size-3.5 text-[#c5a368]" />
            <span>Accommodation Overview</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#18191b] font-normal">
            Stay at Coorg Laya
          </h2>

          <p className="text-sm text-[#5c6068] leading-relaxed max-w-2xl mx-auto">
            15 peaceful guest rooms accommodating up to approximately 45 overnight guests, surrounded by the refreshing natural climate of Kodagu.
          </p>

          <div className="mx-auto w-24 gold-divider my-4" />
        </div>

        {/* Highlight Architecture Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Room Photo Viewer */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Active Photo Container */}
            <div className="relative overflow-hidden rounded-3xl border border-[#18191b]/10 aspect-[16/11] bg-white shadow-xl group">
              <motion.img
                key={selectedPhoto}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={roomPhotos[selectedPhoto].image}
                alt={roomPhotos[selectedPhoto].title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                <div>
                  <span className="text-[0.65rem] uppercase tracking-[0.25em] text-[#dfc79e] font-semibold block mb-1">
                    {roomPhotos[selectedPhoto].tag}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-medium">
                    {roomPhotos[selectedPhoto].title}
                  </h3>
                  <p className="text-xs text-white/80 max-w-md font-light mt-1 hidden sm:block">
                    {roomPhotos[selectedPhoto].description}
                  </p>
                </div>

                <span className="rounded-full bg-white/20 border border-white/30 px-3 py-1 text-xs font-mono text-[#dfc79e] backdrop-blur-md">
                  0{selectedPhoto + 1} / 03
                </span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-3 gap-3">
              {roomPhotos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(index)}
                  className={`group relative overflow-hidden rounded-2xl border p-1 text-left transition-all duration-300 ${
                    selectedPhoto === index
                      ? 'border-[#c5a368] bg-white ring-2 ring-[#c5a368]/30 shadow-md'
                      : 'border-[#18191b]/10 bg-white/60 hover:bg-white'
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <p className="p-2 text-[0.7rem] font-medium text-[#18191b] line-clamp-1">
                    {photo.title}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Capacity & Verified Specs Card */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white p-8 sm:p-10 border border-[#18191b]/10 shadow-xl sleek-card">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#18191b]/10">
                <div className="space-y-1">
                  <span className="text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-[#8c6d3f]">
                    Verified Capacity
                  </span>
                  <div className="font-heading text-3xl sm:text-4xl text-[#18191b] font-medium">
                    15 Rooms
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-[#8c6d3f]">
                    Total Overnight
                  </span>
                  <div className="font-heading text-3xl sm:text-4xl text-[#8c6d3f] font-medium">
                    ~45 Guests
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#18191b]">
                  Included in Every Stay:
                </h4>

                <div className="space-y-2.5">
                  {resortData.accommodation.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#5c6068]">
                      <div className="size-4 rounded-full bg-[#faf8f5] border border-[#c5a368] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-2.5 text-[#8c6d3f]" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-[#5c6068]">
                    <div className="size-4 rounded-full bg-[#faf8f5] border border-[#c5a368] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-2.5 text-[#8c6d3f]" />
                    </div>
                    <span>Access to Swimming Pool, Badminton Court & Lawn recreation</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#faf8f5] p-4 border border-[#18191b]/6 text-xs text-[#5c6068] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#18191b]">
                  <ShieldCheck className="size-3.5 text-[#8c6d3f]" />
                  <span>Verified Reservation Information</span>
                </div>
                <p className="text-[0.72rem] leading-relaxed">
                  Direct booking enquiries are processed via email with our on-site team for best group accommodations and dates.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-8 mt-6 border-t border-[#18191b]/10 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenEnquiry}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#c5a368] px-6 py-3.5 text-xs uppercase tracking-wider font-semibold text-[#18191b] hover:bg-[#dfc79e] transition-all shadow-md"
              >
                <span>Enquire For Rooms</span>
                <Sparkles className="size-3.5" />
              </button>

              <Link
                to="/rooms"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#18191b]/15 px-6 py-3.5 text-xs uppercase tracking-wider font-semibold text-[#18191b] hover:bg-[#18191b] hover:text-[#faf8f5] transition-all"
              >
                <span>Details</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
