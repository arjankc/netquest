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
    <div className="w-full h-full overflow-y-auto p-2 md:p-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      {/* 
        Grid Layout:
        - We restore scrolling (overflow-y-auto on parent).
        - Columns adapt to screen width.
        - Rows have fixed/minimum heights for usability.
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 pb-20">
        {questionsByCategory.map((cat) => {
          const Icon = IconMap[cat.iconName] || Globe;
          return (
            <div key={cat.id} className="flex flex-col gap-2 md:gap-3">
              {/* Category Header */}
              <div className="bg-game-surface p-3 rounded-lg md:rounded-xl text-center shadow-lg border border-white/10 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors h-24 md:h-32 shrink-0">
                <Icon className="text-game-accent mb-2 w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-bold text-white text-sm md:text-lg leading-tight w-full px-1">{cat.title}</h3>
              </div>

              {/* Questions */}
              <div className="flex flex-col gap-2 md:gap-3">
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
                        w-full rounded-md md:rounded-xl font-display font-bold text-xl md:text-2xl lg:text-3xl shadow-md transition-all border md:border-2
                        flex items-center justify-center h-16 md:h-20 lg:h-24
                        ${isAnswered 
                          ? 'bg-black/20 text-white/20 border-transparent cursor-default' 
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