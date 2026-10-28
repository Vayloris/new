import businessData from '../../data/business.json';

export function Heritage() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
              <span>Watertown Square Institution</span>
              <span aria-hidden="true">·</span>
              <span>Japanese Culinary Craft</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 leading-tight">
              Honoring Sushi Craft with Generous Cuts &amp; Inventive Pairings
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              <p>
                Founded as a neighborhood staple in {businessData.business.district}, {businessData.business.name} has built a loyal following across Middlesex County by staying focused on fundamentals: exceptionally fresh fish, thick sashimi slicing, and vibrant specialty rolls.
              </p>
              <p>
                Whether you dine in our casual dining room or pick up takeout after your commute through the square, every piece of nigiri and every maki roll is prepared fresh upon ordering by seasoned sushi chefs.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">01</span>
              <h3 className="text-sm font-medium text-neutral-900">Generous Portions</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                Known throughout Watertown and Cambridge for substantial sashimi thickness and overflowing roll fillings.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">02</span>
              <h3 className="text-sm font-medium text-neutral-900">Pristine Daily Sourcing</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                High-grade yellowtail, salmon, and fatty tuna inspected each morning to ensure optimal tenderness and clean flavor.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">03</span>
              <h3 className="text-sm font-medium text-neutral-900">Middlesex Community</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                Proudly serving dining guests and catering orders across Watertown, Newton, Belmont, Waltham, and Brighton.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-1.5">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block">04</span>
              <h3 className="text-sm font-medium text-neutral-900">Attentive Neighborhood Hospitality</h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                Friendly, prompt counter and dining service that welcomes regulars by name and cares for every dietary request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
