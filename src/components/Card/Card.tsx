/**
 * Card component for the Memory Game
 * Handles card display, flip animations, and user interactions
 */
"use client";

import React, { useState, useEffect } from 'react';
import type { CardProps } from '@/src/types/game';
import { ANIMATION_TIMINGS } from "../../types/game";
import styles from './Card.module.scss';

export const Card: React.FC<CardProps> = ({ 
  card, 
  onCardClick, 
  disabled 
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [justMatched, setJustMatched] = useState(false);

  // Handle flip animation state
  useEffect(() => {
    if (card.isFlipped && !card.isMatched) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, ANIMATION_TIMINGS.CARD_FLIP_DURATION);
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [card.isFlipped, card.isMatched]);

  // Handle match celebration animation
  useEffect(() => {
    if (card.isMatched && !justMatched) {
      setJustMatched(true);
      const timer = setTimeout(() => {
        setJustMatched(false);
      }, ANIMATION_TIMINGS.MATCH_CELEBRATION);
      
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [card.isMatched, justMatched]);

  const handleClick = () => {
    // Only allow click if card is in valid state and not already processing
    if (!disabled && !card.isFlipped && !card.isMatched && !isFlipping) {
      onCardClick(card);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const cardClasses = [
    styles.card,
    card.isFlipped ? styles.flipped : '',
    disabled ? styles.disabled : '',
    card.isMatched ? styles.matched : '',
    isFlipping ? styles.flipping : '',
    justMatched ? styles.justMatched : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={`Card ${card.position + 1}${card.isFlipped ? `, value ${card.value}` : ''}`}
      aria-pressed={card.isFlipped}
      data-testid={`card-${card.id}`}
    >
      <div className={styles.cardInner}>
        {/* Card Back (face-down) */}
        <div className={styles.cardBack} aria-hidden={card.isFlipped}>
          {/* Question mark is added via CSS ::before pseudo-element */}
        </div>
        
        {/* Card Front (face-up) */}
        <div className={styles.cardFront} aria-hidden={!card.isFlipped}>
          <span className={styles.cardValue}>
            {card.value}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
