import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, Feather } from 'lucide-react';
import { resortData } from '../../data/resortData';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <div className="mx-auto max-w-7xl">
        {/* Liquid Metal Outer Glowing Border Capsule */}
        <div className="relative group rounded-full p-[1.5px] overflow-hidden shadow-2xl transition-all duration-500">
          {/* Shifting Liquid Metal Border Animation */}
          <div
            className="absolute inset-[-100%] animate-marquee bg-[conic-gradient(from_0deg,#E8C547_0%,#38BDF8_25%,#FFFFFF_50%,#E8C547_75%,#38BDF8_100%)] opacity-70 group-hover:opacity-100 transition-opacity"
            style={{ animationDuration: '6s' }}
          />

          {/* Inner Frosted Glass Capsule */}
          <div
            className={`relative flex items-center justify-between rounded-full px-5 sm:px-8 py-2.5 transition-all duration-300 bg-white/95 text-ink-primary backdrop-blur-2xl ${
              isScrolled ? 'py-2 bg-white/98 shadow-lg' : ''
            }`}
          >
            {/* Brand Monogram & Title */}
            <BrandLogo />

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
              {resortData.navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`transition-colors py-1 relative ${
                      isActive
                        ? 'text-butter-700 font-bold'
                        : 'text-ink-primary/70 hover:text-ink-primary'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-butter-400 via-powder-400 to-butter-400 rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Enquire CTA with Liquid Metallic Sheen */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenEnquiry}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-butter-300 via-butter-400 to-butter-500 px-5 py-2 text-xs font-bold uppercase tracking-wider text-ink-primary hover:from-butter-200 hover:to-butter-400 transition-all duration-300 shadow-md cursor-pointer border border-butter-200"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="size-3.5" />
              </motion.button>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex size-9 items-center justify-center rounded-full border border-ink-primary/15 text-ink-primary hover:bg-black/5 transition-colors xl:hidden cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden mt-2 mx-auto max-w-lg rounded-3xl border border-ink-primary/12 bg-white/98 p-6 backdrop-blur-2xl shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2 mb-5">
              {resortData.navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`rounded-2xl p-3 text-xs uppercase tracking-wider font-semibold transition-all ${
                      isActive
                        ? 'bg-ink-primary text-butter-200 font-bold shadow-sm'
                        : 'bg-sand-50 text-ink-primary hover:bg-butter-50 border border-ink-primary/5'
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
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-butter-300 via-butter-400 to-butter-500 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-primary hover:from-butter-200 hover:to-butter-400 transition-all shadow-md cursor-pointer border border-butter-300"
            >
              <Sparkles className="size-4" />
              <span>Enquire About Stay / Events</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
