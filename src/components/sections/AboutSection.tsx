import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Trees, Heart, Sparkles, Sun } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';
import { fadeUp, staggerContainer } from '../../utils/motionVariants';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative w-full py-20 sm:py-28 bg-sand-50/90 text-riverbed-900 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left Real Photo in Clay Frame */}
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <div className="clay-card-sand p-3 border-2 border-white shadow-clay-lg">
              <ClayImage
                src="/images/resort/outdoor-mural.jpeg"
                alt="Outdoor Mural & Botanical Art at Coorg Laya Resort"
                aspectRatio="1:1"
                clayVariant="sand"
                badge="Art & Ecology"
                className="w-full shadow-clay-sm"
              />
            </div>
          </motion.div>

          {/* Right Narrative */}
          <motion.div variants={fadeUp} className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-4 py-1.5 text-xs font-bold text-sand-600 shadow-clay-pill">
              <Heart className="size-4 text-sand-600" />
              <span>Philosophy & Eco-Hospitality</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-riverbed-900 leading-tight">
              Honoring the natural rhythm of Kodagu.
            </h2>

            <p className="text-sm sm:text-base text-riverbed-600 font-medium leading-relaxed">
              At Coorg Laya Resort, we believe true relaxation begins with simplicity, spacious surroundings, and time together in clean mountain air. Every terrace, lawn, and pool deck has been shaped to preserve the native tree canopy and provide an acoustic sanctuary for birds and guests alike.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="clay-card p-4 border-2 border-white shadow-clay-sm">
                <Trees className="size-5 text-riverbank-500 mb-1" />
                <h4 className="font-display text-sm font-bold text-riverbed-900">Preserved Nature</h4>
                <p className="text-xs text-riverbed-500 font-medium">Silver oaks & wild bamboo</p>
              </div>

              <div className="clay-card p-4 border-2 border-white shadow-clay-sm">
                <ShieldCheck className="size-5 text-water-600 mb-1" />
                <h4 className="font-display text-sm font-bold text-riverbed-900">Quiet Sanctuary</h4>
                <p className="text-xs text-riverbed-500 font-medium">Zero highway disturbance</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default AboutSection;
