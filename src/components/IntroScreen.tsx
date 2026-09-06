import React, { useEffect, useState } from 'react';
import { 
  FolderGit2, 
  MousePointer, 
  Compass, 
  ArrowRight, 
  MessageSquare, 
  Keyboard, 
  Eye, 
  Layers,
  Sparkles,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { retroAudio } from '../audio/retroAudio';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface IntroScreenProps {
  onComplete: () => void;
  onOpenChat: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete, onOpenChat }) => {
  const [step, setStep] = useState<'welcome' | 'instructions'>('welcome');

  // Listen for Enter key to progress through steps
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (step === 'welcome') {
          retroAudio.playInteract();
          setStep('instructions');
        } else if (step === 'instructions') {
          retroAudio.playSuccess();
          onComplete();
        }
      } else if (e.key === 'Escape') {
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, onComplete]);

  const handleNextStep = () => {
    retroAudio.playInteract();
    setStep('instructions');
  };

  const handleFinish = () => {
    retroAudio.playSuccess();
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#040711]/90 backdrop-blur-xl animate-fade-in select-none">
      {/* CRT Scanline and ambient cyber grid glow */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/5 to-transparent bg-size-[100%_4px]" />
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />

      {step === 'welcome' ? (
        /* STEP 1: WELCOME TO ASMA'S ROOM */
        <div className="relative w-full max-w-xl bg-[#090f20]/95 border-2 border-cyan-400/70 rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.3)] p-6 sm:p-8 text-center flex flex-col items-center space-y-6">
          {/* Top Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[11px] text-cyan-300 font-mono tracking-widest uppercase shadow-[0_0_12px_rgba(0,255,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>EXECUTIVE 3D OFFICE // ACTIVE SESSION</span>
          </div>

          {/* Central Room Icon */}
          <div className="relative w-24 h-24 rounded-2xl bg-linear-to-br from-cyan-500/20 via-blue-600/15 to-purple-600/20 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.35)]">
            <div className="text-4xl">🏢</div>
            <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded bg-emerald-500 text-black text-[9px] font-black tracking-wider">
              ONLINE
            </span>
          </div>

          {/* Main Title & Bio Tag */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-cyan-200 to-cyan-400 drop-shadow-sm">
              WELCOME TO ASMA'S ROOM
            </h1>
            <p className="text-xs sm:text-sm text-cyan-300/90 font-mono font-medium max-w-md mx-auto">
              Asma Belkerrouche — AI & Cybersecurity Student at ESTIN Higher School & Software Developer
            </p>
          </div>

          {/* Quick Mission Brief */}
          <div className="w-full bg-[#050914] border border-cyan-900/80 rounded-xl p-4 text-left font-mono space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ROOM DOSSIER HIGHLIGHTS</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Step inside Asma's personal executive workspace. Explore 3D classified project folders, desktop software builds, enterprise defense audits, AI models, and real-world client platforms.
            </p>
          </div>

          {/* Main Actions */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {/* Enter Room Button */}
            <button
              onClick={handleNextStep}
              className="w-full sm:w-auto flex-1 px-6 py-3.5 rounded-xl bg-linear-to-r from-cyan-400 via-teal-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-mono font-black text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(0,255,255,0.4)] flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer animate-pulse"
            >
              <span>PRESS [ENTER] TO CONTINUE</span>
              <ArrowRight className="w-4 h-4 text-slate-950 stroke-[3]" />
            </button>

            {/* Chat with Asma Button */}
            <button
              onClick={() => {
                retroAudio.playInteract();
                onOpenChat();
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#0f1b33] hover:bg-[#152445] border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-200 font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-cyan-300" />
              <span>CHAT WITH ASMA</span>
            </button>
          </div>

          <p className="text-[10px] text-slate-500 font-mono">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">ENTER</kbd> on your keyboard or click the button above
          </p>
        </div>
      ) : (
        /* STEP 2: INSTRUCTIONS OF USE */
        <div className="relative w-full max-w-2xl bg-[#090f20]/95 border-2 border-cyan-400/70 rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.3)] p-6 sm:p-7 flex flex-col space-y-5 max-h-[92vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                <Keyboard className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-mono font-black text-cyan-200 tracking-wide">
                  INSTRUCTIONS OF USE // ROOM MANUAL
                </h2>
                <p className="text-[11px] text-slate-400 font-mono">
                  Master the controls to explore Asma's 3D executive office
                </p>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-mono text-[10px] font-bold">
              STEP 2 OF 2
            </span>
          </div>

          {/* Instructions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {/* Control 1: Movement */}
            <div className="p-3 bg-[#060b17] border border-cyan-900/80 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between text-cyan-300 font-bold text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
                  AVATAR MOVEMENT
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">WASD / ARROWS</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Use <kbd className="text-cyan-200">W</kbd><kbd className="text-cyan-200">A</kbd><kbd className="text-cyan-200">S</kbd><kbd className="text-cyan-200">D</kbd> or arrow keys to walk around the room. On mobile devices, use the virtual on-screen joystick.
              </p>
            </div>

            {/* Control 2: Camera Orbit */}
            <div className="p-3 bg-[#060b17] border border-cyan-900/80 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between text-cyan-300 font-bold text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  LOOK & ROTATE CAMERA
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">CLICK & DRAG</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Click and drag your mouse anywhere on screen to smoothly rotate the 360° perspective. Use the scroll wheel to zoom in or out.
              </p>
            </div>

            {/* Control 3: Open 3D Dossier Folders */}
            <div className="p-3 bg-[#060b17] border border-cyan-900/80 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between text-cyan-300 font-bold text-[11px]">
                <span className="flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
                  INSPECT 3D DOSSIERS
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">[E] OR DIRECT CLICK</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Walk up to any dossier desk and press <kbd className="text-emerald-300">[E]</kbd>, or click directly on any 3D folder to open projects, engineering missions, and skills.
              </p>
            </div>

            {/* Control 4: Fast Dossier Teleport */}
            <div className="p-3 bg-[#060b17] border border-cyan-900/80 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between text-cyan-300 font-bold text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  FAST DOSSIER WARP
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">TOP BAR</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Click <strong>"📁 SELECT FOLDER"</strong> in the top navigation bar to instantly teleport directly in front of any dossier station.
              </p>
            </div>

            {/* Control 5: Mouse Steer Mode */}
            <div className="p-3 bg-[#060b17] border border-cyan-900/80 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between text-cyan-300 font-bold text-[11px]">
                <span className="flex items-center gap-1.5">
                  <MousePointer className="w-3.5 h-3.5 text-cyan-400" />
                  MOUSE STEER MODE
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">KEY [M]</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Press <kbd className="text-cyan-200">M</kbd> to toggle mouse steer mode, allowing your avatar and camera to smoothly face your cursor direction.
              </p>
            </div>

            {/* Control 6: Jump & Traversal */}
            <div className="p-3 bg-[#060b17] border border-cyan-900/80 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between text-cyan-300 font-bold text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  JUMP / TRAVERSAL
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700">SPACEBAR</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Press <kbd className="text-purple-300">Space</kbd> to jump. Collect hidden USB data drives and memory chips scattered around the office shelves to level up!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                retroAudio.playInteract();
                setStep('welcome');
              }}
              className="text-[11px] text-slate-400 hover:text-cyan-300 font-mono underline cursor-pointer"
            >
              ← Back to Welcome
            </button>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => {
                  retroAudio.playInteract();
                  onOpenChat();
                }}
                className="w-1/2 sm:w-auto px-4 py-3 rounded-xl bg-[#0f1b33] hover:bg-[#152445] border border-cyan-500/50 text-cyan-200 font-mono font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-cyan-300" />
                <span>CHAT WITH ASMA</span>
              </button>

              <button
                onClick={handleFinish}
                className="w-1/2 sm:w-auto px-6 py-3 rounded-xl bg-linear-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 font-mono font-black text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(0,255,255,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer animate-pulse"
              >
                <span>ENTER ASMA'S ROOM [ENTER]</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
