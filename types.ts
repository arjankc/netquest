export type TopologyType = 'star' | 'bus' | 'ring' | 'mesh' | 'none';

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  iconName?: string; // For visual answers
}

export interface Question {
  id: string;
  categoryId: string;
  points: number;
  questionText: string;
  options: Option[];
  explanation?: string; // Shown after answering
  topologyVisual?: TopologyType; // To render a diagram
  imagePlaceholder?: string; // If we want a generic image
}

export interface Category {
  id: string;
  title: string;
  iconName: string;
}

export interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
  avatarIcon: string;
}

export type GamePhase = 'setup' | 'playing' | 'leaderboard';

export interface GameState {
  teams: Team[];
  currentTeamIndex: number;
  phase: GamePhase;
  answeredQuestions: string[]; // Set of Question IDs
  history: { teamId: string; questionId: string; points: number }[];
}