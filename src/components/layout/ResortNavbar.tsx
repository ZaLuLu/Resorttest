import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, Play } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { springTransition } from '../../utils/motionVariants';

interface ResortNavbarProps {
  onOpenEnquiry: () => void;
  onReplayIntro?: () => void;
}

export const ResortNavbar: React.FC<ResortNavbarProps> = ({ onOpenEnquiry, onReplayIntro }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Resort', href: '#hero-section' },
    { name: 'Nature & Birds', href: '#birdsong' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Activities', href: '#activities' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Map & Nearby', href: '#nearby' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300 pointer-events-auto">
      <div className="mx-auto max-w-7xl">
        {/* Floating Sand & Water Clay Pill Navbar */}
        <div
          className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300 bg-white/95 backdrop-blur-xl border-2 border-white shadow-[0_8px_30px_rgba(22,41,38,0.08)] ${
            isScrolled ? 'py-2 bg-white shadow-[0_12px_36px_rgba(22,41,38,0.12)]' : ''
          }`}
        >
          {/* Brand Monogram & Title */}
          <BrandLogo isLight={false} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-[0.82rem] font-bold text-[#233835]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-1.5 rounded-full transition-all duration-200 text-[#233835] hover:text-[#116B7B] hover:bg-[#E8F4F5] active:scale-95"
              >
                {link.name}
              </a>
            ))}

            {/* Optional Replay Calligraphy Intro Button */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="px-3 py-1.5 rounded-full transition-all duration-200 text-[#A3733E] hover:text-[#132422] hover:bg-[#FAF6EF] flex items-center gap-1 font-semibold text-xs ml-1"
                title="Replay Calligraphy Intro"
              >
                <Play className="w-3 h-3 text-[#A3733E]" />
                <span>Intro</span>
              </button>
            )}
          </nav>

          {/* Enquire CTA Button */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={springTransition}
              onClick={onOpenEnquiry}
              className="clay-btn-water text-xs sm:text-sm !py-2.5 !px-6 shadow-md"
            >
              <span>Enquire & Reserve</span>
              <ArrowUpRight className="size-4" />
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex size-10 items-center justify-center rounded-full bg-[#FAF6EF] text-[#162926] border border-[#E0D7C8] shadow-sm hover:bg-[#E8F4F5] transition-colors lg:hidden cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="size-5 text-[#162926]" /> : <Menu className="size-5 text-[#162926]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Spring-Driven Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={springTransition}
            className="lg:hidden mt-3 mx-auto max-w-md rounded-3xl border-2 border-white bg-white/98 p-5 backdrop-blur-2xl shadow-xl space-y-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="rounded-2xl p-3 text-xs font-bold text-[#162926] bg-[#FAF6EF] hover:bg-[#E8F4F5] hover:text-[#116B7B] transition-all border border-[#E0D7C8] text-center active:scale-95"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {onReplayIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="w-full py-2.5 rounded-2xl bg-[#FAF6EF] border border-[#E0D7C8] text-xs font-bold text-[#A3733E] flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 text-[#A3733E]" />
                <span>Replay Calligraphy Intro</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full clay-btn-sand text-sm font-bold shadow-md cursor-pointer"
            >
              <Sparkles className="size-4" />
              <span>Book Your Stay</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default ResortNavbar;
