import { useState, useEffect } from 'react';
import businessData from '../data/business.json';

export interface OpenStatus {
  isOpen: boolean;
  statusText: string;
  nextShiftText: string;
}

export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>({
    isOpen: false,
    statusText: 'Checking hours...',
    nextShiftText: ''
  });

  useEffect(() => {
    function computeStatus(): OpenStatus {
      // Watertown, MA is in America/New_York (US Eastern Time)
      const now = new Date();
      const easternString = now.toLocaleString('en-US', { timeZone: 'America/New_York' });
      const easternDate = new Date(easternString);

      const dayIndex = easternDate.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday
      const currentHours = easternDate.getHours();
      const currentMinutes = easternDate.getMinutes();
      const currentTimeVal = currentHours * 60 + currentMinutes;

      const isWeekday = dayIndex >= 1 && dayIndex <= 5;
      const isSaturday = dayIndex === 6;
      const isSunday = dayIndex === 0;

      // Hours config:
      // Mon-Fri: Lunch 11:30 - 14:45 (690 to 885), Dinner 17:00 - 21:30 (1020 to 1290)
      // Sat: 12:00 - 21:30 (720 to 1290)
      // Sun: 12:00 - 21:30 (720 to 1290)

      if (isWeekday) {
        const lunchOpen = 11 * 60 + 30; // 690
        const lunchClose = 14 * 60 + 45; // 885
        const dinnerOpen = 17 * 60; // 1020
        const dinnerClose = 21 * 60 + 30; // 1290

        if (currentTimeVal >= lunchOpen && currentTimeVal < lunchClose) {
          return {
            isOpen: true,
            statusText: 'Open Now · Lunch Service',
            nextShiftText: 'Lunch closes at 2:45 PM'
          };
        } else if (currentTimeVal >= lunchClose && currentTimeVal < dinnerOpen) {
          return {
            isOpen: false,
            statusText: 'Between Shifts',
            nextShiftText: 'Reopens for dinner at 5:00 PM'
          };
        } else if (currentTimeVal >= dinnerOpen && currentTimeVal < dinnerClose) {
          return {
            isOpen: true,
            statusText: 'Open Now · Dinner Service',
            nextShiftText: 'Closes tonight at 9:30 PM'
          };
        } else if (currentTimeVal < lunchOpen) {
          return {
            isOpen: false,
            statusText: 'Closed Now',
            nextShiftText: 'Opens for lunch at 11:30 AM'
          };
        } else {
          return {
            isOpen: false,
            statusText: 'Closed for the Night',
            nextShiftText: 'Opens tomorrow at 11:30 AM'
          };
        }
      } else if (isSaturday || isSunday) {
        const weekendOpen = 12 * 60; // 720
        const weekendClose = 21 * 60 + 30; // 1290

        if (currentTimeVal >= weekendOpen && currentTimeVal < weekendClose) {
          return {
            isOpen: true,
            statusText: 'Open Now · All-Day Service',
            nextShiftText: 'Closes tonight at 9:30 PM'
          };
        } else if (currentTimeVal < weekendOpen) {
          return {
            isOpen: false,
            statusText: 'Closed Now',
            nextShiftText: 'Opens today at 12:00 PM'
          };
        } else {
          return {
            isOpen: false,
            statusText: 'Closed for the Night',
            nextShiftText: isSaturday ? 'Opens Sunday at 12:00 PM' : 'Opens Monday at 11:30 AM'
          };
        }
      }

      return {
        isOpen: true,
        statusText: 'Call for Daily Hours',
        nextShiftText: businessData.business.phone
      };
    }

    setStatus(computeStatus());
    const interval = setInterval(() => {
      setStatus(computeStatus());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return status;
}
