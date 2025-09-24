/**
 * Core game utilities for the Memory Game
 * Handles card shuffling, game initialization, and scoring logic
 */

import type { Card, DifficultyLevel } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../types/game';

/**
 * Fisher-Yates shuffle algorithm for randomizing card positions
 */
export function shuffleArray<T>(array: T[]): T[] {
  // Create a copy of the array to avoid modifying the original
  const shuffled = [...array];
  
  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));
    
    // Skip if indices are out of bounds (this should never happen with proper inputs)
    if (i >= shuffled.length || j >= shuffled.length) continue;
    
    // Swap elements using a temporary variable
    // Using non-null assertion (!) since we've checked the bounds
    const temp: T = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}

/**
 * Generate a deck of cards for the specified difficulty level
 * Each card value appears exactly twice (for matching pairs)
 */
export function generateCardDeck(difficulty: DifficultyLevel): Card[] {
  const config = DIFFICULTY_CONFIGS[difficulty];
  const totalCards = config.gridSize;
  const uniqueValues = totalCards / 2;
  
  // Create pairs of cards
  const cards: Card[] = [];
  for (let value = 1; value <= uniqueValues; value++) {
    // Create two cards with the same value
    cards.push(
      {
        id: `card-${value}-1`,
        value,
        isFlipped: false,
        isMatched: false,
        position: 0, // Will be set after shuffling
      },
      {
        id: `card-${value}-2`,
        value,
        isFlipped: false,
        isMatched: false,
        position: 0, // Will be set after shuffling
      }
    );
  }
  
  // Shuffle the cards and assign positions
  const shuffledCards = shuffleArray(cards);
  return shuffledCards.map((card, index) => ({
    ...card,
    position: index,
  }));
}

/**
 * Check if two cards form a matching pair
 */
export function isMatchingPair(card1: Card, card2: Card): boolean {
  return card1.value === card2.value && card1.id !== card2.id;
}

/**
 * Calculate game score based on moves and time
 * Lower scores are better (fewer moves and less time)
 */
export function calculateScore(moves: number, timeInSeconds: number): number {
  // Weight moves more heavily than time for scoring
  return moves * 100 + timeInSeconds;
}

/**
 * Format time in MM:SS format
 */
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Check if the game is complete (all cards are matched)
 */
export function isGameComplete(cards: Card[]): boolean {
  return cards.every(card => card.isMatched);
}

/**
 * Get the number of matched pairs
 */
export function getMatchedPairsCount(cards: Card[]): number {
  return cards.filter(card => card.isMatched).length / 2;
}

/**
 * Validate if a card can be flipped
 */
export function canFlipCard(card: Card, flippedCards: Card[]): boolean {
  // Can't flip if already flipped, matched, or if 2 cards are already flipped
  return !card.isFlipped && !card.isMatched && flippedCards.length < 2;
}

/**
 * Generate a unique game session ID
 */
export function generateGameId(): string {
  return `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
