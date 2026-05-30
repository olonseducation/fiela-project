import { useState, useEffect } from 'react';
import type { VocabularyWord } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Volume2, Pause, X } from 'lucide-react';
import { voiceSettings } from '../utils/voiceSettings';
import { allAudioConfigs } from '../utils/audioConfigHelper'; 
import { motion } from 'motion/react';
import { soundEffects } from '../utils/soundEffects';

interface DictionaryPopupProps {
  word: VocabularyWord | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DictionaryPopup({ word, isOpen, onClose }: DictionaryPopupProps) {
  const [isPlayingWord, setIsPlayingWord] = useState(false);
  const [isPlayingExample, setIsPlayingExample] = useState(false);
  const [exampleAudio, setExampleAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isOpen && exampleAudio) {
      exampleAudio.pause();
      setIsPlayingExample(false);
    }
  }, [isOpen, exampleAudio]);

  useEffect(() => {
    if (!word) return;
    
    const interval = setInterval(() => {
      const wordPlaying = voiceSettings.isPlayingText(word.word);
      const examplePlayingTTS = voiceSettings.isPlayingText(word.example);
      
      const isCustomPlaying = exampleAudio ? !exampleAudio.paused : false;
      
      setIsPlayingWord(wordPlaying);
      setIsPlayingExample(examplePlayingTTS || isCustomPlaying);
    }, 100);

    return () => clearInterval(interval);
  }, [word, exampleAudio]);

  const speakWord = () => {
    if (word) {
      if (isPlayingWord) {
        voiceSettings.pause();
        setIsPlayingWord(false);
        return;
      }

      if (voiceSettings.isPausedText(word.word)) {
        voiceSettings.resume();
        setIsPlayingWord(true);
        return;
      }

      if (exampleAudio) exampleAudio.pause();
      
      setIsPlayingWord(true);
      setIsPlayingExample(false);
      voiceSettings.speak(word.word, { context: 'word' });
    }
  };

  const speakExample = () => {
    if (!word) return;

    if (isPlayingWord) {
      voiceSettings.pause();
      setIsPlayingWord(false);
    }

    const wordConfig = allAudioConfigs.find((c) => c.word === word.word);
    const customUrl = wordConfig?.exampleAudioPath;

    if (customUrl) {
      if (isPlayingExample && exampleAudio) {
        exampleAudio.pause();
        setIsPlayingExample(false);
        return;
      }

      let currentAudio = exampleAudio;
      if (!currentAudio || currentAudio.src !== customUrl) {
        if (exampleAudio) exampleAudio.pause();
        currentAudio = new Audio(customUrl);
        setExampleAudio(currentAudio);
      }

      voiceSettings.pause(); 
      currentAudio.play().catch(e => console.error("Gagal memutar audio example:", e));
      setIsPlayingExample(true);

    } else {
      if (isPlayingExample) {
        voiceSettings.pause();
        setIsPlayingExample(false);
        return;
      }

      if (voiceSettings.isPausedText(word.example)) {
        voiceSettings.resume();
        setIsPlayingExample(true);
        return;
      }

      setIsPlayingExample(true);
      voiceSettings.speak(word.example, { context: 'example' });
    }
  };

  if (!word) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#fffcf2] border-4 border-[#5c3a21] shadow-2xl shadow-black/40 overflow-hidden rounded-3xl [&>button]:hidden">
        
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`
          }}
        />

        <div className="absolute right-4 top-4 z-50">
          <motion.button
            onClick={() => { soundEffects.buttonNavigation();onClose()}}
            initial={{ backgroundColor: '#ffffff', color: '#ef4444', borderColor: '#fecaca' }}
            whileHover={{ 
              scale: 1.15, 
              rotate: 90,
              backgroundColor: '#ef4444', 
              color: '#ffffff',
              borderColor: '#b91c1c'
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 shadow-md outline-none"
          >
            <X className="h-5 w-5 font-bold" />
          </motion.button>
        </div>

        <DialogHeader className="relative z-10 pb-4 border-b-2 border-amber-900/10 mt-2">
          <DialogTitle className="flex items-center gap-4 font-[Fredoka]">
            <span className="text-[#4a2c11] font-bold text-[36px] drop-shadow-sm">{word.word}</span>
            
            <motion.button
              onClick={speakWord}
              initial={{ backgroundColor: '#fef3c7', color: '#b45309', borderColor: '#fcd34d' }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 15,
                backgroundColor: '#fbbf24', 
                color: '#ffffff',
                borderColor: '#d97706'
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
              className="h-11 w-11 flex items-center justify-center rounded-full shadow-md border-2 outline-none"
            >
              {isPlayingWord ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </motion.button>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Definition and pronunciation guide for {word.word}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 relative z-10 pt-4 pb-2">
          
          <div className="bg-gradient-to-br from-sky-50 to-blue-100/50 p-4 rounded-2xl shadow-sm border-2 border-sky-200">
            <p className="text-sky-700 text-sm mb-1 uppercase tracking-widest font-[Fredoka] font-bold">Pronunciation</p>
            <p className="text-2xl font-bold font-[Andika] text-sky-950">/{word.pronunciation}/</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-green-100/50 p-4 rounded-2xl shadow-sm border-2 border-emerald-200">
            <p className="text-emerald-700 text-sm mb-1 uppercase tracking-widest font-[Fredoka] font-bold">Definition</p>
            <p className="text-lg leading-relaxed text-emerald-950 font-bold font-[Nunito]">{word.definition}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-100/50 p-4 rounded-2xl shadow-sm border-2 border-amber-200">
            <p className="text-amber-700 text-sm mb-2 uppercase tracking-widest font-[Fredoka] font-bold">Example</p>
            <div className="flex items-start gap-4">
              <p className="italic text-amber-950 flex-1 leading-relaxed font-bold text-[16px] font-[Nunito]">"{word.example}"</p>
              
              <div className="mt-1">
                <motion.button
                  onClick={speakExample}
                  initial={{ backgroundColor: '#ffffff', color: '#b45309', borderColor: '#fcd34d' }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: -15,
                    backgroundColor: '#f59e0b', 
                    color: '#ffffff',
                    borderColor: '#92400e'
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.15, ease: 'easeInOut' }}
                  className="h-10 w-10 flex items-center justify-center flex-shrink-0 rounded-full shadow-md border-2 outline-none"
                >
                  {isPlayingExample ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}