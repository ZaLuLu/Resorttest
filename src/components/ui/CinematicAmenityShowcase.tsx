import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Waves, Activity, Smile, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resortData } from '../../data/resortData';

export const CinematicAmenityShowcase: React.FC = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'water':
        return <Waves className="size-4 text-powder-600" />;
      case 'recreation':
        return <Activity className="size-4 text-butter-600" />;
      case 'kids':
        return <Smile className="size-4 text-butter-600" />;
      default:
        return <Sun className="size-4 text-butter-600" />;
    }
  };

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-sand-50 border-b border-ink-primary/8 overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-ink-primary/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] font-semibold text-butter-700">
              <Sparkles className="size-3.5 text-butter-600" />
              <span>Verified Recreation</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink-primary font-normal">
              Designed for Rest & Recreation
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
              From sunlit swimming pool laps and friendly rallies of badminton and volleyball to open lawns and peaceful terrace seating.
            </p>
          </div>

          <Link
            to="/amenities"
            className="inline-flex items-center gap-2 rounded-full border border-ink-primary/15 bg-white px-6 py-3 text-xs uppercase tracking-wider font-semibold text-ink-primary hover:bg-ink-primary hover:text-white transition-all duration-300 shadow-sm self-start md:self-auto"
          >
            <span>View All Amenities</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* 5-Column Sleek Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resortData.amenities.map((amenity, index) => {
            const isFeatured = index === 0;
            return (
              <motion.div
                key={amenity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-ink-primary/8 shadow-sm hover:shadow-xl transition-all duration-500 ${
                  isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Image Container with Consistent Aspect Ratio */}
                <div className={`relative overflow-hidden ${isFeatured ? 'aspect-[16/9]' : 'aspect-[16/10]'} bg-sand-100`}>
                  <img
                    src={amenity.image}
                    alt={amenity.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[0.65rem] font-mono font-bold text-ink-primary border border-black/5 shadow-sm">
                      {amenity.number}
                    </span>
                    {amenity.highlightTag && (
                      <span className="rounded-full bg-butter-300 px-3 py-1 text-[0.65rem] uppercase tracking-wider font-bold text-ink-primary shadow-sm">
                        {amenity.highlightTag}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-butter-700 font-semibold uppercase tracking-wider">
                      {getCategoryIcon(amenity.category)}
                      <span>{amenity.category.toUpperCase()}</span>
                    </div>

                    <h3 className="font-heading text-2xl text-ink-primary font-medium group-hover:text-butter-700 transition-colors">
                      {amenity.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                      {amenity.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-ink-primary/8 flex items-center justify-between">
                    <span className="text-[0.68rem] uppercase tracking-[0.2em] font-semibold text-butter-700">
                      Verified Amenity
                    </span>
                    <div className="flex size-8 items-center justify-center rounded-full bg-sand-50 text-ink-primary group-hover:bg-butter-300 transition-colors">
                      <ArrowRight className="size-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
