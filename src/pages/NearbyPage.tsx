import React from 'react';
import { MapPin, ExternalLink, Sparkles, Compass } from 'lucide-react';
import { resortData } from '../data/resortData';
import { PageHeader } from '../components/common/PageHeader';

interface NearbyPageProps {
  onOpenEnquiry: () => void;
}

export const NearbyPage: React.FC<NearbyPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="space-y-24 pb-28 text-ink-primary overflow-x-hidden">
      <PageHeader
        badge="LOCAL REGION & ATTRACTIONS"
        title="Discover What's Nearby"
        description="Experience the natural beauty of Kushalnagar and the Kodagu region, with the sacred River Kaveri and scenic suspension bridge located in the vicinity."
        actionText="Plan Your Visit"
        onActionClick={onOpenEnquiry}
        bgImage="https://coorglayaresort.com/_next/static/immutable/media/kaveri-river.1oewtgxod6v_h.png"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Verified Nearby Places Panoramic Grid */}
        <div className="space-y-16">
          {resortData.nearby.map((place, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={place.id}
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
                    src={place.image}
                    alt={place.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md border border-powder-200 px-3.5 py-1 text-xs text-powder-800 font-mono font-bold shadow-sm">
                    {place.number}
                  </div>
                </div>

                {/* Details */}
                <div
                  className={`lg:col-span-5 space-y-4 ${
                    isEven ? 'lg:col-start-1' : ''
                  }`}
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-powder-200 bg-powder-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-powder-700">
                    <Compass className="size-3.5 text-powder-600" />
                    <span>{place.category}</span>
                  </div>

                  <h3 className="font-heading text-3xl sm:text-4xl text-ink-primary font-normal">
                    {place.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-light">
                    {place.description}
                  </p>

                  <div className="rounded-2xl border border-ink-primary/5 bg-sand-50 p-4 text-[0.7rem] text-ink-muted italic">
                    {place.disclaimer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Location Orientation Card */}
        <div className="rounded-3xl border border-butter-200 bg-gradient-to-r from-sand-100 via-white to-powder-50 p-8 sm:p-14 text-center space-y-4 shadow-lg">
          <div className="size-12 rounded-2xl bg-butter-100 border border-butter-200 flex items-center justify-center text-butter-700 mx-auto">
            <MapPin className="size-6" />
          </div>
          <h3 className="font-heading text-3xl sm:text-4xl text-ink-primary font-normal">
            Located in Kushalnagar, Kodagu
          </h3>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-ink-secondary leading-relaxed font-light">
            Coorg Laya Resort is conveniently positioned on Siddapura Main Road, Basavanahalli Village, Gudde Hosur Post, Kushalnagar.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={resortData.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all shadow-md border border-butter-500/20"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
