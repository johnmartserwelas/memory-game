/**
 * Core TypeScript interfaces and types for the Memory Game
 * Following strict type safety and component-driven design principles
 */

// Difficulty levels with corresponding grid dimensions
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  level: DifficultyLevel;
  label: string;
  gridSize: number; // Total number of cards (must be even)
  rows: number;
  cols: number;
}

// Card state and properties
export interface Card {
  id: string;
  value: number; // The symbol/number on the card (1-8 for 4x4 grid)
  isFlipped: boolean;
  isMatched: boolean;
  position: number; // Position in the grid (0-based index)
}

// Game state management
export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  matchedPairs: number;
  moves: number;
  isGameComplete: boolean;
  isGameStarted: boolean;
  currentDifficulty: DifficultyLevel;
}

// Timer state
export interface TimerState {
  seconds: number;
  isRunning: boolean;
  startTime: number | null;
  endTime: number | null;
}

// Game statistics for scoring
export interface GameStats {
  moves: number;
  timeInSeconds: number;
  difficulty: DifficultyLevel;
  completedAt: Date;
}

// Best score persistence (localStorage)
export interface BestScore {
  moves: number;
  timeInSeconds: number;
  difficulty: DifficultyLevel;
  achievedAt: Date;
}

// Component props interfaces
export interface CardProps {
  card: Card;
  onCardClick: (card: Card) => void;
  disabled: boolean;
}

export interface GameBoardProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  disabled: boolean;
  difficulty: DifficultyLevel;
}

export interface GameControlsProps {
  moves: number;
  timer: TimerState;
  onRestart: () => void;
  onDifficultyChange: (difficulty: DifficultyLevel) => void;
  currentDifficulty: DifficultyLevel;
  isGameComplete: boolean;
}

// Utility types for game logic
export type CardPair = [Card, Card];
export type FlipResult = 'match' | 'no-match' | 'invalid';

// Constants
export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    level: 'easy',
    label: 'Easy (2×2)',
    gridSize: 4,
    rows: 2,
    cols: 2,
  },
  medium: {
    level: 'medium',
    label: 'Medium (4×4)',
    gridSize: 16,
    rows: 4,
    cols: 4,
  },
  hard: {
    level: 'hard',
    label: 'Hard (6×6)',
    gridSize: 36,
    rows: 6,
    cols: 6,
  },
};

// Animation timing constants
export const ANIMATION_TIMINGS = {
  CARD_FLIP_DURATION: 300, // ms
  MISMATCH_DELAY: 1000, // ms before flipping back
  MATCH_CELEBRATION: 500, // ms
} as const;
