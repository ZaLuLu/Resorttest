import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, X, Compass, 
  MapPin, Clock, Mountain, ExternalLink, Navigation 
} from 'lucide-react';

export interface PostcardItem {
  id: string;
  image: string;
  title: string;
  badge: string;
  dist: string;
  elevation?: string;
  description: string;
  googleMapsUrl?: string;
}

interface FanOutCardDeckProps {
  cards: PostcardItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FanOutCardDeck: React.FC<FanOutCardDeckProps> = ({
  cards,
  title = 'Kodagu Sightseeing Postcard Collection',
  subtitle = 'Curated destinations within scenic driving distance of Coorg Laya Resort',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCard, setActiveCard] = useState<PostcardItem | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className={`relative flex flex-col items-center py-6 select-none ${className}`}>
      
      {/* Header */}
      <div className="text-center space-y-2 mb-8 max-w-2xl px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8DC] text-[#A3733E] border border-[#D5C7B2] text-[11px] font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>{title}</span>
        </div>
        <p className="text-xs sm:text-sm text-[#635546] font-medium">
          {subtitle}
        </p>
      </div>

      {/* Luxury Postcard Carousel Grid */}
      <div className="w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.slice(0, 6).map((card, idx) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={() => setActiveCard(card)}
              className="group rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 shadow-sm hover:shadow-md hover:border-[#A3733E]/50 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Postcard Photo */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Badge & Distance */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#132422]/90 text-white border border-white/20 backdrop-blur-md shadow-sm">
                      {card.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-bold">
                    <div className="flex items-center gap-1.5 bg-[#A3733E] px-2.5 py-1 rounded-full shadow-sm">
                      <MapPin className="w-3 h-3 text-white" />
                      <span>{card.dist}</span>
                    </div>
                    {card.elevation && (
                      <span className="bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm text-[10px] text-amber-300">
                        {card.elevation}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-[#132422] group-hover:text-[#A3733E] transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-xs text-[#344E4A] line-clamp-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* View Postcard Action */}
              <div className="pt-3 mt-3 border-t border-[#E4D9C8] flex items-center justify-between text-xs font-bold text-[#A3733E]">
                <span>View Destination</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Modal View (High-Res Lightbox) */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#132422]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 shadow-2xl space-y-4"
            >
              <button
                onClick={() => setActiveCard(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-[#132422] flex items-center justify-center shadow-md hover:bg-[#EFE8DC] transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                <img
                  src={activeCard.image}
                  alt={activeCard.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#132422]/90 text-white text-xs font-bold border border-white/20">
                  {activeCard.badge}
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#A3733E] text-white text-xs font-bold shadow-sm">
                  {activeCard.dist} from Coorg Laya Base
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#132422]">
                  {activeCard.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#344E4A] mt-2 leading-relaxed">
                  {activeCard.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E4D9C8] flex items-center justify-between">
                {activeCard.googleMapsUrl ? (
                  <a
                    href={activeCard.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#132422] hover:bg-[#1E3633] transition-colors flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                ) : (
                  <span className="text-xs font-bold text-[#A3733E]">Verified Kushalnagar Route</span>
                )}
                <button
                  onClick={() => setActiveCard(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#132422] bg-[#EFE8DC] hover:bg-[#E4D9C8] transition-colors cursor-pointer"
                >
                  Close Postcard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FanOutCardDeck;
