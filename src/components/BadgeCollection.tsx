import { Crown, Trophy, Gem, Target, BookOpen, Lock, Compass, Mic, Map, X,
         // 🌿 U1: Forest
         Leaf, TreePine, Wind, Bird, Volume2, 
         // 🏜️ U2: Desert
         Sun, Tent, AudioLines, Footprints, Eye, 
         // 🌊 U3: Ocean
         Waves, Fish, Shell, Anchor, Droplets, 
         // ⛰️ U4: Mountains
         Mountain, MountainSnow, Flag, Cloud, Feather, CloudLightning, 
         // 🏰 U5: Castle
         Shield, Sparkles, Bell, Megaphone
       } from 'lucide-react';

interface BadgeCollectionProps {
  unitScores: Record<number, any>; 
  totalUnits: number;
  onClose?: () => void; 
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

// 🗺️ PASPOR LENCANA REGIONAL FIELA (30 Lencana Tersedia)
const ATLAS_TREASURES: BadgeInfo[] = [
  // ==========================================
  // 🌿 EKSPEDISI 1: THE GREEN FOREST
  // ==========================================
  { id: 'u1_q1', tier: 1, icon: Leaf, label: 'Leaf Reader', requirement: '🌿 E1 • Quiz 70+', color: 'text-green-600', bgColor: 'from-green-50 to-lime-100' },
  { id: 'u1_q2', tier: 2, icon: TreePine, label: 'Forest Scholar', requirement: '🌿 E1 • Quiz 85+', color: 'text-emerald-700', bgColor: 'from-emerald-100 to-green-200' },
  { id: 'u1_q3', tier: 3, icon: Crown, label: 'Crown of the Woods', requirement: '🌿 E1 • Quiz 100', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-amber-200' },
  { id: 'u1_v1', tier: 1, icon: Wind, label: 'Woodland Whisper', requirement: '🌿 E1 • Voice 60+', color: 'text-green-600', bgColor: 'from-green-50 to-lime-100' },
  { id: 'u1_v2', tier: 2, icon: Bird, label: 'Jungle Caller', requirement: '🌿 E1 • Voice 80+', color: 'text-emerald-700', bgColor: 'from-emerald-100 to-green-200' },
  { id: 'u1_v3', tier: 3, icon: Volume2, label: 'Lion\'s Roar', requirement: '🌿 E1 • Voice 95+', color: 'text-amber-600', bgColor: 'from-orange-100 to-amber-300' },

  // ==========================================
  // 🏜️ EKSPEDISI 2: THE SANDY DESERT
  // ==========================================
  { id: 'u2_q1', tier: 1, icon: Sun, label: 'Sand Seeker', requirement: '🏜️ E2 • Quiz 70+', color: 'text-amber-700', bgColor: 'from-orange-50 to-amber-100' },
  { id: 'u2_q2', tier: 2, icon: Compass, label: 'Oasis Thinker', requirement: '🏜️ E2 • Quiz 85+', color: 'text-teal-700', bgColor: 'from-teal-100 to-cyan-200' },
  { id: 'u2_q3', tier: 3, icon: Tent, label: 'Pyramid Master', requirement: '🏜️ E2 • Quiz 100', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-amber-200' },
  { id: 'u2_v1', tier: 1, icon: AudioLines, label: 'Desert Echo', requirement: '🏜️ E2 • Voice 60+', color: 'text-orange-600', bgColor: 'from-orange-50 to-amber-100' },
  { id: 'u2_v2', tier: 2, icon: Footprints, label: 'Dune Speaker', requirement: '🏜️ E2 • Voice 80+', color: 'text-amber-700', bgColor: 'from-orange-100 to-amber-200' },
  { id: 'u2_v3', tier: 3, icon: Eye, label: 'Sphinx\'s Voice', requirement: '🏜️ E2 • Voice 95+', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-amber-200' },

  // ==========================================
  // 🌊 EKSPEDISI 3: THE DEEP OCEAN
  // ==========================================
  { id: 'u3_q1', tier: 1, icon: Waves, label: 'Tide Learner', requirement: '🌊 E3 • Quiz 70+', color: 'text-blue-600', bgColor: 'from-blue-50 to-cyan-100' },
  { id: 'u3_q2', tier: 2, icon: Fish, label: 'Coral Scholar', requirement: '🌊 E3 • Quiz 85+', color: 'text-rose-600', bgColor: 'from-rose-100 to-pink-200' },
  { id: 'u3_q3', tier: 3, icon: Gem, label: 'Pearl of Wisdom', requirement: '🌊 E3 • Quiz 100', color: 'text-slate-600', bgColor: 'from-slate-100 to-gray-200' },
  { id: 'u3_v1', tier: 1, icon: Shell, label: 'Seashell Murmur', requirement: '🌊 E3 • Voice 60+', color: 'text-teal-600', bgColor: 'from-teal-50 to-cyan-100' },
  { id: 'u3_v2', tier: 2, icon: Anchor, label: 'Wave Caller', requirement: '🌊 E3 • Voice 80+', color: 'text-blue-600', bgColor: 'from-blue-100 to-indigo-200' },
  { id: 'u3_v3', tier: 3, icon: Droplets, label: 'Dolphin\'s Pitch', requirement: '🌊 E3 • Voice 95+', color: 'text-cyan-600', bgColor: 'from-cyan-100 to-blue-200' },

  // ==========================================
  // ⛰️ EKSPEDISI 4: THE HIGH MOUNTAINS
  // ==========================================
  { id: 'u4_q1', tier: 1, icon: Mountain, label: 'Cliff Solver', requirement: '⛰️ E4 • Quiz 70+', color: 'text-slate-600', bgColor: 'from-slate-100 to-slate-300' },
  { id: 'u4_q2', tier: 2, icon: MountainSnow, label: 'Peak Thinker', requirement: '⛰️ E4 • Quiz 85+', color: 'text-indigo-600', bgColor: 'from-indigo-100 to-violet-200' },
  { id: 'u4_q3', tier: 3, icon: Flag, label: 'Summit Genius', requirement: '⛰️ E4 • Quiz 100', color: 'text-sky-700', bgColor: 'from-sky-100 to-blue-200' },
  { id: 'u4_v1', tier: 1, icon: Cloud, label: 'Wind Whisperer', requirement: '⛰️ E4 • Voice 60+', color: 'text-sky-600', bgColor: 'from-sky-50 to-blue-100' },
  { id: 'u4_v2', tier: 2, icon: Feather, label: 'Eagle\'s Call', requirement: '⛰️ E4 • Voice 80+', color: 'text-slate-700', bgColor: 'from-slate-200 to-gray-300' },
  { id: 'u4_v3', tier: 3, icon: CloudLightning, label: 'Thunder\'s Roar', requirement: '⛰️ E4 • Voice 95+', color: 'text-indigo-700', bgColor: 'from-indigo-200 to-violet-300' },

  // ==========================================
  // 🏰 EKSPEDISI 5: THE GRAND CASTLE
  // ==========================================
  { id: 'u5_q1', tier: 1, icon: Map, label: 'Map Keeper', requirement: '🏰 E5 • Quiz 70+', color: 'text-amber-800', bgColor: 'from-amber-100 to-orange-200' },
  { id: 'u5_q2', tier: 2, icon: Shield, label: 'Royal Scholar', requirement: '🏰 E5 • Quiz 85+', color: 'text-purple-700', bgColor: 'from-purple-100 to-indigo-200' },
  { id: 'u5_q3', tier: 3, icon: Sparkles, label: 'FIELA Legend', requirement: '🏰 E5 • Quiz 100', color: 'text-fuchsia-700', bgColor: 'from-fuchsia-100 to-purple-300' },
  { id: 'u5_v1', tier: 1, icon: Bell, label: 'Silver Herald', requirement: '🏰 E5 • Voice 60+', color: 'text-slate-500', bgColor: 'from-slate-100 to-slate-300' },
  { id: 'u5_v2', tier: 2, icon: Megaphone, label: 'Golden Orator', requirement: '🏰 E5 • Voice 80+', color: 'text-yellow-600', bgColor: 'from-yellow-100 to-yellow-300' },
  { id: 'u5_v3', tier: 3, icon: Trophy, label: 'Diamond Sovereign', requirement: '🏰 E5 • Voice 95+', color: 'text-cyan-400', bgColor: 'from-cyan-100 to-blue-100' },
];

export function BadgeCollection({ unitScores, totalUnits, onClose }: BadgeCollectionProps) {
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

  // 🔮 STATE BRANKAS EMAS LENCANA (SISTEM SEKALI SAPU - INDEPENDEN IF)
  const earnedIds = new Set<string>();

  Object.entries(unitScores).forEach(([unitKey, catatan]: [string, any]) => {
    const u = parseInt(unitKey);
    const quiz = Math.round(catatan.percentage || 0);
    const voice = Math.round(catatan.pronunciationScore || 0);

    // 🎯 Filter Lencana Kuis Kumulatif
    if (quiz >= 70) earnedIds.add(`u${u}_q1`);
    if (quiz >= 85) earnedIds.add(`u${u}_q2`);
    if (quiz === 100) earnedIds.add(`u${u}_q3`);

    // 🎙️ Filter Lencana Suara Kumulatif
    if (voice >= 60) earnedIds.add(`u${u}_v1`);
    if (voice >= 80) earnedIds.add(`u${u}_v2`);
    if (voice >= 95) earnedIds.add(`u${u}_v3`);
  });

  const earnedBadges = ATLAS_TREASURES.filter(b => earnedIds.has(b.id)).sort((a, b) => b.tier - a.tier);
  const lockedBadges = ATLAS_TREASURES.filter(b => !earnedIds.has(b.id)).sort((a, b) => b.tier - a.tier);

  return (
    <div className="w-full max-w-lg md:max-w-4xl lg:max-w-5xl mx-auto max-h-[85vh] bg-gradient-to-br from-[#1c0d04] via-[#3a1604] to-[#120600] rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.8)] border-4 border-[#5a2400] relative overflow-hidden flex flex-col">
      
      {/* 🔮 TOMBOL CLOSE */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-3 md:right-3 z-[100] bg-black/60 hover:bg-red-500 text-amber-500 hover:text-white p-1.5 md:p-2 rounded-full backdrop-blur-md transition-all duration-200 border-2 border-amber-900/50 hover:border-red-400 group shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          aria-label="Close"
        >
          <X className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* EFEK NOISE SVG */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='40' height='40' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")` }} />

      {/* WADAH SCROLLING */}
      <div className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-start">
        
        {/* KOLOM KIRI: INFO & STATISTIK */}
        <div className="w-full md:w-[40%] lg:w-[35%] flex flex-col gap-5 relative z-10 md:sticky md:top-0 h-fit md:pr-6 lg:pr-8 pt-2 md:pt-0">
          
          <div className="flex items-center gap-4 pr-10 md:pr-0">
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
                 earnedBadges.length < ATLAS_TREASURES.length ? "Excellent! The compass points to more hidden rewards." : 
                 "Magnificent! You have collected all the shiny treasures!"}
              </p>
            </div>
          )}
        </div>

        <div className="block md:hidden h-1 w-full bg-amber-900/40 shrink-0 my-6 rounded-full" />

        {/* KOLOM KANAN: KOLEKSI LENCANA */}
        <div className="w-full md:w-[60%] lg:w-[65%] flex flex-col gap-6 relative z-10 md:border-l-4 border-amber-900/40 md:pl-6 lg:pl-8 pb-10">
          
          <div>
            <h4 className="mb-4 font-bold tracking-widest font-[Nunito] uppercase text-xs text-amber-500/80 flex items-center gap-3">
              <span className="h-0.5 bg-amber-700/40 flex-1 rounded-full"></span>
              🌟 Discovered Treasures
              <span className="h-0.5 bg-amber-700/40 flex-1 rounded-full"></span>
            </h4>
            
            {earnedBadges.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {earnedBadges.map((badge) => {
                  const isTier3 = badge.tier === 3;
                  const isTier2 = badge.tier === 2;
                  const coinValue = isTier3 ? 20 : isTier2 ? 10 : 5; // 🔮 KALKULASI NILAI KOIN

                  return (
                    <div
                      key={badge.id}
                      tabIndex={0} // 🔮 Agar bisa di-tap di HP/Tablet
                      className={`group relative bg-gradient-to-br ${badge.bgColor} rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 lg:hover:-translate-y-1 transition-all duration-300 overflow-visible cursor-pointer focus:outline-none hover:z-50 focus:z-50 ${
                        isTier3 ? 'border-[3px] border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.6)] z-10' :
                        isTier2 ? 'border-2 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)] relative' :
                        'border-2 border-white shadow-sm opacity-95 relative'
                      }`}
                    >
                      {/* 🔮 TOOLTIP MELAYANG (+ KOIN) */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100 transition-all duration-300 pointer-events-none z-50 flex flex-col items-center">
                        <div className="bg-amber-950/90 text-amber-300 font-[Fredoka] font-bold text-xs px-3 py-1.5 rounded-lg shadow-xl border border-amber-500/50 flex items-center gap-1.5 whitespace-nowrap">
                          <span className="text-sm leading-none">+</span>
                          <span className="text-sm leading-none">{coinValue}</span>
                          <span className="font-[Nunito] text-[10px] uppercase tracking-wider text-amber-200/80">Coins</span>
                        </div>
                        <div className="w-2 h-2 bg-amber-950/90 rotate-45 -mt-1 border-b border-r border-amber-500/50"></div>
                      </div>

                      {isTier3 && <div className="absolute inset-0 bg-white/30 animate-pulse pointer-events-none rounded-xl" />}

                      <div className={`p-2.5 sm:p-3 rounded-full shrink-0 relative z-10 ${
                        isTier3 ? 'bg-gradient-to-br from-yellow-100 to-amber-300 shadow-md' : 
                        isTier2 ? 'bg-white/95 shadow-sm' : 'bg-white/80'
                      }`}>
                        <badge.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${badge.color} ${isTier3 ? 'drop-shadow-sm' : ''}`} />
                      </div>
                      
                      <div className="text-left flex-1 min-w-0 relative z-10 pointer-events-none">
                        <p className={`font-bold font-[Fredoka] uppercase tracking-wide leading-tight break-words ${
                          isTier3 ? 'text-[14px] sm:text-[15px] text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' :
                          isTier2 ? 'text-[13px] sm:text-[14px] text-amber-950' : 'text-[12px] sm:text-[13px] text-amber-900/90'
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
    </div>
  );
}