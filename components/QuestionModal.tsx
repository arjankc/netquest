import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, Team } from '../types';
import { TopologyVisual } from './TopologyVisual';
import { gameAudio } from '../utils/audio';
import { Check, X } from 'lucide-react';

interface Props {
  question: Question;
  currentTeam: Team;
  onComplete: (points: number) => void;
  onClose: () => void;
}

export const QuestionModal: React.FC<Props> = ({ question, currentTeam, onComplete, onClose }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Play a sound when modal opens? Maybe subtle swoosh.
  }, []);

  const handleOptionSelect = (optionId: string, isOptCorrect: boolean) => {
    if (isRevealed) return;
    
    setSelectedOptionId(optionId);
    setIsRevealed(true);
    setIsCorrect(isOptCorrect);

    if (isOptCorrect) {
      gameAudio.playCorrect();
    } else {
      gameAudio.playIncorrect();
    }
  };

  const handleContinue = () => {
    gameAudio.playClick();
    onComplete(isCorrect ? question.points : 0); 
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        className="bg-white text-gray-900 w-full h-[100dvh] md:h-auto md:max-h-[85vh] md:w-[90vw] lg:max-w-5xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className={`${currentTeam.color} p-4 md:p-6 flex justify-between items-center text-white shrink-0 shadow-sm z-10`}>
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-lg md:text-2xl lg:text-3xl font-display font-bold truncate max-w-[200px] md:max-w-md">{currentTeam.name}'s Turn</span>
          </div>
          <div className="text-lg md:text-2xl lg:text-3xl font-bold whitespace-nowrap bg-black/20 px-3 py-1 md:px-4 md:py-2 rounded-lg">{question.points} PTS</div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8 flex-1 overflow-y-auto flex flex-col items-center">
          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-center mb-6 md:mb-8 leading-tight text-game-dark">
            {question.questionText}
          </h2>

          {/* Visual Aid (Topology or Placeholder) */}
          {question.topologyVisual && (
            <div className="mb-6 md:mb-8 p-4 md:p-6 bg-game-surface rounded-xl shadow-inner shrink-0">
               <TopologyVisual type={question.topologyVisual} className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64" />
            </div>
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 lg:gap-6 w-full max-w-4xl pb-24 md:pb-6">
            {question.options.map((option) => {
              let btnClass = "relative p-4 md:p-6 lg:p-8 rounded-xl text-lg md:text-xl lg:text-2xl font-bold border-2 md:border-4 transition-all transform active:scale-[0.98] text-center shadow-md min-h-[70px] md:min-h-[90px] flex items-center justify-center ";
              
              if (!isRevealed) {
                btnClass += "bg-gray-100 border-gray-200 hover:border-game-primary hover:bg-indigo-50 text-gray-800 hover:scale-[1.02] ";
              } else {
                if (option.isCorrect) {
                  btnClass += "bg-green-100 border-green-500 text-green-900";
                } else if (option.id === selectedOptionId && !option.isCorrect) {
                  btnClass += "bg-red-100 border-red-500 text-red-900 opacity-60";
                } else {
                  btnClass += "bg-gray-100 border-gray-200 text-gray-400 opacity-50";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id, option.isCorrect)}
                  disabled={isRevealed}
                  className={btnClass}
                >
                  {option.text}
                  {isRevealed && option.isCorrect && (
                    <div className="absolute top-2 right-2 text-green-600"><Check size={20} className="md:w-6 md:h-6" /></div>
                  )}
                  {isRevealed && option.id === selectedOptionId && !option.isCorrect && (
                    <div className="absolute top-2 right-2 text-red-600"><X size={20} className="md:w-6 md:h-6" /></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation / Result */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 md:mt-6 lg:mt-8 bg-blue-50 border-l-4 md:border-l-8 border-blue-500 p-4 md:p-6 rounded-r-xl w-full max-w-4xl shrink-0 mb-20 md:mb-0"
              >
                <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-2">
                  {isCorrect ? "Correct! Well done." : "Not quite!"}
                </h3>
                <p className="text-lg md:text-xl lg:text-2xl text-blue-800">{question.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {isRevealed && (
           <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gray-50/95 backdrop-blur border-t border-gray-200 flex justify-end z-20 md:static md:bg-gray-50">
             <button 
               onClick={handleContinue}
               className="w-full md:w-auto bg-game-primary hover:bg-indigo-700 text-white text-xl md:text-2xl font-bold px-8 md:px-12 py-3 md:py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
             >
               Continue <Check size={24} className="md:w-7 md:h-7" />
             </button>
           </div>
        )}
      </motion.div>
    </div>
  );
};