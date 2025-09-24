/**
 * Unit tests for Card component
 * Tests card rendering, interactions, and accessibility
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Card from '../../components/Card/index';
import type { Card as CardType } from '../../types/game';

const mockCard: CardType = {
  id: 'test-card-1',
  value: 5,
  isFlipped: false,
  isMatched: false,
  position: 0,
};

const mockOnCardClick = vi.fn();

describe('Card Component', () => {
  beforeEach(() => {
    mockOnCardClick.mockClear();
  });

  it('renders card in face-down state by default', () => {
    render(<Card card={mockCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-pressed', 'false');
    expect(card).toHaveAttribute('aria-label', 'Card 1');
  });

  it('shows card value when flipped', () => {
    const flippedCard = { ...mockCard, isFlipped: true };
    render(<Card card={flippedCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-pressed', 'true');
    expect(card).toHaveAttribute('aria-label', 'Card 1, value 5');
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onCardClick when clicked', () => {
    render(<Card card={mockCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(mockOnCardClick).toHaveBeenCalledWith(mockCard);
  });

  it('does not call onCardClick when disabled', () => {
    render(<Card card={mockCard} onCardClick={mockOnCardClick} disabled={true} />);
    
    const card = screen.getByRole('button');
    fireEvent.click(card);
    
    expect(mockOnCardClick).not.toHaveBeenCalled();
    expect(card).toHaveAttribute('tabindex', '-1');
  });

  it('handles keyboard interactions', () => {
    render(<Card card={mockCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    const card = screen.getByRole('button');
    
    // Test Enter key
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(mockOnCardClick).toHaveBeenCalledWith(mockCard);
    
    mockOnCardClick.mockClear();
    
    // Test Space key
    fireEvent.keyDown(card, { key: ' ' });
    expect(mockOnCardClick).toHaveBeenCalledWith(mockCard);
  });

  it('applies matched styling when card is matched', () => {
    const matchedCard = { ...mockCard, isMatched: true, isFlipped: true };
    render(<Card card={matchedCard} onCardClick={mockOnCardClick} disabled={false} />);
    
    const card = screen.getByRole('button');
    expect(card.className).toContain('matched');
  });
});
