/**
 * Main Game component for the Memory Game
 * Orchestrates all game components and manages overall game state
 */
"use client";

import React, { useEffect } from 'react';
import GameBoard from '@/src/components/GameBoard';
import GameControls from '@/src/components/GameControls';
import { useGameState } from '@/src/hooks/useGameState';
import { useTimer } from '@/src/hooks/useTimer';
import { formatTime } from '@/src/utils/gameUtils';
import type { Card, DifficultyLevel } from '@/src/types/game';
import styles from './Game.module.scss';

export const Game: React.FC = () => {
  // Use a key to force client-side only rendering of the game state
  const [mounted, setMounted] = React.useState(false);
  
  // Only initialize game state after component has mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { gameState, flipCard, restartGame, changeDifficulty, isProcessing } = useGameState('medium');
  const { timerState, startTimer, stopTimer, resetTimer } = useTimer();

  // Start timer on first card flip
  useEffect(() => {
    if (gameState.isGameStarted && !timerState.isRunning && !gameState.isGameComplete) {
      startTimer();
    }
  }, [gameState.isGameStarted, timerState.isRunning, gameState.isGameComplete, startTimer]);

  // Stop timer when game is complete
  useEffect(() => {
    if (gameState.isGameComplete && timerState.isRunning) {
      stopTimer();
    }
  }, [gameState.isGameComplete, timerState.isRunning, stopTimer]);

  // Handle card click
  const handleCardClick = (card: Card) => {
    flipCard(card);
  };

  // Handle game restart
  const handleRestart = () => {
    restartGame();
    resetTimer();
  };

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: DifficultyLevel) => {
    changeDifficulty(newDifficulty);
    resetTimer();
  };

  // Only render the game UI after client-side hydration is complete
  if (!mounted) {
    return <div className={styles.game}>Loading...</div>;
  }

  return (
    <div className={styles.game}>
      {/* Game Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Memory Game</h1>
        <p className={styles.subtitle}>
          Match all the pairs to win!
        </p>
      </header>

      {/* Game Content */}
      <div className={styles.gameContent}>
        {/* Game Complete Message */}
        {gameState.isGameComplete && (
          <div className={styles.gameCompleteMessage} role="alert">
            🎉 Congratulations! You completed the game in {gameState.moves} moves and {formatTime(timerState.seconds)}!
          </div>
        )}

        {/* Game Controls */}
        <GameControls
          moves={gameState.moves}
          timer={timerState}
          onRestart={handleRestart}
          onDifficultyChange={handleDifficultyChange}
          currentDifficulty={gameState.currentDifficulty}
          isGameComplete={gameState.isGameComplete}
        />

        {/* Game Board */}
        <GameBoard
          cards={gameState.cards}
          onCardClick={handleCardClick}
          disabled={isProcessing || gameState.isGameComplete}
          difficulty={gameState.currentDifficulty}
        />
      </div>
    </div>
  );
};

export default Game;
