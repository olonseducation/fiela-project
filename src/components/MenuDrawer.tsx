import olonseducationlogo from '../imports/olons-education-logo.png'
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Info, Sparkles, Map, BookOpen, Mail, Music, Volume2, VolumeX, ArrowLeft, Mic, Gamepad2, Award, Route } from 'lucide-react';
import { Button } from './ui/button';
import { soundEffects } from '../utils/soundEffects';
import { backgroundMusic } from '../utils/backgroundMusic';

// Tambahkan interface untuk menerima penanda halaman dari App.tsx
interface MenuDrawerProps {
  pageKey?: string | null;
}

export function MenuDrawer({ pageKey = 'home' }: MenuDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume] = useState(0.15);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleBgm = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    try {
      if (typeof backgroundMusic.setVolume === 'function') {
        backgroundMusic.setVolume(newState ? 0 : volume);
      } else {
        newState ? backgroundMusic.stop() : backgroundMusic.play(0);
      }
    } catch (e) {
      console.warn(e);
    }
    if (typeof soundEffects.buttonPlay === 'function') soundEffects.buttonPlay();
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setActiveSection(null);
  };

  // Static Content translated to English
  const renderSectionContent = () => {
    switch (activeSection) {
      case "About This Atlas":
        return (
          <div className="space-y-4 font-[Nunito] text-amber-950">
            <p className="font-bold text-lg">What is FIELA?</p>
            <p className="leading-relaxed">FIELA (Fun & Interactive English Learning Atlas) is an interactive digital learning platform specially designed to help children explore the world of English vocabulary in a fun and engaging way.</p>
            <p className="leading-relaxed">Through an ocean adventure atlas approach, young explorers are invited to set sail from one expedition island to another while completing educational literacy missions.</p>
          </div>
        );
      case "Features":
        return (
          <div className="space-y-3 font-[Nunito] pb-2">
            
             {/* AUDIO GUIDANCE */}
            <div className="bg-[#fffdf8] rounded-2xl p-4 border-2 border-amber-100 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="bg-amber-100 p-3 rounded-2xl shrink-0">
                <Volume2 className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h4 className="font-[Coiny] text-amber-900 tracking-wide mb-1 uppercase text-sm">Audio Guidance</h4>
                <p className="text-[13px] sm:text-sm text-amber-950/80 font-bold leading-snug">Click the speaker icon to hear words and passages spoken aloud.</p>
              </div>
            </div>
            
            {/* INTERACTIVE LEXICON */}
            <div className="bg-[#fffdf8] rounded-2xl p-4 border-2 border-amber-100 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="bg-emerald-100 p-3 rounded-2xl shrink-0">
                <BookOpen className="h-6 w-6 text-emerald-700" />
              </div>
              <div>
                <h4 className="font-[Coiny] text-amber-900 tracking-wide mb-1 uppercase text-sm">Interactive Lexicon</h4>
                <p className="text-[13px] sm:text-sm text-amber-950/80 font-bold leading-snug">Click on marked words in stories to see definitions and examples.</p>
              </div>
            </div>
            
            {/* SPEECH PRACTICE */}
            <div className="bg-[#fffdf8] rounded-2xl p-4 border-2 border-amber-100 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-2xl shrink-0">
                <Mic className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h4 className="font-[Coiny] text-amber-900 tracking-wide mb-1 uppercase text-sm">Speech Practice</h4>
                <p className="text-[13px] sm:text-sm text-amber-950/80 font-bold leading-snug">Use your voice to practice pronunciation. Receive instant guidance!</p>
              </div>
            </div>

            {/* CHALLENGE QUESTS */}
            <div className="bg-[#fffdf8] rounded-2xl p-4 border-2 border-amber-100 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="bg-yellow-100 p-3 rounded-2xl shrink-0">
                <Gamepad2 className="h-6 w-6 text-yellow-700" />
              </div>
              <div>
                <h4 className="font-[Coiny] text-amber-900 tracking-wide mb-1 uppercase text-sm">Challenge Quests</h4>
                <p className="text-[13px] sm:text-sm text-amber-950/80 font-bold leading-snug">Test your knowledge with matching challenges and word puzzles!</p>
              </div>
            </div>

            {/* TREASURES & HONORS */}
            <div className="bg-[#fffdf8] rounded-2xl p-4 border-2 border-amber-100 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="bg-orange-100 p-3 rounded-2xl shrink-0">
                <Award className="h-6 w-6 text-orange-700" />
              </div>
              <div>
                <h4 className="font-[Coiny] text-amber-900 tracking-wide mb-1 uppercase text-sm">Treasures & Honors</h4>
                <p className="text-[13px] sm:text-sm text-amber-950/80 font-bold leading-snug">Earn treasures and track your discoveries as you complete expeditions.</p>
              </div>
            </div>

          </div>
        );
      case "Journey Path":
        return (
          <div className="space-y-4 font-[Nunito] text-amber-950">
            <p className="font-bold text-lg">How to Play & Learn:</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Select an active expedition island on the main ocean map.</li>
              <li>Listen to and read the fun & meaningful story in the <span className="font-bold">Story Scene</span>.</li>
              <li>Practice your pronunciation and learn the meanings of important words on the <span className="font-bold">Lexicon Review</span> page.</li>
              <li>Complete the <span className="font-bold">Mini Game Quest</span> challenges to collect the highest score.</li>
              <li>Open the <span className="font-bold">Treasure Vault</span> to admire the golden badges and artifacts you've successfully unlocked!</li>
            </ol>
          </div>
        );
      case "Explorer's Notes":
        return (
          <div className="font-[Nunito] text-amber-950">
            <ul className="list-disc pl-5 space-y-4 leading-relaxed marker:text-amber-700">
              <li className="pl-1">
                For the finest experience with speech features, allow access to your speaking device when prompted!
              </li>
              <li className="pl-1">
                <span className="font-bold">Speak Clearly into the Magic Compass:</span> For the best voice recognition experience, try to speak closely to your device's microphone or wear a <span className="font-bold">headset/IEM</span>. This helps the atlas capture your magnificent pronunciation perfectly! 🎧
              </li>
            </ul>
          </div>
        );
      case "Developer Contact":
        return (
          <div className="space-y-4 font-[Nunito] text-amber-950 text-center py-4">
            {/* Bagian Logo */}
            <div className="flex justify-center mb-2">
              <img 
                src={olonseducationlogo}
                alt="OLONS Education Logo" 
                className="h-20 w-20 object-contain rounded-full shadow-sm border border-amber-100" 
              />
            </div>
            
            <p className="font-bold text-xl font-[Coiny] text-amber-900">OLONS Education</p>
            <p className="text-sm">Developed as an interactive learning media based on Edutechnopreneurship for primary education.</p>
            
            <div className="pt-5 mt-4 border-t-2 border-amber-200/60 space-y-3">
              {/* Email tetap normal agar mudah dibaca */}
              <p className="text-xs text-amber-950">
                Email: <span className="font-bold">olonseducation@gmail.com</span>
              </p>
              
              {/* Copyright diubah menjadi uppercase, lebih kecil, dan sedikit diredupkan */}
              <p className="text-[10px] uppercase tracking-widest font-bold text-amber-900/50 leading-relaxed">
                © {new Date().getFullYear()} OLONS Education.<br />All Rights Reserved.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const menuItems = [
    { icon: Info, label: "About This Atlas" },
    { icon: Sparkles, label: "Features" },
    { icon: Route, label: "Journey Path" },
    { icon: BookOpen, label: "Explorer's Notes" },
    { icon: Mail, label: "Developer Contact" },
  ];

  return (
    <>
      {/* GLOBAL TRIGGER BUTTON DENGAN ANIMASI PERGANTIAN HALAMAN */}
      {/* Absolute positioning prevents it from scrolling, top-4 right-4 untuk simetris dengan Home */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pageKey} // Memaksa animasi ulang saat halaman berganti
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }} 
          animate={{ opacity: 1, scale: 1, rotate: 0 }} 
          exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
          transition={{ type: "spring", stiffness: 340, damping: 20 }}
          className="absolute top-4 right-4 z-50"
        >
          <motion.button 
            onClick={() => { if (typeof soundEffects.buttonNavigation === 'function') soundEffects.buttonNavigation(); setIsOpen(true); }} 
            initial="normal"
            animate="normal"
            whileHover="diHover" 
            whileTap="diKlik"
            
            variants={{
              normal: { 
                backgroundColor: '#faf6f1', 
                color: '#7B3306', 
                borderColor: '#ecc39d', 
                borderRadius: '50%',
                scale: 1,
              },
              diHover: { 
                scale: 1.15, 
                backgroundColor: '#cf753a', 
                color: '#FAF6F1',
                borderColor: '#7B3306',
                borderRadius: '12px',
                // KUNCI SNAPPY 1: Stiffness dinaikkan drastis ke 400 agar sangat cepat melesat
                transition: { type: "spring", stiffness: 400, damping: 15 }
              },
              diKlik: { 
                scale: 0.9 
              }
            }}
            className="rounded-full shadow-lg border-2 bg-[#faf6f1]/95 border-amber-700/30 text-amber-900 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-2 sm:p-3 w-11 h-11 sm:w-15 sm:h-15 hover:h-14 hover:w-11 sm:hover:w-16 sm:hover:h-18 transition-all duration-75" // Durasi CSS dipercepat ke 75ms
          >
            {/* 1. Ikon Menu */}
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
              <Menu className="h-5 w-5 sm:h-7 sm:w-7" />
            </motion.span>
        
            {/* 2. Teks 'Menu' */}
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
              Menu
            </motion.span>
        </motion.button>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            
            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#faf6f1] shadow-2xl border-l-4 border-amber-900/20 z-[101] overflow-y-auto"
            >
              <div className="p-6">
                
                {/* Dynamic Header */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-amber-200">
                  {activeSection ? (
                    <Button 
                      onClick={() => { if (typeof soundEffects.buttonNavigation === 'function') soundEffects.buttonNavigation(); setActiveSection(null); }}
                      variant="ghost" className="font-[Coiny] text-lg text-amber-800 p-0 hover:bg-transparent flex items-center gap-2"
                    >
                      <ArrowLeft className="h-5 w-5" /> Back to Menu
                    </Button>
                  ) : (
                    <h2 className="font-[Coiny] text-2xl text-amber-900 flex items-center gap-2">
                      <Map className="h-6 w-6 text-amber-600" /> FIELA Menu
                    </h2>
                  )}
                  <Button onClick={closeDrawer} variant="ghost" className="rounded-full p-2 h-10 w-10 text-amber-900 hover:bg-amber-200/50">
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* MAIN CONTENT AREA / SUB-VIEW */}
                <AnimatePresence mode="wait">
                  {!activeSection ? (
                    <motion.div
                      key="menu-list"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-2.5"
                    >
                      {menuItems.map((item, idx) => (
                        <Button 
                          key={idx} 
                          variant="ghost" 
                          className="w-full justify-start text-left font-[Nunito] font-bold text-base py-6 px-4 hover:bg-amber-100 text-amber-950 border-2 border-transparent hover:border-amber-200/40 rounded-xl bg-white/60 shadow-sm"
                          onClick={() => { if (typeof soundEffects.buttonPlay === 'function') soundEffects.buttonPlay(); setActiveSection(item.label); }}
                        >
                          <item.icon className="mr-3 h-5 w-5 text-amber-700 shrink-0" />
                          {item.label}
                        </Button>
                      ))}

                      {/* Single Music Control (Without SFX) */}
                      <div className="bg-amber-100/60 p-4 rounded-xl border-2 border-amber-200/60 shadow-inner mt-6">
                        <div className="flex items-center justify-between">
                          <span className="font-[Nunito] font-bold text-amber-950 text-sm flex items-center gap-2">
                            <Music className="h-4 w-4 text-amber-700" /> Ocean Background Music
                          </span>
                          <Button 
                            onClick={toggleBgm} 
                            variant={isMuted ? "outline" : "default"} 
                            className={`rounded-full px-5 h-9 font-[Coiny] text-xs transition-colors ${!isMuted ? 'bg-amber-700 hover:bg-amber-800 text-white' : 'text-amber-700 border-amber-700 hover:bg-amber-100'}`}
                          >
                            {isMuted ? <VolumeX className="h-3.5 w-3.5 mr-1.5" /> : <Volume2 className="h-3.5 w-3.5 mr-1.5" />}
                            {isMuted ? 'Muted' : 'Playing'}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="section-content"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="bg-white/80 p-5 rounded-2xl border border-amber-200 shadow-sm"
                    >
                      <h3 className="font-[Coiny] text-xl text-amber-900 mb-4 border-b pb-2">{activeSection}</h3>
                      {renderSectionContent()}
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}