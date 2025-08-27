import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}

export interface TimerSession {
  id: string;
  type: 'focus' | 'break' | 'longBreak';
  duration: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
}

export interface AppSettings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  backgroundType: 'image' | 'video' | 'color';
  backgroundUrl: string;
}

interface AppState {
  // User state
  user: User | null;
  isOnboardingComplete: boolean;
  
  // Timer state
  currentTime: Date;
  timerState: 'idle' | 'running' | 'paused' | 'completed';
  currentSession: TimerSession | null;
  timeRemaining: number;
  sessionsCompleted: number;
  
  // Settings
  settings: AppSettings;
  
  // UI state
  showSettings: boolean;
  showOnboarding: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  completeOnboarding: () => void;
  updateCurrentTime: () => void;
  startTimer: (type: 'focus' | 'break' | 'longBreak', duration: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: () => void;
  completeSession: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  toggleSettings: () => void;
  setShowOnboarding: (show: boolean) => void;
}

const defaultSettings: AppSettings = {
  focusDuration: 25 * 60, // 25 minutes
  shortBreakDuration: 5 * 60, // 5 minutes
  longBreakDuration: 15 * 60, // 15 minutes
  sessionsUntilLongBreak: 4,
  soundEnabled: true,
  notificationsEnabled: true,
  theme: 'auto',
  backgroundType: 'image',
  backgroundUrl: 'https://c.animaapp.com/mettnup2ip1rht/assets/115716ff2673a42650ae.jpg'
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isOnboardingComplete: false,
      currentTime: new Date(),
      timerState: 'idle',
      currentSession: null,
      timeRemaining: 0,
      sessionsCompleted: 0,
      settings: defaultSettings,
      showSettings: false,
      showOnboarding: true,

      // Actions
      setUser: (user) => set({ user, isOnboardingComplete: !!user }),
      
      completeOnboarding: () => set({ isOnboardingComplete: true, showOnboarding: false }),
      
      updateCurrentTime: () => set({ currentTime: new Date() }),
      
      startTimer: (type, duration) => {
        const session: TimerSession = {
          id: Date.now().toString(),
          type,
          duration,
          startTime: new Date(),
          completed: false
        };
        set({
          currentSession: session,
          timerState: 'running',
          timeRemaining: duration
        });
      },
      
      pauseTimer: () => set({ timerState: 'paused' }),
      
      resumeTimer: () => set({ timerState: 'running' }),
      
      stopTimer: () => set({
        timerState: 'idle',
        currentSession: null,
        timeRemaining: 0
      }),
      
      completeSession: () => {
        const { currentSession, sessionsCompleted } = get();
        if (currentSession) {
          const completedSession = {
            ...currentSession,
            endTime: new Date(),
            completed: true
          };
          set({
            currentSession: completedSession,
            timerState: 'completed',
            sessionsCompleted: currentSession.type === 'focus' ? sessionsCompleted + 1 : sessionsCompleted
          });
        }
      },
      
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
      
      toggleSettings: () => set((state) => ({ showSettings: !state.showSettings })),
      
      setShowOnboarding: (show) => set({ showOnboarding: show })
    }),
    {
      name: 'flowzen-storage',
      partialize: (state) => ({
        user: state.user,
        isOnboardingComplete: state.isOnboardingComplete,
        settings: state.settings,
        sessionsCompleted: state.sessionsCompleted
      })
    }
  )
);
