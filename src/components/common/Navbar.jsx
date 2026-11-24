import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  MapPin,
  ShieldAlert
} from 'lucide-react';

export default function Navbar({ currentRoute, setCurrentRoute, onSelectCategory }) {
  const { cart, wishlist, setIsCartOpen, setIsSearchOpen } = useStore();
  const { user, isAdmin } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsDropdownOpen, setCollectionsDropdownOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (route, category = null) => {
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    setCollectionsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-ivory/95 backdrop-blur-md shadow-sm border-b border-champagne/40 py-3' 
            : 'bg-ivory border-b border-champagne/30 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 text-charcoal hover:text-champagne-gold transition-colors focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Left: MJR Brand Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigateTo('home')}>
              <Logo size="md" variant="dark" />
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              <button 
                onClick={() => navigateTo('home')}
                className={`text-xs uppercase tracking-[0.18em] transition-colors font-medium ${
                  currentRoute === 'home' ? 'text-champagne-gold font-semibold' : 'text-charcoal hover:text-champagne-gold'
                }`}
              >
                Home
              </button>

              {/* Collections Mega Menu Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setCollectionsDropdownOpen(true)}
                onMouseLeave={() => setCollectionsDropdownOpen(false)}
              >
                <button 
                  onClick={() => navigateTo('catalogue')}
                  className={`flex items-center space-x-1 text-xs uppercase tracking-[0.18em] transition-colors font-medium py-2 ${
                    currentRoute === 'catalogue' ? 'text-champagne-gold font-semibold' : 'text-charcoal hover:text-champagne-gold'
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown size={13} className={`transition-transform duration-300 ${collectionsDropdownOpen ? 'rotate-180 text-champagne-gold' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {collectionsDropdownOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[720px] bg-white border border-champagne/50 shadow-modal p-6 transition-all duration-300 z-50">
                    <div className="grid grid-cols-3 gap-6">
                      
                      {/* Column 1: Categories */}
                      <div className="border-r border-champagne/30 pr-4">
                        <span className="text-[11px] font-sans uppercase tracking-widest text-mutedGrey block mb-3 font-semibold">
                          By Jewellery Type
                        </span>
                        <ul className="space-y-2.5 text-xs text-charcoal">
                          <li>
                            <button onClick={() => navigateTo('catalogue', 'rings')} className="hover:text-champagne-gold transition-colors text-left w-full">
                              Diamond Rings & Solitaires
                            </button>
                          </li>
                          <li>
                            <button onClick={() => navigateTo('catalogue', 'necklaces')} className="hover:text-champagne-gold transition-colors text-left w-full">
                              Cascading Diamond Necklaces
                            </button>
                          </li>
                          <li>
                            <button onClick={() => navigateTo('catalogue', 'earrings')} className="hover:text-champagne-gold transition-colors text-left w-full">
                              Drop & Stud Earrings
                            </button>
                          </li>
                          <li>
                            <button onClick={() => navigateTo('catalogue', 'bracelets')} className="hover:text-champagne-gold transition-colors text-left w-full">
                              Tennis Bracelets & Cuffs
                            </button>
                          </li>
                          <li>
                            <button onClick={() => navigateTo('catalogue', 'solitaires')} className="hover:text-champagne-gold transition-colors text-left w-full font-medium text-champagne-gold">
                              Exclusive Solitaire Vault
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Column 2: Curations */}
                      <div className="border-r border-champagne/30 pr-4">
                        <span className="text-[11px] font-sans uppercase tracking-widest text-mutedGrey block mb-3 font-semibold">
                          Curated Worlds
                        </span>
                        <ul className="space-y-2.5 text-xs text-charcoal">
                          <li>
                            <button onClick={() => navigateTo('catalogue')} className="hover:text-champagne-gold transition-colors text-left w-full">
                              The Signature Collection
                            </button>
                          </li>
                          <li>
                            <button onClick={() => navigateTo('catalogue')} className="hover:text-champagne-gold transition-colors text-left w-full">
                              Engagement & Bridal Suite
                            </button>
                          </li>
                          <li>
                            <button onClick={() => navigateTo('catalogue')} className="hover:text-champagne-gold transition-colors text-left w-full">
                              High Jewellery Creations
                            </button>
                          </li>
                          <li>
                            <button onClick={() => navigateTo('education')} className="hover:text-champagne-gold transition-colors text-left w-full text-champagne-gold flex items-center space-x-1">
                              <Sparkles size={12} />
                              <span>The 4Cs Diamond Masterclass</span>
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Column 3: Featured Visual */}
                      <div className="bg-ivory/60 p-3 flex flex-col justify-between">
                        <div className="overflow-hidden mb-2">
                          <img 
                            src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop" 
                            alt="Featured Diamond Ring"
                            className="w-full h-28 object-cover luxury-image-hover" 
                          />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-champagne-gold font-medium">
                          New Season Edit
                        </span>
                        <p className="text-xs font-serif text-charcoal italic mt-0.5">
                          Aethel Solitaire Collection
                        </p>
                        <button 
                          onClick={() => navigateTo('catalogue')}
                          className="mt-2 text-[10px] uppercase tracking-widest text-charcoal underline underline-offset-4 hover:text-champagne-gold text-left"
                        >
                          View Catalogue →
                        </button>
                      </div>

                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => navigateTo('catalogue', 'rings')}
                className={`text-xs uppercase tracking-[0.18em] transition-colors font-medium ${
                  currentRoute === 'catalogue' ? 'text-charcoal hover:text-champagne-gold' : 'text-charcoal hover:text-champagne-gold'
                }`}
              >
                Rings
              </button>

              <button 
                onClick={() => navigateTo('catalogue', 'necklaces')}
                className="text-xs uppercase tracking-[0.18em] text-charcoal hover:text-champagne-gold transition-colors font-medium"
              >
                Necklaces
              </button>

              <button 
                onClick={() => navigateTo('catalogue', 'earrings')}
                className="text-xs uppercase tracking-[0.18em] text-charcoal hover:text-champagne-gold transition-colors font-medium"
              >
                Earrings
              </button>

              <button 
                onClick={() => navigateTo('catalogue', 'bracelets')}
                className="text-xs uppercase tracking-[0.18em] text-charcoal hover:text-champagne-gold transition-colors font-medium"
              >
                Bracelets
              </button>

              <button 
                onClick={() => navigateTo('story')}
                className={`text-xs uppercase tracking-[0.18em] transition-colors font-medium ${
                  currentRoute === 'story' ? 'text-champagne-gold font-semibold' : 'text-charcoal hover:text-champagne-gold'
                }`}
              >
                Our Story
              </button>

              <button 
                onClick={() => navigateTo('showrooms')}
                className={`text-xs uppercase tracking-[0.18em] transition-colors font-medium flex items-center space-x-1 ${
                  currentRoute === 'showrooms' ? 'text-champagne-gold font-semibold' : 'text-charcoal hover:text-champagne-gold'
                }`}
              >
                <MapPin size={12} className="text-champagne-gold" />
                <span>Store</span>
              </button>
            </nav>

            {/* Right: Actions (Search, Account, Wishlist, Cart) */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              
              {/* Search */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-charcoal hover:text-champagne-gold transition-colors"
                aria-label="Search Diamond Collections"
              >
                <Search size={19} strokeWidth={1.4} />
              </button>

              {/* Account / Admin */}
              <button 
                onClick={() => navigateTo(user ? (isAdmin ? 'admin' : 'account') : 'account')}
                className="p-1.5 text-charcoal hover:text-champagne-gold transition-colors relative"
                aria-label="Customer Account"
                title={user ? `${user.name} (${user.role})` : 'Account'}
              >
                <User size={19} strokeWidth={1.4} />
                {isAdmin && (
                  <span className="absolute -top-1 -right-1 bg-charcoal text-[9px] text-champagne-gold px-1 rounded font-mono font-bold border border-champagne-gold/40">
                    ADM
                  </span>
                )}
              </button>

              {/* Wishlist */}
              <button 
                onClick={() => navigateTo('wishlist')}
                className="p-1.5 text-charcoal hover:text-champagne-gold transition-colors relative"
                aria-label="View Wishlist"
              >
                <Heart size={19} strokeWidth={1.4} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-champagne-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-medium">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Bag */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-1.5 text-charcoal hover:text-champagne-gold transition-colors relative"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag size={19} strokeWidth={1.4} />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-charcoal text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-medium">
                    {totalCartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-ivory shadow-xl z-50 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="p-5 flex items-center justify-between border-b border-champagne/40">
                <Logo size="sm" variant="dark" />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-charcoal hover:text-champagne-gold"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="py-6 px-6 space-y-4 text-sm font-sans tracking-widest uppercase">
                <button 
                  onClick={() => navigateTo('home')}
                  className="block w-full text-left py-2 hover:text-champagne-gold border-b border-champagne/20"
                >
                  Home
                </button>
                <button 
                  onClick={() => navigateTo('catalogue')}
                  className="block w-full text-left py-2 hover:text-champagne-gold border-b border-champagne/20"
                >
                  All Diamond Collections
                </button>
                <button 
                  onClick={() => navigateTo('catalogue', 'rings')}
                  className="block w-full text-left py-2 pl-3 text-xs text-mutedGrey hover:text-charcoal"
                >
                  — Diamond Rings
                </button>
                <button 
                  onClick={() => navigateTo('catalogue', 'necklaces')}
                  className="block w-full text-left py-2 pl-3 text-xs text-mutedGrey hover:text-charcoal"
                >
                  — Diamond Necklaces
                </button>
                <button 
                  onClick={() => navigateTo('catalogue', 'earrings')}
                  className="block w-full text-left py-2 pl-3 text-xs text-mutedGrey hover:text-charcoal"
                >
                  — Diamond Earrings
                </button>
                <button 
                  onClick={() => navigateTo('catalogue', 'bracelets')}
                  className="block w-full text-left py-2 pl-3 text-xs text-mutedGrey hover:text-charcoal"
                >
                  — Diamond Bracelets
                </button>
                <button 
                  onClick={() => navigateTo('catalogue', 'solitaires')}
                  className="block w-full text-left py-2 pl-3 text-xs text-mutedGrey hover:text-charcoal"
                >
                  — Solitaire Collection
                </button>
                <button 
                  onClick={() => navigateTo('education')}
                  className="block w-full text-left py-2 hover:text-champagne-gold border-b border-champagne/20"
                >
                  The 4Cs Guide
                </button>
                <button 
                  onClick={() => navigateTo('story')}
                  className="block w-full text-left py-2 hover:text-champagne-gold border-b border-champagne/20"
                >
                  Our Story
                </button>
                <button 
                  onClick={() => navigateTo('showrooms')}
                  className="block w-full text-left py-2 hover:text-champagne-gold border-b border-champagne/20"
                >
                  Physical Showrooms
                </button>
                <button 
                  onClick={() => navigateTo(isAdmin ? 'admin' : 'account')}
                  className="block w-full text-left py-2 hover:text-champagne-gold border-b border-champagne/20"
                >
                  {isAdmin ? 'Admin Dashboard' : 'My Account'}
                </button>
              </div>
            </div>

            <div className="p-6 bg-champagne-subtle border-t border-champagne/40">
              <span className="text-[10px] uppercase tracking-widest text-mutedGrey block mb-2">
                Concierge Assistance
              </span>
              <p className="text-xs font-serif text-charcoal">
                +91 (022) 8800 2400
              </p>
              <p className="text-[11px] text-mutedGrey mt-1">
                Mon - Sun: 11:00 AM - 8:30 PM IST
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
