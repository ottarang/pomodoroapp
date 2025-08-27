import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Volume2, Bell, Palette } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function SettingsPanel() {
  const { showSettings, settings, toggleSettings, updateSettings } = useAppStore();

  const handleDurationChange = (key: keyof typeof settings, value: number) => {
    updateSettings({ [key]: value * 60 }); // Convert minutes to seconds
  };

  return (
    <AnimatePresence>
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={toggleSettings}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black/80 backdrop-blur-lg rounded-3xl p-8 text-white max-w-md w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Settings</h2>
              <button
                onClick={toggleSettings}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Timer Settings */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Clock size={20} className="mr-2" />
                <h3 className="text-lg font-semibold">Timer Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Focus Duration (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={Math.round(settings.focusDuration / 60)}
                    onChange={(e) => handleDurationChange('focusDuration', parseInt(e.target.value))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Short Break (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={Math.round(settings.shortBreakDuration / 60)}
                    onChange={(e) => handleDurationChange('shortBreakDuration', parseInt(e.target.value))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Long Break (minutes)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={Math.round(settings.longBreakDuration / 60)}
                    onChange={(e) => handleDurationChange('longBreakDuration', parseInt(e.target.value))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Sessions until Long Break</label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={settings.sessionsUntilLongBreak}
                    onChange={(e) => updateSettings({ sessionsUntilLongBreak: parseInt(e.target.value) })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Audio Settings */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Volume2 size={20} className="mr-2" />
                <h3 className="text-lg font-semibold">Audio Settings</h3>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.soundEnabled}
                    onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                    className="mr-3 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded"
                  />
                  Enable notification sounds
                </label>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Bell size={20} className="mr-2" />
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.notificationsEnabled}
                    onChange={(e) => updateSettings({ notificationsEnabled: e.target.checked })}
                    className="mr-3 w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded"
                  />
                  Enable notifications
                </label>
              </div>
            </div>

            {/* Background Settings */}
            <div>
              <div className="flex items-center mb-4">
                <Palette size={20} className="mr-2" />
                <h3 className="text-lg font-semibold">Background</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Background URL</label>
                  <input
                    type="url"
                    value={settings.backgroundUrl}
                    onChange={(e) => updateSettings({ backgroundUrl: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
