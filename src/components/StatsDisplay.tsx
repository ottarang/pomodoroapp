import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Clock, Zap } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function StatsDisplay() {
  const { sessionsCompleted, user } = useAppStore();

  if (!user) return null;

  const stats = [
    {
      icon: Trophy,
      label: 'Sessions Completed',
      value: sessionsCompleted,
      color: 'text-yellow-400'
    },
    {
      icon: Target,
      label: 'Focus Streak',
      value: Math.min(sessionsCompleted, 7), // Simple streak calculation
      color: 'text-green-400'
    },
    {
      icon: Clock,
      label: 'Total Focus Time',
      value: `${Math.round((sessionsCompleted * 25) / 60)}h`, // Assuming 25min sessions
      color: 'text-blue-400'
    },
    {
      icon: Zap,
      label: 'Productivity Score',
      value: Math.min(100, sessionsCompleted * 10),
      color: 'text-purple-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 bg-black/60 backdrop-blur-lg rounded-2xl p-4 text-white min-w-[200px] z-40"
    >
      <h3 className="text-lg font-semibold mb-3 text-center">Your Progress</h3>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <stat.icon size={16} className={`mr-2 ${stat.color}`} />
              <span className="text-sm opacity-80">{stat.label}</span>
            </div>
            <span className="font-semibold">{stat.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
