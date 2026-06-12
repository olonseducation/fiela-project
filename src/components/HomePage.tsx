import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button.tsx';
import { Star, Sparkles, ArrowLeft, Lock, Eye, EyeOff, RotateCcw, GraduationCap, Gamepad2, Trophy, Crown, X } from 'lucide-react';
import type { PageType, Unit } from '../types/index';
import { backgroundMusic } from '../utils/backgroundMusic';
import { soundEffects } from '../utils/soundEffects';
import { useEffect, useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog.tsx';
import { BadgeCollection } from './BadgeCollection.tsx';

// 🔮 IMPORT POSE ATLAS UNTUK HOMEPAGE
import atlasTersenyum from '../imports/atlas-tersenyum.webp';
import atlasBingung from '../imports/atlas-bingung.webp';
import atlasKegirangan from '../imports/atlas-kegirangan.webp';
import atlasKehilanganArah from '../imports/atlas-kehilangan-arah.webp';
import atlasMengajak from '../imports/atlas-mengajak.webp';
import atlasMengantuk from '../imports/atlas-mengantuk.webp';
import atlasNgobrol from '../imports/atlas-ngobrol.webp';
import atlasPenasaran from '../imports/atlas-penasaran.webp';
import atlasRaguRagu from '../imports/atlas-ragu-ragu.webp';
import atlasSemangat from '../imports/atlas-semangat.webp';
import atlasSerius from '../imports/atlas-serius.webp';
import atlasSetujuOk from '../imports/atlas-setuju-ok.webp';
import atlasSumringah from '../imports/atlas-sumringah.webp';
import atlasTangguh from '../imports/atlas-tangguh.webp';
import atlasTerbang from '../imports/atlas-terbang.webp';
import atlasTertawa from '../imports/atlas-tertawa.webp';

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
  isDrawerOpen?: boolean;
}

