import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Star, BookOpen, X, Home, Award, CheckCircle, 
          // 🌿 U1: Forest
          Leaf, TreePine, Crown, Wind, Bird, Volume2, 
          // 🏜️ U2: Desert
          Sun, Compass, Tent, AudioLines, Footprints, Eye, 
          // 🌊 U3: Ocean
          Waves, Fish, Gem, Shell, Anchor, Droplets, 
          // ⛰️ U4: Mountains
          Mountain, MountainSnow, Flag, Cloud, Feather, CloudLightning, 
          // 🏰 U5: Castle
          Map, Shield, Sparkles, Bell, Megaphone, Trophy
        } from 'lucide-react';
import type { WrongAnswer } from './MiniGamePage';
import { soundEffects } from '../utils/soundEffects';

import atlasMenang from '../imports/atlas-menang.webp';
import atlasBertepukTangan from '../imports/atlas-bertepuk-tangan.webp';
import atlasBerhasil from '../imports/atlas-berhasil.webp';
import atlasTabah from '../imports/atlas-tabah.webp';

const getAtlasReaction = (totalScore: number) => {
  if (totalScore >= 190) return { pose: atlasMenang, text: "Absolutely magnificent! You are a true legend of the seas!" };
  if (totalScore >= 170) return { pose: atlasBerhasil, text: "Brilliant sailing! A fine bounty for a fine captain!" };
  if (totalScore >= 140) return { pose: atlasBertepukTangan, text: "Good effort, matey! Let's aim even higher next time!" };
  return { pose: atlasTabah, text: "Rough waters today, but a true captain always tries again!" };
};

const CoinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="#FBBF24" stroke="#B45309" strokeWidth="2"/>
    <circle cx="12" cy="12" r="6" fill="#FDE68A" />
    <path d="M12 8 L13 11 L16 11 L13.5 13 L14.5 16 L12 14 L9.5 16 L10.5 13 L8 11 L11 11 Z" fill="#B45309"/>
  </svg>
);

const WingDecoration = ({ className = "", flip = false }: { className?: string, flip?: boolean }) => (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}>
    <path d="M20 40 Q 50 48 65 45 Q 40 55 20 40" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M15 30 Q 60 10 98 5 Q 60 25 15 30" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 35 Q 50 30 95 20 Q 60 45 10 35" fill="#FDE68A" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 40 Q 15 55 40 55 Q 20 50 15 40" fill="#FDE68A" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

interface RewardPageProps {
  unitNumber: number;
  onContinue: (triggerCompletion?: boolean) => void; 
  isLastUnit: boolean;
  wrongAnswers?: WrongAnswer[];
  score?: number;
  totalQuestions?: number;
  pronunciationScore?: number;
  onGoHome: () => void;
  // 🔮 PROPS BARU: MEMORI REKOR SEBELUMNYA UNTUK SISTEM REVISIT
  previousPercentage?: number; 
  previousPronunciationScore?: number;
  previousUnlockedBadges?: string[]; // Array berisi ID lencana yang sudah didapat sebelumnya
}

