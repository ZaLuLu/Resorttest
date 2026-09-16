import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-28 text-ink-primary overflow-x-hidden">
      <div className="max-w-xl text-center space-y-6">
        <div className="mx-auto flex size-24 items-center justify-center rounded-3xl border border-butter-200 bg-butter-50 text-butter-700 shadow-md">
          <Compass className="size-12 text-butter-600 animate-spin-slow" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-butter-700 font-semibold block">
          404 · PATHWAY NOT FOUND
        </span>

        <h1 className="font-heading text-4xl sm:text-6xl text-ink-primary font-normal">
          Pathway Not Found
        </h1>

        <div className="mx-auto w-24 butter-divider my-3" />

        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
          The path you are looking for has drifted off the map. Let us guide you back to our serene resort grounds in Kodagu.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-7 py-3 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all shadow-md border border-butter-500/20"
          >
            <Home className="size-3.5" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 rounded-full border border-ink-primary/15 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-sand-50 transition-all"
          >
            <span>Explore Rooms</span>
            <ArrowRight className="size-3.5" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-ink-primary/15 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-sand-50 transition-all"
          >
            <span>Contact Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
