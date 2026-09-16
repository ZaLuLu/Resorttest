import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Sun, Sunrise, Sunset, Sparkles, Feather } from 'lucide-react';
import { resortData } from '../../data/resortData';

type LightAmbiance = 'dawn' | 'morning' | 'afternoon';

export const CinematicBirdsongSanctuary: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [ambiance, setAmbiance] = useState<LightAmbiance>('morning');
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setAudioProgress(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const ambianceConfig = {
    dawn: {
      name: 'Dawn Mist',
      time: '05:30 AM - 07:00 AM',
      icon: Sunrise,
      bgGradient: 'from-powder-100 via-powder-50 to-sand-50',
      accentColor: '#0284c7',
      description: 'Cool mountain mist settling softly over bamboo groves and lush lawns in Kushalnagar.',
    },
    morning: {
      name: 'Morning Sun',
      time: '07:00 AM - 11:30 AM',
      icon: Sun,
      bgGradient: 'from-butter-100 via-sand-50 to-powder-50',
      accentColor: '#e8c547',
      description: 'Warm golden sunlight filtering through tropical canopies as natural Kodagu birdsong begins.',
    },
    afternoon: {
      name: 'Golden Hour Dusk',
      time: '04:30 PM - 06:45 PM',
      icon: Sunset,
      bgGradient: 'from-butter-200/60 via-sand-50 to-powder-100',
      accentColor: '#b58914',
      description: 'Serene amber glow settling across the lawns as the air cools into tranquil valley stillness.',
    },
  };

  const currentAmbiance = ambianceConfig[ambiance];

  return (
    <section id="birdsong" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-sand-50 border-b border-ink-primary/8 overflow-hidden">
      {/* Audio element - ZERO autoplay */}
      <audio
        ref={audioRef}
        src={resortData.audio.birdsongAudioUrl}
        preload="none"
        loop
      />

      <div className="mx-auto max-w-7xl relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-butter-300 bg-butter-50 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.3em] font-semibold text-butter-700">
            <Feather className="size-3.5 text-butter-600" />
            <span>Natural Acoustic Heritage</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink-primary font-normal">
            Wake Up to Birdsong
          </h2>

          <div className="mx-auto w-24 butter-divider my-2" />

          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-light">
            Mornings at Coorg Laya Resort come alive with the unhurried chorus of forest birds. Settle into a tranquil atmosphere where gentle breezes and natural soundscapes restore your senses.
          </p>
        </div>

        {/* Pure Light-Mode Soundscape Card */}
        <motion.div
          layout
          className={`relative rounded-3xl border border-ink-primary/10 bg-gradient-to-br ${currentAmbiance.bgGradient} p-6 sm:p-12 shadow-xl transition-all duration-700 overflow-hidden text-ink-primary`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Waveform Visualizer & Audio Trigger */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] inline-flex items-center gap-2 text-ink-primary">
                  <Sparkles className="size-3.5 text-butter-600" />
                  <span>Ambient Forest Soundscape</span>
                </span>

                <button
                  onClick={toggleMute}
                  className="rounded-full p-2 hover:bg-black/5 text-ink-muted transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>
              </div>

              {/* Animated Waveform Visualizer in Powder Blue to Butter Yellow Gradient */}
              <div className="relative h-32 rounded-2xl border border-ink-primary/10 bg-white/95 p-5 flex items-center justify-between gap-1 overflow-hidden shadow-inner">
                {Array.from({ length: 36 }).map((_, i) => {
                  const baseHeight = ((i * 11) % 45) + 15;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        height: isPlaying ? [`${baseHeight}%`, `${(baseHeight + 50) % 95}%`, `${baseHeight}%`] : '12%',
                        opacity: isPlaying ? [0.6, 1, 0.6] : 0.25,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.1 + (i % 6) * 0.18,
                        ease: 'easeInOut',
                        delay: i * 0.04,
                      }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-powder-400 to-butter-400"
                    />
                  );
                })}

                {/* Central Play/Pause Trigger */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={togglePlay}
                    className="group relative flex size-16 items-center justify-center rounded-full bg-butter-400 text-ink-primary shadow-2xl transition-all hover:bg-butter-300 cursor-pointer border border-butter-500/20"
                    aria-label={isPlaying ? 'Pause Birdsong' : 'Play Birdsong'}
                  >
                    {isPlaying && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-butter-400/40" />
                    )}
                    {isPlaying ? <Pause className="size-6" /> : <Play className="size-6 ml-1" />}
                  </motion.button>
                </div>
              </div>

              {/* Audio progress bar */}
              <div className="space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-ink-primary/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-powder-400 to-butter-400 transition-all duration-300"
                    style={{ width: `${isPlaying ? audioProgress || 10 : 0}%` }}
                  />
                </div>
                <div className="flex justify-between text-[0.68rem] text-ink-muted">
                  <span className="font-medium text-ink-primary">{isPlaying ? 'Playing Ambient Birdsong' : 'Click Play to Listen (No Autoplay)'}</span>
                  <span>Coorg Sanctuary Ambience</span>
                </div>
              </div>

              <p className="text-[0.68rem] text-ink-muted italic">
                {resortData.audio.audioDisclaimer}
              </p>
            </div>

            {/* Atmosphere Ambiance Switcher */}
            <div className="lg:col-span-5 rounded-3xl border border-ink-primary/10 bg-white/90 p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-ink-primary/8">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-ink-primary">
                    Atmosphere Rhythm
                  </h3>
                  <span className="text-[0.68rem] text-ink-muted font-mono">{currentAmbiance.time}</span>
                </div>
                <span className="rounded-full bg-butter-50 border border-butter-300 px-3 py-1 text-[0.68rem] font-bold text-butter-700">
                  {currentAmbiance.name}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['dawn', 'morning', 'afternoon'] as LightAmbiance[]).map((mode) => {
                  const item = ambianceConfig[mode];
                  const Icon = item.icon;
                  const isActive = ambiance === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => setAmbiance(mode)}
                      className={`flex flex-col items-center justify-center rounded-2xl p-3 text-xs transition-all cursor-pointer ${
                        isActive
                          ? 'bg-ink-primary text-butter-200 font-semibold shadow-md'
                          : 'bg-sand-50 hover:bg-white text-ink-muted border border-ink-primary/5'
                      }`}
                    >
                      <Icon className="size-4 mb-1.5" />
                      <span className="text-[0.7rem]">{item.name}</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs leading-relaxed text-ink-muted min-h-[44px] font-light">
                {currentAmbiance.description}
              </p>

              <div className="pt-3 border-t border-ink-primary/8 flex items-center justify-between text-[0.7rem] text-ink-muted">
                <span>Kodagu Sanctuary Microclimate</span>
                <span className="text-butter-700 font-medium">Pure Air & Greenery</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
