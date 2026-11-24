import React from 'react';
import { CATEGORIES } from '../../lib/initialData';
import { ArrowRight } from 'lucide-react';

export default function CategorySection({ onSelectCategory }) {
  return (
    <section className="py-20 bg-ivory border-b border-champagne/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block">
            Curation of Brilliance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light tracking-wide">
            EXPLORE OUR COLLECTIONS
          </h2>
          <p className="text-xs sm:text-sm text-mutedGrey font-sans leading-relaxed">
            From iconic solitaire rings to cascading diamond neckwear, each piece embodies contemporary minimalist refinement.
          </p>
        </div>

        {/* 5-Category Elegant Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group cursor-pointer bg-white border border-champagne/40 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-luxury-hover"
            >
              {/* Image Container with zoom */}
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory-50">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover luxury-image-hover"
                />
                <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg text-charcoal group-hover:text-champagne-gold transition-colors font-medium">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-mutedGrey leading-relaxed mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-champagne/30 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal font-medium group-hover:text-champagne-gold transition-colors">
                    Explore
                  </span>
                  <ArrowRight size={13} className="text-champagne-gold transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
