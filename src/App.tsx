import React, { useState, useEffect, useRef } from 'react';
import { Disc } from 'lucide-react';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/HUD';
import { StationModal } from './components/StationModal';
import { ExportDossierModal } from './components/ExportDossierModal';
import { ClassicView } from './components/ClassicView';
import { IntroScreen } from './components/IntroScreen';
import { ChatWithAsmaModal } from './components/ChatWithAsmaModal';
import { StationLocation, PlayerStats } from './types';
import { retroAudio } from './audio/retroAudio';

export default function App() {
  const [viewMode, setViewMode] = useState<'3d' | 'classic'>('3d');
  const [nearbyStation, setNearbyStation] = useState<StationLocation | null>(null);
  const [activeStationModal, setActiveStationModal] = useState<StationLocation | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [targetTeleportStation, setTargetTeleportStation] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(() => retroAudio.isSongPlaying());

  // Theme State: 'dark' (cyber night neon) vs 'light' (sunlit daytime penthouse)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('asmaa_portfolio_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem('asmaa_portfolio_theme', theme);
    } catch {}
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    retroAudio.playInteract();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Keyboard shortcut 'T' to toggle theme anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.key === 't' || e.key === 'T') {
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Player Stats with localStorage state loading
  const [stats, setStats] = useState<PlayerStats>(() => {
    try {
      const saved = localStorage.getItem('asmaa_game_stats');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      hp: 100,
      maxHp: 100,
      level: 99,
      exp: 450,
      maxExp: 1000,
      collectedBits: 0,
      totalBits: 20,
      discoveredStations: [],
      hacksCompleted: 0,
    };
  });

  // Save stats on update
  useEffect(() => {
    try {
      localStorage.setItem('asmaa_game_stats', JSON.stringify(stats));
    } catch {}
  }, [stats]);

  // Auto-start Real Game Soundtrack directly on load and on any interaction
  useEffect(() => {
    // 1. Direct immediate attempt on mount
    try {
      retroAudio.initContext();
      if (!retroAudio.isSongPlaying() && !retroAudio.getIsMuted()) {
        retroAudio.startMusic();
      }
    } catch {}

    // 2. Synchronize playback state
    const unsub = retroAudio.subscribeToState((playing) => {
      setIsPlayingAudio(playing);
    });

    // 3. Any user touch/click/key to immediately unleash audio if browser autoplay held it
    const startAudioOnGesture = () => {
      retroAudio.initContext();
      if (!retroAudio.isSongPlaying() && !retroAudio.getIsMuted()) {
        retroAudio.startMusic();
      }
    };

    const events = ['click', 'pointerdown', 'keydown', 'touchstart', 'mousedown', 'wheel'];
    events.forEach((ev) => window.addEventListener(ev, startAudioOnGesture, { passive: true }));

    return () => {
      unsub();
      events.forEach((ev) => window.removeEventListener(ev, startAudioOnGesture));
    };
  }, []);

  // Virtual Joystick & Touch state for mobile devices
  const [joystickVector, setJoystickVector] = useState<{ x: number; y: number } | null>(null);
  const [isActionPressed, setIsActionPressed] = useState(false);
  const [mouseSteerMode, setMouseSteerMode] = useState(false);
  const joystickContainerRef = useRef<HTMLDivElement>(null);
  const [isDraggingJoystick, setIsDraggingJoystick] = useState(false);
  const [joystickKnobPos, setJoystickKnobPos] = useState({ x: 0, y: 0 });

  // Handle Collecting a Bit
  const handleBitCollected = (count: number) => {
    setStats((prev) => {
      const newExp = prev.exp + 25;
      const newLevel = newExp >= prev.maxExp ? prev.level + 1 : prev.level;
      return {
        ...prev,
        collectedBits: count,
        exp: newExp,
        level: newLevel,
      };
    });
  };

  // Handle Hacking Victory
  const handleSuccessHack = () => {
    setStats((prev) => ({
      ...prev,
      exp: prev.exp + 100,
      hacksCompleted: prev.hacksCompleted + 1,
    }));
  };

  // Handle Teleport
  const handleTeleportTo = (stationId: string) => {
    setTargetTeleportStation(stationId);
  };

  // Touch Virtual Joystick Handlers
  const handleJoystickTouchStart = (e: React.TouchEvent) => {
    setIsDraggingJoystick(true);
    handleJoystickTouchMove(e);
  };

  const handleJoystickTouchMove = (e: React.TouchEvent) => {
    if (!joystickContainerRef.current) return;
    const rect = joystickContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const touch = e.touches[0];

    const deltaX = touch.clientX - centerX;
    const deltaY = touch.clientY - centerY;
    const distance = Math.hypot(deltaX, deltaY);
    const maxRadius = 38;

    const clampedDist = Math.min(distance, maxRadius);
    const angle = Math.atan2(deltaY, deltaX);

    const knobX = Math.cos(angle) * clampedDist;
    const knobY = Math.sin(angle) * clampedDist;

    setJoystickKnobPos({ x: knobX, y: knobY });
    setJoystickVector({
      x: knobX / maxRadius,
      y: knobY / maxRadius,
    });
  };

  const handleJoystickTouchEnd = () => {
    setIsDraggingJoystick(false);
    setJoystickKnobPos({ x: 0, y: 0 });
    setJoystickVector(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#060814] select-none">
      {viewMode === '3d' ? (
        <>
          {/* 3D WebGL Three.js Game World */}
          <GameCanvas
            onStationProximity={setNearbyStation}
            onBitCollected={handleBitCollected}
            targetTeleportStation={targetTeleportStation}
            onTeleportComplete={() => setTargetTeleportStation(null)}
            onOpenStation={(st) => {
              setActiveStationModal(st);
            }}
            joystickVector={joystickVector}
            isActionPressed={isActionPressed}
            activeModal={activeStationModal ? activeStationModal.id : (isExportModalOpen ? 'export' : null)}
            mouseSteerMode={mouseSteerMode}
            onToggleMouseSteer={() => setMouseSteerMode((prev) => !prev)}
            theme={theme}
          />

          {/* Heads Up Display Overlay */}
          <HUD
            stats={stats}
            nearbyStation={nearbyStation}
            onOpenStation={(st) => setActiveStationModal(st)}
            onTeleportTo={handleTeleportTo}
            onOpenExportModal={() => {
              retroAudio.playInteract();
              setIsExportModalOpen(true);
            }}
            onToggleViewMode={() => {
              retroAudio.playInteract();
              setViewMode('classic');
            }}
            viewMode={viewMode}
            onJoystickMove={setJoystickVector}
            onActionPress={() => {
              setIsActionPressed(true);
              setTimeout(() => setIsActionPressed(false), 200);
            }}
            mouseSteerMode={mouseSteerMode}
            onToggleMouseSteer={() => setMouseSteerMode((prev) => !prev)}
            onOpenChat={() => {
              retroAudio.playInteract();
              setIsChatModalOpen(true);
            }}
            onOpenIntro={() => {
              retroAudio.playInteract();
              setShowIntro(true);
            }}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          {/* MOBILE VIRTUAL JOYSTICK & ACTION BUTTONS (Touch Only) */}
          <div className="md:hidden pointer-events-none absolute inset-x-0 bottom-4 px-4 flex items-end justify-between z-30">
            {/* Left Thumb Virtual Joystick */}
            <div
              ref={joystickContainerRef}
              onTouchStart={handleJoystickTouchStart}
              onTouchMove={handleJoystickTouchMove}
              onTouchEnd={handleJoystickTouchEnd}
              className="pointer-events-auto w-24 h-24 rounded-full bg-[#0d172e]/80 border-2 border-cyan-500/40 relative flex items-center justify-center touch-none backdrop-blur-xs shadow-[0_0_15px_rgba(0,255,255,0.2)]"
            >
              <div
                className="w-10 h-10 rounded-full bg-cyan-400 border border-white shadow-lg pointer-events-none transition-transform"
                style={{
                  transform: `translate(${joystickKnobPos.x}px, ${joystickKnobPos.y}px)`,
                }}
              />
            </div>

            {/* Right Action Touch Buttons */}
            <div className="pointer-events-auto flex flex-col gap-2">
              {nearbyStation && (
                <button
                  onClick={() => {
                    retroAudio.playInteract();
                    setActiveStationModal(nearbyStation);
                  }}
                  className="w-14 h-14 rounded-full bg-emerald-500 text-black font-bold text-xs flex items-center justify-center shadow-lg border-2 border-white animate-pulse"
                >
                  ACCESS
                </button>
              )}

              <button
                onClick={() => {
                  retroAudio.playJump();
                  // trigger small jump/hover
                }}
                className="w-12 h-12 rounded-full bg-cyan-500/80 text-black font-bold text-xs flex items-center justify-center shadow-md border border-white"
              >
                JUMP
              </button>
            </div>
          </div>

          {/* Interactive Station Modal (CRT Terminal) */}
          {activeStationModal && (
            <StationModal
              station={activeStationModal}
              onClose={() => setActiveStationModal(null)}
              onSuccessHack={handleSuccessHack}
            />
          )}

          {/* Export Portfolio Dossier Modal */}
          {isExportModalOpen && (
            <ExportDossierModal
              onClose={() => setIsExportModalOpen(false)}
              playerStats={stats}
            />
          )}
        </>
      ) : (
        /* Classic Retro CRT Reader Mode */
        <ClassicView
          onSwitchTo3D={() => {
            retroAudio.playInteract();
            setViewMode('3d');
          }}
          onOpenExportModal={() => {
            retroAudio.playInteract();
            setIsExportModalOpen(true);
          }}
          onOpenChat={() => {
            retroAudio.playInteract();
            setIsChatModalOpen(true);
          }}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* Global Export Modal if opened in Classic Mode */}
      {viewMode === 'classic' && isExportModalOpen && (
        <ExportDossierModal
          onClose={() => setIsExportModalOpen(false)}
          playerStats={stats}
        />
      )}

      {/* CHAT WITH ASMA MODAL (DISPATCH TO EMAIL) */}
      {isChatModalOpen && (
        <ChatWithAsmaModal
          onClose={() => setIsChatModalOpen(false)}
        />
      )}

      {/* INTRO OVERLAY: WELCOME TO ASMA'S ROOM & INSTRUCTIONS OF USE */}
      {showIntro && (
        <IntroScreen
          onComplete={() => {
            setShowIntro(false);
            // Unleash audio when entering room
            retroAudio.initContext();
            if (!retroAudio.isSongPlaying() && !retroAudio.getIsMuted()) {
              retroAudio.startMusic();
            }
          }}
          onOpenChat={() => {
            setIsChatModalOpen(true);
          }}
        />
      )}

      {/* Quick Play Soundtrack Prompt if browser autoplay held audio until first interaction */}
      {!isPlayingAudio && (
        <div className="pointer-events-auto fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
          <button
            onClick={() => {
              retroAudio.startMusic();
              setIsPlayingAudio(true);
            }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0d1b2a]/95 border-2 border-[#00ffcc] text-[#00ffcc] font-mono text-xs font-bold tracking-wider shadow-[0_0_25px_rgba(0,255,204,0.4)] backdrop-blur-md hover:bg-[#00ffcc]/15 transition-all cursor-pointer animate-pulse"
          >
            <Disc className="w-4 h-4 animate-spin text-[#00ffcc]" />
            <span>CLICK TO ACTIVATE CYBER SOUNDTRACK</span>
          </button>
        </div>
      )}
    </div>
  );
}
