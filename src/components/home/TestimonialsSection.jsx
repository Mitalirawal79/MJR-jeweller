import React from 'react';
import { TESTIMONIALS } from '../../lib/initialData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white border-b border-champagne/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block">
            Patron Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light tracking-wide">
            WORDS THAT SHINE
          </h2>
          <p className="text-xs sm:text-sm text-mutedGrey font-sans leading-relaxed">
            Reflections from clients celebrating lifetime promises with MJR.
          </p>
        </div>

        {/* 3 Minimal Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div 
              key={review.id}
              className="bg-ivory p-8 border border-champagne/40 flex flex-col justify-between relative"
            >
              <Quote size={28} className="text-champagne-gold/25 absolute top-6 right-6" />

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center space-x-1 text-champagne-gold mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>

                <p className="font-serif text-charcoal text-sm sm:text-base leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-champagne/30">
                <div className="flex items-center justify-between">
                  <span className="font-sans font-semibold text-xs text-charcoal">
                    {review.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-mutedGrey">
                    {review.city}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1 text-[11px] text-mutedGrey">
                  <span className="line-clamp-1">{review.product}</span>
                  {review.verified && (
                    <span className="text-[9px] uppercase tracking-wider text-champagne-gold flex items-center space-x-0.5 flex-shrink-0 ml-2">
                      <ShieldCheck size={11} />
                      <span>Verified Client</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Demo Notice */}
        <div className="text-center mt-12 text-[11px] text-mutedGrey/80">
          Sample feedback shown for portfolio demo presentation.
        </div>

      </div>
    </section>
  );
}
