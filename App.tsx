import React, { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';
import { QuestionModal } from './components/QuestionModal';
import { Leaderboard } from './components/Leaderboard';
import { GameState, Team, Question } from './types';
import { QUESTIONS, TEAM_COLORS } from './constants';
import { gameAudio } from './utils/audio';
import { Volume2, VolumeX, RefreshCw } from 'lucide-react';

const INITIAL_STATE: GameState = {
  teams: [],
  currentTeamIndex: 0,
  phase: 'setup',
  answeredQuestions: [],
  history: []
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
      avatarIcon: 'default'
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

  return (
    <div className="flex flex-col h-screen bg-game-dark text-white overflow-hidden font-sans">
      
      {/* HUD Header */}
      <header className="bg-game-surface border-b border-white/10 p-4 shadow-xl z-10 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-display font-bold tracking-wider text-white hidden md:block">NETQUEST</h1>
          
          <div className="flex gap-4">
            {gameState.teams.map((team, idx) => (
              <div 
                key={team.id}
                className={`
                  flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300
                  ${idx === gameState.currentTeamIndex ? 'bg-white/20 scale-110 border-2 border-game-accent' : 'opacity-60 scale-90'}
                `}
              >
                <div className={`w-3 h-3 rounded-full mb-1 ${team.color}`}></div>
                <span className="text-xs font-bold uppercase tracking-wide">{team.name}</span>
                <span className="font-bold text-xl">{team.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={`px-6 py-2 rounded-full ${currentTeam.color} flex items-center gap-2 shadow-lg animate-pulse`}>
            <span className="text-sm font-bold uppercase opacity-80">Current Turn:</span>
            <span className="text-xl font-bold">{currentTeam.name}</span>
          </div>
          
          <div className="h-8 w-px bg-white/20 mx-2"></div>
          
          <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 hover:bg-white/10 rounded-full">
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
          
          <button onClick={() => { if(confirm("Restart game?")) resetGame() }} className="p-2 hover:bg-white/10 rounded-full text-game-error">
             <RefreshCw size={24} />
          </button>
        </div>
      </header>

      {/* Main Board */}
      <main className="flex-1 overflow-hidden relative">
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