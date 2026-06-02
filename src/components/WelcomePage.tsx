import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { soundEffects } from '../utils/soundEffects';
import { customAudioManager } from '../utils/customAudio';
// Pastikan kamu sudah menambahkan/menyesuaikan path audio di audioConfigHelper.ts
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
  
  // --- STATE BARU UNTUK FITUR NAMA ---
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [isImpatientStart, setIsImpatientStart] = useState(false); // Menandai jika anak langsung klik Start

  useEffect(() => {
    // Mengecek apakah sebelumnya anak sudah pernah memasukkan nama
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

  // Skenario 1 & 3: Anak Interaktif (Klik Logo)
  const handleLogoClick = () => {
    if (isAudioPlaying) return;
    
    setIsAudioPlaying(true);
    
    // Cek apakah anak ini sudah punya nama di memori
    const savedName = localStorage.getItem('fiela_player_name');

    if (savedName) {
      // --- SKENARIO 3: SUDAH PUNYA NAMA ---
      // Putar audio versi pendek ("...Let's go!")
      const greetingWithNameAudio = welcomePageAudio.greetingWithNamePath || '/sounds/atlas-with-player-name.mp3';
      customAudioManager.playAudio(greetingWithNameAudio).catch(() => {});

      // Berikan jeda untuk mematikan efek 'glow' Atlas. 
      // Angka 7000 (7 detik) ini adalah perkiraan durasi audio barumu. 
      // (Silakan ubah angka 7000 ini jika durasi audio aslinya lebih cepat/lama)
      setTimeout(() => {
        setIsAudioPlaying(false);
      }, 7000); 

    } else {
      // --- SKENARIO 1: BELUM PUNYA NAMA ---
      // Putar audio panjang ("...What is your name?")
      const greetingAudio = welcomePageAudio.greetingPath || '/sounds/atlas-greeting.mp3';
      customAudioManager.playAudio(greetingAudio).catch(() => {});

      // SUTRADARA MEMBERIKAN JEDA 9 DETIK
      setTimeout(() => {
        setIsAudioPlaying(false); // Matikan animasi glow pada maskot
        
        // Cek sekali lagi untuk keamanan, lalu munculkan pop-up!
        if (!localStorage.getItem('fiela_player_name')) {
          setShowNameDialog(true);
        }
      }, 9000);
    }
  };

  // Fungsi Transisi Utama (Efek Partikel & Pindah Halaman)
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

  // Skenario 2: Anak Tidak Sabar (Klik Tombol Start)
  const handleStartClick = () => {
    soundEffects.buttonPlay();
    
    // Jika nama BELUM ADA di memori browser
    if (!localStorage.getItem('fiela_player_name')) {
      setIsImpatientStart(true); // Tandai bahwa dia lewat jalur cepat
      setShowNameDialog(true);   // Cegat dengan Pop-up!
      return;
    }
    
    // Jika nama SUDAH ADA, langsung mulai ekspedisi
    executeStartTransition();
  };

  // Logika saat tombol OK di Pop-up Dialog ditekan
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return; // Jangan izinkan nama kosong

    // 1. Simpan ke memori browser
    localStorage.setItem('fiela_player_name', playerName.trim());
    setShowNameDialog(false);

    // 2. Mainkan Audio 2 ("Okay! Let's Go!")
    const letsGoAudio = welcomePageAudio.letsGoPath || '/sounds/atlas-lets-go.mp3';
    
    // Putar audio dan berikan "Silent Catch" (Peredam Eror) jika gagal
    customAudioManager.playAudio(letsGoAudio).catch(() => {});
    
    // 3. Jika tadi anak lewat jalur "Start", tahan dulu sebelum pindah halaman
    if (isImpatientStart) {
      // SUTRADARA MEMBERIKAN JEDA 2.5 DETIK
      // (Silakan ubah angka 2500 ini jika durasi audio "Okay! Let's Go!" milikmu lebih cepat/lama)
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
                // Tambahkan efek glow tipis saat audio bermain agar Atlas terlihat "hidup"
                filter: isAudioPlaying ? ['drop-shadow(0 0 15px rgba(251,191,36,0.8))', 'drop-shadow(0 0 5px rgba(251,191,36,0.4))', 'drop-shadow(0 0 15px rgba(251,191,36,0.8))'] : 'drop-shadow(0 10px 15px rgba(0,0,0,0.25))'
              }} 
              transition={{ repeat: Infinity, duration: isAudioPlaying ? 1 : 2, ease: "easeInOut" }} 
              onClick={handleLogoClick} 
              className="cursor-pointer relative"
            >
              <img src={fielaLogo} className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 object-contain mx-auto" alt="FIELA Logo" />
              
              {!isAudioPlaying && !isTransitioning && !localStorage.getItem('fiela_player_name') && (
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

        {/* BAGIAN 4: FITUR HIGHLIGHTS */}
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
                className="bg-[#b35f2e6e] backdrop-blur-sm px-4 sm:px-5 lg:px-6 py-2.5 rounded-xl border-2 border-amber-200/40 flex items-center justify-center whitespace-nowrap"
                style={{ boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 4px 12px rgba(101, 67, 33, 0.3)' }}
              >
                <span className="text-lg sm:text-xl mr-2 shrink-0">{feature.icon}</span>
                <span className="text-[#f4ebe0] font-[Fredoka] font-medium tracking-wide text-sm sm:text-base">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* BAGIAN 5: TOMBOL START & FOOTER */}
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
              <div className="absolute -top-6 -right-6 text-6xl opacity-10">🗺️</div>
              
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