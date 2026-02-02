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
    // Award points only if correct, or negative? Game design: Award if correct. No penalty for simplicity/encouragement.
    onComplete(isCorrect ? question.points : 0); 
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white text-gray-900 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className={`${currentTeam.color} p-6 flex justify-between items-center text-white`}>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-display font-bold">{currentTeam.name}'s Turn</span>
          </div>
          <div className="text-3xl font-bold">{question.points} PTS</div>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 overflow-y-auto flex flex-col items-center">
          <h2 className="text-4xl font-bold text-center mb-8 leading-tight text-game-dark">
            {question.questionText}
          </h2>

          {/* Visual Aid (Topology or Placeholder) */}
          {question.topologyVisual && (
            <div className="mb-8 p-6 bg-game-surface rounded-xl shadow-inner">
               <TopologyVisual type={question.topologyVisual} className="w-64 h-64" />
            </div>
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {question.options.map((option) => {
              let btnClass = "relative p-8 rounded-xl text-2xl font-bold border-4 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-center shadow-md ";
              
              if (!isRevealed) {
                btnClass += "bg-gray-100 border-gray-200 hover:border-game-primary hover:bg-indigo-50 text-gray-800";
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
                    <div className="absolute top-2 right-2 text-green-600"><Check size={24} /></div>
                  )}
                  {isRevealed && option.id === selectedOptionId && !option.isCorrect && (
                    <div className="absolute top-2 right-2 text-red-600"><X size={24} /></div>
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
                className="mt-8 bg-blue-50 border-l-8 border-blue-500 p-6 rounded-r-xl w-full max-w-4xl"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {isCorrect ? "Correct! Well done." : "Not quite!"}
                </h3>
                <p className="text-2xl text-blue-800">{question.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {isRevealed && (
           <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end">
             <button 
               onClick={handleContinue}
               className="bg-game-primary hover:bg-indigo-700 text-white text-2xl font-bold px-12 py-4 rounded-xl shadow-lg flex items-center gap-2"
             >
               Continue <Check size={28} />
             </button>
           </div>
        )}
      </motion.div>
    </div>
  );
};