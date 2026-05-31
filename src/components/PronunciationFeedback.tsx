import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Check, X, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { soundEffects } from '../utils/soundEffects';
import { matchesWord } from '../utils/homophones';

interface PronunciationFeedbackProps {
  targetWord: string;
  // UBAH: onSuccess sekarang wajib menerima angka skor
  onSuccess: (confidenceScore: number) => void;
}

export function PronunciationFeedback({ targetWord, onSuccess }: PronunciationFeedbackProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const autoStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalTranscriptRef = useRef<string>('');
  // BRANKAS BARU: Untuk menyimpan nilai confidence sementara
  const confidenceRef = useRef<number>(1);

  useEffect(() => {
    let recognitionInstance: any = null;
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';
        recognitionInstance.maxAlternatives = 1;

        recognitionInstance.onresult = (event: any) => {
          let interimText = '';
          let finalText = '';
          let lowestConfidence = 1; // Default kepercayaan penuh

          for (let i = 0; i < event.results.length; i++) {
            const result = event.results[i];
            const alternative = result[0];
            
            if (result.isFinal) {
              finalText += alternative.transcript + ' ';
              // Ambil skor kepercayaan (0.0 sampai 1.0)
              if (alternative.confidence < lowestConfidence) {
                lowestConfidence = alternative.confidence;
              }
            } else {
              interimText += alternative.transcript;
            }
          }
          
          if (interimText) {
            setTranscript(interimText + '...');
          } else if (finalText) {
            const trimmedFinal = finalText.trim();
            finalTranscriptRef.current = trimmedFinal.toLowerCase();
            
            // SIMPAN SKOR: Simpan lowestConfidence ke brankas
            confidenceRef.current = lowestConfidence;
            
            // Ambang batas kepercayaan. 0.4 (40%) biasanya cukup aman.
            if (lowestConfidence < 0.4) {
              setTranscript("Hmm, not quite..."); 
            } else {
              setTranscript(trimmedFinal);
            }
          }
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
          if (autoStopTimerRef.current) {
            clearTimeout(autoStopTimerRef.current);
            autoStopTimerRef.current = null;
          }
          
          const finalText = finalTranscriptRef.current;
          const finalConfidence = confidenceRef.current; // AMBIL SKOR DARI BRANKAS
          
          if (finalText) {
            // Kirim teks DAN skor ke fungsi pengecekan
            checkPronunciation(finalText, finalConfidence);
            finalTranscriptRef.current = '';
            confidenceRef.current = 1; // Reset brankas
          } else {
            setFeedback('incorrect');
            setTranscript('Oops! I didn\'t hear you.');
            soundEffects.incorrect();
            setTimeout(() => { 
              setFeedback(null); 
              setTranscript(''); 
            }, 2500);
          }
        };

        recognitionInstance.onerror = (event: any) => {
          setIsListening(false);
          setError(event.error === 'not-allowed' ? 'Izin mikrofon ditolak.' : 'Terjadi kesalahan suara.');
        };

        recognitionInstance.onstart = () => setError(null);
        setRecognition(recognitionInstance);
        setIsReady(true);
      } catch (err) {
        setIsSupported(false);
      }
    } else {
      setIsSupported(false);
    }
    return () => {
      if (recognitionInstance) try { recognitionInstance.stop(); } catch (e) {}
    };
  }, []);

  // UBAH: Fungsi ini sekarang menerima confidenceScore
  const checkPronunciation = (spokenText: string, confidenceScore: number) => {
    const normalizedTarget = targetWord.toLowerCase().trim();
    
    if (matchesWord(spokenText.toLowerCase().trim(), normalizedTarget)) {
      setTranscript(targetWord);
      setFeedback('correct');
      soundEffects.correctPronunciation();
      
      // KIRIM SKOR: Saat sukses, kirimkan skor ke ReviewPage!
      setTimeout(() => { 
        onSuccess(confidenceScore); 
        setFeedback(null); 
        setTranscript(''); 
      }, 1800);
    } else {
      setFeedback('incorrect');
      soundEffects.incorrect();
      setTimeout(() => { setFeedback(null); setTranscript(''); }, 2500);
    }
  };

  const startListening = async () => {
    if (!recognition) return;
    try {
      setTranscript('');
      setFeedback(null);
      finalTranscriptRef.current = '';
      confidenceRef.current = 1; // Reset skor saat mulai ulang
      recognition.start();
      setIsListening(true);
      autoStopTimerRef.current = setTimeout(() => { if (recognition) recognition.stop(); }, 5000);
    } catch (err) { setIsListening(false); }
  };

  if (!isSupported) return <p className="text-center text-amber-900 font-[Nunito]">Browser tidak didukung.</p>;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="relative">
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full bg-rose-400"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}
        <motion.div 
          whileHover={{ scale: 1.08 }} 
          whileTap={{ scale: 0.9 }} 
          className="rounded-full flex items-center justify-center h-16 w-16 md:h-20 md:w-20 relative cursor-pointer"
        >
          <div className={`absolute inset-0 rounded-full border-4 shadow-xl z-0 transition-colors ${isListening ? 'border-rose-900/20' : 'border-sky-900/20'}`} />
          <Button
            onClick={() => { soundEffects.buttonPlay(); isListening ? recognition.stop() : startListening(); }}
            disabled={!isReady}
            className={`h-full w-full rounded-full relative z-10 p-0 transition-colors duration-300 ${isListening ? 'bg-rose-500 hover:bg-rose-600' : 'bg-sky-500 hover:bg-sky-600'}`}
          >
            {isListening ? <MicOff className="h-7 w-7 md:h-8 md:w-8 text-white" /> : <Mic className="h-7 w-7 md:h-8 md:w-8 text-white drop-shadow-md" />}
          </Button>
        </motion.div>
      </div>

      <div className="h-24 flex flex-col items-center justify-start gap-2 w-full pt-1">
        {!isListening && !transcript && !feedback && !error && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sky-800 font-[Nunito] font-bold text-sm md:text-base bg-sky-50 px-3 py-1 rounded-full border border-sky-200/60 shadow-sm"
          >
            Press to speak the word!
          </motion.p>
        )}

        {error && !isListening && (
           <p className="text-red-600 font-[Nunito] font-bold text-sm bg-red-50 px-3 py-1 rounded-full border border-red-200 flex items-center gap-1.5">
             <AlertCircle className="h-4 w-4" /> {error}
           </p>
        )}

        {isListening && (
          <motion.p 
            animate={{ opacity: [1, 0.5, 1] }} 
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-rose-600 font-[Fredoka] font-bold text-base md:text-lg"
          >
            🎤 Listening...
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