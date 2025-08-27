import React from 'react';
import { useClock } from '../hooks/useClock';
import { useAppStore } from '../store/useAppStore';

export function ClockSection() {
  const { currentTime, formatTime, formatPeriod, formatDay } = useClock();
  const { user } = useAppStore();

  const userName = user?.name || 'FlowZen User';
  const dayName = formatDay(currentTime);

  return (
    <div className="text-white box-border caret-transparent mt-auto mb-8">
      <div className="relative text-[28px] font-semibold box-border caret-transparent leading-[30.8px] max-w-[337.5px] text-center w-[550px] z-[2] -mb-2 mx-auto font-degular_semibold md:text-[40px] md:leading-[44px] md:max-w-6xl md:-mb-8">
        Let's seize the day, {userName}. Happy {dayName}!
      </div>
      <div className="text-[93.75px] font-bold box-border caret-transparent block leading-[117.188px] text-center uppercase font-degular_bold md:text-[240px] md:leading-[300px]">
        {formatTime(currentTime)}
        <span className="text-base box-content caret-black inline leading-[normal] md:text-[120px] md:aspect-auto md:box-border md:caret-transparent md:hidden md:leading-[150px] md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:decoration-auto md:underline-offset-auto md:[mask-position:0%] md:bg-left-top md:scroll-m-0 md:scroll-p-[auto]">
          {' '}{formatPeriod(currentTime)}
        </span>
      </div>
    </div>
  );
}
