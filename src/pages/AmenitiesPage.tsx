import React from 'react';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { resortData } from '../data/resortData';
import { PageHeader } from '../components/common/PageHeader';

interface AmenitiesPageProps {
  onOpenEnquiry: () => void;
}

export const AmenitiesPage: React.FC<AmenitiesPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="space-y-24 pb-28 text-ink-primary overflow-x-hidden">
      <PageHeader
        badge="AMENITIES & FACILITIES"
        title="Resort Amenities"
        description="Thoughtful recreational and relaxation facilities designed to bring families, friends, and guests closer together in Coorg."
        actionText="Plan Your Visit"
        onActionClick={onOpenEnquiry}
        bgImage="https://coorglayaresort.com/_next/static/immutable/media/swimming-pool.3-bcab5o_i5-q.png"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Verified Amenities Detailed Grid */}
        <div className="space-y-16">
          {resortData.amenities.map((item, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center rounded-3xl border border-ink-primary/8 bg-white p-6 sm:p-12 shadow-sm sleek-card ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Photo */}
                <div
                  className={`lg:col-span-7 relative overflow-hidden rounded-2xl aspect-[16/10] shadow-md bg-sand-100 ${
                    isEven ? 'lg:col-start-6' : ''
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md border border-butter-200 px-3.5 py-1 text-xs text-butter-800 font-mono font-bold shadow-sm">
                    {item.number}
                  </div>
                </div>

                {/* Details */}
                <div
                  className={`lg:col-span-5 space-y-4 ${
                    isEven ? 'lg:col-start-1' : ''
                  }`}
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-butter-700">
                    <Sparkles className="size-3.5 text-butter-600" />
                    <span>{item.highlightTag}</span>
                  </div>

                  <h3 className="font-heading text-3xl sm:text-4xl text-ink-primary font-normal">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-light">
                    {item.description}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={onOpenEnquiry}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-butter-700 hover:text-powder-700 transition-colors cursor-pointer"
                    >
                      <span>Enquire About Facility Access</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet Recreation Callout */}
        <div className="rounded-3xl border border-ink-primary/10 bg-gradient-to-r from-sand-100 via-white to-powder-50 p-8 sm:p-14 text-center space-y-5 shadow-lg">
          <div className="size-12 rounded-2xl bg-butter-100 border border-butter-200 flex items-center justify-center text-butter-700 mx-auto">
            <Sparkles className="size-6" />
          </div>
          <h3 className="font-heading text-3xl sm:text-4xl text-ink-primary font-normal">
            Uncomplicated Joy in Nature
          </h3>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-ink-secondary leading-relaxed font-light">
            All recreational facilities are maintained on resort grounds for the exclusive enjoyment of resident guests and scheduled event attendees.
          </p>
          <div className="pt-3">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all shadow-md border border-butter-500/20 cursor-pointer"
            >
              <span>Enquire for Your Dates</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
