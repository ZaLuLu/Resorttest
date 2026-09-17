import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc, Sparkles, Music, Waves, Sun, Moon } from 'lucide-react';

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

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  const tracks: SoundTrack[] = [
    {
      id: 'track-1',
      name: 'Dawn Birdsong & Mountain Mist',
      timeSlot: '06:30 AM · Morning Dew',
      description: 'Melodic morning whistles of the Malabar Thrush and Red-whiskered Bulbul echoing across fresh coffee plantation trees.',
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

  // Procedural Web Audio API Sound Synthesizer for Birdsong & Nature
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
      mainGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.3, ctx.currentTime);
      mainGain.connect(ctx.destination);
      gainNodeRef.current = mainGain;

      // Ambient Gentle Wind / Rustling Leaves Noise
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(selectedTrack === 1 ? 450 : 850, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(mainGain);
      whiteNoise.start();

      // Procedural Bird Chirping Loops
      const triggerChirp = () => {
        if (!isPlaying || !audioCtxRef.current) return;
        const now = ctx.currentTime;

        // Chirp Oscillator
        const osc = ctx.createOscillator();
        const chirpGain = ctx.createGain();

        // Frequency sweep mimicking Malabar Thrush or Bulbul
        const baseFreq = selectedTrack === 2 ? 3800 : selectedTrack === 1 ? 2200 : 2800;
        const targetFreq = baseFreq + (Math.random() * 1200 - 400);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(targetFreq, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, now + 0.18);

        chirpGain.gain.setValueAtTime(0.001, now);
        chirpGain.gain.linearRampToValueAtTime(0.08, now + 0.04);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

        osc.connect(chirpGain);
        chirpGain.connect(mainGain);

        osc.start(now);
        osc.stop(now + 0.25);

        // Schedule next random chirp
        const nextInterval = 600 + Math.random() * (selectedTrack === 2 ? 3000 : 1800);
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
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startAudioSynthesis();
    } else {
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
    <div className="relative rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 sm:p-8 md:p-10 shadow-[0_24px_50px_rgba(22,41,38,0.08),_inset_0_2px_4px_rgba(255,255,255,0.9)] overflow-hidden">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4D9C8]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#E5F3F5] text-[#116B7B] border border-[#BCE2E7] flex items-center justify-center shadow-sm">
            <Disc className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#A3733E] uppercase tracking-wider block">
              33⅓ RPM Natural Soundscape
            </span>
            <h3 className="font-serif text-xl font-bold text-[#132422]">
              The Coorg Laya Birdsong Player
            </h3>
          </div>
        </div>

        {/* Live Audio Waves Visualizer */}
        <div className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0]">
          {[18, 28, 42, 24, 36, 48, 20, 32].map((height, idx) => (
            <motion.div
              key={idx}
              animate={{
                height: isPlaying ? [6, height, 8, height * 0.7, 6] : 6,
              }}
              transition={{
                duration: 0.8 + (idx % 3) * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`w-1 rounded-full ${
                isPlaying ? 'bg-[#1A96AA]' : 'bg-[#C2B5A0]'
              }`}
            />
          ))}
          <span className="text-[11px] font-mono font-bold text-[#116B7B] ml-2">
            {isPlaying ? 'PLAYING 60Hz' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Turntable Deck & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        
        {/* Left: 3D Turntable with Vinyl Disc & Tonearm */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-3xl bg-[#EFE8DC] border-2 border-[#DFD3C0] p-4 shadow-[inset_0_4px_12px_rgba(0,0,0,0.06),_0_12px_28px_rgba(22,41,38,0.08)] flex items-center justify-center">
            
            {/* Spinning Vinyl Record */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{
                rotate: {
                  duration: 2.8,
                  repeat: isPlaying ? Infinity : 0,
                  ease: 'linear',
                },
              }}
              className="relative w-64 sm:w-72 h-64 sm:h-72 rounded-full bg-[#162926] shadow-[0_12px_32px_rgba(0,0,0,0.35)] flex items-center justify-center"
              style={{
                background: `radial-gradient(circle, #243D38 0%, #162926 30%, #0F1E1B 60%, #162926 85%, #243D38 100%)`,
              }}
            >
              {/* Vinyl Grooves Texture */}
              <div className="absolute inset-2 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute inset-6 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-10 rounded-full border border-white/10 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-20 rounded-full border border-white/10 pointer-events-none" />

              {/* Gold Foil Center Label */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#A3733E] via-[#E2BA84] to-[#A3733E] shadow-md border-2 border-white/40 flex flex-col items-center justify-center text-center p-2">
                <span className="text-[8px] font-bold text-[#132422] uppercase tracking-tighter">
                  COORG LAYA
                </span>
                <span className="text-[7px] font-mono font-bold text-[#132422]/80">
                  ESTATE 33⅓
                </span>
                <div className="w-3 h-3 rounded-full bg-[#132422] mt-0.5 border border-white/40" />
              </div>
            </motion.div>

            {/* Realistic Metallic Tonearm with Pivot */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <div className="relative w-10 h-10 rounded-full bg-[#D5C7B2] border border-[#B8A78F] shadow-md flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[#635546]" />
                
                {/* Arm Wand */}
                <motion.div
                  animate={{
                    rotate: isPlaying ? 24 : 0,
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-4 left-4 w-2 h-36 origin-top-left"
                >
                  <div className="w-1.5 h-32 bg-gradient-to-r from-[#D5C7B2] via-white to-[#A3733E] rounded-full shadow-md" />
                  {/* Cartridge Needle Head */}
                  <div className="w-3.5 h-6 bg-[#132422] rounded-md border border-[#E2BA84] -mt-1 -ml-1 shadow-sm" />
                </motion.div>
              </div>
            </div>

            {/* Play/Pause Center Float Button on Mobile */}
            <button
              onClick={togglePlay}
              className="absolute z-30 w-14 h-14 rounded-full bg-[#1A96AA] hover:bg-[#116B7B] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-105"
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
            <h4 className="font-serif text-2xl font-bold text-[#132422]">
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
                    className={`p-3 rounded-2xl border text-left transition-all ${
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
