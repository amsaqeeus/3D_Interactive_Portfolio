// Professional Web Audio API Real Game Chiptune & Synthwave Sound Engine
// Multi-channel Polyphony: Lead Synth, Arpeggio, Bassline, and Synthesized Drums (Kick, Snare, Hi-hat)

export interface SongTrack {
  id: string;
  title: string;
  bpm: number;
  genre: string;
  leadNotes: (number | null)[];
  arpNotes: (number | null)[];
  bassNotes: (number | null)[];
  drums: ('K' | 'S' | 'H' | 'KS' | null)[]; // Kick, Snare, Hi-hat
}

// Frequency helper
const note = (name: string, octave: number): number => {
  const notes: Record<string, number> = {
    C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5,
    'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11
  };
  const semitones = notes[name] + (octave - 4) * 12;
  return 440 * Math.pow(2, (semitones - 9) / 12);
};

// --- SOUNDTRACK LIBRARY ---
export const GAME_TRACKS: SongTrack[] = [
  {
    id: 'cyber-neon',
    title: 'CYBERPUNK OVERDRIVE',
    bpm: 132,
    genre: 'Retro Cyber Synthwave',
    // 32-step patterns (16th notes = 2 bars)
    leadNotes: [
      note('D', 4), null, note('D', 4), note('F', 4),
      note('G', 4), null, note('A', 4), null,
      note('D', 5), note('C', 5), note('A', 4), note('F', 4),
      note('G', 4), note('A', 4), note('F', 4), note('D', 4),

      note('F', 4), null, note('G', 4), null,
      note('A', 4), note('C', 5), note('D', 5), null,
      note('E', 5), note('D', 5), note('C', 5), note('A', 4),
      note('C', 5), note('A', 4), note('G', 4), note('E', 4),
    ],
    arpNotes: [
      note('D', 5), note('F', 5), note('A', 5), note('D', 6),
      note('D', 5), note('F', 5), note('A', 5), note('D', 6),
      note('C', 5), note('E', 5), note('G', 5), note('C', 6),
      note('C', 5), note('E', 5), note('G', 5), note('C', 6),

      note('Bb', 4), note('D', 5), note('F', 5), note('Bb', 5),
      note('Bb', 4), note('D', 5), note('F', 5), note('Bb', 5),
      note('A', 4), note('C', 5), note('E', 5), note('A', 5),
      note('A', 4), note('C', 5), note('E', 5), note('A', 5),
    ],
    bassNotes: [
      note('D', 2), note('D', 2), note('D', 3), note('D', 2),
      note('D', 2), note('D', 3), note('D', 2), note('D', 2),
      note('C', 2), note('C', 2), note('C', 3), note('C', 2),
      note('C', 2), note('C', 3), note('C', 2), note('C', 2),

      note('Bb', 1), note('Bb', 1), note('Bb', 2), note('Bb', 1),
      note('Bb', 1), note('Bb', 2), note('Bb', 1), note('Bb', 1),
      note('A', 1), note('A', 1), note('A', 2), note('A', 1),
      note('A', 1), note('A', 2), note('A', 1), note('A', 1),
    ],
    drums: [
      'K', 'H', 'S', 'H',
      'K', 'H', 'S', 'H',
      'K', 'H', 'S', 'H',
      'K', 'K', 'S', 'H',

      'K', 'H', 'S', 'H',
      'K', 'H', 'S', 'H',
      'K', 'H', 'S', 'H',
      'K', 'H', 'KS', 'H',
    ]
  },
  {
    id: 'space-outpost',
    title: 'ESTIN GRID RUNNER',
    bpm: 140,
    genre: 'Chiptune Arcade Action',
    leadNotes: [
      note('A', 4), note('C', 5), note('E', 5), note('A', 5),
      note('G', 5), note('E', 5), note('D', 5), null,
      note('C', 5), note('D', 5), note('E', 5), note('C', 5),
      note('B', 4), note('G', 4), note('A', 4), null,

      note('A', 4), note('C', 5), note('E', 5), note('A', 5),
      note('B', 5), note('A', 5), note('G', 5), note('E', 5),
      note('F', 5), note('E', 5), note('D', 5), note('B', 4),
      note('C', 5), note('B', 4), note('A', 4), null,
    ],
    arpNotes: [
      note('A', 4), note('E', 5), note('A', 5), note('C', 6),
      note('A', 4), note('E', 5), note('A', 5), note('C', 6),
      note('G', 4), note('D', 5), note('G', 5), note('B', 5),
      note('G', 4), note('D', 5), note('G', 5), note('B', 5),

      note('F', 4), note('C', 5), note('F', 5), note('A', 5),
      note('F', 4), note('C', 5), note('F', 5), note('A', 5),
      note('E', 4), note('B', 4), note('E', 5), note('G#', 5),
      note('E', 4), note('B', 4), note('E', 5), note('G#', 5),
    ],
    bassNotes: [
      note('A', 2), null, note('A', 2), null,
      note('G', 2), null, note('G', 2), null,
      note('F', 2), null, note('F', 2), null,
      note('E', 2), null, note('E', 2), null,

      note('A', 2), note('A', 2), note('A', 2), null,
      note('G', 2), note('G', 2), note('G', 2), null,
      note('F', 2), note('F', 2), note('F', 2), null,
      note('E', 2), note('E', 2), note('E', 2), note('G#', 2),
    ],
    drums: [
      'K', 'H', 'S', 'H',
      'K', 'H', 'S', 'H',
      'K', 'H', 'S', 'H',
      'K', 'K', 'S', 'H',

      'K', 'H', 'S', 'H',
      'K', 'H', 'S', 'H',
      'K', 'H', 'S', 'H',
      'K', 'H', 'S', 'H',
    ]
  },
  {
    id: 'cyber-stealth',
    title: 'NEURAL HACKER LO-FI',
    bpm: 116,
    genre: 'Cyber Ambient Groove',
    leadNotes: [
      note('E', 4), null, note('G', 4), null,
      note('B', 4), note('A', 4), note('G', 4), note('E', 4),
      note('D', 4), null, note('F#', 4), null,
      note('A', 4), null, note('G', 4), note('F#', 4),

      note('C', 4), null, note('E', 4), null,
      note('G', 4), note('F#', 4), note('E', 4), note('C', 4),
      note('B', 3), note('D', 4), note('F#', 4), note('A', 4),
      note('G', 4), note('F#', 4), note('E', 4), null,
    ],
    arpNotes: [
      note('E', 4), note('B', 4), note('E', 5), note('G', 5),
      note('E', 4), note('B', 4), note('E', 5), note('G', 5),
      note('D', 4), note('A', 4), note('D', 5), note('F#', 5),
      note('D', 4), note('A', 4), note('D', 5), note('F#', 5),

      note('C', 4), note('G', 4), note('C', 5), note('E', 5),
      note('C', 4), note('G', 4), note('C', 5), note('E', 5),
      note('B', 3), note('F#', 4), note('B', 4), note('D#', 5),
      note('B', 3), note('F#', 4), note('B', 4), note('D#', 5),
    ],
    bassNotes: [
      note('E', 2), null, note('E', 2), null,
      note('D', 2), null, note('D', 2), null,
      note('C', 2), null, note('C', 2), null,
      note('B', 1), null, note('B', 1), null,

      note('E', 2), note('E', 2), note('B', 1), note('E', 2),
      note('D', 2), note('D', 2), note('A', 1), note('D', 2),
      note('C', 2), note('C', 2), note('G', 1), note('C', 2),
      note('B', 1), note('B', 1), note('F#', 1), note('B', 1),
    ],
    drums: [
      'K', 'H', 'H', 'H',
      'S', 'H', 'K', 'H',
      'K', 'H', 'H', 'H',
      'S', 'H', 'H', 'H',

      'K', 'H', 'H', 'H',
      'S', 'H', 'K', 'H',
      'K', 'H', 'H', 'H',
      'S', 'H', 'KS', 'H',
    ]
  }
];

class RealGameAudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private volume: number = 0.28;

  // Sound Engine State
  private currentTrackIndex: number = 0;
  private currentStep: number = 0;
  private timerId: any = null;
  private nextNoteTime: number = 0;
  private lookahead: number = 25.0; // ms
  private scheduleAheadTime: number = 0.1; // seconds

  // Noise Buffer for Snare/Hi-hat
  private noiseBuffer: AudioBuffer | null = null;

  // Listeners for UI Visualizer & Playback State
  private stepListeners: ((step: number, track: SongTrack) => void)[] = [];
  private stateListeners: ((isPlaying: boolean, track: SongTrack) => void)[] = [];

  constructor() {
    // will initialize on first user gesture or direct start
  }

  public initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
        this.createNoiseBuffer();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private createNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public isSongPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): SongTrack {
    return GAME_TRACKS[this.currentTrackIndex];
  }

  public subscribeToBeat(listener: (step: number, track: SongTrack) => void) {
    this.stepListeners.push(listener);
    return () => {
      this.stepListeners = this.stepListeners.filter((l) => l !== listener);
    };
  }

  public subscribeToState(listener: (isPlaying: boolean, track: SongTrack) => void) {
    this.stateListeners.push(listener);
    listener(this.isPlaying, this.getCurrentTrack());
    return () => {
      this.stateListeners = this.stateListeners.filter((l) => l !== listener);
    };
  }

  private notifyStateChange() {
    const track = this.getCurrentTrack();
    this.stateListeners.forEach((fn) => {
      try {
        fn(this.isPlaying, track);
      } catch {}
    });
  }

  // --- MUSIC PLAYBACK CONTROLS ---
  public startMusic(trackIndex?: number) {
    this.initContext();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (trackIndex !== undefined) {
      this.currentTrackIndex = trackIndex % GAME_TRACKS.length;
    }

    this.isPlaying = true;
    this.currentStep = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.05;

    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => this.scheduler(), this.lookahead);
    this.notifyStateChange();
  }

  public pauseMusic() {
    this.isPlaying = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notifyStateChange();
  }

  public togglePlayPause(): boolean {
    if (this.isPlaying) {
      this.pauseMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % GAME_TRACKS.length;
    this.currentStep = 0;
    if (this.isPlaying && this.ctx) {
      this.nextNoteTime = this.ctx.currentTime + 0.05;
    }
    this.notifyStateChange();
  }

  public prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + GAME_TRACKS.length) % GAME_TRACKS.length;
    this.currentStep = 0;
    if (this.isPlaying && this.ctx) {
      this.nextNoteTime = this.ctx.currentTime + 0.05;
    }
    this.notifyStateChange();
  }

  // Lookahead Scheduler
  private scheduler() {
    if (!this.ctx || !this.isPlaying) return;

    const track = GAME_TRACKS[this.currentTrackIndex];
    const secondsPerBeat = 60.0 / track.bpm;
    const secondsPer16th = secondsPerBeat / 4.0;

    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
      this.scheduleStep(track, this.currentStep, this.nextNoteTime);

      // Notify Visualizer
      this.stepListeners.forEach((fn) => fn(this.currentStep, track));

      this.nextNoteTime += secondsPer16th;
      this.currentStep = (this.currentStep + 1) % 32;
    }
  }

  // Schedule one 16th-note step
  private scheduleStep(track: SongTrack, step: number, time: number) {
    if (!this.ctx || !this.masterGain) return;

    // 1. Lead Melody (Square Wave with Vibrato)
    const leadFreq = track.leadNotes[step];
    if (leadFreq) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(leadFreq, time);

      // Subtle pitch envelope for retro bite
      osc.frequency.setValueAtTime(leadFreq * 1.03, time);
      osc.frequency.exponentialRampToValueAtTime(leadFreq, time + 0.02);

      gain.gain.setValueAtTime(0.13, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.19);
    }

    // 2. Chiptune Arpeggio (Fast Sine/Triangle Pulse)
    const arpFreq = track.arpNotes[step];
    if (arpFreq) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(arpFreq, time);

      gain.gain.setValueAtTime(0.05, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.11);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.12);
    }

    // 3. Driving Synth Bassline (Punchy Triangle/Low-pass)
    const bassFreq = track.bassNotes[step];
    if (bassFreq) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(bassFreq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, time);

      gain.gain.setValueAtTime(0.24, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.16);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(time);
      osc.stop(time + 0.17);
    }

    // 4. Synthesized Drums
    const drum = track.drums[step];
    if (drum === 'K' || drum === 'KS') {
      this.playSynthKick(time);
    }
    if (drum === 'S' || drum === 'KS') {
      this.playSynthSnare(time);
    }
    if (drum === 'H') {
      this.playSynthHiHat(time);
    }
  }

  // Drum: Kick
  private playSynthKick(time: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + 0.08);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  // Drum: Snare
  private playSynthSnare(time: number) {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;

    // Noise component
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.13);

    // Tone bite
    const tone = this.ctx.createOscillator();
    const toneGain = this.ctx.createGain();
    tone.type = 'triangle';
    tone.frequency.setValueAtTime(180, time);
    tone.frequency.exponentialRampToValueAtTime(80, time + 0.05);

    toneGain.gain.setValueAtTime(0.15, time);
    toneGain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);

    tone.connect(toneGain);
    toneGain.connect(this.masterGain);

    tone.start(time);
    tone.stop(time + 0.08);
  }

  // Drum: Hi-hat
  private playSynthHiHat(time: number) {
    if (!this.ctx || !this.masterGain || !this.noiseBuffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(8000, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.06, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.05);
  }

  // --- RETRO SOUND EFFECTS ---
  public playFootstep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(85 + Math.random() * 20, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  public playCollect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [659.25, 880, 1318.51]; // E5, A5, E6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.12, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.16);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.16);
      });
    } catch {}
  }

  public playInteract() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch {}
  }

  public playTeleport() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(1440, now + 0.22);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  public playJump() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.14);

      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {}
  }

  public playSuccess() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.32);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.32);
      });
    } catch {}
  }
}

export const retroAudio = new RealGameAudioManager();
