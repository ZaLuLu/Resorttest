import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BedDouble, Users, Sparkles, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resortData } from '../../data/resortData';

interface InteractiveRoomDeckProps {
  onOpenEnquiry: () => void;
}

const roomCards = [
  {
    id: 'olive-room',
    title: 'Calm Olive Interior',
    category: 'Guest Room Accommodation',
    tag: '15 Rooms Available',
    description: 'Crisp white bedding, soothing olive palette, fitted wardrobe, dressing mirror, and serene garden view.',
    image: 'https://coorglayaresort.com/_next/static/immutable/media/room-interior-neutral.0i73oyjwh6ntv.jpeg',
    features: ['Comfortable Double Bed Setup', 'Crisp White Linens & Vanity Mirror', 'Wardrobe & In-Room Storage', 'Serene Nature & Garden Vistas'],
  },
  {
    id: 'emerald-room',
    title: 'Emerald Accent Room',
    category: 'Botanical Feature Interior',
    tag: 'Nature Inspired',
    description: 'Decorative botanical wall accents, warm wooden ceiling details, and ambient lighting crafted for restful sleep.',
    image: 'https://coorglayaresort.com/_next/static/immutable/media/room-interior-green.1pq4un8cgzr7r.jpeg',
    features: ['Botanical Wall Art & Timber Ceilings', 'Peaceful Acoustic Insulation', 'Morning Birdsong Atmosphere', 'En-Suite Bathroom Facilities'],
  },
  {
    id: 'verandah-lounge',
    title: 'Verandah Garden Lounge',
    category: 'Outdoor Room Verandah',
    tag: 'Shaded Patio',
    description: 'Deep covered verandah with plush seating just steps away from your room door for peaceful reading and coffee.',
    image: 'https://coorglayaresort.com/_next/static/immutable/media/covered-seating.14m2n6fnxsknf.jpeg',
    features: ['Plush Shaded Lounge Sofas', 'Direct Garden & Lawn Access', 'Fresh Kodagu Breeze', 'Private Corner Seating'],
  },
];

