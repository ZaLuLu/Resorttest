import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Trees, Heart, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specialty: string;
  quote: string;
  icon: typeof Coffee;
}

export const HoverStaffReveal: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const team: StaffMember[] = [
    {
      id: 'staff-1',
      name: 'Ravi & Geetha',
      role: 'Founding Sanctuary Hosts',
      avatar: '/images/resort/covered-seating.jpeg',
      specialty: 'Estate Stewardship & Guest Care',
      quote: '"We designed Laya as an acoustic sanctuary for native birds and guests who cherish unhurried days."',
      icon: Heart,
    },
    {
      id: 'staff-2',
      name: 'Muthappa K.',
      role: 'Head Naturalist & Coffee Master',
      avatar: '/images/resort/outdoor-mural.jpeg',
      specialty: 'Plantation Flora & Birdsong Walks',
      quote: '"Dawn in Kushalnagar begins with the Malabar Whistling Thrush calling from our silver oaks."',
      icon: Trees,
    },
    {
      id: 'staff-3',
      name: 'Chef Savitha',
      role: 'Estate Culinary Lead',
      avatar: '/images/resort/garden-terrace.jpeg',
      specialty: 'Kodagu Estate Breakfast & Aromatics',
      quote: '"Freshly roasted highland coffee, rice akki rottis, and organic honey from our backyard groves."',
      icon: Coffee,
    },
    {
      id: 'staff-4',
      name: 'Anand Gowda',
      role: 'Celebration & Lawn Concierge',
      avatar: '/images/resort/garden-lawn.jpeg',
      specialty: '500-Guest Lawns & Milestone Events',
      quote: '"Every wedding mandap and family reunion is personalized to give you complete sanctuary privacy."',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between border-b border-[#E4D9C8] pb-4">
        <div>
          <span className="text-[11px] font-bold text-[#A3733E] uppercase tracking-wider block">
            Authentic Hospitality
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#132422]">
            The People Behind Coorg Laya
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#116B7B] hidden sm:block">
          Hover to meet our sanctuary hosts
        </span>
      </div>

      {/* Hover Reveal Card Grid (skiper6 pattern) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member, idx) => {
          const isHovered = hoveredIdx === idx;
          const IconComp = member.icon;

          return (
            <motion.div
              key={member.id}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setHoveredIdx(hoveredIdx === idx ? null : idx)}
              className="relative rounded-3xl overflow-hidden bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm hover:shadow-xl hover:border-[#1A96AA] transition-all duration-300 cursor-pointer p-4 group"
            >
              {/* Photo Aspect Container */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#E8DFD1] mb-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                
                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#132422]/90 via-[#132422]/20 to-transparent" />

                {/* Corner Icon Badge */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[#FAF6EF]/90 backdrop-blur-md text-[#116B7B] border border-[#DFD3C0] flex items-center justify-center shadow-sm">
                  <IconComp className="w-4 h-4" />
                </div>

                {/* Always Visible Bottom Tag */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#74B4C0] block">
                    {member.role}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white leading-tight">
                    {member.name}
                  </h4>
                </div>
              </div>

              {/* Text & Smooth Details Reveal (skiper6 smooth text expand) */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-[#A3733E]">
                  ✨ {member.specialty}
                </div>
                <p className="text-xs text-[#344E4A] leading-relaxed italic line-clamp-3 group-hover:line-clamp-none transition-all">
                  {member.quote}
                </p>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HoverStaffReveal;
