import React from 'react';
import { EDUCATION_4CS } from '../../lib/initialData';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function DiamondEducation({ onExploreEducation }) {
  return (
    <section className="py-24 bg-ivory border-b border-champagne/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block">
            Gemological Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light tracking-wide">
            UNDERSTANDING THE 4Cs OF DIAMONDS
          </h2>
          <p className="text-xs sm:text-sm text-mutedGrey font-sans leading-relaxed">
            Every diamond in the MJR vault is selected for supreme optical fire, geometric scintillation, and certified authenticity.
          </p>
        </div>

        {/* 4 Elegant Diamond Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EDUCATION_4CS.map((item, idx) => (
            <div 
              key={item.id}
              className="bg-white p-8 border border-champagne/40 relative flex flex-col justify-between transition-all duration-300 hover:border-champagne-gold hover:shadow-luxury group"
            >
              {/* Card Number & Metric */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-champagne/20">
                  <span className="font-serif text-2xl text-champagne-gold/60 font-light">
                    0{idx + 1}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-mutedGrey bg-ivory px-2 py-0.5">
                    {item.metric}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="font-serif text-2xl text-charcoal font-medium">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-serif italic text-champagne-gold block mt-0.5">
                    {item.subtitle}
                  </span>
                  <span className="inline-block text-[10px] font-sans uppercase tracking-widest bg-champagne-subtle text-charcoal px-2.5 py-1 mt-3">
                    Grade: {item.gradeRange}
                  </span>
                  <p className="text-xs text-mutedGrey leading-relaxed mt-4">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="mt-6 pt-4 border-t border-champagne/20 space-y-2">
                {item.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start space-x-2 text-[11px] text-charcoal-light">
                    <span className="text-champagne-gold font-bold">•</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-14 text-center">
          <button
            onClick={onExploreEducation}
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-charcoal text-white text-xs uppercase tracking-[0.24em] font-medium hover:bg-champagne-gold transition-colors"
          >
            <span>DISCOVER THE BEAUTY OF DIAMONDS</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </section>
  );
}
