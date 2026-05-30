import { useState, useEffect } from 'react';
import type { VocabularyWord } from '../types';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Home } from 'lucide-react';
import { voiceSettings } from '../utils/voiceSettings';
import { customAudioManager } from '../utils/customAudio';
import { PronunciationFeedback } from './PronunciationFeedback';
import { soundEffects } from '../utils/soundEffects';

interface ReviewPageProps {
  vocabulary: VocabularyWord[];
  onComplete: () => void;
  onGoHome: () => void;
}

export function ReviewPage({ vocabulary, onComplete, onGoHome }: ReviewPageProps) {
  const [currentWord, setCurrentWord] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedWords, setCompletedWords] = useState<Set<number>>(new Set());

  const word = vocabulary[currentWord];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaying(voiceSettings.isPlayingText(word.word) || customAudioManager.isPlaying());
    }, 100);
    return () => clearInterval(interval);
  }, [word.word]);

  const speakWord = () => {
    if (isPlaying) {
      voiceSettings.pause();
      customAudioManager.pause();
    } else {
      voiceSettings.speak(word.word, { context: 'word' });
    }
  };

  const handlePronunciationSuccess = () => {
    setCompletedWords((prev) => new Set([...prev, currentWord]));
    if (currentWord < vocabulary.length - 1) {
      setCurrentWord(currentWord + 1);
    }
  };

  const canProceed = completedWords.size === vocabulary.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#76cae0] via-[#b6d7a8] to-[#f4e2b8] p-4 relative overflow-hidden flex flex-col justify-center">
      
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
            normal: { 
              backgroundColor: '#faf6f1', 
              color: '#0f8060', 
              borderColor: '#16dabe', 
              borderRadius: '50%',
              scale: 1,
            },
            diHover: { 
              scale: 1.15, 
              backgroundColor: '#16dabe', 
              color: '#FAF6F1',
              borderColor: '#0f8060',
              borderRadius: '12px',
              // KUNCI SNAPPY 1: Stiffness dinaikkan drastis ke 400 agar sangat cepat melesat
              transition: { type: "spring", stiffness: 400, damping: 15 }
            },
            diKlik: { 
              scale: 0.9 
            }
          }}
          className="rounded-full shadow-lg border-2 bg-[#faf6f1]/95 border-amber-700/30 text-#015A84 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-2 sm:p-3 w-11 h-11 sm:w-15 sm:h-15 hover:h-14 hover:w-11 sm:hover:w-16 sm:hover:h-18 transition-all duration-75" // Durasi CSS dipercepat ke 75ms
        >
          {/* 1. Ikon Home */}
          <motion.span
            className="flex items-center justify-center"
            variants={{
              normal: { y: 0, scale: 1 },
              diHover: { 
                y: -2, 
                scale: 0.9 
              }
            }}
            // KUNCI SNAPPY 2: Ikon ikut melompat dengan kecepatan tinggi tanpa jeda lambat
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            <Home className="h-5 w-5 sm:h-7 sm:w-7" />
          </motion.span>
      
          {/* 2. Teks 'Home' */}
          <motion.span
            className="text-[8px] sm:text-[10px] font-bold tracking-wide uppercase pointer-events-none mt-0.5"
            variants={{
              normal: { 
                opacity: 0, 
                y: 6, 
                height: 0 
              },
              diHover: { 
                opacity: 1, 
                y: 0, 
                height: "auto",
                // KUNCI SNAPPY 3: Menghapus jeda (delay) agar teks langsung muncul instan bersama ikon
                transition: { type: "tween", ease: "easeOut", duration: 0.1 } 
              }
            }}
          >
            Home
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Kontainer diperlebar menjadi max-w-4xl untuk menampung dua kolom di desktop */}
      <div className="max-w-4xl w-full mx-auto relative z-10 pt-4 md:pt-6 pb-4">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-emerald-950 font-[Coiny] font-bold text-3xl md:text-4xl drop-shadow-sm">🗺️ Lexicon Study 🗺️</h2>
          <p className="text-emerald-800 font-[Nunito] font-bold text-base md:text-2xl opacity-90 mt-1">Practice the pronunciation!</p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentWord} 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#faf6f1] rounded-3xl shadow-2xl shadow-emerald-900/15 p-6 md:p-8 border-4 border-white/60 w-full relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`
                }}
              />

              <div className="text-center space-y-4 md:space-y-6 relative z-10">
                
                {/* Kata Utama & Tombol Audio */}
                <div className="flex flex-row items-center justify-center gap-4">
                  <h1 className="text-amber-950 font-[Fredoka] text-4xl md:text-6xl font-bold tracking-tight">{word.word}</h1>
                  
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }} 
                    whileTap={{ scale: 0.9 }}
                    className="h-12 w-12 md:h-16 md:w-16 relative flex items-center justify-center rounded-full cursor-pointer shrink-0"
                  >
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-900/10 shadow-inner pointer-events-none" />
                    <Button onClick={speakWord} className="h-full w-full rounded-full relative z-10 p-0 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 transition-colors shadow-lg">
                      <Volume2 className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </Button>
                  </motion.div>
                </div>

                {/* GRID RESPONSIVE: 1 Kolom di HP, 2 Kolom menyamping di Desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  
                  {/* Panel Pronunciation */}
                  <div className="bg-amber-50 rounded-2xl p-4 md:p-5 border-2 border-amber-200/80 shadow-sm backdrop-blur-sm flex flex-col justify-center h-full">
                    <p className="font-[Fredoka] font-bold text-[11px] md:text-base uppercase text-emerald-800 opacity-80 tracking-widest mb-1">Pronunciation</p>
                    <p className="text-xl md:text-2xl font-[Andika] font-bold text-[#2e190a]">/{word.pronunciation}/</p>
                  </div>

                  {/* Panel Definition */}
                  <div className="bg-emerald-50/80 rounded-2xl p-4 md:p-5 border-2 border-emerald-200/80 shadow-sm backdrop-blur-sm flex flex-col justify-center h-full">
                    <p className="font-[Fredoka] font-bold uppercase text-emerald-800 text-center text-[11px] md:text-base tracking-wide opacity-90 mb-1">Definition:</p>
                    <p className="font-[Nunito] text-base md:text-lg text-emerald-950 leading-snug md:leading-relaxed text-center font-bold">{word.definition}</p>
                  </div>

                </div>

                {/* AREA MIKROFON (Dikurangi padding top-nya agar lebih rapat ke atas) */}
                <div className="border-t-2 border-amber-200/50 pt-4 md:pt-5 mt-2 md:mt-4">
                  <PronunciationFeedback targetWord={word.word} onSuccess={handlePronunciationSuccess} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AREA TOMBOL NAVIGASI & CONTINUE */}
        <div className="flex flex-col gap-4 md:gap-5 mt-5 md:mt-6">
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center relative z-10">
            {vocabulary.map((_, index) => {
              const isCompleted = completedWords.has(index);
              const isCurrent = index === currentWord;
              const canNavigate = isCompleted || isCurrent;

              return (
                <motion.div key={index} whileHover={canNavigate ? { scale: 1.15 } : {}} whileTap={canNavigate ? { scale: 0.9 } : {}} >
                  <Button
                    onClick={() => { if(canNavigate) { soundEffects.buttonPlay(); setCurrentWord(index); } }}
                    disabled={!canNavigate}
                    className={`rounded-xl sm:rounded-2xl min-w-[40px] md:min-w-[52px] h-10 md:h-13 font-['Fredoka_One'] text-base md:text-lg transition-all shadow-md border-2 ${
                    isCurrent ? 'bg-amber-300 text-amber-950 border-amber-400 shadow-amber-300/50' : 
                    isCompleted ? 'bg-emerald-400 text-white border-emerald-500' : 'bg-white/90 text-emerald-800 border-emerald-200 opacity-80'
                  }`}
                  >
                    {index + 1}
                  </Button>
                </motion.div>
              );
            })}
          </div>
          
          {/* TOMBOL CONTINUE DENGAN ANIMASI PULSE SAAT SIAP */}
          <div className={`w-full flex justify-center relative z-10 ${canProceed ? 'animate-pulse' : ''}`}>
            <motion.div whileTap={canProceed ? { scale: 0.98 } : {}} animate={canProceed ? { scale: [1, 1.15, 1] } : {}} transition={canProceed ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : {}}>
              <Button 
                onClick={() => { soundEffects.buttonPlay(); onComplete(); }} 
                disabled={!canProceed} 
                // Menambahkan flex dan whitespace-nowrap agar tombol tidak menyusut/patah teksnya
                className="bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-amber-950 font-[Coiny] py-5 md:py-7 px-8 md:px-12 rounded-xl sm:rounded-2xl shadow-xl text-base md:text-xl w-full sm:w-auto transition-all border-2 border-amber-300/50 tracking-wide flex items-center justify-center whitespace-nowrap"
              >
                Continue to Quest 🎯
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}