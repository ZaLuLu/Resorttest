import React from 'react';
import { HeroCarouselSection } from '../components/sections/HeroCarouselSection';
import { WelcomeSection } from '../components/sections/WelcomeSection';
import { FloatingParallaxMosaic } from '../components/3d/FloatingParallaxMosaic';
import { BirdsongNatureSection } from '../components/sections/BirdsongNatureSection';
import { RoomsSection } from '../components/sections/RoomsSection';
import { AmenitiesSection } from '../components/sections/AmenitiesSection';
import { ActivitiesSection } from '../components/sections/ActivitiesSection';
import { EventsSection } from '../components/sections/EventsSection';
import { GallerySection } from '../components/sections/GallerySection';
import { NearbySection } from '../components/sections/NearbySection';
import { AboutSection } from '../components/sections/AboutSection';
import { ContactEnquirySection } from '../components/sections/ContactEnquirySection';

interface HomePageProps {
  onOpenEnquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="relative w-full bg-[#FAF6EF] text-[#132422] overflow-x-hidden select-none">
      {/* 1. HERO CAROUSEL (Real images, 3D Clay Frame, Auto-advance, Magnetic CTA) */}
      <HeroCarouselSection onOpenEnquiry={onOpenEnquiry} />

      {/* 2. WELCOME / INTRO (Real Covered Lounge photo, 3D Clay Stat Cards) */}
      <WelcomeSection />

      {/* 3. FULL-VIEWPORT KINETIC FLOATING PARALLAX MOSAIC CANVAS */}
      <FloatingParallaxMosaic />

      {/* 4. BIRDSONG & NATURE (3D Aesthetic Vinyl Record Player & Web Audio Synthesis) */}
      <div id="birdsong">
        <BirdsongNatureSection />
      </div>

      {/* 5. ROOMS (15 Suites, 3D 180° Flip Inspection Cards) */}
      <RoomsSection onOpenEnquiry={onOpenEnquiry} />

      {/* 6. AMENITIES (Real Swimming Pool Live Fluid Caustics, Trampoline, Badminton) */}
      <AmenitiesSection />

      {/* 7. ACTIVITIES (Drag-based Clay Horizontal Carousel) */}
      <ActivitiesSection />

      {/* 8. EVENTS & FUNCTIONS (500-Guest Lawn Mandap Photo & Parallax) */}
      <EventsSection onOpenEnquiry={onOpenEnquiry} />

      {/* 9. GALLERY (3D Curved Cylinder Showcase & Category Filter Grid) */}
      <GallerySection />

      {/* 10. NEARBY (Real Tourism Radar Map, Live Kaveri Wave Caustics & Fan-Out Deck) */}
      <NearbySection />

      {/* 11. ABOUT (Real Outdoor Mural Photo & Ecology Philosophy) */}
      <AboutSection />

      {/* 12. CONTACT / ENQUIRY (Clay Input Form & Mailto Dispatcher) */}
      <ContactEnquirySection />
    </div>
  );
};

export default HomePage;
