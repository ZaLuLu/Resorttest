import React from 'react';
import { Sparkles, MapPin, Image, Feather, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resortData } from '../../data/resortData';

interface SanctuaryDockProps {
  onOpenEnquiry: () => void;
}

export const SanctuaryDock: React.FC<SanctuaryDockProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="fixed bottom-6 inset-x-0 z-30 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-ink-primary/90 p-2 shadow-2xl backdrop-blur-2xl ring-1 ring-black/30">
        {/* Birdsong Jump */}
        <a
          href="/#birdsong"
          className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.7rem] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Experience Birdsong"
        >
          <Feather className="size-3.5 text-butter-300" />
          <span className="hidden sm:inline">Birdsong</span>
        </a>

        {/* Gallery Jump */}
        <Link
          to="/gallery"
          className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.7rem] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="View Resort Gallery"
        >
          <Image className="size-3.5 text-powder-300" />
          <span className="hidden sm:inline">Gallery</span>
        </Link>

        {/* Location Maps */}
        <a
          href={resortData.contact.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.7rem] font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Google Maps Location"
        >
          <MapPin className="size-3.5 text-powder-300" />
          <span className="hidden sm:inline">Location</span>
        </a>

        <div className="h-4 w-px bg-white/15 mx-0.5" />

        {/* Quick Enquire Primary CTA */}
        <button
          onClick={onOpenEnquiry}
          className="inline-flex items-center gap-1.5 rounded-full bg-butter-400 px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all shadow-md cursor-pointer border border-butter-500/20"
        >
          <Sparkles className="size-3.5 text-ink-primary" />
          <span>Enquire</span>
          <ArrowUpRight className="size-3" />
        </button>
      </div>
    </div>
  );
};
