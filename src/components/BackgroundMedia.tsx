import React from 'react';
import { useAppStore } from '../store/useAppStore';

export function BackgroundMedia() {
  const { settings } = useAppStore();

  return (
    <div className="fixed bg-white box-border caret-transparent object-cover z-[-1] inset-0 after:accent-auto after:box-border after:caret-transparent after:text-gray-50 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:absolute after:text-start after:indent-[0px] after:normal-case after:visible after:border-separate after:inset-0 after:font-inter">
      <video loop autoPlay muted className="box-border caret-transparent hidden h-full object-cover w-full"></video>
      <img 
        src={settings.backgroundUrl} 
        className="box-border caret-transparent h-full object-cover w-full transition-opacity duration-500" 
        alt="Background"
        onError={(e) => {
          // Fallback to default image if custom URL fails
          (e.target as HTMLImageElement).src = "https://c.animaapp.com/mettnup2ip1rht/assets/115716ff2673a42650ae.jpg";
        }}
      />
    </div>
  );
}
