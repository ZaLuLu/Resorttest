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
  bgImage = "/images/resort/resort-exteriors.jpeg",
}) => {
  return (
    <div className="relative isolate min-h-[360px] sm:min-h-[420px] flex items-center justify-center overflow-hidden pt-32 sm:pt-36 pb-14 px-4 sm:px-6 select-none">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 -z-20">
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover scale-105 opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EF]/90 via-[#FAF6EF]/70 to-[#FAF6EF]" />
      </div>

      <div className="mx-auto max-w-4xl text-center z-10 space-y-4">
        {/* Breadcrumb Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-white/95 px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm"
        >
          <Link to="/" className="text-[#116B7B] hover:underline">Coorg Laya</Link>
          <ChevronRight className="size-3 text-[#A3733E]" />
          <span>{badge}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#132422]"
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-[#344E4A] font-medium"
        >
          {description}
        </motion.p>

        {/* Optional Action CTA */}
        {actionText && onActionClick && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="pt-2"
          >
            <button
              onClick={onActionClick}
              className="clay-btn-water text-xs sm:text-sm font-bold shadow-md cursor-pointer"
            >
              {actionText}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
