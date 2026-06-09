import fielaLogo from '../imports/atlas_mascot_homepage.png'
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button.tsx';
import { Star, Sparkles, ArrowLeft, Lock, Eye, EyeOff, RotateCcw, GraduationCap, Gamepad2, Trophy, Crown } from 'lucide-react';
import type { PageType, Unit } from '../types/index';

// Safe import for soundEffects
let soundEffects: any = { play: () => {}, click: () => {}, buttonReview: () => {}, buttonPlay: () => {}, correct: () => {}, incorrect: () => {}, buttonClick: () => {}, buttonNavigation: () => {} };

const loadSoundEffects = async () => {
  try {
    const module = await import('../utils/soundEffects');
    soundEffects = ((module as any).default) ?? module;
  } catch (e) {}
};

loadSoundEffects();

import { backgroundMusic } from '../utils/backgroundMusic';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog.tsx';
import { BadgeCollection } from './BadgeCollection.tsx';

// Komponen SVG Atlas Coin yang anti-error di semua HP
const CoinIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="10" fill="#FBBF24" stroke="#B45309" strokeWidth="2"/>
    <circle cx="12" cy="12" r="6" fill="#FDE68A" />
    <path d="M12 8 L13 11 L16 11 L13.5 13 L14.5 16 L12 14 L9.5 16 L10.5 13 L8 11 L11 11 Z" fill="#B45309"/>
  </svg>
);

interface HomePageProps {
  units: Unit[];
  completedUnits: Set<number>;
  passwordUnlockedUnits: Set<number>;
  unitScores: Record<number, any>;
  onSelectUnit: (unitId: number) => void;
  onReviewUnit?: (unitId: number, page: PageType) => void;
  onPasswordUnlock: (unitId: number) => void;
  onBackToWelcome?: () => void;
}

