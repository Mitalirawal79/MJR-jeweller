import React from 'react';
import { useStore } from '../../context/StoreContext';
import { formatPrice } from '../../lib/utils';
import { X, Trash2, Plus, Minus, ShieldCheck, Gift, ArrowRight } from 'lucide-react';

export default function CartDrawer({ onProceedToCheckout, onContinueShopping }) {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    cartTotals 
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-ivory shadow-drawer flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-champagne/40 flex items-center justify-between bg-white">
            <div>
              <h2 className="text-sm font-sans uppercase tracking-[0.2em] font-semibold text-charcoal">
                Your Shopping Bag
              </h2>
              <span className="text-[11px] text-mutedGrey">
                {cart.length === 0 ? 'Empty bag' : `${cart.reduce((s, i) => s + i.quantity, 0)} handcrafted pieces`}
              </span>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-mutedGrey hover:text-charcoal transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Complimentary Packaging Notice */}
          <div className="bg-champagne-subtle border-b border-champagne/30 px-6 py-2.5 flex items-center space-x-2 text-[11px] text-charcoal-light">
            <Gift size={14} className="text-champagne-gold flex-shrink-0" />
            <span>Includes MJR Signature Suede Box & Certificate Folder</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-champagne-light/50 flex items-center justify-center text-champagne-gold">
                  <Gift size={26} strokeWidth={1.2} />
                </div>
                <h3 className="font-serif text-xl text-charcoal">Your bag is currently empty</h3>
                <p className="text-xs text-mutedGrey max-w-xs mx-auto leading-relaxed">
                  Discover extraordinary diamond rings, cascading necklaces and iconic solitaires.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    if (onContinueShopping) onContinueShopping();
                  }}
                  className="mt-4 inline-block px-6 py-2.5 bg-charcoal text-white text-[11px] uppercase tracking-widest hover:bg-champagne-gold transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="flex space-x-4 border-b border-champagne/20 pb-5">
                  {/* Image */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-24 object-cover border border-champagne/30 flex-shrink-0 bg-white"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm text-charcoal font-medium leading-snug line-clamp-1">
                          {item.name}
                        </h4>
                        <button 
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-mutedGrey hover:text-charcoal ml-2 p-1"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="text-[11px] text-mutedGrey mt-1 space-y-0.5">
                        <p>{item.selectedMetal} {item.selectedSize && `• Size: ${item.selectedSize}`}</p>
                        <p>{item.carat} • {item.cut || 'Ideal Cut'}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-champagne/60 bg-white">
                        <button 
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-1 text-mutedGrey hover:text-charcoal transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-sans font-medium text-charcoal min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-1 text-mutedGrey hover:text-charcoal transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-sans text-xs font-semibold text-charcoal">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Totals & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-champagne/40 space-y-4 shadow-lg">
              <div className="space-y-1.5 text-xs text-charcoal">
                <div className="flex justify-between text-mutedGrey">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-mutedGrey">
                  <span>GST (3% Fine Jewellery)</span>
                  <span>{formatPrice(cartTotals.gst)}</span>
                </div>
                <div className="flex justify-between text-mutedGrey">
                  <span>Insured Pan-India Courier</span>
                  <span className="text-champagne-gold font-medium uppercase text-[11px]">Complimentary</span>
                </div>
                <div className="border-t border-champagne/30 pt-2 flex justify-between font-sans text-sm font-semibold text-charcoal">
                  <span>Estimated Total</span>
                  <span className="text-base text-charcoal">{formatPrice(cartTotals.grandTotal)}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    if (onProceedToCheckout) onProceedToCheckout();
                  }}
                  className="w-full py-3.5 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-champagne-gold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    if (onContinueShopping) onContinueShopping();
                  }}
                  className="w-full py-2.5 text-center text-xs uppercase tracking-widest text-mutedGrey hover:text-charcoal transition-colors"
                >
                  Continue Browsing
                </button>
              </div>

              <div className="pt-1 flex items-center justify-center space-x-2 text-[10px] text-mutedGrey">
                <ShieldCheck size={12} className="text-champagne-gold" />
                <span>100% Insured Delivery • Tamper-Proof Luxury Seal</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
