// utils/customAudioManager.ts

class CustomAudioManager {
  private audio: HTMLAudioElement | null = null;
  private playing: boolean = false;

  // Mengecek apakah audio sedang berjalan
  isPlaying(): boolean {
    return this.playing;
  }

  // Menjeda audio (dipanggil di ReviewPage saat voiceSettings membaca kata)
  pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.playing = false;
  }

  // Melanjutkan audio
  resume(): void {
    if (this.audio) {
      this.audio.play().catch(e => console.error("Gagal memutar audio:", e));
      this.playing = true;
    }
  }

  // Fungsi tambahan untuk memutar audio baru (misal dipanggil dari MusicControl)
  playBackgroundMusic(url: string, loop: boolean = true): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.audio = new Audio(url);
    this.audio.loop = loop;
    this.audio.play()
      .then(() => {
        this.playing = true;
      })
      .catch(e => console.error("Gagal memutar BGM:", e));
  }
}

// Export instance tunggal agar bisa dipakai di berbagai komponen
export const customAudioManager = new CustomAudioManager();