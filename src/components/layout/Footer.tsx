import { useState } from 'react';
import businessData from '../../data/business.json';
import { PrivacyModal } from '../ui/PrivacyModal';
import { useTrackEvent } from '../../hooks/useTrackEvent';

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const { track } = useTrackEvent();

  return (
    <>
      <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Column 1: Identity & Entity */}
            <div className="space-y-3 md:col-span-1">
              <span className="text-xl font-semibold tracking-tight text-white block">
                {businessData.business.name}
              </span>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                Japanese casual dining institution serving Watertown Square and surrounding Middlesex County communities with traditional sashimi and signature fusion maki.
              </p>
              <div className="pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1 font-normal">
                  Delivery &amp; Dining Radius
                </span>
                <p className="text-xs text-neutral-300 font-normal">
                  {businessData.business.areaServed.join(' · ')}
                </p>
              </div>
            </div>

            {/* Column 2: Location */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-normal">
                Location &amp; Access
              </span>
              <div className="space-y-2 text-sm font-normal">
                <div>
                  <p className="text-white">{businessData.contact.addressObject.streetAddress}</p>
                  <p className="text-neutral-400">
                    {businessData.contact.addressObject.addressLocality}, {businessData.contact.addressObject.addressRegion} {businessData.contact.addressObject.postalCode}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">{businessData.business.district}</p>
                </div>
                <div className="pt-1">
                  <a
                    href={businessData.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('click_directions', { location: 'footer' })}
                    className="inline-flex items-center text-xs text-neutral-300 hover:text-white underline underline-offset-4 transition-colors min-h-[44px]"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Column 3: Contact & Orders */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-normal">
                Direct Contact &amp; Orders
              </span>
              <ul className="space-y-2.5 text-sm font-normal">
                <li>
                  <a
                    href={`tel:${businessData.business.phoneRaw}`}
                    onClick={() => track('click_phone', { location: 'footer' })}
                    className="text-white hover:text-white transition-colors group min-h-[44px] flex items-center"
                  >
                    <span className="font-mono">{businessData.business.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${businessData.contact.email}`}
                    className="text-neutral-400 hover:text-white transition-colors min-h-[44px] flex items-center"
                  >
                    <span>{businessData.contact.email}</span>
                  </a>
                </li>
                <li className="pt-1">
                  <a
                    href={businessData.business.directActionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('click_order_online', { location: 'footer' })}
                    className="inline-flex items-center text-xs text-neutral-300 hover:text-white underline underline-offset-4 min-h-[44px]"
                  >
                    {businessData.business.directActionLabel} Direct Portal
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick Schedule Summary */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-normal">
                Operating Schedule
              </span>
              <ul className="space-y-1.5 text-xs text-neutral-300 font-mono font-normal">
                <li className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Mon - Fri Lunch</span>
                  <span>11:30 AM - 2:45 PM</span>
                </li>
                <li className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Mon - Fri Dinner</span>
                  <span>5:00 PM - 9:30 PM</span>
                </li>
                <li className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Saturday</span>
                  <span>12:00 PM - 9:30 PM</span>
                </li>
                <li className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-400">Sunday</span>
                  <span>12:00 PM - 9:30 PM</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-normal">
            <p>
              &copy; {new Date().getFullYear()} {businessData.business.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setPrivacyOpen(true)}
                className="hover:text-neutral-300 underline underline-offset-4 cursor-pointer transition-colors inline-flex items-center min-h-[44px]"
              >
                Privacy Policy &amp; Legal Disclosures
              </button>
              <a
                href="#top"
                className="hover:text-neutral-300 transition-colors min-h-[44px] flex items-center"
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </>
  );
}