export function RewardPage({ 
  unitNumber, onContinue, isLastUnit, wrongAnswers = [], score = 0, totalQuestions = 0, pronunciationScore = 0, onGoHome,
  previousPercentage = 0, previousPronunciationScore = 0, previousUnlockedBadges = [] 
}: RewardPageProps) {
  
  const [showReview, setShowReview] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 1000, height: 800 });
  const hasPlayedInitAudio = useRef(false);

  // 🧭 KALKULASI SKOR SESI INI
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  const quizScore = Math.round(percentage);
  const voiceScore = Math.round(pronunciationScore);
  const finalScore = quizScore + voiceScore;
  const reaction = getAtlasReaction(finalScore);

  // 1. Hitung Bintang KKTP
  let earnedStars = 0;
  if (quizScore >= 70 && voiceScore >= 60) earnedStars = 1;
  if (quizScore >= 85 && voiceScore >= 80) earnedStars = 2;
  if (quizScore === 100 && voiceScore >= 95) earnedStars = 3;

  // 🗺️ FUNGSI LENCANA REGIONAL (SISTEM SEKALI SAPU - KUMULATIF)
  function getAllEarnedTreasures() {
    const unlocked = [];

    // 🎯 LENCANA KUIS BARU
    if (unitNumber === 1) { 
      if (percentage >= 70) unlocked.push({ id: 'u1_q1', icon: Leaf, label: 'Leaf Reader', requirement: '🌿 E1 • Quiz 70+', color: 'text-green-600', bgColor: 'from-green-50 to-lime-100', tier: 1 });
      if (percentage >= 85) unlocked.push({ id: 'u1_q2', icon: TreePine, label: 'Forest Scholar', requirement: '🌿 E1 • Quiz 85+', color: 'text-emerald-700', bgColor: 'from-emerald-100 to-green-200', tier: 2 });
      if (percentage === 100) unlocked.push({ id: 'u1_q3', icon: Crown, label: 'Crown of the Woods', requirement: '🌿 E1 • Quiz 100', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-amber-200', tier: 3 });
    } 
    else if (unitNumber === 2) { 
      if (percentage >= 70) unlocked.push({ id: 'u2_q1', icon: Sun, label: 'Sand Seeker', requirement: '🏜️ E2 • Quiz 70+', color: 'text-amber-700', bgColor: 'from-orange-50 to-amber-100', tier: 1 });
      if (percentage >= 85) unlocked.push({ id: 'u2_q2', icon: Compass, label: 'Oasis Thinker', requirement: '🏜️ E2 • Quiz 85+', color: 'text-teal-700', bgColor: 'from-teal-100 to-cyan-200', tier: 2 });
      if (percentage === 100) unlocked.push({ id: 'u2_q3', icon: Tent, label: 'Pyramid Master', requirement: '🏜️ E2 • Quiz 100', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-amber-200', tier: 3 });
    }
    else if (unitNumber === 3) { 
      if (percentage >= 70) unlocked.push({ id: 'u3_q1', icon: Waves, label: 'Tide Learner', requirement: '🌊 E3 • Quiz 70+', color: 'text-blue-600', bgColor: 'from-blue-50 to-cyan-100', tier: 1 });
      if (percentage >= 85) unlocked.push({ id: 'u3_q2', icon: Fish, label: 'Coral Scholar', requirement: '🌊 E3 • Quiz 85+', color: 'text-rose-600', bgColor: 'from-rose-100 to-pink-200', tier: 2 });
      if (percentage === 100) unlocked.push({ id: 'u3_q3', icon: Gem, label: 'Pearl of Wisdom', requirement: '🌊 E3 • Quiz 100', color: 'text-slate-600', bgColor: 'from-slate-100 to-gray-200', tier: 3 });
    }
    else if (unitNumber === 4) { 
      if (percentage >= 70) unlocked.push({ id: 'u4_q1', icon: Mountain, label: 'Cliff Solver', requirement: '⛰️ E4 • Quiz 70+', color: 'text-slate-600', bgColor: 'from-slate-100 to-slate-300', tier: 1 });
      if (percentage >= 85) unlocked.push({ id: 'u4_q2', icon: MountainSnow, label: 'Peak Thinker', requirement: '⛰️ E4 • Quiz 85+', color: 'text-indigo-600', bgColor: 'from-indigo-100 to-violet-200', tier: 2 });
      if (percentage === 100) unlocked.push({ id: 'u4_q3', icon: Flag, label: 'Summit Genius', requirement: '⛰️ E4 • Quiz 100', color: 'text-sky-700', bgColor: 'from-sky-100 to-blue-200', tier: 3 });
    }
    else if (unitNumber === 5) { 
      if (percentage >= 70) unlocked.push({ id: 'u5_q1', icon: Map, label: 'Map Keeper', requirement: '🏰 E5 • Quiz 70+', color: 'text-amber-800', bgColor: 'from-amber-100 to-orange-200', tier: 1 });
      if (percentage >= 85) unlocked.push({ id: 'u5_q2', icon: Shield, label: 'Royal Scholar', requirement: '🏰 E5 • Quiz 85+', color: 'text-purple-700', bgColor: 'from-purple-100 to-indigo-200', tier: 2 });
      if (percentage === 100) unlocked.push({ id: 'u5_q3', icon: Sparkles, label: 'FIELA Legend', requirement: '🏰 E5 • Quiz 100', color: 'text-fuchsia-700', bgColor: 'from-fuchsia-100 to-purple-300', tier: 3 });
    }

    // 🎙️ LENCANA SUARA BARU
    if (unitNumber === 1) { 
      if (pronunciationScore >= 60) unlocked.push({ id: 'u1_v1', icon: Wind, label: 'Woodland Whisper', requirement: '🌿 E1 • Voice 60+', color: 'text-green-600', bgColor: 'from-green-50 to-lime-100', tier: 1 });
      if (pronunciationScore >= 80) unlocked.push({ id: 'u1_v2', icon: Bird, label: 'Jungle Caller', requirement: '🌿 E1 • Voice 80+', color: 'text-emerald-700', bgColor: 'from-emerald-100 to-green-200', tier: 2 });
      if (pronunciationScore >= 95) unlocked.push({ id: 'u1_v3', icon: Volume2, label: 'Lion\'s Roar', requirement: '🌿 E1 • Voice 95+', color: 'text-amber-600', bgColor: 'from-orange-100 to-amber-300', tier: 3 });
    }
    else if (unitNumber === 2) { 
      if (pronunciationScore >= 60) unlocked.push({ id: 'u2_v1', icon: AudioLines, label: 'Desert Echo', requirement: '🏜️ E2 • Voice 60+', color: 'text-orange-600', bgColor: 'from-orange-50 to-amber-100', tier: 1 });
      if (pronunciationScore >= 80) unlocked.push({ id: 'u2_v2', icon: Footprints, label: 'Dune Speaker', requirement: '🏜️ E2 • Voice 80+', color: 'text-amber-700', bgColor: 'from-orange-100 to-amber-200', tier: 2 });
      if (pronunciationScore >= 95) unlocked.push({ id: 'u2_v3', icon: Eye, label: 'Sphinx\'s Voice', requirement: '🏜️ E2 • Voice 95+', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-amber-200', tier: 3 });
    }
    else if (unitNumber === 3) { 
      if (pronunciationScore >= 60) unlocked.push({ id: 'u3_v1', icon: Shell, label: 'Seashell Murmur', requirement: '🌊 E3 • Voice 60+', color: 'text-teal-600', bgColor: 'from-teal-50 to-cyan-100', tier: 1 });
      if (pronunciationScore >= 80) unlocked.push({ id: 'u3_v2', icon: Anchor, label: 'Wave Caller', requirement: '🌊 E3 • Voice 80+', color: 'text-blue-600', bgColor: 'from-blue-100 to-indigo-200', tier: 2 });
      if (pronunciationScore >= 95) unlocked.push({ id: 'u3_v3', icon: Droplets, label: 'Dolphin\'s Pitch', requirement: '🌊 E3 • Voice 95+', color: 'text-cyan-600', bgColor: 'from-cyan-100 to-blue-200', tier: 3 });
    }
    else if (unitNumber === 4) { 
      if (pronunciationScore >= 60) unlocked.push({ id: 'u4_v1', icon: Cloud, label: 'Wind Whisperer', requirement: '⛰️ E4 • Voice 60+', color: 'text-sky-600', bgColor: 'from-sky-50 to-blue-100', tier: 1 });
      if (pronunciationScore >= 80) unlocked.push({ id: 'u4_v2', icon: Feather, label: 'Eagle\'s Call', requirement: '⛰️ E4 • Voice 80+', color: 'text-slate-700', bgColor: 'from-slate-200 to-gray-300', tier: 2 });
      if (pronunciationScore >= 95) unlocked.push({ id: 'u4_v3', icon: CloudLightning, label: 'Thunder\'s Roar', requirement: '⛰️ E4 • Voice 95+', color: 'text-indigo-700', bgColor: 'from-indigo-200 to-violet-300', tier: 3 });
    }
    else if (unitNumber === 5) { 
      if (pronunciationScore >= 60) unlocked.push({ id: 'u5_v1', icon: Bell, label: 'Silver Herald', requirement: '🏰 E5 • Voice 60+', color: 'text-slate-500', bgColor: 'from-slate-100 to-slate-300', tier: 1 });
      if (pronunciationScore >= 80) unlocked.push({ id: 'u5_v2', icon: Megaphone, label: 'Golden Orator', requirement: '🏰 E5 • Voice 80+', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-yellow-300', tier: 2 });
      if (pronunciationScore >= 95) unlocked.push({ id: 'u5_v3', icon: Trophy, label: 'Diamond Sovereign', requirement: '🏰 E5 • Voice 95+', color: 'text-cyan-400', bgColor: 'from-cyan-100 to-blue-100', tier: 3 });
    }

    return unlocked;
  }

  // 🔮 MESIN REVISIT (MENGHITUNG DELTA KOIN BERSIH)
  const prevQuiz = Math.round(previousPercentage);
  const prevVoice = Math.round(previousPronunciationScore);
  const prevTotalScore = prevQuiz + prevVoice;

  // Langkah 1: Delta Skor Murni
  let coinDelta = finalScore - prevTotalScore;
  if (coinDelta < 0) coinDelta = 0; // Tidak boleh minus

  // Langkah 2: Filter Lencana Baru & Konversi
  const allEarnedTreasuresThisSession = getAllEarnedTreasures();
  let badgeCoins = 0;
  
  const newlyUnlockedTreasures = allEarnedTreasuresThisSession.filter(badge => {
    const isAlreadyOwned = previousUnlockedBadges.includes(badge.id);
    if (!isAlreadyOwned) {
      if (badge.tier === 3) badgeCoins += 20; 
      if (badge.tier === 2) badgeCoins += 10; 
      if (badge.tier === 1) badgeCoins += 5; 
      return true; // Hanya masukkan ke UI jika benar-benar baru
    }
    return false; // Abaikan jika sudah pernah didapat
  });

  // Langkah 3: Total Koin Animasi
  const totalCoinsEarned = coinDelta + badgeCoins;

  // 🪙 STATE ANIMASI
  const [isPageReady, setIsPageReady] = useState(false); 
  const [displayedCoins, setDisplayedCoins] = useState(0);
  const [revealedTreasuresCount, setRevealedTreasuresCount] = useState(0);
  const [revealedStarsCount, setRevealedStarsCount] = useState(0); 

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      soundEffects.stopCoinTally(); 
    };
  }, []);

  // 🌟 ORKESTRASI ANIMASI SEKUENSAL
  useEffect(() => {
    if (!isPageReady) return; 

    if (!hasPlayedInitAudio.current) {
      hasPlayedInitAudio.current = true;
    }

    let currentStarIndex = 0;
    const totalStarsToReveal = 3;
    
    const starInterval = setInterval(() => {
      if (currentStarIndex < totalStarsToReveal) {
        setRevealedStarsCount(currentStarIndex + 1);
        if (currentStarIndex < earnedStars) {
          soundEffects.playStarPop(); 
        }
        currentStarIndex++;
      } else {
        clearInterval(starInterval);
        
        setTimeout(() => {
          if (newlyUnlockedTreasures.length > 0) {
            let currentTreasureIndex = 0;
            const treasureInterval = setInterval(() => {
              if (currentTreasureIndex < newlyUnlockedTreasures.length) {
                setRevealedTreasuresCount(currentTreasureIndex + 1);
                soundEffects.playTreasurePop();
                currentTreasureIndex++;
              } else {
                clearInterval(treasureInterval);
                setTimeout(() => triggerCoinRolling(), 300);
              }
            }, 400); 
          } else {
            triggerCoinRolling();
          }
        }, 200);
      }
    }, 300); 

    return () => clearInterval(starInterval);
  }, [isPageReady]);

  const triggerCoinRolling = () => {
    if (totalCoinsEarned === 0) {
      setDisplayedCoins(0);
      return;
    }

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

  const getHeadingInfo = () => {
    if (percentage === 100) return { title: 'Legendary Mastery!', emoji: '👑', subtitle: 'Flawless! You achieved absolute perfection!' };
    if (percentage >= 90) return { title: 'Outstanding Excellence!', emoji: '🏆', subtitle: "Almost perfect! You're a true expert!" };
    if (percentage >= 80) return { title: 'Great Achievement!', emoji: '⭐', subtitle: "Impressive work! You're doing excellent!" };
    if (percentage >= 70) return { title: 'Good Progress!', emoji: '🎯', subtitle: "Well done! You're improving steadily!" };
    return { title: 'Keep Going!', emoji: '💪', subtitle: "Don't give up! Every expedition makes you stronger!" };
  };

  const headingInfo = getHeadingInfo();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-violet-950 to-purple-950 flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 relative overflow-x-hidden overflow-y-auto">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`, backgroundSize: '150px 150px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-yellow-500/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.2 }} className="absolute top-4 left-4 z-50 fixed">
        <motion.button onClick={() => { soundEffects.buttonHome(); onGoHome(); }} initial="normal" animate="normal" whileHover="diHover" whileTap="diKlik"
          variants={{
            normal: { backgroundColor: '#fffcf2', color: '#570e8b', borderColor: '#e6fcfe', borderRadius: '50%', scale: 1 },
            diHover: { scale: 1.15, backgroundColor: '#570e8b', color: '#FAF6F1', borderColor: '#e6fcfe', borderRadius: '12px', transition: { type: "spring", stiffness: 400, damping: 15 } },
            diKlik: { scale: 0.9 }
          }}
          className="rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] border-2 bg-[#faf6f1]/95 border-amber-700/30 text-amber-900 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-2 sm:p-3 w-10 h-10 sm:w-14 sm:h-14 hover:h-12 hover:w-10 sm:hover:w-15 sm:hover:h-16 transition-all duration-75"
        >
          <motion.span className="flex items-center justify-center" variants={{ normal: { y: 0, scale: 1 }, diHover: { y: -2, scale: 0.9 } }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
            <Home className="h-4 w-4 sm:h-6 sm:w-6" />
          </motion.span>
          <motion.span className="text-[7px] sm:text-[9px] font-bold tracking-wide uppercase pointer-events-none mt-0.5" variants={{ normal: { opacity: 0, y: 6, height: 0 }, diHover: { opacity: 1, y: 0, height: "auto", transition: { type: "tween", ease: "easeOut", duration: 0.1 } } }}>
            Home
          </motion.span>
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 30 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4, delay: 0.2 }}
        onAnimationComplete={() => setIsPageReady(true)} 
        className="max-w-5xl w-full bg-[#fffcf2] rounded-3xl p-6 sm:p-8 md:p-10 relative z-10 border-4 border-amber-300 shadow-2xl overflow-hidden my-auto" 
        style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 40px rgba(251,191,36,0.1), 0 0 30px rgba(251,191,36,0.3)' }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-3xl" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />
        
        <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-amber-200 to-transparent -translate-x-1/2 z-0 opacity-70" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
          
          <div className="flex flex-col h-full w-full items-center md:items-start text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} 
              className="flex flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full border-b-[3px] border-amber-200/60 pb-5 sm:pb-6"
            >
              <div className="flex-1 relative bg-white p-3 sm:p-4 rounded-xl border-2 border-amber-300 shadow-sm text-left">
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-t-2 border-r-2 border-amber-300" />
                <p className="font-[Nunito] font-bold text-xs sm:text-sm text-amber-950 leading-snug">
                  "{reaction.text}"
                </p>
              </div>

              <div className="w-16 sm:w-20 shrink-0 relative flex justify-center pb-1">
                <img src={reaction.pose} alt="Atlas Pose" className="w-full relative z-20 drop-shadow-md" />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="text-amber-950 font-[Fredoka] text-xl sm:text-2xl lg:text-3xl font-bold tracking-wide text-center drop-shadow-sm mb-5 w-full whitespace-nowrap text-ellipsis overflow-hidden"
            >
              Expedition {unitNumber} Completed!
            </motion.h1>

            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 200 }} className="w-full flex justify-center mb-5">
              <div className="flex flex-row items-center justify-center gap-0.5 sm:gap-1">
                <motion.div style={{ originX: 1, originY: 0.5 }} animate={{ rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                  <WingDecoration className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 lg:w-24 lg:h-16 drop-shadow-md" flip={true} />
                </motion.div>
                <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="flex items-center justify-center tracking-wide w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-b from-white to-yellow-200/80 rounded-full shadow-[0_5px_15px_rgba(217,119,6,0.3)] border-4 border-amber-400 relative z-10">
                  {percentage === 100 ? <Crown className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-500 drop-shadow-md" /> 
                  : percentage >= 80 ? <Star className="h-10 w-10 sm:h-12 sm:w-12 text-blue-500 drop-shadow-md" /> 
                  : percentage >= 60 ? <Award className="h-10 w-10 sm:h-12 sm:w-12 text-green-500 drop-shadow-md" /> 
                  : <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-purple-500 drop-shadow-md" />}
                </motion.div>
                <motion.div style={{ originX: 0, originY: 0.5 }} animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.2 }}>
                  <WingDecoration className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 lg:w-24 lg:h-16 drop-shadow-md" flip={false} />
                </motion.div>
              </div>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} 
              className="text-amber-950 font-[Fredoka] text-xl sm:text-2xl lg:text-3xl font-bold text-center tracking-wide drop-shadow-sm leading-tight w-full whitespace-nowrap text-ellipsis overflow-hidden"
            >
              {headingInfo.emoji} {headingInfo.title}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} 
              className="text-amber-800 mt-2 mb-8 font-[Nunito] font-bold text-sm sm:text-base md:text-md lg:text-lg text-center w-full whitespace-nowrap text-ellipsis overflow-hidden"
            >
              {headingInfo.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="w-full space-y-3 mt-auto pb-4">
              {wrongAnswers.length > 0 && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={() => { soundEffects.buttonReview(); setShowReview(true); }} variant="outline" className="w-full bg-white border-2 border-amber-300 text-amber-900 hover:bg-amber-50 py-5 sm:py-6 rounded-xl cursor-pointer font-[Fredoka] font-bold text-sm sm:text-base shadow-sm transition-all">
                    <BookOpen className="h-5 w-5 mr-2 text-amber-700" />
                    Review Missed Answers ({wrongAnswers.length})
                  </Button>
                </motion.div>
              )}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => { soundEffects.buttonSuccess(); onContinue(isLastUnit); }} 
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-800 text-white px-5 py-6 sm:py-7 rounded-xl shadow-lg shadow-indigo-900/50 w-full cursor-pointer font-[Fredoka] font-bold tracking-wide border-2 border-indigo-400/50 transition-all text-base sm:text-lg"
                >
                  {isLastUnit ? '🎊 Complete the Atlas!' : 'Continue the Journey ➡️'}
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center h-full gap-5 sm:gap-6 lg:pl-4">
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="w-full">
              <div className="bg-lime-200/50 rounded-2xl p-4 sm:p-5 border-2 border-lime-300 shadow-sm relative z-10">
                <div className="flex flex-row items-center justify-between border-b-2 border-lime-400/60 pb-3 mb-4">
                  <p className="text-amber-900 font-[Fredoka] font-bold text-lg sm:text-xl tracking-wide">🗺️ Journey Stats</p>
                  
                  <motion.div 
                    animate={displayedCoins === totalCoinsEarned ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 text-amber-950 font-[Fredoka] font-bold px-3 py-1.5 rounded-full border-2 border-white shadow-sm text-xs sm:text-sm"
                  >
                    <CoinIcon className="w-5 h-5 animate-spin-slow drop-shadow-md" />
                    <span className="tracking-wide">+{displayedCoins}</span>
                  </motion.div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="bg-white py-2 px-1 rounded-xl border border-amber-200 shadow-md flex flex-col items-center justify-center">
                    <span className="text-amber-800 font-[Nunito] font-bold text-xs mb-1 text-center leading-none">Stars</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(starIndex => {
                        const isVisible = starIndex <= revealedStarsCount;
                        const isEarned = starIndex <= earnedStars;
                        return (
                          <div key={starIndex} className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                            <AnimatePresence>
                              {isVisible && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", stiffness: 350, damping: 14 }}
                                >
                                  <Star 
                                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                      isEarned ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm' : 'text-gray-300 fill-gray-100 opacity-50'
                                    }`} 
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white py-2 px-1 rounded-xl border border-amber-200 shadow-md flex flex-col items-center justify-center">
                    <span className="text-amber-800 font-[Nunito] font-bold text-xs mb-0.5 text-center leading-none">Quiz</span>
                    <span className={`font-bold font-[Fredoka] text-base sm:text-lg ${quizScore === 100 ? 'text-yellow-600' : quizScore >= 80 ? 'text-blue-600' : 'text-red-600'}`}>
                      {quizScore}
                    </span>
                    <span className="text-[9px] font-bold text-amber-900/50 leading-none mt-0.5">({score}/{totalQuestions} correct)</span>
                  </div>

                  <div className="bg-white py-2 px-1 rounded-xl border border-amber-200 shadow-md flex flex-col items-center justify-center">
                    <span className="text-amber-800 font-[Nunito] font-bold text-xs mb-0.5 text-center leading-none">Voice</span>
                    <span className={`font-bold font-[Fredoka] text-base sm:text-lg ${voiceScore >= 80 ? 'text-green-600' : voiceScore >= 60 ? 'text-amber-600' : 'text-rose-600'}`}>
                      {voiceScore}
                    </span>
                    <span className="text-[9px] font-bold text-amber-900/50 leading-none mt-0.5">/ 100 score</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-white to-amber-50 py-2.5 px-4 rounded-xl border-2 border-amber-300 shadow-sm flex flex-row items-center justify-between">
                  <div className="flex flex-row items-baseline gap-1.5 flex-wrap">
                    <span className="text-amber-900 font-[Fredoka] font-bold text-sm tracking-wide leading-none">Quest Score</span>
                    <span className="text-[10px] font-bold font-[Nunito] text-amber-700/70 leading-none">(Quiz + Voice)</span>
                  </div>
                  <div className="flex items-baseline gap-1 shrink-0">
                    <span className="font-bold font-[Fredoka] text-xl sm:text-2xl text-amber-600 drop-shadow-sm leading-none">
                      {finalScore}
                    </span>
                    <span className="font-bold font-[Nunito] text-xs text-amber-800/50 leading-none">
                      / 200
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.7 }} 
              /* 🔮 WADAH BARU: Diberi warna gelap transparan, bingkai tegas, dan bayangan dalam agar lencana pop-out */
              className="w-full mt-1 bg-amber-950/30 border border-amber-900/30 rounded-2xl p-4 shadow-inner overflow-visible relative"
            >
              {/* 🔮 JUDUL PANEL: Disesuaikan warnanya agar kontras dan serasi dengan wadah gelap */}
              <p className="text-amber-100 mb-2 font-[Fredoka] font-bold text-sm bg-amber-900/60 inline-block px-3 py-1.5 rounded-xl border border-amber-700/50 w-full text-center tracking-wide shadow-sm">
                🎁 Treasures Unlocked
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-visible p-2 pt-4 relative z-30">
                {newlyUnlockedTreasures.length === 0 ? (
                  <div className="col-span-full py-4 text-center">
                    {/* 🔮 Teks pesan kosong diubah ke warna terang agar tidak ikut tenggelam */}
                    <p className="text-amber-200/60 font-[Nunito] font-bold text-sm italic">
                      No new treasures found this time.
                    </p>
                  </div>
                ) : (
                  newlyUnlockedTreasures.map((badge, index) => {
                    const isVisible = index < revealedTreasuresCount;
                    const isTier3 = badge.tier === 3;
                    const isTier2 = badge.tier === 2;
                    const coinValue = isTier3 ? 20 : isTier2 ? 10 : 5;

                    return (
                      <AnimatePresence key={index}>
                        {isVisible && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8, x: -10 }} animate={{ opacity: 1, scale: 1, x: 0 }} 
                            whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 260, damping: 15 }} 
                            tabIndex={0}
                            className={`group relative bg-gradient-to-br ${badge.bgColor} rounded-xl p-2 sm:p-2.5 flex flex-row items-center gap-2 sm:gap-2.5 overflow-visible cursor-pointer focus:outline-none hover:z-50 focus:z-50 ${
                              isTier3 ? 'border-[2px] border-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.5)] z-10' :
                              isTier2 ? 'border-2 border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.2)] relative' : 
                              'border border-white shadow-sm relative'
                            }`}
                          >
                            {/* TOOLTIP MELAYANG */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-all duration-300 pointer-events-none z-50 flex flex-col items-center">
                              <div className="bg-amber-950/90 text-amber-300 font-[Fredoka] font-bold text-xs px-3 py-1.5 rounded-lg shadow-xl border border-amber-500/50 flex items-center gap-1.5 whitespace-nowrap">
                                <span className="text-sm leading-none">+</span>
                                <span className="text-sm leading-none">{coinValue}</span>
                                <span className="font-[Nunito] text-[10px] uppercase tracking-wider text-amber-200/80">Coins</span>
                              </div>
                              <div className="w-2 h-2 bg-amber-950/90 rotate-45 -mt-1 border-b border-r border-amber-500/50"></div>
                            </div>

                            {isTier3 && <div className="absolute inset-0 bg-white/30 animate-pulse pointer-events-none rounded-xl" />}

                            <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.2 }} 
                              className={`p-1.5 sm:p-2 rounded-full shrink-0 relative z-10 ${
                                isTier3 ? 'bg-gradient-to-br from-yellow-100 to-amber-300 shadow-md' : 
                                isTier2 ? 'bg-white/95 shadow-sm' : 'bg-white/60 border border-white shadow-inner'
                              }`}
                            >
                              <badge.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${badge.color} ${isTier3 ? 'drop-shadow-sm' : ''}`} />
                            </motion.div>
                            
                            <div className="flex flex-col items-start justify-center w-full relative z-10 pointer-events-none">
                              <p className={`text-[11px] sm:text-xs font-bold font-[Fredoka] tracking-wide leading-tight truncate w-full ${
                                isTier3 ? 'text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' : 'text-amber-950'
                              }`}>
                                {badge.label}
                              </p>
                              <p className={`text-[9px] sm:text-[10px] font-bold font-[Nunito] leading-tight mt-0.5 truncate w-full ${
                                isTier3 ? 'text-amber-800' : 'text-amber-900/60'
                              }`}>
                                {badge.requirement}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    );
                  })
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showReview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-indigo-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowReview(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: "spring", damping: 25, stiffness: 300 }} onClick={(e) => e.stopPropagation()} className="bg-[#fffcf2] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border-4 border-amber-300">
              <div className="flex justify-between items-center px-5 sm:px-6 py-4 border-b-2 border-amber-200 bg-[#fffcf2] shrink-0 z-10">
                <h2 className="text-amber-950 font-[Fredoka] font-bold text-lg sm:text-xl flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-amber-600" /> Review Challenges
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-4 sm:space-y-5">
                {wrongAnswers.map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-xl p-4 sm:p-5 border-2 border-amber-200 shadow-sm">
                    <div className="mb-3 sm:mb-4 bg-amber-50 p-3 rounded-lg border border-amber-100">
                      <p className="text-[10px] sm:text-xs text-amber-800 mb-1 font-[Fredoka] font-bold uppercase tracking-wide">Challenge {index + 1}:</p>
                      <p className="text-sm sm:text-base text-amber-950 font-[Nunito] font-extrabold leading-snug">{item.question}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 sm:mb-4">
                      <div className="bg-red-50 rounded-lg p-3 border-2 border-red-200"><p className="text-[10px] sm:text-xs text-red-700 mb-1 font-[Fredoka] font-bold flex items-center gap-1.5"><X className="h-3 w-3"/> Your Answer:</p><p className="text-red-950 font-[Nunito] font-bold text-sm sm:text-base">{item.yourAnswer}</p></div>
                      <div className="bg-green-50 rounded-lg p-3 border-2 border-green-200"><p className="text-[10px] sm:text-xs text-green-700 mb-1 font-[Fredoka] font-bold flex items-center gap-1.5"><CheckCircle className="h-3 w-3"/> Correct Answer:</p><p className="text-green-950 font-[Nunito] font-bold text-sm sm:text-base">{item.correctAnswer}</p></div>
                    </div>
                    <div className="bg-amber-50/80 rounded-lg p-3 sm:p-4 border border-amber-200 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400" />
                      <p className="text-[9px] sm:text-[10px] text-amber-800 mb-1 font-[Fredoka] font-bold uppercase tracking-wider pl-2">Vocabulary Reference</p>
                      <div className="pl-2">
                        <p className="text-lg sm:text-xl text-amber-950 font-[Fredoka] font-bold">{item.word.word}</p>
                        <p className="text-xs sm:text-sm text-amber-700 font-[Nunito] font-bold mb-1.5 sm:mb-2">/{item.word.pronunciation}/</p>
                        <p className="text-amber-950 font-[Nunito] font-bold text-sm sm:text-base leading-relaxed mb-1.5">{item.word.definition}</p>
                        <p className="text-xs sm:text-sm text-amber-800/90 italic font-[Nunito] font-bold">"<span className="font-extrabold">{item.word.example}</span>"</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="px-5 sm:px-6 py-4 border-t-2 border-amber-200 bg-[#fffcf2] shrink-0 z-10">
                <Button onClick={() => { soundEffects.buttonNavigation(); setShowReview(false); }} className="w-full bg-amber-500 hover:bg-amber-600 text-amber-950 py-5 sm:py-6 rounded-xl font-[Fredoka] font-bold text-base shadow-md active:scale-95 transition-transform">
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
            <motion.div key={i} initial={{ y: -50, x: Math.random() * windowDimensions.width, opacity: 0 }} animate={isPageReady ? { y: windowDimensions.height + 50, x: Math.random() * windowDimensions.width, rotate: Math.random() * 360, opacity: [0, 1, 1, 0] } : {}} transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }} className={`absolute w-2 h-2 sm:w-3 sm:h-3 ${colors[i % 4]} rounded-full blur-[1px]`} style={{ boxShadow: '0 0 8px rgba(253, 224, 71, 0.8)' }} />
          );
        })}
      </div>
    </div>
  );
}