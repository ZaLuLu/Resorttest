import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Sun, Sunrise, Sunset, Sparkles, Feather } from 'lucide-react';
import { resortData } from '../../data/resortData';

type AtmosphereMode = 'dawn' | 'morning' | 'twilight';

export const BirdsongExperience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [atmosphere, setAtmosphere] = useState<AtmosphereMode>('morning');
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

  const atmosphereConfig = {
    dawn: {
      name: 'Dawn Mist',
      icon: Sunrise,
      bgGradient: 'from-[#e0f2fe] via-[#f0eae0] to-[#f7f4ec]',
      textColor: 'text-[#0c4a6e]',
      cardBorder: 'border-sky-300/60',
      description: 'Cool morning mist settling softly over bamboo groves and lush lawns in Kushalnagar.',
    },
    morning: {
      name: 'Morning Sun',
      icon: Sun,
      bgGradient: 'from-[#fdf6e7] via-[#f7f4ec] to-[#f0eae0]',
      textColor: 'text-[#1a1c1e]',
      cardBorder: 'border-[#c5a368]/40',
      description: 'Warm golden sunlight filtering through canopies as natural morning birdsong begins.',
    },
    twilight: {
      name: 'Twilight Blue',
      icon: Sunset,
      bgGradient: 'from-[#091b2e] via-[#0e2742] to-[#050f1c]',
      textColor: 'text-[#f7f4ec]',
      cardBorder: 'border-white/15',
      description: 'Serene dusk settling in as day cools down into peaceful Kodagu stillness.',
    },
  };

  const currentAtmosphere = atmosphereConfig[atmosphere];
  const isDarkAtmosphere = atmosphere === 'twilight';

  return (
    <section id="birdsong" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#f7f4ec] overflow-hidden">
      {/* Native audio element - NO autoplay */}
      <audio
        ref={audioRef}
        src={resortData.audio.birdsongAudioUrl}
        preload="none"
        loop
      />

      <div className="mx-auto max-w-7xl relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a368]/40 bg-[#f0eae0] px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.25em] font-semibold text-[#a6854e]">
            <Feather className="size-3.5" />
            <span>03 / Signature Experience</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#1a1c1e] font-normal">
            Wake Up to Birdsong
          </h2>

          <p className="text-xs sm:text-sm text-[#1a1c1e]/75 leading-relaxed font-light">
            Mornings at Coorg Laya Resort come alive with the natural chirping sounds of birds. Surrounded by greenery and a peaceful atmosphere, it is a place to slow down, listen to nature, and enjoy quieter moments away from the rush of everyday life.
          </p>
        </div>

        {/* Interactive Soundscape Card & Atmosphere Controller */}
        <motion.div
          layout
          className={`relative rounded-3xl border ${currentAtmosphere.cardBorder} bg-gradient-to-br ${currentAtmosphere.bgGradient} p-6 sm:p-10 shadow-xl transition-all duration-700 overflow-hidden ${
            isDarkAtmosphere ? 'text-white' : 'text-[#1a1c1e]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Waveform Visualizer & Audio Trigger */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] inline-flex items-center gap-2">
                  <Sparkles className="size-3.5 text-[#c5a368]" />
                  <span>Ambient Forest Soundscape</span>
                </span>

                {/* Mute Button */}
                <button
                  onClick={toggleMute}
                  className="rounded-full p-2 hover:bg-black/10 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                </button>
              </div>

              {/* Animated Waveform Visualizer */}
              <div className={`relative h-28 rounded-2xl border p-4 flex items-center justify-between gap-1 overflow-hidden ${
                isDarkAtmosphere ? 'bg-black/40 border-white/10' : 'bg-white/70 border-[#1a1c1e]/10'
              }`}>
                {Array.from({ length: 32 }).map((_, i) => {
                  const baseHeight = ((i * 7) % 40) + 20;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        height: isPlaying ? [`${baseHeight}%`, `${(baseHeight + 40) % 95}%`, `${baseHeight}%`] : '15%',
                        opacity: isPlaying ? [0.6, 1, 0.6] : 0.3,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2 + (i % 5) * 0.2,
                        ease: 'easeInOut',
                        delay: i * 0.05,
                      }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-[#38bdf8] to-[#c5a368]"
                    />
                  );
                })}

                {/* Play/Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlay}
                    className="group relative flex size-14 items-center justify-center rounded-full bg-[#c5a368] text-[#1a1c1e] shadow-lg transition-transform hover:scale-105 hover:bg-[#dfc79e]"
                    aria-label={isPlaying ? 'Pause Birdsong' : 'Play Birdsong'}
                  >
                    {isPlaying && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-[#c5a368]/40" />
                    )}
                    {isPlaying ? <Pause className="size-6" /> : <Play className="size-6 ml-0.5" />}
                  </button>
                </div>
              </div>

              {/* Progress & Disclaimer */}
              <div className="space-y-1">
                <div className="h-1.5 w-full rounded-full bg-black/10 overflow-hidden">
                  <div
                    className="h-full bg-[#c5a368] transition-all duration-300"
                    style={{ width: `${isPlaying ? audioProgress || 10 : 0}%` }}
                  />
                </div>
                <div className="flex justify-between text-[0.68rem] opacity-75">
                  <span>{isPlaying ? 'Playing Ambient Birdsong' : 'Click Play to Listen (No Autoplay)'}</span>
                  <span>Natural Ambient Loop</span>
                </div>
              </div>

              <p className="text-[0.7rem] opacity-70 italic">
                {resortData.audio.audioDisclaimer}
              </p>
            </div>

            {/* Atmosphere Mode Switcher */}
            <div className={`lg:col-span-5 rounded-2xl border p-6 space-y-4 ${
              isDarkAtmosphere ? 'bg-black/30 border-white/10' : 'bg-white/60 border-[#1a1c1e]/10'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold">
                  Atmosphere Mode
                </h3>
                <span className="text-[0.68rem] font-bold text-[#c5a368]">
                  {currentAtmosphere.name}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['dawn', 'morning', 'twilight'] as AtmosphereMode[]).map((mode) => {
                  const item = atmosphereConfig[mode];
                  const Icon = item.icon;
                  const isActive = atmosphere === mode;
                  return (
                    <button
                      key={mode}
                      onClick={() => setAtmosphere(mode)}
                      className={`flex flex-col items-center justify-center rounded-xl p-3 text-xs transition-all ${
                        isActive
                          ? 'bg-[#1a1c1e] text-[#dfc79e] font-semibold shadow-md'
                          : 'bg-white/40 hover:bg-white/80 border border-black/5'
                      }`}
                    >
                      <Icon className="size-4 mb-1.5" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-xs leading-relaxed opacity-85 min-h-[42px]">
                {currentAtmosphere.description}
              </p>

              <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[0.7rem] opacity-75">
                <span>Kodagu Sanctuary Microclimate</span>
                <span className="text-[#c5a368] font-medium">Pure Air & Greenery</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
