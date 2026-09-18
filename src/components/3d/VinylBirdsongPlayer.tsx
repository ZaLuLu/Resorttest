import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc, Sparkles, Music, Waves, Sun, Moon, Feather } from 'lucide-react';

interface SoundTrack {
  id: string;
  name: string;
  timeSlot: string;
  description: string;
  birdSpecies: string[];
  icon: typeof Sun;
}

export const VinylBirdsongPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [needleOnRecord, setNeedleOnRecord] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const crackleTimerRef = useRef<number | null>(null);

  const tracks: SoundTrack[] = [
    {
      id: 'track-1',
      name: 'Dawn Birdsong & Mountain Mist',
      timeSlot: '06:30 AM · Morning Dew',
      description: 'Melodic morning whistles of the Malabar Whistling Thrush and Red-whiskered Bulbul echoing across fresh coffee plantation trees.',
      birdSpecies: ['Malabar Whistling Thrush', 'Red-whiskered Bulbul', 'Oriental White-eye'],
      icon: Sun,
    },
    {
      id: 'track-2',
      name: 'Midday Palm Breeze & Shallow Waters',
      timeSlot: '12:30 PM · Tropical Noon',
      description: 'Gentle rustling bamboo groves and relaxing water flow along the Kaveri riverbed and palm swimming pool deck.',
      birdSpecies: ['White-throated Kingfisher', 'Spotted Dove', 'Green Bee-eater'],
      icon: Waves,
    },
    {
      id: 'track-3',
      name: 'Golden Hour Crickets & Starlit Forest',
      timeSlot: '07:30 PM · Starlit Dusk',
      description: 'Soothing chorus of evening cicadas, nightingales, and gentle mountain breezes before sanctuary quiet hours.',
      birdSpecies: ['Jungle Nightjar', 'Tree Crickets', 'Scops Owl'],
      icon: Moon,
    },
  ];

  // Procedural Web Audio API Sound Synthesizer: Birdsong + Vinyl Surface Crackle
  const startAudioSynthesis = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.35, ctx.currentTime);
      mainGain.connect(ctx.destination);
      gainNodeRef.current = mainGain;

      // 1. Ambient Vinyl Surface Noise & Warm Hiss (Pinkish Noise)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2 + white * 0.05) * 0.12;
      }

      const vinylNoise = ctx.createBufferSource();
      vinylNoise.buffer = noiseBuffer;
      vinylNoise.loop = true;

      const vinylFilter = ctx.createBiquadFilter();
      vinylFilter.type = 'lowpass';
      vinylFilter.frequency.setValueAtTime(1400, ctx.currentTime);

      const vinylGain = ctx.createGain();
      vinylGain.gain.setValueAtTime(0.04, ctx.currentTime);

      vinylNoise.connect(vinylFilter);
      vinylFilter.connect(vinylGain);
      vinylGain.connect(mainGain);
      vinylNoise.start();

      // 2. Vinyl Micro-Crackle Needle Clicks
      const triggerCrackle = () => {
        if (!audioCtxRef.current) return;
        const now = ctx.currentTime;
        const crackleOsc = ctx.createOscillator();
        const crackleGain = ctx.createGain();

        crackleOsc.type = 'triangle';
        crackleOsc.frequency.setValueAtTime(1200 + Math.random() * 2800, now);

        crackleGain.gain.setValueAtTime(0.0001, now);
        crackleGain.gain.linearRampToValueAtTime(0.02 + Math.random() * 0.03, now + 0.003);
        crackleGain.gain.exponentialRampToValueAtTime(0.00001, now + 0.018);

        crackleOsc.connect(crackleGain);
        crackleGain.connect(mainGain);

        crackleOsc.start(now);
        crackleOsc.stop(now + 0.02);

        const nextCrackle = 200 + Math.random() * 800;
        crackleTimerRef.current = window.setTimeout(triggerCrackle, nextCrackle);
      };
      triggerCrackle();

      // 3. Procedural Bird Chirping Melodies
      const triggerChirp = () => {
        if (!audioCtxRef.current) return;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const chirpGain = ctx.createGain();

        const baseFreq = selectedTrack === 2 ? 3800 : selectedTrack === 1 ? 2200 : 2800;
        const targetFreq = baseFreq + (Math.random() * 1400 - 500);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(targetFreq, now + 0.09);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.88, now + 0.2);

        chirpGain.gain.setValueAtTime(0.001, now);
        chirpGain.gain.linearRampToValueAtTime(0.1, now + 0.04);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

        osc.connect(chirpGain);
        chirpGain.connect(mainGain);

        osc.start(now);
        osc.stop(now + 0.26);

        const nextInterval = 500 + Math.random() * (selectedTrack === 2 ? 2800 : 1600);
        timerRef.current = window.setTimeout(triggerChirp, nextInterval);
      };

      triggerChirp();
    } catch (e) {
      console.warn('Web Audio synthesis not supported or blocked:', e);
    }
  };

  const stopAudioSynthesis = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (crackleTimerRef.current) {
      clearTimeout(crackleTimerRef.current);
      crackleTimerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      // Delay audio slightly until needle drops
      const needleTimer = setTimeout(() => {
        setNeedleOnRecord(true);
        startAudioSynthesis();
      }, 500);
      return () => clearTimeout(needleTimer);
    } else {
      setNeedleOnRecord(false);
      stopAudioSynthesis();
    }
    return () => {
      stopAudioSynthesis();
    };
  }, [isPlaying, selectedTrack]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume * 0.35,
        audioCtxRef.current.currentTime
      );
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const currentTrack = tracks[selectedTrack];

  return (
    <div className="relative rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.22),_inset_0_2px_4px_rgba(255,255,255,0.9)] overflow-hidden">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4D9C8]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E5F3F5] text-[#116B7B] border border-[#BCE2E7] flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.12)]">
            <Disc className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3.6s' }} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#A3733E] uppercase tracking-wider block">
              33⅓ RPM Natural Soundscape · Live Turntable
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#132422]">
              The Coorg Laya Birdsong Player
            </h3>
          </div>
        </div>

        {/* Live Audio Waves Visualizer (Strict Fixed-Height Container - Zero Layout Shift) */}
        <div className="h-11 flex items-center gap-1.5 px-4 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="h-6 flex items-end gap-1 overflow-hidden">
            {[14, 22, 24, 18, 22, 24, 16, 20, 14, 22].map((maxH, idx) => (
              <motion.div
                key={idx}
                animate={{
                  height: isPlaying ? [4, maxH, 6, maxH * 0.7, 4] : 4,
                }}
                transition={{
                  duration: 0.6 + (idx % 4) * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className={`w-1 rounded-full ${
                  isPlaying ? 'bg-[#1A96AA]' : 'bg-[#C2B5A0]'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono font-bold text-[#116B7B] ml-2 select-none">
            {isPlaying ? 'ACTIVE 33⅓ RPM' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Turntable Deck & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        
        {/* Left: 3D Turntable with Vinyl Disc & Mechanical Tonearm */}
        <div className="lg:col-span-6 flex items-center justify-center relative overflow-visible">
          
          {/* Radiating Soundwave Ripples when Playing (Absolute Isolated Layer) */}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
              <motion.div
                animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                className="w-72 h-72 rounded-full border border-[#1A96AA]/40 absolute pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.65], opacity: [0.4, 0] }}
                transition={{ duration: 2.2, delay: 0.8, repeat: Infinity, ease: 'easeOut' }}
                className="w-72 h-72 rounded-full border border-[#E2BA84]/35 absolute pointer-events-none"
              />
            </div>
          )}

          {/* Turntable Plinth Deck */}
          <div className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-3xl bg-[#EFE8DC] border-2 border-[#DFD3C0] p-4 shadow-[inset_0_4px_12px_rgba(0,0,0,0.1),_0_20px_45px_rgba(0,0,0,0.22)] flex items-center justify-center">
            
            {/* Spinning Vinyl Record with Anisotropic Light Sheen */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                rotate: {
                  duration: 2.6,
                  repeat: isPlaying ? Infinity : 0,
                  ease: 'linear',
                },
              }}
              className="relative w-64 sm:w-72 h-64 sm:h-72 rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden"
              style={{
                background: `radial-gradient(circle, #223B36 0%, #162926 28%, #0C1715 55%, #162926 80%, #223B36 100%)`,
              }}
            >
              {/* Rotating Anisotropic Specular Light Sheen Bowtie */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  background: `conic-gradient(from 45deg at 50% 50%, rgba(255,255,255,0.22) 0deg, transparent 55deg, rgba(255,255,255,0.22) 180deg, transparent 235deg, rgba(255,255,255,0.22) 360deg)`,
                }}
              />

              {/* Vinyl Grooves Texture */}
              <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute inset-5 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-9 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute inset-14 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-19 rounded-full border border-white/10 pointer-events-none" />

              {/* Gold Foil Center Label */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#8C5F2E] via-[#E2BA84] to-[#A3733E] shadow-lg border-2 border-white/40 flex flex-col items-center justify-center text-center p-2 z-10">
                <span className="text-[8px] font-extrabold text-[#132422] uppercase tracking-tighter">
                  COORG LAYA
                </span>
                <span className="text-[7px] font-mono font-bold text-[#132422]/80">
                  ESTATE 33⅓
                </span>
                <div className="w-3.5 h-3.5 rounded-full bg-[#132422] mt-0.5 border border-white/50" />
              </div>
            </motion.div>

            {/* Realistic Mechanical Tonearm with Smooth Swing & Needle Drop */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              {/* Pivot Base */}
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#E5E7EB] via-[#D1D5DB] to-[#9CA3AF] border-2 border-[#9CA3AF] shadow-[0_4px_12px_rgba(0,0,0,0.35)] flex items-center justify-center">
                {/* Knurled Counterweight Dial */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#374151] to-[#111827] border border-[#6B7280] shadow-inner flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
                </div>
                
                {/* Arm Wand with Realistic Pivot */}
                <motion.div
                  animate={{
                    rotate: isPlaying ? 30 : 0,
                  }}
                  transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute top-6 left-6 origin-top-left"
                >
                  {/* Metallic Tonearm Stem (Explicit 145px length) */}
                  <div className="relative w-2.5 h-[145px] rounded-full shadow-[2px_4px_10px_rgba(0,0,0,0.4)] bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF] border border-[#9CA3AF]/60">
                    {/* Lateral Tonearm Rest clip */}
                    <div className="absolute top-10 -left-1 w-4 h-1 bg-[#4B5563] rounded" />
                  </div>
                  
                  {/* Cartridge Headshell & Stylus Needle */}
                  <motion.div
                    animate={{
                      scale: needleOnRecord ? 0.96 : 1,
                      y: needleOnRecord ? 2.5 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="absolute -bottom-2 -left-2 w-6 h-10 rounded-md bg-[#18181B] border border-[#F59E0B] shadow-[0_4px_8px_rgba(0,0,0,0.4)] flex flex-col items-center justify-between p-1"
                  >
                    {/* Headshell finger lift bar */}
                    <div className="w-1.5 h-3 bg-[#D97706] rounded-full -mt-2 -mr-5" />
                    <div className="w-3 h-1 bg-[#F59E0B] rounded-full" />
                    {/* Glowing Ruby/Diamond Stylus tip */}
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_6px_#EF4444]" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Center Play/Pause Floating Action Button */}
            <button
              onClick={togglePlay}
              className="absolute z-30 w-14 h-14 rounded-full bg-[#1A96AA] hover:bg-[#116B7B] text-white shadow-[0_8px_24px_rgba(26,150,170,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label={isPlaying ? 'Pause Soundscape' : 'Play Soundscape'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Right: Track Selector, Details & Volume */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F3F5] text-[#116B7B] text-xs font-bold border border-[#BCE2E7] mb-2">
              <currentTrack.icon className="w-3.5 h-3.5" />
              <span>{currentTrack.timeSlot}</span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#132422]">
              {currentTrack.name}
            </h4>
            <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed mt-1.5">
              {currentTrack.description}
            </p>
          </div>

          {/* Bird Species Identified */}
          <div>
            <span className="text-[11px] font-bold text-[#A3733E] uppercase tracking-wider block mb-2">
              Native Species In This Track:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentTrack.birdSpecies.map((bird, bIdx) => (
                <span
                  key={bIdx}
                  className="text-xs font-bold text-[#162926] bg-[#EFE8DC] px-3 py-1 rounded-full border border-[#DFD3C0]"
                >
                  🐦 {bird}
                </span>
              ))}
            </div>
          </div>

          {/* 3 Track Switching Buttons */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold text-[#635546] uppercase tracking-wider block">
              Select Time of Day:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {tracks.map((t, idx) => {
                const IconComp = t.icon;
                const isSelected = selectedTrack === idx;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTrack(idx);
                      if (!isPlaying) setIsPlaying(true);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#132422] text-white border-[#132422] shadow-md'
                        : 'bg-[#FAF6EF] text-[#344E4A] border-[#E4D9C8] hover:bg-[#F5EFE6]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <IconComp className={`w-4 h-4 ${isSelected ? 'text-[#1A96AA]' : 'text-[#A3733E]'}`} />
                      <span className="text-xs font-bold truncate">{t.name.split('&')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Volume Control Bar */}
          <div className="pt-3 border-t border-[#E4D9C8] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(prev => !prev)}
                className="text-[#132422] hover:text-[#1A96AA] transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5" />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-28 sm:w-36 accent-[#1A96AA] cursor-pointer"
              />
            </div>

            <button
              onClick={togglePlay}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
                isPlaying
                  ? 'bg-[#132422] text-white hover:bg-black'
                  : 'bg-gradient-to-r from-[#1A96AA] to-[#116B7B] text-white hover:from-[#158092] hover:to-[#0D5764]'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Record' : 'Play Record'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default VinylBirdsongPlayer;
