import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, ChevronDown } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { springTransition } from '../../utils/motionVariants';

interface ResortNavbarProps {
  onOpenEnquiry: () => void;
  onReplayIntro?: () => void;
}

export const ResortNavbar: React.FC<ResortNavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const [showNavbar, setShowNavbar] = useState(!isHomepage);

  useEffect(() => {
    // Reset initial visibility based on route
    if (isHomepage) {
      setShowNavbar(window.scrollY >= 2200);
    } else {
      setShowNavbar(true);
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // On homepage: hide until Earth zoom completes (~2200px)
      if (isHomepage) {
        if (currentScrollY < 2200) {
          setShowNavbar(false);
        } else {
          // After zoom into resort completes: hide on scroll down, reveal on scroll up
          if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
            setShowNavbar(false);
          } else if (lastScrollY - currentScrollY > 10) {
            setShowNavbar(true);
          }
        }
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomepage]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary desktop links (minimal, core)
  const primaryLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Activities', path: '/activities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  // Secondary links under "More"
  const secondaryLinks = [
    { name: 'Events & Lawns', path: '/events' },
    { name: 'Nearby Places', path: '/nearby' },
    { name: 'About Sanctuary', path: '/about' },
  ];

  // All links for mobile drawer
  const allNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Activities', path: '/activities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
    { name: 'Nearby', path: '/nearby' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isSecondaryActive = secondaryLinks.some((l) => location.pathname === l.path);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-2.5 sm:pt-3 transition-all duration-300 ease-out flex justify-center pointer-events-none ${
        showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      }`}
    >
      <div className="pointer-events-auto">
        {/* Streamlined Floating Pill Navbar */}
        <div
          className={`flex items-center gap-2 sm:gap-3 rounded-full px-3 sm:px-4 py-1.5 transition-all duration-200 bg-white/92 backdrop-blur-md border border-[#E4D9C8]/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] ${
            isScrolled ? 'bg-white/95 shadow-[0_6px_24px_rgba(0,0,0,0.1)]' : ''
          }`}
        >
          {/* Compact Brand Monogram */}
          <div className="shrink-0 pr-1">
            <BrandLogo compact={true} isLight={false} />
          </div>

          {/* Desktop Core Links */}
          <nav className="hidden md:flex items-center gap-0.5 text-[0.8rem] font-medium text-[#233835]">
            {primaryLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 py-1 rounded-full transition-colors ${
                    isActive
                      ? 'bg-[#1A96AA] text-white font-semibold'
                      : 'text-[#233835] hover:text-[#116B7B] hover:bg-[#F3EDE2]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* "More" Dropdown for secondary pages */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-2.5 py-1 rounded-full transition-colors inline-flex items-center gap-1 cursor-pointer ${
                  isSecondaryActive
                    ? 'bg-[#1A96AA] text-white font-semibold'
                    : 'text-[#233835] hover:text-[#116B7B] hover:bg-[#F3EDE2]'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`size-3 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {moreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-44 rounded-2xl border border-[#E4D9C8] bg-white/98 p-1.5 shadow-xl backdrop-blur-xl z-50 space-y-0.5"
                  >
                    {secondaryLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setMoreDropdownOpen(false)}
                          className={`block px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                            isActive
                              ? 'bg-[#1A96AA] text-white font-semibold'
                              : 'text-[#233835] hover:bg-[#F3EDE2] hover:text-[#116B7B]'
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 shrink-0 pl-1">
            {/* Book Now Pill */}
            <button
              onClick={onOpenEnquiry}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-[#132422] hover:bg-[#1A96AA] shadow-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book Stay</span>
              <ArrowUpRight className="size-3" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex size-7 items-center justify-center rounded-full bg-[#FAF6EF] text-[#162926] border border-[#E0D7C8] hover:bg-[#E8F4F5] transition-colors md:hidden cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="size-3.5 text-[#162926]" /> : <Menu className="size-3.5 text-[#162926]" />}
            </button>
          </div>
        </div>

        {/* Spring-Driven Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={springTransition}
              className="md:hidden mt-2 mx-auto max-w-xs rounded-2xl border border-[#E4D9C8] bg-white/98 p-3 backdrop-blur-xl shadow-xl space-y-2"
            >
              <div className="grid grid-cols-2 gap-1.5">
                {allNavLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`rounded-xl p-2 text-xs font-semibold text-center transition-all border ${
                        isActive
                          ? 'bg-[#1A96AA] text-white border-[#1A96AA]'
                          : 'text-[#162926] bg-[#FAF6EF] hover:bg-[#E8F4F5] border-[#E0D7C8]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-2 rounded-xl text-xs font-bold text-white bg-[#132422] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="size-3.5 text-[#D4AF37]" />
                <span>Book Your Stay</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default ResortNavbar;
