import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const [showNavbar, setShowNavbar] = useState(!isHomepage);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (isHomepage) {
        // Hide navbar during 3D space scene, show once zoomed into resort (scrollY > 2400px)
        setShowNavbar(window.scrollY > 2400);
      } else {
        setShowNavbar(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  const navLinks = [
    { name: 'Resort', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Activities', path: '/activities' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Nearby', path: '/nearby' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-500 ease-out ${
        showNavbar ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-32 opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Floating Clay Pill Navbar with Pure Black Shadows */}
        <div
          className={`flex items-center justify-between rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300 bg-white/95 backdrop-blur-xl border-2 border-white shadow-[0_10px_32px_rgba(0,0,0,0.14)] ${
            isScrolled ? 'py-2 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.2)]' : ''
          }`}
        >
          {/* Brand Monogram & Title */}
          <Link to="/" className="flex items-center">
            <BrandLogo isLight={false} />
          </Link>

          {/* Desktop Navigation Links (Direct Subpage Routing) */}
          <nav className="hidden lg:flex items-center gap-1 text-[0.82rem] font-bold text-[#233835]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1A96AA] text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
                      : 'text-[#233835] hover:text-[#116B7B] hover:bg-[#E8F4F5] active:scale-95'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Replay Calligraphy Intro Button */}
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="px-3 py-1.5 rounded-full transition-all duration-200 text-[#A3733E] hover:text-[#132422] hover:bg-[#FAF6EF] flex items-center gap-1 font-semibold text-xs ml-1 cursor-pointer"
                title="Scroll to Top"
              >
                <Play className="w-3 h-3 text-[#A3733E]" />
                <span>Space Hero</span>
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
              className="clay-btn-water text-xs sm:text-sm !py-2.5 !px-6 shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
            >
              <span>Enquire & Reserve</span>
              <ArrowUpRight className="size-4" />
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex size-10 items-center justify-center rounded-full bg-[#FAF6EF] text-[#162926] border border-[#E0D7C8] shadow-[0_4px_10px_rgba(0,0,0,0.12)] hover:bg-[#E8F4F5] transition-colors lg:hidden cursor-pointer"
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
            className="lg:hidden mt-3 mx-auto max-w-md rounded-3xl border-2 border-white bg-white/98 p-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.28)] space-y-4"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`rounded-2xl p-3 text-xs font-bold text-center transition-all border active:scale-95 ${
                      isActive
                        ? 'bg-[#1A96AA] text-white border-[#1A96AA] shadow-[0_4px_12px_rgba(0,0,0,0.18)]'
                        : 'text-[#162926] bg-[#FAF6EF] hover:bg-[#E8F4F5] hover:text-[#116B7B] border-[#E0D7C8]'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {onReplayIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="w-full py-2.5 rounded-2xl bg-[#FAF6EF] border border-[#E0D7C8] text-xs font-bold text-[#A3733E] flex items-center justify-center gap-1.5 shadow-[0_4px_10px_rgba(0,0,0,0.08)] cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-[#A3733E]" />
                <span>Space Hero</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full clay-btn-sand text-sm font-bold shadow-[0_8px_20px_rgba(0,0,0,0.24)] cursor-pointer"
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
