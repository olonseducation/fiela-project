import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { soundEffects } from '../utils/soundEffects';
import { customAudioManager } from '../utils/customAudio';
import { welcomePageAudio } from '../utils/audioConfigHelper'; 
import welcomeBgmPath from '../imports/welcomepage-background-music.mp3';
import fielaLogo from '../imports/fiela_logo_transparent.webp'; 

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
  const [isImpatientStart, setIsImpatientStart] = useState(false);

  // 🔮 SENJATA ANTI-AUTOPLAY POLICY UNTUK BGM
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Vite akan otomatis mengurus jalur file ini tanpa takut error 404 lagi!
    bgmRef.current = new Audio(welcomeBgmPath); 

    if (bgmRef.current) {
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.3; 
    }

    const unlockAudio = () => {
      if (bgmRef.current && bgmRef.current.paused) {
        // Coba putar musik, dan tangkap hasil 'Promise'-nya
        bgmRef.current.play().then(() => {
          // Jika sukses berputar, segera cabut jebakan agar memori tidak bocor
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('touchstart', unlockAudio);
          document.removeEventListener('keydown', unlockAudio);
        }).catch((err) => {
          console.warn("Kraken Autoplay masih menahan musik:", err);
        });
      }
    };

    // Pasang jebakan berlapis (Klik, Sentuh Layar, atau Tekan Tombol Keyboard sembarang)
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
    document.addEventListener('keydown', unlockAudio);

    return () => {
      // 🛑 Hancurkan musik saat kapal pindah halaman
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem('fiela_player_name');
    if (savedName) {
      setPlayerName(savedName);
    }

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 1500);

    return () => {
      clearTimeout(buttonTimer);
      customAudioManager.stop();
    };
  }, []);

  const handleLogoClick = () => {
    if (isAudioPlaying) return;
    
    setIsAudioPlaying(true);
    const savedName = localStorage.getItem('fiela_player_name');

    if (savedName) {
      const greetingWithNameAudio = welcomePageAudio.greetingWithNamePath || '/sounds/atlas-with-player-name.mp3';
      customAudioManager.playAudio(greetingWithNameAudio).catch(() => {});

      setTimeout(() => {
        setIsAudioPlaying(false);
      }, 7000); 

    } else {
      const greetingAudio = welcomePageAudio.greetingPath || '/sounds/atlas-greeting.mp3';
      customAudioManager.playAudio(greetingAudio).catch(() => {});

      setTimeout(() => {
        setIsAudioPlaying(false); 
        
        if (!localStorage.getItem('fiela_player_name')) {
          setShowNameDialog(true);
        }
      }, 9000);
    }
  };

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

  const handleStartClick = () => {
    soundEffects.buttonPlay();
    
    if (!localStorage.getItem('fiela_player_name')) {
      setIsImpatientStart(true); 
      setShowNameDialog(true); 
      return;
    }
    
    executeStartTransition();
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return; 

    localStorage.setItem('fiela_player_name', playerName.trim());
    setShowNameDialog(false);

    const letsGoAudio = welcomePageAudio.letsGoPath || '/sounds/atlas-lets-go.mp3';
    customAudioManager.playAudio(letsGoAudio).catch(() => {});
    
    if (isImpatientStart) {
      setTimeout(() => {
        executeStartTransition();
      }, 2500); 
    }
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#d4b896] via-[#c9a97a] to-[#a18260] flex flex-col items-center justify-center p-4 sm:p-6 lg:py-12 overflow-hidden relative">
      {/* Texture & Grid Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-amber-950" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-amber-950" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-amber-950" />
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-amber-950" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-950" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-amber-950" />
      </div>

      {/* 🔮 DECORATIVE ORNAMENTS: VINTAGE MAP SVG EDITION */}
          {!isTransitioning && (
            <>
              {/* Kompas Klasik (Top Right) */}
              <motion.div 
                className="absolute top-40 right-6 md:top-28 md:right-16 lg:top-24 lg:right-24 w-24 h-24 lg:w-32 lg:h-32 opacity-20 pointer-events-none"
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-950 fill-transparent" strokeWidth="1.5">
                  <circle cx="50" cy="50" r="45" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="35" />
                  <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" className="fill-amber-950/20" strokeLinejoin="round" />
                </svg>
              </motion.div>

              {/* Kapal Layar Klasik (Bottom Right) */}
              <motion.div 
                // Mengubah bottom-38 menjadi bottom-40 agar valid di Tailwind
                className="absolute bottom-40 right-4 md:bottom-32 md:right-16 lg:bottom-28 lg:right-32 w-28 h-28 lg:w-40 lg:h-40 opacity-20 pointer-events-none"
                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }} 
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-950 fill-transparent" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M15 75 L85 75 L75 90 L25 90 Z" className="fill-amber-950/20" />
                  <path d="M45 75 L45 20 L75 60 L45 65" className="fill-amber-950/10" />
                  <path d="M40 75 L40 30 L15 65 L40 65" className="fill-amber-950/10" />
                  <path d="M45 20 L55 25 L45 30 Z" className="fill-amber-950/30" />
                  <path d="M5 80 Q 20 70 35 85 T 65 80 T 95 85" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </motion.div>

              {/* Jalur Peta Harta Karun (Top Left) */}
              <motion.div 
                // Mengubah top-46 menjadi top-48 agar valid di Tailwind
                className="absolute top-48 left-2 md:top-36 md:left-12 lg:top-32 lg:left-20 w-32 h-32 lg:w-48 lg:h-48 opacity-20 pointer-events-none"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-950 fill-transparent">
                  <path d="M10 90 Q 20 60 50 50 T 90 20" strokeWidth="2" strokeDasharray="5 5" fill="none" />
                  <path d="M80 10 L100 30 M100 10 L80 30" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* Pegunungan Peta (Bottom Left) */}
              <motion.div 
                className="absolute bottom-48 left-4 md:bottom-36 md:left-12 lg:bottom-32 lg:left-24 w-28 h-28 lg:w-40 lg:h-40 opacity-20 pointer-events-none"
              >
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
        animate={{ 
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 1.15 : 1 
        }}
        transition={{ duration: 0.15, ease: "easeIn" }}
        className="max-w-5xl mx-auto w-full flex flex-col items-center relative z-10 pt-4"
      >
        
        {/* BAGIAN 1: JUDUL */}
        <div className="flex flex-col items-center justify-center w-full mb-6 lg:mb-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-center">
            <h1 
              className="mb-3 sm:mb-4 font-bold text-4xl sm:text-5xl md:text-5xl lg:text-[60px] tracking-wider uppercase leading-none font-[Coiny] text-[#ffffff]" 
              style={{ textShadow: '0px 2px 0px #b45309, 0px 4px 0px #92400e, 0px 6px 0px #78350f, 0px 12px 24px rgba(69, 26, 3, 0.6)' }}
            >
              Welcome to FIELA!
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="text-center w-full">
            <p 
              className="text-xl sm:text-2xl lg:text-[34px] font-extrabold px-2 sm:px-4 leading-tight italic font-[Coiny] text-[#5e2100]"
              style={{ textShadow: '1px 2px 0px #fde68a, 0px 4px 8px rgba(0,0,0,0.3)' }}
            >
              Fun & Interactive English Learning Atlas
            </p>
          </motion.div>
        </div>

        {/* BAGIAN 2: LOGO MASCOT */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-full mb-4 lg:mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, duration: 1 }}
            className="relative"
          >
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                filter: isAudioPlaying ? ['drop-shadow(0 0 15px rgba(251,191,36,0.8))', 'drop-shadow(0 0 5px rgba(251,191,36,0.4))', 'drop-shadow(0 0 15px rgba(251,191,36,0.8))'] : 'drop-shadow(0 10px 15px rgba(0,0,0,0.25))'
              }} 
              transition={{ repeat: Infinity, duration: isAudioPlaying ? 1 : 2, ease: "easeInOut" }} 
              onClick={handleLogoClick} 
              className="cursor-pointer relative z-20"
            >
              {/* MENGGUNAKAN LOGO BARU */}
              <img src={fielaLogo} className="h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56 object-contain mx-auto" alt="FIELA Logo" />
              
              {!isAudioPlaying && !isTransitioning && !localStorage.getItem('fiela_player_name') && (
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, type: "spring" }} className="absolute right-0 top-16 md:-right-8 md:top-20 lg:right-2 lg:top-28">
                  <div className="relative bg-[#faf6f1] rounded-lg px-3 py-1.5 shadow-lg border-2 border-amber-700/40 translate-x-full">
                    <p className="text-amber-900 font-bold text-sm whitespace-nowrap font-[Coiny]">Click me!</p>
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-[#faf6f1]"></div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* BAGIAN 4: FITUR HIGHLIGHTS */}
        <div className="flex-shrink-0 w-full px-2 mb-6 lg:mb-8 z-20 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-wrap lg:flex-nowrap justify-center gap-2 sm:gap-3 lg:gap-4 w-full"
          >
            {[
              { icon: "📜", text: "5 Expeditions" },
              { icon: "🎯", text: "Quest Challenges" },
              { icon: "🎵", text: "Audio Guidance" },
              { icon: "🏆", text: "Collect Treasures" }
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className="bg-[#0a6f99] backdrop-blur-sm px-4 sm:px-5 lg:px-6 py-2.5 rounded-xl border-2 border-amber-200/90 flex items-center justify-center whitespace-nowrap"
                style={{ boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(101, 67, 33, 0.3)' }}
              >
                <span className="text-lg sm:text-xl mr-2 shrink-0">{feature.icon}</span>
                <span className="text-[#f4ebe0] font-[Fredoka] font-medium tracking-wide text-shadow-md text-sm sm:text-base">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* BAGIAN 5: TOMBOL START & FOOTER */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-full space-y-6 lg:space-y-8 z-20 relative">
          <AnimatePresence>
            {showButton && !isTransitioning && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full flex justify-center px-4"
              >
                <motion.div 
                  animate={{ scale: [1, 1.03, 1] }} 
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-full sm:w-auto"
                >
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

        {/* SLOGAN */}
        <div className="flex flex-col items-center justify-center w-full mt-6 lg:mt-10 mb-2 lg:mb-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="text-center w-full">
            <p className="text-[#fff6d1] text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.15em] font-bold drop-shadow-md font-[Coiny]">
              ✦ A Journey Through Words & Discovery ✦
            </p>
          </motion.div>
        </div>

      </motion.div>

      {/* --- POP-UP DIALOG NAMA --- */}
      <AnimatePresence>
        {showNameDialog && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-amber-950/60 backdrop-blur-sm px-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-[#faf6f1] border-4 border-amber-700 rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl relative overflow-hidden"
            >
              {/* Ornamen dalam pop-up */}
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
                
                <Button
                  type="submit"
                  disabled={!playerName.trim()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-[Coiny] text-xl py-6 rounded-xl shadow-lg border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  OK!
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating dust motes */}
      {!isTransitioning && [...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-amber-200/60 rounded-full pointer-events-none"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, willChange: 'transform' }}
          animate={{ y: [0, -80, 0], x: [0, Math.random() * 40 - 20, 0], opacity: [0, 0.7, 0] }}
          transition={{ repeat: Infinity, duration: 4 + Math.random() * 3, delay: Math.random() * 3 }}
        />
      ))}

      {/* Burst particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-3 h-3 bg-amber-300 rounded-full pointer-events-none"
          style={{ left: `calc(50% + ${particle.x}px)`, top: `calc(50% + ${particle.y}px)`, boxShadow: '0 0 12px rgba(251, 191, 36, 0.8)' }}
          animate={{ x: [0, Math.random() * 200 - 100], y: [0, Math.random() * 200 - 100], opacity: [1, 0], scale: [1, 0] }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}