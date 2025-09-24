/**
 * GameControls component for the Memory Game
 * Displays timer, moves, difficulty selector, and restart button
 */

import React from 'react';
import type { GameControlsProps, DifficultyLevel } from '@/src/types/game';
import { DIFFICULTY_CONFIGS } from '@/src/types/game';
import { formatTime } from '@/src/utils/gameUtils';
import styles from './GameControls.module.scss';

export const GameControls: React.FC<GameControlsProps> = ({
  moves,
  timer,
  onRestart,
  onDifficultyChange,
  currentDifficulty,
  isGameComplete,
}) => {
  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDifficulty = event.target.value as DifficultyLevel;
    onDifficultyChange(newDifficulty);
  };

  const handleRestartClick = () => {
    onRestart();
  };

  const controlsClasses = [
    styles.gameControls,
    isGameComplete ? styles.gameComplete : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={controlsClasses}>
      {/* Game Statistics */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>
            <span aria-hidden="true">⏱️</span>
            Time
          </span>
          <span className={`${styles.statValue} ${isGameComplete ? styles.complete : ''}`}>
            {formatTime(timer.seconds)}
          </span>
        </div>
        
        <div className={styles.statItem}>
          <span className={styles.statLabel}>
            <span aria-hidden="true">🎯</span>
            Moves
          </span>
          <span className={`${styles.statValue} ${isGameComplete ? styles.complete : ''}`}>
            {moves}
          </span>
        </div>
      </div>

      {/* Game Controls */}
      <div className={styles.controls}>
        {/* Difficulty Selector */}
        <div className={styles.difficultySelector}>
          <label htmlFor="difficulty-select" className={styles.difficultyLabel}>
            <span aria-hidden="true">⚙️</span>
            Difficulty:
          </label>
          <select
            id="difficulty-select"
            value={currentDifficulty}
            onChange={handleDifficultyChange}
            className={styles.difficultySelect}
            aria-label="Select game difficulty"
          >
            {Object.values(DIFFICULTY_CONFIGS).map((config) => (
              <option key={config.level} value={config.level}>
                {config.label}
              </option>
            ))}
          </select>
        </div>

        {/* Restart Button */}
        <button
          onClick={handleRestartClick}
          className={styles.restartButton}
          aria-label="Restart game"
          type="button"
        >
          <span aria-hidden="true">♾️</span>
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default GameControls;
