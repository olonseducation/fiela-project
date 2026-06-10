import { Crown, Trophy, Star, Gem, Zap, Medal, Target, Flame, BookOpen, Brain, Lock, Compass, Mic, Map } from 'lucide-react';

interface BadgeCollectionProps {
  unitScores: Record<number, any>; 
  totalUnits: number;
}

interface BadgeInfo {
  id: string;
  icon: any;
  label: string;
  color: string;
  bgColor: string;
  requirement: string;
  tier: number; 
}

const ATLAS_TREASURES: BadgeInfo[] = [
  // --- LENCANA EXPEDISI & KUIS ---
  { id: 'exp_1', tier: 1, icon: BookOpen, label: 'First Steps', requirement: 'Complete 1 Expedition', color: 'text-emerald-600', bgColor: 'from-emerald-100 to-green-100' },
  { id: 'exp_3', tier: 2, icon: Target, label: 'Avid Explorer', requirement: 'Complete 3 Expeditions', color: 'text-cyan-600', bgColor: 'from-cyan-100 to-blue-100' },
  { id: 'exp_5', tier: 3, icon: Trophy, label: 'Atlas Conqueror', requirement: 'Complete 5 Expeditions', color: 'text-amber-600', bgColor: 'from-amber-100 via-orange-100 to-yellow-100' },
  
  { id: 'score_70_1', tier: 1, icon: Flame, label: 'Spark of Knowledge', requirement: 'Score 70%+ in 1 Expedition', color: 'text-rose-600', bgColor: 'from-rose-100 to-red-100' },
  { id: 'score_80_2', tier: 2, icon: Medal, label: 'Silver Scholar', requirement: 'Score 80%+ in 2 Expeditions', color: 'text-slate-600', bgColor: 'from-slate-100 to-slate-200' },
  { id: 'score_90_3', tier: 2, icon: Star, label: 'Brilliant Star', requirement: 'Score 90%+ in 3 Expeditions', color: 'text-indigo-600', bgColor: 'from-indigo-100 to-blue-100' },
  { id: 'score_100_1', tier: 2, icon: Crown, label: 'Perfect Champion', requirement: 'Score 100% in 1 Expedition', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-amber-200' },
  { id: 'score_100_3', tier: 3, icon: Gem, label: 'Master Scholar', requirement: 'Score 100% in 3 Expeditions', color: 'text-fuchsia-600', bgColor: 'from-fuchsia-100 to-purple-100' },
  { id: 'score_90_5', tier: 3, icon: Brain, label: 'Sharp Mind', requirement: 'Score 90%+ in All 5 Expeditions', color: 'text-blue-700', bgColor: 'from-blue-100 to-indigo-100' },
  { id: 'score_100_5', tier: 3, icon: Zap, label: 'Flawless Legend', requirement: 'Score 100% in All 5 Expeditions', color: 'text-amber-700', bgColor: 'from-yellow-200 to-amber-200' },
  
  // --- LENCANA BARU: PRONUNCIATION (PELAFALAN) ---
  { id: 'pronun_bronze', tier: 1, icon: Mic, label: 'Brave Speaker', requirement: 'Complete a speaking practice', color: 'text-orange-700', bgColor: 'from-orange-100 to-amber-200' },
  { id: 'pronun_silver', tier: 1, icon: Mic, label: 'Silver Voice', requirement: 'Get 60%+ in Pronunciation', color: 'text-slate-500', bgColor: 'from-slate-100 to-slate-300' },
  { id: 'pronun_gold', tier: 2, icon: Mic, label: 'Golden Orator', requirement: 'Get 80%+ in Pronunciation', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-yellow-300' },
  { id: 'pronun_diamond', tier: 3, icon: Gem, label: 'Diamond Whisperer', requirement: 'Get 95%+ in Pronunciation', color: 'text-cyan-500', bgColor: 'from-cyan-100 to-blue-200' },
];

export function BadgeCollection({ unitScores, totalUnits }: BadgeCollectionProps) {
  const completedCount = Object.keys(unitScores).length;
  
  const scores = Object.values(unitScores).map((catatan: any) => catatan.percentage || 0);
  const pronunScores = Object.values(unitScores).map((catatan: any) => catatan.pronunciationScore || 0);
  
  const totalQuizScore = scores.reduce((sum, s) => sum + s, 0);
  const totalVoiceScore = pronunScores.reduce((sum, s) => sum + s, 0);
  const currentTotalScore = totalQuizScore + totalVoiceScore;
  const maxPossibleScore = totalUnits * 200; 

  const highestPronunScore = pronunScores.length > 0 ? Math.max(...pronunScores) : 0;
  
  const totalWordsLearned = Object.values(unitScores).reduce((sum, catatan: any) => sum + (catatan.score || 0), 0);
  const avgQuizScore = completedCount > 0 ? Math.round(totalQuizScore / completedCount) : 0;
  
  const count70 = scores.filter(s => s >= 70).length;
  const count80 = scores.filter(s => s >= 80).length;
  const count90 = scores.filter(s => s >= 90).length;
  const count100 = scores.filter(s => s === 100).length;

  const earnedIds = new Set<string>();

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

  if (highestPronunScore > 0) earnedIds.add('pronun_bronze');
  if (highestPronunScore >= 60) earnedIds.add('pronun_silver');
  if (highestPronunScore >= 80) earnedIds.add('pronun_gold');
  if (highestPronunScore >= 95) earnedIds.add('pronun_diamond');

  // 🔮 FUNGSI PENGURUTAN (SORTING) BERDASARKAN TIER (Tertinggi ke Terendah)
  const earnedBadges = ATLAS_TREASURES.filter(b => earnedIds.has(b.id)).sort((a, b) => b.tier - a.tier);
  const lockedBadges = ATLAS_TREASURES.filter(b => !earnedIds.has(b.id)).sort((a, b) => b.tier - a.tier);

  return (
    // 🔮 TEMA RUANG HARTA GELAP (Dark Vault Theme) untuk kontras maksimal
    <div className="w-full max-h-[85vh] overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#1c0d04] via-[#3a1604] to-[#120600] rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.8)] p-5 sm:p-6 md:p-8 pb-10 sm:pb-12 border-4 border-[#5a2400] relative flex flex-col lg:flex-row items-stretch">
      
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='40' height='40' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />

      {/* ========================================== */}
      {/* KOLOM KIRI: INFO & STATISTIK               */}
      {/* ========================================== */}
      <div className="flex-1 lg:w-[35%] flex flex-col gap-5 relative z-10 lg:sticky lg:top-0 h-fit pb-6 lg:pb-0">
        
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-full shadow-lg border-2 border-amber-300 shrink-0">
            <Trophy className="h-7 w-7 text-amber-50" />
          </div>
          <div>
            <h3 className="font-[Coiny] font-bold text-3xl tracking-wide text-amber-100 leading-none drop-shadow-md">Treasures</h3>
            <p className="text-amber-500 font-[Nunito] font-bold text-[12px] tracking-widest uppercase mt-1">Your Shiny Rewards</p>
          </div>
        </div>

        <div className="w-full bg-black/40 p-5 rounded-2xl border border-amber-900/60 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          
          <div className="mb-4 pb-4 border-b-2 border-dashed border-amber-900/60 relative z-10">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[11px] text-amber-500/80 font-bold uppercase tracking-wider font-[Nunito]">Total Quest Score</span>
              <span className="text-amber-300 font-[Coiny] text-xl leading-none">{currentTotalScore} <span className="text-xs text-amber-600/50">/ {maxPossibleScore}</span></span>
            </div>
            <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden shadow-inner border border-amber-900/50">
              <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-1000" style={{ width: `${(currentTotalScore / maxPossibleScore) * 100}%` }} />
            </div>
          </div>

          <div className="flex justify-between items-end mb-1.5 relative z-10">
            <span className="text-[11px] text-amber-500/80 font-bold uppercase tracking-wider font-[Nunito]">Treasures Found</span>
            <span className="text-sm text-amber-300 font-bold font-[Coiny]">{earnedBadges.length}/{ATLAS_TREASURES.length}</span>
          </div>
          <div className="h-2.5 w-full bg-black/50 rounded-full overflow-hidden shadow-inner border border-amber-900/50 relative z-10">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-1000 ease-out"
              style={{ width: `${(earnedBadges.length / ATLAS_TREASURES.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/30 rounded-2xl p-4 border border-amber-900/50 shadow-inner text-center flex flex-col items-center justify-center">
            <Map className="h-6 w-6 text-emerald-400 mb-1.5" />
            <p className="text-2xl font-bold text-amber-100 font-[Coiny] leading-none">{completedCount}<span className="text-xs text-amber-600/60">/{totalUnits}</span></p>
            <p className="text-[10px] text-amber-600 font-[Nunito] font-bold uppercase tracking-widest mt-1">Expeditions</p>
          </div>
          <div className="bg-black/30 rounded-2xl p-4 border border-amber-900/50 shadow-inner text-center flex flex-col items-center justify-center">
            <Target className="h-6 w-6 text-purple-400 mb-1.5" />
            <p className="text-2xl font-bold text-amber-100 font-[Coiny] leading-none">{avgQuizScore > 0 ? avgQuizScore : '-'}</p>
            <p className="text-[10px] text-amber-600 font-[Nunito] font-bold uppercase tracking-widest mt-1">Avg. Quiz</p>
          </div>
          <div className="bg-black/30 rounded-2xl p-4 border border-amber-900/50 shadow-inner text-center flex flex-col items-center justify-center">
            <Mic className="h-6 w-6 text-sky-400 mb-1.5" />
            <p className="text-2xl font-bold text-amber-100 font-[Coiny] leading-none">{highestPronunScore > 0 ? highestPronunScore : '-'}</p>
            <p className="text-[10px] text-amber-600 font-[Nunito] font-bold uppercase tracking-widest mt-1">Best Voice</p>
          </div>
          <div className="bg-black/30 rounded-2xl p-4 border border-amber-900/50 shadow-inner text-center flex flex-col items-center justify-center">
            <BookOpen className="h-6 w-6 text-rose-400 mb-1.5" />
            <p className="text-2xl font-bold text-amber-100 font-[Coiny] leading-none">{totalWordsLearned}</p>
            <p className="text-[10px] text-amber-600 font-[Nunito] font-bold uppercase tracking-widest mt-1">Words Found</p>
          </div>
        </div>

        {completedCount < totalUnits && (
          <div className="mt-auto bg-black/40 rounded-2xl p-4 border border-amber-600/50 shadow-inner flex items-center gap-3">
            <div className="bg-amber-900/50 p-2.5 rounded-full shrink-0">
              <Compass className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-xs sm:text-sm text-amber-200/90 font-[Nunito] font-bold leading-snug">
              {earnedBadges.length === 0 ? "Begin your expedition! The collection awaits." : 
               earnedBadges.length < 5 ? "Excellent! The compass points to more hidden rewards." : 
               count100 > 0 ? "Magnificent! Can you collect all the shiny gems?" : 
               "Seek perfect scores to unlock shiny artifacts!"}
            </p>
          </div>
        )}
      </div>

      {/* 🔮 GARIS PEMISAH VERTIKAL (Hanya muncul di Desktop) */}
      <div className="hidden lg:block w-1 bg-amber-900/40 shrink-0 mx-6 rounded-full" />
      
      {/* 🔮 GARIS PEMISAH HORIZONTAL (Hanya muncul di HP) */}
      <div className="block lg:hidden h-1 w-full bg-amber-900/40 shrink-0 my-2 rounded-full" />

      {/* ========================================== */}
      {/* KOLOM KANAN: KOLEKSI LENCANA               */}
      {/* ========================================== */}
      <div className="flex-1 lg:w-[65%] flex flex-col gap-6 relative z-10 pt-2 lg:pt-0">
        
        <div>
          <h4 className="mb-4 font-bold tracking-widest font-[Nunito] uppercase text-xs text-amber-500/80 flex items-center gap-3">
            <span className="h-0.5 bg-amber-700/40 flex-1 rounded-full"></span>
            🌟 Discovered Treasures
            <span className="h-0.5 bg-amber-700/40 flex-1 rounded-full"></span>
          </h4>
          
          {earnedBadges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {earnedBadges.map((badge) => {
                const isTier3 = badge.tier === 3;
                const isTier2 = badge.tier === 2;

                return (
                  <div
                    key={badge.id}
                    className={`relative bg-gradient-to-br ${badge.bgColor} rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                      isTier3 ? 'border-[3px] border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.6)] z-10' :
                      isTier2 ? 'border-2 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]' :
                      'border-2 border-white shadow-sm opacity-95'
                    }`}
                  >
                    {isTier3 && <div className="absolute inset-0 bg-white/30 animate-pulse pointer-events-none" />}

                    <div className={`p-2.5 sm:p-3 rounded-full shrink-0 relative z-10 ${
                      isTier3 ? 'bg-gradient-to-br from-yellow-100 to-amber-300 shadow-md' : 
                      isTier2 ? 'bg-white/95 shadow-sm' : 
                      'bg-white/80'
                    }`}>
                      <badge.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${badge.color} ${isTier3 ? 'drop-shadow-sm' : ''}`} />
                    </div>
                    
                    <div className="text-left flex-1 min-w-0 relative z-10">
                      <p className={`font-bold font-[Fredoka] uppercase tracking-wide leading-tight break-words ${
                        isTier3 ? 'text-[14px] sm:text-[15px] text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' :
                        isTier2 ? 'text-[13px] sm:text-[14px] text-amber-950' :
                        'text-[12px] sm:text-[13px] text-amber-900/90'
                      }`}>
                        {badge.label}
                      </p>
                      <p className={`font-[Nunito] font-bold leading-tight mt-1 break-words ${
                        isTier3 ? 'text-[11px] sm:text-[12px] text-amber-800' : 'text-[10px] sm:text-[11px] text-amber-800/80'
                      }`}>
                        {badge.requirement}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 bg-black/30 rounded-2xl border-2 border-amber-900/50 shadow-inner border-dashed">
              <div className="text-5xl mb-3 opacity-40">🗺️</div>
              <p className="text-amber-200 mb-1 font-[Coiny] font-bold text-xl leading-none">No treasures yet!</p>
              <p className="text-sm text-amber-500/80 font-[Nunito] font-bold">Complete expeditions to claim shiny rewards.</p>
            </div>
          )}
        </div>

        {lockedBadges.length > 0 && (
          <div className="pt-2">
            <h4 className="mb-4 font-bold tracking-widest font-[Nunito] uppercase text-xs text-amber-700/60 flex items-center gap-3">
              <span className="h-0.5 bg-amber-800/40 flex-1 rounded-full"></span>
              Hidden Treasures ({lockedBadges.length})
              <span className="h-0.5 bg-amber-800/40 flex-1 rounded-full"></span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
              {lockedBadges.map((badge) => (
                <div 
                  key={badge.id} 
                  className="bg-black/30 rounded-xl p-3 border-2 border-dashed border-amber-900/60 flex items-center gap-3 opacity-60 grayscale-[50%]"
                >
                  <div className="bg-black/40 p-2.5 rounded-full shrink-0">
                    <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-700" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-[12px] sm:text-[13px] font-bold text-amber-600 font-[Fredoka] uppercase tracking-wide leading-tight break-words">Secret Relic</p>
                    <p className="text-[10px] text-amber-700/60 font-[Nunito] font-bold leading-tight mt-0.5 break-words">{badge.requirement}</p>
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