import React, { useState } from 'react';
import { 
  BedDouble, Users, Trees, ShieldCheck, ArrowUpRight, Sparkles, 
  Maximize2, Eye, Bed, Coffee, CheckCircle2, ChevronDown, ChevronUp, Crown
} from 'lucide-react';
import { RoomsSection } from '../components/sections/RoomsSection';
import { PageHeader } from '../components/common/PageHeader';
import { CinematicReveal } from '../components/common/CinematicReveal';

interface RoomsPageProps {
  onOpenEnquiry: () => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onOpenEnquiry }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const comparisonRows = [
    {
      feature: 'Suite Living Area',
      olive: '380 sq.ft',
      emerald: '420 sq.ft',
      family: '480 sq.ft',
      verandah: '450 sq.ft',
    },
    {
      feature: 'Bed Configuration',
      olive: 'King Plush + Daybed',
      emerald: 'Custom King Timber Bed',
      family: 'Twin Queen Beds',
      verandah: 'King Bed + Lounge Sofas',
    },
    {
      feature: 'Max Guests Capacity',
      olive: 'Up to 3 Guests',
      emerald: 'Up to 3 Guests',
      family: 'Up to 4 Guests',
      verandah: 'Up to 3 Guests',
    },
    {
      feature: 'Window View Orientation',
      olive: 'Lush Garden Vista',
      emerald: 'Coffee Plantation View',
      family: 'Open Lawn & Pool Vista',
      verandah: 'Shaded Palm Walkway',
    },
    {
      feature: 'Private En-Suite Bath',
      olive: 'Hot Rainshower & Vanity',
      emerald: 'Forest Bath Rainshower',
      family: 'Spacious Dual Vanity Bath',
      verandah: 'Acoustic Rainshower Bath',
    },
    {
      feature: 'Estate Breakfast Included',
      olive: 'Yes (Included)',
      emerald: 'Yes (Included)',
      family: 'Yes (Included)',
      verandah: 'Yes (Included)',
    },
    {
      feature: 'Starting Tariff / Night',
      olive: '₹4,500 + tax',
      emerald: '₹5,200 + tax',
      family: '₹6,000 + tax',
      verandah: '₹5,600 + tax',
    },
  ];

  const faqs = [
    {
      q: 'What are the official check-in and check-out times?',
      a: 'Check-in begins at 1:00 PM to ensure our housekeeping team meticulously sanitizes and prepares your suite. Check-out is by 11:00 AM. Early check-in or late check-out can be requested subject to suite availability.',
    },
    {
      q: 'Can extra beds or rollaways be arranged in the suites?',
      a: 'Yes, each of our 15 suites is spacious enough to accommodate an extra plush rollaway bed for an additional guest or child upon prior notice during booking.',
    },
    {
      q: 'Can our group or extended family book the entire 15-suite resort?',
      a: 'Absolutely. Coorg Laya offers an exclusive Whole-Resort Buyout package for up to approximately 45 overnight guests, granting private privatized access to all 15 suites, the palm swimming pool, and the celebration lawns.',
    },
    {
      q: 'Is hot water and Wi-Fi available round the clock?',
      a: 'Yes, all suites are equipped with 24/7 solar-backed hot rainshowers and high-speed fiber Wi-Fi coverage across all living quarters and garden terraces.',
    },
  ];

  return (
    <div className="pt-24 pb-28 bg-[#FAF6EF] text-[#132422] space-y-20 select-none">
      
      {/* Hero Header */}
      <PageHeader
        badge="Suites & Accommodations"
        title="Stay at Coorg Laya"
        description="15 private guest suites accommodating up to approximately 45 overnight guests amidst the peaceful mountain atmosphere and fresh gardens of Kodagu."
        actionText="Check Suite Availability"
        onActionClick={onOpenEnquiry}
        bgImage="/images/rooms/room-interior-neutral.jpeg"
      />

      {/* 3 Scale & Capacity Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CinematicReveal delay={0.1}>
            <div className="rounded-3xl bg-[#FAF6EF] p-6 sm:p-8 space-y-3 border border-[#E4D9C8] shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#E5F3F5] text-[#116B7B] flex items-center justify-center shadow-sm">
                <BedDouble className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#132422]">15 Private Suites</h3>
              <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed">
                Well-appointed rooms set within tranquil resort grounds, surrounded by fresh Kodagu breezes and bamboo gardens.
              </p>
            </div>
          </CinematicReveal>

          <CinematicReveal delay={0.2}>
            <div className="rounded-3xl bg-[#FAF6EF] p-6 sm:p-8 space-y-3 border border-[#E4D9C8] shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#EFE8DC] text-[#A3733E] flex items-center justify-center shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#132422]">~45 Overnight Guests</h3>
              <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed">
                Comfortably accommodates up to approximately 45 overnight guests across families, extended relatives, and retreat groups.
              </p>
            </div>
          </CinematicReveal>

          <CinematicReveal delay={0.3}>
            <div className="rounded-3xl bg-[#FAF6EF] p-6 sm:p-8 space-y-3 border border-[#E4D9C8] shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#E5F3F5] text-[#116B7B] flex items-center justify-center shadow-sm">
                <Trees className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#132422]">Garden Vistas</h3>
              <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed">
                Every room opens up to peaceful morning atmospheres where birdsong and pure mountain air start each day.
              </p>
            </div>
          </CinematicReveal>
        </div>
      </div>

      {/* Interactive 3D Suite Inspector Section */}
      <RoomsSection onOpenEnquiry={onOpenEnquiry} />

      {/* Whole Resort Buyout Showcase Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CinematicReveal duration={0.8}>
          <div className="relative rounded-4xl bg-gradient-to-br from-[#162926] via-[#132422] to-[#162926] text-white p-8 sm:p-12 md:p-16 border border-[#2B4742] shadow-2xl overflow-hidden">
            
            {/* Ambient Water Glare */}
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#1A96AA]/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#E2BA84] backdrop-blur-md">
                <Crown className="w-4 h-4 text-[#E2BA84]" />
                <span>Exclusive Private Sanctuary Buyout</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif leading-tight">
                Reserve All 15 Suites Exclusively for Your Group
              </h2>

              <p className="text-sm sm:text-base text-[#BED4D0] leading-relaxed">
                Hosting a multi-generational family milestone, destination wedding party, or executive retreat? Secure the entire 15-suite sanctuary (~45 guests) with private access to the palm swimming pool, 500-capacity event lawns, and custom dining setups.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/15">
                <div>
                  <span className="text-[11px] text-[#A3733E] font-bold uppercase">Suites</span>
                  <div className="text-xl font-extrabold mt-0.5">All 15 Suites</div>
                </div>
                <div>
                  <span className="text-[11px] text-[#A3733E] font-bold uppercase">Guest Capacity</span>
                  <div className="text-xl font-extrabold mt-0.5">~45 Guests</div>
                </div>
                <div>
                  <span className="text-[11px] text-[#A3733E] font-bold uppercase">Pool & Lawns</span>
                  <div className="text-xl font-extrabold mt-0.5">100% Private</div>
                </div>
                <div>
                  <span className="text-[11px] text-[#A3733E] font-bold uppercase">Custom Dining</span>
                  <div className="text-xl font-extrabold mt-0.5">Included</div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenEnquiry}
                  className="px-8 py-4 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#1A96AA] to-[#116B7B] hover:from-[#158092] hover:to-[#0D5764] shadow-[0_8px_24px_rgba(26,150,170,0.4)] transition-all flex items-center gap-2"
                >
                  <span>Request Buyout Proposal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </CinematicReveal>
      </div>

      {/* Side-by-Side Suite Comparison Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <CinematicReveal className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-4 py-1.5 text-xs font-bold text-[#116B7B] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#1A96AA]" />
            <span>Specifications & Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#132422] font-serif">
            Side-by-Side Suite Comparison
          </h2>
          <p className="text-sm text-[#344E4A]">
            Compare dimensions, occupancy limits, bed configurations, and verified amenities across all four suite categories.
          </p>
        </CinematicReveal>

        <CinematicReveal delay={0.15}>
          <div className="overflow-x-auto rounded-3xl border border-[#E4D9C8] bg-[#FAF6EF] shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EFE8DC] border-b border-[#E4D9C8]">
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#132422]">Feature</th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#116B7B]">Calm Olive</th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#116B7B]">Emerald Accent</th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#116B7B]">Family Haven</th>
                  <th className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-[#116B7B]">Verandah Lounge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4D9C8] text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F5EFE6] transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-[#132422]">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-[#344E4A]">{row.olive}</td>
                    <td className="p-4 sm:p-5 text-[#344E4A]">{row.emerald}</td>
                    <td className="p-4 sm:p-5 text-[#344E4A]">{row.family}</td>
                    <td className="p-4 sm:p-5 text-[#344E4A]">{row.verandah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CinematicReveal>
      </div>

      {/* Guest Policies & FAQ Accordion */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <CinematicReveal className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#A3733E]" />
            <span>Stay Policies & Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#132422] font-serif">
            Frequently Asked Stay Questions
          </h2>
        </CinematicReveal>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <CinematicReveal key={idx} delay={idx * 0.08}>
              <div className="rounded-2xl bg-[#FAF6EF] border border-[#E4D9C8] overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-serif font-bold text-base text-[#132422] flex items-center justify-between hover:bg-[#F5EFE6] transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#116B7B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#635546] shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#344E4A] leading-relaxed border-t border-[#E4D9C8]/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>

    </div>
  );
};

export default RoomsPage;
