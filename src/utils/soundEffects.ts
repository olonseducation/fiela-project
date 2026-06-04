// Simple sound effect utilities using Web Audio API and HTML5 Audio

class SoundEffects {
  private audioContext: AudioContext | null = null;
  
  // Menggunakan URL HTTPS asli dari repositori GitHub FIELA
  private kidsCheering: HTMLAudioElement | null = null;
  private victoryTrumpet: HTMLAudioElement | null = null;
  private levelUpSound: HTMLAudioElement | null = null;
  private correctPronunciationSound: HTMLAudioElement | null = null;
  private correctAnswerSound: HTMLAudioElement | null = null;
  private incorrectSound: HTMLAudioElement | null = null;
  
  // 🪙 PERSENJATAAN AUDIO PERAYAAN (LENGKAP)
  private starPopSound: HTMLAudioElement | null = null;
  private treasurePopSound: HTMLAudioElement | null = null; // Amunisi baru Kapten
  private coinTallySound: HTMLAudioElement | null = null;
  private coinFinishSound: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('AudioContext' in window) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      // Base URL dari repositori eksternal FIELA
      const baseUrl = 'https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/audios/sound-effects';

      // Audio untuk Completion Page
      this.kidsCheering = new Audio(`${baseUrl}/kids-cheering.mp3`);
      this.kidsCheering.volume = 0.4;
      this.victoryTrumpet = new Audio(`${baseUrl}/victory-trumpet.mp3`);
      this.victoryTrumpet.volume = 0.6;

      // Audio untuk Reward Page (Selesai 1 Unit)
      this.levelUpSound = new Audio(`${baseUrl}/level-up-2.mp3`);
      this.levelUpSound.volume = 0.5;

      // Audio untuk Review Pengucapan kata benar
      this.correctPronunciationSound = new Audio(`${baseUrl}/correct-pronunciation.mp3`);
      this.correctPronunciationSound.volume = 0.2;

      // Audio untuk Jawaban Kuis yang benar
      this.correctAnswerSound = new Audio(`${baseUrl}/correct-answer.mp3`);
      this.correctAnswerSound.volume = 0.3;

      // Audio untuk Jawaban Salah
      this.incorrectSound = new Audio(`${baseUrl}/incorrect-sound.mp3`);
      this.incorrectSound.volume = 0.5;

      // 🚀 INISIALISASI AUDIO PERAYAAN TERBARU KAPTEN
      this.starPopSound = new Audio(`${baseUrl}/star-pop.mp3`);
      this.starPopSound.volume = 0.4;

      this.treasurePopSound = new Audio(`${baseUrl}/treasure-pop.mp3`);
      this.treasurePopSound.volume = 0.4;

      this.coinTallySound = new Audio(`${baseUrl}/coin-tally.mp3`);
      this.coinTallySound.volume = 0.35;
      this.coinTallySound.loop = true; // Dibuat berputar terus selama angka menghitung naik

      this.coinFinishSound = new Audio(`${baseUrl}/coin-finish.mp3`);
      this.coinFinishSound.volume = 0.5;
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  private playMp3(audioElement: HTMLAudioElement | null) {
    if (audioElement) {
      audioElement.currentTime = 0;
      audioElement.play().catch(e => console.warn('Browser memblokir audio:', e));
    }
  }

  // REWARD PAGE: Hanya putar MP3 Level Up
  success() {
    this.playMp3(this.levelUpSound);
  }

  // MANTRA PEMANGGIL AUDIO BARU DI REWARD PAGE
  playStarPop() {
    this.playMp3(this.starPopSound);
  }

  playTreasurePop() {
    this.playMp3(this.treasurePopSound);
  }

  startCoinTally() {
    this.playMp3(this.coinTallySound);
  }

  stopCoinTally() {
    if (this.coinTallySound) {
      try {
        this.coinTallySound.pause();
        this.coinTallySound.currentTime = 0;
      } catch (e) {}
    }
  }

  playCoinFinish() {
    this.playMp3(this.coinFinishSound);
  }

  // KUIS BENAR (MiniGame)
  correct() {
    this.playMp3(this.correctAnswerSound);
  }

  // PENGUCAPAN BENAR (Review Page)
  correctPronunciation() {
    this.playMp3(this.correctPronunciationSound);
  }

  // KUIS/PENGUCAPAN SALAH
  incorrect() {
    this.playMp3(this.incorrectSound);
  }

  click() {
    this.playTone(600, 0.05, 'square');
  }

  buttonClick() {
    this.playTone(800, 0.08, 'sine', 0.2);
  }

  buttonPrimary() {
    this.playTone(600, 0.06, 'sine', 0.25);
    setTimeout(() => this.playTone(800, 0.08, 'sine', 0.25), 50);
  }

  buttonSuccess() {
    this.playTone(700, 0.08, 'sine', 0.25);
    setTimeout(() => this.playTone(900, 0.1, 'sine', 0.25), 60);
  }

  buttonNavigation() {
    if (!this.audioContext) return;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(500, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(700, this.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  buttonHome() {
    this.playTone(523.25, 0.12, 'sine', 0.2); 
    setTimeout(() => this.playTone(392, 0.15, 'sine', 0.2), 80); 
  }

  buttonReview() {
    this.playTone(659.25, 0.1, 'sine', 0.2); 
    setTimeout(() => this.playTone(783.99, 0.12, 'sine', 0.2), 80); 
  }

  buttonPlay() {
    this.playTone(523.25, 0.08, 'sine', 0.25); 
    setTimeout(() => this.playTone(659.25, 0.08, 'sine', 0.25), 60); 
    setTimeout(() => this.playTone(783.99, 0.1, 'sine', 0.25), 120); 
  }

  hover() {
    this.playTone(1000, 0.03, 'sine', 0.1);
  }

  celebration() {
    this.playMp3(this.victoryTrumpet);
    setTimeout(() => {
      this.playMp3(this.kidsCheering);
    }, 500);
  }
}

export const soundEffects = new SoundEffects();
export default soundEffects;