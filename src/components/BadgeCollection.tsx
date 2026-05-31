import { Crown, Trophy, Star, Gem, Zap, Medal, Target, Flame, BookOpen, Brain, Lock, Compass, Sparkles, Mic } from 'lucide-react';

interface BadgeCollectionProps {
  unitScores: Record<number, any>; // Menggunakan any agar bisa menampung percentage dan pronunciationScore
  totalUnits: number;
}

interface BadgeInfo {
  id: string;
  icon: any;
  label: string;
  color: string;
  bgColor: string;
  requirement: string;
}

const ATLAS_TREASURES: BadgeInfo[] = [
  // --- LENCANA EXPEDISI & KUIS ---
  { id: 'exp_1', icon: BookOpen, label: 'First Steps', requirement: 'Complete 1 Expedition', color: 'text-emerald-600', bgColor: 'from-emerald-100 to-green-100' },
  { id: 'exp_3', icon: Target, label: 'Avid Explorer', requirement: 'Complete 3 Expeditions', color: 'text-cyan-600', bgColor: 'from-cyan-100 to-blue-100' },
  { id: 'exp_5', icon: Trophy, label: 'Atlas Conqueror', requirement: 'Complete 5 Expeditions', color: 'text-amber-600', bgColor: 'from-amber-100 via-orange-100 to-yellow-100' },
  { id: 'score_70_1', icon: Flame, label: 'Spark of Knowledge', requirement: 'Score 70%+ in 1 Expedition', color: 'text-rose-600', bgColor: 'from-rose-100 to-red-100' },
  { id: 'score_80_2', icon: Medal, label: 'Silver Scholar', requirement: 'Score 80%+ in 2 Expeditions', color: 'text-slate-600', bgColor: 'from-slate-100 to-slate-200' },
  { id: 'score_90_3', icon: Star, label: 'Brilliant Star', requirement: 'Score 90%+ in 3 Expeditions', color: 'text-indigo-600', bgColor: 'from-indigo-100 to-blue-100' },
  { id: 'score_100_1', icon: Crown, label: 'Perfect Champion', requirement: 'Score 100% in 1 Expedition', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-amber-200' },
  { id: 'score_100_3', icon: Gem, label: 'Master Scholar', requirement: 'Score 100% in 3 Expeditions', color: 'text-fuchsia-600', bgColor: 'from-fuchsia-100 to-purple-100' },
  { id: 'score_90_5', icon: Brain, label: 'Sharp Mind', requirement: 'Score 90%+ in All 5 Expeditions', color: 'text-blue-700', bgColor: 'from-blue-100 to-indigo-100' },
  { id: 'score_100_5', icon: Zap, label: 'Flawless Legend', requirement: 'Score 100% in All 5 Expeditions', color: 'text-amber-700', bgColor: 'from-yellow-200 to-amber-200' },
  
  // --- LENCANA BARU: PRONUNCIATION (PELAFALAN) ---
  { id: 'pronun_bronze', icon: Mic, label: 'Brave Speaker', requirement: 'Complete a speaking practice', color: 'text-orange-700', bgColor: 'from-orange-100 to-amber-200' },
  { id: 'pronun_silver', icon: Mic, label: 'Silver Voice', requirement: 'Get 60%+ in Pronunciation', color: 'text-slate-500', bgColor: 'from-slate-100 to-slate-300' },
  { id: 'pronun_gold', icon: Mic, label: 'Golden Orator', requirement: 'Get 80%+ in Pronunciation', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-yellow-300' },
  { id: 'pronun_diamond', icon: Gem, label: 'Diamond Whisperer', requirement: 'Get 95%+ in Pronunciation', color: 'text-cyan-500', bgColor: 'from-cyan-100 to-blue-200' },
];

export function BadgeCollection({ unitScores, totalUnits }: BadgeCollectionProps) {
  const completedCount = Object.keys(unitScores).length;
  
  // Memisahkan nilai Quest (percentage) dan nilai Review (pronunciationScore)
  const scores = Object.values(unitScores).map((catatan: any) => catatan.percentage || 0);
  const pronunScores = Object.values(unitScores).map((catatan: any) => catatan.pronunciationScore || 0);
  
  const highestPronunScore = pronunScores.length > 0 ? Math.max(...pronunScores) : 0;
  
  const count70 = scores.filter(s => s >= 70).length;
  const count80 = scores.filter(s => s >= 80).length;
  const count90 = scores.filter(s => s >= 90).length;
  const count100 = scores.filter(s => s === 100).length;

  const earnedIds = new Set<string>();

  // Evaluasi Lencana Quest/Expedition
  if (completedCount >= 1) earnedIds.add('exp_1');
  if (completedCount >= 3) earnedIds.add('exp_3');
  if (completedCount >= 5) earnedIds.add('exp_5');

  if (count70 >= 1) earnedIds.add('score_70_1');
  if (count80 >= 2) earnedIds.add('score_80_2');
  if (count90 >= 3) earnedIds.add('score_90_3');
  if (count100 >= 1) earnedIds.add('score_100_1');
  if (count100 >= 3) earnedIds.add('score_100_3');
  if (count90 >= 5) earnedIds.add('score_90_5');
  if (count100 >= 5) earnedIds.add('score_100_5');

  // Evaluasi Lencana Pronunciation (Skor Tertinggi yang Pernah Dicapai)
  if (highestPronunScore > 0) earnedIds.add('pronun_bronze');
  if (highestPronunScore >= 60) earnedIds.add('pronun_silver');
  if (highestPronunScore >= 80) earnedIds.add('pronun_gold');
  if (highestPronunScore >= 95) earnedIds.add('pronun_diamond');

  const earnedBadges = ATLAS_TREASURES.filter(b => earnedIds.has(b.id));
  const lockedBadges = ATLAS_TREASURES.filter(b => !earnedIds.has(b.id));

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#fffbf0] via-[#fff4d6] to-[#fde6b3] rounded-[2rem] shadow-2xl p-4 sm:p-6 md:p-6 border-4 border-amber-300 relative flex flex-col lg:flex-row gap-5 lg:gap-8">
      
      <div className="absolute inset-0 opacity-[0.25] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='40' height='40' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />

      {/* ========================================== */}
      {/* KOLOM KIRI: INFO & STATISTIK               */}
      {/* ========================================== */}
      <div className="flex-1 lg:w-[30%] flex flex-col gap-4 relative z-10 lg:sticky lg:top-0 h-fit border-b-4 border-amber-200/50 lg:border-none pb-5 lg:pb-0">
        
        <div className="flex items-center gap-3">
          <div className="bg-white p-2.5 rounded-full shadow-sm border-2 border-amber-200 shrink-0">
            <Trophy className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <h3 className="font-[Coiny] font-bold text-2xl tracking-wide text-amber-950 leading-none">Treasures</h3>
            <p className="text-amber-700 font-[Nunito] font-bold text-[11px] tracking-widest uppercase mt-1">Your Shiny Rewards</p>
          </div>
        </div>

        <div className="w-full bg-white/95 p-3 rounded-2xl border-2 border-amber-200 shadow-sm">
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-[11px] text-amber-800 font-bold uppercase tracking-wider font-[Nunito]">Treasures Found</span>
            <span className="text-sm text-amber-950 font-bold font-[Coiny]">{earnedBadges.length}/{ATLAS_TREASURES.length}</span>
          </div>
          <div className="h-2.5 w-full bg-amber-100 rounded-full overflow-hidden shadow-inner border border-amber-200/50">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-1000 ease-out"
              style={{ width: `${(earnedBadges.length / ATLAS_TREASURES.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/95 rounded-2xl p-3 border-2 border-amber-200 shadow-sm text-center flex flex-col items-center justify-center">
            <BookOpen className="h-5 w-5 text-emerald-500 mb-1" />
            <p className="text-xl font-bold text-amber-950 font-[Coiny] leading-none">{completedCount}<span className="text-xs text-amber-600/70">/{totalUnits}</span></p>
            <p className="text-[10px] text-amber-800 font-[Nunito] font-bold uppercase tracking-widest mt-1">Expeditions</p>
          </div>
          <div className="bg-white/95 rounded-2xl p-3 border-2 border-amber-200 shadow-sm text-center flex flex-col items-center justify-center">
            <Mic className="h-5 w-5 text-sky-500 mb-1" />
            <p className="text-xl font-bold text-amber-950 font-[Coiny] leading-none">{highestPronunScore > 0 ? highestPronunScore : '-'}<span className="text-xs text-sky-600/70">{highestPronunScore > 0 ? '%' : ''}</span></p>
            <p className="text-[10px] text-amber-800 font-[Nunito] font-bold uppercase tracking-widest mt-1">Best Voice</p>
          </div>
          <div className="bg-white/95 rounded-2xl p-3 border-2 border-amber-200 shadow-sm text-center flex flex-col items-center justify-center">
            <Crown className="h-5 w-5 text-yellow-500 mb-1" />
            <p className="text-xl font-bold text-amber-950 font-[Coiny] leading-none">{count100}</p>
            <p className="text-[10px] text-amber-800 font-[Nunito] font-bold uppercase tracking-widest mt-1">Perfects</p>
          </div>
          <div className="bg-white/95 rounded-2xl p-3 border-2 border-amber-200 shadow-sm text-center flex flex-col items-center justify-center">
            <Sparkles className="h-5 w-5 text-purple-500 mb-1" />
            <p className="text-xl font-bold text-amber-950 font-[Coiny] leading-none">{earnedBadges.length}</p>
            <p className="text-[10px] text-amber-800 font-[Nunito] font-bold uppercase tracking-widest mt-1">Treasures</p>
          </div>
        </div>

        {completedCount < totalUnits && (
          <div className="mt-auto bg-white/95 rounded-2xl p-3 border-2 border-amber-300 shadow-sm flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-full shrink-0">
              <Compass className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-[11px] sm:text-xs text-amber-900 font-[Nunito] font-bold leading-snug">
              {earnedBadges.length === 0 ? "Begin your expedition! The collection awaits." : 
               earnedBadges.length < 5 ? "Excellent! The compass points to more hidden rewards." : 
               count100 > 0 ? "Magnificent! Can you collect all the shiny gems?" : 
               "Seek perfect scores to unlock shiny artifacts!"}
            </p>
          </div>
        )}
      </div>

      {/* ========================================== */}
      {/* KOLOM KANAN: KOLEKSI LENCANA             */}
      {/* ========================================== */}
      <div className="flex-1 lg:w-[70%] flex flex-col gap-5 relative z-10 lg:border-l-4 lg:border-amber-200/50 lg:pl-6 pt-2 lg:pt-0">
        
        <div>
          <h4 className="mb-3 font-bold tracking-widest font-[Nunito] uppercase text-xs text-amber-700 flex items-center gap-3">
            <span className="h-0.5 bg-amber-300/60 flex-1 rounded-full"></span>
            🌟 Discovered Treasures
            <span className="h-0.5 bg-amber-300/60 flex-1 rounded-full"></span>
          </h4>
          
          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`bg-gradient-to-br ${badge.bgColor} rounded-xl p-3 border-2 border-white shadow-sm flex items-center gap-3 hover:-translate-y-1 hover:shadow-md transition-all duration-200`}
                >
                  <div className="bg-white/90 p-2 rounded-full shadow-sm shrink-0">
                    <badge.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${badge.color}`} />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-[12px] sm:text-[13px] font-bold text-amber-950 font-[Fredoka] uppercase tracking-wide leading-tight break-words">{badge.label}</p>
                    <p className="text-[10px] text-amber-800/90 font-[Nunito] font-bold leading-tight mt-0.5 break-words">{badge.requirement}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-white/70 rounded-2xl border-2 border-amber-200 shadow-inner border-dashed">
              <div className="text-4xl mb-2 opacity-60">🗺️</div>
              <p className="text-amber-900 mb-1 font-[Coiny] font-bold text-lg leading-none">No treasures yet!</p>
              <p className="text-xs text-amber-800/80 font-[Nunito] font-bold">Complete expeditions to claim shiny rewards.</p>
            </div>
          )}
        </div>

        {lockedBadges.length > 0 && (
          <div className="pt-1">
            <h4 className="mb-3 font-bold tracking-widest font-[Nunito] uppercase text-xs text-amber-700/60 flex items-center gap-3">
              <span className="h-0.5 bg-amber-300/40 flex-1 rounded-full"></span>
              Hidden Treasures ({lockedBadges.length})
              <span className="h-0.5 bg-amber-300/40 flex-1 rounded-full"></span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
              {lockedBadges.map((badge) => (
                <div 
                  key={badge.id} 
                  className="bg-amber-100/40 rounded-xl p-3 border-2 border-dashed border-amber-400/80 flex items-center gap-3 opacity-70 grayscale-[30%]"
                >
                  <div className="bg-amber-200/50 p-2 rounded-full shrink-0">
                    <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600/50" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-[12px] sm:text-[13px] font-bold text-amber-700 font-[Fredoka] uppercase tracking-wide leading-tight break-words">Secret Relic</p>
                    <p className="text-[10px] text-amber-700/80 font-[Nunito] font-bold leading-tight mt-0.5 break-words">{badge.requirement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}