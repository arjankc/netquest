import React, { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';
import { QuestionModal } from './components/QuestionModal';
import { Leaderboard } from './components/Leaderboard';
import { GameState, Team, Question } from './types';
import { QUESTIONS, TEAM_COLORS, TEAM_ICONS } from './constants';
import { gameAudio } from './utils/audio';
import { Volume2, VolumeX, RefreshCw, Rocket, Zap, Star, Crown, Smile, Heart } from 'lucide-react';

const INITIAL_STATE: GameState = {
  teams: [],
  currentTeamIndex: 0,
  phase: 'setup',
  answeredQuestions: [],
  history: []
};

const IconMap: Record<string, React.FC<any>> = {
  'Rocket': Rocket,
  'Zap': Zap,
  'Star': Star,
  'Crown': Crown,
  'Smile': Smile,
  'Heart': Heart,
  'default': Star
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Audio Toggle
  useEffect(() => {
    gameAudio.toggle(soundEnabled);
  }, [soundEnabled]);

  const startGame = (teamNames: string[]) => {
    const newTeams: Team[] = teamNames.map((name, idx) => ({
      id: `team-${idx}`,
      name,
      score: 0,
      color: TEAM_COLORS[idx % TEAM_COLORS.length],
      avatarIcon: TEAM_ICONS[Math.floor(Math.random() * TEAM_ICONS.length)]
    }));

    setGameState({
      ...INITIAL_STATE,
      teams: newTeams,
      phase: 'playing'
    });
  };

  const handleQuestionSelect = (questionId: string) => {
    const question = QUESTIONS.find(q => q.id === questionId);
    if (question) {
      gameAudio.playClick();
      setActiveQuestion(question);
    }
  };

  const handleQuestionComplete = (points: number) => {
    const currentTeam = gameState.teams[gameState.currentTeamIndex];
    
    // Update Score
    const updatedTeams = gameState.teams.map((t, idx) => {
      if (idx === gameState.currentTeamIndex) {
        return { ...t, score: t.score + points };
      }
      return t;
    });

    // Advance Turn
    const nextTeamIndex = (gameState.currentTeamIndex + 1) % gameState.teams.length;
    
    // Mark Question Answered
    const newAnswered = [...gameState.answeredQuestions, activeQuestion!.id];

    setGameState(prev => ({
      ...prev,
      teams: updatedTeams,
      currentTeamIndex: nextTeamIndex,
      answeredQuestions: newAnswered,
      history: [...prev.history, { teamId: currentTeam.id, questionId: activeQuestion!.id, points }]
    }));

    setActiveQuestion(null);

    // Check for End Game
    if (newAnswered.length === QUESTIONS.length) {
      setTimeout(() => {
        setGameState(prev => ({ ...prev, phase: 'leaderboard' }));
      }, 1000);
    } else {
      gameAudio.playTurnChange();
    }
  };

  const resetGame = () => {
    setGameState(INITIAL_STATE);
  };

  // --- RENDER HELPERS ---

  if (gameState.phase === 'setup') {
    return <StartScreen onStartGame={startGame} />;
  }

  if (gameState.phase === 'leaderboard') {
    return <Leaderboard gameState={gameState} onReset={resetGame} />;
  }

  const currentTeam = gameState.teams[gameState.currentTeamIndex];
  const CurrentTeamIcon = IconMap[currentTeam.avatarIcon] || Star;

  return (
    <div className="flex flex-col h-screen w-full bg-game-dark text-white overflow-hidden font-sans">
      
      {/* HUD Header */}
      <header className="bg-game-surface border-b border-white/10 p-2 md:p-4 shadow-xl z-10 flex flex-row justify-between items-center gap-2 md:gap-6 shrink-0">
        
        {/* Left Side: Logo and Teams */}
        <div className="flex items-center gap-2 md:gap-6 overflow-hidden flex-1">
          <h1 className="text-3xl font-display font-bold tracking-wider text-white hidden lg:block">NETQUEST</h1>
          
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-1 no-scrollbar mask-linear-fade w-full md:w-auto">
            {gameState.teams.map((team, idx) => {
              const Icon = IconMap[team.avatarIcon] || Star;
              return (
                <div 
                  key={team.id}
                  className={`
                    flex flex-col items-center px-2 py-1 md:px-4 md:py-2 rounded-lg transition-all duration-300 shrink-0
                    ${idx === gameState.currentTeamIndex ? 'bg-white/20 scale-100 md:scale-110 border border-game-accent' : 'opacity-60 scale-90'}
                  `}
                >
                  <div className={`p-1 rounded-full mb-0 md:mb-1 ${team.color} shadow-sm hidden md:block`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wide truncate max-w-[60px] md:max-w-none">{team.name}</span>
                  <span className="font-bold text-sm md:text-xl">{team.score}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Current Turn and Controls */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className={`px-3 py-1 md:px-6 md:py-2 rounded-full ${currentTeam.color} flex items-center gap-2 shadow-lg animate-pulse`}>
             <CurrentTeamIcon size={16} className="text-white md:hidden" />
             <div className="hidden md:flex flex-col items-end leading-none">
                 <span className="text-[10px] font-bold uppercase opacity-80">Turn</span>
             </div>
             <span className="text-sm md:text-xl font-bold truncate max-w-[80px] md:max-w-none">{currentTeam.name}</span>
          </div>
          
          <div className="h-6 w-px bg-white/20 mx-1 md:mx-2 hidden sm:block"></div>
          
          <div className="flex gap-1">
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 hover:bg-white/10 rounded-full">
              {soundEnabled ? <Volume2 size={20} className="md:w-6 md:h-6" /> : <VolumeX size={20} className="md:w-6 md:h-6" />}
            </button>
            
            <button onClick={() => { if(confirm("Restart game?")) resetGame() }} className="p-2 hover:bg-white/10 rounded-full text-game-error">
              <RefreshCw size={20} className="md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Board - Added flex flex-col and min-h-0 to ensure children scroll correctly */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative w-full">
        <GameBoard gameState={gameState} onQuestionSelect={handleQuestionSelect} />
      </main>

      {/* Modals */}
      {activeQuestion && (
        <QuestionModal 
          question={activeQuestion}
          currentTeam={currentTeam}
          onComplete={handleQuestionComplete}
          onClose={() => setActiveQuestion(null)}
        />
      )}
    </div>
  );
}