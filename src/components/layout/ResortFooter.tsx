import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { Mail, MapPin, Compass, ArrowUp, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResortFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-sand-100/90 text-riverbed-800 border-t-2 border-white pt-16 pb-12 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Clay Surface Top Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-sand-300/40">
          <BrandLogo isLight={false} />

          <button
            onClick={scrollToTop}
            className="clay-pill px-5 py-2.5 flex items-center gap-2 text-xs font-bold text-water-700 hover:text-water-600 hover:bg-white transition-all cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="size-4" />
          </button>
        </div>

        {/* 4-Column Clay Footprint */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-riverbed-600">
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-riverbed-900">Coorg Laya Resort</h4>
            <p className="leading-relaxed text-riverbed-500 font-medium">
              15 private living suites and a 500-guest scenic celebration lawn nestled among misty hills and fresh waterways in Kushalnagar, Kodagu.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-riverbed-900">Leisure & Water</h4>
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-water-500" />
                <span>Palm-Framed Swimming Pool</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-water-500" />
                <span>Kids Trampoline & Lawn Area</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-water-500" />
                <span>Lawn Badminton & Volleyball</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-water-500" />
                <span>Garden Terraces & Stargazing</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-riverbed-900">Celebrations</h4>
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-sand-500" />
                <span>Open-Air Weddings (500 Guests)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-sand-500" />
                <span>Milestone Birthdays & Reunions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-sand-500" />
                <span>Corporate Nature Offsites</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-sand-500" />
                <span>Family Weekend Gateways</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-riverbed-900">Sanctuary Address</h4>
            <p className="leading-relaxed text-riverbed-500 font-medium">
              Teppadakandi, Siddapura Main Road, Basavanahalli Village, Gudde Hosur Post, Kushalnagar - 571234, Kodagu, Karnataka.
            </p>
            <div className="pt-1">
              <Link to="/privacy" className="text-water-600 hover:underline font-semibold">
                Privacy Policy & Guest Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-sand-300/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-riverbed-400">
          <span>© {new Date().getFullYear()} Coorg Laya Resort. All Rights Reserved.</span>
          <span className="text-water-600 font-semibold">Unhurried Days Under the Coorg Sun.</span>
        </div>
      </div>
    </footer>
  );
};
export default ResortFooter;
