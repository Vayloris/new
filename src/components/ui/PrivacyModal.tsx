import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import businessData from '../../data/business.json';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80">
          <h2 id="privacy-modal-title" className="text-xl font-bold tracking-tight text-neutral-900">
            Privacy Policy &amp; Terms of Service
          </h2>
          <button
            onClick={onClose}
            aria-label="Close privacy policy"
            className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="py-6 space-y-6 text-sm text-neutral-600 leading-relaxed">
          <p>
            This Privacy Policy describes how <strong className="text-neutral-900">{businessData.business.name}</strong>,
            located at {businessData.contact.address}, handles information collected via this presence website.
          </p>

          <section className="space-y-2">
            <h3 className="text-neutral-900 font-semibold text-base">
              1. Data Collection &amp; Direct Inquiries
            </h3>
            <p>
              When you submit a message or catering inquiry through our contact form, we collect the details you provide:
              your name, email address, phone number, and inquiry notes. This information is processed securely through our
              third-party form delivery provider ({businessData.contact.formEndpoint}) solely to respond to your specific request.
              We never sell, rent, or trade your personal contact details to any third-party marketers or data brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-neutral-900 font-semibold text-base">
              2. Website Telemetry &amp; Analytics
            </h3>
            <p>
              We utilize aggregate telemetry (including Google Analytics 4) to monitor website traffic, general geographic
              location, and device usability. This data helps us improve menu legibility, accessibility, and navigation. No
              financial or sensitive personal data is collected or tracked.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-neutral-900 font-semibold text-base">
              3. Pure Presence Mandate &amp; Zero Payment Storage
            </h3>
            <p>
              This website serves strictly as an informational and voice-routing presence. We do not store credit cards,
              debit card information, or online transactional credentials on this domain.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-semibold text-neutral-900">4. Contacting Us</h3>
            <p>
              If you have any questions regarding your information or wish to remove an inquiry record, please reach out to us
              directly at <a href={`mailto:${businessData.contact.email}`} className="text-neutral-900 font-medium underline underline-offset-4">{businessData.contact.email}</a> or call our restaurant at {businessData.business.phone}.
            </p>
          </section>
        </div>

        <div className="pt-4 border-t border-neutral-200/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors min-h-[44px]"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
