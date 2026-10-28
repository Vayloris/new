import { Star } from 'lucide-react';
import businessData from '../../data/business.json';

export function SocialProof() {
  const socialProof = businessData.socialProof;

  if (!socialProof || !socialProof.reviews || socialProof.reviews.length === 0) {
    return null;
  }

  return (
    <section id="reviews" className="py-16 md:py-24 bg-white border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200/80">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
              <span>Customer Experiences</span>
              <span aria-hidden="true">·</span>
              <span>Watertown Community</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
              Verified Dining Reviews
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Consistently rated for fresh fish selections, generous specialty maki portions, and prompt takeout service.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-200/80 rounded-xl p-4 shrink-0">
            <div className="text-3xl font-semibold font-mono text-neutral-900 tabular-nums">
              {socialProof.rating}
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-neutral-500 font-mono text-[11px]">
                {socialProof.reviewCount.toLocaleString()} Verified Ratings
              </p>
            </div>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {socialProof.reviews.map((review, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-2xl border border-neutral-200/80 p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating Stars & Verification Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {review.date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-neutral-700 leading-relaxed italic font-normal">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Review Author & Platform Source */}
              <div className="pt-3 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                <span className="font-medium text-neutral-900">{review.author}</span>
                <span className="text-neutral-500 font-mono text-[11px]">{review.source}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Review Footnote Link */}
        <div className="text-center pt-2">
          <a
            href={socialProof.googleMapsReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors min-h-[44px]"
          >
            Read more reviews on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
