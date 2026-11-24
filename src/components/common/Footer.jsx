import React from 'react';
import Logo from './Logo';
import { Instagram, Facebook, Compass, ShieldCheck, Mail, Phone, Clock } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-charcoal-deep text-ivory border-t border-charcoal-light">
      
      {/* Upper Footer: Brand Promise / Value Pillars */}
      <div className="border-b border-charcoal/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="text-champagne-gold font-serif text-lg tracking-wide">100% Certified Diamonds</span>
            <p className="text-xs text-mutedGrey leading-relaxed">
              Every natural diamond is graded and certified by leading international gemological institutes (GIA & IGI).
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="text-champagne-gold font-serif text-lg tracking-wide">Complimentary Insured Shipping</span>
            <p className="text-xs text-mutedGrey leading-relaxed">
              Every MJR creation travels in tamper-evident secured packaging with full insurance across India.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="text-champagne-gold font-serif text-lg tracking-wide">Lifetime Exchange & Upgrade</span>
            <p className="text-xs text-mutedGrey leading-relaxed">
              Enjoy guaranteed buyback and lifetime exchange privileges across all physical MJR salons.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="text-champagne-gold font-serif text-lg tracking-wide">Bespoke Diamond Concierge</span>
            <p className="text-xs text-mutedGrey leading-relaxed">
              Private one-on-one viewings with master gemologists in Mumbai, New Delhi and Bengaluru.
            </p>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Logo variant="light" size="lg" className="!items-start" />
            <p className="text-xs text-mutedGrey leading-relaxed max-w-sm mt-3">
              Discover timeless diamond jewellery crafted to celebrate life’s most meaningful moments. Modern minimalist silhouettes honoring fine Indian high-jewellery mastery.
            </p>

            <div className="pt-2 text-xs text-ivory-200 space-y-1.5">
              <p className="flex items-center space-x-2">
                <Phone size={13} className="text-champagne-gold" />
                <span>+91 (022) 8800 2400 (Concierge Line)</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail size={13} className="text-champagne-gold" />
                <span>concierge@mjrjewels.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <Clock size={13} className="text-champagne-gold" />
                <span>Salons open daily 11:00 AM – 8:30 PM IST</span>
              </p>
            </div>
          </div>

          {/* Col 2: The Collections */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-champagne-gold font-semibold mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-mutedGrey">
              <li>
                <button onClick={() => onNavigate('catalogue', 'rings')} className="hover:text-white transition-colors">
                  Diamond Rings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalogue', 'necklaces')} className="hover:text-white transition-colors">
                  Diamond Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalogue', 'earrings')} className="hover:text-white transition-colors">
                  Diamond Earrings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalogue', 'bracelets')} className="hover:text-white transition-colors">
                  Diamond Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalogue', 'solitaires')} className="hover:text-white transition-colors">
                  Solitaire Collection
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalogue')} className="hover:text-white transition-colors">
                  High Jewellery Suite
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: The Maison */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-champagne-gold font-semibold mb-4">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-mutedGrey">
              <li>
                <button onClick={() => onNavigate('story')} className="hover:text-white transition-colors">
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('showrooms')} className="hover:text-white transition-colors">
                  Our Showrooms
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('education')} className="hover:text-white transition-colors">
                  The 4Cs Diamond Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('showrooms')} className="hover:text-white transition-colors">
                  Private Salon Appointments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('account')} className="hover:text-white transition-colors">
                  Client Account
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Client Services */}
          <div>
            <h4 className="text-[11px] font-sans uppercase tracking-[0.2em] text-champagne-gold font-semibold mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-mutedGrey">
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Complimentary Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Returns & Lifetime Exchange
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Diamond Sizing & Care
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Terms & Conditions
                </span>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-champagne-gold/70 hover:text-champagne-gold transition-colors font-mono text-[10px] uppercase">
                  Staff Portal (Admin)
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Social & Disclaimer */}
        <div className="mt-14 pt-8 border-t border-charcoal/80 flex flex-col md:flex-row items-center justify-between text-[11px] text-mutedGrey space-y-4 md:space-y-0">
          
          <div className="flex items-center space-x-6">
            <span className="text-champagne-gold/90 font-serif italic text-sm">Follow MJR:</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-champagne-gold transition-colors flex items-center space-x-1">
              <Instagram size={14} />
              <span>Instagram</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-champagne-gold transition-colors flex items-center space-x-1">
              <Facebook size={14} />
              <span>Facebook</span>
            </a>
            <span className="hover:text-champagne-gold cursor-pointer transition-colors">
              Pinterest
            </span>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p>© {new Date().getFullYear()} MJR Fine Jewellery Pvt. Ltd. All rights reserved.</p>
            <p className="text-[10px] text-mutedGrey/70">
              Portfolio & Demo luxury diamond jewellery presentation. Fictional brand concept.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}
