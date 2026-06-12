import type { Unit } from '../types';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { BookOpen, Star, Sunrise, Users, GraduationCap, Utensils, TreePine, Home } from 'lucide-react';
import soundEffects from '../utils/soundEffects';
import { backgroundMusic } from '../utils/backgroundMusic';
import { useEffect } from 'react';

interface IntroPageProps {
  unit: Unit;
  onStart: () => void;
  onGoHome: () => void;
}

export function IntroPage({ unit, onStart, onGoHome }: IntroPageProps) {
  useEffect(() => {
    backgroundMusic.play(unit.id);
    return () => {};
  }, [unit.id]);

  const getUnitIcon = () => {
    switch (unit.id) {
      case 1: return <Sunrise className="h-10 w-10 md:h-14 md:w-14 text-amber-50" />;
      case 2: return <Users className="h-10 w-10 md:h-14 md:w-14 text-amber-50" />;
      case 3: return <GraduationCap className="h-10 w-10 md:h-14 md:w-14 text-amber-50" />;
      case 4: return <Utensils className="h-10 w-10 md:h-14 md:w-14 text-amber-50" />;
      case 5: return <TreePine className="h-10 w-10 md:h-14 md:w-14 text-amber-50" />;
      default: return <BookOpen className="h-10 w-10 md:h-14 md:w-14 text-amber-50" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d4bca1] via-[#c6a782] to-[#a37e58] flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      
      {/* Vintage map texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Decorative Dotted Map Trails */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 100 Q 200 300, 500 100 T 1200 400" fill="transparent" stroke="#451a03" strokeWidth="3" strokeDasharray="10 10" />
        <path d="M1200 800 Q 800 600, 600 900 T -100 700" fill="transparent" stroke="#451a03" strokeWidth="3" strokeDasharray="10 10" />
      </svg>

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
            soundEffects.buttonHome?.();
            onGoHome();
          }}
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


      {/* MENGUBAH LEBAR KARTU MENJADI LEBIH LEBAR (max-w-5xl) UNTUK MODE DUA KOLOM */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl w-full bg-[#fdf7ed] rounded-3xl shadow-[0_20px_50px_rgba(69,26,3,0.3)] p-6 sm:p-8 md:p-10 lg:p-12 border-4 border-amber-900/40 relative mt-12 sm:mt-0 z-10"
      >
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`
          }}
        />

        {/* GRID DUA KOLOM UNTUK DESKTOP, SATU KOLOM UNTUK MOBILE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10 mb-8 md:mb-10">
          
          {/* KOLOM KIRI: INFO & CERITA */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left justify-center">
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-4 md:mb-6"
            >
              <div className="bg-gradient-to-br from-amber-700 to-amber-950 rounded-full p-4 md:p-5 border-4 border-[#fdf7ed] shadow-[0_0_0_4px_rgba(120,53,15,0.3)] inline-block">
                {getUnitIcon()}
              </div>
            </motion.div>

            <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 mb-2">
              <Star className="h-5 w-5 md:h-6 md:w-6 text-amber-600 fill-amber-600 drop-shadow-sm" />
              {/* MENGGUNAKAN COINY UNTUK LABEL */}
              <span className="text-amber-900 font-[Coiny] text-base md:text-xl uppercase tracking-wider">
                Expedition {unit.id}
              </span>
              <Star className="h-5 w-5 md:h-6 md:w-6 text-amber-600 fill-amber-600 drop-shadow-sm" />
            </div>

            {/* MENGGUNAKAN COINY UNTUK JUDUL UTAMA */}
            <h1 className="text-amber-950 font-[Coiny] text-4xl sm:text-5xl lg:text-6xl mt-2 mb-3 tracking-wide drop-shadow-sm">
              {unit.title}
            </h1>
            
            <p className="text-lg lg:text-xl text-amber-800/90 font-[Nunito] font-bold italic mb-4">
              "{unit.theme}"
            </p>
            
            <p className="text-amber-950 font-[Nunito] font-bold text-base lg:text-lg leading-relaxed opacity-90 max-w-lg">
              {unit.description}
            </p>
          </div>

          {/* KOLOM KANAN: KOSAKATA (WORDS TO DISCOVER) */}
          <div className="flex flex-col justify-center h-full">
            <div className="bg-amber-100/50 rounded-3xl p-6 lg:p-8 border-2 border-amber-900/10 shadow-inner h-full flex flex-col justify-center">
              {/* MENGGUNAKAN COINY UNTUK HEADER KOSAKATA */}
              <p className="text-amber-950 mb-5 font-[Coiny] text-lg lg:text-xl text-center md:text-left tracking-wide">
                Words to discover:
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {unit.vocabulary.map((vocab, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-[#0a6f99] px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl text-amber-100 hover:text-amber-950 shadow-sm border-2 border-amber-300/90 font-[Nunito] font-extrabold text-base lg:text-lg transition-transform hover:-translate-y-1 hover:bg-emerald-200/80 cursor-default"
                  >
                    {vocab.word}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* TOMBOL LET'S GO (MEMBENTANG DI BAWAH) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, delay: 0.8 }}
          className="relative z-10 flex justify-center w-full"
        >
          <Button
            onClick={() => {
              soundEffects.buttonPlay?.();
              onStart();
            }}
            // MENGGUNAKAN COINY UNTUK TOMBOL
            className="w-full md:w-2/3 lg:w-1/2 bg-gradient-to-b from-red-600 via-red-700 to-red-900 hover:from-red-500 hover:via-red-600 hover:to-red-800 text-red-50 px-8 py-7 md:py-8 rounded-2xl shadow-xl shadow-red-900/30 font-[Coiny] text-2xl md:text-3xl tracking-wide border-b-4 border-black/40 transition-all active:border-b-0 active:translate-y-1 h-auto whitespace-normal"
          >
            🧭 Let's Go!
          </Button>
        </motion.div>
        
      </motion.div>
    </div>
  );
}