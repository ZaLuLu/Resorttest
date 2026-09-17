import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ClayImageProps {
  src: string;
  alt: string;
  aspectRatio?: '4:3' | '1:1' | '16:9' | '3:2' | '16:10' | 'auto';
  className?: string;
  priority?: boolean;
  clayVariant?: 'water' | 'sand' | 'neutral';
  overlayContent?: React.ReactNode;
  badge?: string;
}

export const ClayImage: React.FC<ClayImageProps> = ({
  src,
  alt,
  aspectRatio = '4:3',
  className = '',
  clayVariant = 'neutral',
  overlayContent,
  badge
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    '3:2': 'aspect-[3/2]',
    '16:10': 'aspect-[16/10]',
    'auto': '',
  }[aspectRatio];

  const borderVariant = {
    water: 'border-water-200/60 shadow-clay-sm',
    sand: 'border-sand-300/60 shadow-clay-sand',
    neutral: 'border-white/80 shadow-clay-sm',
  }[clayVariant];

  return (
    <div className={`relative overflow-hidden rounded-3xl border-2 ${borderVariant} bg-sand-100 ${aspectClass} ${className}`}>
      {/* Background Skeleton Loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-tr from-sand-200 via-water-100 to-sand-100 animate-pulse flex items-center justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-water-700/60">Loading Image...</span>
        </div>
      )}

      {/* Main Image */}
      {!hasError ? (
        <motion.img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      ) : (
        <div className="absolute inset-0 bg-sand-200 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-water-500/20 flex items-center justify-center text-water-700 mb-2">
            🏞️
          </div>
          <p className="text-xs font-medium text-riverbed-700">{alt}</p>
        </div>
      )}

      {/* Optional Top Badge */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-white/90 backdrop-blur-md text-water-800 shadow-clay-pill border border-white/80">
            {badge}
          </span>
        </div>
      )}

      {/* Subtle Inset Light Bevel Overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40" />

      {/* Optional Overlay Content */}
      {overlayContent && (
        <div className="absolute inset-0 bg-gradient-to-t from-riverbed-900/80 via-riverbed-900/20 to-transparent flex flex-col justify-end p-5 text-white">
          {overlayContent}
        </div>
      )}
    </div>
  );
};
export default ClayImage;
