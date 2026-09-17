import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  isLight?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', isLight = false }) => {
  return (
    <Link 
      to="/" 
      className={`group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      aria-label="Coorg Laya Resort — Home"
    >
      {/* 3D Clay Logo Badge */}
      <div className="relative flex size-11 items-center justify-center rounded-2xl overflow-hidden p-0.5 bg-white shadow-clay-sm border border-sand-200">
        <img 
          src="/images/logo/LayaLogo.jpeg" 
          alt="Laya Logo" 
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => {
            // fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/60 pointer-events-none" />
      </div>

      <div className="flex flex-col text-left">
        <span className={`font-display text-base sm:text-lg font-bold tracking-tight leading-tight ${
          isLight ? 'text-white' : 'text-riverbed-900'
        }`}>
          Coorg Laya
        </span>
        <span className={`text-[0.62rem] uppercase tracking-[0.2em] font-semibold ${
          isLight ? 'text-water-200' : 'text-water-600'
        }`}>
          Resort & Nature Lawn
        </span>
      </div>
    </Link>
  );
};
