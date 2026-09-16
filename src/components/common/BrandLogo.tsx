import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  return (
    <Link 
      to="/" 
      className={`group flex items-center gap-3 transition-opacity duration-300 hover:opacity-90 ${className}`}
      aria-label="Coorg Laya Resort — Home"
    >
      {/* Butter Yellow & Powder Blue Monogram Badge */}
      <div className="relative flex size-10 items-center justify-center rounded-full border border-butter-300 bg-gradient-to-br from-butter-100 to-powder-50 p-2 shadow-sm group-hover:border-butter-400 transition-colors">
        <span className="relative font-heading text-base font-bold italic tracking-tighter text-butter-700">
          CL
        </span>
      </div>

      <div className="flex flex-col text-left">
        <span className="font-heading text-base sm:text-lg font-medium tracking-[0.06em] uppercase text-ink-primary">
          Coorg Laya
        </span>
        <span className="text-[0.6rem] uppercase tracking-[0.32em] text-butter-700 font-semibold">
          Resort · Coorg
        </span>
      </div>
    </Link>
  );
};
