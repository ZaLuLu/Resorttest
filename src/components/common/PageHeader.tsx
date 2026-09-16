import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  actionText?: string;
  onActionClick?: () => void;
  bgImage?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  actionText,
  onActionClick,
  bgImage = "https://coorglayaresort.com/_next/static/immutable/media/resort-exteriors.2bq9ym6x0i3uq.jpeg",
}) => {
  return (
    <div className="relative isolate min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden pt-28 pb-16 px-4 sm:px-6">
      {/* Background Image with Light Warm Scrim */}
      <div className="absolute inset-0 -z-20">
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-sand-50/85 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-sand-50 via-transparent to-sand-50/60" />
      </div>

      <div className="mx-auto max-w-4xl text-center z-10">
        {/* Breadcrumb / Badge in Butter Yellow / Powder Blue */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-white/90 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-butter-700 backdrop-blur-md mb-6 shadow-sm"
        >
          <Link to="/" className="hover:text-ink-primary transition-colors">Coorg Laya</Link>
          <ChevronRight className="size-3 text-butter-500" />
          <span>{badge}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-ink-primary mb-5"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-ink-muted mb-8 font-light"
        >
          {description}
        </motion.p>

        {/* Optional Action CTA */}
        {actionText && onActionClick && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={onActionClick}
              className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-7 py-3 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all shadow-md cursor-pointer border border-butter-500/20"
            >
              {actionText}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
