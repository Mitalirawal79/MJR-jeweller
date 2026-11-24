import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Gift, Compass } from 'lucide-react';

export default function AnnouncementBar({ onOpenShowroom }) {
  const { settings } = useStore();

  return (
    <div className="bg-charcoal text-ivory text-xs tracking-wider border-b border-charcoal-light py-2 px-4 select-none relative z-40 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left perk */}
        <div className="hidden lg:flex items-center space-x-2 text-[11px] text-ivory-200 uppercase tracking-widest">
          <Gift size={13} className="text-champagne-gold" />
          <span>Complimentary Signature Gift Box</span>
        </div>

        {/* Center announcement */}
        <div className="flex-1 text-center font-sans uppercase tracking-[0.18em] text-[10px] sm:text-[11px] text-ivory">
          <span>{settings.announcementBar}</span>
        </div>

        {/* Right perk */}
        <div className="hidden lg:flex items-center space-x-4 text-[11px] text-ivory-200 uppercase tracking-widest">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck size={13} className="text-champagne-gold" />
            <span>GIA & IGI Certified</span>
          </div>
          <span className="text-mutedGrey">|</span>
          <button 
            onClick={onOpenShowroom}
            className="hover:text-champagne-gold transition-colors flex items-center space-x-1 underline underline-offset-4 decoration-champagne-gold/60"
          >
            <Compass size={12} />
            <span>Book Showroom</span>
          </button>
        </div>

      </div>
    </div>
  );
}
