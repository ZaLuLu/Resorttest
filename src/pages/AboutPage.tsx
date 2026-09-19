import React from 'react';
import { 
  Heart, ShieldCheck, Trees, Sparkles, Coffee, Sun, 
  VolumeX, Droplet, ArrowUpRight
} from 'lucide-react';
import { AboutSection } from '../components/sections/AboutSection';
import { PageHeader } from '../components/common/PageHeader';
import { CinematicReveal } from '../components/common/CinematicReveal';
import { Clay3DCard } from '../components/3d/Clay3DCard';
import { ClayImage } from '../components/common/ClayImage';

interface AboutPageProps {
  onOpenEnquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry }) => {
  const coreValues = [
    {
      title: 'Unhurried Mountain Stillness',
      desc: 'We purposefully chose to build strictly 15 suites across expansive grounds, guaranteeing low density, privacy, and true calm.',
      icon: Sun,
    },
    {
      title: 'Earth & Water Stewardship',
      desc: 'Designed with solar-backed hot water, rain harvesting, open porous clay grounds, and zero single-use plastics.',
      icon: Droplet,
    },
    {
      title: '10:00 PM Sanctuary Silence',
      desc: 'We enforce a strict zero loudspeaker policy after 10 PM to protect the natural nocturnal habitats and restful sleep.',
      icon: VolumeX,
    },
    {
      title: 'Authentic Kodagu Hospitality',
      desc: 'Warm, intuitive resident hosts passionate about sharing home-cooked estate breakfast, local folklore, and travel tips.',
      icon: Heart,
    },
  ];

  const milestones = [
    {
      year: 'Heritage Grounds',
      title: 'Estate Plantation Roots',
      desc: 'Originating as a fertile family coffee and spice estate nestled on the gentle slopes of Kushalnagar, Kodagu.',
    },
    {
      year: 'Architectural Vision',
      title: '15-Suite Nature Blueprint',
      desc: 'Architectural design centered around preserving towering coconut palms, green bamboo clusters, and open lawn vistas.',
    },
    {
      year: 'Modern Sanctuary',
      title: 'Opening Coorg Laya',
      desc: 'Welcoming discerning families, couples, and celebration groups to an authentic haven of mountain serenity.',
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-28 bg-[#FAF6EF] text-[#132422] space-y-16 sm:space-y-20 select-none">
      
      {/* Page Header */}
      <PageHeader
        badge="Our Heritage & Story"
        title="About Coorg Laya"
        description="A nature-led sanctuary dedicated to restful mountain days, unhurried time with family, and morning birdsong in Kushalnagar, Kodagu."
        actionText="Plan Your Visit"
        onActionClick={onOpenEnquiry}
        bgImage="/images/resort/outdoor-mural.jpeg"
      />

      {/* Main Interactive About Section */}
      <AboutSection />

      {/* Heritage Story & Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <CinematicReveal className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
                <Coffee className="w-4 h-4 text-[#A3733E]" />
                <span>The Story of Laya</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#132422] font-serif leading-tight">
                Born from a love for Kodagu's slow mountain rhythm.
              </h2>
              <p className="text-sm sm:text-base text-[#344E4A] leading-relaxed">
                In Sanskrit, <em>"Laya"</em> signifies rhythm, harmony, and stillness. Coorg Laya Resort was founded with a singular purpose: to create a sanctuary where city fatigue dissolves into the peaceful melody of morning birdsong, rustling bamboo, and tropical water.
              </p>
              <p className="text-sm text-[#344E4A] leading-relaxed">
                Instead of over-building, we deliberately limited our accommodations to strictly <strong>15 private guest suites (~45 overnight guests)</strong> across expansive open lawns. This ensures that every resident guest experiences genuine exclusivity, open space, and attentive care.
              </p>
            </CinematicReveal>
          </div>

          <div className="lg:col-span-6">
            <CinematicReveal delay={0.2}>
              <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-4 shadow-md">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8DFD1]">
                  <ClayImage
                    src="/images/resort/outdoor-mural.jpeg"
                    alt="Coorg Laya Outdoor Mural and Foliage Grounds"
                    aspectRatio="4:3"
                    clayVariant="sand"
                    badge="Nature & Artistry"
                    className="w-full h-full object-cover shadow-sm"
                  />
                </div>
              </div>
            </CinematicReveal>
          </div>

        </div>
      </div>

      {/* Sanctuary Values Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <CinematicReveal className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#BCE2E7] bg-[#E5F3F5] px-4 py-1.5 text-xs font-bold text-[#116B7B] shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#1A96AA]" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#132422] font-serif">
            Our Sanctuary Commitments
          </h2>
        </CinematicReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => {
            const IconComp = val.icon;
            return (
              <CinematicReveal key={idx} delay={idx * 0.1}>
                <Clay3DCard
                  variant={idx % 2 === 0 ? 'white' : 'water'}
                  maxTilt={8}
                  glareOpacity={0.2}
                  className="p-6 h-full flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#E5F3F5] text-[#116B7B] flex items-center justify-center shadow-sm">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#132422]">
                      {val.title}
                    </h3>
                    <p className="text-xs text-[#344E4A] leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </Clay3DCard>
              </CinematicReveal>
            );
          })}
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <CinematicReveal className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#A3733E]" />
            <span>Our Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#132422] font-serif">
            The Making of Coorg Laya
          </h2>
        </CinematicReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <CinematicReveal key={idx} delay={idx * 0.12}>
              <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 space-y-3 shadow-sm h-full">
                <span className="text-xs font-bold text-[#116B7B] uppercase tracking-wider block">
                  {m.year}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#132422]">
                  {m.title}
                </h3>
                <p className="text-xs text-[#344E4A] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
