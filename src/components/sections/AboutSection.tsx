import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Trees, Heart, Sparkles, Sun, VolumeX, Users, Waves } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';

export const AboutSection: React.FC = () => {
  const sanctuaryPillars = [
    {
      title: 'Morning Birdsong',
      description: 'Awaken each morning to natural birdsong and mountain breezes rustling through surrounding bamboo.',
      icon: Trees,
    },
    {
      title: 'Unhurried Leisure',
      description: 'Open lawns, swimming pool, outdoor badminton, and quiet corners designed for mindful rest.',
      icon: Waves,
    },
    {
      title: '500-Guest Celebrations',
      description: 'Spacious outdoor manicured lawn capable of hosting weddings, family milestones, and private buyouts.',
      icon: Users,
    },
    {
      title: 'Quiet Sanctuary Hours',
      description: 'Zero loudspeaker policy after 10 PM to protect the natural nocturnal habitat and guarantee restful sleep.',
      icon: VolumeX,
    },
  ];

  return (
    <section id="about" className="relative w-full py-12 sm:py-16 bg-[#FAF6EF] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Story Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left Real Photo in Clay Frame */}
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-3 shadow-md">
              <ClayImage
                src="/images/resort/outdoor-mural.jpeg"
                alt="Outdoor Mural & Botanical Art at Coorg Laya Resort"
                aspectRatio="1:1"
                clayVariant="sand"
                badge="Art & Ecology"
                className="w-full shadow-sm rounded-2xl"
              />
            </div>
          </motion.div>

          {/* Right Narrative */}
          <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
              <Heart className="size-4 text-[#A3733E]" />
              <span className="tracking-wide uppercase">Philosophy & Eco-Hospitality</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#132422] leading-tight heading-balance">
              Honoring the natural rhythm of Kodagu.
            </h2>

            <p className="text-sm sm:text-base text-[#2C413E] font-normal leading-relaxed prose-pretty">
              Derived from the Sanskrit <span className="font-accent italic font-semibold text-[#137586] text-lg">Laya</span> (लय), meaning rhythm, harmony, and graceful dissolution of stress — at Coorg Laya Resort, we believe true relaxation begins with simplicity, spacious surroundings, and unhurried time together in clean mountain air. Every terrace, lawn, and pool deck has been shaped to preserve the native tree canopy and provide an acoustic sanctuary for birds and guests alike.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm">
                <Trees className="size-5 text-[#137586] mb-1" />
                <h4 className="font-display text-base font-bold text-[#132422]">Preserved Nature</h4>
                <p className="text-xs text-[#2C413E] font-normal">Silver oaks & wild bamboo</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm">
                <ShieldCheck className="size-5 text-[#137586] mb-1" />
                <h4 className="font-display text-base font-bold text-[#132422]">Quiet Sanctuary</h4>
                <p className="text-xs text-[#2C413E] font-normal">Zero highway disturbance</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Authentic Sanctuary Pillars Grid */}
        <div className="space-y-6 pt-4 border-t border-[#E4D9C8]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-[#A3733E] uppercase tracking-wider block">
                Sanctuary Principles
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#132422]">
                What Defines Coorg Laya
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#586E6B]">
              15 Suites · 500 Lawn Capacity · Kushalnagar
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {sanctuaryPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 shadow-sm space-y-3"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#E5F3F5] text-[#137586] flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#132422]">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#344E4A] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
