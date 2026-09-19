import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Disc, Feather, Music, ShieldCheck } from 'lucide-react';

export const VinylBirdsongPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [needleOnRecord, setNeedleOnRecord] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setNeedleOnRecord(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Sync play/pause with needle drop animation
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      setNeedleOnRecord(true);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback error / Autoplay blocked:', err);
          setIsPlaying(false);
          setNeedleOnRecord(false);
        });
      }
    } else {
      audio.pause();
      setNeedleOnRecord(false);
    }
  }, [isPlaying]);

  // Sync volume & mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative rounded-3xl sm:rounded-4xl bg-[#FAF6EF] border border-[#E4D9C8] p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.12),_inset_0_2px_4px_rgba(255,255,255,0.9)] overflow-hidden">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/BirdsAudio.mpeg"
        preload="metadata"
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4D9C8]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#E5F3F5] text-[#116B7B] border border-[#BCE2E7] flex items-center justify-center shadow-sm shrink-0">
            <Disc className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3.6s' }} />
          </div>
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#A3733E] uppercase tracking-wider block">
              33⅓ RPM Natural Soundscape · Live Turntable
            </span>
            <h3 className="font-serif text-lg sm:text-2xl font-bold text-[#132422]">
              Coorg Laya Living Birdsong
            </h3>
          </div>
        </div>

        {/* Live Audio Waves Visualizer (Strict Fixed-Height Container) */}
        <div className="h-10 sm:h-11 self-start sm:self-auto flex items-center gap-1.5 px-3.5 sm:px-4 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0] shadow-sm overflow-hidden">
          <div className="h-5 sm:h-6 flex items-end gap-1 overflow-hidden">
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
          <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#116B7B] ml-2 select-none">
            {isPlaying ? 'ACTIVE 33⅓ RPM' : 'STANDBY'}
          </span>
        </div>
      </div>

      {/* Turntable Deck & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        
        {/* Left: Turntable with Vinyl Disc & Mechanical Tonearm */}
        <div className="lg:col-span-6 flex items-center justify-center relative overflow-visible">
          
          {/* Radiating Soundwave Ripples when Playing */}
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
              <motion.div
                animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                className="w-64 sm:w-72 h-64 sm:h-72 rounded-full border border-[#1A96AA]/40 absolute pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1, 1.65], opacity: [0.4, 0] }}
                transition={{ duration: 2.2, delay: 0.8, repeat: Infinity, ease: 'easeOut' }}
                className="w-64 sm:w-72 h-64 sm:h-72 rounded-full border border-[#E2BA84]/35 absolute pointer-events-none"
              />
            </div>
          )}

          {/* Turntable Plinth Deck */}
          <div className="relative w-[270px] sm:w-80 h-[270px] sm:h-80 rounded-3xl bg-[#EFE8DC] border-2 border-[#DFD3C0] p-3 sm:p-4 shadow-[inset_0_4px_12px_rgba(0,0,0,0.08),_0_16px_40px_rgba(0,0,0,0.18)] flex items-center justify-center shrink-0">
            
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
              className="relative w-60 sm:w-72 h-60 sm:h-72 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.45)] flex items-center justify-center overflow-hidden"
              style={{
                background: `radial-gradient(circle, #223B36 0%, #162926 28%, #0C1715 55%, #162926 80%, #223B36 100%)`,
              }}
            >
              {/* Rotating Anisotropic Specular Light Sheen */}
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
              <div className="relative w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-gradient-to-tr from-[#8C5F2E] via-[#E2BA84] to-[#A3733E] shadow-lg border-2 border-white/40 flex flex-col items-center justify-center text-center p-2 z-10">
                <span className="text-[7px] sm:text-[8px] font-extrabold text-[#132422] uppercase tracking-tighter">
                  COORG LAYA
                </span>
                <span className="text-[6px] sm:text-[7px] font-mono font-bold text-[#132422]/80">
                  SANCTUARY 33⅓
                </span>
                <div className="w-3 h-3 rounded-full bg-[#132422] mt-0.5 border border-white/50" />
              </div>
            </motion.div>

            {/* Realistic Mechanical Tonearm with Smooth Swing & Needle Drop */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 pointer-events-none">
              {/* Pivot Base */}
              <div className="relative w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-br from-[#E5E7EB] via-[#D1D5DB] to-[#9CA3AF] border-2 border-[#9CA3AF] shadow-[0_4px_12px_rgba(0,0,0,0.35)] flex items-center justify-center">
                {/* Knurled Counterweight Dial */}
                <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-gradient-to-br from-[#374151] to-[#111827] border border-[#6B7280] shadow-inner flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E5E7EB]" />
                </div>
                
                {/* Arm Wand with Realistic Pivot */}
                <motion.div
                  animate={{
                    rotate: isPlaying ? 28 : 0,
                  }}
                  transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute top-5 left-5 sm:top-6 sm:left-6 origin-top-left"
                >
                  {/* Metallic Tonearm Stem */}
                  <div className="relative w-2 sm:w-2.5 h-[120px] sm:h-[145px] rounded-full shadow-[2px_4px_10px_rgba(0,0,0,0.35)] bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF] border border-[#9CA3AF]/60">
                    <div className="absolute top-8 -left-1 w-3.5 h-1 bg-[#4B5563] rounded" />
                  </div>
                  
                  {/* Cartridge Headshell & Stylus Needle */}
                  <motion.div
                    animate={{
                      scale: needleOnRecord ? 0.96 : 1,
                      y: needleOnRecord ? 2.5 : 0,
                    }}
                    transition={{ duration: 0.25 }}
                    className="absolute -bottom-2 -left-2 w-5 sm:w-6 h-8 sm:h-10 rounded-md bg-[#18181B] border border-[#F59E0B] shadow-[0_4px_8px_rgba(0,0,0,0.4)] flex flex-col items-center justify-between p-1"
                  >
                    <div className="w-1 h-2 bg-[#D97706] rounded-full -mt-1.5 -mr-4" />
                    <div className="w-2.5 h-1 bg-[#F59E0B] rounded-full" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shadow-[0_0_6px_#EF4444]" />
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Center Play/Pause Floating Action Button */}
            <button
              onClick={togglePlay}
              className="absolute z-30 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#1A96AA] hover:bg-[#116B7B] text-white shadow-[0_8px_24px_rgba(26,150,170,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
              aria-label={isPlaying ? 'Pause Birdsong' : 'Play Birdsong'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
          </div>
        </div>

        {/* Right: Authentic Audio Track Controls, Scrubber & Species */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5F3F5] text-[#116B7B] text-xs font-bold border border-[#BCE2E7] mb-2">
              <Feather className="w-3.5 h-3.5" />
              <span>Authentic Sanctuary Recording</span>
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#132422]">
              Morning Birdsong & Forest Breeze
            </h4>
            <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed mt-1.5">
              Original acoustic nature recording captured under the morning bamboo and silver oak canopy of Coorg Laya Resort in Kushalnagar.
            </p>
          </div>

          {/* Native Species In This Track */}
          <div>
            <span className="text-[11px] font-bold text-[#A3733E] uppercase tracking-wider block mb-2">
              Identified Native Species:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Malabar Whistling Thrush', 'Red-whiskered Bulbul', 'Oriental White-eye', 'White-throated Kingfisher'].map((bird, bIdx) => (
                <span
                  key={bIdx}
                  className="text-xs font-bold text-[#162926] bg-[#EFE8DC] px-3 py-1 rounded-full border border-[#DFD3C0]"
                >
                  🐦 {bird}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Audio Progress Scrubber */}
          <div className="space-y-1.5 pt-2">
            <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#635546]">
              <span>{formatTime(currentTime)}</span>
              <span className="text-[11px] font-sans font-bold text-[#116B7B] uppercase tracking-wider">
                {isPlaying ? 'Playing Live Track' : 'Paused'}
              </span>
              <span>{formatTime(duration)}</span>
            </div>
            
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.5"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 rounded-lg bg-[#DFD3C0] accent-[#1A96AA] cursor-pointer"
            />
          </div>

          {/* Volume & Play Control Bar */}
          <div className="pt-3 border-t border-[#E4D9C8] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="text-[#132422] hover:text-[#1A96AA] transition-colors cursor-pointer"
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
                className="w-24 sm:w-32 h-1.5 rounded-lg bg-[#DFD3C0] accent-[#1A96AA] cursor-pointer"
              />
            </div>

            <button
              onClick={togglePlay}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                isPlaying
                  ? 'bg-[#132422] text-white hover:bg-black'
                  : 'bg-gradient-to-r from-[#1A96AA] to-[#116B7B] text-white hover:from-[#158092] hover:to-[#0D5764]'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Sound' : 'Play Sound'}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default VinylBirdsongPlayer;
