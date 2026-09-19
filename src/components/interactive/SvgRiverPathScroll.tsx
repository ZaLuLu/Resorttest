import React from 'react';
import { Compass, Navigation, Clock, ArrowRight } from 'lucide-react';

interface RouteStep {
  step: string;
  emoji: string;
  name: string;
  distance: string;
  driveTime: string;
  bestTime: string;
  highlight: string;
  googleMapsQuery: string;
}

export const SvgRiverPathScroll: React.FC = () => {
  const riverRoute: RouteStep[] = [
    {
      step: '01 · Start',
      emoji: '🏡',
      name: 'Coorg Laya Resort',
      distance: '0.0 km Base',
      driveTime: '0 min',
      bestTime: 'Morning Coffee',
      highlight: 'Depart after fresh estate breakfast under the bamboo and palm canopy in Teppadakandi.',
      googleMapsQuery: 'Kushalnagar+Coorg+Karnataka',
    },
    {
      step: '02 · Morning Island',
      emoji: '🌉',
      name: 'Kaveri Nisargadhama',
      distance: '3.8 km',
      driveTime: '8 mins',
      bestTime: '09:00 AM – 11:30 AM',
      highlight: 'Walk across the hanging rope suspension bridge over flowing river rapids into dense bamboo groves.',
      googleMapsQuery: 'Kaveri+Nisargadhama+Kushalnagar',
    },
    {
      step: '03 · Afternoon Culture',
      emoji: '🛕',
      name: 'Tibetan Golden Temple',
      distance: '6.5 km',
      driveTime: '12 mins',
      bestTime: '01:00 PM – 03:30 PM',
      highlight: 'Listen to monks chanting in the main prayer hall and explore 40ft gold-plated Buddha shrines.',
      googleMapsQuery: 'Namdroling+Monastery+Golden+Temple+Bylakuppe',
    },
    {
      step: '04 · River Sanctuary',
      emoji: '🐘',
      name: 'Dubare Elephant Camp',
      distance: '14.5 km',
      driveTime: '25 mins',
      bestTime: '04:00 PM – 05:30 PM',
      highlight: 'Cross the Kaveri by boat to observe river conservation habitats and evening forest trails.',
      googleMapsQuery: 'Dubare+Elephant+Camp+Coorg',
    },
  ];

  return (
    <div className="w-full rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 sm:p-8 shadow-sm space-y-6 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E4D9C8] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5F3F5] text-[#116B7B] text-xs font-bold border border-[#BCE2E7] mb-1.5">
            <Compass className="w-3.5 h-3.5 text-[#1A96AA]" />
            <span>Recommended River Route</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#132422]">
            Kaveri River 1-Day Travel Circuit
          </h3>
        </div>
        <span className="text-xs font-semibold text-[#A3733E]">
          Total Circuit: ~25 km · Under 45 mins total driving
        </span>
      </div>

      {/* 4-Step Actionable Road Trip Route */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {riverRoute.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white border border-[#E4D9C8] shadow-sm flex flex-col justify-between space-y-3 hover:border-[#1A96AA] transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#116B7B] uppercase tracking-wider bg-[#E5F3F5] px-2 py-0.5 rounded-full border border-[#BCE2E7]">
                  {item.step}
                </span>
                <span className="text-lg">{item.emoji}</span>
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-[#132422]">
                  {item.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-[#A3733E] font-semibold mt-0.5">
                  <span>{item.distance}</span>
                  <span>•</span>
                  <span>{item.driveTime}</span>
                </div>
              </div>

              <p className="text-xs text-[#344E4A] leading-relaxed">
                {item.highlight}
              </p>
            </div>

            <div className="pt-2 border-t border-[#E4D9C8]/60 flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#635546]">
                🕒 {item.bestTime}
              </span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${item.googleMapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#116B7B] hover:text-[#0D5764] p-1 rounded-lg hover:bg-[#E8F4F5] transition-colors"
                title="Open Directions"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SvgRiverPathScroll;
