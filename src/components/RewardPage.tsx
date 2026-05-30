import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Trophy, Star, Sparkles, BookOpen, X, Home, Crown, Target, Medal, Flame, Brain, Zap, Gem, CheckCircle, Award } from 'lucide-react';
import type { WrongAnswer } from './MiniGamePage';
import { soundEffects } from '../utils/soundEffects';

interface RewardPageProps {
  unitNumber: number;
  onContinue: () => void;
  isLastUnit: boolean;
  wrongAnswers?: WrongAnswer[];
  score?: number;
  totalQuestions?: number;
  onGoHome: () => void;
}

export function RewardPage({ unitNumber, onContinue, isLastUnit, wrongAnswers = [], score = 0, totalQuestions = 0, onGoHome }: RewardPageProps) {
  const [showReview, setShowReview] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1000, height: 800 });
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getNewlyUnlockedTreasures = () => {
    const unlocked = [];

    if (unitNumber === 1) unlocked.push({ icon: BookOpen, label: 'First Steps', requirement: 'Complete 1 Expedition', color: 'text-green-600', bgColor: 'from-green-100 to-emerald-100' });
    if (unitNumber === 3) unlocked.push({ icon: Target, label: 'Avid Explorer', requirement: 'Complete 3 Expeditions', color: 'text-blue-600', bgColor: 'from-blue-100 to-cyan-100' });
    if (unitNumber === 5) unlocked.push({ icon: Trophy, label: 'Atlas Conqueror', requirement: 'Complete 5 Expeditions', color: 'text-orange-600', bgColor: 'from-orange-100 via-amber-100 to-yellow-100' });

    if (percentage >= 70 && unitNumber === 1) unlocked.push({ icon: Flame, label: 'Spark of Knowledge', requirement: 'Score 70%+ in 1 Expedition', color: 'text-orange-600', bgColor: 'from-orange-100 to-red-100' });
    if (percentage >= 80 && unitNumber === 2) unlocked.push({ icon: Medal, label: 'Silver Scholar', requirement: 'Score 80%+ in 2 Expeditions', color: 'text-slate-600', bgColor: 'from-slate-100 via-gray-100 to-slate-100' });
    if (percentage >= 90 && unitNumber === 3) unlocked.push({ icon: Star, label: 'Brilliant Star', requirement: 'Score 90%+ in 3 Expeditions', color: 'text-indigo-600', bgColor: 'from-indigo-100 to-blue-100' });
    if (percentage === 100 && unitNumber === 1) unlocked.push({ icon: Crown, label: 'Perfect Champion', requirement: 'Score 100% in 1 Expedition', color: 'text-yellow-600', bgColor: 'from-yellow-100 via-yellow-200 to-amber-200' });
    if (percentage === 100 && unitNumber === 3) unlocked.push({ icon: Gem, label: 'Master Scholar', requirement: 'Score 100% in 3 Expeditions', color: 'text-purple-600', bgColor: 'from-purple-100 via-pink-100 to-purple-100' });
    if (percentage >= 90 && unitNumber === 5) unlocked.push({ icon: Brain, label: 'Sharp Mind', requirement: 'Score 90%+ in All 5 Expeditions', color: 'text-blue-700', bgColor: 'from-blue-100 to-indigo-200' });
    if (percentage === 100 && unitNumber === 5) unlocked.push({ icon: Zap, label: 'Flawless Legend', requirement: 'Score 100% in All 5 Expeditions', color: 'text-amber-700', bgColor: 'from-yellow-200 to-amber-300' });

    if (unlocked.length === 0) {
      unlocked.push({ icon: CheckCircle, label: 'Expedition Cleared', requirement: 'The journey continues!', color: 'text-teal-600', bgColor: 'from-teal-100 to-emerald-100' });
    }

    return unlocked;
  };

  const getHeadingInfo = () => {
    if (percentage === 100) return { title: 'Legendary Mastery!', emoji: '👑', rank: 'Master Scholar', subtitle: 'Flawless! You achieved absolute perfection!' };
    if (percentage >= 90) return { title: 'Outstanding Excellence!', emoji: '🏆', rank: 'Expert Scholar', subtitle: "Almost perfect! You're a true expert!" };
    if (percentage >= 80) return { title: 'Great Achievement!', emoji: '⭐', rank: 'Advanced Learner', subtitle: "Impressive work! You're doing excellent!" };
    if (percentage >= 70) return { title: 'Good Progress!', emoji: '🎯', rank: 'Solid Learner', subtitle: "Well done! You're improving steadily!" };
    return { title: 'Keep Going!', emoji: '💪', rank: 'Determined Explorer', subtitle: "Don't give up! Every expedition makes you stronger!" };
  };

  const headingInfo = getHeadingInfo();
  const earnedTreasures = getNewlyUnlockedTreasures();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-violet-950 to-purple-950 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      
      {/* NOISE & STARS OVERLAY */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`, backgroundSize: '150px 150px' }} />
      
      {/* MAGICAL GLOW BEHIND CARD */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-yellow-500/20 blur-[100px] rounded-full pointer-events-none" />

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
              backgroundColor: '#fffcf2', 
              color: '#570e8b', 
              borderColor: '#e6fcfe', 
              borderRadius: '50%',
              scale: 1,
            },
            diHover: { 
              scale: 1.15, 
              backgroundColor: '#570e8b', 
              color: '#FAF6F1',
              borderColor: '#e6fcfe',
              borderRadius: '12px',
              // KUNCI SNAPPY 1: Stiffness dinaikkan drastis ke 400 agar sangat cepat melesat
              transition: { type: "spring", stiffness: 400, damping: 15 }
            },
            diKlik: { 
              scale: 0.9 
            }
          }}
          className="rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] border-2 bg-[#faf6f1]/95 border-amber-700/30 text-#015A84 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-2 sm:p-3 w-11 h-11 sm:w-15 sm:h-15 hover:h-14 hover:w-11 sm:hover:w-16 sm:hover:h-18 transition-all duration-75" // Durasi CSS dipercepat ke 75ms
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

      {/* MAIN CARD - DIPERLEBAR MENJADI max-w-5xl */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 30 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }} 
        className="max-w-5xl w-full bg-[#fffcf2] rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative z-10 border-4 border-amber-300 shadow-2xl" 
        style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(251,191,36,0.1), 0 0 30px rgba(251,191,36,0.3)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-3xl" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />
        
        {/* GRID DUA KOLOM UNTUK DESKTOP */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          
          {/* KOLOM KIRI: SELEBRASI & TOMBOL */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-full">
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} 
              className="mb-4 sm:mb-6"
            >
              <motion.div 
                animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }} 
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative bg-gradient-to-b from-white to-amber-50 p-4 sm:p-5 rounded-full shadow-[0_10px_25px_rgba(217,119,6,0.3)] border-2 border-amber-200 inline-block"
              >
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

              {/* AREA TOMBOL (Di dalam kolom kiri untuk desktop) */}
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

          {/* KOLOM KANAN: STATISTIK & LENCANA */}
          <div className="flex flex-col justify-center gap-6">
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="w-full">
              <div className="bg-lime-100/50 rounded-2xl p-5 sm:p-6 border-2 border-lime-200 shadow-sm relative z-10">
                <p className="text-amber-900 mb-4 font-[Fredoka] font-bold text-lg sm:text-xl tracking-wide text-center">🗺️ Your Journey Stats</p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center bg-white px-4 py-3 rounded-xl border border-amber-200 shadow-sm">
                    <span className="text-amber-800 font-[Nunito] font-bold text-sm sm:text-base">Words Discovered:</span>
                    <span className="text-amber-950 font-bold font-[Fredoka] text-lg sm:text-xl">{totalQuestions} words <span className="text-green-500 ml-1">✓</span></span>
                  </div>
                  <div className="bg-white p-4 sm:p-5 rounded-xl border border-amber-200 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-amber-800 font-[Nunito] font-bold text-sm sm:text-base">Quest Score:</span>
                      <span className={`font-bold font-[Fredoka] text-lg sm:text-xl ${percentage === 100 ? 'text-yellow-600' : percentage >= 80 ? 'text-blue-600' : 'text-red-600'}`}>
                        {score}/{totalQuestions} <span className="text-sm opacity-80">({Math.round(percentage)}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-4 sm:h-5 bg-amber-100 rounded-full overflow-hidden border border-amber-200 shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${percentage}%` }} 
                        transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }} 
                        className={`h-full relative ${percentage === 100 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : percentage >= 80 ? 'bg-gradient-to-r from-blue-400 to-indigo-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="w-full">
              <p className="text-amber-900 mb-4 font-[Fredoka] font-bold text-base sm:text-lg bg-amber-100/60 inline-block px-4 sm:px-5 py-2 rounded-xl border border-amber-300 w-full text-center">🎁 New Treasures Discovered:</p>
              <div className={`grid ${earnedTreasures.length === 1 ? 'grid-cols-1 max-w-[200px] mx-auto' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3'} gap-3 sm:gap-4`}>
                {earnedTreasures.map((badge, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, scale: 0 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 150 }} 
                    className={`bg-gradient-to-br ${badge.bgColor} rounded-2xl p-4 sm:p-5 shadow-md border-2 border-white relative z-10 text-center flex flex-col items-center justify-center`} 
                    style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
                  >
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}>
                      <badge.icon className={`h-8 w-8 sm:h-10 sm:w-10 ${badge.color} mb-2 drop-shadow-md`} />
                    </motion.div>
                    <p className="text-xs sm:text-sm font-bold text-amber-950 font-[Fredoka] tracking-wide leading-snug">{badge.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </motion.div>

      {/* REVIEW MODAL - STRUKTUR ANTI BOCOR */}
      <AnimatePresence>
        {showReview && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-indigo-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" 
            onClick={() => setShowReview(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }} 
              onClick={(e) => e.stopPropagation()} 
              className="bg-[#fffcf2] rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border-4 border-amber-300"
            >
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

      {/* MAGICAL STARS CONFETTI */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(percentage >= 60 ? 25 : 12)].map((_, i) => {
          const colors = ['bg-yellow-300', 'bg-amber-200', 'bg-white', 'bg-indigo-300'];
          return (
            <motion.div 
              key={i} 
              initial={{ y: -50, x: Math.random() * windowDimensions.width, opacity: 0 }} 
              animate={{ 
                y: windowDimensions.height + 50, 
                x: Math.random() * windowDimensions.width, 
                rotate: Math.random() * 360,
                opacity: [0, 1, 1, 0] 
              }} 
              transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }} 
              className={`absolute w-2 h-2 sm:w-3 sm:h-3 ${colors[i % 4]} rounded-full blur-[1px]`} 
              style={{ boxShadow: '0 0 8px rgba(253, 224, 71, 0.8)' }} 
            />
          );
        })}
      </div>
    </div>
  );
}