export function HomePage({ units, completedUnits, passwordUnlockedUnits, unitScores, onSelectUnit, onReviewUnit, onPasswordUnlock, onBackToWelcome }: HomePageProps) {
  
  useEffect(() => {
    try { backgroundMusic.stop(); } catch (e) { console.warn("Gagal menghentikan musik sebelumnya:", e); }
    try { backgroundMusic.play(0); } catch (e) { console.warn("BGM Homepage tertahan oleh browser:", e); }
    return () => { try { backgroundMusic.stop(); } catch (e) {} };
  }, []);
  
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [selectedLockedUnit, setSelectedLockedUnit] = useState<number | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedReviewUnit, setSelectedReviewUnit] = useState<number | null>(null);
  const [selectedIsland, setSelectedIsland] = useState<number | null>(null);
  const [treasureVaultOpen, setTreasureVaultOpen] = useState(false);
  const [isOwlAnimating, setIsOwlAnimating] = useState(false);

  // =====================================================================
  // SISTEM EKONOMI ATLAS COINS & BINTANG KKTP
  // =====================================================================
  
  // Menghitung jumlah Bintang per Pulau (Sesuai Standar Kurikulum Merdeka)
  const getUnitStars = (unitScore: any) => {
    if (!unitScore) return 0;
    const quiz = Math.round(unitScore.percentage || 0);
    const voice = Math.round(unitScore.pronunciationScore || 0);
    
    let stars = 0;
    if (quiz >= 70 && voice >= 60) stars = 1; // KKTP Tuntas Minimum
    if (quiz >= 85 && voice >= 80) stars = 2; // Cakap / Baik
    if (quiz === 100 && voice >= 95) stars = 3; // Mahir / Sempurna
    return stars;
  };

  // Menghitung jumlah Atlas Coins dari satu pulau
  const getUnitCoins = (unitScore: any) => {
    if (!unitScore) return 0;
    const quiz = Math.round(unitScore.percentage || 0);
    const voice = Math.round(unitScore.pronunciationScore || 0);
    
    let coins = quiz + voice; // Gaji Pokok

    if (quiz > 0 || voice > 0) coins += 20; // Bonus Partisipasi

    // Bonus Tingkat Kuis
    if (quiz === 100) coins += 50;
    else if (quiz >= 85) coins += 25;
    else if (quiz >= 70) coins += 15;

    // Bonus Tingkat Suara
    if (voice >= 95) coins += 50;
    else if (voice >= 80) coins += 25;
    else if (voice >= 60) coins += 15;

    return coins;
  };

  // Kalkulasi Total Harta Kekayaan (Semua Koin Diakumulasi)
  const totalCoins = Object.values(unitScores).reduce((sum, score) => sum + getUnitCoins(score), 0);

  // =====================================================================

  const handleUnitClick = (unitId: number, isCompleted: boolean) => {
    if (isCompleted) {
      soundEffects.buttonReview?.();
      setSelectedReviewUnit(unitId);
      setReviewDialogOpen(true);
    } else {
      soundEffects.buttonPlay?.();
      onSelectUnit(unitId);
    }
  };

  const handleReviewOption = (page: PageType) => {
    if (selectedReviewUnit !== null && onReviewUnit) {
      soundEffects.buttonPlay();
      onReviewUnit(selectedReviewUnit, page);
      setReviewDialogOpen(false);
    }
  };

  const handleLockedUnitClick = (unitId: number) => {
    setSelectedLockedUnit(unitId);
    setPasswordInput('');
    setPasswordError('');
    setShowPassword(false);
    setPasswordDialogOpen(true);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === 'fielaeducation') {
      if (selectedLockedUnit !== null) {
        onPasswordUnlock(selectedLockedUnit);
        setPasswordDialogOpen(false);
        soundEffects.correct();
      }
    } else {
      setPasswordError('Incorrect password. Please try again.');
      soundEffects.incorrect();
    }
  };

  const openTreasureVault = () => {
    soundEffects.buttonReview();
    setTreasureVaultOpen(true);
  };

  const handleOwlClick = () => {
    if (!isOwlAnimating) {
      if (typeof soundEffects.buttonClick === 'function') soundEffects.buttonClick();
      setIsOwlAnimating(true);
      setTimeout(() => setIsOwlAnimating(false), 1000);
    }
  };

  const owlAnimationVariants: any = {
    idle: { rotate: 0, scale: 1 },
    wiggling: { rotate: [0, -12, 12, -12, 12, 0], scale: [1, 1.15, 1.15, 1], transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] } }
  };

  useEffect(() => {
    if (selectedIsland !== null) {
      const isMobile = window.innerWidth < 768;
      const scrollPosition = isMobile ? 420 : 620;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  }, [selectedIsland]);
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #4A90A4 40%, #2E5266 100%)' }}>
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.05) 20px, rgba(255, 255, 255, 0.05) 40px)` }} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-10 md:right-32 text-3xl opacity-15">🐳</div>
        <div className="absolute top-1/2 right-12 md:right-32 text-2xl opacity-15">🐟</div>
        <div className="absolute top-1/2 left-12 md:left-32 text-2xl opacity-15">🦑</div>
        <div className="absolute bottom-1/3 left-16 md:left-48 text-2xl opacity-15">🐡</div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-900/15" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-12 sm:pt-16 md:pt-20">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 md:mb-16">
          <div className="relative">
            <div className="absolute inset-0 -z-10 opacity-20" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(135, 206, 235, 0.5) 25%, rgba(74, 144, 164, 0.6) 50%, rgba(135, 206, 235, 0.5) 75%, transparent 100%)' }} />
            <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 mb-6 p-[0px]">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 150, damping: 15 }} className="relative">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="relative" style={{ willChange: "transform" }}>
                  <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ background: 'radial-gradient(circle, rgba(135, 206, 235, 0.8) 0%, rgba(74, 144, 164, 0.4) 50%, transparent 100%)', transform: 'scale(1.5)' }} />
                  <motion.img
                    src={fielaLogo}
                    className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 object-contain relative z-10 cursor-pointer"
                    alt="FIELA - Ocean Learning Adventure"
                    style={{ filter: "drop-shadow(0 8px 16px rgba(74, 144, 164, 0.5))" }}
                    variants={owlAnimationVariants} animate={isOwlAnimating ? "wiggling" : "idle"} onClick={handleOwlClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  />
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute -top-2 -right-4 md:-top-4 md:-right-8 text-3xl md:text-5xl z-20 pointer-events-none" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))', willChange: 'transform' }}>⭐</motion.div>
                </motion.div>
              </motion.div>
              <div className="flex flex-col items-center text-center space-y-4 w-full">
                <h1 className="block w-full text-center leading-tight font-[Frijole] text-[50px] sm:text-[65px] md:text-[80px] lg:text-[96px] -mr-[0.2em] translate-x-1" style={{ background: 'linear-gradient(90deg, #1a4d5e 0%, #3A7F94 50%, #1a4d5e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 8px 16px rgba(26, 77, 94, 0.4)', letterSpacing: '0.1em' }}>FIELA</h1>
                <div className="h-1 mx-auto mt-2 rounded-full w-[60%]" style={{ background: 'linear-gradient(90deg, transparent 0%, #4A90A4 50%, transparent 100%)' }} />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex items-center gap-3 px-6 py-3 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.9) 100%)', boxShadow: '0 4px 16px rgba(74, 144, 164, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)', border: '2px solid rgba(74, 144, 164, 0.3)' }}>
                  <span className="text-2xl">🌏</span>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-[Coiny] font-bold" style={{ background: 'linear-gradient(135deg, #2E5266 0%, #4A90A4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fun & Interactive English Learning Atlas</p>
                  <span className="text-2xl">🗺️</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedIsland === null ? (
            <motion.div key="map-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} style={{ willChange: 'opacity, transform' }} className="relative z-10 mb-20 max-w-6xl mx-auto px-4">
              <div className="absolute top-24 left-0 w-full h-[calc(100%-12rem)] pointer-events-none -z-10">
                <svg className="hidden md:block w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 1000">
                  <path d="M 500 50 C 500 150, 250 150, 250 250 C 250 350, 750 350, 750 450 C 750 550, 200 550, 200 650 C 200 750, 800 750, 800 850 C 800 900, 300 900, 300 980" stroke="#4A90A4" strokeWidth="5" fill="none" strokeDasharray="15 10" opacity="0.4" vectorEffect="non-scaling-stroke" />
                  <path d="M 500 50 C 500 150, 250 150, 250 250 C 250 350, 750 350, 750 450 C 750 550, 200 550, 200 650 C 200 750, 800 750, 800 850 C 800 900, 300 900, 300 980" stroke="#87CEEB" strokeWidth="2" fill="none" strokeDasharray="6 6" opacity="0.3" vectorEffect="non-scaling-stroke" />
                </svg>
                <svg className="block md:hidden w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 1000">
                  <path d="M 500 50 Q 100 150, 500 250 Q 900 350, 500 450 Q 100 550, 500 650 Q 900 750, 500 850 Q 100 930, 500 980" stroke="#4A90A4" strokeWidth="4" fill="none" strokeDasharray="12 8" opacity="0.4" vectorEffect="non-scaling-stroke" />
                  <path d="M 500 50 Q 100 150, 500 250 Q 900 350, 500 450 Q 100 550, 500 650 Q 900 750, 500 850 Q 100 930, 500 980" stroke="#87CEEB" strokeWidth="2" fill="none" strokeDasharray="6 6" opacity="0.3" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>   
              
              {/* ================================================== */}
              {/* DOMPET ATLAS COINS (DIPINDAH KE TENGAH PETA)         */}
              {/* ================================================== */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative z-20 flex justify-center mb-2 mt-6"
              >
                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-200 to-yellow-400 px-5 py-2 md:px-6 md:py-2.5 rounded-full border-4 border-amber-600 shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
                  <div className="bg-amber-100 rounded-full p-1.5 border-2 border-amber-500 shadow-inner flex items-center justify-center">
                    <CoinIcon className="w-7 h-7 md:w-9 md:h-9 drop-shadow-md" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] md:text-xs font-bold text-amber-800 uppercase tracking-widest leading-none mb-0.5 drop-shadow-sm">Atlas Coins</span>
                    <span className="font-[Coiny] text-amber-950 font-bold text-2xl md:text-3xl drop-shadow-sm leading-none">{totalCoins}</span>
                  </div>
                </div>
              </motion.div>

              <div className="relative mb-16 mt-8 z-10">
                <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} onClick={openTreasureVault} className="relative w-44 h-48 md:w-56 md:h-56 cursor-pointer mx-auto" style={{ filter: 'drop-shadow(0 12px 24px rgba(251, 191, 36, 0.4))', willChange: 'transform' }}>
                  <div className="absolute inset-0 bg-yellow-400/40 rounded-full blur-[40px] animate-pulse" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 md:h-40" style={{ background: 'radial-gradient(ellipse at center bottom, #fef08a 0%, #eab308 30%, #b45309 80%, #78350f 100%)', borderRadius: '50% 50% 55% 45% / 40% 60% 40% 60%', boxShadow: '0 10px 30px rgba(217, 119, 6, 0.5), inset 0 -5px 15px rgba(67, 20, 7, 0.4)' }}>
                    <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: `radial-gradient(rgba(253, 224, 71, 0.4) 3px, transparent 3px)`, backgroundSize: '16px 16px', borderRadius: '50% 50% 55% 45% / 40% 60% 40% 60%' }} />
                    <div className="absolute bottom-17 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className="relative">
                        <Sparkles className="absolute -top-4 -left-4 text-yellow-300 h-6 w-6 animate-pulse" />
                        <Sparkles className="absolute top-2 -right-6 text-yellow-200 h-5 w-5 animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <div className="absolute -top-2 left-2 text-3xl opacity-100" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div>
                        <div className="absolute -top-1 right-2 text-4xl opacity-95" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div>
                        <div className="absolute -top-0 left-1 text-3xl opacity-100" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div>
                        <span className="text-5xl md:text-6xl drop-shadow-xl" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🧰</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 px-5 py-2.5 text-center min-w-[160px] md:min-w-[180px] z-20" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)', borderRadius: '12px', border: '3px solid #78350f', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(253,230,138,0.4), inset 0 -2px 4px rgba(0,0,0,0.4)' }}>
                    <p className="text-[#fffdf8] font-bold relative z-10 text-sm md:text-base font-[Balsamiq_Sans] tracking-wide" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Treasure Vault</p>
                    <p className="text-amber-100 font-[Nunito] font-bold text-[10px] md:text-xs mt-0.5 relative z-10 leading-tight" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>View Your Collection</p>
                    <Crown className="absolute -top-4 -right-3 h-7 w-7 text-yellow-300 drop-shadow-md" style={{ transform: 'rotate(15deg)' }} />
                  </div>
                </motion.div>
              </div>

              {units.map((unit, index) => {
                const positions = ['md:ml-[10%]', 'md:ml-[68%]', 'md:ml-[12%]', 'md:ml-[65%]', 'md:ml-[15%]'];
                const ornaments = ['⛵', '⛵', '⛵', '⛵', '⛵'];
                const boatStyles = ['rotate-[330deg]', '-scale-x-100 -rotate-[340deg]', 'rotate-[343deg]', '-scale-x-100 -rotate-[340deg]', 'rotate-[340deg]'];
                const boatPositions = ['left-[20%] md:left-[35%] -top-12 md:-top-8', 'left-[65%] md:left-[60%] -top-2 md:top-16', 'left-[12%] md:left-[42%] -top-2 md:top-10', 'left-[60%] md:left-[50%] -top-5 md:top-16', 'left-[12%] md:left-[35%] -top-2 md:-top-8'];

                const isPasswordUnlocked = passwordUnlockedUnits.has(unit.id);
                
                // =========================================================
                // LOGIKA GEMBOK BARU: DITENTUKAN OLEH JUMLAH ATLAS COINS!
                // =========================================================
                const requiredCoins = index * 180; 
                const isLocked = totalCoins < requiredCoins && !isPasswordUnlocked;
                const islandStars = getUnitStars(unitScores[unit.id]); // Ambil bintang KKTP

                let marginClass = "relative mb-8 md:mb-12 z-10";
                if (index === 1 || index === 2 || index === 3) marginClass = "relative -translate-y-4 md:-translate-y-12 translate-x-4 md:translate-x-6 mb-4 md:mb-6 z-10";
                const sizeClass = (index === 1 || index === 3) ? "relative w-52 h-60 md:w-60 md:h-68 cursor-pointer mx-auto" : "relative w-44 h-52 md:w-52 md:h-60 cursor-pointer mx-auto";

                return (
                  <div key={unit.id} className={marginClass}>
                    <div className={`absolute z-20 ${boatPositions[index]}`}>
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: index * 0.4 }} className={`text-3xl md:text-4xl lg:text-5xl opacity-100 ${boatStyles[index]}`} style={{ filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.5))' }}>
                        {ornaments[index]}
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (isLocked) handleLockedUnitClick(unit.id);
                        else { 
                          soundEffects.buttonNavigation?.();
                          setSelectedIsland(unit.id); 
                        }
                      }}
                      className={`${sizeClass} ${positions[index]}`}
                      style={{ filter: 'drop-shadow(0 8px 16px rgba(74, 144, 164, 0.3))', willChange: 'transform' }}
                    >
                      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full ${(index === 1 || index === 3) ? 'h-40 md:h-44' : 'h-36 md:h-40'}`}
                        style={{ background: 'radial-gradient(ellipse at center bottom, #f9e4a0 0%, #f4d03f 20%, #e8c87c 40%, #d4a574 65%, #c49b6b 85%, #b5915e 100%)', borderRadius: '50% 50% 45% 55% / 60% 60% 40% 40%', boxShadow: '0 8px 24px rgba(74, 144, 164, 0.4), inset 0 -4px 8px rgba(139, 69, 19, 0.15)' }}
                      >
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(rgba(139, 69, 19, 0.15) 2px, transparent 2px)`, backgroundSize: '12px 12px', borderRadius: '50% 50% 45% 55% / 60% 60% 40% 40%' }} />
                        {index === 0 && (<><div className="absolute top-2 left-2 text-4xl opacity-100" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute top-1 right-4 text-3xl opacity-95" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute top-6 left-2 text-2xl opacity-90" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute bottom-14 left-5 text-4xl opacity-100 z-10" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🌴</div><div className="absolute bottom-10 right-6 text-3xl opacity-100 z-10" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🌴</div></>)}
                        {index === 1 && (<><div className="absolute top-2 left-4 text-3xl opacity-100" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute top-3 right-4 text-4xl opacity-95" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute top-8 left-8 text-2xl opacity-90" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute bottom-16 left-2 text-3xl opacity-100 z-10" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🌴</div><div className="absolute bottom-14 right-4 text-4xl opacity-100 z-10" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🌴</div></>)}
                        {index === 2 && (<><div className="absolute top-3 left-3 text-2xl opacity-95" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute top-2 right-4 text-3xl opacity-100" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute bottom-12 left-6 text-4xl opacity-100 z-10" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🌴</div><div className="absolute bottom-10 right-8 text-2xl opacity-95 z-10" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🌴</div><div className="absolute bottom-6 left-1/3 text-3xl opacity-100 z-10" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🌴</div></>)}
                        {index === 3 && (<><div className="absolute top-0 left-3 text-4xl opacity-100" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute top-3 right-3 text-3xl opacity-95" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute top-6 right-6 text-2xl opacity-90" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute bottom-14 left-4 text-3xl opacity-100 z-10" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🌴</div><div className="absolute bottom-12 right-2 text-4xl opacity-100 z-10 transform -scale-x-100" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🌴</div></>)}
                        {index === 4 && (<><div className="absolute top-2 left-3 text-3xl opacity-100" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute top-1 right-2 text-4xl opacity-95" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute top-5 left-8 text-2xl opacity-100" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>🌴</div><div className="absolute bottom-12 left-5 text-4xl opacity-100 z-10" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🌴</div><div className="absolute bottom-8 right-5 text-3xl opacity-100 z-10" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>🌴</div></>)}
                      </div>

                      <div className="absolute bottom-18 md:bottom-22 left-1/2 -translate-x-1/2 w-3 h-20 md:h-24 rounded-sm" style={{ background: 'linear-gradient(to right, #5C4033 0%, #6B4423 50%, #5C4033 100%)', boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.4), inset 2px 0 2px rgba(139,111,71,0.3), 3px 3px 6px rgba(0,0,0,0.3)' }} />

                      <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex items-end drop-shadow-md text-[#4A7c59]">
                        <svg width="64" height="24" viewBox="0 0 64 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 24 L10 6 L18 18 L28 2 L38 16 L48 4 L54 18 L60 10 L62 24 Z" fill="currentColor" opacity="0.6" /><path d="M10 24 L16 14 L24 20 L34 8 L42 18 L50 12 L56 24 Z" fill="currentColor" /></svg>
                      </div>

                      <div
                        className="absolute bottom-28 md:bottom-36 left-1/2 -translate-x-1/2 px-4 py-2.5 text-center min-w-[130px] md:min-w-[140px] flex flex-col items-center"
                        style={{ background: 'linear-gradient(135deg, #A0522D 0%, #8B4513 25%, #654321 50%, #5C4033 75%, #4A3728 100%)', borderRadius: '8px', border: '3px solid #3E2723', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5), inset 0 2px 0 rgba(160,82,45,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)' }}
                      >
                        <div className="absolute inset-0 opacity-15 pointer-events-none rounded-md" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 3px)`, borderRadius: '8px' }} />
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-gradient-to-b from-[#8B7355] to-transparent rounded-full" />
                        
                        <p className="text-[#f4ebe0] font-bold relative z-10 text-sm sm:text-base font-[Balsamiq_Sans]" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Expedition {unit.id}</p>
                        <p className="text-[#f4ebe0] font-[Nunito] font-bold text-[10px] md:text-xs mt-0.5 mb-1 relative z-10 leading-tight" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{unit.title}</p>
                        
                        {/* ========================================================= */}
                        {/* UI 3 BINTANG KKTP (JIKA SUDAH TERBUKA)                    */}
                        {/* ========================================================= */}
                        {!isLocked && (
                          <div className="flex justify-center gap-1 mt-0.5 relative z-10">
                            {[1, 2, 3].map(starIndex => (
                              <Star 
                                key={starIndex} 
                                className={`h-3.5 w-3.5 md:h-4 md:w-4 ${starIndex <= islandStars ? 'fill-yellow-400 text-yellow-300' : 'fill-black/40 text-black/20'}`} 
                                style={{ filter: starIndex <= islandStars ? 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.8))' : 'none' }} 
                              />
                            ))}
                          </div>
                        )}

                        {/* ========================================================= */}
                        {/* UI HARGA GEMBOK ATLAS COIN (JIKA TERKUNCI)                */}
                        {/* ========================================================= */}
                        {isLocked && (
                          <div className="mt-1.5 relative z-10 bg-black/60 backdrop-blur-sm rounded-md py-1 px-2.5 flex items-center justify-center gap-1.5 border border-amber-500/40 shadow-lg">
                            <Lock className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs md:text-sm font-[Coiny] text-yellow-400 tracking-wider leading-none pt-0.5">{requiredCoins}</span>
                            <CoinIcon className="w-4 h-4 drop-shadow-sm" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div key={`island-${selectedIsland}`} initial={{ opacity: 0, scale: 0.8, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 30 }} transition={{ type: "spring", stiffness: 250, damping: 25 }} style={{ willChange: 'opacity, transform' }} className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
              {(() => {
                const unit = units.find(u => u.id === selectedIsland);
                if (!unit) return null;
                const index = units.findIndex(u => u.id === selectedIsland);
                const islandShapes = ['55% 45% 65% 35% / 45% 55% 45% 55%', '45% 55% 50% 50% / 60% 40% 60% 40%', '60% 40% 55% 45% / 50% 50% 50% 50%', '50% 50% 45% 55% / 45% 60% 40% 55%', '48% 52% 58% 42% / 52% 48% 58% 42%'];
                
                const isCompleted = completedUnits.has(unit.id);
                const isPasswordUnlocked = passwordUnlockedUnits.has(unit.id);
                const requiredCoins = index * 180;
                const isLocked = totalCoins < requiredCoins && !isPasswordUnlocked;
                const islandStars = getUnitStars(unitScores[unit.id]);

                return (
                  <div className="relative w-full max-w-4xl mt-16 md:mt-12">
                    <Button onClick={() => { soundEffects.buttonNavigation?.(); setSelectedIsland(null); }} className="absolute -top-14 left-0 rounded-xl px-4 py-2 font-[Coiny] text-base sm:text-lg shadow-lg border-2 z-50 hover:scale-105 transition-transform" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(74, 144, 164, 0.6)', color: '#2E5266' }}>
                      <ArrowLeft className="h-6 w-5 sm:h-8 mr-1 inline" /> Back to Map
                    </Button>

                    <div className="p-5 sm:p-8 md:p-12 relative" style={{ background: 'radial-gradient(ellipse at 50% 80%, #f4d03f 0%, #e8c87c 30%, #d4a574 60%, #c49b6b 100%)', borderRadius: islandShapes[index], boxShadow: '0 20px 40px rgba(101, 67, 33, 0.3)' }}>
                      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(rgba(139, 69, 19, 0.15) 2px, transparent 2px)`, backgroundSize: '16px 16px', borderRadius: islandShapes[index] }} />

                      <div className={`relative ${isLocked ? 'opacity-70' : ''}`} style={{ background: 'linear-gradient(135deg, rgb(139, 69, 19) 0%, #654321 50%, #5C4033 100%)', borderRadius: '12px', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)', border: '4px solid #3E2723' }}>
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`, borderRadius: '12px' }} />
                        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-[#2a1711] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />
                        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-[#2a1711] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />
                        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-[#2a1711] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />
                        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-[#2a1711] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" />

                        <div className="bg-[#faf6f1] rounded-lg shadow-xl overflow-hidden border border-amber-900/20 relative m-3">
                            <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />

                            <div className="bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 p-5 sm:p-6 lg:p-8 text-[#f4ebe0] relative overflow-hidden">
                              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)` }} />
                              <div className="flex justify-between items-start mb-2 relative z-10">
                                <div className="flex items-center gap-3">
                                  <span className="opacity-90 font-bold font-[Coiny] text-[#e8c87c] text-xl sm:text-[24px] lg:text-3xl">Expedition {unit.id}</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                {/* HANYA ADA BINTANG KARENA PULAU INI PASTI SUDAH TERBUKA */}
                                <div className="flex gap-1 bg-black/20 px-3 py-1.5 rounded-full border border-amber-500/30">
                                  {[1, 2, 3].map(starIndex => (
                                    <Star 
                                      key={starIndex} 
                                      className={`h-4 w-4 lg:h-5 lg:w-5 ${starIndex <= islandStars ? 'fill-yellow-400 text-yellow-400' : 'fill-black/40 text-black/20'}`} 
                                      style={{ filter: starIndex <= islandStars ? 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.8))' : 'none' }}
                                    />
                                  ))}
                                </div>
                              </div>
                              </div>
                              <h3 className="mb-1 sm:mb-2 text-2xl sm:text-[26px] lg:text-[36px] font-[Coiny] font-bold tracking-wide mt-2 lg:mt-4 leading-tight">{unit.title}</h3>
                              <p className="text-sm sm:text-base lg:text-lg text-[#f4ebe0]/90 font-[Nunito] italic font-medium">{unit.theme}</p>
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
                            </div>

                            <div className="p-5 sm:p-6 lg:p-10 relative">
                              <p className="text-amber-950 mb-5 lg:mb-8 font-[Nunito] leading-relaxed lg:leading-loose font-bold text-base sm:text-[17px] lg:text-xl">{unit.description}</p>
                              
                              <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-10">
                                <span className="text-xs sm:text-sm lg:text-base bg-amber-100 text-amber-900 px-2.5 sm:px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-amber-300/50 font-[Coiny] font-medium flex items-center gap-1 lg:gap-2">📜 Story</span>
                                <span className="text-xs sm:text-sm lg:text-base bg-amber-100 text-amber-900 px-2.5 sm:px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-amber-300/50 font-[Coiny] font-medium flex items-center gap-1 lg:gap-2">📖 Vocabulary</span>
                                <span className="text-xs sm:text-sm lg:text-base bg-amber-100 text-amber-900 px-2.5 sm:px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-amber-300/50 font-[Coiny] font-medium flex items-center gap-1 lg:gap-2">🎯 Quest</span>
                              </div>
                              
                              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-full flex justify-center mt-6 lg:mt-8">
                                <Button 
                                  onClick={() => handleUnitClick(unit.id, isCompleted)} 
                                  className="w-auto max-w-sm lg:max-w-md mx-auto bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:via-amber-900 hover:to-amber-950 text-[#f4ebe0] rounded-xl py-4 md:py-6 px-10 md:px-16 text-xs sm:text-sm md:text-base lg:text-xl font-[Coiny] tracking-wide shadow-lg border-2 border-amber-950/30 transition-transform active:scale-95"
                                >
                                  {isCompleted ? '📖 Review Expedition' : '🧭 Begin Expedition'}
                                </Button>
                              </motion.div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full lg:w-[750px] lg:mx-auto lg:self-center mt-12 mb-8 lg:mb-12 rounded-2xl shadow-2xl p-8 md:p-10 text-center border-2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.9) 50%, rgba(230, 245, 255, 0.95) 100%)', borderColor: 'rgba(74, 144, 164, 0.5)' }}>
          <div className="absolute top-0 left-0 right-0 h-2 opacity-50" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(74, 144, 164, 0.6) 25%, rgba(91, 163, 184, 0.8) 50%, rgba(74, 144, 164, 0.6) 75%, transparent 100%)' }} />
          <div className="relative z-10">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 rounded-full blur-xl opacity-30" style={{ background: 'radial-gradient(circle, rgba(74, 144, 164, 0.8) 0%, transparent 70%)' }} />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative" style={{ willChange: "transform" }}>
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 8px rgba(46, 82, 102, 0.3))' }}>
                  <circle cx="50" cy="50" r="48" fill="none" stroke="#2E5266" strokeWidth="3"/><circle cx="50" cy="50" r="40" fill="none" stroke="#4A90A4" strokeWidth="2"/><circle cx="50" cy="50" r="32" fill="none" stroke="#5BA3B8" strokeWidth="1"/><path d="M50,10 L54,48 L50,50 L46,48 Z" fill="#2E5266"/><path d="M90,50 L52,54 L50,50 L52,46 Z" fill="#3A6B7A"/><path d="M50,90 L46,52 L50,50 L54,52 Z" fill="#2E5266"/><path d="M10,50 L48,46 L50,50 L48,54 Z" fill="#5BA3B8"/><path d="M75,25 L52,48 L50,50 L48,48 Z" fill="#4A90A4"/><path d="M75,75 L52,52 L50,50 L52,48 Z" fill="#4A90A4"/><path d="M25,75 L48,52 L50,50 L52,52 Z" fill="#3A6B7A"/><path d="M25,25 L48,48 L50,50 L48,52 Z" fill="#3A6B7A"/><circle cx="50" cy="50" r="6" fill="#2E5266"/><circle cx="50" cy="50" r="3" fill="#5BA3B8"/>
                </svg>
              </motion.div>
            </div>
            <h3 className="mb-3 font-black text-2xl md:text-3xl tracking-wide font-[Coiny]" style={{ background: 'linear-gradient(135deg, #2E5266 0%, #4A90A4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🌊 Journey Progress 🌊</h3>
            <div className="flex items-center justify-center gap-3 mb-6">
              <p className="font-[Nunito] font-bold text-lg md:text-xl px-4 py-2 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(74, 144, 164, 0.15) 0%, rgba(91, 163, 184, 0.1) 100%)', color: '#2E5266' }}>{completedUnits.size} of {units.length} islands discovered</p>
            </div>
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <div className="h-8 md:h-10 rounded-full overflow-hidden border-3 shadow-inner relative" style={{ backgroundColor: 'rgba(135, 206, 235, 0.2)', borderColor: 'rgba(74, 144, 164, 0.5)' }}>
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: completedUnits.size / units.length }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full relative overflow-hidden origin-left" style={{ width: '100%', background: 'linear-gradient(90deg, #5BA3B8 0%, #4A90A4 25%, #3A7F94 50%, #2E7D8F 75%, #2E5266 100%)', willChange: 'transform' }} />
                </div>
                {completedUnits.size > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }} className="absolute top-1/2 -translate-y-1/2 text-xl md:text-2xl" style={{ left: `calc(${(completedUnits.size / units.length) * 100}% - 16px)` }}>⛵</motion.div>
                )}
              </div>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-xl">🗺️</span>
                <p className="font-[Coiny] font-medium text-base md:text-lg px-4 py-1 rounded-full" style={{ background: 'linear-gradient(135deg, #2E5266 0%, #4A90A4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{Math.round((completedUnits.size / units.length) * 100)}% of the Ocean Explored</p>
                <span className="text-xl">🧭</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="w-full text-center mt-6 mb-8 text-amber-900/50 text-xs sm:text-sm font-[Nunito] font-bold tracking-widest uppercase flex flex-col items-center gap-1">
          <p>© {new Date().getFullYear()} OLONS Education</p>
          <p className="text-[10px] sm:text-xs tracking-wider">FIELA v1.0.0 - Fun & Interactive English Learning Atlas</p>
        </motion.div>
      </div>

      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="max-w-md bg-[#faf6f1] border-2 border-amber-900/40 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-amber-900 flex items-center gap-2 font-[Coiny] text-2xl"><Lock className="h-6 w-6 text-amber-700" /> Unlock Expedition</DialogTitle>
            <DialogDescription className="font-[Nunito] font-medium mt-3" asChild>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-amber-100 p-4 rounded-xl border-2 border-amber-300 shadow-sm">
                  <CoinIcon className="w-10 h-10 shrink-0 drop-shadow-md" />
                  <span className="text-amber-900 text-base sm:text-lg font-bold leading-snug">
                    This expedition requires <strong className="font-[Coiny] text-xl sm:text-2xl text-amber-700 tracking-wide mx-1">{selectedLockedUnit ? (selectedLockedUnit - 1) * 180 : 0}</strong> Atlas Coins to unlock!
                  </span>
                </div>
                <span className="text-center text-amber-800/80 text-sm font-bold uppercase tracking-widest">Or use a secret code</span>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 mt-2">
            <div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()} placeholder="Enter secret code" className="w-full px-4 py-3 pr-12 border-2 border-amber-700/30 rounded-xl focus:outline-none focus:border-amber-700 bg-white text-amber-950 font-[Nunito] tracking-wider text-lg shadow-inner" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-900 transition-colors">{showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}</button>
              </div>
              {passwordError && <p className="text-red-600 text-sm mt-2 font-[Nunito] font-bold">{passwordError}</p>}
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setPasswordDialogOpen(false)} variant="outline" className="flex-1 font-[Coiny] text-lg py-6 border-amber-700/40 text-amber-900 hover:bg-amber-100 rounded-xl">Cancel</Button>
              <Button onClick={handlePasswordSubmit} className="flex-1 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-[#f4ebe0] font-[Coiny] text-lg py-6 rounded-xl shadow-md">Unlock</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-md bg-[#faf6f1] border-2 border-amber-900/40 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-amber-900 flex items-center gap-2 font-[Fredoka] text-2xl font-bold"><Star className="h-6 w-6 fill-amber-600 text-amber-600" /> Revisit Expedition {selectedReviewUnit}</DialogTitle>
            <DialogDescription className="font-[Nunito] font-medium text-amber-800/80 text-base mt-1">Choose your path to review this expedition</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Button onClick={() => handleReviewOption('intro')} className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-[#f4ebe0] rounded-xl py-6 flex items-center justify-start gap-4 border-2 border-amber-950/20 shadow-sm transition-transform active:scale-95"><RotateCcw className="h-6 w-6" /><div className="text-left"><div className="font-semibold font-[Coiny] text-lg">Begin Anew</div><div className="text-sm text-[#f4ebe0]/90 font-[Nunito] font-medium">Embark on the expedition from the start</div></div></Button>
            <Button onClick={() => handleReviewOption('review')} className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-[#f4ebe0] rounded-xl py-6 flex items-center justify-start gap-4 border-2 border-blue-950/20 shadow-sm transition-transform active:scale-95"><GraduationCap className="h-6 w-6" /><div className="text-left"><div className="font-semibold font-[Coiny] text-lg">Study the Lexicon</div><div className="text-sm text-[#f4ebe0]/90 font-[Nunito] font-medium">Review discovered vocabulary</div></div></Button>
            <Button onClick={() => handleReviewOption('game')} className="w-full bg-gradient-to-r from-green-700 to-emerald-900 hover:from-green-800 hover:to-emerald-950 text-[#f4ebe0] rounded-xl py-6 flex items-center justify-start gap-4 border-2 border-emerald-950/20 shadow-sm transition-transform active:scale-95"><Gamepad2 className="h-6 w-6" /><div className="text-left"><div className="font-semibold font-[Coiny] text-lg">Test Your Knowledge</div><div className="text-sm text-[#f4ebe0]/90 font-[Nunito] font-medium">Challenge yourself once more</div></div></Button>
            <Button onClick={() => handleReviewOption('reward')} className="w-full bg-gradient-to-r from-yellow-700 to-orange-800 hover:from-yellow-800 hover:to-orange-900 text-[#f4ebe0] rounded-xl py-6 flex items-center justify-start gap-4 border-2 border-orange-950/20 shadow-sm transition-transform active:scale-95"><Trophy className="h-6 w-6" /><div className="text-left"><div className="font-semibold font-[Coiny] text-lg">View Treasures</div><div className="text-sm text-[#f4ebe0]/90 font-[Nunito] font-medium">Admire your achievements</div></div></Button>
            <Button onClick={() => setReviewDialogOpen(false)} variant="outline" className="w-full border-2 border-amber-700/40 hover:bg-amber-100 rounded-xl py-6 font-[Fredoka] text-lg text-amber-900 font-bold">Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={treasureVaultOpen} onOpenChange={setTreasureVaultOpen}>
        <DialogContent className="max-w-5xl bg-transparent border-none shadow-none p-0" aria-describedby="treasure-vault-description">
          <DialogHeader className="sr-only">
            <DialogTitle>Treasure Vault Collection</DialogTitle>
            <DialogDescription id="treasure-vault-description">View all your discovered and hidden treasures here.</DialogDescription>
          </DialogHeader>
          <BadgeCollection unitScores={unitScores} totalUnits={units.length} />
        </DialogContent>
      </Dialog>

      {onBackToWelcome && (
        <motion.div className="absolute top-4 left-4 z-50">
          <motion.button onClick={() => { soundEffects.buttonNavigation?.(); onBackToWelcome(); }} initial="normal" animate="normal" whileHover="diHover" whileTap="diKlik"
            variants={{
              normal: { backgroundColor: '#faf6f1', color: '#3796b4', borderColor: '#7fb8dc', borderRadius: '50%', scale: 1 },
              diHover: { scale: 1.15, backgroundColor: '#3796b4', color: '#FAF6F1', borderColor: '#2b758d', borderRadius: '12px', transition: { type: "spring", stiffness: 400, damping: 15 } },
              diKlik: { scale: 0.9 }
            }}
            className="rounded-full shadow-lg border-2 bg-[#faf6f1]/95 border-amber-700/30 text-#015A84 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-2 sm:p-3 w-11 h-11 sm:w-15 sm:h-15 hover:h-14 hover:w-15 sm:hover:w-19 sm:hover:h-18 transition-all duration-75"
          >
            <motion.span className="flex items-center justify-center" variants={{ normal: { y: 0, scale: 1 }, diHover: { y: -2, scale: 0.9 } }} transition={{ type: "spring", stiffness: 500, damping: 20 }}><ArrowLeft className="h-5 w-5 sm:h-7 sm:w-7" /></motion.span>
            <motion.span className="text-[8px] sm:text-[10px] font-bold tracking-wide uppercase pointer-events-none mt-0.5" variants={{ normal: { opacity: 0, y: 6, height: 0 }, diHover: { opacity: 1, y: 0, height: "auto", transition: { type: "tween", ease: "easeOut", duration: 0.1 } } }}>Welcome</motion.span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}