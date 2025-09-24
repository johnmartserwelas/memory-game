/**
 * Custom hook for managing game state
 * Handles card flipping, matching logic, and game progression
 */
"use client";

import { useState, useCallback, useEffect } from 'react';
import type { 
  GameState, 
  Card, 
  DifficultyLevel, 
  FlipResult 
} from '@/src/types/game';
import { 
  generateCardDeck, 
  isMatchingPair, 
  canFlipCard, 
  isGameComplete,
  getMatchedPairsCount 
} from '@/src/utils/gameUtils';
import { ANIMATION_TIMINGS } from '@/src/types/game';

export function useGameState(initialDifficulty: DifficultyLevel = 'medium') {
  const [gameState, setGameState] = useState<GameState>(() => ({
    cards: generateCardDeck(initialDifficulty),
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    isGameComplete: false,
    isGameStarted: false,
    currentDifficulty: initialDifficulty,
  }));

  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize new game with specified difficulty
  const initializeGame = useCallback((difficulty: DifficultyLevel) => {
    const newCards = generateCardDeck(difficulty);
    setGameState({
      cards: newCards,
      flippedCards: [],
      matchedPairs: 0,
      moves: 0,
      isGameComplete: false,
      isGameStarted: false,
      currentDifficulty: difficulty,
    });
    setIsProcessing(false);
  }, []);

  // Handle card flip logic
  const flipCard = useCallback((cardToFlip: Card): FlipResult => {
    if (isProcessing) return 'invalid';
    
    setGameState(prevState => {
      const { cards, flippedCards, moves, isGameStarted } = prevState;
      
      // Validate if card can be flipped
      if (!canFlipCard(cardToFlip, flippedCards)) {
        return prevState;
      }

      // Update the card to flipped state
      const updatedCards = cards.map(card =>
        card.id === cardToFlip.id ? { ...card, isFlipped: true } : card
      );

      const newFlippedCards = [...flippedCards, { ...cardToFlip, isFlipped: true }];
      const newMoves = moves + (flippedCards.length === 0 ? 1 : 0); // Increment on first card of pair

      return {
        ...prevState,
        cards: updatedCards,
        flippedCards: newFlippedCards,
        moves: newMoves,
        isGameStarted: true,
      };
    });

    return 'match'; // Will be determined in the effect
  }, [isProcessing]);

  // Handle matching logic when two cards are flipped
  useEffect(() => {
    if (gameState.flippedCards.length === 2 && !isProcessing) {
      setIsProcessing(true);
      
      const [card1, card2] = gameState.flippedCards;
      
      // Make sure both cards exist before checking for a match
      if (!card1 || !card2) {
        setIsProcessing(false);
        return;
      }
      
      const isMatch = isMatchingPair(card1, card2);

      if (isMatch) {
        // Cards match - mark them as matched after celebration delay
        setTimeout(() => {
          setGameState(prevState => {
            const updatedCards = prevState.cards.map(card => {
              if (card.id === card1.id || card.id === card2.id) {
                return { ...card, isMatched: true, isFlipped: true };
              }
              return card;
            });

            const newMatchedPairs = getMatchedPairsCount(updatedCards);
            const gameComplete = isGameComplete(updatedCards);

            return {
              ...prevState,
              cards: updatedCards,
              flippedCards: [],
              matchedPairs: newMatchedPairs,
              isGameComplete: gameComplete,
            };
          });
          setIsProcessing(false);
        }, ANIMATION_TIMINGS.MATCH_CELEBRATION);
      } else {
        // Cards don't match - flip them back after delay
        setTimeout(() => {
          setGameState(prevState => {
            const updatedCards = prevState.cards.map(card => {
              // Only flip back the two specific cards that were just flipped
              if (card.id === card1.id || card.id === card2.id) {
                return { ...card, isFlipped: false };
              }
              return card;
            });

            return {
              ...prevState,
              cards: updatedCards,
              flippedCards: [],
            };
          });
          setIsProcessing(false);
        }, ANIMATION_TIMINGS.MISMATCH_DELAY);
      }
    }
  }, [gameState.flippedCards.length, isProcessing]);

  // Restart game with current difficulty
  const restartGame = useCallback(() => {
    initializeGame(gameState.currentDifficulty);
  }, [gameState.currentDifficulty, initializeGame]);

  // Change difficulty and restart
  const changeDifficulty = useCallback((newDifficulty: DifficultyLevel) => {
    initializeGame(newDifficulty);
  }, [initializeGame]);

  return {
    gameState,
    flipCard,
    restartGame,
    changeDifficulty,
    isProcessing,
  };
}
