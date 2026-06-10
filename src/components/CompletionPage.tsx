import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Trophy, Star, Sparkles, Map, Compass, Crown, Lock, Unlock, Mic, Gamepad2 } from 'lucide-react';
import { useEffect } from 'react';
import { soundEffects } from '../utils/soundEffects';

interface CompletionPageProps {
  onRestart: () => void;
  // 🔮 PROPS BARU UNTUK SINKRONISASI SKOR LENGKAP
  totalQuizScore: number;
  totalMaxQuizScore: number;
  totalVoiceScore: number;
  totalMaxVoiceScore: number;
  wordsMastered?: number;
  totalWords?: number;
}

export function CompletionPage({ 
  onRestart, 
  totalQuizScore, 
  totalMaxQuizScore, 
  totalVoiceScore, 
  totalMaxVoiceScore,
  wordsMastered = 50,
  totalWords = 50
}: CompletionPageProps) {
  
  // Kalkulasi Skor Total Keseluruhan
  const finalScore = totalQuizScore + totalVoiceScore;
  const maxScore = totalMaxQuizScore + totalMaxVoiceScore;
  
  // Syarat Sempurna: Skor Kuis & Suara harus maksimal
  const isPerfectRun = finalScore >= maxScore;

  useEffect(() => {
    const timer = setTimeout(() => {
      soundEffects.celebration(); 
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2a1205] via-[#4a1c03] to-[#1c0d04] flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      
      {/* Efek Tekstur Klasik */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px'
        }}
      />

      {/* Cahaya Emas di Tengah */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Partikel Bara Api Emas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: window.innerHeight + 50, x: Math.random() * window.innerWidth, opacity: 0 }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth + (Math.random() * 100 - 50),
              rotate: Math.random() * 360,
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: Math.random() * 7 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className={`absolute ${
              ['text-amber-300', 'text-yellow-500', 'text-orange-400', 'text-amber-100'][i % 4]
            }`}
          >
            {[Star, Sparkles][i % 2] === Star ? (
              <Star className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 fill-current blur-[0.5px]" />
            ) : (
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 blur-[0.5px]" />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
        className="max-w-6xl w-full bg-black/40 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 p-6 sm:p-10 md:p-12 relative z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 relative z-10">
          
          {/* KOLOM KIRI: TROFI & GLORY */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -2, 2, -2, 0] }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 100, duration: 2 }}
              className="relative mb-6 sm:mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-200 to-yellow-600 rounded-full blur-[40px] opacity-30 animate-pulse" />
              <div className="relative">
                <Crown className="h-16 w-16 sm:h-20 sm:w-20 absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2 text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)] z-20" />
                <Trophy className="h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64 text-transparent fill-[url(#gold-gradient)] drop-shadow-2xl relative z-10" />
                <svg width="0" height="0">
                  <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="#fde047" offset="0%" />
                    <stop stopColor="#d97706" offset="50%" />
                    <stop stopColor="#78350f" offset="100%" />
                  </linearGradient>
                </svg>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <h1 className="text-amber-100 mb-2 font-[Coiny] text-4xl sm:text-5xl md:text-6xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide">
                GRAND FINALE
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-amber-400 mb-4 font-[Nunito] font-bold uppercase tracking-[0.2em]">
                The Atlas is Conquered
              </p>
            </motion.div>
          </div>

          {/* KOLOM KANAN: STATISTIK & NOTIFIKASI */}
          <div className="flex-1 w-full flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-inner mb-6"
            >
              <h3 className="text-amber-200 mb-6 font-[Fredoka] font-bold text-xl sm:text-2xl tracking-wide flex items-center gap-2">
                <Map className="h-6 w-6 text-amber-400" /> Your Expedition Record
              </h3>

              {/* GRID STATISTIK LENGKAP */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="flex flex-col">
                  <span className="text-amber-500/80 font-[Nunito] font-bold text-xs sm:text-sm uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Mic className="h-3 w-3" /> Voice Accuracy
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl sm:text-4xl font-[Coiny] text-amber-100">{totalVoiceScore}</span>
                    <span className="text-amber-400/80 font-[Fredoka] font-bold text-sm sm:text-base pb-1">/ {totalMaxVoiceScore}</span>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-amber-500/80 font-[Nunito] font-bold text-xs sm:text-sm uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Gamepad2 className="h-3 w-3" /> Quiz Mastery
                  </span>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl sm:text-4xl font-[Coiny] text-amber-100">{totalQuizScore}</span>
                    <span className="text-amber-400/80 font-[Fredoka] font-bold text-sm sm:text-base pb-1">/ {totalMaxQuizScore}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-amber-500/80 font-[Nunito] font-bold text-xs sm:text-sm uppercase tracking-wider mb-1">Words Mastered</span>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl sm:text-3xl font-[Coiny] text-amber-100">{wordsMastered}</span>
                    <span className="text-amber-400/80 font-[Fredoka] font-bold text-sm sm:text-base pb-1">/ {totalWords}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-amber-500/80 font-[Nunito] font-bold text-xs sm:text-sm uppercase tracking-wider mb-1">Expeditions</span>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl sm:text-3xl font-[Coiny] text-amber-100">5</span>
                    <span className="text-amber-400/80 font-[Fredoka] font-bold text-sm sm:text-base pb-1">/ 5</span>
                  </div>
                </div>
              </div>

              {/* BAR PROGRESS KESELURUHAN */}
              <div className="w-full">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-amber-200 font-[Fredoka] font-bold">Total Quest Score</span>
                  <span className="text-xl font-[Coiny] text-amber-400">{finalScore} / {maxScore}</span>
                </div>
                <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(finalScore / maxScore) * 100}%` }}
                    transition={{ duration: 1.5, delay: 1 }}
                    className={`h-full ${isPerfectRun ? 'bg-gradient-to-r from-amber-400 to-yellow-300' : 'bg-gradient-to-r from-orange-500 to-amber-400'} shadow-[0_0_10px_rgba(251,191,36,0.5)]`}
                  />
                </div>
              </div>
            </motion.div>

            {/* NOTIFIKASI CERDAS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {isPerfectRun ? (
                <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border border-yellow-400/50 rounded-2xl p-5 flex items-start gap-4 mb-8 shadow-[0_0_20px_rgba(253,224,71,0.15)]">
                  <div className="bg-yellow-400/20 p-3 rounded-full shrink-0">
                    <Unlock className="h-6 w-6 text-yellow-300" />
                  </div>
                  <div>
                    <h4 className="text-yellow-300 font-[Fredoka] font-bold text-lg mb-1">Ultimate Grandmaster!</h4>
                    <p className="text-amber-100/80 font-[Nunito] text-sm sm:text-base leading-relaxed">
                      Absolutely flawless! You have discovered every hidden treasure and mastered the entire lexicon of the Atlas.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-rose-900/40 to-orange-900/30 border border-rose-500/40 rounded-2xl p-5 flex items-start gap-4 mb-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-rose-500/5 group-hover:bg-rose-500/10 transition-colors" />
                  <div className="bg-rose-500/20 p-3 rounded-full shrink-0 relative z-10">
                    <Lock className="h-6 w-6 text-rose-300 animate-pulse" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-rose-300 font-[Fredoka] font-bold text-lg mb-1">Hidden Treasures Remain...</h4>
                    <p className="text-rose-100/80 font-[Nunito] text-sm sm:text-base leading-relaxed">
                      You've mapped the world, but not all treasures have been found! <strong className="text-amber-300 font-bold">Revisit the Challenge Quests</strong> and aim for a perfect score to collect them all.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* TOMBOL RESTART UTAMA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="w-full mt-auto"
            >
              <Button
                onClick={() => {
                  soundEffects.buttonPlay();
                  onRestart();
                }}
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-[#2a1205] px-8 py-7 sm:py-8 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.4)] font-[Coiny] text-lg sm:text-2xl border-none transition-transform active:scale-95 tracking-wide flex items-center justify-center gap-3"
              >
                <Compass className="h-6 w-6 sm:h-7 sm:w-7" /> Embark on a New Journey
              </Button>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}