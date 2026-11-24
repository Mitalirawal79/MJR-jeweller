import React from 'react';
import { ArrowRight, ShieldCheck, Award, Gem } from 'lucide-react';

export default function BrandStorySection({ onReadMore }) {
  return (
    <section className="py-24 bg-white border-b border-champagne/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Large Editorial Lifestyle Image with Overlapping Detail */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-ivory">
              <img 
                src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1200&auto=format&fit=crop" 
                alt="MJR Master Jewellery Atelier Craftsmanship"
                className="w-full h-full object-cover luxury-image-hover"
              />
              <div className="absolute inset-0 bg-charcoal/5" />
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-ivory p-6 border border-champagne/50 shadow-modal max-w-xs">
              <div className="flex items-center space-x-2 text-champagne-gold mb-1">
                <Award size={16} />
                <span className="text-[10px] uppercase tracking-widest font-sans font-semibold">Legacy of Light</span>
              </div>
              <p className="font-serif italic text-sm text-charcoal">
                "Each stone carries millions of years of earth history, revealed through human perfection."
              </p>
            </div>
          </div>

          {/* Right: Storytelling Content */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block">
              The Maison Heritage
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal font-light tracking-tight leading-[1.15]">
              BEAUTY THAT LASTS <br />
              <span className="italic font-normal">BEYOND TIME</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-charcoal-light font-sans leading-relaxed">
              <p>
                At MJR, we believe that every diamond holds a story. Our collections celebrate meaningful moments through exceptional design, refined detailing and timeless elegance.
              </p>
              <p>
                Conceived at the intersection of European minimalist jewellery silhouettes and revered Indian craftsmanship, our master goldsmiths spend hundreds of hours sculpting the perfect platinum prongs and delicate pavé settings that honor each diamond's inherent fire.
              </p>
              <p>
                We maintain an unyielding commitment to 100% ethically sourced, Kimberley Process certified natural diamonds, guaranteeing provenance and peace of mind for generations to come.
              </p>
            </div>

            {/* Credibility Pillars */}
            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-champagne/40">
              <div className="flex items-start space-x-3">
                <ShieldCheck size={20} className="text-champagne-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">GIA Certified</h4>
                  <p className="text-[11px] text-mutedGrey mt-0.5">Strict global optical standards</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Gem size={20} className="text-champagne-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">Rare Colorless</h4>
                  <p className="text-[11px] text-mutedGrey mt-0.5">Curated in D, E, F colour grades</p>
                </div>
              </div>
            </div>

            {/* Read Story CTA */}
            <div className="pt-2">
              <button
                onClick={onReadMore}
                className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.2em] font-medium text-charcoal hover:text-champagne-gold transition-colors underline underline-offset-8 decoration-champagne-gold"
              >
                <span>Read The Full MJR Story</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
