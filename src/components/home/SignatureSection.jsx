import React from 'react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../lib/utils';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';

export default function SignatureSection({ onSelectProduct, onExploreAll }) {
  const { 
    products, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    setQuickViewProduct 
  } = useStore();

  // Signature or first 8 items
  const signatureItems = products.slice(0, 8);

  return (
    <section className="py-24 bg-white border-b border-champagne/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-champagne/30">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block mb-2">
              Masterpieces of Light
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-light tracking-wide">
              THE MJR SIGNATURE COLLECTION
            </h2>
            <p className="text-xs sm:text-sm text-mutedGrey font-sans mt-1">
              Exceptional brilliance. Timeless design.
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] text-charcoal hover:text-champagne-gold transition-colors underline underline-offset-8 decoration-champagne-gold/60 font-medium"
          >
            View Complete Diamond Catalogue →
          </button>
        </div>

        {/* 4-Column Desktop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {signatureItems.map((product) => {
            const inWishlist = isInWishlist(product.id);

            return (
              <div 
                key={product.id}
                className="group relative flex flex-col justify-between bg-ivory border border-champagne/40 transition-all duration-300 hover:shadow-luxury-hover"
              >
                {/* Image Container with Badges & Hover Controls */}
                <div className="relative aspect-square overflow-hidden bg-white">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover luxury-image-hover" 
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-charcoal text-white text-[9px] uppercase tracking-widest px-2.5 py-1 z-10">
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
                      inWishlist 
                        ? 'bg-white text-champagne-gold shadow-sm' 
                        : 'bg-white/80 text-charcoal hover:text-champagne-gold hover:bg-white'
                    }`}
                    title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart size={15} fill={inWishlist ? 'currentColor' : 'none'} />
                  </button>

                  {/* Hover Quick Action Drawer */}
                  <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between border-t border-champagne/40 z-10">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="text-[10px] uppercase tracking-widest text-charcoal hover:text-champagne-gold flex items-center space-x-1 font-medium"
                    >
                      <Eye size={12} />
                      <span>Quick View</span>
                    </button>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="text-[10px] uppercase tracking-widest text-charcoal hover:text-champagne-gold flex items-center space-x-1 font-medium"
                    >
                      <ShoppingBag size={12} />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div 
                  className="p-5 flex-1 flex flex-col justify-between cursor-pointer"
                  onClick={() => onSelectProduct(product.id)}
                >
                  <div>
                    {/* Metal & Carat Specs */}
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-mutedGrey mb-1.5">
                      <span>{product.metal}</span>
                      <span className="text-champagne-gold font-medium">{product.carat}</span>
                    </div>

                    <h3 className="font-serif text-base text-charcoal font-medium group-hover:text-champagne-gold transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-mutedGrey mt-1">
                      {product.shape} • {product.cut}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-champagne/30 flex items-center justify-between">
                    <span className="font-sans text-sm font-semibold text-charcoal">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[10px] text-mutedGrey uppercase tracking-widest">
                      {product.certificate}
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
