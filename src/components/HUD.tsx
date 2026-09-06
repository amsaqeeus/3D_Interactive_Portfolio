import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  FileDown,
  Compass,
  Sparkles,
  Gamepad2,
  Terminal,
  Shield,
  Layers,
  HelpCircle,
  X,
  Play,
  MousePointer,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';
import { PlayerStats, StationLocation } from '../types';
import { STATIONS, PORTFOLIO_INFO } from '../data/portfolioData';
import { retroAudio } from '../audio/retroAudio';
import { CyberMusicPlayer } from './CyberMusicPlayer';

interface HUDProps {
  stats: PlayerStats;
  nearbyStation: StationLocation | null;
  onOpenStation: (station: StationLocation) => void;
  onTeleportTo: (stationId: string) => void;
  onOpenExportModal: () => void;
  onToggleViewMode: () => void;
  viewMode: '3d' | 'classic';
  onJoystickMove: (vec: { x: number; y: number } | null) => void;
  onActionPress: () => void;
  mouseSteerMode?: boolean;
  onToggleMouseSteer?: () => void;
  onOpenChat?: () => void;
  onOpenIntro?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const HUD: React.FC<HUDProps> = ({
  stats,
  nearbyStation,
  onOpenStation,
  onTeleportTo,
  onOpenExportModal,
  onToggleViewMode,
  viewMode,
  onJoystickMove,
  onActionPress,
  mouseSteerMode = false,
  onToggleMouseSteer,
  onOpenChat,
  onOpenIntro,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-3 md:p-6 select-none font-mono">
      {/* ========== TOP BAR ========== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-3">
        {/* LEFT: PLAYER STATUS CRT CARD */}
        <div className="pointer-events-auto bg-[#0b1220]/90 backdrop-blur-md border-2 border-[#1e293b] p-3 rounded-md shadow-[0_0_20px_rgba(0,255,150,0.15)] flex flex-col gap-1 max-w-[340px] w-full sm:w-auto">
          <div className="flex items-center justify-between gap-2 border-b border-[#1e293b] pb-1.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold tracking-wider text-[#00ffcc]">
                {PORTFOLIO_INFO.name}
              </span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold">
              LV.{stats.level}
            </span>
          </div>

          {/* HP BAR */}
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-red-400 font-bold w-6">HP</span>
            <div className="relative flex-1 h-3 bg-[#0a0f1d] border border-red-900/60 rounded-xs overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${(stats.hp / stats.maxHp) * 100}%` }}
              />
            </div>
            <span className="text-emerald-400 text-[9px] w-12 text-right">
              {stats.hp}/{stats.maxHp}
            </span>
          </div>

          {/* EXP & DATA BITS */}
          <div className="flex items-center justify-between text-[9px] text-slate-300 pt-0.5">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Sparkles className="w-3 h-3 animate-spin" />
              <span>DATA BITS: {stats.collectedBits}/{stats.totalBits}</span>
            </div>
            <span className="text-slate-400 font-semibold">EXP: {stats.exp}</span>
          </div>
        </div>

        {/* CENTER / RIGHT: CYBER SOUNDTRACK PLAYER + ACTION BUTTONS */}
        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2 w-full sm:w-auto">
          {/* Real Game Soundtrack Music Player */}
          <CyberMusicPlayer />

          {/* Teleport / Stations Compass */}
          <div className="relative">
            <button
              onClick={() => setShowNavMenu(!showNavMenu)}
              className="px-3 py-2 bg-[#0f172a]/90 backdrop-blur-md border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-[10px] rounded-md cursor-pointer flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,255,255,0.15)] transition-all"
            >
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span className="hidden sm:inline">SELECT FOLDER</span>
            </button>

            {/* Quick Teleport Dropdown */}
            {showNavMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-[#0a0f1d]/95 backdrop-blur-lg border-2 border-cyan-500/40 rounded-lg p-2 shadow-2xl z-50 flex flex-col gap-1">
                <div className="text-[9px] text-slate-400 px-2 py-1 font-bold border-b border-slate-800 flex justify-between items-center">
                  <span>OFFICE DOSSIERS & FOLDERS</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setShowNavMenu(false)} />
                </div>
                {STATIONS.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      onTeleportTo(st.id);
                      setShowNavMenu(false);
                    }}
                    className="flex items-center justify-between px-2.5 py-1.5 text-[10px] rounded hover:bg-cyan-500/15 text-slate-200 hover:text-cyan-300 transition-colors text-left cursor-pointer border border-transparent hover:border-cyan-500/30"
                  >
                    <span className="font-semibold">📁 {st.name}</span>
                    <span
                      className="w-2 h-2 rounded-full shadow-sm"
                      style={{ backgroundColor: st.color }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* MOUSE STEER TOGGLE (Press M or Click) */}
          {viewMode === '3d' && (
            <button
              onClick={onToggleMouseSteer}
              className={`px-3 py-2 rounded-md border text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${
                mouseSteerMode
                  ? 'bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_18px_rgba(0,255,255,0.4)]'
                  : 'bg-[#0f172a]/90 border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-slate-500'
              }`}
              title="Toggle Mouse Steer Mode (Key: M) - Camera & movement direction follow cursor"
            >
              <MousePointer className={`w-3.5 h-3.5 ${mouseSteerMode ? 'text-cyan-300 animate-pulse' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">MOUSE STEER:</span>
              <span className={mouseSteerMode ? 'text-emerald-400 font-extrabold' : 'text-slate-400'}>
                {mouseSteerMode ? 'ON' : 'OFF'}
              </span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-black/40 text-slate-400 border border-slate-700 hidden lg:inline">M</span>
            </button>
          )}

          {/* CHAT WITH ASMA BUTTON */}
          <button
            onClick={() => {
              retroAudio.playInteract();
              if (onOpenChat) onOpenChat();
            }}
            className="px-3.5 py-2 bg-gradient-to-r from-cyan-500/25 via-teal-500/20 to-blue-600/25 border-2 border-cyan-400 hover:border-cyan-300 text-cyan-200 text-[10px] font-bold rounded-md cursor-pointer flex items-center gap-1.5 shadow-[0_0_18px_rgba(0,255,255,0.25)] hover:brightness-125 transition-all"
            title="Send direct email to Asma for software projects, questions, or quotes"
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            <span className="font-extrabold">CHAT WITH ASMA</span>
          </button>

          {/* EXPORT PORTFOLIO DOSSIER BUTTON */}
          <button
            onClick={onOpenExportModal}
            className="px-3.5 py-2 bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-amber-600/30 border-2 border-amber-400 text-amber-300 text-[10px] font-bold rounded-md cursor-pointer flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:brightness-125 transition-all animate-pulse"
            title="Export full portfolio dossier like a game save / CV"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>EXPORT DOSSIER</span>
          </button>

          {/* VIEW MODE TOGGLE (3D GAME <-> CLASSIC CRT) */}
          <button
            onClick={onToggleViewMode}
            className="p-2 sm:px-3 sm:py-2 bg-[#0f172a]/90 border border-purple-500/50 hover:border-purple-400 text-purple-300 text-[10px] rounded-md cursor-pointer flex items-center gap-1.5 shadow-[0_0_12px_rgba(224,86,253,0.2)] transition-all"
            title="Toggle between 3D Game & Retro CRT Reader mode"
          >
            {viewMode === '3d' ? (
              <>
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">READER CRT</span>
              </>
            ) : (
              <>
                <Gamepad2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">3D GAME</span>
              </>
            )}
          </button>

          {/* THEME TOGGLE: LIGHT / DARK MODE (Press T or Click) */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`p-2 sm:px-3 sm:py-2 rounded-md border text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-md ${
                theme === 'light'
                  ? 'bg-amber-100/95 border-amber-500 text-amber-950 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:bg-amber-200'
                  : 'bg-[#0f172a]/90 border-indigo-400/50 text-indigo-300 hover:border-indigo-300 hover:text-white shadow-[0_0_12px_rgba(99,102,241,0.25)]'
              }`}
              title="Toggle Light / Dark Mode (Key: T) - Switches day sunlit office vs night cyber atmosphere"
            >
              {theme === 'light' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
                  <span className="hidden sm:inline">LIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">DARK</span>
                </>
              )}
              <span className="text-[9px] px-1 rounded bg-black/30 text-slate-300 border border-slate-700/60 hidden lg:inline">T</span>
            </button>
          )}

          {/* Controls Help */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 rounded-md bg-[#0f172a]/80 border border-slate-700 text-slate-300 hover:text-white cursor-pointer"
            title="Help / Game Controls"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* HELP MODAL DIALOG */}
      {showHelp && (
        <div className="pointer-events-auto self-center bg-[#0d1527]/95 border-2 border-cyan-400 rounded-lg p-5 max-w-md shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30">
            <h3 className="text-cyan-300 font-bold text-xs flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" /> 3D GAME CONTROLS & DIRECTIVES
            </h3>
            <X className="w-4 h-4 cursor-pointer text-slate-400 hover:text-white" onClick={() => setShowHelp(false)} />
          </div>
          <div className="mt-3 space-y-2 text-[11px] text-slate-300">
            <p className="text-amber-300 font-semibold">Mission Directive:</p>
            <p>
              You are the operative exploring Asmaa Belkerrouche&apos;s cyber realm. Walk to interactive stations to decrypt her projects, career missions, and certifications.
            </p>
            <div className="bg-[#060a14] p-3 rounded border border-slate-800 space-y-1.5 mt-2">
              <p><span className="text-cyan-400 font-bold">Press & Move Mouse:</span> <span className="text-emerald-300 font-semibold">Look Around freely</span> in 360° horizontal yaw + vertical pitch tilt (like real 3D games!)</p>
              <p><span className="text-cyan-400 font-bold">Mouse Move (Aim):</span> Holographic reticle aims on ground; operative & visor track cursor</p>
              <p><span className="text-cyan-400 font-bold">W / A / S / D:</span> Move & strafe operative relative to camera heading</p>
              <p><span className="text-cyan-400 font-bold">Right-Click + Drag:</span> Orbit camera & snap operative to look direction</p>
              <p><span className="text-cyan-400 font-bold">Hold Left-Click (no drag):</span> Drive/steer operative directly toward cursor</p>
              <p><span className="text-cyan-400 font-bold">Mouse Wheel:</span> Zoom camera in / out</p>
              <p><span className="text-cyan-400 font-bold">M Key / HUD Button:</span> Toggle Mouse Steer mode (continuous camera steer)</p>
              <p><span className="text-amber-400 font-bold">T Key / HUD Button:</span> Toggle Light / Dark Mode (Day sunlit office vs Night cyber)</p>
              <p><span className="text-cyan-400 font-bold">Shift:</span> Cyber Thruster Sprint</p>
              <p><span className="text-cyan-400 font-bold">Space:</span> Jetpack Hover / Jump</p>
              <p><span className="text-cyan-400 font-bold">E / Tap Prompt:</span> Access Cyber Station</p>
              <p><span className="text-emerald-400 font-bold">Cyan Octahedrons:</span> Collect Data Bits to level up!</p>
            </div>

            <div className="pt-2 flex items-center justify-between gap-2">
              {onOpenIntro && (
                <button
                  onClick={() => {
                    setShowHelp(false);
                    onOpenIntro();
                  }}
                  className="px-3 py-1.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold hover:bg-cyan-900/60 cursor-pointer"
                >
                  REPLAY INTRO & MANUAL
                </button>
              )}

              {onOpenChat && (
                <button
                  onClick={() => {
                    setShowHelp(false);
                    onOpenChat();
                  }}
                  className="px-3 py-1.5 rounded bg-blue-900/60 border border-blue-400/50 text-blue-200 text-[10px] font-bold hover:bg-blue-800/80 cursor-pointer flex items-center gap-1 ml-auto"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>CHAT WITH ASMA</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========== BOTTOM INTERACTIVE PROMPT & CONTROL HINT ========== */}
      <div className="flex flex-col items-center gap-2 mb-2">
        {/* Desktop Quick Hint */}
        {viewMode === '3d' && (
          <div className="hidden lg:flex items-center gap-3 text-[10px] text-slate-400 bg-[#09101d]/85 border border-slate-800/80 px-3.5 py-1 rounded-full backdrop-blur-sm pointer-events-none shadow-lg">
            <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
              <MousePointer className="w-3 h-3" /> Press & Move Mouse: Look Around (360° & Pitch)
            </span>
            <span className="text-slate-600">•</span>
            <span>W/A/S/D: Move</span>
            <span className="text-slate-600">•</span>
            <span>Scroll: Zoom</span>
            <span className="text-slate-600">•</span>
            <span>Shift: Sprint</span>
          </div>
        )}

        {nearbyStation && (
          <div className="pointer-events-auto animate-bounce flex items-center gap-2 bg-[#090f1d]/95 backdrop-blur-md border-2 px-5 py-2.5 rounded-full shadow-[0_0_25px_rgba(0,255,200,0.3)] cursor-pointer"
            style={{ borderColor: nearbyStation.color }}
            onClick={() => onOpenStation(nearbyStation)}
          >
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold text-black"
              style={{ backgroundColor: nearbyStation.color }}
            >
              PRESS [E] OR CLICK
            </span>
            <span className="text-xs font-bold tracking-wide" style={{ color: nearbyStation.color }}>
              OPEN {nearbyStation.name}
            </span>
          </div>
        )}
      </div>

      {/* ========== BOTTOM BAR (RADAR & QUICK STATIONS) ========== */}
      <div className="flex items-end justify-between gap-4">
        {/* QUICK ACCESS DOCK */}
        <div className="pointer-events-auto hidden md:flex items-center gap-1.5 bg-[#09101d]/90 backdrop-blur-md p-1.5 rounded-lg border border-slate-800 shadow-xl">
          {STATIONS.map((st) => (
            <button
              key={st.id}
              onClick={() => onTeleportTo(st.id)}
              className="px-2.5 py-1.5 rounded text-[9px] font-medium text-slate-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer border border-transparent hover:border-slate-700"
              style={{
                backgroundColor: nearbyStation?.id === st.id ? `${st.color}22` : 'transparent',
                borderColor: nearbyStation?.id === st.id ? st.color : 'transparent',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: st.color }} />
              <span>📁 {st.name}</span>
            </button>
          ))}
        </div>

        {/* RADAR MINIMAP */}
        <div className="pointer-events-auto bg-[#070b16]/95 border-2 border-cyan-500/50 rounded-xl p-2.5 shadow-[0_0_20px_rgba(0,255,255,0.2)] flex flex-col items-center">
          <div className="text-[8px] text-cyan-400 font-bold tracking-widest mb-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            OFFICE RADAR
          </div>
          <div className="relative w-28 h-28 bg-[#040812] border border-cyan-900/60 rounded-full overflow-hidden flex items-center justify-center">
            {/* Radar Sweep Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-spin-slow pointer-events-none rounded-full" />
            <div className="absolute inset-2 border border-cyan-900/30 rounded-full" />
            <div className="absolute inset-6 border border-cyan-900/20 rounded-full" />
            <div className="absolute w-full h-[1px] bg-cyan-900/30" />
            <div className="absolute h-full w-[1px] bg-cyan-900/30" />

            {/* Folder Blips on Radar (mapped from office room coordinates) */}
            {STATIONS.map((st) => {
              // Office room is -12 to +12, scale to 112px radar
              const blipX = 56 + (st.position[0] / 12) * 44;
              const blipY = 56 + (st.position[2] / 12) * 44;
              return (
                <div
                  key={st.id}
                  onClick={() => onTeleportTo(st.id)}
                  className="absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-150"
                  style={{
                    left: `${blipX}px`,
                    top: `${blipY}px`,
                    backgroundColor: st.color,
                    boxShadow: `0 0 6px ${st.color}`,
                  }}
                  title={st.name}
                />
              );
            })}

            {/* Player Blip in Center */}
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#10b981] z-10 border border-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
