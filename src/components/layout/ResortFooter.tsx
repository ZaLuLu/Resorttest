import React from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { Mail, MapPin, Compass, ArrowUp, Phone, ShieldCheck, Instagram, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResortFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const INSTAGRAM_URL = 'https://www.instagram.com/p/Ddb0dXLBLPa/?stkn=MTd0ZzN2dGZzOTZrdQ==';
  const WHATSAPP_URL = 'https://wa.me/917411695533?text=Hi%20Coorg%20Laya%20Resort%2C%20I%20would%20like%20to%20enquire%20about%20booking%20a%20stay.';

  return (
    <footer className="relative w-full bg-[#FAF6EF] text-[#132422] border-t border-[#E4D9C8] pt-16 pb-12 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Clay Surface Top Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#E4D9C8]">
          <BrandLogo isLight={false} />

          {/* Social & Top Button Group */}
          <div className="flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white border border-[#E4D9C8] hover:border-[#A3733E] text-[#132422] hover:text-[#A3733E] text-xs font-bold flex items-center gap-2 shadow-sm hover:scale-105 transition-all"
            >
              <Instagram className="w-4 h-4 text-[#A3733E]" />
              <span>Instagram</span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#E8F8EE] border border-[#BDE5C8] hover:border-[#25D366] text-[#1E7E34] text-xs font-bold flex items-center gap-2 shadow-sm hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={scrollToTop}
              className="clay-pill px-4 py-2 flex items-center gap-1.5 text-xs font-bold text-[#116B7B] hover:text-[#0D5764] hover:bg-white transition-all cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>

        {/* 4-Column Footprint */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-[#2C413E]">
          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#132422]">Coorg Laya Resort</h4>
            <p className="leading-relaxed text-[#2C413E] font-normal prose-pretty">
              15 private living suites and a 500-guest scenic celebration lawn nestled among misty hills and fresh waterways in Kushalnagar, Kodagu.
            </p>
            <div className="pt-2 text-xs font-mono font-bold text-[#137586]">
              Direct Desk: +91 7411695533
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#132422]">Leisure & Water</h4>
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#137586]" />
                <span className="text-[#2C413E]">Palm-Framed Swimming Pool</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#137586]" />
                <span className="text-[#2C413E]">Kids Trampoline & Lawn Area</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#137586]" />
                <span className="text-[#2C413E]">Lawn Badminton & Volleyball</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#137586]" />
                <span className="text-[#2C413E]">Garden Terraces & Stargazing</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#132422]">Celebrations</h4>
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#A3733E]" />
                <span className="text-[#2C413E]">Open-Air Weddings (500 Guests)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#A3733E]" />
                <span className="text-[#2C413E]">Milestone Birthdays & Reunions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#A3733E]" />
                <span className="text-[#2C413E]">Corporate Nature Offsites</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#A3733E]" />
                <span className="text-[#2C413E]">Family Weekend Getaways</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-base font-bold text-[#132422]">Sanctuary Address</h4>
            <p className="leading-relaxed text-[#2C413E] font-normal prose-pretty">
              Teppadakandi, Siddapura Main Road, Basavanahalli Village, Gudde Hosur Post, Kushalnagar - 571234, Kodagu, Karnataka.
            </p>
            <div className="pt-1 flex flex-wrap gap-3">
              <Link to="/privacy" className="text-[#137586] hover:underline font-bold">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link to="/terms" className="text-[#137586] hover:underline font-bold">
                Terms & Policies
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#E4D9C8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2C413E]">
          <span>© {new Date().getFullYear()} Coorg Laya Resort. All Rights Reserved.</span>
          <span className="text-[#137586] font-bold tracking-wide">Unhurried Days Under the Coorg Sun.</span>
        </div>
      </div>
    </footer>
  );
};
export default ResortFooter;
