import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, BedDouble, Users, Waves, Sparkles, MapPin, CheckCircle, Trees, ShieldCheck } from 'lucide-react';
import { resortData } from '../data/resortData';
import { ImageCorridorHero } from '../components/ui/ImageCorridorHero';
import { DiagonalCardSlider } from '../components/ui/DiagonalCardSlider';
import { ScrollBendSection } from '../components/ui/ScrollBendSection';
import { InteractiveRoomDeck } from '../components/ui/InteractiveRoomDeck';
import { CinematicBirdsongSanctuary } from '../components/ui/CinematicBirdsongSanctuary';
import { CinematicAmenityShowcase } from '../components/ui/CinematicAmenityShowcase';
import { CinematicEventsShowcase } from '../components/ui/CinematicEventsShowcase';
import { CinematicNearbyExplorer } from '../components/ui/CinematicNearbyExplorer';

interface HomePageProps {
  onOpenEnquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-x-hidden">
      {/* CHAPTER 1: THE AWAKENING — 3D Image Corridor Hero with Liquid Metal LAYA Reveal */}
      <ImageCorridorHero onOpenEnquiry={onOpenEnquiry} />

      {/* CHAPTER 2: THE RHYTHM OF SPACE — Key Highlights Metric Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-xl border border-ink-primary/8 shadow-2xl">
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-sand-50/90 border border-ink-primary/5">
            <div className="size-11 rounded-xl bg-butter-100 flex items-center justify-center text-butter-700 shrink-0 shadow-sm">
              <BedDouble className="size-5" />
            </div>
            <div>
              <span className="block font-heading text-lg sm:text-xl font-bold text-ink-primary">15 Rooms</span>
              <span className="text-[0.68rem] uppercase tracking-wider text-ink-muted font-medium">~45 Overnight</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-sand-50/90 border border-ink-primary/5">
            <div className="size-11 rounded-xl bg-powder-100 flex items-center justify-center text-powder-700 shrink-0 shadow-sm">
              <Users className="size-5" />
            </div>
            <div>
              <span className="block font-heading text-lg sm:text-xl font-bold text-ink-primary">500 Lawn</span>
              <span className="text-[0.68rem] uppercase tracking-wider text-ink-muted font-medium">Outdoor Events</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-sand-50/90 border border-ink-primary/5">
            <div className="size-11 rounded-xl bg-butter-100 flex items-center justify-center text-butter-700 shrink-0 shadow-sm">
              <Waves className="size-5" />
            </div>
            <div>
              <span className="block font-heading text-lg sm:text-xl font-bold text-ink-primary">Pool & Lawn</span>
              <span className="text-[0.68rem] uppercase tracking-wider text-ink-muted font-medium">Recreation Area</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-sand-50/90 border border-ink-primary/5">
            <div className="size-11 rounded-xl bg-powder-100 flex items-center justify-center text-powder-700 shrink-0 shadow-sm">
              <MapPin className="size-5" />
            </div>
            <div>
              <span className="block font-heading text-lg sm:text-xl font-bold text-ink-primary">Kushalnagar</span>
              <span className="text-[0.68rem] uppercase tracking-wider text-ink-muted font-medium">Kodagu, Karnataka</span>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 2 (CONT): THE LAYA WAY — Editorial Story & Philosophy */}
      <section id="story" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-butter-700">
              <Sparkles className="size-3.5 text-butter-600" />
              <span>Chapter 2 · The Philosophy</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-ink-primary leading-[1.12]">
              A Kodagu stay with room to <em className="italic text-butter-700 font-normal">breathe.</em>
            </h2>

            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-light">
              Coorg Laya Resort is made for the kind of time that cannot be hurried: poolside afternoons, long lunches in the shade, children playing on wide lawns, and unhurried conversations that linger after sunset.
            </p>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
              Set in Kushalnagar, the resort brings together comfortable private accommodation for up to 45 guests, open celebration grounds for 500, and the calm natural rhythm of the Western Ghats countryside.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full bg-ink-primary px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-butter-200 hover:bg-butter-500 hover:text-ink-primary transition-all duration-300 shadow-md"
              >
                <span>Read Our Story</span>
                <ArrowUpRight className="size-4" />
              </Link>
              <Link
                to="/rooms"
                className="inline-flex items-center gap-2 rounded-full border border-ink-primary/20 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-primary hover:border-butter-400 hover:bg-butter-50 transition-all duration-300"
              >
                <span>Explore Accommodation</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-ink-primary/10">
              <img
                src="https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg"
                alt="Peaceful garden terrace and open grounds at Coorg Laya Resort"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-butter-300 block">
                    Sanctuary Grounds
                  </span>
                  <h4 className="font-heading text-xl sm:text-2xl font-medium">
                    Basavanahalli, Kushalnagar
                  </h4>
                </div>
                <div className="rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1.5 text-xs text-butter-200 font-semibold border border-white/20">
                  Verified Resort
                </div>
              </div>
            </div>

