import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Trees, Heart, Sparkles, Sun } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';
import { HoverStaffReveal } from '../ui/HoverStaffReveal';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';

export const AboutSection: React.FC = () => {
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
              <span>Philosophy & Eco-Hospitality</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#132422] leading-tight">
              Honoring the natural rhythm of Kodagu.
            </h2>

            <p className="text-sm sm:text-base text-[#344E4A] font-medium leading-relaxed">
              At Coorg Laya Resort, we believe true relaxation begins with simplicity, spacious surroundings, and unhurried time together in clean mountain air. Every terrace, lawn, and pool deck has been shaped to preserve the native tree canopy and provide an acoustic sanctuary for birds and guests alike.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm">
                <Trees className="size-5 text-[#116B7B] mb-1" />
                <h4 className="font-serif text-sm font-bold text-[#132422]">Preserved Nature</h4>
                <p className="text-xs text-[#344E4A] font-medium">Silver oaks & wild bamboo</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm">
                <ShieldCheck className="size-5 text-[#1A96AA] mb-1" />
                <h4 className="font-serif text-sm font-bold text-[#132422]">Quiet Sanctuary</h4>
                <p className="text-xs text-[#344E4A] font-medium">Zero highway disturbance</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hover Staff & Hosts Reveal (skiper6 pattern) */}
        <div className="pt-4">
          <HoverStaffReveal />
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
