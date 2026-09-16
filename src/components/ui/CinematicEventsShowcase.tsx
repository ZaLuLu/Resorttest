import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PartyPopper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resortData } from '../../data/resortData';

interface CinematicEventsShowcaseProps {
  onOpenEnquiry: () => void;
}

export const CinematicEventsShowcase: React.FC<CinematicEventsShowcaseProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-sand-50 border-b border-ink-primary/8 overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-ink-primary/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] font-semibold text-butter-700">
              <PartyPopper className="size-3.5 text-butter-600" />
              <span>Celebrations in Greenery</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink-primary font-normal">
              Moments Worth Celebrating
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
              Expansive green lawns and pure Kodagu hill air create a memorable backdrop for open-air functions and gatherings of up to approximately 500 guests.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-6 py-3.5 text-xs uppercase tracking-wider font-bold text-ink-primary hover:bg-butter-300 transition-all shadow-md cursor-pointer border border-butter-500/20"
            >
              <span>Enquire For Events</span>
              <Sparkles className="size-3.5" />
            </button>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 rounded-full border border-ink-primary/15 bg-white px-6 py-3.5 text-xs uppercase tracking-wider font-semibold text-ink-primary hover:bg-ink-primary hover:text-white transition-all"
            >
              <span>Details</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Feature Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Event Lawn Hero Image Frame */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-ink-primary/10 bg-white aspect-[16/11] shadow-xl group">
            <img
              src="https://coorglayaresort.com/_next/static/immutable/media/garden-lawn.37ug0_wam9ctr.jpeg"
              alt="Open event lawn surrounded by palm trees at Coorg Laya Resort"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <span className="text-[0.65rem] uppercase tracking-[0.25em] text-butter-300 font-semibold block mb-1">
                  Outdoor Gathering Spaces
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-medium">
                  Green Lawns for Up to 500 Guests
                </h3>
                <p className="text-xs text-white/80 max-w-md font-light mt-1">
                  Sheltered by natural bamboo borders, palm trees, and refreshing mountain breezes.
                </p>
              </div>

              <div className="rounded-2xl bg-white/20 border border-white/30 p-3.5 text-center backdrop-blur-md">
                <span className="text-xl font-heading font-bold text-butter-300 block leading-none">500</span>
                <span className="text-[0.6rem] uppercase tracking-wider text-white font-medium">Max Guests</span>
              </div>
            </div>
          </div>

          {/* Right: Verified Event Types Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3">
            {resortData.events.verifiedEventTypes.map((evt, idx) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group rounded-2xl bg-white p-5 border border-ink-primary/8 hover:border-butter-400 shadow-sm hover:shadow-md flex items-start gap-4 transition-all duration-300 cursor-pointer"
              >
                <div className="size-10 rounded-xl bg-butter-50 border border-butter-300 flex items-center justify-center shrink-0 text-butter-700 font-mono text-xs font-bold group-hover:bg-butter-300 group-hover:text-ink-primary transition-colors">
                  0{idx + 1}
                </div>

                <div className="space-y-1">
                  <h4 className="font-heading text-lg text-ink-primary font-medium group-hover:text-butter-700 transition-colors">
                    {evt.name}
                  </h4>
                  <p className="text-xs text-ink-muted font-light leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
