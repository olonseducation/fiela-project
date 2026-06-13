import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Check, X, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { soundEffects } from '../utils/soundEffects';
import { matchesWord } from '../utils/homophones';

interface PronunciationFeedbackProps {
  targetWord: string;
  onSuccess: (confidenceScore: number) => void;
  onFail: () => void;
}

export function PronunciationFeedback({ targetWord, onSuccess, onFail }: PronunciationFeedbackProps) {
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // 🔮 BRANKAS BARU: Mencatat berapa kali anak telah gagal di kata ini
  const [failedAttempts, setFailedAttempts] = useState(0);

  const autoStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalTranscriptRef = useRef<string>('');
  const confidenceRef = useRef<number>(1);

  useEffect(() => {
    // 🔮 RESET TOTAL: Setiap kali kata target berganti, hitungan gagal harus kembali ke 0
    setFailedAttempts(0);
    setTranscript('');
    setFeedback(null);

    let recognitionInstance: any = null;
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';
        recognitionInstance.maxAlternatives = 3; 

        recognitionInstance.onresult = (event: any) => {
          let interimText = '';
          let finalText = '';
          let finalConf = 1;
          let isMatchFound = false;

          const normalizedTarget = targetWord.toLowerCase().trim();

          for (let i = 0; i < event.results.length; i++) {
            const result = event.results[i];
            
            if (result.isFinal) {
              for (let j = 0; j < result.length; j++) {
                const altText = result[j].transcript.toLowerCase().trim();
                const altConf = result[j].confidence;

                if (matchesWord(altText, normalizedTarget)) {
                  finalText = altText; 
                  finalConf = altConf; 
                  isMatchFound = true;
                  break; 
                }
              }

              if (!isMatchFound) {
                finalText = result[0].transcript.toLowerCase().trim();
                finalConf = result[0].confidence;
              }
            } else {
              interimText += result[0].transcript;
            }
          }
          
          if (interimText) {
            setTranscript(interimText + '...');
          } else if (finalText) {
            finalTranscriptRef.current = finalText;
            confidenceRef.current = finalConf > 0 ? finalConf : 0.8; 
            setTranscript(finalText);
          }
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
          setIsRecording(false);
          triggerCooldown();

          if (autoStopTimerRef.current) {
            clearTimeout(autoStopTimerRef.current);
            autoStopTimerRef.current = null;
          }
          
          const finalText = finalTranscriptRef.current;
          const finalConfidence = confidenceRef.current; 
          
          if (finalText) {
            checkPronunciation(finalText, finalConfidence);
            finalTranscriptRef.current = '';
            confidenceRef.current = 1; 
          } else {
            setFeedback('incorrect');
            setTranscript('Oops! I didn\'t hear you.');
            soundEffects.incorrect();
            
            // 🔮 CATAT KEGAGALAN: Suara tidak terdengar juga dihitung gagal
            setFailedAttempts(prev => prev + 1);
            onFail(); 

            setTimeout(() => { 
              setFeedback(null); 
              setTranscript(''); 
            }, 2500);
          }
        };

        recognitionInstance.onerror = (event: any) => {
          setIsListening(false);
          setIsRecording(false);
          triggerCooldown();
          setError(event.error === 'not-allowed' ? 'Izin mikrofon ditolak.' : 'Terjadi kesalahan suara.');
          
          // 🔮 CATAT KEGAGALAN: Error sistem/mikrofon langsung memicu hitungan gagal
          setFailedAttempts(prev => prev + 1);
          onFail(); 
        };

        recognitionInstance.onstart = () => {
          setError(null);
          setIsRecording(true);
          soundEffects.buttonPlay(); 
        };

        setRecognition(recognitionInstance);
        setIsReady(true);
      } catch (err) {
        setIsSupported(false);
      }
    } else {
      setIsSupported(false);
    }
    
    return () => {
      if (recognitionInstance) {
        try { recognitionInstance.abort(); } catch (e) {} 
      }
    };
  }, [targetWord]);

  const triggerCooldown = () => {
    setIsCooldown(true);
    setTimeout(() => { setIsCooldown(false); }, 1500);
  };

  const checkPronunciation = (spokenText: string, confidenceScore: number) => {
    const normalizedTarget = targetWord.toLowerCase().trim();
    
    if (matchesWord(spokenText.toLowerCase().trim(), normalizedTarget)) {
      setTranscript(targetWord);
      setFeedback('correct');
      soundEffects.correctPronunciation();
      onSuccess(confidenceScore); 
      
      setTimeout(() => { 
        setFeedback(null); 
        setTranscript(''); 
      }, 1800);
    } else {
      setFeedback('incorrect');
      soundEffects.incorrect();
      
      // 🔮 CATAT KEGAGALAN: Pelafalan salah menaikkan angka log kesalahan
      setFailedAttempts(prev => prev + 1);
      onFail(); 
      
      setTimeout(() => { setFeedback(null); setTranscript(''); }, 2500);
    }
  };

  const startListening = async () => {
    if (!recognition || isCooldown) return;
    try {
      setTranscript('');
      setFeedback(null);
      finalTranscriptRef.current = '';
      confidenceRef.current = 1; 
      
      setIsListening(true);
      setIsRecording(false);
      
      recognition.start();
      autoStopTimerRef.current = setTimeout(() => { if (recognition) recognition.stop(); }, 5000);
    } catch (err) { 
      setIsListening(false);
      setIsRecording(false);
      triggerCooldown();
    }
  };

  const stopListeningManually = () => {
    if (recognition) {
      try { recognition.stop(); } catch(e) {}
    }
  };

  // 🔮 FUNGSI TOMBOL SKIP: Memberikan berkat kelulusan otomatis dari Atlas
  const handleSkipChallenge = () => {
    soundEffects.buttonNavigation();
    // Berikan nilai jaring pengaman 0.7 (Skor Akhir Katrol = 91)
    // 🔮 UBAH: Kirim nilai 0 agar mereka hanya mendapat nilai KKTP (70)
    onSuccess(0); 
  };

  if (!isSupported) return <p className="text-center text-amber-900 font-[Nunito]">Browser tidak didukung.</p>;

  const isButtonDisabled = !isReady || isCooldown;
  const buttonBackground = isCooldown 
    ? 'bg-gray-400 cursor-not-allowed' 
    : isListening 
      ? 'bg-rose-500 hover:bg-rose-600' 
      : 'bg-sky-500 hover:bg-sky-600';

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-row items-center justify-center gap-4 relative">
        
        {/* TOMBOL UTAMA REKAM AUDIO */}
        <div className="relative">
          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full bg-rose-400"
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          )}
          <motion.div 
            whileHover={!isButtonDisabled ? { scale: 1.08 } : {}} 
            whileTap={!isButtonDisabled ? { scale: 0.9 } : {}} 
            className="rounded-full flex items-center justify-center h-16 w-16 md:h-20 md:w-20 relative cursor-pointer"
          >
            <div className={`absolute inset-0 rounded-full border-4 shadow-xl z-0 transition-colors ${isListening ? 'border-rose-900/20' : isCooldown ? 'border-gray-900/10' : 'border-sky-900/20'}`} />
            <Button
              onClick={() => { isListening ? stopListeningManually() : startListening(); }}
              disabled={isButtonDisabled}
              className={`h-full w-full rounded-full relative z-10 p-0 transition-colors duration-300 ${buttonBackground}`}
            >
              {isListening ? <MicOff className="h-7 w-7 md:h-8 md:w-8 text-white" /> : <Mic className="h-7 w-7 md:h-8 md:w-8 text-white drop-shadow-md" />}
            </Button>
          </motion.div>
        </div>

        {/* 🔮 SIHIR TOMBOL SKIP: Hanya berlabuh di layar jika gagal >= 3 kali */}
        <AnimatePresence>
          {failedAttempts >= 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Button
                onClick={handleSkipChallenge}
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-amber-950 font-[Fredoka] font-bold py-3 px-4 rounded-2xl shadow-lg border-2 border-amber-300 flex items-center gap-2 text-xs md:text-sm active:scale-95 transition-all"
              >
                Let's Move On! 🦉 <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-24 flex flex-col items-center justify-start gap-2 w-full pt-1">
        {!isListening && !transcript && !feedback && !error && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`font-[Nunito] font-bold text-sm md:text-base px-3 py-1 rounded-full border shadow-sm ${isCooldown ? 'text-gray-500 bg-gray-50 border-gray-200' : 'text-sky-800 bg-sky-50 border-sky-200/60'}`}
          >
            {isCooldown ? 'Tunggu sebentar...' : 'Press to speak the word!'}
          </motion.p>
        )}

        {error && !isListening && (
           <p className="text-red-600 font-[Nunito] font-bold text-sm bg-red-50 px-3 py-1 rounded-full border border-red-200 flex items-center gap-1.5">
             <AlertCircle className="h-4 w-4" /> {error}
           </p>
        )}

        {isListening && !isRecording && (
          <motion.p 
            animate={{ opacity: [1, 0.5, 1] }} 
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-amber-600 font-[Fredoka] font-bold text-base md:text-lg"
          >
            ⏳ Wait a second...
          </motion.p>
        )}

        {isRecording && (
          <motion.p 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-rose-600 font-[Fredoka] font-bold text-base md:text-lg"
          >
            🎤 Speak now!
          </motion.p>
        )}
        
        {transcript && (
          <div className="bg-white/60 px-4 py-1.5 md:py-2 rounded-xl border border-amber-900/10 shadow-sm text-center">
            <p className="text-amber-900 font-[Nunito] text-sm md:text-base">
              {transcript === "Hmm, not quite..." || transcript === "Oops! I didn't hear you." ? (
                <span className="font-bold text-base md:text-lg">{transcript}</span>
              ) : (
                <>
                  You said: <span className="font-bold text-base md:text-lg">{transcript}</span>
                </>
              )}
            </p>
          </div>
        )}

        {feedback === 'correct' && (
          <motion.div 
            animate={{ scale: [0.5, 1.2, 1], rotate: [0, -5, 5, 0] }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="flex items-center justify-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-full border-2 border-green-300 shadow-md font-[Nunito] font-bold text-base md:text-lg"
          >
            <Check className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            <span>Great job! Perfect! 🌟</span>
          </motion.div>
        )}

        {feedback === 'incorrect' && (
          <motion.div 
            animate={{ x: [-8, 8, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2 text-rose-700 bg-rose-50 px-4 py-2 rounded-full border-2 border-rose-300 shadow-sm font-[Nunito] font-bold text-base md:text-lg"
          >
            <X className="h-5 w-5 md:h-6 md:w-6 text-rose-600" />
            <span>Try again! Say: "{targetWord}"</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}