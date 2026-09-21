import React from 'react';
import { 
  Users, Sparkles, CheckCircle2, ArrowUpRight, Crown, 
  ShieldCheck, Zap, Utensils, Music, Calendar, Clock, MapPin
} from 'lucide-react';
import { EventsSection } from '../components/sections/EventsSection';
import { PageHeader } from '../components/common/PageHeader';
import { CinematicReveal } from '../components/common/CinematicReveal';
import { Clay3DCard } from '../components/3d/Clay3DCard';

interface EventsPageProps {
  onOpenEnquiry: () => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onOpenEnquiry }) => {
  const eventSpecs = [
    {
      title: '500-Guest Lawn Capacity',
      desc: 'Expansive manicured open lawn grounds accommodating up to 500 seated or floating guests.',
      icon: Users,
    },
    {
      title: '15 On-Site Guest Suites',
      desc: 'Direct on-site luxury accommodation for up to ~45 key VIPs, bride/groom families, or retreat hosts.',
      icon: Crown,
    },
    {
      title: 'Dedicated Catering & Live Food Bay',
      desc: 'Spacious preparation areas with water and power hookups for premium outside or estate caterers.',
      icon: Utensils,
    },
    {
      title: '100% Generator Power Backup',
      desc: 'Heavy-duty silent DG backup ensuring uninterrupted sound, stage lighting, and lawn illumination.',
      icon: Zap,
    },
    {
      title: 'Ample Private Parking',
      desc: 'Dedicated on-site parking bay accommodating over 40+ four-wheelers with security coordination.',
      icon: ShieldCheck,
    },
    {
      title: 'Palm Pool Cocktail Zone',
      desc: 'Adjoining circular pool deck ideal for sundowner cocktail parties, high tea, and photo opportunities.',
      icon: Sparkles,
    },
  ];

  const packages = [
    {
      name: 'Destination Wedding & Sangeet',
      tagline: 'Under the starlit Kodagu sky',
      capacity: 'Up to 500 Guests',
      features: [
        'Full 15-suite buyout for ~45 family members',
        'Mandap & stage lawn zoning',
        'Palm pool sundowner pre-wedding deck',
        'Festoon & tree ambient lighting support',
        'Bridal dressing suite with vanity',
      ],
      badge: 'Most Celebrated',
      variant: 'sand' as const,
    },
    {
      name: 'Milestone Birthdays & Anniversaries',
      tagline: 'Intimate celebrations with those who matter',
      capacity: '50 – 300 Guests',
      features: [
        'Open-air barbecue and banquet lawn',
        'Live acoustic sound setup allowance',
        'Kids trampoline & lawn games included',
        'Customized cake cutting on raised terraces',
        'Flexible overnight suite allocations',
      ],
      badge: 'Family Favorite',
      variant: 'water' as const,
    },
    {
      name: 'Corporate & Executive Offsites',
      tagline: 'Productive alignment in tranquil nature',
      capacity: '20 – 100 Delegates',
      features: [
        'High-speed fiber Wi-Fi across open lawns',
        'Quiet covered verandah breakout zones',
        'Team sports (badminton, pool volleyball)',
        'Fresh Coorg estate coffee all day',
        'Exclusive buyout privacy guaranteed',
      ],
      badge: 'Executive',
      variant: 'white' as const,
    },
  ];

  return (
    <div className="pt-24 pb-28 bg-[#FAF6EF] text-[#132422] space-y-20 select-none">
      
      {/* Page Header */}
      <PageHeader
        badge="Celebrations & Lawns"
        title="Events & Functions"
        description="From open-air weddings and milestone birthdays to family reunions and group retreats, Coorg Laya Resort provides expansive lawns for up to 500 guests."
        actionText="Enquire Event Dates"
        onActionClick={onOpenEnquiry}
        bgImage="/images/concepts/events/decorated-outdoor-lawn-concept.png"
      />

      {/* Main Interactive Events Section */}
      <EventsSection onOpenEnquiry={onOpenEnquiry} />

      {/* 500-Capacity Lawn Infrastructure Blueprint */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <CinematicReveal className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#A3733E]" />
            <span className="tracking-wide uppercase">Venue Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#132422] font-display leading-tight heading-balance">
            Built for Flawless Grand Occasions
          </h2>
          <p className="text-sm text-[#2C413E] font-normal leading-relaxed prose-pretty">
            Our expansive outdoor venue in Kushalnagar combines scenic Western Ghats natural beauty with robust electrical, catering, and guest accommodation facilities.
          </p>
        </CinematicReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventSpecs.map((spec, idx) => {
            const IconComp = spec.icon;
            return (
              <CinematicReveal key={idx} delay={idx * 0.08}>
                <div className="p-6 rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] space-y-3 shadow-sm hover:shadow-md transition-all h-full">
                  <div className="w-10 h-10 rounded-2xl bg-[#FAF6EF] border border-[#D5C7B2] text-[#137586] flex items-center justify-center shadow-sm">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#132422]">
                    {spec.title}
                  </h3>
                  <p className="text-xs text-[#2C413E] font-normal leading-relaxed prose-pretty">
                    {spec.desc}
                  </p>
                </div>
              </CinematicReveal>
            );
          })}
        </div>
      </div>

      {/* Event Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <CinematicReveal className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Calendar className="w-4 h-4 text-[#A3733E]" />
            <span className="tracking-wide uppercase">Curated Formats</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#132422] font-display heading-balance leading-tight">
            Celebration Packages
          </h2>
        </CinematicReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <CinematicReveal key={idx} delay={idx * 0.12}>
              <Clay3DCard
                variant={pkg.variant}
                maxTilt={8}
                glareOpacity={0.25}
                className="p-6 sm:p-8 h-full flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#137586] border border-[#D5C7B2] shadow-sm">
                      {pkg.badge}
                    </span>
                    <span className="text-xs font-bold text-[#A3733E]">
                      {pkg.capacity}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#132422]">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#A3733E] font-bold tracking-wide">
                    {pkg.tagline}
                  </p>

                  <ul className="space-y-2.5 pt-3 border-t border-[#E4D9C8]">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-[#2C413E] font-normal flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#137586] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E4D9C8]">
                  <button
                    onClick={onOpenEnquiry}
                    className="w-full py-3.5 rounded-full text-xs font-bold tracking-wide uppercase text-white bg-[#137586] hover:bg-[#0F5E6C] shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Check Date Availability</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </Clay3DCard>
            </CinematicReveal>
          ))}
        </div>
      </div>

    </div>
  );
};

export default EventsPage;
