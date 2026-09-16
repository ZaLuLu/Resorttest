import React from 'react';
import { Waves, Smile, Sparkles, Activity, Flame, ArrowRight } from 'lucide-react';
import { resortData } from '../data/resortData';
import { PageHeader } from '../components/common/PageHeader';

interface ActivitiesPageProps {
  onOpenEnquiry: () => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ onOpenEnquiry }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Waves: <Waves className="size-6 text-powder-600" />,
    Smile: <Smile className="size-6 text-butter-600" />,
    Sparkles: <Sparkles className="size-6 text-butter-700" />,
    Activity: <Activity className="size-6 text-emerald-600" />,
    Flame: <Flame className="size-6 text-amber-600" />,
  };

  return (
    <div className="space-y-24 pb-28 text-ink-primary overflow-x-hidden">
      <PageHeader
        badge="OUTDOOR & RECREATION"
        title="Resort Activities"
        description="Fill your days with relaxing swims, energizing matches, and carefree outdoor moments beneath the clear Kodagu sky."
        actionText="Plan Activities"
        onActionClick={onOpenEnquiry}
        bgImage="https://coorglayaresort.com/_next/static/immutable/media/badminton-court.0iu28t8sxg-vh.png"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resortData.activities.map((act) => (
            <div
              key={act.id}
              className="group relative overflow-hidden rounded-3xl border border-ink-primary/8 bg-white p-6 space-y-6 hover:border-butter-400 transition-all duration-300 shadow-sm sleek-card"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[16/10] bg-sand-100">
                <img
                  src={act.image}
                  alt={act.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 border border-ink-primary/10 px-3.5 py-1 font-mono text-xs text-ink-primary font-bold backdrop-blur-md shadow-sm">
                  {act.number}
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-sand-50 border border-ink-primary/5 flex items-center justify-center shrink-0">
                    {iconMap[act.iconName]}
                  </div>
                  <h3 className="font-heading text-2xl text-ink-primary font-normal">
                    {act.title}
                  </h3>
                </div>
                <span className="text-xs text-butter-700 font-semibold block">
                  {act.tagline}
                </span>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="rounded-3xl border border-ink-primary/10 bg-gradient-to-r from-sand-100 via-white to-powder-50 p-8 sm:p-14 text-center space-y-5 shadow-lg">
          <h3 className="font-heading text-3xl sm:text-4xl text-ink-primary font-normal">
            Ready to Spend Relaxed Days in Coorg?
          </h3>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-ink-secondary font-light leading-relaxed">
            All recreational activities are available on resort grounds for staying guests. Book your group getaway or family holiday today.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all shadow-md border border-butter-500/20 cursor-pointer"
            >
              <span>Enquire About Your Stay</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
