import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Trophy, Star, Sparkles, BookOpen, X, Home, Crown, Target, Medal, Flame, Brain, Zap, Gem, CheckCircle, Award, Mic } from 'lucide-react';
import type { WrongAnswer } from './MiniGamePage';
import { soundEffects } from '../utils/soundEffects';

// 🪙 KOMPONEN KOIN EMAS FIELA ASLI
const CoinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="#FBBF24" stroke="#B45309" strokeWidth="2"/>
    <circle cx="12" cy="12" r="6" fill="#FDE68A" />
    <path d="M12 8 L13 11 L16 11 L13.5 13 L14.5 16 L12 14 L9.5 16 L10.5 13 L8 11 L11 11 Z" fill="#B45309"/>
  </svg>
);

interface RewardPageProps {
  unitNumber: number;
  onContinue: () => void;
  isLastUnit: boolean;
  wrongAnswers?: WrongAnswer[];
  score?: number;
  totalQuestions?: number;
  pronunciationScore?: number;
  onGoHome: () => void;
}

export function RewardPage({ unitNumber, onContinue, isLastUnit, wrongAnswers = [], score = 0, totalQuestions = 0, pronunciationScore = 0, onGoHome }: RewardPageProps) {
  const [showReview, setShowReview] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1000, height: 800 });
  const hasPlayedInitAudio = useRef(false); // 🔒 Pengaman Audio Strict Mode

  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  
  // 🧭 SINKRONISASI MATEMATIKA KURIKULUM & EKONOMI
  const quizScore = Math.round(percentage);
  const voiceScore = Math.round(pronunciationScore);

  // 1. Hitung Bintang KKTP (Kurikulum)
  let earnedStars = 0;
  if (quizScore >= 70 && voiceScore >= 60) earnedStars = 1;
  if (quizScore >= 85 && voiceScore >= 80) earnedStars = 2;
  if (quizScore === 100 && voiceScore >= 95) earnedStars = 3;

  // 2. Hitung Atlas Coins (Ekonomi)
  let calculatedCoins = quizScore + voiceScore;
  if (quizScore > 0 || voiceScore > 0) calculatedCoins += 20;
  if (quizScore === 100) calculatedCoins += 50;
  else if (quizScore >= 85) calculatedCoins += 25;
  else if (quizScore >= 70) calculatedCoins += 15;
  if (voiceScore >= 95) calculatedCoins += 50;
  else if (voiceScore >= 80) calculatedCoins += 25;
  else if (voiceScore >= 60) calculatedCoins += 15;

  const totalCoinsEarned = calculatedCoins;

  // 🪙 STATE ANIMASI
  const [displayedCoins, setDisplayedCoins] = useState(0);
  const [revealedTreasuresCount, setRevealedTreasuresCount] = useState(0);
  const [revealedStarsCount, setRevealedStarsCount] = useState(0); // State Animasi Bintang

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);

    if (!hasPlayedInitAudio.current) {
      soundEffects.success();
      hasPlayedInitAudio.current = true;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      soundEffects.stopCoinTally(); 
    };
  }, []);

  const earnedTreasures = getNewlyUnlockedTreasures();

  // 🌟 ORKESTRASI ANIMASI SEKUENSAL (Bintang -> Harta Karun -> Koin)
  useEffect(() => {
    // 1. Luncurkan Bintang KKTP terlebih dahulu
    let currentStarIndex = 0;
    const totalStarsToReveal = 3; // Selalu tampilkan 3 slot, tapi yang nyala sesuai earnedStars
    
    const starInterval = setInterval(() => {
      if (currentStarIndex < totalStarsToReveal) {
        setRevealedStarsCount(currentStarIndex + 1);
        if (currentStarIndex < earnedStars) {
          soundEffects.playStarPop(); // Bunyikan HANYA untuk bintang yang menyala
        }
        currentStarIndex++;
      } else {
        clearInterval(starInterval);
        
        // 2. Setelah bintang selesai, luncurkan Lencana Harta Karun (jika ada)
        setTimeout(() => {
          if (earnedTreasures.length > 0) {
            let currentTreasureIndex = 0;
            const treasureInterval = setInterval(() => {
              if (currentTreasureIndex < earnedTreasures.length) {
                setRevealedTreasuresCount(currentTreasureIndex + 1);
                soundEffects.playTreasurePop();
                currentTreasureIndex++;
              } else {
                clearInterval(treasureInterval);
                // 3. Terakhir, luncurkan koin
                setTimeout(() => triggerCoinRolling(), 300);
              }
            }, 500);
          } else {
            // Jika tidak ada harta karun, langsung luncurkan koin
            triggerCoinRolling();
          }
        }, 300);
      }
    }, 400); // Kecepatan letupan bintang

    return () => clearInterval(starInterval);
  }, []);

  const triggerCoinRolling = () => {
    soundEffects.startCoinTally(); 
    let startTimestamp: number | null = null;
    const duration = 1800;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const currentCoins = Math.floor(progress * totalCoinsEarned);
      setDisplayedCoins(currentCoins);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        soundEffects.stopCoinTally(); 
        soundEffects.playCoinFinish(); 
      }
    };

    window.requestAnimationFrame(step);
  };

  function getNewlyUnlockedTreasures() {
    const unlocked = [];
    if (unitNumber === 1) unlocked.push({ icon: BookOpen, label: 'First Steps', requirement: 'Complete 1 Expedition', color: 'text-emerald-600', bgColor: 'from-emerald-100 to-green-100' });
    if (unitNumber === 3) unlocked.push({ icon: Target, label: 'Avid Explorer', requirement: 'Complete 3 Expeditions', color: 'text-cyan-600', bgColor: 'from-cyan-100 to-blue-100' });
    if (unitNumber === 5) unlocked.push({ icon: Trophy, label: 'Atlas Conqueror', requirement: 'Complete 5 Expeditions', color: 'text-amber-600', bgColor: 'from-amber-100 via-orange-100 to-yellow-100' });

    if (percentage >= 70 && unitNumber === 1) unlocked.push({ icon: Flame, label: 'Spark of Knowledge', requirement: 'Score 70%+', color: 'text-rose-600', bgColor: 'from-rose-100 to-red-100' });
    if (percentage >= 80 && unitNumber === 2) unlocked.push({ icon: Medal, label: 'Silver Scholar', requirement: 'Score 80%+', color: 'text-slate-600', bgColor: 'from-slate-100 via-gray-100 to-slate-200' });
    if (percentage >= 90 && unitNumber === 3) unlocked.push({ icon: Star, label: 'Brilliant Star', requirement: 'Score 90%+', color: 'text-indigo-600', bgColor: 'from-indigo-100 to-blue-100' });
    if (percentage === 100 && unitNumber === 1) unlocked.push({ icon: Crown, label: 'Perfect Champion', requirement: 'Score 100%', color: 'text-yellow-600', bgColor: 'from-yellow-100 via-yellow-200 to-amber-200' });
    if (percentage === 100 && unitNumber === 3) unlocked.push({ icon: Gem, label: 'Master Scholar', requirement: 'Score 100%', color: 'text-fuchsia-600', bgColor: 'from-fuchsia-100 via-pink-100 to-purple-100' });
    if (percentage >= 90 && unitNumber === 5) unlocked.push({ icon: Brain, label: 'Sharp Mind', requirement: 'Score 90%+', color: 'text-blue-700', bgColor: 'from-blue-100 to-indigo-200' });
    if (percentage === 100 && unitNumber === 5) unlocked.push({ icon: Zap, label: 'Flawless Legend', requirement: 'Score 100%', color: 'text-amber-700', bgColor: 'from-yellow-200 to-amber-300' });

    if (pronunciationScore >= 95) {
      unlocked.push({ icon: Gem, label: 'Diamond Whisperer', requirement: '95%+ Speech', color: 'text-cyan-500', bgColor: 'from-cyan-100 to-blue-200' });
    } else if (pronunciationScore >= 80) {
      unlocked.push({ icon: Mic, label: 'Golden Orator', requirement: '80%+ Speech', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-yellow-300' });
    } else if (pronunciationScore >= 60) {
      unlocked.push({ icon: Mic, label: 'Silver Voice', requirement: '60%+ Speech', color: 'text-slate-500', bgColor: 'from-slate-100 to-slate-300' });
    } else if (pronunciationScore > 0) {
      unlocked.push({ icon: Mic, label: 'Brave Speaker', requirement: 'Complete speaking', color: 'text-orange-700', bgColor: 'from-orange-100 to-amber-200' });
    }

    if (unlocked.length === 0) {
      unlocked.push({ icon: CheckCircle, label: 'Expedition Cleared', requirement: 'The journey continues!', color: 'text-teal-600', bgColor: 'from-teal-100 to-emerald-100' });
    }
    return unlocked;
  }

  const getHeadingInfo = () => {
    if (percentage === 100) return { title: 'Legendary Mastery!', emoji: '👑', rank: 'Master Scholar', subtitle: 'Flawless! You achieved absolute perfection!' };
    if (percentage >= 90) return { title: 'Outstanding Excellence!', emoji: '🏆', rank: 'Expert Scholar', subtitle: "Almost perfect! You're a true expert!" };
    if (percentage >= 80) return { title: 'Great Achievement!', emoji: '⭐', rank: 'Advanced Learner', subtitle: "Impressive work! You're doing excellent!" };
    if (percentage >= 70) return { title: 'Good Progress!', emoji: '🎯', rank: 'Solid Learner', subtitle: "Well done! You're improving steadily!" };
    return { title: 'Keep Going!', emoji: '💪', rank: 'Determined Explorer', subtitle: "Don't give up! Every expedition makes you stronger!" };
  };

  const headingInfo = getHeadingInfo();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-violet-950 to-purple-950 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`, backgroundSize: '150px 150px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-yellow-500/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Button Kembali ke Home */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }} className="absolute top-4 left-4 z-50">
        <motion.button onClick={() => { soundEffects.buttonHome(); onGoHome(); }} initial="normal" animate="normal" whileHover="diHover" whileTap="diKlik"
          variants={{
            normal: { backgroundColor: '#fffcf2', color: '#570e8b', borderColor: '#e6fcfe', borderRadius: '50%', scale: 1 },
            diHover: { scale: 1.15, backgroundColor: '#570e8b', color: '#FAF6F1', borderColor: '#e6fcfe', borderRadius: '12px', transition: { type: "spring", stiffness: 400, damping: 15 } },
            diKlik: { scale: 0.9 }
          }}
          className="rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] border-2 bg-[#faf6f1]/95 border-amber-700/30 text-amber-900 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-2 sm:p-3 w-11 h-11 sm:w-15 sm:h-15 hover:h-14 hover:w-11 sm:hover:w-16 sm:hover:h-18 transition-all duration-75"
        >
          <motion.span className="flex items-center justify-center" variants={{ normal: { y: 0, scale: 1 }, diHover: { y: -2, scale: 0.9 } }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
            <Home className="h-5 w-5 sm:h-7 sm:w-7" />
          </motion.span>
          <motion.span className="text-[8px] sm:text-[10px] font-bold tracking-wide uppercase pointer-events-none mt-0.5" variants={{ normal: { opacity: 0, y: 6, height: 0 }, diHover: { opacity: 1, y: 0, height: "auto", transition: { type: "tween", ease: "easeOut", duration: 0.1 } } }}>
            Home
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Main Container */}
      <motion.div initial={{ opacity: 0, scale: 0.8, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }} className="max-w-5xl w-full bg-[#fffcf2] rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative z-10 border-4 border-amber-300 shadow-2xl" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(251,191,36,0.1), 0 0 30px rgba(251,191,36,0.3)' }}>
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-3xl" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          
          {/* SISI KIRI: GELAR & NAVIGATION */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="mb-4 sm:mb-6">
              <motion.div animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="relative bg-gradient-to-b from-white to-amber-50 p-4 sm:p-5 rounded-full shadow-[0_10px_25px_rgba(217,119,6,0.3)] border-2 border-amber-200 inline-block">
                {percentage === 100 ? <Trophy className="h-20 w-20 sm:h-24 sm:w-24 text-yellow-500 drop-shadow-lg" /> 
                : percentage >= 80 ? <Star className="h-20 w-20 sm:h-24 sm:w-24 text-blue-500 drop-shadow-lg" /> 
                : percentage >= 60 ? <Award className="h-20 w-20 sm:h-24 sm:w-24 text-green-500 drop-shadow-lg" /> 
                : <Sparkles className="h-20 w-20 sm:h-24 sm:w-24 text-purple-500 drop-shadow-lg" />}
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="w-full">
              <h1 className="text-amber-950 mb-3 font-[Fredoka] text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-sm">
                {headingInfo.emoji} {headingInfo.title}
              </h1>
              <div className="inline-block bg-gradient-to-r from-amber-100 to-amber-200 px-4 sm:px-6 py-2 rounded-full mb-4 border-2 border-amber-400/50 shadow-sm">
                <p className="text-amber-900 font-bold font-[Fredoka] tracking-wider text-sm sm:text-base">✨ {headingInfo.rank} ✨</p>
              </div>
              <p className="text-xl sm:text-2xl text-amber-950 mb-1 font-[Nunito] font-extrabold">You completed Expedition {unitNumber}!</p>
              <p className="text-amber-800 mb-8 font-[Nunito] font-bold text-base sm:text-lg">{headingInfo.subtitle}</p>

              <div className="w-full space-y-3 mt-auto">
                {wrongAnswers.length > 0 && (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button onClick={() => setShowReview(true)} variant="outline" className="w-full bg-white border-2 border-amber-300 text-amber-900 hover:bg-amber-50 py-6 rounded-2xl cursor-pointer font-[Fredoka] font-bold text-base sm:text-lg shadow-sm transition-all">
                      <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-amber-700" />
                      Review Missed Answers ({wrongAnswers.length})
                    </Button>
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={() => { soundEffects.buttonSuccess(); onContinue(); }} className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-800 text-white px-6 py-6 sm:py-8 rounded-2xl shadow-xl shadow-indigo-900/50 w-full cursor-pointer font-[Fredoka] font-bold tracking-wide border-2 border-indigo-400/50 transition-all text-base sm:text-xl">
                    {isLastUnit ? '🎊 Complete the Atlas!' : 'Continue the Journey ➡️'}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* SISI KANAN: STATISTIK & KOIN EMAS */}
          <div className="flex flex-col justify-center gap-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="w-full">
              <div className="bg-lime-100/50 rounded-2xl p-5 sm:p-6 border-2 border-lime-200 shadow-sm relative z-10">
                
                {/* HEAD PANEL STATS & KOIN */}
                <div className="flex flex-row items-center justify-between border-b-2 border-lime-200/60 pb-3 mb-4">
                  <p className="text-amber-900 font-[Fredoka] font-bold text-lg sm:text-xl tracking-wide">🗺️ Your Journey Stats</p>
                  
                  <motion.div 
                    animate={displayedCoins === totalCoinsEarned ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 text-amber-950 font-[Fredoka] font-bold px-3 py-1.5 rounded-full border-2 border-white shadow-[0_4px_12px_rgba(217,119,6,0.3)] text-xs sm:text-sm"
                  >
                    <CoinIcon className="w-5 h-5 sm:w-6 sm:h-6 animate-spin-slow drop-shadow-md" />
                    <span className="tracking-wide">+{displayedCoins} COINS</span>
                  </motion.div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  
                  {/* PANEL BINTANG EKSPEDISI KKTP */}
                  <div className="flex justify-between items-center bg-white px-4 py-3 rounded-xl border border-amber-200 shadow-sm">
                    <span className="text-amber-800 font-[Nunito] font-bold text-sm sm:text-base">Expedition Stars:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(starIndex => {
                        const isVisible = starIndex <= revealedStarsCount;
                        const isEarned = starIndex <= earnedStars;
                        
                        return (
                          <AnimatePresence key={starIndex}>
                            {isVisible && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                              >
                                <Star 
                                  className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ${
                                    isEarned 
                                      ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_2px_5px_rgba(250,204,21,0.5)]' 
                                      : 'text-gray-300 fill-gray-100 opacity-60'
                                  }`} 
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        );
                      })}
                    </div>
                  </div>

                  {/* BAR QUEST SCORE */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-amber-200 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-amber-800 font-[Nunito] font-bold text-sm sm:text-base">Quest Score:</span>
                      <span className={`font-bold font-[Fredoka] text-lg sm:text-xl ${quizScore === 100 ? 'text-yellow-600' : quizScore >= 80 ? 'text-blue-600' : 'text-red-600'}`}>
                        {score}/{totalQuestions} <span className="text-sm opacity-80">({quizScore}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-4 sm:h-5 bg-amber-100 rounded-full overflow-hidden border border-amber-200 shadow-inner">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${quizScore}%` }} transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }} className={`h-full relative ${quizScore === 100 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : quizScore >= 80 ? 'bg-gradient-to-r from-blue-400 to-indigo-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
                      </motion.div>
                    </div>
                  </div>

                  {/* BAR VOICE SCORE */}
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-amber-200 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-amber-800 font-[Nunito] font-bold text-sm sm:text-base">Voice Score:</span>
                      <span className={`font-bold font-[Fredoka] text-lg sm:text-xl ${voiceScore >= 80 ? 'text-green-600' : voiceScore >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                        {voiceScore}%
                      </span>
                    </div>
                    <div className="w-full h-4 sm:h-5 bg-amber-100 rounded-full overflow-hidden border border-amber-200 shadow-inner">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${voiceScore}%` }} transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }} className={`h-full relative ${voiceScore >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : voiceScore >= 60 ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-rose-400 to-red-500'}`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
                      </motion.div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* PANEL REVEAL LENCANA SEKUENSAL */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full">
              <p className="text-amber-900 mb-4 font-[Fredoka] font-bold text-base sm:text-lg bg-amber-100/60 inline-block px-4 sm:px-5 py-2 rounded-xl border border-amber-300 w-full text-center">🎁 New Treasures Discovered:</p>
              <div className={`grid ${earnedTreasures.length === 1 ? 'grid-cols-1 max-w-[200px] mx-auto' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'} gap-3 sm:gap-4`}>
                {earnedTreasures.map((badge, index) => {
                  const isVisible = index < revealedTreasuresCount;
                  
                  return (
                    <AnimatePresence key={index}>
                      {isVisible && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0, rotate: -20 }} 
                          animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                          whileHover={{ scale: 1.05, y: -5 }} 
                          transition={{ type: "spring", stiffness: 260, damping: 15 }} 
                          className={`bg-gradient-to-br ${badge.bgColor} rounded-2xl p-4 sm:p-5 shadow-md border-2 border-white relative z-10 text-center flex flex-col items-center justify-center`} 
                          style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
                        >
                          <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}>
                            <badge.icon className={`h-8 w-8 sm:h-10 sm:w-10 ${badge.color} mb-2 drop-shadow-md`} />
                          </motion.div>
                          <p className="text-xs sm:text-sm font-bold text-amber-950 font-[Fredoka] tracking-wide leading-snug">{badge.label}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* POPUP REVIEW CHALLENGE */}
      <AnimatePresence>
        {showReview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-indigo-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowReview(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} onClick={(e) => e.stopPropagation()} className="bg-[#fffcf2] rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border-4 border-amber-300">
              <div className="flex justify-between items-center px-6 sm:px-8 py-5 border-b-2 border-amber-200 bg-[#fffcf2] shrink-0 z-10">
                <h2 className="text-amber-950 font-[Fredoka] font-bold text-xl sm:text-2xl flex items-center gap-2">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" /> Review Challenges
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-5 sm:space-y-6">
                {wrongAnswers.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-amber-200 shadow-sm">
                    <div className="mb-4 sm:mb-5 bg-amber-50 p-4 rounded-xl border border-amber-100">
                      <p className="text-xs sm:text-sm text-amber-800 mb-1 font-[Fredoka] font-bold uppercase tracking-wide">Challenge {index + 1}:</p>
                      <p className="text-base sm:text-xl text-amber-950 font-[Nunito] font-extrabold leading-snug">{item.question}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
                      <div className="bg-red-50 rounded-xl p-3 sm:p-4 border-2 border-red-200"><p className="text-xs sm:text-sm text-red-700 mb-1.5 font-[Fredoka] font-bold flex items-center gap-1.5"><X className="h-4 w-4"/> Your Answer:</p><p className="text-red-950 font-[Nunito] font-bold text-base sm:text-lg">{item.yourAnswer}</p></div>
                      <div className="bg-green-50 rounded-xl p-3 sm:p-4 border-2 border-green-200"><p className="text-xs sm:text-sm text-green-700 mb-1.5 font-[Fredoka] font-bold flex items-center gap-1.5"><CheckCircle className="h-4 w-4"/> Correct Answer:</p><p className="text-green-950 font-[Nunito] font-bold text-base sm:text-lg">{item.correctAnswer}</p></div>
                    </div>
                    <div className="bg-amber-50/80 rounded-xl p-4 sm:p-5 border border-amber-200 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400" />
                      <p className="text-[10px] sm:text-xs text-amber-800 mb-1 font-[Fredoka] font-bold uppercase tracking-wider pl-2">Vocabulary Reference</p>
                      <div className="pl-2">
                        <p className="text-xl sm:text-2xl text-amber-950 font-[Fredoka] font-bold">{item.word.word}</p>
                        <p className="text-sm sm:text-base text-amber-700 font-[Nunito] font-bold mb-2 sm:mb-3">/{item.word.pronunciation}/</p>
                        <p className="text-amber-950 font-[Nunito] font-bold text-base sm:text-lg leading-relaxed mb-2">{item.word.definition}</p>
                        <p className="text-sm sm:text-base text-amber-800/90 italic font-[Nunito] font-bold">"<span className="font-extrabold">{item.word.example}</span>"</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="px-6 sm:px-8 py-5 border-t-2 border-amber-200 bg-[#fffcf2] shrink-0 z-10">
                <Button onClick={() => setShowReview(false)} className="w-full bg-amber-500 hover:bg-amber-600 text-amber-950 py-6 sm:py-7 rounded-xl font-[Fredoka] font-bold text-lg shadow-md active:scale-95 transition-transform">
                  Understood! 🚀
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(percentage >= 60 ? 25 : 12)].map((_, i) => {
          const colors = ['bg-yellow-300', 'bg-amber-200', 'bg-white', 'bg-indigo-300'];
          return (
            <motion.div key={i} initial={{ y: -50, x: Math.random() * windowDimensions.width, opacity: 0 }} animate={{ y: windowDimensions.height + 50, x: Math.random() * windowDimensions.width, rotate: Math.random() * 360, opacity: [0, 1, 1, 0] }} transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }} className={`absolute w-2 h-2 sm:w-3 sm:h-3 ${colors[i % 4]} rounded-full blur-[1px]`} style={{ boxShadow: '0 0 8px rgba(253, 224, 71, 0.8)' }} />
          );
        })}
      </div>
    </div>
  );
}