export const InteractiveRoomDeck: React.FC<InteractiveRoomDeckProps> = ({ onOpenEnquiry }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => setActiveIndex((prev) => (prev + 1) % roomCards.length);
  const prevCard = () => setActiveIndex((prev) => (prev - 1 + roomCards.length) % roomCards.length);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-sand-100 border-b border-ink-primary/8 overflow-hidden">
      {/* Background Butter Yellow / Powder Blue Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-butter-200/40 via-powder-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-ink-primary/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.25em] font-semibold text-butter-700">
              <BedDouble className="size-3.5 text-butter-600" />
              <span>Accommodation Showcase</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink-primary font-normal">
              Stay at Coorg Laya
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
              15 peaceful guest rooms accommodating up to approximately 45 overnight guests, surrounded by lush Kodagu flora and open skies.
            </p>
          </div>

          {/* Quick Metrics Capsule */}
          <div className="flex items-center gap-4">
            <div className="rounded-2xl border border-butter-200 bg-white px-5 py-3 shadow-sm text-center">
              <span className="text-[0.65rem] uppercase tracking-wider text-butter-700 font-semibold block">Total Rooms</span>
              <span className="font-heading text-2xl font-bold text-ink-primary">15 Rooms</span>
            </div>
            <div className="rounded-2xl border border-powder-200 bg-white px-5 py-3 shadow-sm text-center">
              <span className="text-[0.65rem] uppercase tracking-wider text-powder-700 font-semibold block">Max Capacity</span>
              <span className="font-heading text-2xl font-bold text-powder-700">~45 Guests</span>
            </div>
          </div>
        </div>

        {/* 3D Stacked Deck & Detail Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Interactive Card Stack */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[16/11]">
              <AnimatePresence mode="popLayout">
                {roomCards.map((card, index) => {
                  const offset = (index - activeIndex + roomCards.length) % roomCards.length;
                  const isCurrent = offset === 0;

                  return (
                    <motion.div
                      key={card.id}
                      initial={false}
                      animate={{
                        top: `${offset * 14}px`,
                        left: `${offset * 14}px`,
                        right: `${-offset * 14}px`,
                        scale: 1 - offset * 0.05,
                        zIndex: roomCards.length - offset,
                        opacity: offset > 2 ? 0 : 1 - offset * 0.2,
                        rotateZ: offset === 0 ? 0 : offset === 1 ? 2 : -2,
                      }}
                      transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                      onClick={() => {
                        if (!isCurrent) setActiveIndex(index);
                      }}
                      className={`absolute inset-0 rounded-3xl overflow-hidden border border-ink-primary/10 shadow-2xl bg-white cursor-pointer ${
                        isCurrent ? 'ring-2 ring-butter-400' : 'hover:opacity-90'
                      }`}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Card Content Overlay */}
                      <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
                        <div>
                          <span className="inline-block rounded-full bg-butter-300 px-3 py-1 text-[0.65rem] uppercase tracking-wider font-bold text-ink-primary mb-2 shadow-sm">
                            {card.tag}
                          </span>
                          <h3 className="font-heading text-2xl sm:text-3xl font-medium">
                            {card.title}
                          </h3>
                          <p className="text-xs text-white/80 line-clamp-1 font-light mt-1">
                            {card.category}
                          </p>
                        </div>

                        <span className="font-mono text-xs font-bold text-butter-200 bg-black/50 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                          0{index + 1} / 0{roomCards.length}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Deck Controls */}
            <div className="absolute -bottom-6 flex items-center gap-3">
              <button
                onClick={prevCard}
                className="flex size-11 items-center justify-center rounded-full border border-ink-primary/10 bg-white text-ink-primary hover:bg-butter-200 transition-colors shadow-md cursor-pointer"
                aria-label="Previous room photo"
              >
                <ChevronLeft className="size-5" />
              </button>
              <div className="flex items-center gap-1.5 px-2">
                {roomCards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeIndex === i ? 'w-6 bg-butter-400' : 'w-2 bg-ink-primary/20 hover:bg-ink-primary/50'
                    }`}
                    aria-label={`Room slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextCard}
                className="flex size-11 items-center justify-center rounded-full border border-ink-primary/10 bg-white text-ink-primary hover:bg-butter-200 transition-colors shadow-md cursor-pointer"
                aria-label="Next room photo"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          {/* Right: Active Card Details & Features */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-ink-primary/10 p-8 sm:p-10 shadow-xl space-y-6 sleek-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[0.68rem] uppercase tracking-[0.25em] font-semibold text-butter-700 block mb-1">
                    {roomCards[activeIndex].category}
                  </span>
                  <h3 className="font-heading text-3xl text-ink-primary font-medium">
                    {roomCards[activeIndex].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted font-light leading-relaxed mt-2">
                    {roomCards[activeIndex].description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2 border-t border-ink-primary/8">
                  <span className="text-[0.68rem] uppercase tracking-[0.2em] font-bold text-ink-primary block mb-2">
                    Highlights & Inclusions
                  </span>
                  {roomCards[activeIndex].features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-ink-muted">
                      <CheckCircle2 className="size-4 text-butter-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Verified Reservation Banner */}
                <div className="rounded-2xl bg-powder-50/70 p-4 border border-powder-200 text-xs text-ink-muted flex items-start gap-3">
                  <ShieldCheck className="size-5 text-powder-700 shrink-0 mt-0.5" />
                  <p className="text-[0.72rem] leading-relaxed">
                    Accommodates family vacations, group retreats, and individual travellers. Enquiries are handled directly with resort management.
                  </p>
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={onOpenEnquiry}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-butter-400 px-6 py-3.5 text-xs uppercase tracking-wider font-bold text-ink-primary hover:bg-butter-300 transition-all shadow-md cursor-pointer border border-butter-500/20"
                  >
                    <span>Enquire For Rooms</span>
                    <Sparkles className="size-3.5" />
                  </button>

                  <Link
                    to="/rooms"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-ink-primary/15 px-6 py-3.5 text-xs uppercase tracking-wider font-semibold text-ink-primary hover:bg-ink-primary hover:text-white transition-all"
                  >
                    <span>Details</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
