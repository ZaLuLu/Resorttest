import React from 'react';
import { Feather, Trees, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import { resortData } from '../data/resortData';
import { PageHeader } from '../components/common/PageHeader';

interface AboutPageProps {
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="space-y-24 pb-28 text-ink-primary overflow-x-hidden">
      <PageHeader
        badge="PHILOSOPHY & ETHOS"
        title="About Coorg Laya"
        description="A peaceful Kodagu retreat rooted in green landscapes, natural morning birdsong, and genuine hospitality."
        actionText="Connect With Us"
        onActionClick={onOpenEnquiry}
        bgImage="https://coorglayaresort.com/_next/static/immutable/media/covered-seating.14m2n6fnxsknf.jpeg"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Narrative & Photo Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-butter-700">
              <Sparkles className="size-3.5 text-butter-600" />
              <span>The Concept</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl text-ink-primary font-normal leading-tight">
              {resortData.philosophy.headline}
            </h2>
            <div className="w-24 butter-divider my-3" />
            <div className="space-y-4 text-xs sm:text-sm text-ink-secondary leading-relaxed font-light">
              {resortData.philosophy.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="relative overflow-hidden rounded-3xl border border-ink-primary/10 aspect-[4/3] shadow-md bg-sand-100">
              <img
                src="https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg"
                alt="Garden terrace and lawn at Coorg Laya Resort"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-heading text-xl text-white font-medium block">
                  Peaceful Garden Terraces
                </span>
                <span className="text-xs text-butter-200 font-light">
                  A tranquil Kodagu setting for slow mornings.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Guiding Principles */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-butter-700 font-semibold block">
              Guiding Principles
            </span>
            <h3 className="font-heading text-3xl sm:text-4xl text-ink-primary font-normal">
              The Coorg Laya Experience
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resortData.philosophy.corePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-ink-primary/8 bg-white p-8 space-y-4 hover:border-butter-400 transition-all duration-300 shadow-sm sleek-card"
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-butter-100 text-butter-700 border border-butter-200">
                  {idx === 0 ? (
                    <Feather className="size-6" />
                  ) : idx === 1 ? (
                    <Trees className="size-6" />
                  ) : (
                    <HeartHandshake className="size-6" />
                  )}
                </div>
                <h4 className="font-heading text-2xl text-ink-primary font-normal">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="rounded-3xl border border-butter-200 bg-gradient-to-br from-sand-100 via-white to-powder-50 p-8 sm:p-14 text-center space-y-5 shadow-lg">
          <Sparkles className="size-8 text-butter-600 mx-auto" />
          <h3 className="font-heading text-3xl sm:text-4xl text-ink-primary font-normal">
            Plan Your Getaway With Us
          </h3>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-ink-secondary font-light leading-relaxed">
            Whether visiting for a family vacation, weekend retreat, or outdoor event, we welcome you to experience Coorg Laya Resort.
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
