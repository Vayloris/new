import { useState } from 'react';
import businessData from '../../data/business.json';
import { useOpenStatus } from '../../hooks/useOpenStatus';
import { useTrackEvent } from '../../hooks/useTrackEvent';

export function Hero() {
  const { isOpen, statusText, nextShiftText } = useOpenStatus();
  const { track } = useTrackEvent();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative pt-8 pb-14 md:pt-16 md:pb-20 overflow-hidden" id="top" itemScope itemType="https://schema.org/Restaurant">
      {/* Background & Microdata SEO Embedding for Google */}
      <meta itemProp="name" content={businessData.business.name} />
      <meta itemProp="priceRange" content={businessData.business.priceRange} />
      <meta itemProp="telephone" content={businessData.business.phone} />
      <span className="sr-only select-none pointer-events-none opacity-0 absolute -z-50 text-[0px] leading-none" aria-hidden="true" itemProp="priceRange">
        {businessData.business.priceRange}
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Semantic Entity & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Operational Status Line - Smart weight hierarchy */}
            <div className="flex items-center gap-3 text-xs text-neutral-500">
              <span className="font-mono text-neutral-700 uppercase tracking-wider">
                {businessData.business.district}
              </span>
              <span aria-hidden="true" className="text-neutral-300">/</span>
              <span className={isOpen ? 'text-emerald-700 font-medium' : 'text-neutral-700'}>
                {statusText}
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-neutral-300">/</span>
              <span className="hidden sm:inline text-neutral-500">
                {nextShiftText}
              </span>
            </div>

            {/* Semantic Entity Heading - Refined, smart bolding */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.14]">
              {businessData.business.name}
              <span className="block text-xl sm:text-2xl font-normal text-neutral-500 mt-2">
                Authentic Japanese Dining &amp; Sushi Bar in {businessData.business.neighborhood}
              </span>
            </h1>

            {/* Value Statement */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl font-normal">
              {businessData.business.summary}
            </p>

            {/* Action Buttons - font-medium */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${businessData.business.phoneRaw}`}
                onClick={() => track('click_phone', { location: 'hero' })}
                className="inline-flex items-center justify-center px-6 py-3 bg-neutral-900 text-white font-medium text-sm rounded-lg hover:bg-neutral-800 transition-all duration-150 ease-out active:scale-[0.98] shadow-sm min-h-[48px]"
              >
                Call to Order: {businessData.business.phone}
              </a>

              <a
                href="#offerings"
                onClick={() => track('click_menu', { location: 'hero' })}
                className="inline-flex items-center justify-center px-5 py-3 bg-white text-neutral-800 font-medium text-sm rounded-lg border border-neutral-300 hover:bg-neutral-50 transition-all duration-150 ease-out active:scale-[0.98] min-h-[48px]"
              >
                View Specialty Rolls
              </a>
            </div>

            {/* Operational Highlights - Subdued and readable */}
            <div className="pt-4 border-t border-neutral-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-neutral-600">
              <div>
                <span className="block font-mono uppercase tracking-wider text-neutral-400 text-[11px] mb-0.5">
                  Dining Style
                </span>
                <span className="text-neutral-800 font-mono text-sm">
                  Casual Dine-In &amp; Takeout
                </span>
              </div>
              <div>
                <span className="block font-mono uppercase tracking-wider text-neutral-400 text-[11px] mb-0.5">
                  Verified Rating
                </span>
                <span className="text-neutral-800 font-mono text-sm">
                  {businessData.socialProof.rating} / 5.0 ({businessData.socialProof.reviewCount.toLocaleString()} Reviews)
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block font-mono uppercase tracking-wider text-neutral-400 text-[11px] mb-0.5">
                  Direct Takeout
                </span>
                <span className="text-neutral-800 font-mono text-sm">
                  Fresh Daily Prep
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Explicit Aspect Ratio */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm bg-neutral-950 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
              {!imageError ? (
                <img
                  src={businessData.business.heroImage}
                  alt="Super Fusion Cuisine II sushi bar specialty rolls and fresh sashimi cuts on slate plate"
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-90'
                  }`}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-neutral-900 text-white text-center">
                  <h3 className="text-lg font-medium tracking-tight">Super Fusion Cuisine II</h3>
                  <p className="text-xs text-neutral-400 mt-1 font-mono uppercase tracking-wider">
                    Watertown Square Artisanal Sushi
                  </p>
                </div>
              )}

              {/* Scrim */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex items-center justify-between text-white text-xs">
                <span className="font-normal tracking-tight">Signature Sashimi &amp; Fusion Maki</span>
                <span className="font-mono text-neutral-300 text-[11px]">Prepared to Order</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
