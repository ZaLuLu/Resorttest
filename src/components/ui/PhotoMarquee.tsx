import React from 'react';
import { resortData } from '../../data/resortData';

export const PhotoMarquee: React.FC = () => {
  const images = resortData.gallery;
  const doubleImages = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-navy-950 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-navy-950 to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max">
        {doubleImages.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="group relative h-48 sm:h-56 w-72 sm:w-80 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-navy-900/60 shadow-lg"
          >
            <img
              src={item.image}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-3 left-4 right-4 text-xs text-white transform translate-y-1 group-hover:translate-y-0 transition-transform">
              <span className="text-[0.65rem] uppercase tracking-wider text-brass-400 font-semibold block">
                {item.category}
              </span>
              <p className="font-heading font-medium truncate">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
