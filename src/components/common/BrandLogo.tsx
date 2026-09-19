import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  isLight?: boolean;
  compact?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  isLight = false,
  compact = false,
}) => {
  return (
    <Link 
      to="/" 
      className={`group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      aria-label="Coorg Laya Resort — Home"
    >
      {/* Logo Badge */}
      <div className={`relative flex ${compact ? 'size-8 rounded-full' : 'size-11 rounded-2xl'} items-center justify-center overflow-hidden p-0.5 bg-white shadow-sm border border-[#E4D9C8]`}>
        <img 
          src="/images/logo/LayaLogo.jpeg" 
          alt="Laya Logo" 
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>

      <div className="flex flex-col text-left">
        <span className={`font-serif ${compact ? 'text-sm' : 'text-base sm:text-lg'} font-bold tracking-tight leading-tight ${
          isLight ? 'text-white' : 'text-[#162926]'
        }`}>
          Coorg Laya
        </span>
        {!compact && (
          <span className={`text-[0.62rem] uppercase tracking-[0.2em] font-semibold ${
            isLight ? 'text-white/70' : 'text-[#1A96AA]'
          }`}>
            Resort & Nature Lawn
          </span>
        )}
      </div>
    </Link>
  );
};
