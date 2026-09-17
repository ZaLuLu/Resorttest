import React from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';

export interface ImagePlaceholderProps {
  ratio: '4:3' | '1:1';
  label: string;
  className?: string;
  alt?: string;
  dark?: boolean;
  onClick?: () => void;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  ratio,
  label,
  className = '',
  alt,
  dark = false,
  onClick,
}) => {
  const aspectClass = ratio === '4:3' ? 'aspect-[4/3]' : 'aspect-square';

  return (
    <div
      onClick={onClick}
      className={`relative w-full ${aspectClass} overflow-hidden rounded-xl sm:rounded-2xl border transition-all duration-500 group select-none ${
        dark
          ? 'border-[#B89355]/20 bg-gradient-to-br from-[#0E2A20] via-[#163A2B] to-[#0A1F17] shadow-[0_12px_30px_rgba(10,31,23,0.5)]'
          : 'border-[#163A2B]/10 bg-gradient-to-br from-[#F7F3EA] via-[#FCFAF5] to-[#EDE7D9] shadow-[0_10px_25px_rgba(22,58,43,0.06)]'
      } ${className}`}
      role="img"
      aria-label={alt || label}
    >
      {/* Organic Subtle Grain / Texture Lines */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#163A2B_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

      {/* Decorative Botanical Corner Accents in Antique Gold */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#B89355]/40 transition-all duration-300 group-hover:scale-110 group-hover:border-[#B89355]" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#B89355]/40 transition-all duration-300 group-hover:scale-110 group-hover:border-[#B89355]" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#B89355]/40 transition-all duration-300 group-hover:scale-110 group-hover:border-[#B89355]" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#B89355]/40 transition-all duration-300 group-hover:scale-110 group-hover:border-[#B89355]" />

      {/* Center Label & Icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-2">
        <div
          className={`size-10 sm:size-12 rounded-full flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 ${
            dark
              ? 'bg-[#163A2B]/80 border-[#B89355]/40 text-[#B89355]'
              : 'bg-white/80 border-[#B89355]/30 text-[#163A2B] shadow-sm'
          }`}
        >
          <Camera className="size-4 sm:size-5" />
        </div>

        <div className="space-y-0.5">
          <span
            className={`block font-mono text-[0.68rem] sm:text-xs font-semibold tracking-widest uppercase transition-colors ${
              dark ? 'text-[#B89355]' : 'text-[#163A2B]'
            }`}
          >
            {label}
          </span>
          <span
            className={`block text-[0.6rem] sm:text-[0.65rem] font-sans tracking-wide ${
              dark ? 'text-[#F7F3EA]/60' : 'text-[#696D66]'
            }`}
          >
            Aspect Ratio: {ratio}
          </span>
        </div>
      </div>
    </div>
  );
};
