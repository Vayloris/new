import { useState } from 'react';
import businessData from '../../data/business.json';

interface DishItemProps {
  title: string;
  price: string;
  description: string;
  image: string;
  tag: string;
}

function DishCard({ title, price, description, image, tag }: DishItemProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group bg-white rounded-2xl border border-neutral-200/80 shadow-xs hover:border-neutral-300 transition-all duration-150 ease-out flex flex-col overflow-hidden">
      {/* Explicit Aspect Ratio Image Slot */}
      <div className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden">
        {!imageError ? (
          <img
            src={image}
            alt={`${title} at Super Fusion Cuisine II - ${description}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-neutral-900 text-white">
            <span className="text-sm font-medium text-center">{title}</span>
          </div>
        )}

        {/* Quiet unboxed text tag overlay */}
        <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider text-neutral-200">
          {tag}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-medium text-neutral-900 tracking-tight leading-snug">
              {title}
            </h3>
            {/* Monospace Tabular Price - Clean weight */}
            <span className="font-mono text-sm text-neutral-900 shrink-0 tabular-nums">
              {price}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Quiet card footer */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
          <span>Prepared Fresh</span>
          <span>Watertown Square</span>
        </div>
      </div>
    </article>
  );
}

export function Offerings() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const offerings = businessData.offerings;

  const categories = [
    { id: 'all', label: 'All Signatures' },
    { id: 'House Special Maki', label: 'House Specials' },
    { id: 'Chef Special', label: "Chef's Cuts" },
    { id: 'Combos', label: 'Combos & Entrees' },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? offerings
      : activeCategory === 'Combos'
      ? offerings.filter((item) => item.tag === 'Combos' || item.tag === 'Sushi Bar Entrees')
      : offerings.filter((item) => item.tag === activeCategory);

  return (
    <section id="offerings" className="py-16 md:py-24 bg-[#FAFAFA] border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500">
            <span>Signature Selections</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted Daily</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            Specialty Maki &amp; Sushi Bar Offerings
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Each roll is assembled at our Watertown Square sushi bar using generous sashimi cuts, fresh seasonal fish, and house-made glazes.
          </p>
        </div>

        {/* Functional Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/60 rounded-xl max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 active:scale-[0.98] min-h-[44px] cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((dish) => (
            <DishCard
              key={dish.title}
              title={dish.title}
              price={dish.price}
              description={dish.description}
              image={dish.image}
              tag={dish.tag}
            />
          ))}
        </div>

        {/* Call to Action Bar */}
        <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm font-medium text-neutral-900">
              Need dietary accommodations or customized catering party platters?
            </h3>
            <p className="text-xs text-neutral-500">
              Our sushi chefs customize rolls for gluten-free, vegetarian, and allergy preferences.
            </p>
          </div>
          <a
            href={`tel:${businessData.business.phoneRaw}`}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-neutral-900 text-white rounded-lg text-xs font-medium hover:bg-neutral-800 transition-colors shrink-0 min-h-[44px]"
          >
            Call Sushi Bar: {businessData.business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
