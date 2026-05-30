// Voice settings and speech synthesis utilities
import { customAudioManager } from './customAudio';

export type VoiceGender = 'female' | 'male';
export type SpeechContext = 'story' | 'word' | 'example' | 'instruction';

class VoiceSettingsManager {
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private voiceGender: VoiceGender = 'female';
  private voices: SpeechSynthesisVoice[] = [];
  private voicesLoaded = false;
  private isSpeaking = false;
  private isPaused = false;
  private currentText: string = '';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      // Voices may load asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private loadVoices() {
    this.voices = window.speechSynthesis.getVoices();
    this.voicesLoaded = true;
    this.selectVoiceByGender(this.voiceGender);
  }

  private selectVoiceByGender(gender: VoiceGender) {
    if (!this.voicesLoaded || this.voices.length === 0) {
      this.selectedVoice = null;
      return;
    }

    // Filter English voices (prefer US/UK English for clarity)
    const englishVoices = this.voices.filter(voice => 
      voice.lang.startsWith('en-')
    );

    // Try to find voice matching gender preference - prioritize natural, expressive voices
    let matchingVoice: SpeechSynthesisVoice | null = null;

    if (gender === 'female') {
      // Look for natural, expressive female voices
      // Prioritize Google voices (most natural), then Apple/Microsoft enhanced voices
      matchingVoice = englishVoices.find(voice =>
        voice.name.toLowerCase().includes('google') &&
        voice.name.toLowerCase().includes('us') &&
        !voice.name.toLowerCase().includes('gb')
      ) ||
      englishVoices.find(voice =>
        voice.name.toLowerCase().includes('google') &&
        (voice.name.toLowerCase().includes('uk') || voice.name.toLowerCase().includes('gb'))
      ) || 
      englishVoices.find(voice =>
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('ava') ||
        voice.name.toLowerCase().includes('allison') ||
        voice.name.toLowerCase().includes('serena')
      ) || null;
    } else {
      // Look for natural, expressive male voices
      matchingVoice = englishVoices.find(voice =>
        voice.name.toLowerCase().includes('google') &&
        voice.name.toLowerCase().includes('us') &&
        !voice.name.toLowerCase().includes('gb')
      ) ||
      englishVoices.find(voice =>
        voice.name.toLowerCase().includes('google') &&
        (voice.name.toLowerCase().includes('uk') || voice.name.toLowerCase().includes('gb'))
      ) ||
      englishVoices.find(voice =>
        voice.name.toLowerCase().includes('alex') ||
        voice.name.toLowerCase().includes('tom') ||
        voice.name.toLowerCase().includes('fred')
      ) || null;
    }

    // Fallback to first English voice or first available voice
    this.selectedVoice = matchingVoice || englishVoices[0] || this.voices[0] || null;
  }

  setVoiceGender(gender: VoiceGender) {
    this.voiceGender = gender;
    this.selectVoiceByGender(gender);
  }

  getVoiceGender(): VoiceGender {
    return this.voiceGender;
  }

  /**
   * Enhanced speak function with context-aware settings for kid-friendly, expressive speech
   * @param text - The text to speak
   * @param options - Optional parameters for rate, pitch, context, and onEnd callback
   */
  speak(text: string, options: { rate?: number; pitch?: number; context?: SpeechContext; onEnd?: () => void } = {}) {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    try {
      // First, check if custom audio exists for this text
      const customAudioPath = customAudioManager.findWordAudio(text);
      
      if (customAudioPath) {
        // Use custom audio if available
        customAudioManager.playAudio(customAudioPath).catch(() => {
          // Fallback to Web Speech API if custom audio fails
          this.speakWithWebSpeech(text, options);
        });
      } else {
        // Use Web Speech API
        this.speakWithWebSpeech(text, options);
      }
    } catch (error) {
      console.error('Error speaking text:', error);
    }
  }

  /**
   * Add natural pauses and emphasis to text for more expressive speech
   */
  private addExpressivePauses(text: string, context: SpeechContext): string {
    if (context === 'story') {
      // Add pauses after punctuation for more natural storytelling
      return text
        .replace(/\./g, '. ')  // Pause after periods
        .replace(/,/g, ', ')   // Slight pause after commas
        .replace(/!/g, '! ')   // Pause after exclamations
        .replace(/\?/g, '? ')  // Pause after questions
        .replace(/  +/g, ' '); // Clean up extra spaces
    }
    return text;
  }

  private speakWithWebSpeech(text: string, options: { rate?: number; pitch?: number; context?: SpeechContext; onEnd?: () => void } = {}) {
    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const context = options.context || 'word';
      const processedText = this.addExpressivePauses(text, context);

      const utterance = new SpeechSynthesisUtterance(processedText);
      
      // Context-aware settings for natural, expressive, and clear speech
      // Using moderate pitch and slower rate for better clarity and natural expression
      switch (context) {
        case 'story':
          // Story narration: expressive, natural pacing with good intonation
          utterance.rate = options.rate !== undefined ? options.rate : 0.75; // Slower for comprehension
          utterance.pitch = options.pitch !== undefined ? options.pitch : 1.05; // Slightly elevated for warmth
          break;
        
        case 'word':
          // Vocabulary words: very clear, slow, natural pitch
          utterance.rate = options.rate !== undefined ? options.rate : 0.65; // Much slower for learning
          utterance.pitch = options.pitch !== undefined ? options.pitch : 1.0; // Natural pitch for clarity
          break;
        
        case 'example':
          // Example sentences: natural and conversational
          utterance.rate = options.rate !== undefined ? options.rate : 0.7; // Moderate pace
          utterance.pitch = options.pitch !== undefined ? options.pitch : 1.05; // Slightly warm
          break;
        
        case 'instruction':
          // Instructions: clear and encouraging
          utterance.rate = options.rate !== undefined ? options.rate : 0.75; // Clear pace
          utterance.pitch = options.pitch !== undefined ? options.pitch : 1.08; // Friendly and encouraging
          break;
        
        default:
          utterance.rate = options.rate !== undefined ? options.rate : 0.75; // Moderate default
          utterance.pitch = options.pitch !== undefined ? options.pitch : 1.05; // Slightly warm default
      }
      
      // Set volume to full for clarity
      utterance.volume = 1.0;
      
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      // Debug log to verify settings
      console.log('🎤 Speech Settings:', {
        context,
        text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
        rate: utterance.rate,
        pitch: utterance.pitch,
        voice: this.selectedVoice?.name || 'default'
      });

      window.speechSynthesis.speak(utterance);
      this.isSpeaking = true;
      this.isPaused = false;
      this.currentText = text;

      // Add event listeners
      utterance.onend = () => {
        this.isSpeaking = false;
        this.isPaused = false;
        this.currentText = '';
        if (options.onEnd) {
          options.onEnd();
        }
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        this.isPaused = false;
        this.currentText = '';
      };
    } catch (error) {
      console.error('Error with Web Speech API:', error);
    }
  }

  /**
   * Pause current speech
   */
  pause() {
    if (!('speechSynthesis' in window)) return;
    
    if (this.isSpeaking && !this.isPaused) {
      window.speechSynthesis.pause();
      this.isPaused = true;
      
      // Also pause custom audio
      customAudioManager.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume() {
    if (!('speechSynthesis' in window)) return;
    
    if (this.isSpeaking && this.isPaused) {
      window.speechSynthesis.resume();
      this.isPaused = false;
      
      // Also resume custom audio
      customAudioManager.resume();
    }
  }

  /**
   * Stop current speech
   */
  stop() {
    if (!('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    this.isSpeaking = false;
    this.isPaused = false;
    this.currentText = '';
    
    // Also stop custom audio
    customAudioManager.stop();
  }

  /**
   * Check if speech is currently playing
   */
  isSpeechPlaying(): boolean {
    return this.isSpeaking && !this.isPaused;
  }

  /**
   * Check if speech is paused
   */
  isSpeechPaused(): boolean {
    return this.isPaused;
  }

  /**
   * Check if a specific text is currently being spoken
   */
  isPlayingText(text: string): boolean {
    return this.currentText === text && this.isSpeaking && !this.isPaused;
  }

  /**
   * Check if a specific text is currently paused
   */
  isPausedText(text: string): boolean {
    return this.currentText === text && this.isPaused;
  }

  /**
   * Get the currently speaking text
   */
  getCurrentText(): string {
    return this.currentText;
  }

  getAvailableVoices(): { female: string[]; male: string[] } {
    const englishVoices = this.voices.filter(voice => 
      voice.lang.startsWith('en-')
    );

    const female = englishVoices
      .filter(voice =>
        voice.name.toLowerCase().includes('female') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('victoria') ||
        voice.name.toLowerCase().includes('karen') ||
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('susan') ||
        voice.name.toLowerCase().includes('kate') ||
        voice.name.toLowerCase().includes('emma') ||
        voice.name.toLowerCase().includes('fiona') ||
        voice.name.toLowerCase().includes('amelie')
      )
      .map(v => v.name);

    const male = englishVoices
      .filter(voice =>
        voice.name.toLowerCase().includes('male') ||
        voice.name.toLowerCase().includes('david') ||
        voice.name.toLowerCase().includes('alex') ||
        voice.name.toLowerCase().includes('daniel') ||
        voice.name.toLowerCase().includes('mark') ||
        voice.name.toLowerCase().includes('oliver') ||
        voice.name.toLowerCase().includes('thomas') ||
        voice.name.toLowerCase().includes('james')
      )
      .map(v => v.name);

    return { female, male };
  }
}

export const voiceSettings = new VoiceSettingsManager();