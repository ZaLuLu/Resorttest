import React from 'react';
import { 
  Compass, Waves, Activity, Sparkles, Sun, Smile, Flame, 
  Coffee, Users, ArrowUpRight, CheckCircle2, ShieldCheck, Footprints
} from 'lucide-react';
import { ActivitiesSection } from '../components/sections/ActivitiesSection';
import { PageHeader } from '../components/common/PageHeader';
import { CinematicReveal } from '../components/common/CinematicReveal';
import { Clay3DCard } from '../components/3d/Clay3DCard';
import { ClayImage } from '../components/common/ClayImage';

interface ActivitiesPageProps {
  onOpenEnquiry: () => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ onOpenEnquiry }) => {
  const curatedItineraries = [
    {
      title: 'The Slow Nature & Wellness Seeker',
      tagline: 'Unhurried, restorative mountain days',
      badge: 'Restorative',
      steps: [
        '07:00 AM: Guided birdsong listening & mist trail walk',
        '08:30 AM: Freshly brewed Coorg coffee on raised terraces',
        '11:30 AM: Relaxing circular pool float & sun deck reading',
        '04:30 PM: Shaded verandah tea overlooking green bamboo',
        '08:00 PM: Starlit night contemplation before quiet hours',
      ],
      idealFor: 'Couples, solo writers, mindfulness seekers',
    },
    {
      title: 'The Energetic Family Adventure',
      tagline: 'Lively games, laughter, and splashes',
      badge: 'Family Fun',
      steps: [
        '08:00 AM: Wholesome estate breakfast spread',
        '09:30 AM: Enclosed kids trampoline bounce session',
        '11:00 AM: Family pool splashing in shallow lounge pool',
        '04:00 PM: Tournament-style lawn badminton & volleyball',
        '07:30 PM: Outdoor barbecue & evening storytelling lawn',
      ],
      idealFor: 'Families with young children, cousins, siblings',
    },
    {
      title: 'The Group & Milestone Celebration',
      tagline: 'Social gatherings under Kodagu skies',
      badge: 'Celebrations',
      steps: [
        '09:00 AM: Group breakfast on expansive garden lawns',
        '11:00 AM: Social pool games & lounge deck music',
        '03:30 PM: Team volleyball matches on open greens',
        '06:00 PM: Sunset toasts on raised terrace decks',
        '08:00 PM: Private grand lawn dinner under festoon lights',
      ],
      idealFor: 'Milestone birthdays, reunions, corporate offsites',
    },
  ];

  const activitiesBento = [
    {
      name: 'Bamboo Lawn Badminton',
      category: 'Sports & Games',
      image: '/images/amenities/badminton-court.png',
      desc: 'Grass badminton court naturally sheltered by tall bamboo groves. Racquets and shuttlecocks provided free.',
      timing: 'All Day (Best 4:30 PM - 6:30 PM)',
    },
    {
      name: 'Palm-Fringed Swimming Pool',
      category: 'Water Recreation',
      image: '/images/amenities/swimming-pool.jpeg',
      desc: 'Crystal-clear pool with a dedicated shallow relaxation section for children and leisurely floats.',
      timing: '7:00 AM – 7:00 PM Daily',
    },
    {
      name: 'Kids Trampoline Play Arena',
      category: 'Family Recreation',
      image: '/images/amenities/kids-play-trampoline.png',
      desc: 'Enclosed spring trampoline with safety netting surrounded by soft manicured lawn grass.',
      timing: 'Open Daily',
    },
    {
      name: 'Outdoor Volleyball Lawn',
      category: 'Team Sports',
      image: '/images/resort/garden-lawn.jpeg',
      desc: 'Expansive grass court layout ideal for group volleyball and social team sports under the sun.',
      timing: 'Morning & Late Afternoon',
    },
    {
      name: 'Raised Garden Terraces',
      category: 'Relaxation & Dining',
      image: '/images/resort/garden-terrace.jpeg',
      desc: 'Elevated timber decks overlooking the estate. Perfect for estate coffee, reading, and evening stargazing.',
      timing: '24 Hours Accessible',
    },
    {
      name: 'Outdoor Mural & Estate Trails',
      category: 'Nature Walks',
      image: '/images/resort/outdoor-mural.jpeg',
      desc: 'Gentle pathways around the estate grounds featuring botanical art, flowering trees, and birdsong.',
      timing: 'Best at Dawn & Dusk',
    },
  ];

  return (
    <div className="pt-24 pb-28 bg-[#FAF6EF] text-[#132422] space-y-20 select-none">
      
      {/* Page Header */}
      <PageHeader
        badge="Experiences & Recreation"
        title="Sanctuary Activities"
        description="From refreshing afternoon swims and enclosed trampoline jumping to active games of lawn badminton and starlit coffee conversations."
        actionText="Plan Your Experience"
        onActionClick={onOpenEnquiry}
        bgImage="/images/amenities/badminton-court.png"
      />

      {/* Main Interactive Activities Section */}
      <ActivitiesSection onOpenEnquiry={onOpenEnquiry} />

      {/* 3 Curated Guest Itineraries */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <CinematicReveal className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Compass className="w-4 h-4 text-[#A3733E]" />
            <span className="tracking-wide uppercase">Curated Stay Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#132422] font-display leading-tight heading-balance">
            How Will You Spend Your Days?
          </h2>
          <p className="text-sm text-[#2C413E] font-normal leading-relaxed prose-pretty">
            Choose a curated pace that fits your stay or weave together your own custom sanctuary rhythm.
          </p>
        </CinematicReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {curatedItineraries.map((itin, idx) => (
            <CinematicReveal key={idx} delay={idx * 0.12}>
              <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF6EF] text-[#137586] border border-[#D5C7B2]">
                      {itin.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#132422]">
                    {itin.title}
                  </h3>
                  <p className="text-xs text-[#A3733E] font-bold tracking-wide">
                    {itin.tagline}
                  </p>

                  <ul className="space-y-2.5 pt-2 border-t border-[#E4D9C8]/60">
                    {itin.steps.map((step, sIdx) => (
                      <li key={sIdx} className="text-xs text-[#2C413E] font-normal flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#137586] shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E4D9C8]/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#A3733E] font-bold uppercase tracking-wider block">Ideal For</span>
                    <span className="text-xs font-bold text-[#132422]">{itin.idealFor}</span>
                  </div>
                  <button
                    onClick={onOpenEnquiry}
                    className="p-2.5 rounded-xl bg-[#EFE8DC] hover:bg-[#E4D9C8] text-[#132422] transition-colors cursor-pointer"
                    title="Plan this itinerary"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>

      {/* Complete Activities Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <CinematicReveal className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Activity className="w-4 h-4 text-[#A3733E]" />
            <span className="tracking-wide uppercase">Complete Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#132422] font-display heading-balance leading-tight">
            All On-Site Recreation
          </h2>
          <p className="text-sm text-[#2C413E] font-normal leading-relaxed prose-pretty">
            Everything you need for active sports or deep relaxation during your stay at Coorg Laya.
          </p>
        </CinematicReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activitiesBento.map((act, idx) => (
            <CinematicReveal key={idx} delay={idx * 0.08}>
              <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                    <ClayImage
                      src={act.image}
                      alt={act.name}
                      aspectRatio="16:10"
                      clayVariant="water"
                      badge={act.category}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#137586]">{act.timing}</span>
                    <h4 className="font-display text-base font-bold text-[#132422]">{act.name}</h4>
                    <p className="text-xs text-[#2C413E] font-normal leading-relaxed prose-pretty">{act.desc}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E4D9C8]/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#A3733E]">Included with Stay</span>
                  <button
                    onClick={onOpenEnquiry}
                    className="text-xs font-bold text-[#137586] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Reserve</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ActivitiesPage;
