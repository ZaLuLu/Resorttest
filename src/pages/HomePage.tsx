import React from 'react';
import { EarthHeroScrollSection } from '../components/sections/EarthHeroScrollSection';
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
      {/* 1. CINEMATIC 3D EARTH TO COORG SCROLL-ZOOM HERO (Photorealistic Globe, Subcontinent Alignment & Block LAYA Reveal) */}
      <div id="hero-section" className="snap-section">
        <EarthHeroScrollSection onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 2. WELCOME / INTRO (Real Covered Lounge photo, 3D Clay Stat Cards) */}
      <div id="welcome-section" className="snap-section">
        <WelcomeSection />
      </div>

      {/* 3. FULL-VIEWPORT KINETIC FLOATING PARALLAX MOSAIC CANVAS */}
      <div id="mosaic-section" className="snap-section">
        <FloatingParallaxMosaic />
      </div>

      {/* 4. BIRDSONG & NATURE (3D Aesthetic Vinyl Record Player & Web Audio Synthesis) */}
      <div id="birdsong" className="snap-section">
        <BirdsongNatureSection />
      </div>

      {/* 5. ROOMS (15 Suites, 3D 180° Flip Inspection Cards) */}
      <div id="rooms-section" className="snap-section">
        <RoomsSection onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 6. AMENITIES (Real Swimming Pool Live Fluid Caustics, Trampoline, Badminton) */}
      <div id="amenities-section" className="snap-section">
        <AmenitiesSection />
      </div>

      {/* 7. ACTIVITIES (Drag-based Clay Horizontal Carousel) */}
      <div id="activities-section" className="snap-section">
        <ActivitiesSection />
      </div>

      {/* 8. EVENTS & FUNCTIONS (500-Guest Lawn Mandap Photo & Parallax) */}
      <div id="events-section" className="snap-section">
        <EventsSection onOpenEnquiry={onOpenEnquiry} />
      </div>

      {/* 9. GALLERY (3D Curved Cylinder Showcase & Category Filter Grid) */}
      <div id="gallery-section" className="snap-section">
        <GallerySection />
      </div>

      {/* 10. NEARBY (Real Tourism Radar Map, Live Kaveri Wave Caustics & Fan-Out Deck) */}
      <div id="nearby-section" className="snap-section">
        <NearbySection />
      </div>

      {/* 11. ABOUT (Real Outdoor Mural Photo & Ecology Philosophy) */}
      <div id="about-section" className="snap-section">
        <AboutSection />
      </div>

      {/* 12. CONTACT / ENQUIRY (Clay Input Form & Mailto Dispatcher) */}
      <div id="contact-section" className="snap-section">
        <ContactEnquirySection />
      </div>
    </div>
  );
};

export default HomePage;
