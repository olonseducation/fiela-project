import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { soundEffects } from '../utils/soundEffects';
import { customAudioManager } from '../utils/customAudio';
import { welcomePageAudio } from '../utils/audioConfigHelper';
import fielaLogo from '../imports/mascot_fiela_logo_transparant.png';

interface WelcomePageProps {
  onStart: () => void;
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 1500);

    return () => {
      clearTimeout(buttonTimer);
      customAudioManager.stop();
    };
  }, []);

  const handleLogoClick = () => {
    setIsAudioPlaying(true);
    customAudioManager.playAudio(welcomePageAudio.audioPath)
      .then(() => {
        setIsAudioPlaying(false);
      })
      .catch(() => {
        setIsAudioPlaying(false);
      });
  };

  const handleStart = () => {
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

  return (
    <div 
      className="min-h-screen w-full bg-gradient-to-br from-[#d4b896] via-[#c9a97a] to-[#a18260] flex flex-col items-center justify-center p-4 sm:p-6 lg:py-12 overflow-hidden relative"
    >
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

      {/* Decorative ornaments */}
      {!isTransitioning && (
        <>
          <motion.div className="absolute top-8 left-8 lg:top-12 lg:left-12 text-amber-950/30" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 120, ease: "linear" }}>
            <svg width="60" height="60" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M50,5 L52,48 L50,50 L48,48 Z" fill="currentColor"/><text x="50" y="15" textAnchor="middle" fontSize="16" fill="currentColor" fontFamily="serif">N</text></svg>
          </motion.div>
          <motion.div className="absolute top-16 right-16 lg:top-24 lg:right-24 opacity-20" animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}><div className="text-4xl lg:text-5xl">🧭</div></motion.div>
          <motion.div className="absolute bottom-16 left-16 lg:bottom-24 lg:left-24 opacity-20" animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 50, ease: "linear" }}><div className="text-4xl lg:text-5xl">⚓</div></motion.div>
          <motion.div className="absolute bottom-24 right-24 lg:bottom-32 lg:right-32 opacity-20" animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}><div className="text-3xl lg:text-4xl">🗺️</div></motion.div>
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
        
        {/* =========================================
            BAGIAN 1: JUDUL & SUBJUDUL 
            (Atur jarak ke Logo Mascot di mb-6 lg:mb-8 bawah ini)
        ========================================= */}
        <div className="flex flex-col items-center justify-center w-full mb-6 lg:mb-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-center">
            <h1 
              className="mb-3 sm:mb-4 font-bold text-4xl sm:text-5xl md:text-5xl lg:text-[60px] tracking-wider uppercase leading-none font-[Coiny] text-[#ffffff]" 
              style={{ 
                textShadow: '0px 2px 0px #b45309, 0px 4px 0px #92400e, 0px 6px 0px #78350f, 0px 12px 24px rgba(69, 26, 3, 0.6)' 
              }}
            >
              Welcome to FIELA!
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="text-center w-full">
            <p 
              className="text-xl sm:text-2xl lg:text-[34px] font-extrabold px-2 sm:px-4 leading-tight italic font-[Coiny] text-[#5e2100]"
              style={{
                textShadow: '1px 2px 0px #fde68a, 0px 4px 8px rgba(0,0,0,0.3)'
              }}
            >
              Fun & Interactive English Learning Atlas
            </p>
          </motion.div>
        </div>

        {/* =========================================
            BAGIAN 2: LOGO MASCOT (BURUNG HANTU) 
            (Atur jarak ke Slogan di mb-6 lg:mb-8 bawah ini)
        ========================================= */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-full mb-4 lg:mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, duration: 1 }}
            className="relative"
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} onClick={handleLogoClick} className="cursor-pointer relative">
              <img src={fielaLogo} className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 object-contain mx-auto" alt="FIELA Logo" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.25))' }} />
              
              {!isAudioPlaying && !isTransitioning && (
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, type: "spring" }} className="absolute right-0 top-12 md:-right-8 md:top-16 lg:right-2 lg:top-24">
                  <div className="relative bg-[#faf6f1] rounded-lg px-3 py-1.5 shadow-lg border-2 border-amber-700/40 translate-x-full">
                    <p className="text-amber-900 font-bold text-sm whitespace-nowrap font-[Coiny]">Click me!</p>
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-[#faf6f1]"></div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>

        
        {/* =========================================
            BAGIAN 4: FITUR HIGHLIGHTS 
            (Atur jarak ke Tombol Start di mb-8 lg:mb-10 bawah ini)
        ========================================= */}
        <div className="flex-shrink-0 w-full px-2 mb-6 lg:mb-8">
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
            className="bg-amber-900/30 backdrop-blur-sm px-4 sm:px-5 lg:px-6 py-2.5 rounded-xl border-2 border-amber-200/40 shadow-lg flex items-center justify-center whitespace-nowrap bg-[#b35f2e6e]"
            style={{ boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(101, 67, 33, 0.3)' }}
          >
                <span className="text-lg sm:text-xl mr-2 shrink-0">{feature.icon}</span>
                <span className="text-[#f4ebe0] font-[Fredoka] font-medium tracking-wide text-sm sm:text-base">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* =========================================
            BAGIAN 5: TOMBOL START & FOOTER 
        ========================================= */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-full space-y-6 lg:space-y-8">
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
                    onClick={handleStart}
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
        {/* =========================================
            BAGIAN 3: SLOGAN 
            (Atur jarak ke Fitur di mb-8 lg:mb-12 bawah ini)
        ========================================= */}
        <div className="flex flex-col items-center justify-center w-full mt-6 lg:mt-10 mb-2 lg:mb-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="text-center w-full">
            <p className="text-amber-100/95 text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.15em] font-bold drop-shadow-md font-[Coiny] text-[#fff6d1]"
              
            >
              ✦ A Journey Through Words & Discovery ✦
            </p>
          </motion.div>
        </div>

      </motion.div>

      {/* Floating dust motes */}
      {!isTransitioning && [...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-amber-200/60 rounded-full"
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