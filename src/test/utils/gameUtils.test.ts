/**
 * Unit tests for game utility functions
 * Tests card shuffling, game logic, and helper functions
 */

import { describe, it, expect } from 'vitest';
import {
  shuffleArray,
  generateCardDeck,
  isMatchingPair,
  calculateScore,
  formatTime,
  isGameComplete,
  canFlipCard,
} from '../../utils/gameUtils';
import type { Card } from '../../types/game';

describe('Game Utils', () => {
  describe('shuffleArray', () => {
    it('returns array with same length', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      expect(shuffled).toHaveLength(original.length);
    });

    it('contains all original elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      expect(shuffled.sort()).toEqual(original.sort());
    });

    it('does not mutate original array', () => {
      const original = [1, 2, 3, 4, 5];
      const originalCopy = [...original];
      shuffleArray(original);
      expect(original).toEqual(originalCopy);
    });
  });

  describe('generateCardDeck', () => {
    it('generates correct number of cards for easy difficulty', () => {
      const cards = generateCardDeck('easy');
      expect(cards).toHaveLength(4);
    });

    it('generates correct number of cards for medium difficulty', () => {
      const cards = generateCardDeck('medium');
      expect(cards).toHaveLength(16);
    });

    it('generates correct number of cards for hard difficulty', () => {
      const cards = generateCardDeck('hard');
      expect(cards).toHaveLength(36);
    });

    it('creates exactly two cards for each value', () => {
      const cards = generateCardDeck('easy');
      const valueCounts = cards.reduce((acc, card) => {
        acc[card.value] = (acc[card.value] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      Object.values(valueCounts).forEach(count => {
        expect(count).toBe(2);
      });
    });

    it('assigns unique positions to each card', () => {
      const cards = generateCardDeck('medium');
      const positions = cards.map(card => card.position);
      const uniquePositions = new Set(positions);
      expect(uniquePositions.size).toBe(cards.length);
    });
  });

  describe('isMatchingPair', () => {
    it('returns true for cards with same value but different ids', () => {
      const card1: Card = { id: '1', value: 5, isFlipped: true, isMatched: false, position: 0 };
      const card2: Card = { id: '2', value: 5, isFlipped: true, isMatched: false, position: 1 };
      expect(isMatchingPair(card1, card2)).toBe(true);
    });

    it('returns false for cards with different values', () => {
      const card1: Card = { id: '1', value: 5, isFlipped: true, isMatched: false, position: 0 };
      const card2: Card = { id: '2', value: 3, isFlipped: true, isMatched: false, position: 1 };
      expect(isMatchingPair(card1, card2)).toBe(false);
    });

    it('returns false for same card (same id)', () => {
      const card1: Card = { id: '1', value: 5, isFlipped: true, isMatched: false, position: 0 };
      const card2: Card = { id: '1', value: 5, isFlipped: true, isMatched: false, position: 0 };
      expect(isMatchingPair(card1, card2)).toBe(false);
    });
  });

  describe('formatTime', () => {
    it('formats seconds correctly', () => {
      expect(formatTime(45)).toBe('00:45');
      expect(formatTime(5)).toBe('00:05');
    });

    it('formats minutes and seconds correctly', () => {
      expect(formatTime(125)).toBe('02:05');
      expect(formatTime(3661)).toBe('61:01');
    });

    it('handles zero correctly', () => {
      expect(formatTime(0)).toBe('00:00');
    });
  });

  describe('canFlipCard', () => {
    const card: Card = { id: '1', value: 5, isFlipped: false, isMatched: false, position: 0 };

    it('allows flipping unflipped, unmatched card with no other flipped cards', () => {
      expect(canFlipCard(card, [])).toBe(true);
    });

    it('allows flipping when one card is already flipped', () => {
      const flippedCard: Card = { id: '2', value: 3, isFlipped: true, isMatched: false, position: 1 };
      expect(canFlipCard(card, [flippedCard])).toBe(true);
    });

    it('prevents flipping when two cards are already flipped', () => {
      const flippedCards: Card[] = [
        { id: '2', value: 3, isFlipped: true, isMatched: false, position: 1 },
        { id: '3', value: 4, isFlipped: true, isMatched: false, position: 2 },
      ];
      expect(canFlipCard(card, flippedCards)).toBe(false);
    });

    it('prevents flipping already flipped card', () => {
      const flippedCard = { ...card, isFlipped: true };
      expect(canFlipCard(flippedCard, [])).toBe(false);
    });

    it('prevents flipping matched card', () => {
      const matchedCard = { ...card, isMatched: true };
      expect(canFlipCard(matchedCard, [])).toBe(false);
    });
  });
});
