import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Waves, Smile, Activity, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resortData } from '../../data/resortData';

export const PerspectivePhotoDeck: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(resortData.amenities[0].id);

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col lg:flex-row gap-4 min-h-[540px]">
        {resortData.amenities.map((item) => {
          const isActive = activeId === item.id;
          return (
            <motion.div
              key={item.id}
              layout
              onClick={() => setActiveId(item.id)}
              onMouseEnter={() => setActiveId(item.id)}
              className={`relative cursor-pointer overflow-hidden rounded-3xl border transition-all duration-700 ${
                isActive
                  ? 'lg:flex-[3.5] border-[#c5a368] shadow-2xl shadow-blue-950/60 ring-1 ring-[#c5a368]/30'
                  : 'lg:flex-[1] border-white/10 hover:border-white/20'
              }`}
            >
              {/* Full-bleed Real Photo */}
              <img
                src={item.image}
                alt={item.imageAlt}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                  isActive ? 'scale-105 filter-none' : 'scale-100 filter brightness-50 contrast-110'
                }`}
              />

              {/* Anamorphic Blue Scrim */}
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  isActive
                    ? 'bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent'
                    : 'bg-[#030712]/70 hover:bg-[#030712]/50'
                }`}
              />

              {/* Cinema Card Content */}
              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8">
                {/* Top Number & Tag */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#dfc79e] bg-[#030712]/80 px-3 py-1 rounded-full border border-[#c5a368]/40 backdrop-blur-md">
                    {item.number}
                  </span>

                  {isActive && item.highlightTag && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[0.65rem] uppercase tracking-wider text-[#dfc79e] backdrop-blur-md"
                    >
                      <Sparkles className="size-3 text-[#c5a368]" />
                      <span>{item.highlightTag}</span>
                    </motion.span>
                  )}
                </div>

                {/* Bottom Details */}
                <div className="space-y-3">
                  <h3
                    className={`font-heading transition-all duration-300 text-white ${
                      isActive ? 'text-2xl sm:text-4xl' : 'text-lg'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4"
                    >
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light max-w-xl">
                        {item.description}
                      </p>

                      <div className="pt-2">
                        <Link
                          to="/amenities"
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#dfc79e] hover:text-white transition-colors"
                        >
                          <span>Explore Amenity Specs</span>
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
