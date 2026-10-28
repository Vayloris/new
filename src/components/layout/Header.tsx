import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import businessData from '../../data/business.json';
import { useTrackEvent } from '../../hooks/useTrackEvent';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { track } = useTrackEvent();

  const handlePhoneClick = () => {
    track('click_phone', { location: 'header' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-xs border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark - Refined weight */}
        <a
          href="/"
          className="text-lg md:text-xl font-semibold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          {businessData.business.name}
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-normal text-neutral-600">
          <a
            href="#offerings"
            className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            Specialty Maki
          </a>
          <a
            href="#about"
            className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            Heritage
          </a>
          <a
            href="#reviews"
            className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            Verified Reviews
          </a>
          <a
            href="#faq"
            className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            FAQ
          </a>
          <a
            href="#contact"
            className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4"
          >
            Hours &amp; Location
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${businessData.business.phoneRaw}`}
            onClick={handlePhoneClick}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs md:text-sm font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-all duration-150 ease-out active:scale-[0.98] whitespace-nowrap shrink-0 min-h-[44px]"
          >
            Call {businessData.business.phone}
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-normal text-neutral-800">
            <a
              href="#offerings"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-neutral-100 min-h-[44px] flex items-center"
            >
              Specialty Maki
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-neutral-100 min-h-[44px] flex items-center"
            >
              Heritage
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-neutral-100 min-h-[44px] flex items-center"
            >
              Verified Reviews
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-neutral-100 min-h-[44px] flex items-center"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-neutral-100 min-h-[44px] flex items-center"
            >
              Hours &amp; Location
            </a>
          </nav>
          <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
            <a
              href={`tel:${businessData.business.phoneRaw}`}
              onClick={() => {
                handlePhoneClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center py-3 px-4 bg-neutral-900 text-white rounded-lg text-sm font-medium active:scale-[0.98] min-h-[44px]"
            >
              Call {businessData.business.phone}
            </a>
            <a
              href={businessData.business.directActionUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track('click_order_online', { location: 'mobile_nav' });
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center py-3 px-4 bg-neutral-100 text-neutral-900 border border-neutral-200 rounded-lg text-sm font-medium active:scale-[0.98] min-h-[44px]"
            >
              {businessData.business.directActionLabel}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
