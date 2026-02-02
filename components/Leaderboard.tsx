import React, { useEffect } from 'react';
import { GameState } from '../types';
import { motion } from 'framer-motion';
import { Trophy, RefreshCcw, Medal, Star, PartyPopper } from 'lucide-react';
import { gameAudio } from '../utils/audio';

interface Props {
  gameState: GameState;
  onReset: () => void;
}

const ConfettiParticle: React.FC<{ delay: number }> = ({ delay }) => {
  const randomColor = ['#ef4444', '#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899'][Math.floor(Math.random() * 6)];
  const randomX = Math.random() * 100; // percent
  
  return (
    <motion.div
      initial={{ 
        y: -20, 
        x: `${randomX}vw`, 
        opacity: 1, 
        rotate: 0,
        scale: Math.random() * 0.5 + 0.5
      }}
      animate={{ 
        y: '110vh', 
        rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
        opacity: [1, 1, 0]
      }}
      transition={{ 
        duration: Math.random() * 3 + 3, 
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ backgroundColor: randomColor }}
      className="absolute top-0 w-3 h-3 rounded-sm pointer-events-none"
    />
  );
};

export const Leaderboard: React.FC<Props> = ({ gameState, onReset }) => {
  const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];

  useEffect(() => {
    // Play sound on mount
    const timer = setTimeout(() => {
        gameAudio.playCorrect();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-game-dark p-8 overflow-hidden font-sans">
      
      {/* Confetti Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {Array.from({ length: 40 }).map((_, i) => (
           <ConfettiParticle key={i} delay={Math.random() * 5} />
         ))}
      </div>

      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="z-10 text-center mb-10"
      >
        <div className="relative inline-block mb-4">
           {/* Rotating burst behind trophy */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="absolute inset-0 -m-8 bg-gradient-to-tr from-yellow-400/20 to-transparent rounded-full blur-2xl"
           />
           
           <Trophy className="relative w-48 h-48 text-yellow-400 drop-shadow-[0_0_25px_rgba(250,204,21,0.6)]" />
           
           <motion.div
             initial={{ scale: 0 }}
             animate={{ scale: [0, 1.2, 1] }}
             transition={{ delay: 0.5, times: [0, 0.6, 1] }}
             className="absolute -top-6 -right-6 text-yellow-300"
           >
              <Star size={64} fill="currentColor" className="animate-pulse" />
           </motion.div>
        </div>

        <h1 className="text-7xl font-display font-bold text-white mb-6 drop-shadow-xl tracking-wider">
          VICTORY!
        </h1>
        
        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-10 py-4 rounded-full border border-yellow-400/30 shadow-[0_0_20px_rgba(250,204,21,0.2)]">
             <PartyPopper className="text-yellow-400 w-8 h-8" />
             <div className="flex flex-col items-start">
               <span className="text-xs uppercase text-yellow-400 font-bold tracking-widest">Champion</span>
               <span className={`text-4xl font-bold text-white`}>{winner.name}</span>
             </div>
        </div>
      </motion.div>

      <div className="w-full max-w-4xl grid gap-4 z-10 mb-12 px-4">
        {sortedTeams.map((team, idx) => (
          <motion.div
            key={team.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 + idx * 0.15, type: "spring", bounce: 0.4 }}
            className={`
                relative flex items-center justify-between p-5 rounded-2xl border transition-all hover:scale-[1.02]
                ${idx === 0 
                  ? 'bg-gradient-to-r from-yellow-900/40 to-game-surface border-yellow-500/50 shadow-lg' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
                }
            `}
          >
            {/* Rank Indicator */}
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center w-14">
                  {idx === 0 && <Medal className="w-12 h-12 text-yellow-400 drop-shadow-lg" />}
                  {idx === 1 && <Medal className="w-10 h-10 text-gray-300" />}
                  {idx === 2 && <Medal className="w-10 h-10 text-amber-700" />}
                  {idx > 2 && <span className="text-2xl font-bold text-white/30">#{idx + 1}</span>}
              </div>

              <div className={`w-3 h-12 rounded-full ${team.color} shadow-[0_0_10px_currentColor]`}></div>
              
              <span className={`text-3xl font-bold ${idx === 0 ? 'text-white' : 'text-gray-200'}`}>
                {team.name}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-display font-bold ${idx === 0 ? 'text-yellow-400' : 'text-white'}`}>
                    {team.score}
                </span>
                <span className="text-sm font-bold uppercase text-white/40">pts</span>
            </div>
            
            {/* Winner Glow */}
            {idx === 0 && (
                <div className="absolute inset-0 rounded-2xl border-2 border-yellow-400/20 pointer-events-none animate-pulse"></div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#6366f1" }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="z-20 flex items-center gap-3 px-10 py-5 bg-game-primary text-white rounded-2xl text-2xl font-bold shadow-2xl transition-all border border-indigo-400 ring-4 ring-indigo-500/20"
      >
        <RefreshCcw size={28} /> Start New Game
      </motion.button>
    </div>
  );
};