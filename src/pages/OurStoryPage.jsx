import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Gem } from 'lucide-react';

export default function OurStoryPage({ onExploreCollections, onBookViewing }) {
  return (
    <div className="bg-ivory min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Editorial Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-champagne-gold font-semibold block">
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-charcoal font-light leading-tight">
            THE ART OF BRILLIANCE
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-charcoal/80 max-w-xl mx-auto">
            "Elegance in every detail. Brilliance in every moment."
          </p>
          <div className="w-16 h-[1px] bg-champagne-gold mx-auto mt-4" />
        </div>

        {/* Story Section 1: The Genesis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] overflow-hidden bg-white border border-champagne/40 shadow-luxury">
            <img 
              src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1200&auto=format&fit=crop" 
              alt="Diamond Setting Masterpiece" 
              className="w-full h-full object-cover luxury-image-hover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-semibold block">
              Chapter I • The Origin
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light leading-snug">
              Born from a Reverence for Eternal Light
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-charcoal-light font-sans leading-relaxed">
              <p>
                Founded with a singular vision, MJR was created to redefine luxury diamond jewellery in India. We sought to depart from heavy, ornate traditional styles in favor of architectural purity, exceptional white space, and understated contemporary poise.
              </p>
              <p>
                Each MJR jewel begins deep beneath the earth, where carbon crystallized under unfathomable heat and pressure over billions of years. We believe that such ancient miracles deserve settings of absolute geometric harmony.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section 2: Craftsmanship */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2 relative aspect-[4/5] overflow-hidden bg-white border border-champagne/40 shadow-luxury">
            <img 
              src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1200&auto=format&fit=crop" 
              alt="MJR Salon Ambience" 
              className="w-full h-full object-cover luxury-image-hover"
            />
          </div>

          <div className="lg:col-span-6 lg:order-1 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-semibold block">
              Chapter II • The Atelier
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light leading-snug">
              Master Goldsmithing & Gemological Rigor
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-charcoal-light font-sans leading-relaxed">
              <p>
                In our private ateliers, our master setters work under microscopic stereoscopes to secure diamonds in micro-pavé bezels, whisper-thin platinum baskets, and seamless tension settings.
              </p>
              <p>
                Every facet is calculated to unleash total internal refraction. If a diamond does not meet our strict threshold for optical fire, symmetry, and Polish, it simply cannot bear the MJR hallmark.
              </p>
            </div>
          </div>
        </div>

        {/* Ethical Standards & Guarantees */}
        <div className="bg-white p-10 sm:p-14 border border-champagne/40 shadow-luxury text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block">
              Ethical Provenance
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal">
              Our Uncompromising Ethical Pledge
            </h3>
            <p className="text-xs text-mutedGrey leading-relaxed">
              We operate exclusively with 100% natural, Kimberley Process compliant diamonds and recycled 18K precious metals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            <div className="p-4 border border-champagne/30 bg-ivory">
              <ShieldCheck size={24} className="text-champagne-gold mb-2" />
              <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-charcoal">Conflict-Free Origin</h4>
              <p className="text-[11px] text-mutedGrey mt-1 leading-relaxed">
                Full transparency through verified mining partners upholding international labor and humanitarian standards.
              </p>
            </div>

            <div className="p-4 border border-champagne/30 bg-ivory">
              <Award size={24} className="text-champagne-gold mb-2" />
              <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-charcoal">GIA & IGI Verified</h4>
              <p className="text-[11px] text-mutedGrey mt-1 leading-relaxed">
                Individual grading certificates accompanied by microscopic laser inscription on the diamond girdle.
              </p>
            </div>

            <div className="p-4 border border-champagne/30 bg-ivory">
              <Gem size={24} className="text-champagne-gold mb-2" />
              <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-charcoal">Lifetime Custodianship</h4>
              <p className="text-[11px] text-mutedGrey mt-1 leading-relaxed">
                Complimentary annual prong inspection, ultrasonic bath cleaning and repolishing across all MJR salons.
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-center space-x-4">
            <button
              onClick={onExploreCollections}
              className="px-8 py-3.5 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-champagne-gold transition-colors"
            >
              Explore The Collections
            </button>
            <button
              onClick={onBookViewing}
              className="px-8 py-3.5 border border-charcoal text-charcoal text-xs uppercase tracking-[0.2em] font-medium hover:bg-charcoal hover:text-white transition-colors"
            >
              Visit Our Salons
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
