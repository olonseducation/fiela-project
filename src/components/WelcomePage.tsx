import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { customAudioManager } from '../utils/customAudio';
import { welcomePageAudio } from '../utils/audioConfigHelper'; 
import welcomeBgmPath from '../imports/welcomepage-background-music.mp3';

// 🔮 IMPORT 5 POSE ATLAS
import atlasMenyapa from '../imports/atlas-menyapa.webp';
import atlasMenjelaskan from '../imports/atlas-menjelaskan.webp';
import atlasSemangat from '../imports/atlas-memberi-semangat.webp';
import atlasBerpikir from '../imports/atlas-berpikir.webp';
import atlasTersenyum from '../imports/atlas-tersenyum.webp';

interface WelcomePageProps {
  onStart: () => void;
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [playerName, setPlayerName] = useState('');
  
  const [atlasPose, setAtlasPose] = useState(atlasTersenyum);
  const [dialogueText, setDialogueText] = useState("Ahoy there! I am Captain Atlas. Click the button below to start our adventure!");

  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const sequenceTimers = useRef<number[]>([]); 

  useEffect(() => {
    bgmRef.current = new Audio(welcomeBgmPath); 
    if (bgmRef.current) {
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.3; 
    }

    const unlockAudio = () => {
      if (bgmRef.current && bgmRef.current.paused) {
        bgmRef.current.play().then(() => {
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('touchstart', unlockAudio);
          document.removeEventListener('keydown', unlockAudio);
        }).catch((err) => {
          console.warn("Kraken Autoplay masih menahan musik:", err);
        });
      }
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
    document.addEventListener('keydown', unlockAudio);

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      
      sequenceTimers.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem('fiela_player_name');
    if (savedName) {
      setPlayerName(savedName);
      setDialogueText(`Welcome back to the ship, Captain ${savedName}! Ready to sail?`);
    }

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 1500);

    return () => {
      clearTimeout(buttonTimer);
      customAudioManager.stop();
    };
  }, []);

