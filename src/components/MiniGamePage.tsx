import { useState, useEffect } from 'react';
import type { VocabularyWord, MiniGameType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Trophy, Home } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getSmartDistractors } from '../utils/vocabularyCategories';

interface MiniGamePageProps {
  vocabulary: VocabularyWord[];
  gameType: MiniGameType;
  onComplete: (wrongAnswers: WrongAnswer[]) => void;
  onGoHome: () => void;
}

export interface WrongAnswer {
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  word: VocabularyWord;
}

export function MiniGamePage({ vocabulary, gameType, onComplete, onGoHome }: MiniGamePageProps) {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  
  const [shuffledOptions, setShuffledOptions] = useState<any[]>([]);

  const totalQuestions = vocabulary.length;
  
  useEffect(() => {
    const word = vocabulary[currentQuestion];
    const otherWords = getSmartDistractors(word, vocabulary, 2);
    
    if (gameType === 'matching') {
      const allWords = [word, ...otherWords].sort(() => Math.random() - 0.5);
      setShuffledOptions(allWords);
    } else if (gameType === 'fillBlank') {
      const options = [word.word, ...otherWords.map(w => w.word)].sort(() => Math.random() - 0.5);
      setShuffledOptions(options);
    } else if (gameType === 'quiz') {
      const options = [word.definition, ...otherWords.map(w => w.definition)].sort(() => Math.random() - 0.5);
      setShuffledOptions(options);
    }
  }, [currentQuestion, vocabulary, gameType]);

  const renderMatchingGame = () => {
    const word = vocabulary[currentQuestion];
    const allWords = shuffledOptions as VocabularyWord[];
    
    if (allWords.length === 0) return null;

    const handleAnswer = (selectedWord: VocabularyWord) => {
      setSelectedAnswer(selectedWord.definition);
      const correct = selectedWord.definition === word.definition;
      setIsCorrect(correct);
      setShowFeedback(true);

      let currentWrongAnswers = wrongAnswers;

      if (correct) {
        setScore(score + 1);
        soundEffects.correct();
      } else {
        soundEffects.incorrect();
        const newWrongAnswer = {
          question: `Match the word with its definition: "${word.word}"`,
          yourAnswer: selectedWord.definition,
          correctAnswer: word.definition,
          word: word
        };
        currentWrongAnswers = [...wrongAnswers, newWrongAnswer];
        setWrongAnswers(currentWrongAnswers);
      }

      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          soundEffects.success();
          setTimeout(() => onComplete(currentWrongAnswers), 1000);
        }
      }, 1500);
    };

    return (
      <div className="space-y-4 md:space-y-6 relative z-10 w-full">
        <div className="bg-gradient-to-br from-[#e4e9cd] to-[#cdd5a0] rounded-xl p-4 sm:p-5 md:p-8 text-center border-2 border-[#829054] shadow-md">
          <p className="text-[#4a572c] mb-1 sm:mb-2 font-[Fredoka] font-bold text-[11px] sm:text-xs md:text-xl tracking-widest uppercase opacity-90">
            Match the word with its meaning:
          </p>
          <h2 className="text-[#2b3319] font-[Fredoka] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight inline-flex items-center justify-center relative">
            <span>{word.word}</span>
            <AnimatePresence>
              {showFeedback && (
                <motion.span
                  initial={{ scale: 0.5, opacity: 0, x: -10 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute -right-10 sm:-right-14"
                >
                  {isCorrect ? (
                    <Check className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500 stroke-[4] drop-shadow-md" />
                  ) : (
                    <X className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 stroke-[4] drop-shadow-md" />
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {allWords.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: selectedAnswer === option.definition ? 1.02 : 1, transition: { delay: index * 0.1 } }}
              whileHover={!showFeedback ? { scale: 1.03, y: -4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } : {}}
              whileTap={!showFeedback ? { scale: 0.97 } : {}}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={`w-full flex flex-col items-center p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-colors duration-150 ${
                selectedAnswer === option.definition
                  ? isCorrect
                    ? 'border-green-600 bg-green-100 shadow-md'
                    : 'border-red-600 bg-red-100 shadow-md'
                  : `border-orange-700/30 bg-white ${!showFeedback ? 'hover:bg-orange-100 hover:border-orange-500' : ''}`
              }`}
            >
              {option.image && (
                <div className="w-full mb-2 sm:mb-3 md:mb-4 rounded-lg overflow-hidden border border-orange-900/10 shadow-sm bg-white pointer-events-none">
                  <ImageWithFallback
                    src={option.image}
                    alt={option.word}
                    className="w-full h-auto block"
                  />
                </div>
              )}
              <p className={`w-full text-sm sm:text-base md:text-lg text-center font-[Nunito] font-bold leading-snug pointer-events-none transition-colors duration-150 ${
                selectedAnswer === option.definition
                  ? isCorrect ? 'text-green-900' : 'text-red-900'
                  : 'text-amber-950'
              }`}>
                {option.definition}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  const renderFillBlankGame = () => {
    const word = vocabulary[currentQuestion];
    const sentence = word.example;
    const wordToBlank = word.word;
    
    const blankedSentence = sentence.replace(
      new RegExp(wordToBlank, 'gi'),
      '_______'
    );

    const options = shuffledOptions as string[];

    const handleAnswer = (answer: string) => {
      setSelectedAnswer(answer);
      const correct = answer.toLowerCase() === wordToBlank.toLowerCase();
      setIsCorrect(correct);
      setShowFeedback(true);

      let currentWrongAnswers = wrongAnswers;

      if (correct) {
        setScore(score + 1);
        soundEffects.correct();
      } else {
        soundEffects.incorrect();
        const newWrongAnswer = {
          question: `Fill in the blank: "${blankedSentence}"`,
          yourAnswer: answer,
          correctAnswer: wordToBlank,
          word: word
        };
        currentWrongAnswers = [...wrongAnswers, newWrongAnswer];
        setWrongAnswers(currentWrongAnswers);
      }

      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          soundEffects.success();
          setTimeout(() => onComplete(currentWrongAnswers), 1000);
        }
      }, 1500);
    };

    return (
      <div className="space-y-4 md:space-y-6 relative z-10 w-full">
        <div className="bg-gradient-to-br from-[#e4e9cd] to-[#cdd5a0] rounded-xl p-4 sm:p-5 md:p-8 border-2 border-[#829054] shadow-md text-center md:text-left">
          <p className="text-[#4a572c] mb-1 sm:mb-2 font-[Fredoka] font-bold text-[11px] sm:text-xs md:text-sm tracking-widest uppercase opacity-90">
            Complete the passage:
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-[#2b3319] leading-relaxed font-[Nunito] font-bold inline-block relative pr-10 sm:pr-14">
            <span>{blankedSentence}</span>
            <AnimatePresence>
              {showFeedback && (
                <motion.span
                  initial={{ scale: 0.5, opacity: 0, x: -10 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                >
                  {isCorrect ? (
                    <Check className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500 stroke-[4] drop-shadow-md" />
                  ) : (
                    <X className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 stroke-[4] drop-shadow-md" />
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {options.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: selectedAnswer === option ? 1.02 : 1, transition: { delay: index * 0.1 } }}
              whileHover={!showFeedback ? { scale: 1.03, y: -4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } : {}}
              whileTap={!showFeedback ? { scale: 0.97 } : {}}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={`p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-colors duration-150 font-[Fredoka] text-base sm:text-lg md:text-xl font-medium tracking-wide flex items-center justify-center gap-2 ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'border-green-600 bg-green-100 text-green-900 shadow-md'
                    : 'border-red-600 bg-red-100 text-red-900 shadow-md'
                  : `border-orange-700/30 bg-white text-amber-950 ${!showFeedback ? 'hover:bg-orange-100 hover:border-orange-500' : ''}`
              }`}
            >
              <span>{option}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  const renderQuizGame = () => {
    const word = vocabulary[currentQuestion];
    
    const questions = [
      {
        question: `What does "${word.word}" mean?`,
        correctAnswer: word.definition,
        type: 'definition'
      }
    ];

    const currentQ = questions[0];
    const options = shuffledOptions as string[];

    const handleAnswer = (answer: string) => {
      setSelectedAnswer(answer);
      const correct = answer === currentQ.correctAnswer;
      setIsCorrect(correct);
      setShowFeedback(true);

      let currentWrongAnswers = wrongAnswers;

      if (correct) {
        setScore(score + 1);
        soundEffects.correct();
      } else {
        soundEffects.incorrect();
        const newWrongAnswer = {
          question: currentQ.question,
          yourAnswer: answer,
          correctAnswer: currentQ.correctAnswer,
          word: word
        };
        currentWrongAnswers = [...wrongAnswers, newWrongAnswer];
        setWrongAnswers(currentWrongAnswers);
      }

      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          soundEffects.success();
          setTimeout(() => onComplete(currentWrongAnswers), 1000);
        }
      }, 1500);
    };

    return (
      <div className="space-y-4 md:space-y-6 relative z-10 w-full">
        <div className="bg-gradient-to-br from-[#e4e9cd] to-[#cdd5a0] rounded-xl p-4 sm:p-5 md:p-8 text-center border-2 border-[#829054] shadow-md">
          <p className="text-lg sm:text-xl md:text-2xl text-[#2b3319] font-[Nunito] font-bold inline-block relative pr-10 sm:pr-14">
            <span>{currentQ.question}</span>
            <AnimatePresence>
              {showFeedback && (
                <motion.span
                  initial={{ scale: 0.5, opacity: 0, x: -10 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                >
                  {isCorrect ? (
                    <Check className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-500 stroke-[4] drop-shadow-md" />
                  ) : (
                    <X className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 stroke-[4] drop-shadow-md" />
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {options.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, scale: selectedAnswer === option ? 1.01 : 1, transition: { delay: index * 0.1 } }}
              whileHover={!showFeedback ? { scale: 1.02, x: 4, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={`w-full p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-colors duration-150 text-left font-[Nunito] text-sm sm:text-base md:text-lg font-bold flex items-center justify-between gap-3 ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'border-green-600 bg-green-100 text-green-900 shadow-md'
                    : 'border-red-600 bg-red-100 text-red-900 shadow-md'
                  : `border-orange-700/30 bg-white text-amber-950 ${!showFeedback ? 'hover:bg-orange-100 hover:border-orange-500' : ''}`
              }`}
            >
              <span>{option}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fba979] via-[#fbe18d] to-[#e8dec9] p-4 sm:p-6 md:p-8 relative overflow-hidden flex flex-col justify-center items-center">
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="absolute top-4 left-4 z-50"
      >
        <motion.button
          onClick={() => {
            soundEffects.buttonHome();
            onGoHome();
          }}
          initial="normal"
          animate="normal"
          whileHover="diHover" 
          whileTap="diKlik"
          
          variants={{
            normal: { 
              backgroundColor: '#faf6f1', 
              color: '#9e6300', 
              borderColor: '#ffb63d', 
              borderRadius: '50%',
              scale: 1,
            },
            diHover: { 
              scale: 1.15, 
              backgroundColor: '#ffb63d', 
              color: '#FAF6F1',
              borderColor: '#9e6300',
              borderRadius: '12px',
              // KUNCI SNAPPY 1: Stiffness dinaikkan drastis ke 400 agar sangat cepat melesat
              transition: { type: "spring", stiffness: 400, damping: 15 }
            },
            diKlik: { 
              scale: 0.9 
            }
          }}
          className="rounded-full shadow-lg border-2 bg-[#faf6f1]/95 border-amber-700/30 text-#015A84 backdrop-blur-sm flex flex-col items-center justify-center overflow-hidden p-2 sm:p-3 w-11 h-11 sm:w-15 sm:h-15 hover:h-14 hover:w-11 sm:hover:w-16 sm:hover:h-18 transition-all duration-75" // Durasi CSS dipercepat ke 75ms
        >
          {/* 1. Ikon Home */}
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
            <Home className="h-5 w-5 sm:h-7 sm:w-7" />
          </motion.span>
      
          {/* 2. Teks 'Home' */}
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
            Home
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Kontainer ditarik ke atas agar tidak ada ruang kosong dan diberi ukuran lebar yang konsisten */}
      <div className="max-w-3xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header dianimasikan agar memudar masuk dengan elegan di awal saja */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col sm:flex-row justify-between items-center mb-5 sm:mb-6 md:mb-8 gap-3 sm:gap-4"
        >
          <div className="text-center sm:text-left">
            <h2 className="text-orange-950 text-2xl sm:text-3xl md:text-4xl font-[Fredoka] font-bold tracking-wide drop-shadow-sm">🎯 Challenge Quest</h2>
            <p className="text-orange-900/90 font-[Nunito] font-bold text-sm sm:text-base md:text-xl mt-0.5 sm:mt-1">Challenge {currentQuestion + 1} of {totalQuestions}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 bg-[#faf6f1] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl shadow-md md:shadow-lg border-2 border-orange-700/30">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 drop-shadow-sm" />
            <span className="text-orange-950 font-[Fredoka] font-bold text-base sm:text-lg md:text-xl tracking-wide">Score: {score}/{totalQuestions}</span>
          </div>
        </motion.div>

        {/* Progress Bar dianimasikan sekali saja di awal */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full mb-5 sm:mb-6 md:mb-8"
        >
          <div className="h-3 sm:h-4 bg-orange-900/10 rounded-full overflow-hidden shadow-inner border border-orange-900/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 relative rounded-full"
              style={{ boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
            </motion.div>
          </div>
        </motion.div>

        {/* PANEL UTAMA DENGAN popLayout AGAR TIDAK SHIFTING */}
        <motion.div 
          className="w-full bg-[#faf6f1] rounded-3xl shadow-2xl shadow-orange-900/20 p-4 sm:p-6 md:p-10 border-4 border-white relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-2xl"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }}
          />
          
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center" // Memastikan konten di dalam merata
            >
              {gameType === 'matching' && renderMatchingGame()}
              {gameType === 'fillBlank' && renderFillBlankGame()}
              {gameType === 'quiz' && renderQuizGame()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}