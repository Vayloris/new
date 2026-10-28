import { useState } from 'react';
import businessData from '../../data/business.json';
import { useOpenStatus } from '../../hooks/useOpenStatus';
import { useTrackEvent } from '../../hooks/useTrackEvent';
import { Drawer } from '../ui/drawer';

export function MobileActionDrawer() {
  const [voiceSheetOpen, setVoiceSheetOpen] = useState(false);
  const { isOpen, statusText, nextShiftText } = useOpenStatus();
  const { track } = useTrackEvent();

  const handleVoiceOrderClick = () => {
    track('click_voice_assistant', { source: 'sticky_bar' });
    setVoiceSheetOpen(true);
  };

  const handleCallClick = () => {
    track('click_phone', { source: 'voice_drawer' });
    window.location.href = `tel:${businessData.business.phoneRaw}`;
  };

  return (
    <>
      {/* Sticky Mobile Action Bar: Max height capped strictly under 15% of mobile viewport - Zero symbols */}
      <aside aria-label="Quick Actions" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 px-3 py-2 shadow-lg">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          {/* Primary CTA - Pure Typography */}
          <button
            type="button"
            onClick={handleVoiceOrderClick}
            className="flex-1 flex items-center justify-center bg-neutral-900 text-white rounded-xl py-2.5 px-3 font-semibold text-xs active:scale-[0.98] transition-transform min-h-[44px] shadow-sm cursor-pointer"
          >
            <span className="truncate">Order via Voice Assistant</span>
          </button>

          {/* Quick Direct Call Button - Text only */}
          <a
            href={`tel:${businessData.business.phoneRaw}`}
            onClick={() => track('click_phone', { source: 'sticky_bar' })}
            className="flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200/80 rounded-xl px-3 py-2.5 text-xs font-semibold active:scale-[0.98] transition-transform min-h-[44px] shrink-0"
          >
            Call
          </a>

          {/* Quick Maps Navigation - Text only */}
          <a
            href={businessData.contact.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('click_directions', { source: 'sticky_bar' })}
            className="flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200/80 rounded-xl px-3 py-2.5 text-xs font-semibold active:scale-[0.98] transition-transform min-h-[44px] shrink-0"
          >
            Map
          </a>
        </div>
      </aside>

      {/* Voice Assistant Routing Modal / Sheet - Zero symbols next to text */}
      <Drawer
        isOpen={voiceSheetOpen}
        onClose={() => setVoiceSheetOpen(false)}
        title="Direct Voice Inbound Receptionist"
        description="Instant phone ordering & inquiries without app download"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-neutral-900">
                Live Kitchen Status
              </span>
              <span className={`font-mono font-medium ${isOpen ? 'text-emerald-700' : 'text-neutral-600'}`}>
                {statusText}
              </span>
            </div>
            <p className="text-neutral-500">{nextShiftText}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-neutral-600 leading-relaxed">
              Super Fusion Cuisine II routes calls directly to our front-of-house sushi bar team. Call now to place a fresh maki order, confirm dietary requests, or book a table.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleCallClick}
              className="w-full flex items-center justify-center py-3 px-4 bg-neutral-900 text-white rounded-xl text-sm font-semibold active:scale-[0.98] transition-transform min-h-[48px] shadow-sm cursor-pointer"
            >
              Connect to Restaurant: {businessData.business.phone}
            </button>

            <a
              href={`sms:${businessData.business.phoneRaw}?&body=${encodeURIComponent(businessData.business.smsPrompt)}`}
              onClick={() => track('click_voice_assistant', { channel: 'sms' })}
              className="w-full flex items-center justify-center py-3 px-4 bg-neutral-100 text-neutral-900 border border-neutral-200 rounded-xl text-sm font-medium hover:bg-neutral-200 active:scale-[0.98] transition-colors min-h-[44px]"
            >
              Send SMS Pre-Order Prompt
            </a>
          </div>
        </div>
      </Drawer>
    </>
  );
}
