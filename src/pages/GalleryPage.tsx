import React from 'react';
import { GallerySection } from '../components/sections/GallerySection';
import { PageHeader } from '../components/common/PageHeader';

interface GalleryPageProps {
  onOpenEnquiry: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="pt-24 sm:pt-28 pb-28 bg-[#FAF6EF] text-[#132422] space-y-16 select-none">
      <PageHeader
        badge="Photography & Views"
        title="Sanctuary Gallery"
        description="Explore authentic photos of our 15 suites, palm-shaded swimming pool, green badminton lawns, and open celebration grounds."
        actionText="Plan Your Visit"
        onActionClick={onOpenEnquiry}
        bgImage="/images/resort/garden-terrace.jpeg"
      />

      <GallerySection />
    </div>
  );
};

export default GalleryPage;
