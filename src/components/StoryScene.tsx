import { useState, useEffect, type JSX } from 'react';
import type { StoryScene as StorySceneType, VocabularyWord } from '../types';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Volume2, Pause, Home, Flag, Languages } from 'lucide-react';
import { DictionaryPopup } from './DictionaryPopup';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { soundEffects } from '../utils/soundEffects';
import { voiceSettings } from '../utils/voiceSettings';
import { customAudioManager } from '../utils/customAudio';

interface StorySceneProps {
  scenes: StorySceneType[];
  vocabulary: VocabularyWord[];
  onComplete: () => void;
  unitId?: number;
  onGoHome: () => void;
}

export function StoryScene({ scenes, vocabulary, onComplete, unitId = 1, onGoHome }: StorySceneProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(null);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // 🔮 SAKELAR KACAMATA SIHIR TERJEMAHAN
  const [showTranslation, setShowTranslation] = useState(false);

  const scene = scenes[currentScene];

  useEffect(() => {
    const interval = setInterval(() => {
      const playing = (voiceSettings?.isPlayingText(scene.text) || false) || 
                      (unitId && scene.id && customAudioManager?.isPlaying()) || false;
      setIsPlaying(playing);
    }, 100);
    return () => clearInterval(interval);
  }, [scene.text, unitId, scene.id]);

  // 🧹 Reset terjemahan saat pindah scene
  useEffect(() => {
    setShowTranslation(false);
  }, [currentScene]);

  const stopAllAudio = () => {
    voiceSettings.pause();
    if (voiceSettings.stop) voiceSettings.stop();
    if (customAudioManager.pause) customAudioManager.pause();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const speakText = (text: string) => {
    if (isPlaying) {
      voiceSettings.pause();
      if (customAudioManager.pause) customAudioManager.pause();
      setIsPlaying(false);
      setIsPaused(true);
      return;
    }

    if (isPaused) {
      voiceSettings.resume();
      if (customAudioManager.resume) customAudioManager.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    setIsPlaying(true);
    setIsPaused(false);
    
    // Matikan mode terjemahan jika menyalakan suara
    if(showTranslation) setShowTranslation(false);
    
    if (unitId && scene.id) {
      const customAudioPath = customAudioManager.findSceneAudio(unitId, scene.id);
      if (customAudioPath) {
        customAudioManager.playAudio(customAudioPath).catch(() => {
          voiceSettings.speak(text, { context: 'story' });
        });
      } else {
        voiceSettings.speak(text, { context: 'story' });
      }
    } else {
      voiceSettings.speak(text, { context: 'story' });
    }
  };

  const handleWordClick = (word: string) => {
    const vocabWord = vocabulary.find(v => 
      v.word.toLowerCase() === word.toLowerCase()
    );
    if (vocabWord) {
      setSelectedWord(vocabWord);
      setIsDictionaryOpen(true);
    }
  };

  const renderTextWithHighlights = (text: string) => {
    // Jika tidak ada kata yang harus disorot (misalnya mode terjemahan Indonesia), kembalikan teks biasa
    if (!scene.highlightWords || scene.highlightWords.length === 0 || showTranslation) return text;

    let parts: (string | JSX.Element)[] = [text];
    scene.highlightWords.forEach(word => {
      parts = parts.flatMap(part => {
        if (typeof part !== 'string') return part;
        const regex = new RegExp(`\\b(${word})\\b`, 'gi');
        const split = part.split(regex);
        return split.map((segment, index) => {
          if (regex.test(segment)) {
            return (
              <motion.span
                key={`${word}-${index}`}
                whileHover={{ scale: 1.1, rotate: [-1, 1, 0], y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block cursor-pointer px-2 py-0.5 mx-0.5 rounded-lg bg-emerald-200/60 text-emerald-900 font-bold border-b-4 border-emerald-400/40 transition-colors hover:bg-amber-300 shadow-sm relative z-20"
                onClick={() => {soundEffects.buttonReview(); handleWordClick(segment)}}
              >
                {segment}
              </motion.span>
            );
          }
          return segment;
        });
      });
    });
    return parts;
  };

  const toggleTranslation = () => {
    soundEffects.buttonClick();
    if(isPlaying) stopAllAudio();
    setShowTranslation(!showTranslation);
  };

  const nextScene = () => {
    stopAllAudio();
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
    } else {
      onComplete();
    }
  };

  const prevScene = () => {
    stopAllAudio();
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a1cdd8] via-[#fcf4d9] to-[#e8dec9] p-3 sm:p-6 md:p-8 pt-20 md:pt-12 lg:pt-8 relative overflow-hidden font-[Fredoka] flex flex-col justify-start items-center">
      
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="absolute top-4 left-4 z-50"
      >
        <motion.button
          onClick={() => {
            soundEffects.buttonHome();
            onGoHome();
          }}
          initial="normal"
          animate="normal"
          whileHover="diHover" 
          whileTap="diKlik"
          variants={{
            normal: { backgroundColor: '#faf6f1', color: '#015A84', borderColor: '#83bad2', borderRadius: '50%', scale: 1 },
            diHover: { scale: 1.15, backgroundColor: '#83bad2', color: '#FAF6F1', borderColor: '#015A84', borderRadius: '12px', transition: { type: "spring", stiffness: 400, damping: 15 } },
            diKlik: { scale: 0.9 }
          }}
          className="rounded-full shadow-lg border-2 bg-[#faf6f1]/95 border-amber-700/30 text-#015A84 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-2 sm:p-3 w-11 h-11 sm:w-15 sm:h-15 hover:h-14 hover:w-11 sm:hover:w-16 sm:hover:h-18 transition-all duration-75"
        >
          <motion.span
            className="flex items-center justify-center"
            variants={{ normal: { y: 0, scale: 1 }, diHover: { y: -2, scale: 0.9 } }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            <Home className="h-5 w-5 sm:h-7 sm:w-7" />
          </motion.span>
      
          <motion.span
            className="text-[8px] sm:text-[10px] font-bold tracking-wide uppercase pointer-events-none mt-0.5"
            variants={{ normal: { opacity: 0, y: 6, height: 0 }, diHover: { opacity: 1, y: 0, height: "auto", transition: { type: "tween", ease: "easeOut", duration: 0.1 } } }}
          >
            Home
          </motion.span>
        </motion.button>
      </motion.div>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center relative z-10 px-0 md:px-4">
        
        {/* HEADER PROGRESS */}
        <div className="w-full max-w-5xl mb-4 lg:mb-5 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
          <div className="flex gap-2">
            {scenes.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 sm:h-2.5 sm:w-12 rounded-full transition-all duration-300 border border-amber-900/30 ${
                  index === currentScene ? 'bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.5)]' : 'bg-amber-200/70'
                }`}
              />
            ))}
          </div>
          <span className="text-amber-900 text-sm sm:text-base font-bold bg-white/40 px-4 py-1 rounded-full border border-amber-900/10 shadow-sm font-[Coiny]">
            EXPEDITION {unitId} - Chapter {currentScene + 1}
          </span>
        </div>

        {/* BAGIAN TENGAH: TOMBOL NAV (DESKTOP) + PANEL GAMBAR STATIS */}
        <div className="w-full flex items-center justify-center gap-4 lg:gap-8">
          
          <motion.div 
            className="hidden md:flex shrink-0 flex-col items-center justify-center"
            whileHover={currentScene === 0 ? {} : { scale: 1.1 }}
            whileTap={currentScene === 0 ? {} : { scale: 0.9 }}
          >
            <Button
              onClick={() => {
                soundEffects.buttonNavigation();
                prevScene();
              }}
              disabled={currentScene === 0}
              variant="outline"
              className={`h-16 w-16 lg:h-20 lg:w-20 rounded-full border-4 border-amber-900/20 text-amber-900 shadow-xl transition-all ${
                currentScene === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-100 hover:border-amber-400 bg-[#faf6f1]'
              }`}
            >
              <ChevronLeft className="h-8 w-8 lg:h-10 lg:w-10" />
            </Button>
          </motion.div>

          <div className="w-full flex-1 min-w-0 max-w-5xl relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl sm:rounded-3xl shadow-2xl shadow-sky-900/15 border-4 border-white overflow-hidden shrink-0">
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none z-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-0"
              >
                <ImageWithFallback
                  src={`https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/unit${unitId}/scene${currentScene + 1}.png`}
                  alt={`Story Unit ${unitId} Scene ${currentScene + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* KONTROL AUDIO (Hanya Tampil Jika Mode Inggris) */}
            <div className={`absolute top-4 right-4 z-20 transition-opacity duration-300 ${showTranslation ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="relative">
                {isPlaying && (
                  <>
                    <motion.div 
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 rounded-full bg-amber-400 -z-10"
                    />
                    <motion.div 
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 1.7, opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                      className="absolute inset-0 rounded-full bg-amber-400 -z-10"
                    />
                  </>
                )}

                <motion.div
                  animate={isPlaying ? { 
                    rotate: [-5, 5, -5, 5, 0],
                    scale: [1, 1.05, 1] 
                  } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => speakText(scene.text)}
                    className={`rounded-full h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 p-0 shadow-xl border-4 transition-all duration-300 ${
                      isPlaying 
                      ? 'bg-amber-400 text-amber-950 border-white scale-110' 
                      : 'bg-white/95 text-amber-800 border-amber-200 hover:bg-amber-100 hover:border-amber-300'
                    }`}
                  >
                    {isPlaying ? <Pause className="h-5 w-5 lg:h-8 lg:w-8 animate-pulse" /> : <Volume2 className="h-5 w-5 lg:h-8 lg:w-8" />}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div 
            className="hidden md:flex shrink-0 flex-col items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => {
                soundEffects.buttonNavigation();
                nextScene();
              }}
              className={`${
                currentScene === scenes.length - 1
                  ? 'h-16 lg:h-20 px-6 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 border-b-4 border-green-900 text-lg lg:text-xl font-[Coiny]'
                  : 'h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-gradient-to-r from-amber-600 to-amber-900 hover:from-amber-700 hover:to-amber-950 border-b-4 border-amber-950'
              } text-white shadow-xl transition-all active:border-b-0 active:translate-y-1 flex items-center justify-center`}
            >
              {currentScene === scenes.length - 1 ? (
                <>REVIEW <Flag className="h-5 w-5 lg:h-6 lg:w-6 ml-2" /></>
              ) : (
                <ChevronRight className="h-8 w-8 lg:h-10 lg:w-10" />
              )}
            </Button>
          </motion.div>

        </div>

        {/* BAGIAN BAWAH: PANEL TEKS */}
        <div className="w-full max-w-6xl mx-auto mt-4 sm:mt-6 lg:mt-5 bg-[#faf6f1] rounded-2xl sm:rounded-3xl border-4 border-white shadow-xl px-4 sm:px-8 pt-8 pb-5 lg:pb-6 relative z-20 flex flex-col justify-center min-h-[120px]">
          
          {/* 🔍 TOMBOL KACAMATA SIHIR (TRANSLATION TOGGLE) */}
          {scene.translation && (
            <div className="absolute top-0 right-4 sm:right-6 -translate-y-1/2">
               <motion.button
                onClick={toggleTranslation}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border-2 shadow-md transition-colors font-[Fredoka] font-bold text-xs sm:text-sm ${
                  showTranslation 
                  ? 'bg-amber-100 text-amber-900 border-amber-400' 
                  : 'bg-white text-indigo-900 border-indigo-200 hover:bg-indigo-50'
                }`}
              >
                <Languages className="w-4 h-4 sm:w-5 sm:h-5" />
                {showTranslation ? 'ID' : 'EN'}
              </motion.button>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentScene}-${showTranslation ? 'id' : 'en'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-base sm:text-xl md:text-xl lg:text-2xl text-amber-950 leading-relaxed text-center font-[Nunito] font-bold"
            >
              {/* Tampilkan Teks Berdasarkan Mode */}
              <p>{renderTextWithHighlights(showTranslation ? scene.translation! : scene.text)}</p>
              
              {/* Render Dialog (Jika Ada) */}
              {scene.dialogue && scene.dialogue.length > 0 && (
                <div className="mt-4 flex flex-col gap-2 sm:gap-3 items-center">
                  {scene.dialogue.map((speech, index) => (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      key={index} 
                      className="bg-white/60 border border-amber-900/10 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl w-fit max-w-full text-left flex flex-col sm:flex-row gap-1 sm:gap-3 items-start sm:items-baseline shadow-md"
                    >
                      <span className="font-[Balsamiq_Sans] text-base sm:text-xl text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-lg shrink-0">
                        {speech.speaker}:
                      </span>
                      <span className="text-amber-950 text-sm sm:text-lg lg:text-xl italic">
                        {showTranslation && speech.translation ? speech.translation : speech.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* TOMBOL NAVIGASI MOBILE (Hanya muncul di HP) */}
          <div className="flex md:hidden flex-row justify-between items-center mt-5 gap-3 w-full">
            <motion.div whileTap={currentScene === 0 ? {} : { scale: 0.95 }} className="w-1/2">
              <Button
                onClick={() => {
                  soundEffects.buttonNavigation();
                  prevScene();
                }}
                disabled={currentScene === 0}
                variant="outline"
                className="w-full rounded-xl px-2 py-5 border-2 border-amber-900/20 text-amber-900 hover:bg-amber-100 font-bold text-sm transition-all font-[Coiny]"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                PREV
              </Button>
            </motion.div>

            <motion.div whileTap={{ scale: 0.95 }} className="w-1/2">
              <Button
                onClick={() => {
                  soundEffects.buttonNavigation();
                  nextScene();
                }}
                className={`w-full rounded-xl px-2 py-5 border-b-4 font-bold text-sm shadow-md transition-all active:border-b-0 active:translate-y-1 font-[Coiny] ${
                  currentScene === scenes.length - 1 
                  ? 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white border-green-900' 
                  : 'bg-gradient-to-r from-amber-600 to-amber-900 hover:from-amber-700 hover:to-amber-950 text-white border-amber-950'
                }`}
              >
                {currentScene === scenes.length - 1 ? 'REVIEW 🏁' : 'NEXT'}
                {currentScene !== scenes.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </motion.div>
          </div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-4 sm:mt-5 md:flex items-center justify-center gap-3 text-amber-900/80 font-[Nunito] italic font-bold text-sm sm:text-base lg:text-lg px-4"
        >
          <div className="h-px w-6 sm:w-10 bg-amber-900/20" />
          <span>📖 Click the highlighted words or EN/ID button to discover magic!</span>
          <div className="h-px w-6 sm:w-10 bg-amber-900/20" />
        </motion.div>
      </div>

      <DictionaryPopup
        word={selectedWord}
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
      />
    </div>
  );
}