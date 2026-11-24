import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../lib/utils';
import { X, Heart, ShoppingBag, Eye, ShieldCheck, Check, Sparkles } from 'lucide-react';

export default function QuickViewModal({ onNavigateToProduct }) {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist 
  } = useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMetal, setSelectedMetal] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const currentMetal = selectedMetal || product.metal;
  const currentSize = selectedSize || (product.availableSizes ? product.availableSizes[0] : null);

  const handleAdd = () => {
    addToCart(product, quantity, currentSize, currentMetal);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-charcoal/65 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-ivory shadow-modal border border-champagne/50 overflow-hidden animate-fade-in">
          
          {/* Close button */}
          <button 
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-charcoal hover:text-champagne-gold transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Product Images */}
            <div className="p-6 bg-white flex flex-col justify-between">
              <div className="relative aspect-square overflow-hidden bg-ivory-50 border border-champagne/30">
                <img 
                  src={gallery[selectedImage] || product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500" 
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-charcoal text-white text-[9px] uppercase tracking-widest px-2.5 py-1">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex space-x-2 mt-4 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-14 h-14 border flex-shrink-0 overflow-hidden ${
                        selectedImage === idx ? 'border-champagne-gold ring-1 ring-champagne-gold' : 'border-champagne/40'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-champagne-gold font-medium">
                  {product.subCategory || 'Fine Diamond Jewellery'}
                </span>

                <h3 className="font-serif text-2xl text-charcoal mt-1 leading-snug">
                  {product.name}
                </h3>

                <p className="font-sans text-lg font-semibold text-charcoal mt-2">
                  {formatPrice(product.price)}
                </p>

                <p className="text-xs text-mutedGrey leading-relaxed mt-3 line-clamp-3">
                  {product.description}
                </p>

                {/* 4Cs Diamond Specs Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-champagne/30 text-xs">
                  <div className="bg-white/80 p-2 border border-champagne/30">
                    <span className="text-[10px] text-mutedGrey uppercase tracking-wider block">Carat Weight</span>
                    <span className="font-medium text-charcoal">{product.carat}</span>
                  </div>
                  <div className="bg-white/80 p-2 border border-champagne/30">
                    <span className="text-[10px] text-mutedGrey uppercase tracking-wider block">Diamond Shape</span>
                    <span className="font-medium text-charcoal">{product.shape}</span>
                  </div>
                  <div className="bg-white/80 p-2 border border-champagne/30">
                    <span className="text-[10px] text-mutedGrey uppercase tracking-wider block">Cut Grade</span>
                    <span className="font-medium text-charcoal">{product.cut}</span>
                  </div>
                  <div className="bg-white/80 p-2 border border-champagne/30">
                    <span className="text-[10px] text-mutedGrey uppercase tracking-wider block">Colour & Clarity</span>
                    <span className="font-medium text-charcoal">{product.color} • {product.clarity}</span>
                  </div>
                </div>

                {/* Metal Selection */}
                {product.metalOptions && (
                  <div className="mt-4">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-mutedGrey block mb-2">
                      Metal: <strong className="text-charcoal font-normal">{currentMetal}</strong>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.metalOptions.map((metal) => (
                        <button
                          key={metal}
                          onClick={() => setSelectedMetal(metal)}
                          className={`text-xs px-2.5 py-1 border transition-all ${
                            currentMetal === metal 
                              ? 'border-charcoal bg-charcoal text-white' 
                              : 'border-champagne/60 bg-white text-charcoal hover:border-charcoal'
                          }`}
                        >
                          {metal}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ring / Chain Size Selection */}
                {product.availableSizes && (
                  <div className="mt-4">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-mutedGrey block mb-2">
                      Size: <strong className="text-charcoal font-normal">{currentSize}</strong>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`text-xs w-8 h-8 flex items-center justify-center border transition-all ${
                            currentSize === size 
                              ? 'border-charcoal bg-charcoal text-white font-medium' 
                              : 'border-champagne/60 bg-white text-charcoal hover:border-charcoal'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-champagne/30">
                <div className="flex space-x-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-champagne-gold transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag size={14} />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 border transition-colors ${
                      inWishlist 
                        ? 'border-champagne-gold bg-champagne-gold/10 text-champagne-gold' 
                        : 'border-champagne/60 bg-white text-charcoal hover:text-champagne-gold'
                    }`}
                    title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart size={16} fill={inWishlist ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setQuickViewProduct(null);
                    if (onNavigateToProduct) onNavigateToProduct(product.id);
                  }}
                  className="w-full text-center py-2 text-xs uppercase tracking-widest text-charcoal hover:text-champagne-gold transition-colors font-medium underline underline-offset-4 decoration-champagne-gold/50"
                >
                  View Full Diamond Specifications & Certification →
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
