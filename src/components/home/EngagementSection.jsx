import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function EngagementSection({ onExploreEngagement }) {
  return (
    <section className="py-24 bg-champagne-subtle border-b border-champagne/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Campaign Banner Container */}
        <div className="relative bg-white border border-champagne/50 shadow-luxury overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Visual */}
            <div className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:h-[540px] overflow-hidden bg-ivory">
              <img 
                src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop" 
                alt="Forever Begins With A Diamond Engagement Collection" 
                className="w-full h-full object-cover luxury-image-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-charcoal/30 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 space-y-6">
              <div className="flex items-center space-x-2 text-champagne-gold">
                <Sparkles size={14} />
                <span className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold">
                  Bridal & Engagement Suite
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-light leading-tight">
                FOREVER BEGINS <br />
                WITH A DIAMOND
              </h2>

              <p className="font-serif italic text-base text-charcoal/80">
                "Celebrate your promise with a timeless symbol of love."
              </p>

              <p className="text-xs sm:text-sm text-mutedGrey font-sans leading-relaxed">
                Explore our signature solitaire engagement rings, cushion halos, three-stone silhouettes and eternity wedding bands crafted in certified 18K white gold and platinum 950.
              </p>

              <div className="pt-2">
                <button
                  onClick={onExploreEngagement}
                  className="px-8 py-3.5 bg-charcoal text-white text-xs uppercase tracking-[0.22em] font-medium hover:bg-champagne-gold transition-colors flex items-center space-x-2 group"
                >
                  <span>EXPLORE ENGAGEMENT COLLECTION</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="pt-4 border-t border-champagne/30 text-[11px] text-mutedGrey flex items-center space-x-4">
                <span>Custom Ring Sizing</span>
                <span>•</span>
                <span>Engraving Included</span>
                <span>•</span>
                <span>Lifetime Polish</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
