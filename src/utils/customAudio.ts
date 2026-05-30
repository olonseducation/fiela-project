// Custom audio recording utilities
// This file manages custom voice recordings for the vocabulary app

import { allAudioConfigs } from './audioConfigHelper';

export interface AudioFile {
  // For vocabulary words
  word?: string;
  // For story scene narration
  unitId?: number;
  sceneId?: number;
  // For example sentences
  example?: string;
  // The audio file path
  audioPath: string;
}

// =============================================================================
// HOW TO ADD YOUR OWN VOICE RECORDINGS:
// =============================================================================
// 
// 1. Record your audio files (MP3 format recommended)
// 2. Place them in the /public/audio folder:
//    - /public/audio/words/     (for vocabulary words)
//    - /public/audio/scenes/    (for story narrations)
//
// 3. Edit /utils/audioConfigHelper.ts and uncomment the lines for your files
//
// NAMING CONVENTION:
// - Words: "wake-up.mp3", "stretch.mp3", "mother.mp3", etc.
// - Scenes: "unit1-scene1.mp3", "unit1-scene2.mp3", etc.
//
// QUICK START:
// See /QUICK_START_CUSTOM_AUDIO.md for a step-by-step guide
// See /RECORDING_LIST.md for the complete list of what to record
//
// =============================================================================

/**
 * Import audio files from the configuration helper
 * Edit /utils/audioConfigHelper.ts to configure your audio files
 */
export const audioFiles: AudioFile[] = allAudioConfigs as AudioFile[];

class CustomAudioManager {
  private audioCache: Map<string, HTMLAudioElement> = new Map();
  private currentAudio: HTMLAudioElement | null = null;
  
  /**
   * Find custom audio file for a vocabulary word
   */
  findWordAudio(word: string): string | null {
    const audio = audioFiles.find(
      file => file.word && file.word.toLowerCase() === word.toLowerCase()
    );
    return audio?.audioPath || null;
  }
  
  /**
   * Find custom audio file for a story scene
   */
  findSceneAudio(unitId: number, sceneId: number): string | null {
    const audio = audioFiles.find(
      file => file.unitId === unitId && file.sceneId === sceneId
    );
    return audio?.audioPath || null;
  }
  
  /**
   * Find custom audio file for an example sentence
   */
  findExampleAudio(example: string): string | null {
    const audio = audioFiles.find(
      file => file.example && file.example.toLowerCase() === example.toLowerCase()
    );
    return audio?.audioPath || null;
  }
  
  /**
   * Play custom audio file
   * Returns true if custom audio was found and played, false otherwise
   */
  async playAudio(audioPath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        // Check cache first
        let audio = this.audioCache.get(audioPath);
        
        if (!audio) {
          // Create new audio element
          audio = new Audio(audioPath);
          this.audioCache.set(audioPath, audio);
          
          // Preload the audio
          audio.preload = 'auto';
          
          // Handle load errors silently
          audio.onerror = () => {
            reject(false);
          };
        }
        
        // Stop any currently playing audio
        if (this.currentAudio && this.currentAudio !== audio) {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
        }
        
        // Set as current audio
        this.currentAudio = audio;
        
        // Reset to beginning
        audio.currentTime = 0;
        
        // Play the audio
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              resolve(true);
            })
            .catch(() => {
              // Silently fail if audio cannot be played (file not found, etc.)
              reject(false);
            });
        } else {
          resolve(true);
        }

        // Clear current audio when finished
        audio.onended = () => {
          this.currentAudio = null;
        };
      } catch (error) {
        // Silently fail for missing audio files
        reject(false);
      }
    });
  }

  /**
   * Pause current audio
   */
  pause() {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
    }
  }

  /**
   * Resume paused audio
   */
  resume() {
    if (this.currentAudio && this.currentAudio.paused) {
      this.currentAudio.play().catch(error => {
        console.error('Error resuming audio:', error);
      });
    }
  }

  /**
   * Stop current audio
   */
  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  /**
   * Check if audio is currently playing
   */
  isPlaying(): boolean {
    return this.currentAudio !== null && !this.currentAudio.paused;
  }
  
  /**
   * Check if custom audio exists for a word
   */
  hasWordAudio(word: string): boolean {
    return this.findWordAudio(word) !== null;
  }
  
  /**
   * Check if custom audio exists for a scene
   */
  hasSceneAudio(unitId: number, sceneId: number): boolean {
    return this.findSceneAudio(unitId, sceneId) !== null;
  }
  
  /**
   * Preload audio files for better performance
   */
  preloadAudio(audioPaths: string[]) {
    audioPaths.forEach(path => {
      if (!this.audioCache.has(path)) {
        const audio = new Audio(path);
        audio.preload = 'auto';
        this.audioCache.set(path, audio);
      }
    });
  }
  
  /**
   * Clear audio cache to free memory
   */
  clearCache() {
    this.audioCache.forEach(audio => {
      audio.pause();
      audio.src = '';
    });
    this.audioCache.clear();
  }
  
  /**
   * Get statistics about configured audio files
   */
  getStats() {
    const wordCount = audioFiles.filter(file => file.word).length;
    const sceneCount = audioFiles.filter(file => file.unitId && file.sceneId).length;
    const exampleCount = audioFiles.filter(file => file.example).length;
    
    return {
      total: audioFiles.length,
      words: wordCount,
      scenes: sceneCount,
      examples: exampleCount,
      percentage: {
        words: Math.round((wordCount / 50) * 100), // Total 50 words across 5 units
        scenes: Math.round((sceneCount / 40) * 100), // Total 40 scenes across 5 units
      }
    };
  }
}

export const customAudioManager = new CustomAudioManager();