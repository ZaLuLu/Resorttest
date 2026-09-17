import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, Compass, ArrowRight } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';

export interface PostcardItem {
  id: string;
  image: string;
  title: string;
  badge: string;
  dist: string;
  description: string;
}

interface FanOutCardDeckProps {
  cards: PostcardItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FanOutCardDeck: React.FC<FanOutCardDeckProps> = ({
  cards,
  title = 'Kodagu Postcard Collection',
  subtitle = 'Hover or tap to fan out the cards',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeCard, setActiveCard] = useState<PostcardItem | null>(null);

  // 5 Fan Out Angles and Offsets
  const fanAngles = [-16, -8, 0, 8, 16];
  const fanX = [-110, -55, 0, 55, 110];
  const fanY = [15, 5, 0, 5, 15];

  return (
    <div className={`relative flex flex-col items-center py-10 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#116B7B]">
          {title}
        </span>
        <p className="text-xs text-[#635546] font-medium">
          {subtitle}
        </p>
      </div>

      {/* Fan Deck Stage */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-72 sm:w-80 h-96 sm:h-[420px] flex items-center justify-center cursor-pointer [perspective:1200px]"
      >
        {cards.slice(0, 5).map((card, idx) => {
          const rotateZ = isHovered ? fanAngles[idx] : (idx - 2) * 3;
          const translateX = isHovered ? fanX[idx] : (idx - 2) * 8;
          const translateY = isHovered ? fanY[idx] : (idx - 2) * 4;
          const zIndex = isHovered ? 10 + idx : 10 - Math.abs(idx - 2);

          return (
            <motion.div
              key={card.id}
              animate={{
                rotateZ,
                x: translateX,
                y: translateY,
                scale: isHovered ? 1 : 0.96,
              }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 20,
              }}
              onClick={() => setActiveCard(card)}
              style={{ zIndex }}
              className="absolute w-64 sm:w-72 h-80 sm:h-96 rounded-3xl overflow-hidden bg-[#FAF6EF] border-2 border-[#E4D9C8] p-3 shadow-[0_16px_36px_rgba(22,41,38,0.12),_inset_0_2px_4px_rgba(255,255,255,0.9)] hover:border-[#1A96AA] transition-colors"
            >
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#E8DFD1]">
                <ClayImage
                  src={card.image}
                  alt={card.title}
                  aspectRatio="4:3"
                  clayVariant="sand"
                  badge={card.badge}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-[#132422]/80 backdrop-blur-md text-white text-[10px] font-bold">
                  {card.dist}
                </div>
              </div>

              <div className="p-2 pt-3 space-y-1">
                <h4 className="font-serif text-sm font-bold text-[#132422] line-clamp-1">
                  {card.title}
                </h4>
                <p className="text-[11px] text-[#344E4A] line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Modal View */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#132422]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 shadow-2xl space-y-4"
            >
              <button
                onClick={() => setActiveCard(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#EFE8DC] text-[#132422] flex items-center justify-center shadow-sm hover:bg-[#E4D9C8] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                <img
                  src={activeCard.image}
                  alt={activeCard.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#132422]/80 text-[#FAF6EF] text-xs font-bold">
                  {activeCard.badge}
                </div>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#1A96AA] text-white text-xs font-bold">
                  {activeCard.dist} from Resort
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
                <span className="text-xs font-bold text-[#116B7B]">Direct Cab Assistance at Desk</span>
                <button
                  onClick={() => setActiveCard(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1A96AA] hover:bg-[#116B7B] transition-colors"
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