            {/* Floating verified badge card */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3 rounded-2xl bg-white/95 p-4 backdrop-blur-xl border border-ink-primary/10 shadow-xl max-w-xs">
              <div className="size-10 rounded-xl bg-powder-100 text-powder-700 flex items-center justify-center shrink-0">
                <Trees className="size-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-ink-primary block">Kodagu Countryside</span>
                <span className="text-ink-muted">Fresh mountain breeze & garden air</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 3: THE SANCTUARY IN MOTION — Diagonal Card Slider */}
      <DiagonalCardSlider onOpenEnquiry={onOpenEnquiry} />

      {/* CHAPTER 4: THE LIVING CANVAS — 3D Cylindrical Scroll-Bend Section */}
      <ScrollBendSection onOpenEnquiry={onOpenEnquiry} />

      {/* CHAPTER 5: THE MORNING SOUNDSCAPE — Cinematic Birdsong Sanctuary Experience */}
      <CinematicBirdsongSanctuary />

      {/* CHAPTER 6: THE PRIVATE QUARTERS — Interactive 3D Room Stack Deck */}
      <InteractiveRoomDeck onOpenEnquiry={onOpenEnquiry} />

      {/* CHAPTER 7: THE ACTIVE GROUNDS — Bento Amenities Showcase */}
      <CinematicAmenityShowcase />

      {/* CHAPTER 8: THE GRAND GATHERING — 500-Guest Outdoor Lawn & Celebrations Portal */}
      <CinematicEventsShowcase onOpenEnquiry={onOpenEnquiry} />

      {/* CHAPTER 9: THE SACRED CURRENTS — Nearby River Kaveri & Hanging Bridge Explorer */}
      <CinematicNearbyExplorer />

      {/* CHAPTER 10: THE INVITATION — Direct Reservation Desk */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-ink-primary/10 bg-gradient-to-br from-sand-100 via-white to-powder-50 p-8 sm:p-14 lg:p-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-butter-700">
                <ShieldCheck className="size-3.5 text-butter-600" />
                <span>Verified Direct Booking Desk</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl text-ink-primary font-normal leading-tight">
                Your peaceful Coorg retreat <br />
                <em className="italic font-normal text-butter-700">starts here.</em>
              </h2>

              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-2xl font-light">
                Whether planning a weekend family holiday across our 15 private rooms or an outdoor lawn celebration for up to 500 guests, our reservation team will gladly assist you.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-ink-secondary">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-butter-600" />
                  <span>15 Rooms (~45 Overnight Guests)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-powder-600" />
                  <span>500-Guest Outdoor Green Lawn</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-butter-600" />
                  <span>Swimming Pool & Kids Play Area</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={onOpenEnquiry}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-butter-300 via-butter-400 to-butter-500 py-4 px-8 text-xs font-bold uppercase tracking-wider text-ink-primary hover:from-butter-200 hover:to-butter-400 transition-all duration-300 shadow-md border border-butter-200 cursor-pointer"
              >
                <span>Request Availability</span>
                <ArrowUpRight className="size-4" />
              </button>

              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-ink-primary/15 bg-white py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-sand-50 transition-all duration-300"
              >
                <span>Contact Details & Map</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
