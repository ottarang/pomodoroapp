import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { format } from 'date-fns';

export function useClock() {
  const { currentTime, updateCurrentTime } = useAppStore();

  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateCurrentTime]);

  const formatTime = (date: Date) => {
    return format(date, 'h:mm');
  };

  const formatPeriod = (date: Date) => {
    return format(date, 'a');
  };

  const formatDay = (date: Date) => {
    return format(date, 'EEEE');
  };

  const formatDate = (date: Date) => {
    return format(date, 'MMMM d, yyyy');
  };

  return {
    currentTime,
    formatTime,
    formatPeriod,
    formatDay,
    formatDate
  };
}
