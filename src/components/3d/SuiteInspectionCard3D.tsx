import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Maximize2, Users, Bed, Eye, ArrowRight, RotateCw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ClayImage } from '../common/ClayImage';

export interface SuiteSpecData {
  id: string;
  name: string;
  category: string;
  sqft: string;
  capacity: string;
  bedType: string;
  view: string;
  highlights: string[];
  startingRate: string;
  image: string;
  description: string;
}

interface SuiteInspectionCard3DProps {
  suite: SuiteSpecData;
  onBookNow: (suiteName: string) => void;
  className?: string;
}

export const SuiteInspectionCard3D: React.FC<SuiteInspectionCard3DProps> = ({
  suite,
  onBookNow,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt({ rotateX, rotateY });
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(prev => !prev);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative h-[560px] w-full [perspective:1200px] ${className}`}
    >
      <motion.div
        animate={{
          rotateY: isFlipped ? 180 : tilt.rotateY,
          rotateX: isFlipped ? 0 : tilt.rotateX,
        }}
        transition={{
          rotateY: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          rotateX: { type: 'spring', stiffness: 200, damping: 25 },
        }}
        className="relative w-full h-full [transform-style:preserve-3d] transition-shadow duration-300"
      >
        {/* ================= FRONT SIDE ================= */}
        <div
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-[0_16px_36px_rgba(22,41,38,0.08),_inset_0_2px_4px_rgba(255,255,255,0.9)] overflow-hidden flex flex-col group"
        >
          {/* Dynamic Specular Sunlight Glare */}
          <div
            className="pointer-events-none absolute inset-0 z-20 rounded-3xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.7) 0%, rgba(26,150,170,0.08) 35%, transparent 70%)`,
              opacity: glarePos.opacity,
            }}
          />

          {/* Suite Image Showcase */}
          <div className="relative h-[280px] w-full overflow-hidden p-3 pb-0">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] bg-[#E8DFD1]">
              <ClayImage
                src={suite.image}
                alt={suite.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132422]/70 via-transparent to-transparent pointer-events-none" />

              {/* Category Pill */}
              <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#132422]/85 backdrop-blur-md border border-white/20 text-[#FAF6EF] text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#1A96AA]" />
                {suite.category}
              </div>

              {/* Flip Trigger Button */}
              <button
                onClick={toggleFlip}
                className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full bg-[#FAF6EF]/90 backdrop-blur-md border border-[#E4D9C8] text-[#132422] text-xs font-bold hover:bg-[#1A96AA] hover:text-white transition-colors duration-200 flex items-center gap-1.5 shadow-md group/flip"
                title="Inspect Architectural Specs"
              >
                <RotateCw className="w-3.5 h-3.5 transition-transform duration-500 group-hover/flip:rotate-180 text-[#116B7B] group-hover/flip:text-white" />
                <span>Specs</span>
              </button>

              {/* Capacity Badge */}
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 text-white text-xs font-medium bg-[#132422]/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                <Users className="w-3.5 h-3.5 text-[#A3733E]" />
                <span>{suite.capacity}</span>
                <span className="text-white/40">•</span>
                <Maximize2 className="w-3.5 h-3.5 text-[#1A96AA]" />
                <span>{suite.sqft}</span>
              </div>
            </div>
          </div>

          {/* Front Content */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-[#132422] tracking-tight font-serif">
                {suite.name}
              </h3>
              <p className="mt-1.5 text-xs text-[#344E4A] line-clamp-2 leading-relaxed">
                {suite.description}
              </p>

              {/* Inclusions Row */}
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {suite.highlights.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#162926] bg-[#EFE8DC] px-2.5 py-0.5 rounded-full border border-[#DFD3C0]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#116B7B]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="pt-3 border-t border-[#E8DFD1] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#635546]">From</span>
                <div className="text-xl font-extrabold text-[#132422]">
                  {suite.startingRate}
                  <span className="text-xs font-normal text-[#344E4A]"> / night</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFlip}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-[#116B7B] bg-[#E5F3F5] hover:bg-[#D2ECF0] border border-[#BCE2E7] transition-colors"
                >
                  Details
                </button>
                <button
                  onClick={() => onBookNow(suite.name)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#1A96AA] to-[#116B7B] hover:from-[#158092] hover:to-[#0D5764] shadow-[0_4px_12px_rgba(26,150,170,0.3)] transition-all flex items-center gap-1"
                >
                  <span>Reserve</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE (180° REVERSE) ================= */}
        <div
          className="absolute inset-0 w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-3xl bg-[#162926] border border-[#2B4742] shadow-[0_16px_36px_rgba(0,0,0,0.25)] p-6 flex flex-col justify-between text-[#FAF6EF]"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1A96AA]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#A3733E]">Architectural Specs</span>
              </div>
              <button
                onClick={toggleFlip}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-[#FAF6EF] transition-colors flex items-center gap-1 border border-white/15"
              >
                <RotateCw className="w-3 h-3 text-[#1A96AA]" />
                <span>Photo</span>
              </button>
            </div>

            <h3 className="text-2xl font-extrabold text-white mt-3 font-serif">
              {suite.name}
            </h3>
            <p className="text-xs text-[#BED4D0] mt-1">
              Part of Coorg Laya's strictly limited 15 private guest suites.
            </p>

            {/* Spec Matrix Grid */}
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <div className="bg-[#1D3531] p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-[#A3733E] font-bold uppercase">Suite Area</span>
                <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Maximize2 className="w-3.5 h-3.5 text-[#1A96AA]" />
                  {suite.sqft}
                </div>
              </div>
              <div className="bg-[#1D3531] p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-[#A3733E] font-bold uppercase">Bed Layout</span>
                <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Bed className="w-3.5 h-3.5 text-[#1A96AA]" />
                  {suite.bedType}
                </div>
              </div>
              <div className="bg-[#1D3531] p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-[#A3733E] font-bold uppercase">Orientation</span>
                <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Eye className="w-3.5 h-3.5 text-[#1A96AA]" />
                  {suite.view}
                </div>
              </div>
              <div className="bg-[#1D3531] p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-[#A3733E] font-bold uppercase">Max Guests</span>
                <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-[#1A96AA]" />
                  {suite.capacity}
                </div>
              </div>
            </div>

            {/* All Inclusions Checklist */}
            <div className="mt-4">
              <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider block mb-2">
                Suite Inclusions
              </span>
              <ul className="space-y-1.5">
                {suite.highlights.map((item, idx) => (
                  <li key={idx} className="text-xs text-[#E3EDE9] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A96AA]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Action on Back */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#A3733E]">Rate Starting At</span>
              <div className="text-lg font-extrabold text-white">{suite.startingRate}</div>
            </div>
            <button
              onClick={() => onBookNow(suite.name)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#1A96AA] to-[#116B7B] hover:from-[#158092] hover:to-[#0D5764] shadow-[0_4px_16px_rgba(26,150,170,0.4)] transition-all flex items-center gap-1.5"
            >
              <span>Instant Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
