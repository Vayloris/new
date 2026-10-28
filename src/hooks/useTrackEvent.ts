import { useCallback } from 'react';
import businessData from '../data/business.json';

type EventAction =
  | 'click_phone'
  | 'click_directions'
  | 'click_menu'
  | 'click_order_online'
  | 'click_voice_assistant'
  | 'submit_inquiry';

export function useTrackEvent() {
  const track = useCallback((action: EventAction, params?: Record<string, string | number | boolean>) => {
    try {
      if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', action, {
          business_name: businessData.business.name,
          ...params
        });
      }
    } catch {
      // Non-blocking telemetry
    }
  }, []);

  return { track };
}
