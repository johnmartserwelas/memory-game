/**
 * GameBoard component for the Memory Game
 * Renders a responsive grid of cards with proper accessibility
 */

import React from 'react';
import Card from '@/src/components/Card';
import type { GameBoardProps } from '@/src/types/game';
import { DIFFICULTY_CONFIGS } from '@/src/types/game';
import styles from './GameBoard.module.scss';

export const GameBoard: React.FC<GameBoardProps> = ({
  cards,
  onCardClick,
  disabled,
  difficulty,
}) => {
  const config = DIFFICULTY_CONFIGS[difficulty];
  
  if (!cards || cards.length === 0) {
    return (
      <div className={styles.gameBoard}>
        <div className={styles.loading}>
          Loading game...
        </div>
      </div>
    );
  }

  const isGameComplete = cards.every(card => card.isMatched);
  
  const boardClasses = [
    styles.gameBoard,
    isGameComplete ? styles.gameComplete : '',
  ].filter(Boolean).join(' ');

  const gridClasses = [
    styles.grid,
    styles[difficulty],
  ].join(' ');

  return (
    <div className={boardClasses}>
      <div 
        className={gridClasses}
        role="grid"
        aria-label={`Memory game board, ${config.label}, ${cards.length} cards`}
        aria-rowcount={config.rows}
        aria-colcount={config.cols}
      >
        {cards.map((card, index) => {
          const row = Math.floor(index / config.cols) + 1;
          const col = (index % config.cols) + 1;
          
          return (
            <div
              key={card.id}
              className={styles.cardWrapper}
              role="gridcell"
              aria-rowindex={row}
              aria-colindex={col}
            >
              <Card
                card={card}
                onCardClick={onCardClick}
                disabled={disabled}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
