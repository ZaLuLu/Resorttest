import React from 'react';
import { Sparkles } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { CinematicPhotoMosaic } from '../components/ui/CinematicPhotoMosaic';

interface GalleryPageProps {
  onOpenEnquiry: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="space-y-20 pb-28 text-ink-primary overflow-x-hidden">
      <PageHeader
        badge="GALLERY & PHOTOGRAPHY"
        title="Resort Gallery"
        description="Explore verified photographs of Coorg Laya Resort: architecture, swimming pool, room spaces, recreational courts, and garden terraces."
        actionText="Plan Your Stay"
        onActionClick={onOpenEnquiry}
        bgImage="https://coorglayaresort.com/_next/static/immutable/media/resort-exteriors.2bq9ym6x0i3uq.jpeg"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-butter-700">
            <Sparkles className="size-3.5 text-butter-600" />
            <span>Real Resort Imagery</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl text-ink-primary font-normal">
            A Visual Journey Through Coorg Laya
          </h2>
          <div className="mx-auto w-24 butter-divider my-3" />
          <p className="text-xs sm:text-sm text-ink-muted font-light">
            Click on any photograph to open the high-resolution lightbox view.
          </p>
        </div>

        {/* Filterable Cinematic Photo Mosaic with Lightbox */}
        <CinematicPhotoMosaic showFilters={true} />

        {/* Note on Authenticity */}
        <div className="rounded-3xl border border-ink-primary/8 bg-white p-6 text-center text-xs text-ink-muted font-light max-w-2xl mx-auto shadow-sm">
          <p>
            All published photographs depict actual facilities and grounds at Coorg Laya Resort. New categories and seasonal photographs will be updated periodically.
          </p>
        </div>
      </div>
    </div>
  );
};
