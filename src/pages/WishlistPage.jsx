import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../lib/utils';
import { Heart, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';

export default function WishlistPage({ onSelectProduct, onExploreCollections }) {
  const { wishlist, products, toggleWishlist, addToCart } = useStore();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-ivory min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block">
            Personal Curations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-light tracking-wide">
            YOUR SAVED CREATIONS
          </h1>
          <p className="text-xs sm:text-sm text-mutedGrey font-sans">
            {wishlistProducts.length === 0 
              ? 'Your wishlist is currently empty.' 
              : `${wishlistProducts.length} extraordinary diamond pieces saved for your meaningful moments.`}
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white max-w-xl mx-auto p-12 text-center border border-champagne/40 space-y-5 shadow-luxury">
            <div className="w-16 h-16 mx-auto rounded-full bg-champagne-light/50 flex items-center justify-center text-champagne-gold">
              <Heart size={28} strokeWidth={1.2} />
            </div>
            <h3 className="font-serif text-2xl text-charcoal">Save Your Most Coveted Diamonds</h3>
            <p className="text-xs text-mutedGrey leading-relaxed">
              Explore our diamond rings, cascading necklaces, and tennis bracelets, and click the heart icon to save your favourites here.
            </p>
            <button
              onClick={onExploreCollections}
              className="mt-2 inline-block px-8 py-3.5 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-champagne-gold transition-colors"
            >
              Explore Collections
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white border border-champagne/40 overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-luxury-hover transition-all"
              >
                <div className="relative aspect-square overflow-hidden bg-ivory-50">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover luxury-image-hover"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-champagne-gold hover:text-red-500 transition-colors shadow-sm"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between text-[10px] uppercase tracking-wider text-mutedGrey mb-1">
                      <span>{product.metal}</span>
                      <span className="text-champagne-gold font-medium">{product.carat}</span>
                    </div>

                    <h3 
                      onClick={() => onSelectProduct(product.id)}
                      className="font-serif text-base text-charcoal font-medium hover:text-champagne-gold cursor-pointer transition-colors line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-mutedGrey mt-1">
                      {product.shape} • {product.cut}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-champagne/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-sm font-semibold text-charcoal">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[10px] text-mutedGrey uppercase">
                        {product.certificate}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-2.5 bg-charcoal text-white text-[11px] uppercase tracking-widest font-medium hover:bg-champagne-gold transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <ShoppingBag size={13} />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
