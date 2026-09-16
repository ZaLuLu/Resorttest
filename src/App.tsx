import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { EnquiryModal } from './components/common/EnquiryModal';
import { SanctuaryDock } from './components/ui/SanctuaryDock';

// Pages
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { AmenitiesPage } from './pages/AmenitiesPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { NearbyPage } from './pages/NearbyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const handleOpenEnquiry = () => {
    setIsEnquiryOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen flex flex-col bg-sand-50 text-ink-primary selection:bg-butter-300 selection:text-ink-primary font-sans antialiased">
        <Navbar onOpenEnquiry={handleOpenEnquiry} />

        <main id="main-content" className="flex-1" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/rooms" element={<RoomsPage onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/amenities" element={<AmenitiesPage onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/activities" element={<ActivitiesPage onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/events" element={<EventsPage onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/gallery" element={<GalleryPage onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/nearby" element={<NearbyPage onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/about" element={<AboutPage onOpenEnquiry={handleOpenEnquiry} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <SanctuaryDock onOpenEnquiry={handleOpenEnquiry} />

        <EnquiryModal isOpen={isEnquiryOpen} onClose={handleCloseEnquiry} />

        <Footer />
      </div>
    </Router>
  );
};

export default App;