  const executeStartTransition = () => {
    setIsTransitioning(true);
    soundEffects.buttonPlay();

    const burstParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50
    }));
    setParticles(burstParticles);

    setTimeout(() => {
      onStart();
    }, 150);
  };

  // 🔮 KALIBRASI WAKTU AUDIO TERBARU
  const handleStartClick = () => {
    if (isAudioPlaying) return;
    
    soundEffects.buttonPlay();
    setIsAudioPlaying(true);
    const savedName = localStorage.getItem('fiela_player_name');

    if (savedName) {
      // ⏱️ AUDIO: PEMAIN LAMA (6 DETIK)
      const greetingWithNameAudio = welcomePageAudio.greetingWithNamePath || '/sounds/atlas-with-player-name.mp3';
      customAudioManager.playAudio(greetingWithNameAudio).catch(() => {});
      
      // Detik 0 - 3.4
      setAtlasPose(atlasMenyapa);
      setDialogueText(`Ahoy! Welcome back, Captain ${savedName}!`);

      // Detik 3.4 - 6
      sequenceTimers.current.push(setTimeout(() => {
        setAtlasPose(atlasSemangat);
        setDialogueText("Let's continue our expedition!");
      }, 3400) as unknown as number);

      // Selesai di 6 Detik
      sequenceTimers.current.push(setTimeout(() => {
        setIsAudioPlaying(false);
        executeStartTransition();
      }, 6000) as unknown as number);

    } else {
      // ⏱️ AUDIO: PEMAIN BARU (10 DETIK)
      const greetingAudio = welcomePageAudio.greetingPath || '/sounds/atlas-greeting.mp3';
      customAudioManager.playAudio(greetingAudio).catch(() => {});

      // Detik 0 - 2.8
      setAtlasPose(atlasMenyapa);
      setDialogueText("Hello! I am Captain Atlas.");

      // Detik 2.8 - 4.8
      sequenceTimers.current.push(setTimeout(() => {
        setAtlasPose(atlasMenjelaskan);
        setDialogueText("Welcome to FIELA!");
      }, 2800) as unknown as number);

      // Detik 4.8 - 10
      sequenceTimers.current.push(setTimeout(() => {
        setAtlasPose(atlasBerpikir);
        setDialogueText("Are you ready to explore the world of English with me? Tell me, what is your name?");
      }, 4800) as unknown as number);

      // Selesai di 10 Detik
      sequenceTimers.current.push(setTimeout(() => {
        setIsAudioPlaying(false);
        setAtlasPose(atlasTersenyum); 
        setShowNameDialog(true);
      }, 10000) as unknown as number);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return; 

    localStorage.setItem('fiela_player_name', playerName.trim());
    setShowNameDialog(false);

    // ⏱️ AUDIO: KEBERANGKATAN (3 DETIK)
    setAtlasPose(atlasSemangat);
    setDialogueText(`Okay, Captain! Let's go!`);

    const letsGoAudio = welcomePageAudio.letsGoPath || '/sounds/atlas-lets-go.mp3';
    customAudioManager.playAudio(letsGoAudio).catch(() => {});
    
    setTimeout(() => {
      executeStartTransition();
    }, 3000); 
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#d4b896] via-[#c9a97a] to-[#a18260] flex flex-col items-center justify-center p-4 sm:p-6 lg:py-8 overflow-hidden relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-amber-950" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-amber-950" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-amber-950" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-amber-950" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-950" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-amber-950" />
      </div>

      {!isTransitioning && (
        <>
          <motion.div className="absolute top-40 right-6 md:top-28 md:right-16 lg:top-24 lg:right-24 w-24 h-24 lg:w-32 lg:h-32 opacity-20 pointer-events-none" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 80, ease: "linear" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-950 fill-transparent" strokeWidth="1.5">
              <circle cx="50" cy="50" r="45" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="35" />
              <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" className="fill-amber-950/20" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <motion.div className="absolute bottom-40 right-4 md:bottom-32 md:right-16 lg:bottom-28 lg:right-32 w-28 h-28 lg:w-40 lg:h-40 opacity-20 pointer-events-none" animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-950 fill-transparent" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
              <path d="M15 75 L85 75 L75 90 L25 90 Z" className="fill-amber-950/20" />
              <path d="M45 75 L45 20 L75 60 L45 65" className="fill-amber-950/10" />
              <path d="M40 75 L40 30 L15 65 L40 65" className="fill-amber-950/10" />
              <path d="M45 20 L55 25 L45 30 Z" className="fill-amber-950/30" />
              <path d="M5 80 Q 20 70 35 85 T 65 80 T 95 85" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
          </motion.div>
          <motion.div className="absolute top-48 left-2 md:top-36 md:left-12 lg:top-32 lg:left-20 w-32 h-32 lg:w-48 lg:h-48 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-950 fill-transparent">
              <path d="M10 90 Q 20 60 50 50 T 90 20" strokeWidth="2" strokeDasharray="5 5" fill="none" />
              <path d="M80 10 L100 30 M100 10 L80 30" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.div>
          <motion.div className="absolute bottom-48 left-4 md:bottom-36 md:left-12 lg:bottom-32 lg:left-24 w-28 h-28 lg:w-40 lg:h-40 opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-950 fill-transparent" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
              <path d="M10 85 L35 35 L60 85 Z" className="fill-amber-950/10" />
              <path d="M40 85 L65 45 L90 85 Z" className="fill-amber-950/10" />
              <path d="M25 55 L35 35 L45 55 L40 60 L30 50 Z" className="fill-amber-950/30" />
              <path d="M55 61 L65 45 L75 61 L70 65 L60 58 Z" className="fill-amber-950/30" />
            </svg>
          </motion.div>
        </>
      )}

      {/* Main Content Container */}
      <motion.div 
        animate={{ opacity: isTransitioning ? 0 : 1, scale: isTransitioning ? 1.15 : 1 }}
        transition={{ duration: 0.15, ease: "easeIn" }}
        className="max-w-5xl mx-auto w-full flex flex-col items-center relative z-10 pt-2 lg:pt-4"
      >
        
        {/* BAGIAN 1: JUDUL */}
        <div className="flex flex-col items-center justify-center w-full mb-3 lg:mb-5">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-center">
            <h1 className="mb-2 sm:mb-3 font-bold text-4xl sm:text-5xl md:text-5xl lg:text-[60px] tracking-wider uppercase leading-none font-[Coiny] text-[#ffffff]" style={{ textShadow: '0px 2px 0px #b45309, 0px 4px 0px #92400e, 0px 6px 0px #78350f, 0px 12px 24px rgba(69, 26, 3, 0.6)' }}>
              Welcome to FIELA!
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="text-center w-full">
            <p className="text-xl sm:text-2xl lg:text-[32px] font-extrabold px-2 sm:px-4 leading-tight italic font-[Coiny] text-[#5e2100]" style={{ textShadow: '1px 2px 0px #fde68a, 0px 4px 8px rgba(0,0,0,0.3)' }}>
              Fun & Interactive English Learning Atlas
            </p>
          </motion.div>
        </div>

        {/* 🔮 BAGIAN 2: ATLAS & DIALOG RPG */}
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto mb-2 gap-4 md:gap-8 px-4">
          
          <motion.div
            initial={{ scale: 0, x: -50 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, duration: 1 }}
            className="relative w-40 sm:w-48 md:w-56 shrink-0 mx-auto md:mx-0 z-20 min-h-[160px] sm:min-h-[200px] flex items-center justify-center"
          >
            {/* Wadah motion.div luar dipertahankan untuk efek melayang */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="w-full flex items-center justify-center">
              {/* Gambar statis tanpa AnimatePresence agar ganti pose instan */}
              <img
                src={atlasPose}
                alt="Captain Atlas"
                className="w-full h-auto drop-shadow-[0_15px_25px_rgba(101,67,33,0.6)] object-contain"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="w-full md:w-auto flex-1 relative z-20"
          >
            <div className="bg-[#fffcf2] rounded-3xl p-5 sm:p-6 border-4 border-amber-500/80 shadow-[0_10px_30px_rgba(101,67,33,0.5)] relative">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#fffcf2] rotate-45 border-l-4 border-b-4 border-amber-500/80 hidden md:block" />
              <div className="absolute left-1/2 -top-3 w-6 h-6 bg-[#fffcf2] rotate-45 border-l-4 border-t-4 border-amber-500/80 md:hidden -translate-x-1/2" />

              <h3 className="font-[Coiny] text-amber-700 text-sm sm:text-base mb-2 uppercase tracking-widest border-b-2 border-amber-200 pb-1 inline-block">
                Captain Atlas
              </h3>
              
              <div className="min-h-[85px] sm:min-h-[90px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={dialogueText}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-[Nunito] font-bold text-base sm:text-lg lg:text-xl text-amber-950 leading-snug w-full"
                  >
                    {dialogueText}
                  </motion.p>
                </AnimatePresence>
              </div>

              {isAudioPlaying && (
                <div className="absolute bottom-3 right-4">
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                    <ChevronRight className="w-5 h-5 text-amber-500" />
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* 🔮 BAGIAN 3 & 4: HIGHLIGHT DAN SLOGAN */}
        <div className="w-full flex flex-col items-center justify-start gap-4 z-20 relative mt-2">
          
          <AnimatePresence>
            {!isTransitioning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-full px-2"
              >
                <div className="flex flex-wrap lg:flex-nowrap justify-center gap-2 sm:gap-3 lg:gap-4 w-full">
                  {[
                    { icon: "📜", text: "5 Expeditions" },
                    { icon: "🎯", text: "Quest Challenges" },
                    { icon: "🎵", text: "Audio Guidance" },
                    { icon: "🏆", text: "Collect Treasures" }
                  ].map((feature) => (
                    <div key={feature.text} className="bg-[#0a6f99] backdrop-blur-sm px-3 sm:px-4 lg:px-5 py-2 rounded-xl border-2 border-amber-200/90 flex items-center justify-center whitespace-nowrap" style={{ boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(101, 67, 33, 0.3)' }}>
                      <span className="text-base sm:text-lg mr-2 shrink-0">{feature.icon}</span>
                      <span className="text-[#f4ebe0] font-[Fredoka] font-medium tracking-wide text-shadow-md text-xs sm:text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isTransitioning && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-center w-full mt-2 lg:mt-3 mb-1">
                <p className="text-[#fff6d1] text-xs sm:text-sm tracking-[0.15em] font-bold drop-shadow-md font-[Coiny]">
                  ✦ A Journey Through Words & Discovery ✦
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full min-h-[70px] sm:min-h-[80px] flex justify-center mt-2">
            <AnimatePresence>
              {showButton && !isTransitioning && !isAudioPlaying && !showNameDialog && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: 10 }} 
                  animate={{ opacity: 1, scale: 1, y: 0 }} 
                  exit={{ opacity: 0, scale: 0.8, height: 0 }} 
                  transition={{ duration: 0.3 }} 
                  className="w-full flex justify-center px-4 origin-top"
                >
                  <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="w-full sm:w-auto">
                    <Button
                      onClick={handleStartClick}
                      className="w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-[#f4ebe0] hover:from-amber-800 hover:via-amber-900 hover:to-amber-950 text-lg sm:text-xl lg:text-3xl font-[Coiny] font-bold px-6 sm:px-10 lg:px-14 py-4 sm:py-5 lg:py-6 rounded-2xl shadow-2xl border-[3px] border-amber-950/40 transition-all transform active:scale-95 uppercase tracking-wider h-auto"
                      style={{ boxShadow: '0 12px 40px rgba(101, 67, 33, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.2)' }}
                    >
                      <span className="font-[Coiny] mt-1">Begin the Expedition!</span>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>

      {/* --- POP-UP DIALOG NAMA --- */}
      <AnimatePresence>
        {showNameDialog && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-amber-950/60 backdrop-blur-sm px-4">
            <motion.div initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-[#faf6f1] border-4 border-amber-700 rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl relative overflow-hidden">
              <div className="absolute -top-6 -right-6 text-6xl opacity-10 pointer-events-none">🗺️</div>
              
              <h2 className="text-2xl sm:text-3xl font-[Coiny] text-amber-900 text-center mb-6 drop-shadow-sm">
                What is your name?
              </h2>
              
              <form onSubmit={handleNameSubmit} className="flex flex-col gap-4 relative z-10">
                <input
                  type="text"
                  autoFocus
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Type your name here..."
                  className="w-full text-center text-lg sm:text-xl p-3 sm:p-4 border-2 border-amber-300 rounded-xl font-[Nunito] font-bold text-amber-950 focus:border-amber-600 focus:ring-4 focus:ring-amber-600/20 focus:outline-none transition-all placeholder:font-normal placeholder:text-amber-900/40"
                  maxLength={15}
                />
                
                <Button type="submit" disabled={!playerName.trim()} className="w-full bg-green-600 hover:bg-green-700 text-white font-[Coiny] text-xl py-6 rounded-xl shadow-lg border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  OK!
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating dust motes & Burst particles tetap utuh */}
      {!isTransitioning && [...Array(12)].map((_, i) => (
        <motion.div key={i} className="absolute w-1.5 h-1.5 bg-amber-200/60 rounded-full pointer-events-none" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, willChange: 'transform' }} animate={{ y: [0, -80, 0], x: [0, Math.random() * 40 - 20, 0], opacity: [0, 0.7, 0] }} transition={{ repeat: Infinity, duration: 4 + Math.random() * 3, delay: Math.random() * 3 }} />
      ))}
      {particles.map(particle => (
        <motion.div key={particle.id} className="absolute w-3 h-3 bg-amber-300 rounded-full pointer-events-none" style={{ left: `calc(50% + ${particle.x}px)`, top: `calc(50% + ${particle.y}px)`, boxShadow: '0 0 12px rgba(251, 191, 36, 0.8)' }} animate={{ x: [0, Math.random() * 200 - 100], y: [0, Math.random() * 200 - 100], opacity: [1, 0], scale: [1, 0] }} transition={{ duration: 0.15, ease: "easeOut" }} />
      ))}
    </div>
  );
}