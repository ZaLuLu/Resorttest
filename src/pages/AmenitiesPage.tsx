import React from 'react';
import { 
  Sparkles, ArrowUpRight, Waves, Clock, ShieldCheck, Sun, Smile, 
  Activity, CheckCircle2, Coffee, HeartHandshake, Eye
} from 'lucide-react';
import { AmenitiesSection } from '../components/sections/AmenitiesSection';
import { PageHeader } from '../components/common/PageHeader';
import { CinematicReveal } from '../components/common/CinematicReveal';
import { Clay3DCard } from '../components/3d/Clay3DCard';

interface AmenitiesPageProps {
  onOpenEnquiry: () => void;
}

export const AmenitiesPage: React.FC<AmenitiesPageProps> = ({ onOpenEnquiry }) => {
  const dailySchedule = [
    {
      time: '06:30 AM – 08:00 AM',
      title: 'Dawn Birdsong & Plantation Mist',
      location: 'Garden Pathways & Lawn Walkways',
      description: 'Awaken to the natural melody of Kodagu birds and fresh morning mountain dew across our manicured grounds.',
      icon: Sun,
    },
    {
      time: '08:00 AM – 10:30 AM',
      title: 'Estate Coffee on Raised Terraces',
      location: 'Garden View Terraces',
      description: 'Sip piping hot freshly brewed Coorg coffee on timber seating decks with gentle morning cross-breezes.',
      icon: Coffee,
    },
    {
      time: '11:00 AM – 03:00 PM',
      title: 'Midday Palm Pool & Shallow Lounging',
      location: 'Palm-Fringed Swimming Pool',
      description: 'Refresh under the tropical sun with circular shallow wading areas and shaded poolside recliners.',
      icon: Waves,
    },
    {
      time: '03:30 PM – 05:00 PM',
      title: 'Kids Jumping Arena & Soft Lawns',
      location: 'Kids Trampoline Ground',
      description: 'Safe, enclosed spring trampoline jumping and open grassy spaces for energetic outdoor play.',
      icon: Smile,
    },
    {
      time: '05:00 PM – 06:30 PM',
      title: 'Golden Hour Badminton & Volleyball',
      location: 'Bamboo Sheltered Grass Courts',
      description: 'Lively friendly rallies sheltered naturally by tall bamboo groves during the golden sunset hour.',
      icon: Activity,
    },
    {
      time: '07:30 PM – 10:00 PM',
      title: 'Starlit Evening Terraces & Conversations',
      location: 'Raised Terraces & Open Lawns',
      description: 'Unwind with family and friends beneath unpolluted night skies before our 10:00 PM quiet sanctuary hours.',
      icon: Sparkles,
    },
  ];

  const safetyStandards = [
    {
      title: 'Crystal Pool Filtration',
      desc: 'Automated continuous multi-stage filtration with clearly designated shallow family relaxation sections.',
    },
    {
      title: 'Enclosed Kids Trampoline',
      desc: 'Heavy-duty steel-sprung trampoline with full-perimeter mesh netting and shock-absorbing safety pads.',
    },
    {
      title: 'Maintained Sports Equipment',
      desc: 'Complimentary Yonex-style badminton racquets, shuttlecocks, and volleyballs available at the reception desk.',
    },
    {
      title: 'Pristine Lawn Grounds',
      desc: 'Daily lawn grooming and organic pest management ensuring a clean barefoot-safe grass environment.',
    },
  ];

  return (
    <div className="pt-24 pb-28 bg-[#FAF6EF] text-[#132422] space-y-20 select-none">
      
      {/* Page Header */}
      <PageHeader
        badge="Recreation & Wellness"
        title="Resort Amenities"
        description="Thoughtful recreational and relaxation facilities designed to bring families, friends, and groups closer together in Kodagu."
        actionText="Reserve Your Stay"
        onActionClick={onOpenEnquiry}
        bgImage="/images/amenities/swimming-pool.jpeg"
      />

      {/* Main Interactive Amenities Section (With Live Fluid Water Caustics) */}
      <AmenitiesSection />

      {/* Daily Sanctuary Time-Slot Experience Schedule */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <CinematicReveal className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Clock className="w-4 h-4 text-[#A3733E]" />
            <span>Curated Daily Rhythm</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#132422] font-serif leading-tight">
            A Day of Unhurried Delights
          </h2>
          <p className="text-sm text-[#344E4A] leading-relaxed">
            Follow the natural rhythm of the sun and mountain breezes across Coorg Laya's dedicated recreation zones.
          </p>
        </CinematicReveal>

        {/* 6-Card Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dailySchedule.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <CinematicReveal key={idx} delay={idx * 0.1}>
                <Clay3DCard
                  variant={idx % 2 === 0 ? 'white' : 'sand'}
                  maxTilt={8}
                  glareOpacity={0.2}
                  className="p-6 h-full flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold text-[#116B7B] bg-[#E5F3F5] border border-[#BCE2E7]">
                        {item.time}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-[#FAF6EF] border border-[#E4D9C8] flex items-center justify-center text-[#1A96AA]">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#132422] pt-1">
                      {item.title}
                    </h3>

                    <span className="text-xs font-bold text-[#A3733E] block">
                      📍 {item.location}
                    </span>

                    <p className="text-xs text-[#344E4A] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Clay3DCard>
              </CinematicReveal>
            );
          })}
        </div>
      </div>

      {/* Safety & Quality Verification Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CinematicReveal>
          <div className="rounded-3xl bg-[#EFE8DC] border border-[#DFD3C0] p-8 sm:p-12 space-y-8 shadow-sm">
            <div className="max-w-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#116B7B]">
                <ShieldCheck className="w-4 h-4 text-[#1A96AA]" />
                <span>Quality & Maintenance Guarantee</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#132422]">
                Maintained to the Highest Standards
              </h3>
              <p className="text-xs sm:text-sm text-[#344E4A]">
                We ensure that all our outdoor amenities are safe, hygienic, and ready for guests at all times.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {safetyStandards.map((std, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#FAF6EF] border border-[#E4D9C8] space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#132422]">
                    <CheckCircle2 className="w-4 h-4 text-[#1A96AA]" />
                    <span>{std.title}</span>
                  </div>
                  <p className="text-xs text-[#344E4A] leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CinematicReveal>
      </div>

      {/* Call to Action Banner */}
      <div className="max-w-4xl mx-auto px-4">
        <CinematicReveal>
          <div className="rounded-4xl bg-gradient-to-r from-[#1A96AA] to-[#116B7B] p-8 sm:p-12 text-center text-white space-y-5 shadow-xl">
            <h3 className="font-serif text-2xl sm:text-4xl font-extrabold">
              Uncomplicated Joy in Nature
            </h3>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-white/90 leading-relaxed">
              All recreational amenities — palm swimming pool, kids jumping trampoline, bamboo badminton court, volleyball lawn, and raised garden terraces — are dedicated exclusively to our resident guests.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenEnquiry}
                className="px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold text-[#132422] bg-[#FAF6EF] hover:bg-white shadow-lg transition-all inline-flex items-center gap-2"
              >
                <span>Check Availability for Your Dates</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CinematicReveal>
      </div>

    </div>
  );
};

export default AmenitiesPage;
