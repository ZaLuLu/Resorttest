import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ExternalLink, ArrowUp, Feather } from 'lucide-react';
import { resortData } from '../../data/resortData';
import { BrandLogo } from '../common/BrandLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-ink-primary/8 bg-[#f5f2ea] text-ink-primary py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Main 4-Column Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo />
            <p className="text-xs text-ink-muted leading-relaxed max-w-sm font-light">
              {resortData.brand.subTagline} A peaceful nature sanctuary in Kushalnagar, Kodagu.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-3 py-1 text-[0.62rem] uppercase tracking-wider text-butter-700 font-semibold">
              <Feather className="size-3 text-butter-600" />
              <span>Wake Up to Birdsong</span>
            </div>
          </div>

          {/* Quick Directory Links */}
          <div className="lg:col-span-3">
            <span className="text-[0.68rem] uppercase tracking-[0.25em] font-semibold text-butter-700 block mb-4">
              Explore Sanctuary
            </span>
            <div className="grid grid-cols-2 gap-y-2.5 text-xs">
              {resortData.navLinks.slice(0, 8).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-ink-muted hover:text-ink-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="lg:col-span-3 space-y-2 text-xs text-ink-muted">
            <span className="text-[0.68rem] uppercase tracking-[0.25em] font-semibold text-butter-700 block mb-3">
              Resort Address
            </span>
            <p className="font-medium text-ink-primary">{resortData.contact.address.line1},</p>
            <p>{resortData.contact.address.line2},</p>
            <p>{resortData.contact.address.town} - {resortData.contact.address.pincode}, Kodagu</p>
            <a
              href={resortData.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[0.68rem] text-butter-700 hover:text-powder-700 hover:underline font-semibold uppercase tracking-wider pt-1"
            >
              Google Maps <ExternalLink className="size-3" />
            </a>
          </div>

          {/* Reservation Email */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <span className="text-[0.68rem] uppercase tracking-[0.25em] font-semibold text-butter-700 block">
              Reservation Email
            </span>
            <a
              href={`mailto:${resortData.contact.reservationEmail}`}
              className="font-medium text-ink-primary hover:text-butter-700 transition-colors break-all block"
            >
              {resortData.contact.reservationEmail}
            </a>
            <div className="rounded-2xl border border-powder-200 bg-powder-50/70 p-3 text-[0.68rem] text-ink-secondary">
              <span className="font-semibold text-powder-800 block">Direct Booking Support</span>
              15 Rooms (~45 Guests) · Lawns to ~500
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-ink-primary/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} Coorg Laya Resort. All verified rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-ink-primary transition-colors">
              Privacy Notice
            </Link>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-butter-700 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
