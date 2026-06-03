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
  
  // BRANKAS RADAR: Untuk memunculkan log alternatif teks langsung di layar HP
  const [debugInfo, setDebugInfo] = useState<string>('');

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
        recognitionInstance.maxAlternatives = 3; // 1. UBAH KE 3 ALTERNATIF TEBAKAN

        recognitionInstance.onresult = (event: any) => {
          let interimText = '';
          let finalText = '';
          let finalConf = 1;
          let isMatchFound = false;

          const normalizedTarget = targetWord.toLowerCase().trim();

          for (let i = 0; i < event.results.length; i++) {
            const result = event.results[i];
            
            if (result.isFinal) {
              let radarText = `Target Word: "${targetWord}"\n`;

              // 2. PERIKSA KETIGA ALTERNATIF TEBAKAN!
              for (let j = 0; j < result.length; j++) {
                const altText = result[j].transcript.toLowerCase().trim();
                const altConf = result[j].confidence;

                // Kumpulkan teks alternatif untuk dicetak ke layar HP
                radarText += `Tebakan ${j + 1}: "${altText}" (Skor: ${altConf.toFixed(2)})\n`;

                console.log(`Target: ${targetWord} | Tebakan ke-${j + 1}: "${altText}" (Skor: ${altConf})`);

                // Jika di antara 3 tebakan itu ada yang cocok dengan target / homophone-nya
                if (matchesWord(altText, normalizedTarget)) {
                  finalText = altText; // Gunakan teks tebakan yang benar
                  finalConf = altConf; // Ambil skor dari tebakan yang benar
                  isMatchFound = true;
                  break; // Langsung hentikan perulangan, anak tersebut LULUS!
                }
              }

              // Kirim rangkuman tebakan mesin ke layar HP
              setDebugInfo(radarText);

              // 3. Jika dari 3 alternatif benar-benar tidak ada yang cocok
              // Barulah kita ambil paksa tebakan nomor 1 untuk ditampilkan
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
            
            // iOS Safari sering memberikan confidence 0 meski teks benar.
            // Kita beri perlindungan jaring pengaman ke 0.8 agar aplikasi tidak error
            confidenceRef.current = finalConf > 0 ? finalConf : 0.8; 
            
            // 4. HAPUS PEMBLOKIR 0.4! Tampilkan saja teks aslinya
            // Biarkan fungsi checkPronunciation() yang memutuskan benar/salah murni dari teks
            setTranscript(finalText);
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

        // Reset error dan radar info setiap kali mikrofon mulai aktif mendengarkan
        recognitionInstance.onstart = () => {
          setError(null);
          setDebugInfo('');
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
      if (recognitionInstance) try { recognitionInstance.stop(); } catch (e) {}
    };
  }, [targetWord]);

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
      setDebugInfo(''); // Reset kotak info di layar
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

      {/* KOTAK RADAR DETEKSI UNTUK HP (AKAN MUNCUL DI LAYAR SAAT BERKATA) */}
      {debugInfo && (
        <div className="w-full mt-2 p-3 bg-gray-900 text-green-400 text-xs font-mono rounded-xl shadow-lg whitespace-pre-wrap text-left border border-green-500/30 z-50">
          <p className="text-white border-b border-gray-700 pb-1 mb-1 font-bold text-center tracking-wide">📡 RADAR DEBUGLOG ASR</p>
          {debugInfo}
        </div>
      )}
    </div>
  );
}