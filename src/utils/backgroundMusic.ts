// Background Music System using Web Audio API
// Creates contextually appropriate, kid-friendly music for each unit
import { homePageAudio } from './audioConfigHelper'; // Pastikan path-nya sesuai
class BackgroundMusic {
  private audioContext: AudioContext | null = null;
  private currentSource: OscillatorNode | null = null;
  private isPlaying: boolean = false;
  private currentUnit: number | null = null;
  private musicInterval: ReturnType<typeof setTimeout> | undefined;
  private masterGain: GainNode | null = null;
  private htmlAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.08; // Very gentle background volume for calming effect
    }
  }

  private playNote(frequency: number, duration: number, volume: number = 0.08, type: OscillatorType = 'sine') {
    if (!this.audioContext || !this.masterGain) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  private playChord(frequencies: number[], duration: number, volume: number = 0.05, type: OscillatorType = 'sine') {
    // Play multiple notes simultaneously for harmony
    frequencies.forEach(freq => {
      this.playNote(freq, duration, volume, type);
    });
  }

  private morningRoutineMusic() {
    // Gentle awakening melody - Pastoral sunrise theme with arpeggios
    // C major with bird-like ornaments, inspired by morning classical pieces
    const melody = [
      // Opening phrase - awakening
      { notes: [261.63], duration: 1.2, volume: 0.05 }, // C
      { notes: [293.66], duration: 0.8, volume: 0.05 }, // D
      { notes: [329.63], duration: 1.0, volume: 0.05 }, // E
      { notes: [392.00], duration: 1.5, volume: 0.06 }, // G
      { notes: [329.63], duration: 0.8, volume: 0.05 }, // E
      { notes: [261.63], duration: 1.2, volume: 0.05 }, // C
      
      // Rising arpeggio - sunrise
      { notes: [261.63], duration: 0.6, volume: 0.05 }, // C
      { notes: [329.63], duration: 0.6, volume: 0.05 }, // E
      { notes: [392.00], duration: 0.6, volume: 0.05 }, // G
      { notes: [523.25], duration: 1.2, volume: 0.06 }, // C (high)
      
      // Gentle descent with harmony
      { notes: [493.88], duration: 1.0, volume: 0.05 }, // B
      { notes: [440.00], duration: 1.0, volume: 0.05 }, // A
      { notes: [392.00], duration: 1.5, volume: 0.06 }, // G
      
      // Variation phrase
      { notes: [329.63], duration: 0.8, volume: 0.05 }, // E
      { notes: [392.00], duration: 0.8, volume: 0.05 }, // G
      { notes: [440.00], duration: 0.8, volume: 0.05 }, // A
      { notes: [523.25], duration: 1.2, volume: 0.06 }, // C
      { notes: [493.88], duration: 1.0, volume: 0.05 }, // B
      { notes: [392.00], duration: 1.2, volume: 0.06 }, // G
      
      // Resolution with chord
      { notes: [329.63], duration: 1.5, volume: 0.05 }, // E
      { notes: [261.63, 329.63, 392.00], duration: 2.5, volume: 0.04 }, // C major chord
    ];

    let delay = 0;
    melody.forEach((item) => {
      setTimeout(() => {
        if (this.isPlaying && this.currentUnit === 1) {
          if (item.notes.length > 1) {
            this.playChord(item.notes, item.duration, item.volume, 'triangle');
          } else {
            this.playNote(item.notes[0], item.duration, item.volume, 'triangle');
          }
        }
      }, delay);
      delay += item.duration * 1000;
    });
  }

  private goingToSchoolMusic() {
    // Walking melody - Folk-like tune with steady rhythm
    // G major, reminiscent of traditional children's walking songs
    const melody = [
      // Main walking theme
      { notes: [392.00], duration: 0.8, volume: 0.05 }, // G
      { notes: [392.00], duration: 0.8, volume: 0.05 }, // G
      { notes: [440.00], duration: 0.8, volume: 0.05 }, // A
      { notes: [493.88], duration: 1.2, volume: 0.06 }, // B
      
      { notes: [493.88], duration: 0.8, volume: 0.05 }, // B
      { notes: [440.00], duration: 0.8, volume: 0.05 }, // A
      { notes: [392.00], duration: 1.5, volume: 0.06 }, // G
      
      // Higher variation
      { notes: [587.33], duration: 0.8, volume: 0.05 }, // D
      { notes: [587.33], duration: 0.8, volume: 0.05 }, // D
      { notes: [523.25], duration: 0.8, volume: 0.05 }, // C
      { notes: [493.88], duration: 1.2, volume: 0.06 }, // B
      
      // Return to theme with ornament
      { notes: [440.00], duration: 0.6, volume: 0.05 }, // A
      { notes: [493.88], duration: 0.6, volume: 0.05 }, // B
      { notes: [440.00], duration: 0.6, volume: 0.05 }, // A
      { notes: [392.00], duration: 1.2, volume: 0.06 }, // G
      
      // Bridge section
      { notes: [329.63], duration: 1.0, volume: 0.05 }, // E
      { notes: [392.00], duration: 1.0, volume: 0.05 }, // G
      { notes: [493.88], duration: 1.5, volume: 0.06 }, // B
      
      // Final phrase with harmony
      { notes: [587.33], duration: 1.0, volume: 0.05 }, // D
      { notes: [523.25], duration: 1.0, volume: 0.05 }, // C
      { notes: [493.88], duration: 1.2, volume: 0.05 }, // B
      { notes: [392.00, 493.88], duration: 2.0, volume: 0.04 }, // G+B harmony
    ];

    let delay = 0;
    melody.forEach((item) => {
      setTimeout(() => {
        if (this.isPlaying && this.currentUnit === 2) {
          if (item.notes.length > 1) {
            this.playChord(item.notes, item.duration, item.volume, 'triangle');
          } else {
            this.playNote(item.notes[0], item.duration, item.volume, 'triangle');
          }
        }
      }, delay);
      delay += item.duration * 1000;
    });
  }

  private lunchTimeMusic() {
    // Pleasant dining melody - F major with playful character
    // Reminiscent of light classical dining music
    const melody = [
      // Opening phrase
      { notes: [349.23], duration: 1.0, volume: 0.05 }, // F
      { notes: [440.00], duration: 1.0, volume: 0.05 }, // A
      { notes: [523.25], duration: 1.2, volume: 0.06 }, // C
      { notes: [440.00], duration: 0.8, volume: 0.05 }, // A
      
      // Playful descent
      { notes: [523.25], duration: 0.8, volume: 0.05 }, // C
      { notes: [466.16], duration: 0.8, volume: 0.05 }, // Bb
      { notes: [440.00], duration: 0.8, volume: 0.05 }, // A
      { notes: [392.00], duration: 1.2, volume: 0.06 }, // G
      
      // Second phrase with variation
      { notes: [349.23], duration: 1.0, volume: 0.05 }, // F
      { notes: [392.00], duration: 0.8, volume: 0.05 }, // G
      { notes: [440.00], duration: 0.8, volume: 0.05 }, // A
      { notes: [523.25], duration: 1.5, volume: 0.06 }, // C
      
      // Ornamental passage
      { notes: [587.33], duration: 0.6, volume: 0.05 }, // D
      { notes: [523.25], duration: 0.6, volume: 0.05 }, // C
      { notes: [587.33], duration: 0.6, volume: 0.05 }, // D
      { notes: [523.25], duration: 1.0, volume: 0.06 }, // C
      
      // Bridge
      { notes: [466.16], duration: 1.0, volume: 0.05 }, // Bb
      { notes: [440.00], duration: 1.0, volume: 0.05 }, // A
      { notes: [392.00], duration: 1.2, volume: 0.06 }, // G
      
      // Resolution with harmony
      { notes: [349.23], duration: 1.0, volume: 0.05 }, // F
      { notes: [440.00], duration: 1.0, volume: 0.05 }, // A
      { notes: [349.23, 440.00, 523.25], duration: 2.5, volume: 0.04 }, // F major chord
    ];

    let delay = 0;
    melody.forEach((item) => {
      setTimeout(() => {
        if (this.isPlaying && this.currentUnit === 3) {
          if (item.notes.length > 1) {
            this.playChord(item.notes, item.duration, item.volume, 'triangle');
          } else {
            this.playNote(item.notes[0], item.duration, item.volume, 'triangle');
          }
        }
      }, delay);
      delay += item.duration * 1000;
    });
  }

  private afterSchoolMusic() {
    // Reflective melody - D minor with contemplative character
    // Inspired by peaceful evening classical pieces
    const melody = [
      // Opening - contemplative
      { notes: [293.66], duration: 1.5, volume: 0.05 }, // D
      { notes: [349.23], duration: 1.2, volume: 0.05 }, // F
      { notes: [440.00], duration: 1.5, volume: 0.06 }, // A
      
      // Gentle descent
      { notes: [523.25], duration: 1.0, volume: 0.05 }, // C
      { notes: [440.00], duration: 1.0, volume: 0.05 }, // A
      { notes: [349.23], duration: 1.5, volume: 0.06 }, // F
      
      // Rising phrase
      { notes: [293.66], duration: 0.8, volume: 0.05 }, // D
      { notes: [349.23], duration: 0.8, volume: 0.05 }, // F
      { notes: [392.00], duration: 0.8, volume: 0.05 }, // G
      { notes: [440.00], duration: 1.2, volume: 0.06 }, // A
      
      // Variation with higher register
      { notes: [523.25], duration: 1.0, volume: 0.05 }, // C
      { notes: [587.33], duration: 1.0, volume: 0.05 }, // D (high)
      { notes: [523.25], duration: 1.2, volume: 0.06 }, // C
      
      // Contemplative passage
      { notes: [466.16], duration: 1.2, volume: 0.05 }, // Bb
      { notes: [440.00], duration: 1.2, volume: 0.05 }, // A
      { notes: [392.00], duration: 1.5, volume: 0.06 }, // G
      
      // Resolution
      { notes: [349.23], duration: 1.2, volume: 0.05 }, // F
      { notes: [329.63], duration: 1.0, volume: 0.05 }, // E
      { notes: [293.66], duration: 1.5, volume: 0.05 }, // D
      { notes: [293.66, 349.23, 440.00], duration: 2.5, volume: 0.04 }, // D minor chord
    ];

    let delay = 0;
    melody.forEach((item) => {
      setTimeout(() => {
        if (this.isPlaying && this.currentUnit === 4) {
          if (item.notes.length > 1) {
            this.playChord(item.notes, item.duration, item.volume, 'triangle');
          } else {
            this.playNote(item.notes[0], item.duration, item.volume, 'triangle');
          }
        }
      }, delay);
      delay += item.duration * 1000;
    });
  }

  private bedtimeMusic() {
    // Extended lullaby - A minor with soft harmonies
    // Very slow, soothing, with gentle chord progressions
    const melody = [
      // Opening phrase - very gentle
      { notes: [220.00], duration: 2.0, volume: 0.04 }, // A (low)
      { notes: [261.63], duration: 2.0, volume: 0.04 }, // C
      { notes: [329.63], duration: 2.5, volume: 0.05 }, // E
      
      // Descent with harmony
      { notes: [293.66], duration: 2.0, volume: 0.04 }, // D
      { notes: [261.63], duration: 2.0, volume: 0.04 }, // C
      { notes: [220.00, 261.63], duration: 2.5, volume: 0.03 }, // A+C harmony
      
      // Second phrase
      { notes: [246.94], duration: 2.0, volume: 0.04 }, // B
      { notes: [261.63], duration: 2.0, volume: 0.04 }, // C
      { notes: [293.66], duration: 2.5, volume: 0.05 }, // D
      
      // Return with variation
      { notes: [329.63], duration: 2.0, volume: 0.04 }, // E
      { notes: [293.66], duration: 2.0, volume: 0.04 }, // D
      { notes: [261.63], duration: 2.5, volume: 0.04 }, // C
      
      // Gentle resolution
      { notes: [246.94], duration: 2.0, volume: 0.04 }, // B
      { notes: [220.00], duration: 2.5, volume: 0.04 }, // A
      
      // Final chord - peaceful ending
      { notes: [220.00, 261.63, 329.63], duration: 4.0, volume: 0.03 }, // A minor chord
    ];

    let delay = 0;
    melody.forEach((item) => {
      setTimeout(() => {
        if (this.isPlaying && this.currentUnit === 5) {
          if (item.notes.length > 1) {
            this.playChord(item.notes, item.duration, item.volume, 'sine');
          } else {
            this.playNote(item.notes[0], item.duration, item.volume, 'sine');
          }
        }
      }, delay);
      delay += item.duration * 1000;
    });
  }


  private getMusicDuration(unit: number): number {
    // Return duration in milliseconds for each unit's melody
    switch (unit) {
      case 0: return 25000; // Home Page - cheerful welcome
      case 1: return 23000; // Morning Routine - extended pastoral theme
      case 2: return 22000; // Going to School - folk melody with variations
      case 3: return 22000; // Lunch Time - playful dining music
      case 4: return 23000; // After School - contemplative piece
      case 5: return 34000; // Bedtime - extended lullaby
      default: return 22000;
    }
  }

  private playUnitMusic(unit: number) {
    if (!this.isPlaying) return;

    switch (unit) {
      case 0:
        // this.homePageMusic();
        break;
      case 1:
        this.morningRoutineMusic();
        break;
      case 2:
        this.goingToSchoolMusic();
        break;
      case 3:
        this.lunchTimeMusic();
        break;
      case 4:
        this.afterSchoolMusic();
        break;
      case 5:
        this.bedtimeMusic();
        break;
    }
  }

  /**
   * Start playing background music for a specific unit
   */
  play(unit: number) {
    if (this.isPlaying && this.currentUnit === unit) return;

    this.stop();
    this.isPlaying = true;
    this.currentUnit = unit;

    // --- LOGIKA BARU: Jika unit 0 (Homepage), mainkan MP3 dari GitHub ---
    if (unit === 0) {
      if (!this.htmlAudio) {
        this.htmlAudio = new Audio(homePageAudio.audioPath);
        this.htmlAudio.loop = true;
      } else if (this.htmlAudio.src !== homePageAudio.audioPath) {
        // BARIS PENYELAMAT: Paksa sistem mengganti lagu jika tautannya berubah!
        this.htmlAudio.src = homePageAudio.audioPath;
      }
      
      // Cukup panggil ini 1x saja (hapus duplikasinya)
      this.htmlAudio.volume = this.masterGain ? this.masterGain.gain.value : 0.08;
      this.htmlAudio.play().catch(e => console.log("Autoplay dicegah browser", e));
    }
      
    // --- Jika bukan Homepage (Unit 1-5), mainkan musik digital bawaan ---
    else {
      this.playUnitMusic(unit);
      
      const duration = this.getMusicDuration(unit);
      this.musicInterval = setInterval(() => {
        if (this.isPlaying && this.currentUnit === unit) {
          this.playUnitMusic(unit);
        }
      }, duration);
    }
  }

  /**
   * Stop playing background music
   */
  stop() {
    this.isPlaying = false;
    
    // Mematikan interval musik digital
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = undefined;
    }
    
    // Mematikan sumber musik digital
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (e) {
        // Ignore if already stopped
      }
      this.currentSource = null;
    }
    
    // --- TAMBAHAN BARU: Mematikan musik MP3 Homepage jika sedang berbunyi ---
    if (this.htmlAudio) {
      this.htmlAudio.pause();
      this.htmlAudio.currentTime = 0; // Kembalikan ke detik ke-0
    }
    
    this.currentUnit = null;
  }

  /**
   * Set master volume (0 to 1)
   */
  setVolume(volume: number) {
    const safeVolume = Math.max(0, Math.min(1, volume));
    
    // Mengubah volume untuk musik digital
    if (this.masterGain) {
      this.masterGain.gain.value = safeVolume;
    }
    
    // --- TAMBAHAN BARU: Mengubah volume untuk musik MP3 Homepage ---
    if (this.htmlAudio) {
      this.htmlAudio.volume = safeVolume;
    }
  }

  /**
   * Check if music is currently playing
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Get current unit number
   */
  getCurrentUnit(): number | null {
    return this.currentUnit;
  }
}

export const backgroundMusic = new BackgroundMusic();