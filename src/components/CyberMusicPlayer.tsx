import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
  Disc,
  ListMusic,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { retroAudio, GAME_TRACKS, SongTrack } from '../audio/retroAudio';

export const CyberMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(() => retroAudio.isSongPlaying());
  const [currentTrack, setCurrentTrack] = useState<SongTrack>(() => retroAudio.getCurrentTrack());
  const [isMuted, setIsMuted] = useState(() => retroAudio.getIsMuted());
  const [volume, setVolume] = useState(() => retroAudio.getVolume());
  const [currentStep, setCurrentStep] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);

  useEffect(() => {
    const unsubBeat = retroAudio.subscribeToBeat((step, track) => {
      setCurrentStep(step);
      setCurrentTrack(track);
      setIsPlaying(retroAudio.isSongPlaying());
    });

    const unsubState = retroAudio.subscribeToState((playing, track) => {
      setIsPlaying(playing);
      setCurrentTrack(track);
      setIsMuted(retroAudio.getIsMuted());
    });

    return () => {
      unsubBeat();
      unsubState();
    };
  }, []);

  const handleTogglePlay = () => {
    const playing = retroAudio.togglePlayPause();
    setIsPlaying(playing);
    setCurrentTrack(retroAudio.getCurrentTrack());
  };

  const handleNext = () => {
    retroAudio.nextTrack();
    setCurrentTrack(retroAudio.getCurrentTrack());
    if (!isPlaying) {
      retroAudio.startMusic();
      setIsPlaying(true);
    }
  };

  const handlePrev = () => {
    retroAudio.prevTrack();
    setCurrentTrack(retroAudio.getCurrentTrack());
    if (!isPlaying) {
      retroAudio.startMusic();
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (index: number) => {
    retroAudio.startMusic(index);
    setIsPlaying(true);
    setCurrentTrack(GAME_TRACKS[index]);
    setShowTrackList(false);
  };

  const handleToggleMute = () => {
    const muted = retroAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    retroAudio.setVolume(val);
    if (isMuted && val > 0) {
      retroAudio.toggleMute();
      setIsMuted(false);
    }
  };

  return (
    <div className="pointer-events-auto bg-[#090f1e]/95 backdrop-blur-md border border-cyan-500/40 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.2)] font-mono text-xs overflow-hidden transition-all duration-200 select-none">
      {/* COMPACT PLAYER BAR */}
      <div className="flex items-center gap-2.5 px-3 py-2">
        {/* Animated Vinyl / Disc Icon */}
        <button
          onClick={handleTogglePlay}
          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 hover:scale-105 transition-transform cursor-pointer flex-shrink-0"
          title={isPlaying ? 'Pause Soundtrack' : 'Play Soundtrack'}
        >
          <Disc
            className={`w-5 h-5 ${isPlaying ? 'animate-spin' : 'opacity-70'}`}
            style={{ animationDuration: '3s' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-2.5 h-2.5 fill-cyan-300 opacity-80" />
            ) : (
              <Play className="w-2.5 h-2.5 fill-cyan-300 ml-0.5" />
            )}
          </div>
        </button>

        {/* Track Info & Visualizer */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 cursor-pointer pr-1"
        >
          <div className="flex items-center justify-between gap-1.5">
            <span className="font-bold text-[10px] text-cyan-300 truncate max-w-[140px] sm:max-w-[180px]">
              {currentTrack.title}
            </span>
            <span className="text-[9px] text-amber-400 font-semibold px-1 rounded bg-amber-500/10 border border-amber-500/20">
              {currentTrack.bpm} BPM
            </span>
          </div>

          {/* Equalizer Dancing Bars */}
          <div className="flex items-end gap-1 h-3 mt-0.5">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              // Procedural height based on step and bar index
              const barHeight = isPlaying
                ? Math.min(100, Math.max(20, ((currentStep + i * 4) % 8) * 12 + Math.random() * 20))
                : 20;
              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-cyan-600 via-cyan-400 to-emerald-300 rounded-xs transition-all duration-75"
                  style={{ height: `${barHeight}%` }}
                />
              );
            })}
          </div>
        </div>

        {/* Quick Skip Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Previous Track"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleTogglePlay}
            className="p-1.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-400/40 transition-colors cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-cyan-300" />}
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Next Track"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Expand Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer ml-0.5"
            title="Soundtrack Settings & Tracks"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* EXPANDED SOUNDTRACK PANEL */}
      {isExpanded && (
        <div className="px-3 pb-3 pt-1 border-t border-slate-800/80 space-y-2.5 bg-[#060a16]">
          <div className="flex items-center justify-between text-[9px] text-slate-400">
            <span>GENRE: <strong className="text-emerald-400">{currentTrack.genre}</strong></span>
            <button
              onClick={() => setShowTrackList(!showTrackList)}
              className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ListMusic className="w-3 h-3" />
              <span>{showTrackList ? 'HIDE TRACKS' : 'ALL TRACKS (3)'}</span>
            </button>
          </div>

          {/* Track List Dropdown */}
          {showTrackList && (
            <div className="space-y-1 bg-[#040710] p-1.5 rounded border border-slate-800">
              {GAME_TRACKS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTrack(idx)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-[10px] text-left transition-colors cursor-pointer ${
                    currentTrack.id === t.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Music className="w-3 h-3 text-cyan-400" />
                    <span>{t.title}</span>
                  </div>
                  <span className="text-[9px] text-slate-500">{t.bpm} BPM</span>
                </button>
              ))}
            </div>
          )}

          {/* Volume Control Slider */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-800/60">
            <button
              onClick={handleToggleMute}
              className="text-slate-400 hover:text-white cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-[9px] text-slate-400 w-7 text-right">
              {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
