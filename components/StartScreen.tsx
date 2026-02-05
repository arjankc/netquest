import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Play, Monitor, Users } from 'lucide-react';
import { TEAM_COLORS } from '../constants';
import { gameAudio } from '../utils/audio';

interface Props {
  onStartGame: (teamNames: string[]) => void;
}

export const StartScreen: React.FC<Props> = ({ onStartGame }) => {
  const [teamCount, setTeamCount] = useState(2);

  const increment = () => {
    if (teamCount < 6) {
      setTeamCount(c => c + 1);
      gameAudio.playClick();
    }
  };

  const decrement = () => {
    if (teamCount > 2) {
      setTeamCount(c => c - 1);
      gameAudio.playClick();
    }
  };

  const handleStart = () => {
    gameAudio.playCorrect();
    // Generate automatic team names
    const names = Array.from({ length: teamCount }, (_, i) => `Team ${i + 1}`);
    onStartGame(names);
  };

  const previewTeams = Array.from({ length: teamCount }, (_, i) => `Team ${i + 1}`);

  return (
    <div className="h-full w-full bg-game-dark flex flex-col items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-6 md:mb-10 text-center shrink-0"
      >
        <div className="flex items-center justify-center mb-2 md:mb-4">
          <Monitor className="w-10 h-10 md:w-16 md:h-16 text-game-accent mr-3" />
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-wider">NETQUEST</h1>
        </div>
        <p className="text-base md:text-xl text-gray-300">Classroom Network Challenge</p>
      </motion.div>

      <div className="w-full max-w-[95%] md:max-w-[700px] lg:max-w-3xl bg-game-surface p-6 md:p-8 rounded-2xl shadow-2xl border-2 border-white/10 flex flex-col gap-4 md:gap-8 shrink-0">
        <h2 className="text-xl md:text-2xl font-bold text-indigo-200 flex items-center justify-center gap-3">
          <Users className="text-indigo-400" /> Select Number of Teams
        </h2>
        
        {/* Counter Control */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <button 
            onClick={decrement}
            disabled={teamCount <= 2}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95 border-2 border-white/5"
          >
            <Minus size={24} className="md:w-10 md:h-10" />
          </button>
          
          <div className="text-6xl md:text-9xl font-display font-bold text-white w-20 md:w-40 text-center drop-shadow-lg">
            {teamCount}
          </div>

          <button 
            onClick={increment}
            disabled={teamCount >= 6}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-game-primary hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-indigo-500/50 border-2 border-indigo-400"
          >
            <Plus size={24} className="md:w-10 md:h-10" />
          </button>
        </div>

        {/* Preview Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {previewTeams.map((name, idx) => (
            <motion.div 
              key={idx}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`${TEAM_COLORS[idx % TEAM_COLORS.length]} p-2 md:p-3 rounded-lg md:rounded-xl flex justify-center items-center text-white shadow-lg font-bold text-xs md:text-lg border border-white/20 truncate`}
            >
              {name}
            </motion.div>
          ))}
        </div>

        <button 
          onClick={handleStart}
          className="w-full bg-game-success hover:bg-green-600 text-white text-xl md:text-3xl font-bold py-3 md:py-5 rounded-xl shadow-xl flex items-center justify-center gap-3 transition-transform hover:scale-105 active:scale-95"
        >
          <Play size={24} className="md:w-10 md:h-10" fill="currentColor" />
          START GAME
        </button>
      </div>
    </div>
  );
};