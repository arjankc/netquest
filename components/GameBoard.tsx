import React from 'react';
import { CATEGORIES, QUESTIONS } from '../constants';
import { GameState } from '../types';
import { motion } from 'framer-motion';
import { Globe, Wifi, Network, Share2, Hash, Lock } from 'lucide-react';

interface Props {
  gameState: GameState;
  onQuestionSelect: (questionId: string) => void;
}

// Icon mapper
const IconMap: Record<string, React.FC<any>> = {
  'Globe': Globe,
  'Wifi': Wifi,
  'Network': Network,
  'Share2': Share2,
  'Hash': Hash,
  'Lock': Lock
};

export const GameBoard: React.FC<Props> = ({ gameState, onQuestionSelect }) => {
  // Group questions by category
  const questionsByCategory = CATEGORIES.map(cat => ({
    ...cat,
    questions: QUESTIONS.filter(q => q.categoryId === cat.id).sort((a, b) => a.points - b.points)
  }));

  return (
    <div className="w-full h-full p-2 md:p-6 lg:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      {/* 
        Grid Layout Logic:
        - Mobile (default): 1 column
        - Small Tablet (sm): 2 columns
        - Tablet/Laptop (md/lg): 3 columns (Readable cards)
        - Desktop (xl): 6 columns (Full Board view)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6 max-w-[1600px] mx-auto pb-12">
        {questionsByCategory.map((cat) => {
          const Icon = IconMap[cat.iconName] || Globe;
          return (
            <div key={cat.id} className="flex flex-col gap-2 md:gap-3">
              {/* Category Header */}
              <div className="bg-game-surface p-3 md:p-4 rounded-xl text-center shadow-lg border border-white/10 min-h-[5rem] md:h-28 lg:h-32 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors">
                <Icon className="text-game-accent mb-2 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-bold text-white text-base md:text-lg lg:text-xl leading-tight">{cat.title}</h3>
              </div>

              {/* Questions */}
              <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 md:gap-3">
                {cat.questions.map((q) => {
                  const isAnswered = gameState.answeredQuestions.includes(q.id);
                  
                  return (
                    <motion.button
                      key={q.id}
                      disabled={isAnswered}
                      onClick={() => onQuestionSelect(q.id)}
                      whileHover={!isAnswered ? { scale: 1.02, backgroundColor: '#4f46e5' } : {}}
                      whileTap={!isAnswered ? { scale: 0.95 } : {}}
                      className={`
                        flex-1 rounded-xl font-display font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl shadow-md transition-all border-2
                        flex items-center justify-center min-h-[50px] md:min-h-[70px] lg:min-h-[80px]
                        ${isAnswered 
                          ? 'bg-black/20 text-white/10 border-transparent cursor-default' 
                          : 'bg-white text-game-primary border-game-primary hover:text-white cursor-pointer'
                        }
                      `}
                    >
                      {isAnswered ? '' : q.points}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};