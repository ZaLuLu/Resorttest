import React from 'react';
import { PartyPopper, Users, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { resortData } from '../data/resortData';
import { PageHeader } from '../components/common/PageHeader';

interface EventsPageProps {
  onOpenEnquiry: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="space-y-24 pb-28 text-ink-primary overflow-x-hidden">
      <PageHeader
        badge="OUTDOOR CELEBRATIONS"
        title="Events at Coorg Laya"
        description="Spacious outdoor green lawns and serene open skies for birthdays, family reunions, and celebrations of up to 500 guests."
        actionText="Plan Your Event"
        onActionClick={onOpenEnquiry}
        bgImage="https://coorglayaresort.com/_next/static/immutable/media/garden-lawn.37ug0_wam9ctr.jpeg"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Capacity Indicator Banner */}
        <div className="rounded-3xl border border-butter-300 bg-gradient-to-br from-butter-50 via-white to-powder-50 p-8 sm:p-14 text-center space-y-4 shadow-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-butter-800">
            <Sparkles className="size-3.5 text-butter-600" />
            <span>Outdoor Lawn Capacity</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-6xl text-ink-primary font-normal">
            Up to ~500 Guests
          </h2>
          <div className="mx-auto w-32 butter-divider my-3" />
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-ink-secondary leading-relaxed font-light">
            Our open green lawns offer ample space for fresh-air gatherings, celebratory meals, and unhurried festivities with your guests in Kodagu.
          </p>
        </div>

        {/* Verified Event Types */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-butter-700 font-semibold block">
              Celebration Formats
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl text-ink-primary font-normal">
              Moments Worth Celebrating
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resortData.events.verifiedEventTypes.map((event) => (
              <div
                key={event.id}
                className="group rounded-3xl border border-ink-primary/8 bg-white p-8 space-y-4 hover:border-butter-400 transition-all duration-300 shadow-sm sleek-card"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-butter-100 text-butter-700 border border-butter-200 group-hover:scale-105 transition-transform">
                  <PartyPopper className="size-6" />
                </div>
                <div>
                  <h4 className="font-heading text-2xl text-ink-primary font-normal">
                    {event.name}
                  </h4>
                  <span className="text-xs text-butter-700 font-semibold block mt-1">
                    {event.tagline}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Panoramic Lawn Showcase */}
        <div className="rounded-3xl border border-ink-primary/8 bg-white p-6 sm:p-10 space-y-6 shadow-md sleek-card">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-butter-700 font-semibold block mb-1">
                Lawn Atmosphere
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl text-ink-primary font-normal">
                Open Green Event Grounds
              </h3>
            </div>

            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all shadow-sm border border-butter-500/20 cursor-pointer"
            >
              <span>Enquire for Event Dates</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="overflow-hidden rounded-2xl border border-ink-primary/8 aspect-[16/10] bg-sand-100">
              <img
                src="https://coorglayaresort.com/_next/static/immutable/media/garden-lawn.37ug0_wam9ctr.jpeg"
                alt="Open green lawn surrounded by palms and bamboo at Coorg Laya Resort"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-ink-primary/8 aspect-[16/10] bg-sand-100">
              <img
                src="https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg"
                alt="Garden terrace and lawn seating for events at Coorg Laya Resort"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
