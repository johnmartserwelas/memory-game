/**
 * Custom hook for managing game timer
 * Handles start, stop, reset, and time formatting
 */
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import type { TimerState } from '@/src/types/game';

export function useTimer() {
  const [timerState, setTimerState] = useState<TimerState>({
    seconds: 0,
    isRunning: false,
    startTime: null,
    endTime: null,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start the timer
  const startTimer = useCallback(() => {
    const now = Date.now();
    setTimerState(prevState => ({
      ...prevState,
      isRunning: true,
      startTime: prevState.startTime || now, // Don't reset if already started
    }));
  }, []);

  // Stop the timer
  const stopTimer = useCallback(() => {
    setTimerState(prevState => ({
      ...prevState,
      isRunning: false,
      endTime: Date.now(),
    }));
  }, []);

  // Reset the timer
  const resetTimer = useCallback(() => {
    setTimerState({
      seconds: 0,
      isRunning: false,
      startTime: null,
      endTime: null,
    });
  }, []);

  // Update timer every second when running
  useEffect(() => {
    if (timerState.isRunning && timerState.startTime) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - timerState.startTime!) / 1000);
        
        setTimerState(prevState => ({
          ...prevState,
          seconds: elapsedSeconds,
        }));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.startTime]);

  return {
    timerState,
    startTimer,
    stopTimer,
    resetTimer,
  };
}
