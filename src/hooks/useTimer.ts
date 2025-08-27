import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import toast from 'react-hot-toast';

export function useTimer() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const {
    timerState,
    timeRemaining,
    currentSession,
    settings,
    completeSession,
    setShowOnboarding
  } = useAppStore();

  useEffect(() => {
    if (timerState === 'running' && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        useAppStore.setState((state) => {
          const newTimeRemaining = state.timeRemaining - 1;
          
          if (newTimeRemaining <= 0) {
            // Timer completed
            state.completeSession();
            
            // Show notification
            if (state.settings.notificationsEnabled) {
              const sessionType = state.currentSession?.type;
              const message = sessionType === 'focus' 
                ? '🎉 Focus session completed! Time for a break.'
                : '✨ Break time over! Ready to focus?';
              toast.success(message);
            }
            
            // Play sound
            if (state.settings.soundEnabled) {
              playNotificationSound();
            }
            
            return { timeRemaining: 0 };
          }
          
          return { timeRemaining: newTimeRemaining };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState, timeRemaining]);

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  return {
    timerState,
    timeRemaining,
    currentSession,
    settings
  };
}