export function HomePage({ units, completedUnits, passwordUnlockedUnits, unitScores, onSelectUnit, onReviewUnit, onPasswordUnlock, onBackToWelcome, isDrawerOpen = false }: HomePageProps) {
  
  useEffect(() => {
    try { backgroundMusic.stop(); } catch (e) { console.warn("Gagal menghentikan musik sebelumnya:", e); }
    try { backgroundMusic.play(0); } catch (e) { console.warn("BGM Homepage tertahan oleh browser:", e); }
    return () => { try { backgroundMusic.stop(); } catch (e) {} };
  }, []);

  // 🔮 SIHIR PRELOAD: Memuat pose Atlas ke memori secara diam-diam
  useEffect(() => {
    // Daftar semua pose Atlas dengan tanda koma sebagai pemisah
    const atlasPoses = [
      atlasTersenyum,
      atlasBingung,
      atlasKegirangan,
      atlasKehilanganArah,
      atlasMengajak,
      atlasMengantuk,
      atlasNgobrol,
      atlasPenasaran,
      atlasRaguRagu,
      atlasSemangat,
      atlasSerius,
      atlasSetujuOk,
      atlasSumringah,
      atlasTangguh,
      atlasTerbang,
      atlasTertawa
    ];

    atlasPoses.forEach((poseSrc) => {
      if (poseSrc) {
        const img = new Image();
        img.src = poseSrc;
      }
    });
  }, []); // Array kosong berarti sihir ini hanya dijalankan satu kali saat awal aplikasi dibuka
  
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [selectedLockedUnit, setSelectedLockedUnit] = useState<number | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedReviewUnit, setSelectedReviewUnit] = useState<number | null>(null);
  const [selectedIsland, setSelectedIsland] = useState<number | null>(null);
  const [treasureVaultOpen, setTreasureVaultOpen] = useState(false);

  // 🔮 MENGAMBIL NAMA PELAUT DARI LOGBOOK
  const playerName = localStorage.getItem('fiela_player_name') || "Explorer";

  // 🔮 15 KUMPULAN DIALOG ACAK & POSE ATLAS YANG SESUAI
  const atlasDialogues = useMemo(() => [
    { 
      text: `The sea is calm today, Captain ${playerName}. Ready for an expedition?`, 
      pose: atlasTersenyum 
    },
    { 
      text: `Hmm... so many islands! Where should we drop our anchor first?`, 
      pose: atlasBingung 
    },
    { 
      text: `Hooray! A brand new day for a brand new adventure!`, 
      pose: atlasKegirangan 
    },
    { 
      text: `Wait a minute... did we sail in a circle? Let's check the map again!`, 
      pose: atlasKehilanganArah 
    },
    { 
      text: `Come on, Captain! The treasure vault isn't going to fill itself!`, 
      pose: atlasMengajak 
    },
    { 
      text: `*Yawn*... The sea breeze is making me sleepy. Let's do a quick quest to wake up!`, 
      pose: atlasMengantuk 
    },
    { 
      text: `Did you know every island has its own secret vocabulary waiting to be discovered?`, 
      pose: atlasNgobrol 
    },
    { 
      text: `I wonder what kind of shiny rewards are hiding in the next expedition...`, 
      pose: atlasPenasaran 
    },
    { 
      text: `Are you sure you want to go that way? Well, you are the Captain!`, 
      pose: atlasRaguRagu 
    },
    { 
      text: `Full sail ahead! Let's collect those shiny Atlas Coins!`, 
      pose: atlasSemangat
    },
    { 
      text: `Check your supplies and read the Explorer's Notes carefully before we depart.`, 
      pose: atlasSerius 
    },
    { 
      text: `Aye aye, Captain! Whatever path you choose, I'm right behind you!`, 
      pose: atlasSetujuOk 
    },
    { 
      text: `Looking at this beautiful ocean map always puts me in a great mood!`, 
      pose: atlasSumringah 
    },
    { 
      text: `Brace yourself! No vocabulary monster is strong enough to defeat us today!`, 
      pose: atlasTangguh 
    },
    { 
      text: `Look at me! I'm so excited I could fly! Let's go to the next island!`, 
      pose: atlasTerbang 
    },
    { 
      text: `Hahaha! Sailing with you is always full of joy and laughter, Captain ${playerName}! Let's conquer the next challenge!`, 
      pose: atlasTertawa 
    }
  ], [playerName]);

  // 🔮 SAKELAR VISIBILITAS ATLAS
  const [isAtlasVisible, setIsAtlasVisible] = useState(true);

  const [currentDialogue, setCurrentDialogue] = useState(atlasDialogues[0]);

  // 🔮 JAM PASIR AJAIB: Ganti kalimat & pose otomatis setiap 10 detik saat diam di beranda
  useEffect(() => {
    // Fungsi internal untuk mengocok dialog secara acak
    const kocokDialogAjaib = () => {
      const randomIndex = Math.floor(Math.random() * atlasDialogues.length);
      setCurrentDialogue(atlasDialogues[randomIndex]);
    };

    // 1. Pemicu Pertama: Jalankan sekali saat halaman baru dibuka
    kocokDialogAjaib();

    // 2. Pemicu Otomatis: Pasang timer 20 detik (20.000 milidetik)
    const timerAtlas = setInterval(() => {
      kocokDialogAjaib();
    }, 20000);

    // ⚠️ KUNCI UTAMA: Bersihkan timer saat pemain meninggalkan HomePage (unmount)
    // Ini sangat penting agar ruang mesin tidak bocor (memory leak) dan membuat aplikasi berat!
    return () => clearInterval(timerAtlas);
  }, [atlasDialogues]);

  // =====================================================================
  // SISTEM EKONOMI ATLAS COINS & BINTANG KKTP
  // =====================================================================
  
  const getUnitStars = (unitScore: any) => {
    if (!unitScore) return 0;
    const quiz = Math.round(unitScore.percentage || 0);
    const voice = Math.round(unitScore.pronunciationScore || 0);
    
    let stars = 0;
    if (quiz >= 70 && voice >= 60) stars = 1; 
    if (quiz >= 85 && voice >= 80) stars = 2; 
    if (quiz === 100 && voice >= 95) stars = 3; 
    return stars;
  };

  const getUnitCoins = (unitScore: any) => {
    if (!unitScore) return 0;
    const quiz = Math.round(unitScore.percentage || 0);
    const voice = Math.round(unitScore.pronunciationScore || 0);
    
    let coins = quiz + voice; 

    if (quiz > 0 || voice > 0) coins += 20; 

    if (quiz === 100) coins += 50;
    else if (quiz >= 85) coins += 25;
    else if (quiz >= 70) coins += 15;

    if (voice >= 95) coins += 50;
    else if (voice >= 80) coins += 25;
    else if (voice >= 60) coins += 15;

    return coins;
  };

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

  // 🔮 KALIBRASI GULIRAN BARU
  useEffect(() => {
    if (selectedIsland !== null) {
      // Gulir perlahan kembali ke puncak layar (top: 0) agar kotak pulau terlihat di tengah persis
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedIsland]);
  
  return (
    // 🔮 PERHATIKAN: Menambahkan pb-24 md:pb-0 agar di layar HP (Mobile) peta tidak tertutup oleh Atlas!
    <div className="min-h-screen relative overflow-x-hidden pb-28 md:pb-0" style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #4A90A4 40%, #2E5266 100%)' }}>
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.05) 20px, rgba(255, 255, 255, 0.05) 40px)` }} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/3 right-10 md:right-32 text-3xl opacity-15">🐳</div>
        <div className="absolute top-1/2 right-12 md:right-32 text-2xl opacity-15">🐟</div>
        <div className="absolute top-1/2 left-12 md:left-32 text-2xl opacity-15">🦑</div>
        <div className="absolute bottom-1/3 left-16 md:left-48 text-2xl opacity-15">🐡</div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-900/15" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 pt-12 sm:pt-16 md:pt-20">
        
        {/* 🔮 BAGIAN JUDUL BARU: LEBIH RINGKAS & ELEGAN */}
      {selectedIsland === null && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-4 md:mb-12">
          <div className="relative flex flex-col items-center text-center w-full px-4">
            <h1 className="leading-tight font-[Frijole] text-[30px] sm:text-[50px] md:text-[70px] lg:text-[80px] pt-6 sm:pt-4 md:pt-2 lg:pt-0" style={{ background: 'linear-gradient(90deg, #1a4d5e 0%, #3A7F94 50%, #064f68 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 6px 12px rgba(26, 77, 94, 0.4)', letterSpacing: '0.05em' }}>
              FIELA Map
            </h1>
            <div className="h-1 rounded-full w-40 md:w-64 mt-1" style={{ background: 'linear-gradient(90deg, transparent 0%, #4A90A4 50%, transparent 100%)' }} />
          </div>
        </motion.div>
      )}

        <AnimatePresence mode="wait">
          {selectedIsland === null ? (
            <motion.div key="map-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} style={{ willChange: 'opacity, transform' }} className="relative z-10 mb-10 max-w-6xl mx-auto px-4">
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
              {/* DOMPET ATLAS COINS                                   */}
              {/* ================================================== */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="relative z-20 flex justify-center mb-2"
              >
                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-200 to-yellow-400 px-3 py-1.5 md:px-6 md:py-2.5 rounded-full border-4 border-amber-600 shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
                  <div className="bg-amber-100 rounded-full p-1.5 border-2 border-amber-500 shadow-inner flex items-center justify-center">
                    <CoinIcon className="w-5 h-5 md:w-9 md:h-9 drop-shadow-md" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] md:text-xs font-bold text-amber-800 uppercase tracking-widest leading-none sm:mb-1.5 md:mb-2 text-shadow-md">Atlas Coins</span>
                    <span className="font-[Coiny] text-amber-950 font-bold text-xl md:text-3xl drop-shadow-sm leading-none">{totalCoins}</span>
                  </div>
                </div>
              </motion.div>

              <div className="relative mb-16 mt-2 md:mb-16 md:mt-6 lg:mb-16 lg:mt-8 z-10">
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
                
                const requiredCoins = index * 180; 
                const isLocked = totalCoins < requiredCoins && !isPasswordUnlocked;
                const islandStars = getUnitStars(unitScores[unit.id]); 

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
            // ==========================================
            // TAMPILAN DETAIL PULAU (Saat pulau diklik)
            // ==========================================
            <motion.div key={`island-${selectedIsland}`} initial={{ opacity: 0, scale: 0.8, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 30 }} transition={{ type: "spring", stiffness: 250, damping: 25 }} style={{ willChange: 'opacity, transform' }} className="relative z-10 min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8 md:py-12">
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
                  <div className="relative w-full max-w-4xl my-auto">
                    <Button onClick={() => { soundEffects.buttonNavigation?.(); setSelectedIsland(null); }} className="absolute -top-14 left-0 rounded-xl px-4 py-2 font-[Coiny] leading-none text-base sm:text-lg shadow-lg border-2 z-50 hover:scale-105 transition-transform" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: 'rgba(74, 144, 164, 0.6)', color: '#2E5266' }}>
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
                                  <span className="opacity-90 font-bold font-[Coiny] text-[#eaca0b] text-shadow-lg text-xl sm:text-[24px] lg:text-3xl">Expedition {unit.id}</span>
                                </div>
                                <div className="flex gap-2 items-center">
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
                              <h3 className="mb-1 sm:mb-2 text-2xl sm:text-[26px] lg:text-[36px] font-[Coiny] font-bold tracking-wide mt-2 lg:mt-4 leading-tight text-shadow-md">{unit.title}</h3>
                              <p className="text-sm sm:text-base lg:text-lg text-[#f4ebe0]/90 font-[Nunito] italic font-medium">{unit.theme}</p>
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" />
                            </div>

                            <div className="p-5 sm:p-6 lg:p-10 relative">
                              <p className="text-amber-950 mb-5 lg:mb-8 font-[Nunito] leading-relaxed lg:leading-loose font-bold text-base sm:text-[17px] lg:text-xl">{unit.description}</p>
                              
                              <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-10">
                                <span className="text-xs sm:text-sm lg:text-base bg-[#0a6f99] text-amber-100 px-2.5 sm:px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-amber-200/90 font-[Coiny] leading-none font-medium flex items-center gap-1 lg:gap-2 text-shadow-md">📜 Story</span>
                                <span className="text-xs sm:text-sm lg:text-base bg-[#0a6f99] text-amber-100 px-2.5 sm:px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-amber-200/90 font-[Coiny] leading-none font-medium flex items-center gap-1 lg:gap-2 text-shadow-md">📖 Vocabulary</span>
                                <span className="text-xs sm:text-sm lg:text-base bg-[#0a6f99] text-amber-100 px-2.5 sm:px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg border border-amber-200/90 font-[Coiny] leading-none font-medium flex items-center gap-1 lg:gap-2 text-shadow-md">🎯 Quest</span>
                              </div>
                              
                              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-full flex justify-center mt-6 lg:mt-8">
                                <Button 
                                  onClick={() => handleUnitClick(unit.id, isCompleted)} 
                                  className="w-auto max-w-sm lg:max-w-md mx-auto bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:via-amber-900 hover:to-amber-950 text-[#f4ebe0] rounded-xl py-4 md:py-6 px-6 sm:px-8 md:px-16 text-md sm:text-md md:text-lg lg:text-2xl font-[Coiny] leading-none tracking-wide shadow-lg border-2 border-amber-950/30 transition-transform active:scale-95"
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

        {/* 🔮 PROGRESS BAR BAWAH */}
        {selectedIsland === null && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full lg:w-[750px] lg:mx-auto lg:self-center mt-12 mb-8 lg:mb-12 rounded-2xl shadow-2xl p-8 md:p-10 text-center border-2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.9) 50%, rgba(230, 245, 255, 0.95) 100%)', borderColor: 'rgba(74, 144, 164, 0.5)' }}>
            <div className="absolute top-0 left-0 right-0 h-2 opacity-50" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(74, 144, 164, 0.6) 25%, rgba(91, 163, 184, 0.8) 50%, rgba(74, 144, 164, 0.6) 75%, transparent 100%)' }} />
            <div className="relative z-10">
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
        )}
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="w-full text-center mt-6 mb-8 text-amber-900/50 text-xs sm:text-sm font-[Nunito] font-bold tracking-widest uppercase flex flex-col items-center gap-1">
          <p>© {new Date().getFullYear()} OLONS Education</p>
          <p className="text-[10px] sm:text-xs tracking-wider">FIELA v1.0.0 - Fun & Interactive English Learning Atlas</p>
        </motion.div>
      </div>

      {/* ======================================================================= */}
      {/* 🔮 ATLAS LIVE GUIDE BAR (DESKTOP POJOK KANAN BAWAH, MOBILE FIXED BAWAH) */}
      {/* ======================================================================= */}
      <AnimatePresence>
        {selectedIsland === null && !treasureVaultOpen && !passwordDialogOpen && !reviewDialogOpen && !isDrawerOpen && (
          <>
            {/* ========================================== */}
            {/* 1. JIKA ATLAS DITAMPILKAN (KOTAK & KARAKTER) */}
            {/* ========================================== */}
            {isAtlasVisible && (
              <motion.div 
                initial={{ y: 150, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 150, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
                // 🔮 UBAH 1: Hapus `w-full` dan `justify-center`. Jadikan murni rata kanan di semua layar.
                className="fixed bottom-0 right-0 md:right-8 md:bottom-8 z-[100] flex items-end justify-end pointer-events-none"
              >
                {/* 🔮 UBAH 2: Hapus `w-full` di sini, dan tambahkan `pr-4 md:pr-0` agar di HP ada jarak aman dari tepi layar */}
                <div className="relative flex items-end justify-end gap-2 md:gap-4 pr-4 md:pr-0 pb-0 pt-8 md:p-0 pointer-events-auto w-auto">
                  
                  {/* KOTAK DIALOG (TAMPILAN RPG BERSIH & KOMPAK DI MOBILE) */}
                  <motion.div 
                    animate={{ y: [0, -5, 0] }} 
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    // 🔮 UBAH 3: Karena pondasi sudah murni di kanan, `translate-x-16` kita normalkan jadi `translate-x-4`. (Kalibrasi Y Kapten utuh!)
                    className="bg-[#fffcf2] rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border-2 md:border-4 border-amber-400 shadow-[0_10px_25px_rgba(0,0,0,0.4)] relative w-fit max-w-[200px] sm:max-w-[300px] translate-x-4 md:translate-x-4 translate-y-3 md:translate-y-14 mb-4 md:mb-10"
                  >
                    {/* 🔮 TOMBOL CLOSE (X) - MASUK KE DALAM KOTAK (SELALU TERLIHAT) */}
                    <button 
                      onClick={() => {
                        soundEffects.buttonNavigation?.(); // 🔊 Bunyikan lonceng kapal!
                        setIsAtlasVisible(false);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 hover:scale-110 transition-transform z-30"
                      aria-label="Hide Atlas"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>

                    {/* 🔮 EFEK NOISE HALUS DI KOTAK DIALOG */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 rounded-xl sm:rounded-2xl" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='40' height='40' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />

                    {/* Ekor Dialog Mobile (Kanan Bawah, Mengarah ke Atlas) */}
                    <div className="md:hidden absolute -right-1.5 bottom-4 w-3 h-3 bg-[#fffcf2] rotate-45 border-t-2 border-r-2 border-amber-400" />
                    
                    {/* Ekor Dialog Desktop (Kanan Bawah, Mengarah ke Atlas) */}
                    <div className="hidden md:block absolute -right-3 bottom-6 w-5 h-5 bg-[#fffcf2] rotate-45 border-t-4 border-r-4 border-amber-400" />
                    
                    <div className="relative z-10 pr-6">
                        <h3 className="font-[Coiny] text-amber-600 text-[9px] sm:text-xs uppercase tracking-widest border-b border-amber-100 pb-0.5 sm:pb-1 mb-1 sm:mb-1.5 inline-block">
                        Captain Atlas
                        </h3>
                        <p className="font-[Nunito] font-bold text-[11px] sm:text-base text-amber-950 leading-snug">
                        {currentDialogue.text}
                        </p>
                    </div>
                  </motion.div>

                  {/* KARAKTER ATLAS (Mengintip dari bawah di Mobile) */}
                  {/* 🔮 UBAH 4: Sama seperti kotak, translate-x kita normalkan jadi `translate-x-2` di HP. */}
                  <div className="w-24 sm:w-28 md:w-30 shrink-0 relative flex items-end justify-center translate-y-5 md:translate-y-8.5 translate-x-2 md:translate-x-4">
                    <img 
                      src={currentDialogue.pose} 
                      alt="Captain Atlas" 
                      className="w-full h-auto drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] object-contain"
                    />
                  </div>

                </div>
              </motion.div>
            )}

            {/* 🔮 JIKA ATLAS DISEMBUNYIKAN (TOMBOL AVATAR PANGGIL KEMBALI) */}
            {!isAtlasVisible && (
              <motion.button
                // 🔮 Tambahkan sedikit rotasi agar munculnya lebih dinamis (gaya game)
                initial={{ scale: 0, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  soundEffects.buttonNavigation?.(); 
                  setIsAtlasVisible(true);
                }}
                // 🔮 Ubah kelas menjadi lingkaran sempurna (w-14 h-14 / sm:w-16 sm:h-16) dengan border tebal
                className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] bg-[#fffcf2] border-4 border-amber-400 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.4)] pointer-events-auto overflow-hidden w-14 h-14 sm:w-16 sm:h-16 flex items-end justify-center hover:border-amber-500 hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-all"
                title="Call Captain Atlas"
              >
                {/* 🔮 Gambar Atlas mengintip dari dalam lencana */}
                <img 
                  // Kapten bisa mengganti atlasTersenyum dengan atlasNgobrol atau pose lain yang cocok untuk ikon!
                  src={atlasTersenyum} 
                  alt="Call Captain Atlas" 
                  // object-bottom dan translate-y-1 agar posisinya pas menapak di dasar lingkaran
                  className="w-[95%] h-[95%] object-contain object-bottom translate-y-1"
                />
              </motion.button>
            )}
          </>
        )}
      </AnimatePresence>

      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        {/* 🔮 UBAH DI SINI: Tambahkan -mt-40 (dorong ke atas di HP) dan sm:mt-0 (kembali ke tengah di Desktop) */}
        <DialogContent className="max-w-md bg-[#faf6f1] border-2 border-amber-900/40 rounded-2xl -mt-40 sm:mt-0">
          <DialogHeader>
            <DialogTitle className="text-amber-900 flex items-center gap-2 font-[Coiny] text-2xl">
              <Lock className="h-6 w-6 text-amber-700" /> Unlock Expedition
            </DialogTitle>
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
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={passwordInput} 
                  onChange={(e) => setPasswordInput(e.target.value)} 
                  onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()} 
                  placeholder="Enter secret code" 
                  className="w-full px-4 py-3 pr-12 border-2 border-amber-700/30 rounded-xl focus:outline-none focus:border-amber-700 bg-white text-amber-950 font-[Nunito] tracking-wider text-lg shadow-inner" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-900 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                </button>
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
            <DialogTitle className="text-amber-900 flex items-center gap-2 font-[Fredoka] text-2xl md:text-3xl font-bold"><Star className="h-6 w-6 fill-amber-600 text-amber-600" /> Revisit Expedition {selectedReviewUnit}</DialogTitle>
            <DialogDescription className="font-[fredoka_one] font-bold text-left text-amber-800/90 sm:text-base md:text-md mt-1">Choose your path to review this expedition</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <Button onClick={() => handleReviewOption('intro')} className="w-full bg-gradient-to-r from-green-700 to-emerald-900 hover:from-green-800 hover:to-emerald-950 text-[#f4ebe0] rounded-xl py-6 flex items-center justify-start gap-4 border-2 border-emerald-950/20 shadow-sm transition-transform active:scale-95"><RotateCcw className="h-6 w-6" /><div className="text-left"><div className="font-bold font-[Fredoka] leading-none text-lg text-shadow-md">Begin Anew</div><div className="text-sm text-[#f4ebe0]/90 font-[Nunito] font-medium">Embark on the expedition from the start</div></div></Button>
            <Button onClick={() => handleReviewOption('review')} className="w-full bg-gradient-to-r from-sky-600 to-sky-900 hover:from-sky-700 hover:to-sky-950 text-[#f4ebe0] rounded-xl py-6 flex items-center justify-start gap-4 border-2 border-sky-950/20 shadow-sm transition-transform active:scale-95"><GraduationCap className="h-6 w-6" /><div className="text-left"><div className="font-bold font-[Fredoka] leading-none text-lg text-shadow-md">Study the Lexicon</div><div className="text-sm text-[#f4ebe0]/90 font-[Nunito] font-medium">Review discovered vocabulary</div></div></Button>
            <Button onClick={() => handleReviewOption('game')} className="w-full bg-gradient-to-r from-orange-600 to-orange-900 hover:from-orange-700 hover:to-orange-950 text-[#f4ebe0] rounded-xl py-6 flex items-center justify-start gap-4 border-2 border-orange-950/20 shadow-sm transition-transform active:scale-95"><Gamepad2 className="h-6 w-6" /><div className="text-left"><div className="font-bold font-[Fredoka] leading-none text-lg text-shadow-md">Test Your Knowledge</div><div className="text-sm text-[#f4ebe0]/90 font-[Nunito] font-medium">Challenge yourself once more</div></div></Button>
            <Button onClick={() => handleReviewOption('reward')} className="w-full bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 text-[#f4ebe0] rounded-xl py-6 flex items-center justify-start gap-4 border-2 border-purple-950/20 shadow-sm transition-transform active:scale-95"><Trophy className="h-6 w-6" /><div className="text-left"><div className="font-bold font-[Fredoka] leading-none text-lg text-shadow-md">View Treasures</div><div className="text-sm text-[#f4ebe0]/90 font-[Nunito] font-medium">Admire your achievements</div></div></Button>
            <Button onClick={() => setReviewDialogOpen(false)} variant="outline" className="w-auto max-w-sm lg:max-w-md mx-auto border-2 border-amber-700/40 bg-amber-100 hover:bg-amber-200 rounded-xl py-6 px-8 md:px-16 flex items-center font-[Fredoka_One] text-lg text-amber-900 font-bold tracking-wide">Cancel</Button>
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

      {onBackToWelcome && selectedIsland === null && (
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