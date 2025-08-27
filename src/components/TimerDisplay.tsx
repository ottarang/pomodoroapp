import React from 'react';
import { motion } from 'framer-motion';
import { useTimer } from '../hooks/useTimer';

export function TimerDisplay() {
  const { timerState, timeRemaining, currentSession } = useTimer();

  if (timerState === 'idle' || !currentSession) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionTypeLabel = (type: string) => {
    switch (type) {
      case 'focus': return '🎯 Focus Time';
      case 'break': return '☕ Short Break';
      case 'longBreak': return '🌟 Long Break';
      default: return 'Session';
    }
  };

  const progress = currentSession ? ((currentSession.duration - timeRemaining) / currentSession.duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <div className="bg-black/80 backdrop-blur-lg rounded-3xl p-8 text-center text-white min-w-[300px]">
        <div className="text-lg font-semibold mb-2 opacity-80">
          {getSessionTypeLabel(currentSession.type)}
        </div>
        
        <div className="text-6xl font-bold mb-6 font-mono">
          {formatTime(timeRemaining)}
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2 mb-4">
          <motion.div
            className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="text-sm opacity-60">
          {timerState === 'paused' ? 'Paused' : 'In Progress'}
        </div>
      </div>
    </motion.div>
  );
}
