import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../lib/utils';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export default function SearchModal({ onSelectProduct, onSelectCategory }) {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const quickPicks = ['Solitaire Rings', 'Tennis Bracelet', 'Emerald Cut', 'Necklaces', 'Engagement'];

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
      (p.shape && p.shape.toLowerCase().includes(q)) ||
      (p.metal && p.metal.toLowerCase().includes(q)) ||
      (p.carat && p.carat.toLowerCase().includes(q))
    );
  }, [searchTerm, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="flex min-h-screen items-start justify-center pt-16 px-4">
        <div className="relative w-full max-w-2xl bg-white shadow-modal border border-champagne/40 overflow-hidden animate-fade-in">
          
          {/* Header & Input */}
          <div className="p-6 border-b border-champagne/30 bg-ivory">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-champagne-gold font-semibold">
                MJR Diamond Search
              </span>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-mutedGrey hover:text-charcoal p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-champagne-gold" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by diamond carat, shape, metal, or style..."
                autoFocus
                className="w-full bg-white border border-champagne/60 pl-10 pr-4 py-3 text-sm font-sans text-charcoal placeholder:text-mutedGrey focus:outline-none focus:border-champagne-gold"
              />
            </div>

            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-2">
              <span className="text-[10px] uppercase tracking-widest text-mutedGrey">Popular:</span>
              {quickPicks.map((pick) => (
                <button
                  key={pick}
                  onClick={() => setSearchTerm(pick)}
                  className="text-[11px] px-2.5 py-1 bg-white hover:bg-champagne-light border border-champagne/40 text-charcoal transition-colors rounded-none"
                >
                  {pick}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {!searchTerm.trim() ? (
              <div className="text-center py-8 text-mutedGrey">
                <Sparkles size={24} className="mx-auto text-champagne-gold/60 mb-2" />
                <p className="text-xs font-serif italic text-charcoal">
                  Type to explore our collection of GIA & IGI certified diamonds
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-10">
                <p className="font-serif text-lg text-charcoal">No diamonds match "{searchTerm}"</p>
                <p className="text-xs text-mutedGrey mt-1">
                  Try searching for "Solitaire", "1.50 ct", "Emerald", or "Platinum"
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-widest text-mutedGrey block mb-2">
                  {results.length} Creations Found
                </span>
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      if (onSelectProduct) onSelectProduct(product.id);
                    }}
                    className="flex items-center space-x-4 p-3 hover:bg-ivory transition-colors cursor-pointer border border-transparent hover:border-champagne/40 group"
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 object-cover border border-champagne/30 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-widest text-champagne-gold block">
                        {product.carat} • {product.shape}
                      </span>
                      <h4 className="font-serif text-sm text-charcoal group-hover:text-champagne-gold transition-colors font-medium">
                        {product.name}
                      </h4>
                      <p className="text-xs text-mutedGrey">
                        {product.metal} • {product.cut}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-sans text-xs font-semibold text-charcoal block">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[10px] text-champagne-gold flex items-center justify-end space-x-1 group-hover:translate-x-1 transition-transform">
                        <span>View</span>
                        <ArrowRight size={10} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
