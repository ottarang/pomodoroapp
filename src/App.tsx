import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BackgroundMedia } from './components/BackgroundMedia';
import { MainDashboard } from './components/MainDashboard';
import { OnboardingFlow } from './components/OnboardingFlow';
import { SettingsPanel } from './components/SettingsPanel';
import { TimerDisplay } from './components/TimerDisplay';
import { StatsDisplay } from './components/StatsDisplay';
import { CompletionCelebration } from './components/CompletionCelebration';
import { useAppStore } from './store/useAppStore';

function App() {
  const { showOnboarding, isOnboardingComplete, user } = useAppStore();

  // Request notification permission on app load
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="text-gray-50 text-base not-italic normal-nums font-normal accent-auto items-stretch bg-black box-border caret-transparent flex flex-col h-screen justify-between tracking-[normal] leading-5 list-outside list-disc text-start indent-[0px] normal-case visible overflow-hidden border-separate font-inter">
      <BackgroundMedia />
      
      {isOnboardingComplete && user ? (
        <>
          <MainDashboard />
          <TimerDisplay />
          <StatsDisplay />
          <SettingsPanel />
          <CompletionCelebration />
        </>
      ) : (
        <OnboardingFlow />
      )}
      
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
          },
        }}
      />
    </div>
  );
}

export default App;
