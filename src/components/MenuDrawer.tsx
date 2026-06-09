import fielaLogo from '../imports/mascot_fiela_logo_transparant.png'
import olonseducationlogo from '../imports/olons-education-logo.png'
import { useState, useEffect } from 'react';
import { PrivacyModal } from './PrivacyModal';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Info, Sparkles, BookOpen, Mail, Music, Volume2, VolumeX, ArrowLeft, Mic, Gamepad2, Award, Route, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { soundEffects } from '../utils/soundEffects';
import { backgroundMusic } from '../utils/backgroundMusic';

interface MenuDrawerProps {
  pageKey?: string | null;
}

export function MenuDrawer({ pageKey = 'home' }: MenuDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume] = useState(0.15); 
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  
  // 🔮 SAKELAR BILINGUAL
  const [showTranslation, setShowTranslation] = useState(false);

  // --- KODE TOGGLE BGM ---
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

  const toggleTranslation = () => {
    if (typeof soundEffects.buttonClick === 'function') soundEffects.buttonClick();
    setShowTranslation(!showTranslation);
  };

  useEffect(() => {
    const isHomepage = pageKey === 'home';

    if (isHomepage) {
      try {
        backgroundMusic.play(0);
        setIsMuted(false); 
      } catch (e) {
        console.warn("BGM Start Error:", e);
      }

      const handleFirstInteraction = () => {
        setIsMuted(false); 
        try {
          backgroundMusic.play(0);
        } catch (e) {
          console.warn("Interaction Play Error:", e);
        }
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };

      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('touchstart', handleFirstInteraction);

      return () => {
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
      };
      
    } else {
      try {
        backgroundMusic.stop();
      } catch (e) {}
      setIsMuted(true);
    }
  }, [pageKey]); 

  const closeDrawer = () => {
    setIsOpen(false);
    setActiveSection(null);
  };

  // Static Content
  const renderSectionContent = () => {
    switch (activeSection) {
      case "about":
        return (
          <div className="space-y-4 font-[Nunito] text-amber-950">
            <p className="font-bold text-lg">{showTranslation ? "Apa itu FIELA?" : "What is FIELA?"}</p>
            <p className="leading-relaxed">
              {showTranslation 
                ? "FIELA (Fun & Interactive English Learning Atlas) adalah platform pembelajaran digital interaktif yang dirancang khusus untuk membantu anak-anak menjelajahi dunia kosakata bahasa Inggris dengan cara yang menyenangkan dan menarik." 
                : "FIELA (Fun & Interactive English Learning Atlas) is an interactive digital learning platform specially designed to help children explore the world of English vocabulary in a fun and engaging way."}
            </p>
            <p className="leading-relaxed">
              {showTranslation 
                ? "Melalui pendekatan atlas petualangan samudra, penjelajah cilik diundang untuk berlayar dari satu pulau ekspedisi ke pulau lainnya sambil menyelesaikan misi literasi yang edukatif." 
                : "Through an ocean adventure atlas approach, young explorers are invited to set sail from one expedition island to another while completing educational literacy missions."}
            </p>
          </div>
        );
      case "features":
        return (
          <div className="space-y-3 font-[Nunito] pb-2">
             {/* AUDIO GUIDANCE */}
            <div className="bg-[#fffdf8] rounded-2xl p-4 border-2 border-amber-100 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="bg-amber-100 p-3 rounded-2xl shrink-0">
                <Volume2 className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h4 className="font-[Coiny] text-amber-900 tracking-wide mb-1 uppercase text-sm">{showTranslation ? "Panduan Audio" : "Audio Guidance"}</h4>
                <p className="text-[13px] sm:text-sm text-amber-950/80 font-bold leading-snug">
                  {showTranslation ? "Klik ikon pengeras suara untuk mendengar kata dan kalimat yang diucapkan dengan lantang." : "Click the speaker icon to hear words and passages spoken aloud."}
                </p>
              </div>
            </div>
            
            {/* INTERACTIVE LEXICON */}
            <div className="bg-[#fffdf8] rounded-2xl p-4 border-2 border-amber-100 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="bg-emerald-100 p-3 rounded-2xl shrink-0">
                <BookOpen className="h-6 w-6 text-emerald-700" />
              </div>
              <div>
                <h4 className="font-[Coiny] text-amber-900 tracking-wide mb-1 uppercase text-sm">{showTranslation ? "Leksikon Interaktif" : "Interactive Lexicon"}</h4>
                <p className="text-[13px] sm:text-sm text-amber-950/80 font-bold leading-snug">
                  {showTranslation ? "Klik pada kata yang ditandai dalam cerita untuk melihat definisi dan contoh." : "Click on marked words in stories to see definitions and examples."}
                </p>
              </div>
            </div>
            
            {/* SPEECH PRACTICE */}
            <div className="bg-[#fffdf8] rounded-2xl p-4 border-2 border-amber-100 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="bg-blue-100 p-3 rounded-2xl shrink-0">
                <Mic className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h4 className="font-[Coiny] text-amber-900 tracking-wide mb-1 uppercase text-sm">{showTranslation ? "Latihan Berbicara" : "Speech Practice"}</h4>
                <p className="text-[13px] sm:text-sm text-amber-950/80 font-bold leading-snug">
                  {showTranslation ? "Gunakan suaramu untuk melatih pelafalan. Dapatkan panduan instan!" : "Use your voice to practice pronunciation. Receive instant guidance!"}
                </p>
              </div>
            </div>

            {/* CHALLENGE QUESTS */}
            <div className="bg-[#fffdf8] rounded-2xl p-4 border-2 border-amber-100 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="bg-yellow-100 p-3 rounded-2xl shrink-0">
                <Gamepad2 className="h-6 w-6 text-yellow-700" />
              </div>
              <div>
                <h4 className="font-[Coiny] text-amber-900 tracking-wide mb-1 uppercase text-sm">{showTranslation ? "Misi Tantangan" : "Challenge Quests"}</h4>
                <p className="text-[13px] sm:text-sm text-amber-950/80 font-bold leading-snug">
                  {showTranslation ? "Uji pengetahuanmu dengan tantangan mencocokkan dan teka-teki kata!" : "Test your knowledge with matching challenges and word puzzles!"}
                </p>
              </div>
            </div>

            {/* TREASURES & HONORS */}
            <div className="bg-[#fffdf8] rounded-2xl p-4 border-2 border-amber-100 shadow-sm flex items-start gap-4 transition-transform hover:-translate-y-1">
              <div className="bg-orange-100 p-3 rounded-2xl shrink-0">
                <Award className="h-6 w-6 text-orange-700" />
              </div>
              <div>
                <h4 className="font-[Coiny] text-amber-900 tracking-wide mb-1 uppercase text-sm">{showTranslation ? "Harta & Kehormatan" : "Treasures & Honors"}</h4>
                <p className="text-[13px] sm:text-sm text-amber-950/80 font-bold leading-snug">
                  {showTranslation ? "Dapatkan harta karun dan lacak penemuanmu saat kamu menyelesaikan ekspedisi." : "Earn treasures and track your discoveries as you complete expeditions."}
                </p>
              </div>
            </div>

          </div>
        );
      case "path":
        return (
          <div className="space-y-4 font-[Nunito] text-amber-950">
            <p className="font-bold text-lg">{showTranslation ? "Cara Bermain & Belajar:" : "How to Play & Learn:"}</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>{showTranslation ? "Pilih pulau ekspedisi yang aktif di peta samudra utama." : "Select an active expedition island on the main ocean map."}</li>
              <li>{showTranslation ? <span dangerouslySetInnerHTML={{__html: "Dengarkan dan baca cerita di halaman <span class='font-bold'>Story Scene</span>."}} /> : <span dangerouslySetInnerHTML={{__html: "Listen to and read the fun & meaningful story in the <span class='font-bold'>Story Scene</span>."}} />}</li>
              <li>{showTranslation ? <span dangerouslySetInnerHTML={{__html: "Latih pelafalanmu dan pelajari lagi arti kosakata di halaman <span class='font-bold'>Lexicon Review</span>."}} /> : <span dangerouslySetInnerHTML={{__html: "Practice your pronunciation and learn the meanings of important words on the <span class='font-bold'>Lexicon Review</span> page."}} />}</li>
              <li>{showTranslation ? <span dangerouslySetInnerHTML={{__html: "Selesaikan tantangan <span class='font-bold'>Mini Game Quest</span> untuk mendapat skor tertinggi."}} /> : <span dangerouslySetInnerHTML={{__html: "Complete the <span class='font-bold'>Mini Game Quest</span> challenges to collect the highest score."}} />}</li>
              <li>{showTranslation ? <span dangerouslySetInnerHTML={{__html: "Buka <span class='font-bold'>Treasure Vault</span> untuk melihat lencana emasmu!"}} /> : <span dangerouslySetInnerHTML={{__html: "Open the <span class='font-bold'>Treasure Vault</span> to admire the golden badges and artifacts you've successfully unlocked!"}} />}</li>
              <li>{showTranslation ? <span dangerouslySetInnerHTML={{__html: "Kumpulkan <span class='font-bold'>Atlas Coins</span> untuk membuka pulau ekspedisi berikutnya."}} /> : <span dangerouslySetInnerHTML={{__html: "Collect <span class='font-bold'>Atlas Coins</span> to unlock the next expedition."}} />}</li>
            </ol>
          </div>
        );
      case "notes":
        return (
          <div className="font-[Nunito] text-amber-950">
            <ul className="list-disc pl-5 space-y-4 leading-relaxed marker:text-amber-700">
              <li className="pl-1">
                <span className="font-bold">{showTranslation ? "Izinkan Akses Mikrofon:" : "Allow Microphone Access:"}</span> {showTranslation ? "Untuk pengalaman latihan pengucapan yang terbaik, izinkan akses mikrofon di perangkatmu saat diminta!" : "For the finest experience with speech features, allow access to your speaking device when prompted!"}
              </li>
              <li className="pl-1">
                <span className="font-bold">{showTranslation ? "Bicaralah Jelas ke Kompas Ajaib:" : "Speak Clearly into the Magic Compass:"}</span> {showTranslation ? "Agar suara pengucapanmu terekam dengan baik, bicaralah dekat dengan mikrofon perangkatmu atau gunakan headset/mikrofon tambahan. Itu akan membantu atlas menangkap pelafalanmu dengan sempurna!" : "For the best voice recognition experience, try to speak closely to your device's microphone or wear a headset/earphone/additional microphone (recommended for mobile device user). This helps the atlas capture your magnificent pronunciation perfectly!"}
              </li>
              <li className="pl-1">
                <span className="font-bold">{showTranslation ? "Gunakan Kapal Penjelajah (Peramban) Terbaik:" : "Use the Best Explorer Ships (Browsers):"}</span> 
                {' '}
                {showTranslation 
                  ? "Agar keajaiban fitur suara dapat bekerja tanpa hambatan, kami sangat menyarankan untuk berlayar menggunakan Google Chrome, Microsoft Edge, atau Safari (untuk perangkat Apple)." 
                  : "To ensure the magic voice features work flawlessly, we highly recommend setting sail using Google Chrome, Microsoft Edge, or Safari (for Apple devices)."}
              </li>
            </ul>
          </div>
        );
      case "contact":
        return (
          <div className="space-y-4 font-[Nunito] text-amber-950 text-center py-4">
            <div className="flex justify-center mb-2">
              <img 
                src={olonseducationlogo}
                alt="OLONS Education Logo" 
                className="h-20 w-20 object-contain rounded-full shadow-sm border border-amber-100" 
              />
            </div>
            
            <div className="mb-4">
              <p className="font-bold text-xl font-[Coiny] text-amber-900 leading-none">OLONS Education</p>
              
              <div className="flex flex-col items-center mt-2.5">
                {/* 🔮 Container menggunakan w-fit agar sejajar panjang teks */}
                <div className="relative w-fit pb-2">
                  <p className="text-sm sm:text-base font-bold text-amber-800/95 tracking-wide whitespace-nowrap">
                    {showTranslation ? "Pengembang Utama: Musyakkir" : "Lead Developer: Musyakkir"}
                  </p>
                  
                  {/* 🔮 GARIS SVG LANCIP (TAPERED) */}
                  <div className="absolute left-0 bottom-0 w-full h-1 flex items-center">
                    <svg 
                      viewBox="0 0 100 4" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="w-full h-full fill-amber-200/90" 
                      preserveAspectRatio="none"
                    >
                      {/* Gambar bentuk belah ketupat pipih: Kiri(0,2) -> TengahAtas(50,0) -> Kanan(100,2) -> TengahBawah(50,3) */}
                      <path d="M0,2 L50,0 L100,2 L50,3 Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-sm">
              {showTranslation 
                ? "Dikembangkan sebagai media pembelajaran interaktif berbasis Edutechnopreneurship untuk pendidikan dasar." 
                : "Developed as an interactive learning media based on Edutechnopreneurship for primary education."}
            </p>
            
            <div className="pt-5 mt-4 border-t-2 border-amber-200/60 space-y-3">
              <p className="text-xs text-amber-950">
                Email: <span className="font-bold">olonseducation@gmail.com</span>
              </p>
              
              <p className="text-[10px] uppercase tracking-widest font-bold text-amber-900/50 leading-relaxed">
                © {new Date().getFullYear()} OLONS Education.<br />{showTranslation ? "Hak Cipta Dilindungi Undang-Undang." : "All Rights Reserved."}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const menuItems = [
    { id: "about", icon: Info, enLabel: "About This App", idLabel: "Tentang Aplikasi Ini" },
    { id: "features", icon: Sparkles, enLabel: "Features", idLabel: "Fitur" },
    { id: "path", icon: Route, enLabel: "Journey Path", idLabel: "Jalur Perjalanan" },
    { id: "notes", icon: BookOpen, enLabel: "Explorer's Notes", idLabel: "Catatan Penjelajah" },
    { id: "contact", icon: Mail, enLabel: "Developer Contact", idLabel: "Kontak Pengembang" },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pageKey} 
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
                transition: { type: "spring", stiffness: 400, damping: 15 }
              },
              diKlik: { 
                scale: 0.9 
              }
            }}
            className="rounded-full shadow-lg border-2 bg-[#faf6f1]/95 border-amber-700/30 text-amber-900 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-2 sm:p-3 w-11 h-11 sm:w-15 sm:h-15 hover:h-14 hover:w-11 sm:hover:w-16 sm:hover:h-18 transition-all duration-75"
          >
            <motion.span
              className="flex items-center justify-center"
              variants={{
                normal: { y: 0, scale: 1 },
                diHover: { y: -2, scale: 0.9 }
              }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <Menu className="h-5 w-5 sm:h-7 sm:w-7" />
            </motion.span>
        
            <motion.span
              className="text-[8px] sm:text-[10px] font-bold tracking-wide uppercase pointer-events-none mt-0.5"
              variants={{
                normal: { opacity: 0, y: 6, height: 0 },
                diHover: { opacity: 1, y: 0, height: "auto", transition: { type: "tween", ease: "easeOut", duration: 0.1 } }
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#faf6f1] shadow-2xl border-l-4 border-amber-900/20 z-[101] overflow-y-auto"
            >
              <div className="p-6">
                
                <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-amber-200">
                  {activeSection ? (
                    <Button 
                      onClick={() => { if (typeof soundEffects.buttonNavigation === 'function') soundEffects.buttonNavigation(); setActiveSection(null); }}
                      variant="ghost" className="font-[Coiny] text-lg text-amber-800 p-0 hover:bg-transparent flex items-center gap-2"
                    >
                      <ArrowLeft className="h-5 w-5" /> {showTranslation ? "Kembali ke Menu" : "Back to Menu"}
                    </Button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <h2 className="font-[Coiny] text-2xl text-amber-900 flex items-center gap-2">
                        <img 
                          src={fielaLogo} 
                          alt="Logo FIELA" 
                          className="h-8 w-auto object-contain drop-shadow-sm" 
                        /> 
                        FIELA Menu
                      </h2>
                      {/* 🔍 TOMBOL DWITBAHASA */}
                      <motion.button
                        onClick={toggleTranslation}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center w-7 h-7 rounded-full border border-amber-200 shadow-sm bg-white overflow-hidden transition-colors hover:bg-amber-50 shrink-0"
                      >
                        <img 
                          src={showTranslation 
                            ? "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/id.png" 
                            : "https://raw.githubusercontent.com/olonsgallery/fiela-repository/main/images/en.png"
                          }
                          alt="Language Toggle"
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    </div>
                  )}
                  <Button onClick={closeDrawer} variant="ghost" className="rounded-full p-2 h-10 w-10 text-amber-900 hover:bg-amber-200/50 shrink-0">
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {!activeSection ? (
                    <motion.div
                      key="menu-list"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-2.5"
                    >
                      {menuItems.map((item) => (
                        <Button 
                          key={item.id} 
                          variant="ghost" 
                          className="w-full justify-start text-left font-[Nunito] font-bold text-base py-6 px-4 hover:bg-amber-100 text-amber-950 border-2 border-transparent hover:border-amber-200/40 rounded-xl bg-white/60 shadow-sm"
                          onClick={() => { if (typeof soundEffects.buttonPlay === 'function') soundEffects.buttonPlay(); setActiveSection(item.id); }}
                        >
                          <item.icon className="mr-3 h-5 w-5 text-amber-700 shrink-0" />
                          {showTranslation ? item.idLabel : item.enLabel}
                        </Button>
                      ))}

                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-left font-[Nunito] font-bold text-base py-6 px-4 hover:bg-amber-100 text-amber-950 border-2 border-transparent hover:border-amber-200/40 rounded-xl bg-white/60 shadow-sm"
                        onClick={() => { 
                          if (typeof soundEffects.buttonPlay === 'function') soundEffects.buttonPlay(); 
                          setIsPrivacyOpen(true); 
                        }}
                      >
                        <ShieldCheck className="mr-3 h-5 w-5 text-amber-700 shrink-0" />
                        {showTranslation ? "Kebijakan Privasi" : "Privacy Policy"}
                      </Button>

                      <div className="bg-amber-100/60 p-4 rounded-xl border-2 border-amber-200/60 shadow-inner mt-6">
                        <div className="flex items-center justify-between">
                          <span className="font-[Nunito] font-bold text-amber-950 text-sm flex items-center gap-2">
                            <Music className="h-4 w-4 text-amber-700" /> {showTranslation ? "Musik Latar Samudra" : "Ocean Background Music"}
                          </span>
                          <Button 
                            onClick={toggleBgm} 
                            variant={isMuted ? "outline" : "default"} 
                            className={`rounded-full px-5 h-9 font-[Coiny] text-xs transition-colors ${!isMuted ? 'bg-amber-700 hover:bg-amber-800 text-white' : 'text-amber-700 border-amber-700 hover:bg-amber-100'}`}
                          >
                            {isMuted ? <VolumeX className="h-3.5 w-3.5 mr-1.5" /> : <Volume2 className="h-3.5 w-3.5 mr-1.5" />}
                            {isMuted ? (showTranslation ? 'Dibisukan' : 'Muted') : (showTranslation ? 'Dimainkan' : 'Playing')}
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
                      <h3 className="font-[Coiny] text-xl text-amber-900 mb-4 border-b pb-2">
                        {showTranslation ? menuItems.find(m => m.id === activeSection)?.idLabel : menuItems.find(m => m.id === activeSection)?.enLabel}
                      </h3>
                      {renderSectionContent()}
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
}