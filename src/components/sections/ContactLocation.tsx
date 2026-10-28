import React, { useState } from 'react';
import businessData from '../../data/business.json';
import { toast } from '../ui/sonner';
import { useTrackEvent } from '../../hooks/useTrackEvent';

export function ContactLocation() {
  const { track } = useTrackEvent();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Takeout / Pickup',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      toast.error('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    track('submit_inquiry', { type: formState.inquiryType });

    const submissionPromise = fetch(businessData.contact.formEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        ...formState,
        submittedAt: new Date().toISOString()
      })
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Submission endpoint response error');
        }
        return res.json().catch(() => ({ ok: true }));
      })
      .then(() => {
        setFormState({
          name: '',
          email: '',
          phone: '',
          inquiryType: 'Takeout / Pickup',
          message: ''
        });
      });

    toast.promise(submissionPromise, {
      loading: 'Transmitting inquiry to Super Fusion team...',
      success: 'Inquiry received! We will follow up shortly.',
      error: 'Inquiry noted. For immediate service, please call (617) 393-0008 directly.'
    });

    try {
      await submissionPromise;
    } catch {
      // Handled in toast.promise
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
            <span>Direct Presence &amp; Visit</span>
            <span aria-hidden="true">·</span>
            <span>Watertown Square</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            Location, Operating Hours &amp; Inquiries
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Visit our casual dining room on Mt. Auburn Street or send us a message regarding party catering platters, dietary questions, or table reservations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Location, Full Schedule, Transit & Map */}
          <div className="lg:col-span-6 space-y-8">
            {/* Location Block */}
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-6" itemScope itemType="https://schema.org/PostalAddress">
              {/* Invisible Google SEO Semantic Microdata for Geo Coordinates & Address */}
              <meta itemProp="streetAddress" content={businessData.contact.addressObject.streetAddress} />
              <meta itemProp="addressLocality" content={businessData.contact.addressObject.addressLocality} />
              <meta itemProp="addressRegion" content={businessData.contact.addressObject.addressRegion} />
              <meta itemProp="postalCode" content={businessData.contact.addressObject.postalCode} />
              <meta itemProp="addressCountry" content={businessData.contact.addressObject.addressCountry} />
              <div className="sr-only select-none pointer-events-none opacity-0 absolute -z-50 text-[0px]" itemScope itemType="https://schema.org/GeoCoordinates">
                <meta itemProp="latitude" content={String(businessData.contact.geo.latitude)} />
                <meta itemProp="longitude" content={String(businessData.contact.geo.longitude)} />
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-medium text-neutral-900">
                  Restaurant Location
                </h3>
                <div className="space-y-1 text-sm text-neutral-700 font-normal">
                  <p className="text-neutral-900 font-medium">{businessData.business.name}</p>
                  <p>{businessData.contact.addressObject.streetAddress}</p>
                  <p>
                    {businessData.contact.addressObject.addressLocality}, {businessData.contact.addressObject.addressRegion} {businessData.contact.addressObject.postalCode}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {businessData.business.district}
                  </p>
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={businessData.contact.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('click_directions', { location: 'contact_block' })}
                    className="inline-flex items-center justify-center px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-neutral-800 transition-colors min-h-[44px]"
                  >
                    Get Directions in Google Maps
                  </a>
                  <a
                    href={`tel:${businessData.business.phoneRaw}`}
                    onClick={() => track('click_phone', { location: 'contact_block' })}
                    className="inline-flex items-center justify-center px-4 py-2 bg-white text-neutral-900 border border-neutral-300 rounded-lg text-xs font-medium hover:bg-neutral-50 transition-colors min-h-[44px]"
                  >
                    Call {businessData.business.phone}
                  </a>
                </div>
              </div>

              {/* Transit & Parking Details */}
              <div className="pt-6 border-t border-neutral-200 space-y-3 text-xs text-neutral-600 font-normal">
                <p>
                  <span className="font-medium text-neutral-900">Parking:</span> {businessData.contact.parkingAndTransit.parkingNote}
                </p>
                <p>
                  <span className="font-medium text-neutral-900">MBTA Transit:</span> {businessData.contact.parkingAndTransit.transitNote}
                </p>
              </div>
            </div>

            {/* Operating Schedules Block */}
            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-neutral-900">
                  Weekly Operating Schedule
                </h3>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  Eastern Time
                </span>
              </div>

              <div className="divide-y divide-neutral-200/80 text-xs sm:text-sm font-mono">
                {businessData.hours.map((h, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between font-normal">
                    <span className="font-sans text-neutral-700">{h.day}</span>
                    <span className="text-neutral-900 tabular-nums">{h.hours}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-neutral-500 pt-1 font-sans font-normal">
                Kitchen orders close 15 minutes prior to listed closing times.
              </p>
            </div>
          </div>

          {/* Right Column: Serverless Asynchronous Inquiry Capture Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 bg-neutral-50 rounded-2xl border border-neutral-200/80 shadow-xs space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-medium text-neutral-900">
                  Send a Direct Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-normal">
                  Fill out this form for catering inquiries, event platters, or general questions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="inquiry-name" className="block text-xs font-medium text-neutral-600 uppercase tracking-wider mb-1.5 font-mono">
                    Your Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Rachel Miller"
                    className="w-full px-4 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 min-h-[44px]"
                  />
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiry-email" className="block text-xs font-medium text-neutral-600 uppercase tracking-wider mb-1.5 font-mono">
                      Email Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="rachel@example.com"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 min-h-[44px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry-phone" className="block text-xs font-medium text-neutral-600 uppercase tracking-wider mb-1.5 font-mono">
                      Phone Number
                    </label>
                    <input
                      id="inquiry-phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="(617) 000-0000"
                      className="w-full px-4 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div>
                  <label htmlFor="inquiry-type" className="block text-xs font-medium text-neutral-600 uppercase tracking-wider mb-1.5 font-mono">
                    Inquiry Category
                  </label>
                  <select
                    id="inquiry-type"
                    name="inquiryType"
                    value={formState.inquiryType}
                    onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 min-h-[44px]"
                  >
                    <option value="Takeout / Pickup">Takeout / Pickup Order Question</option>
                    <option value="Catering & Party Platters">Catering &amp; Party Platters</option>
                    <option value="Dine-In Table Reservation">Dine-In Table Reservation</option>
                    <option value="Dietary & Allergy Inquiry">Dietary &amp; Allergy Inquiry</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="inquiry-message" className="block text-xs font-medium text-neutral-600 uppercase tracking-wider mb-1.5 font-mono">
                    Message Details <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us about your order or question..."
                    className="w-full px-4 py-2.5 text-sm bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 font-normal"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center py-3 px-6 bg-neutral-900 text-white font-medium text-sm rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none min-h-[48px] shadow-sm cursor-pointer"
                >
                  {isSubmitting ? 'Sending Inquiry...' : 'Submit In-Page Inquiry'}
                </button>

                <p className="text-[11px] text-neutral-500 text-center leading-normal font-normal">
                  Inquiries are delivered securely via form dispatch to our Watertown store team. For same-hour orders, please call directly.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
