import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { resortData } from '../../data/resortData';

export const CinematicNearbyExplorer: React.FC = () => {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-sand-100 border-b border-ink-primary/8 overflow-hidden">
      <div className="mx-auto max-w-7xl relative z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-ink-primary/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-powder-300 bg-powder-50 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] font-semibold text-powder-700">
              <Compass className="size-3.5 text-powder-600" />
              <span>Surrounding Region</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink-primary font-normal">
              Nearby Natural Wonders
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
              Explore the scenic landscapes of Kushalnagar and the iconic River Kaveri flowing peacefully through the heart of Kodagu.
            </p>
          </div>

          <Link
            to="/nearby"
            className="inline-flex items-center gap-2 rounded-full border border-ink-primary/15 bg-white px-6 py-3 text-xs uppercase tracking-wider font-semibold text-ink-primary hover:bg-ink-primary hover:text-white transition-all duration-300 shadow-sm self-start md:self-auto"
          >
            <span>Explore All Locations</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* 2-Column Sleek Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resortData.nearby.map((place, idx) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-ink-primary/8 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-sand-50">
                <img
                  src={place.image}
                  alt={place.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75" />

                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-powder-50/90 border border-powder-200 backdrop-blur-md px-3 py-1 text-[0.65rem] font-mono font-bold text-powder-800 shadow-sm">
                    {place.number}
                  </span>
                </div>

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[0.65rem] uppercase tracking-wider font-semibold text-butter-300 block mb-0.5">
                    {place.category}
                  </span>
                  <h3 className="font-heading text-2xl font-medium text-white">
                    {place.name}
                  </h3>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
                  {place.description}
                </p>

                {/* Disclaimer Pill */}
                <div className="rounded-2xl bg-powder-50/70 p-3.5 border border-powder-200 flex items-start gap-2.5 text-[0.72rem] text-ink-muted italic">
                  <Info className="size-4 text-powder-700 shrink-0 mt-0.5" />
                  <span>{place.disclaimer}</span>
                </div>

                <div className="pt-4 border-t border-ink-primary/8 flex items-center justify-between text-xs">
                  <span className="text-[0.68rem] uppercase tracking-[0.2em] font-semibold text-powder-700">
                    Kushalnagar Vicinity
                  </span>
                  <div className="flex size-8 items-center justify-center rounded-full bg-sand-50 text-ink-primary group-hover:bg-butter-300 transition-colors">
                    <ArrowRight className="size-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
