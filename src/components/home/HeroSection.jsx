import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection({ onExplore, onOurStory }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-ivory overflow-hidden">
      {/* Background Editorial Visual */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=85&w=2000&auto=format&fit=crop" 
          alt="MJR High Jewellery Model Editorial"
          className="w-full h-full object-cover object-center scale-100 animate-fade-in transition-transform duration-1000 ease-out"
        />
        {/* Soft Luxury Editorial Overlay (Ivory and Champagne Tints) */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/70 to-transparent" />
        <div className="absolute inset-0 bg-charcoal/10" />
      </div>

      {/* Editorial Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl space-y-6">
          
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center space-x-2 py-1 px-3 bg-white/80 border border-champagne/60 backdrop-blur-sm">
            <Sparkles size={12} className="text-champagne-gold" />
            <span className="text-[10px] uppercase tracking-[0.28em] font-sans text-charcoal font-medium">
              Fine Diamond Jewellery • India
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-charcoal tracking-tight leading-[1.08]">
            WHERE <span className="italic font-normal">BRILLIANCE</span> <br />
            MEETS ELEGANCE
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-charcoal-light font-sans font-light tracking-wide leading-relaxed max-w-xl">
            Discover extraordinary diamond creations designed to celebrate life’s most beautiful moments. Minimalist silhouettes set in pure 18K gold and platinum.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-5">
            <button
              onClick={onExplore}
              className="px-8 py-4 bg-charcoal text-white text-xs uppercase tracking-[0.24em] font-medium hover:bg-champagne-gold transition-all duration-300 shadow-luxury flex items-center justify-center space-x-3 group"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOurStory}
              className="px-8 py-4 bg-white/90 text-charcoal border border-charcoal/20 text-xs uppercase tracking-[0.24em] font-medium hover:border-charcoal hover:bg-white transition-all duration-300 flex items-center justify-center"
            >
              DISCOVER OUR STORY
            </button>
          </div>

          {/* Micro Brand Accents */}
          <div className="pt-8 flex items-center space-x-6 text-[11px] text-mutedGrey uppercase tracking-widest border-t border-charcoal/10">
            <span>GIA & IGI Certified</span>
            <span>•</span>
            <span>100% Conflict-Free</span>
            <span>•</span>
            <span>Private Salons</span>
          </div>

        </div>
      </div>

      {/* Floating subtle scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden sm:flex flex-col items-center space-y-1 text-mutedGrey/80">
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-6 bg-charcoal/30 animate-pulse" />
      </div>
    </section>
  );
}
