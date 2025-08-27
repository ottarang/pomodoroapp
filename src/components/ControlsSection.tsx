import React from 'react';
import { Play, Pause, Square, Settings, Volume2, VolumeX } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useTimer } from '../hooks/useTimer';
import { motion } from 'framer-motion';

export function ControlsSection() {
  const {
    timerState,
    settings,
    startTimer,
    pauseTimer,
    resumeTimer,
    stopTimer,
    toggleSettings,
    updateSettings,
    sessionsCompleted
  } = useAppStore();

  const handleStartFocus = () => {
    startTimer('focus', settings.focusDuration);
  };

  const handleStartBreak = () => {
    const isLongBreak = sessionsCompleted > 0 && sessionsCompleted % settings.sessionsUntilLongBreak === 0;
    const duration = isLongBreak ? settings.longBreakDuration : settings.shortBreakDuration;
    startTimer(isLongBreak ? 'longBreak' : 'break', duration);
  };

  const handlePlayPause = () => {
    if (timerState === 'running') {
      pauseTimer();
    } else if (timerState === 'paused') {
      resumeTimer();
    }
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  return (
    <div className="text-white items-center box-border caret-transparent flex flex-row-reverse justify-center pt-5 pb-10 px-5 md:items-end md:flex-row md:justify-between md:pt-12 md:px-12">
      {/* Right side controls */}
      <div className="items-center box-border caret-transparent flex justify-between mt-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSound}
          className="relative text-white items-center bg-indigo-950 caret-transparent flex h-9 justify-center text-center w-9 z-[5] ml-2.5 p-0 rounded-lg border-solid border-transparent hover:bg-violet-600 transition-colors"
        >
          {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSettings}
          className="relative text-white items-center bg-indigo-950 caret-transparent flex h-9 justify-center text-center w-9 z-[5] ml-2.5 p-0 rounded-lg border-solid border-transparent hover:bg-violet-600 transition-colors"
        >
          <Settings size={20} />
        </motion.button>
      </div>

      {/* Center timer controls */}
      <div className="items-center box-border caret-transparent flex justify-between mt-3">
        {/* Timer type selector */}
        <div className="relative bg-indigo-950 box-border caret-transparent flex rounded-[32px] border-2 border-solid border-white/20 mr-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartFocus}
            disabled={timerState === 'running'}
            className="relative box-border caret-transparent h-9 w-16 z-10 text-xs font-semibold disabled:opacity-50 hover:bg-purple-600/20 rounded-l-[30px] transition-colors"
          >
            Focus
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartBreak}
            disabled={timerState === 'running'}
            className="relative box-border caret-transparent h-9 w-16 z-10 text-xs font-semibold disabled:opacity-50 hover:bg-purple-600/20 rounded-r-[30px] transition-colors"
          >
            Break
          </motion.button>
        </div>

        {/* Play/Pause/Stop controls */}
        {timerState !== 'idle' && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="relative text-white items-center bg-purple-600 caret-transparent flex h-9 justify-center text-center w-9 z-[5] ml-2.5 p-0 rounded-lg border-solid border-transparent hover:bg-purple-700 transition-colors"
          >
            {timerState === 'running' ? <Pause size={20} /> : <Play size={20} />}
          </motion.button>
        )}

        {timerState !== 'idle' && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={stopTimer}
            className="relative text-white items-center bg-red-600 caret-transparent flex h-9 justify-center text-center w-9 z-[5] ml-2.5 p-0 rounded-lg border-solid border-transparent hover:bg-red-700 transition-colors"
          >
            <Square size={20} />
          </motion.button>
        )}
      </div>
    </div>
  );
}
