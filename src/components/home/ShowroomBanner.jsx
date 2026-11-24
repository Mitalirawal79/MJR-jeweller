import React from 'react';
import { SHOWROOM_LOCATIONS } from '../../lib/initialData';
import { MapPin, Clock, Phone, ArrowRight, Compass } from 'lucide-react';

export default function ShowroomBanner({ onBookViewing, onExploreShowrooms }) {
  return (
    <section className="py-24 bg-ivory border-b border-champagne/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block">
            Private Viewings & Salons
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light tracking-wide">
            EXPERIENCE THE BEAUTY IN PERSON
          </h2>
          <p className="text-xs sm:text-sm text-mutedGrey font-sans leading-relaxed">
            Discover the MJR diamond collection in an intimate luxury showroom experience. Three flagship locations in Mumbai, New Delhi and Bengaluru.
          </p>
        </div>

        {/* 3 Showroom Previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SHOWROOM_LOCATIONS.map((loc) => (
            <div 
              key={loc.id}
              className="bg-white border border-champagne/40 overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-luxury"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ivory-50">
                <img 
                  src={loc.image} 
                  alt={loc.name}
                  className="w-full h-full object-cover luxury-image-hover" 
                />
                <span className="absolute top-3 left-3 bg-charcoal text-white text-[10px] uppercase tracking-widest px-2.5 py-1">
                  {loc.city}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg text-charcoal font-medium group-hover:text-champagne-gold transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-mutedGrey mt-2 flex items-start space-x-1.5">
                    <MapPin size={14} className="text-champagne-gold flex-shrink-0 mt-0.5" />
                    <span>{loc.address}, {loc.stateZip}</span>
                  </p>
                  <p className="text-xs text-mutedGrey mt-1 flex items-center space-x-1.5">
                    <Phone size={13} className="text-champagne-gold flex-shrink-0" />
                    <span>{loc.phone}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-champagne/30 flex items-center justify-between">
                  <button
                    onClick={() => onBookViewing(loc)}
                    className="text-xs uppercase tracking-widest text-charcoal hover:text-champagne-gold font-medium flex items-center space-x-1.5"
                  >
                    <Compass size={13} className="text-champagne-gold" />
                    <span>Book Private Salon</span>
                  </button>

                  <button
                    onClick={onExploreShowrooms}
                    className="text-[11px] text-mutedGrey hover:text-charcoal"
                  >
                    Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
