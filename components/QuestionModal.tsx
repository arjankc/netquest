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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white text-gray-900 w-full max-w-5xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-full max-h-[95vh] md:max-h-[90vh]"
      >
        {/* Header */}
        <div className={`${currentTeam.color} p-3 md:p-5 flex justify-between items-center text-white shrink-0 shadow-sm z-10`}>
          <div className="flex items-center gap-3">
            <span className="text-lg md:text-2xl font-display font-bold truncate max-w-[200px]">{currentTeam.name}'s Turn</span>
          </div>
          <div className="text-lg md:text-2xl font-bold whitespace-nowrap bg-black/20 px-3 py-1 rounded-lg">{question.points} PTS</div>
        </div>

        {/* Content - Scrollable if needed, but tries to fit */}
        <div className="p-4 md:p-6 flex-1 overflow-y-auto flex flex-col items-center min-h-0">
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl gap-4 md:gap-6">
             <h2 className="text-xl md:text-3xl font-bold text-center leading-tight text-game-dark">
               {question.questionText}
             </h2>

             {/* Visual Aid */}
             {question.topologyVisual && (
               <div className="p-3 md:p-4 bg-game-surface rounded-xl shadow-inner shrink-0">
                  <TopologyVisual type={question.topologyVisual} className="w-32 h-32 md:w-48 md:h-48" />
               </div>
             )}

             {/* Options Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
               {question.options.map((option) => {
                 let btnClass = "relative p-3 md:p-5 rounded-xl text-base md:text-xl font-bold border-2 transition-all text-center shadow-md flex items-center justify-center min-h-[60px] md:min-h-[80px] ";
                 
                 if (!isRevealed) {
                   btnClass += "bg-gray-100 border-gray-200 hover:border-game-primary hover:bg-indigo-50 text-gray-800 hover:scale-[1.01] ";
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
                       <div className="absolute top-2 right-2 text-green-600"><Check size={20} /></div>
                     )}
                     {isRevealed && option.id === selectedOptionId && !option.isCorrect && (
                       <div className="absolute top-2 right-2 text-red-600"><X size={20} /></div>
                     )}
                   </button>
                 );
               })}
             </div>

             {/* Explanation / Result */}
             <AnimatePresence>
               {isRevealed && (
                 <motion.div 
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   className="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 rounded-r-xl w-full shrink-0"
                 >
                   <h3 className="text-base md:text-lg font-bold text-blue-900">
                     {isCorrect ? "Correct!" : "Nice try!"}
                   </h3>
                   <p className="text-base md:text-lg text-blue-800">{question.explanation}</p>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        {isRevealed && (
           <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end shrink-0">
             <button 
               onClick={handleContinue}
               className="w-full md:w-auto bg-game-primary hover:bg-indigo-700 text-white text-lg md:text-xl font-bold px-8 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
             >
               Continue <Check size={24} />
             </button>
           </div>
        )}
      </motion.div>
    </div>
  );
};