import React, { useState } from 'react';
import { SHOWROOM_LOCATIONS } from '../lib/initialData';
import { useStore } from '../context/StoreContext';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Calendar, 
  Compass, 
  ExternalLink, 
  Sparkles,
  MessageCircle,
  Navigation
} from 'lucide-react';

export default function ShowroomsPage({ onBookSpecificShowroom, onNavigateHome }) {
  const { setBookingModalOpen, setSelectedShowroomForBooking } = useStore();
  const [selectedMapLocation, setSelectedMapLocation] = useState(null);

  const handleBook = (loc) => {
    setSelectedShowroomForBooking(loc);
    setBookingModalOpen(true);
  };

  return (
    <div className="bg-ivory min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block">
            Intimate Luxury Salons
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-light tracking-wide">
            EXPERIENCE THE BEAUTY IN PERSON
          </h1>
          <p className="text-xs sm:text-sm text-mutedGrey font-sans leading-relaxed">
            Discover the MJR diamond collection in an intimate luxury showroom experience. Three flagship locations designed for private consultations, master gemologist guidance, and custom design commissions.
          </p>
        </div>

        {/* 3 Showroom Full Cards */}
        <div className="space-y-16">
          {SHOWROOM_LOCATIONS.map((loc, idx) => (
            <div 
              key={loc.id}
              className={`bg-white border border-champagne/40 overflow-hidden shadow-luxury grid grid-cols-1 lg:grid-cols-12 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Showroom Image (6 cols) */}
              <div className={`lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:h-[460px] overflow-hidden bg-ivory ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img 
                  src={loc.image} 
                  alt={loc.name} 
                  className="w-full h-full object-cover luxury-image-hover"
                />
                <div className="absolute top-4 left-4 bg-charcoal text-white text-[10px] uppercase tracking-widest px-3 py-1 font-medium">
                  {loc.city} Salon
                </div>
              </div>

              {/* Showroom Details (6 cols) */}
              <div className={`lg:col-span-6 p-8 sm:p-12 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-champagne-gold font-sans font-semibold">
                    {loc.area}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-charcoal mt-1 font-normal">
                    {loc.name}
                  </h2>
                </div>

                <div className="space-y-3 text-xs text-charcoal-light font-sans">
                  <div className="flex items-start space-x-2.5">
                    <MapPin size={16} className="text-champagne-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-charcoal">{loc.address}</p>
                      <p className="text-mutedGrey">{loc.stateZip}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <Clock size={16} className="text-champagne-gold flex-shrink-0" />
                    <span>{loc.hours}</span>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <Phone size={16} className="text-champagne-gold flex-shrink-0" />
                    <span>{loc.phone}</span>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <Mail size={16} className="text-champagne-gold flex-shrink-0" />
                    <span>{loc.email}</span>
                  </div>
                </div>

                {/* Amenities / Features */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase tracking-widest text-mutedGrey block mb-2 font-medium">
                    Salon Privileges:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {loc.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-1.5 text-[11px] text-charcoal">
                        <Sparkles size={11} className="text-champagne-gold flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-champagne/40 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleBook(loc)}
                    className="px-6 py-3 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-champagne-gold transition-colors flex items-center space-x-2"
                  >
                    <Compass size={14} className="text-champagne-gold" />
                    <span>Book Private Viewing</span>
                  </button>

                  <a
                    href={`https://wa.me/${loc.whatsapp}?text=Hello%20MJR%20Concierge,%20I%20would%20like%20to%20enquire%20about%20a%20private%20appointment%20at%20your%20${encodeURIComponent(loc.name)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-3 border border-champagne/60 text-charcoal text-xs uppercase tracking-wider font-medium hover:border-charcoal transition-colors flex items-center space-x-1.5 bg-white"
                  >
                    <MessageCircle size={14} className="text-green-600" />
                    <span>WhatsApp Concierge</span>
                  </a>

                  <button
                    onClick={() => setSelectedMapLocation(loc)}
                    className="px-4 py-3 text-xs uppercase tracking-wider text-mutedGrey hover:text-charcoal transition-colors flex items-center space-x-1"
                  >
                    <Navigation size={13} />
                    <span>Directions</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Map Modal Mock */}
        {selectedMapLocation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm">
            <div className="bg-white max-w-lg w-full p-6 border border-champagne/50 shadow-modal animate-fade-in space-y-4">
              <div className="flex justify-between items-center border-b border-champagne/30 pb-3">
                <h3 className="font-serif text-lg text-charcoal">{selectedMapLocation.name}</h3>
                <button onClick={() => setSelectedMapLocation(null)} className="text-mutedGrey hover:text-charcoal">✕</button>
              </div>
              <div className="aspect-video bg-ivory border border-champagne/30 flex flex-col items-center justify-center p-4 text-center">
                <MapPin size={32} className="text-champagne-gold mb-2" />
                <span className="font-sans font-medium text-xs text-charcoal">{selectedMapLocation.address}</span>
                <span className="text-[11px] text-mutedGrey mt-1">{selectedMapLocation.stateZip}</span>
                <p className="text-[10px] text-mutedGrey mt-3 max-w-xs">
                  (Google Maps Interactive Simulation: Valet parking available on arrival at main entrance porte-cochère)
                </p>
              </div>
              <div className="text-right">
                <button 
                  onClick={() => setSelectedMapLocation(null)}
                  className="px-5 py-2 bg-charcoal text-white text-xs uppercase tracking-wider hover:bg-champagne-gold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
