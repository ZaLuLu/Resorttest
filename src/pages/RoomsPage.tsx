import React from 'react';
import { Users, BedDouble, Trees, Sparkles, ShieldCheck, CheckCircle } from 'lucide-react';
import { resortData } from '../data/resortData';
import { PageHeader } from '../components/common/PageHeader';
import { StayExplorer } from '../components/ui/StayExplorer';

interface RoomsPageProps {
  onOpenEnquiry: () => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="space-y-24 pb-28 text-ink-primary overflow-x-hidden">
      <PageHeader
        badge="ACCOMMODATION & ROOMS"
        title="Stay at Coorg Laya"
        description="15 private guest rooms accommodating up to approximately 45 overnight guests amidst the peaceful mountain atmosphere and fresh gardens of Kodagu."
        actionText="Enquire for Availability"
        onActionClick={onOpenEnquiry}
        bgImage="https://coorglayaresort.com/_next/static/immutable/media/room-interior-neutral.0i73oyjwh6ntv.jpeg"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Scale Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-ink-primary/8 bg-white p-8 space-y-3 shadow-sm sleek-card">
            <div className="size-12 rounded-2xl bg-butter-100 border border-butter-200 flex items-center justify-center text-butter-700">
              <BedDouble className="size-6" />
            </div>
            <h3 className="font-heading text-2xl text-ink-primary font-medium">15 Private Rooms</h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
              Well-appointed rooms set within tranquil resort grounds, surrounded by fresh Kodagu breeze and natural gardens.
            </p>
          </div>

          <div className="rounded-3xl border border-ink-primary/8 bg-white p-8 space-y-3 shadow-sm sleek-card">
            <div className="size-12 rounded-2xl bg-powder-100 border border-powder-200 flex items-center justify-center text-powder-700">
              <Users className="size-6" />
            </div>
            <h3 className="font-heading text-2xl text-ink-primary font-medium">~45 Overnight Capacity</h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
              Comfortably accommodates up to approximately 45 overnight guests across families, extended relatives, and retreat groups.
            </p>
          </div>

          <div className="rounded-3xl border border-ink-primary/8 bg-white p-8 space-y-3 shadow-sm sleek-card">
            <div className="size-12 rounded-2xl bg-butter-100 border border-butter-200 flex items-center justify-center text-butter-700">
              <Trees className="size-6" />
            </div>
            <h3 className="font-heading text-2xl text-ink-primary font-medium">Lush Green Vistas</h3>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
              Every room opens up to peaceful morning atmospheres where birdsong and pure mountain air start each day.
            </p>
          </div>
        </div>

        {/* Real Room Interiors Dual Showcase */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-butter-700">
              <Sparkles className="size-3.5 text-butter-600" />
              <span>Verified Photography</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl text-ink-primary font-normal">
              Room Spaces & Interiors
            </h2>
            <div className="mx-auto w-24 butter-divider my-3" />
            <p className="text-xs sm:text-sm text-ink-muted font-light">
              Actual interior photography from Coorg Laya Resort rooms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group overflow-hidden rounded-3xl border border-ink-primary/8 bg-white p-6 space-y-4 shadow-sm sleek-card">
              <div className="relative overflow-hidden rounded-2xl aspect-[16/11] bg-sand-100">
                <img
                  src="https://coorglayaresort.com/_next/static/immutable/media/room-interior-neutral.0i73oyjwh6ntv.jpeg"
                  alt="Room with white bedding, olive accents, a wardrobe and a dressing mirror at Coorg Laya Resort"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-butter-800 border border-butter-200">
                  Room Interior 01
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[0.68rem] uppercase tracking-wider text-butter-700 font-semibold block">
                  Verified Resort Photo
                </span>
                <h3 className="font-heading text-2xl text-ink-primary font-medium">
                  Calm Olive Interior
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary font-light leading-relaxed">
                  Comfortable, clean interiors with wardrobes and vanity areas looking out to green resort grounds.
                </p>
              </div>
            </div>

            <div className="group overflow-hidden rounded-3xl border border-ink-primary/8 bg-white p-6 space-y-4 shadow-sm sleek-card">
              <div className="relative overflow-hidden rounded-2xl aspect-[16/11] bg-sand-100">
                <img
                  src="https://coorglayaresort.com/_next/static/immutable/media/room-interior-green.1pq4un8cgzr7r.jpeg"
                  alt="Room with a green patterned feature wall, wooden ceiling and comfortable bed at Coorg Laya Resort"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-powder-800 border border-powder-200">
                  Room Interior 02
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[0.68rem] uppercase tracking-wider text-powder-700 font-semibold block">
                  Verified Resort Photo
                </span>
                <h3 className="font-heading text-2xl text-ink-primary font-medium">
                  Emerald Accent Room
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary font-light leading-relaxed">
                  Inviting nature-inspired feature walls, warm timber roof accents, and relaxed mountain comfort.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Stay Capacity Slider */}
        <StayExplorer onOpenEnquiry={onOpenEnquiry} />

        {/* Verified Notice */}
        <div className="rounded-3xl border border-ink-primary/8 bg-white p-8 text-center text-xs text-ink-muted font-light max-w-3xl mx-auto space-y-2 shadow-sm">
          <ShieldCheck className="size-5 text-butter-600 mx-auto" />
          <p>
            Detailed room classification tariffs, bespoke bed configurations, and custom packages will be published as soon as officially verified. For direct room availability, please connect with our reservation desk.
          </p>
        </div>
      </div>
    </div>
  );
};
