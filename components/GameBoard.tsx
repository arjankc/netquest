import React from 'react';
import { CATEGORIES, QUESTIONS } from '../constants';
import { GameState } from '../types';
import { motion } from 'framer-motion';
import { Globe, Wifi, Network, Share2, Hash } from 'lucide-react';

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
  'Hash': Hash
};

export const GameBoard: React.FC<Props> = ({ gameState, onQuestionSelect }) => {
  // Group questions by category
  const questionsByCategory = CATEGORIES.map(cat => ({
    ...cat,
    questions: QUESTIONS.filter(q => q.categoryId === cat.id).sort((a, b) => a.points - b.points)
  }));

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="grid grid-cols-5 gap-4 h-full max-w-7xl mx-auto">
        {questionsByCategory.map((cat) => {
          const Icon = IconMap[cat.iconName] || Globe;
          return (
            <div key={cat.id} className="flex flex-col gap-4">
              {/* Category Header */}
              <div className="bg-game-surface p-4 rounded-xl text-center shadow-lg border border-white/10 h-32 flex flex-col items-center justify-center">
                <Icon className="text-game-accent mb-2" size={32} />
                <h3 className="font-display font-bold text-white text-lg md:text-xl leading-tight">{cat.title}</h3>
              </div>

              {/* Questions */}
              {cat.questions.map((q) => {
                const isAnswered = gameState.answeredQuestions.includes(q.id);
                
                return (
                  <motion.button
                    key={q.id}
                    disabled={isAnswered}
                    onClick={() => onQuestionSelect(q.id)}
                    whileHover={!isAnswered ? { scale: 1.05, backgroundColor: '#4f46e5' } : {}}
                    whileTap={!isAnswered ? { scale: 0.95 } : {}}
                    className={`
                      flex-1 rounded-xl font-display font-bold text-3xl shadow-md transition-all border-2
                      flex items-center justify-center min-h-[100px]
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
          );
        })}
      </div>
    </div>
  );
};