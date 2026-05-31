import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { PageType } from './types';
import { units } from './data/unit';
import { WelcomePage } from './components/WelcomePage';
import { HomePage } from './components/HomePage';
import { IntroPage } from './components/IntroPage';
import { StoryScene } from './components/StoryScene';
import { ReviewPage } from './components/ReviewPage';
import { MiniGamePage, type WrongAnswer } from './components/MiniGamePage';
import { RewardPage } from './components/RewardPage';
import { CompletionPage } from './components/CompletionPage';
import { MenuDrawer } from './components/MenuDrawer';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const STORAGE_KEY_COMPLETED = 'vocabulary-app-completed-units';
const STORAGE_KEY_CURRENT_UNIT = 'vocabulary-app-current-unit';
const STORAGE_KEY_CURRENT_PAGE = 'vocabulary-app-current-page';
const STORAGE_KEY_WELCOME_SEEN = 'vocabulary-app-welcome-seen';
const STORAGE_KEY_PASSWORD_UNLOCKED = 'vocabulary-app-password-unlocked';
const STORAGE_KEY_UNIT_SCORES = 'vocabulary-app-unit-scores';
const STORAGE_KEY_DEVICE_ID = 'vocabulary-app-device-id';

export interface UnitScore {
  unitId: number;
  score: number;
  total: number;
  percentage: number;
  pronunciationScore?: number; // TAMBAHAN: Menyimpan skor pelafalan permanen
}

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentUnit, setCurrentUnit] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<PageType | null>(null);
  const [completedUnits, setCompletedUnits] = useState<Set<number>>(new Set());
  const [passwordUnlockedUnits, setPasswordUnlockedUnits] = useState<Set<number>>(new Set());
  const [showCompletion, setShowCompletion] = useState(false);
  const [unitScores, setUnitScores] = useState<Record<number, UnitScore>>({});
  
  // TAMBAHAN: Menambahkan pronunciationScore ke memori sementara gameResults
  const [gameResults, setGameResults] = useState<{ wrongAnswers: WrongAnswer[], score: number, total: number, pronunciationScore: number }>({
    wrongAnswers: [],
    score: 0,
    total: 0,
    pronunciationScore: 0
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const welcomeSeen = localStorage.getItem(STORAGE_KEY_WELCOME_SEEN);
      if (welcomeSeen === 'true') {
        setShowWelcome(false);
      }

      const savedCompleted = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (savedCompleted) {
        setCompletedUnits(new Set(JSON.parse(savedCompleted)));
      }

      const savedPasswordUnlocked = localStorage.getItem(STORAGE_KEY_PASSWORD_UNLOCKED);
      if (savedPasswordUnlocked) {
        setPasswordUnlockedUnits(new Set(JSON.parse(savedPasswordUnlocked)));
      }

      const savedUnitScores = localStorage.getItem(STORAGE_KEY_UNIT_SCORES);
      if (savedUnitScores) {
        setUnitScores(JSON.parse(savedUnitScores));
      }

      const savedUnit = localStorage.getItem(STORAGE_KEY_CURRENT_UNIT);
      const savedPage = localStorage.getItem(STORAGE_KEY_CURRENT_PAGE);
      if (savedUnit && savedPage) {
        setCurrentUnit(parseInt(savedUnit));
        setCurrentPage(savedPage as PageType);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  }, []);

  // Save completed units to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(Array.from(completedUnits)));
    } catch (error) {
      console.error('Error saving completed units:', error);
    }
  }, [completedUnits]);

  // Save password unlocked units to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PASSWORD_UNLOCKED, JSON.stringify(Array.from(passwordUnlockedUnits)));
    } catch (error) {
      console.error('Error saving password unlocked units:', error);
    }
  }, [passwordUnlockedUnits]);

  // Save unit scores to localStorage whenever it changes AND SYNC TO FIREBASE
  useEffect(() => {
    try {
      // 1. Simpan data di lokal HP anak terlebih dahulu
      localStorage.setItem(STORAGE_KEY_UNIT_SCORES, JSON.stringify(unitScores));
      
      // 2. AMBIL NAMA DARI DIALOG WELCOME PAGE
      const namaPelaut = localStorage.getItem('fiela_player_name') || 'Pelaut_Anonim';
      
      // 3. Buatkan kode unik pendek jika belum ada (agar nama yang sama tidak saling menimpa data)
      let shortId = localStorage.getItem(STORAGE_KEY_DEVICE_ID);
      if (!shortId) {
        shortId = Math.random().toString(36).substr(2, 5); // Hanya ambil 5 huruf/angka acak
        localStorage.setItem(STORAGE_KEY_DEVICE_ID, shortId);
      }

      // Gabungkan nama dan kode unik (Contoh hasil: Widi_x7y9a)
      const safeName = namaPelaut.trim().replace(/[^a-zA-Z0-9]/g, '_'); // Hilangkan spasi/simbol aneh
      const documentId = `${safeName}_${shortId}`;

      // 4. Kirim salinan data ke awan (Firestore)
      if (Object.keys(unitScores).length > 0) {
        const sailorRef = doc(db, "pelaut_fiela", documentId);
        
        setDoc(sailorRef, {
          nama_pelaut: namaPelaut, // Nama asli tersimpan jelas di dalam data
          id_perangkat: documentId,
          waktu_terakhir_main: new Date().toISOString(),
          koleksi_skor: unitScores,
          pulau_selesai: Array.from(completedUnits)
        }, { merge: true }) 
        .then(() => console.log(`Data Kapten ${namaPelaut} berhasil berlayar ke awan! ☁️`))
        .catch(err => console.error("Badai! Gagal mengirim ke awan:", err));
      }

    } catch (error) {
      console.error('Error saving unit scores:', error);
    }
  }, [unitScores, completedUnits]); // Pantau juga completedUnits

  // Save current progress to localStorage
  useEffect(() => {
    try {
      if (currentUnit !== null) {
        localStorage.setItem(STORAGE_KEY_CURRENT_UNIT, currentUnit.toString());
      } else {
        localStorage.removeItem(STORAGE_KEY_CURRENT_UNIT);
      }
      
      if (currentPage !== null) {
        localStorage.setItem(STORAGE_KEY_CURRENT_PAGE, currentPage);
      } else {
        localStorage.removeItem(STORAGE_KEY_CURRENT_PAGE);
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [currentUnit, currentPage]);

  const handleSelectUnit = (unitId: number) => {
    setCurrentUnit(unitId);
    setCurrentPage('intro');
  };

  const handleReviewUnit = (unitId: number, page: PageType) => {
    setCurrentUnit(unitId);

    // If navigating to reward page, load the saved score (termasuk pronunciation)
    if (page === 'reward' && unitScores[unitId]) {
      setGameResults({
        wrongAnswers: [],
        score: unitScores[unitId].score,
        total: unitScores[unitId].total,
        pronunciationScore: unitScores[unitId].pronunciationScore || 0
      });
    }

    setCurrentPage(page);
  };

  const handlePasswordUnlock = (unitId: number) => {
    const newPasswordUnlocked = new Set(passwordUnlockedUnits);
    newPasswordUnlocked.add(unitId);
    setPasswordUnlockedUnits(newPasswordUnlocked);
  };

  const handleStartUnit = () => {
    setCurrentPage('story');
  };

  const handleStoryComplete = () => {
    setCurrentPage('review');
  };

  // UBAH: Sekarang menerima skor pelafalan dari ReviewPage dan menyimpannya!
  const handleReviewComplete = (pronunciationScore: number = 0) => {
    setGameResults(prev => ({ ...prev, pronunciationScore }));
    setCurrentPage('game');
  };

  // UBAH: Menggunakan "prev" agar pronunciationScore yang disimpan sebelumnya tidak hilang
  const handleGameComplete = (wrongAnswers: WrongAnswer[]) => {
    const unit = currentUnit ? units.find(u => u.id === currentUnit) : null;
    if (unit) {
      setGameResults(prev => ({
        ...prev, 
        wrongAnswers,
        score: unit.vocabulary.length - wrongAnswers.length,
        total: unit.vocabulary.length
      }));
    }
    setCurrentPage('reward');
  };

  const handleRewardContinue = () => {
    if (currentUnit) {
      const newCompleted = new Set(completedUnits);
      newCompleted.add(currentUnit);
      setCompletedUnits(newCompleted);

      // Hitung persentase kuis baru
      const percentage = gameResults.total > 0 ? (gameResults.score / gameResults.total) * 100 : 0;
      
      // Gunakan callback prevScores agar selalu membaca data paling mutakhir
      setUnitScores(prevScores => {
        const oldScoreData = prevScores[currentUnit];
        
        // Totalkan nilai kombo (Kuis + Pelafalan) dari sesi baru dan sesi lama
        const newTotalValue = percentage + (gameResults.pronunciationScore || 0);
        const oldTotalValue = oldScoreData ? (oldScoreData.percentage || 0) + (oldScoreData.pronunciationScore || 0) : -1;

        // SISTEM REKOR TERTINGGI: Hanya timpa jika skor baru BENAR-BENAR lebih tinggi
        if (newTotalValue > oldTotalValue) {
          return {
            ...prevScores,
            [currentUnit]: {
              unitId: currentUnit,
              score: gameResults.score,
              total: gameResults.total,
              percentage: percentage,
              pronunciationScore: gameResults.pronunciationScore
            }
          };
        }
        
        // Jika skor baru lebih rendah atau sama, ABAIKAN (Pertahankan rekor lama)
        return prevScores;
      });

      // Check if all units are completed
      if (newCompleted.size === units.length) {
        setShowCompletion(true);
      }

      setCurrentUnit(null);
      setCurrentPage(null);
    }
  };

  const handleRestart = () => {
    setShowCompletion(false);
    setCurrentUnit(null);
    setCurrentPage(null);
  };

  const handleGoHome = () => {
    setCurrentUnit(null);
    setCurrentPage(null);
  };

  const handleBackToWelcome = () => {
    setShowWelcome(true);
  };

  const unit = currentUnit ? units.find(u => u.id === currentUnit) : null;

  return (
    <div className="relative min-h-screen">
      <svg 
        className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.15] z-0" 
        viewBox="0 0 1440 900" 
        preserveAspectRatio="xMidYMid slice" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M-100 200 Q 300 400, 720 200 T 1540 300" fill="transparent" stroke="#451a03" strokeWidth="4" strokeDasharray="12 16" />
        <path d="M1540 700 Q 1100 500, 720 800 T -100 600" fill="transparent" stroke="#451a03" strokeWidth="4" strokeDasharray="12 16" />
      </svg>

      {!showWelcome && !showCompletion && <MenuDrawer pageKey={currentPage || 'home'} />}
      
      <AnimatePresence mode="wait">
      
      {showCompletion && (
        <motion.div key="completion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <CompletionPage onRestart={handleRestart} />
        </motion.div>
      )}

      {!showCompletion && showWelcome && (
        <motion.div key="welcome" initial={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}>
          <WelcomePage 
            onStart={() => {
              setShowWelcome(false);
              try {
                localStorage.setItem(STORAGE_KEY_WELCOME_SEEN, 'true');
              } catch (error) {
                console.error('Error saving welcome state:', error);
              }
            }} 
          />
        </motion.div>
      )}

      {!showCompletion && !showWelcome && (!currentUnit || !currentPage || !unit) && (
        <motion.div key="homepage" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }} exit={{ scale: 0.95, opacity: 0, transition: { duration: 0.3 } }}>
          <HomePage
            units={units}
            completedUnits={completedUnits}
            passwordUnlockedUnits={passwordUnlockedUnits}
            unitScores={unitScores}
            onSelectUnit={handleSelectUnit}
            onReviewUnit={handleReviewUnit}
            onPasswordUnlock={handlePasswordUnlock}
            onBackToWelcome={handleBackToWelcome}
          />
        </motion.div>
      )}

      {!showCompletion && !showWelcome && currentUnit && currentPage && unit && (
        <motion.div key={`expedition-${currentPage}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="min-h-screen">
          {currentPage === 'intro' && (
            <IntroPage unit={unit} onStart={handleStartUnit} onGoHome={handleGoHome} />
          )}
          
          {currentPage === 'story' && (
            <StoryScene
              scenes={unit.story}
              vocabulary={unit.vocabulary}
              onComplete={handleStoryComplete}
              unitId={unit.id}
              onGoHome={handleGoHome}
            />
          )}
          
          {currentPage === 'review' && (
            <ReviewPage
              vocabulary={unit.vocabulary}
              onComplete={handleReviewComplete}
              onGoHome={handleGoHome}
            />
          )}
          
          {currentPage === 'game' && (
            <MiniGamePage
              vocabulary={unit.vocabulary}
              gameType={unit.miniGame}
              onComplete={handleGameComplete}
              onGoHome={handleGoHome}
            />
          )}
          
          {currentPage === 'reward' && (
            <RewardPage
              unitNumber={unit.id}
              onContinue={handleRewardContinue}
              isLastUnit={unit.id === units.length}
              wrongAnswers={gameResults.wrongAnswers}
              score={gameResults.score}
              totalQuestions={gameResults.total}
              pronunciationScore={gameResults.pronunciationScore} // KINI MENGALIR DENGAN SEMPURNA!
              onGoHome={handleGoHome}
            />
          )}
        </motion.div>
      )}

      </AnimatePresence>
    </div>
  );
}