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
    <div className="w-full h-full p-2 md:p-4 flex flex-col">
      {/* 
        Responsive Grid Layout for "Fit to Viewport":
        - Mobile (< md): Scroll allowed if content is too tall (fallback), but we try to flex.
        - Tablet (md/lg): 3 cols, 2 rows. Fills height.
        - Desktop (xl): 6 cols, 1 row. Fills height.
      */}
      <div className="flex-1 grid gap-2 md:gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 md:auto-rows-fr h-full">
        {questionsByCategory.map((cat) => {
          const Icon = IconMap[cat.iconName] || Globe;
          return (
            <div key={cat.id} className="flex flex-col gap-1 md:gap-2 h-full min-h-0">
              {/* Category Header - Now flex-1 to share space equally with buttons */}
              <div className="flex-1 bg-game-surface p-1 md:p-2 rounded-lg md:rounded-xl text-center shadow-lg border border-white/10 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors min-h-0">
                <Icon className="text-game-accent mb-1 w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-bold text-white text-xs md:text-sm lg:text-lg xl:text-xl leading-tight truncate w-full px-1">{cat.title}</h3>
              </div>

              {/* Questions - Rendered directly in parent flex container to ensure equal distribution */}
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
                      flex-1 rounded-md md:rounded-lg lg:rounded-xl font-display font-bold text-base md:text-xl lg:text-2xl xl:text-3xl shadow-md transition-all border md:border-2
                      flex items-center justify-center min-h-0
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
          );
        })}
      </div>
    </div>
  );
};