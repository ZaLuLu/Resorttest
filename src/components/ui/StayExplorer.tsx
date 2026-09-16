import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BedDouble, ArrowRight, Sparkles } from 'lucide-react';
import { resortData } from '../../data/resortData';

interface StayExplorerProps {
  onOpenEnquiry: () => void;
}

export const StayExplorer: React.FC<StayExplorerProps> = ({ onOpenEnquiry }) => {
  const [guestCount, setGuestCount] = useState<number>(12);

  // Calculate approximate rooms needed based on ~3 guests/room capacity (15 rooms total = 45 guests max)
  const roomsApprox = Math.min(15, Math.max(1, Math.ceil(guestCount / 3)));
  const isLargeGroup = guestCount > 25;
  const isFullResort = guestCount >= 40;

  return (
    <div className="relative rounded-3xl border border-ink-primary/10 bg-white p-6 sm:p-10 shadow-xl overflow-hidden sleek-card">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Overview Copy */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-butter-700">
            <Sparkles className="size-3.5 text-butter-600" />
            <span>Accommodation & Scale</span>
          </div>
          <h3 className="font-heading text-3xl sm:text-4xl text-ink-primary font-normal">
            {resortData.accommodation.headline}
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
            {resortData.accommodation.description}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="rounded-2xl border border-ink-primary/8 bg-sand-50 p-4">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-butter-700 block">
                {resortData.accommodation.totalRooms}
              </span>
              <span className="text-[0.68rem] uppercase tracking-wider text-ink-muted font-semibold">
                Private Rooms
              </span>
            </div>

            <div className="rounded-2xl border border-ink-primary/8 bg-sand-50 p-4">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-powder-700 block">
                ~{resortData.accommodation.maxGuestsApprox}
              </span>
              <span className="text-[0.68rem] uppercase tracking-wider text-ink-muted font-semibold">
                Overnight Guests
              </span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Capacity Simulator */}
        <div className="lg:col-span-6 rounded-2xl border border-butter-200 bg-sand-50/70 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-butter-700" />
              <span className="text-xs uppercase tracking-wider font-semibold text-ink-primary">
                Group Scale Estimator
              </span>
            </div>
            <span className="text-xs font-mono text-butter-700 font-bold bg-butter-100 px-3 py-1 rounded-full border border-butter-200">
              {guestCount} Guests
            </span>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="45"
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full h-2 rounded-lg bg-sand-200 accent-butter-500 cursor-pointer"
            />
            <div className="flex justify-between text-[0.65rem] text-ink-muted font-mono">
              <span>1 Guest</span>
              <span>20 Guests</span>
              <span>45 Guests (Max Stay)</span>
            </div>
          </div>

          {/* Dynamic Feedback Box */}
          <div className="rounded-xl border border-ink-primary/8 bg-white p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-ink-primary font-medium">
              <BedDouble className="size-4 text-butter-600" />
              <span>
                Estimated room requirement:{' '}
                <strong className="text-butter-700">{roomsApprox} of 15 rooms</strong>
              </span>
            </div>

            <p className="text-[0.72rem] text-ink-muted leading-relaxed font-light">
              {isFullResort
                ? 'Ideal for exclusive full-property private buyouts and extended family get-togethers.'
                : isLargeGroup
                ? 'Great capacity for private family gatherings and group retreats.'
                : 'Ideal for relaxed family holidays and quiet couple retreats.'}
            </p>
          </div>

          {/* Action */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[0.68rem] text-ink-muted">
              Need custom arrangements?
            </span>
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-butter-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all shadow-md border border-butter-500/20 cursor-pointer"
            >
              <span>Enquire for {guestCount} Guests</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
