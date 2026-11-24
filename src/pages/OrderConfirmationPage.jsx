import React from 'react';
import { formatPrice, formatLuxuryDate } from '../lib/utils';
import { CheckCircle2, ShieldCheck, Truck, Package, Printer, ArrowRight, Download } from 'lucide-react';

export default function OrderConfirmationPage({ order, onContinueShopping }) {
  if (!order) return null;

  return (
    <div className="bg-ivory min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Header */}
        <div className="bg-white p-8 sm:p-12 border border-champagne/40 shadow-luxury text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-champagne-light/70 flex items-center justify-center text-champagne-gold">
            <CheckCircle2 size={36} />
          </div>

          <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block">
            Order Confirmed & Insured
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light">
            Thank You For Choosing MJR
          </h1>

          <p className="text-xs text-mutedGrey font-sans max-w-md mx-auto leading-relaxed">
            Dear <strong className="text-charcoal">{order.customer.name}</strong>, your diamond order <strong className="text-charcoal font-mono">{order.id}</strong> has been secured. A duplicate certificate dossier and tax invoice have been dispatched to <strong>{order.customer.email}</strong>.
          </p>

          <div className="pt-2 flex items-center justify-center space-x-4 text-xs font-mono text-charcoal bg-ivory py-3 px-4 border border-champagne/40 max-w-md mx-auto">
            <span>Tracking Code:</span>
            <span className="font-bold text-champagne-gold">{order.trackingNumber}</span>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white p-6 sm:p-8 border border-champagne/40 shadow-luxury space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-champagne/30 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-mutedGrey block">Placed On</span>
              <span className="font-medium text-charcoal">{formatLuxuryDate(order.createdAt)}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-mutedGrey block">Payment Status</span>
              <span className="font-medium text-green-700 bg-green-50 px-2 py-0.5 border border-green-200">
                {order.paymentStatus} via {order.paymentMethod}
              </span>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-charcoal font-semibold mb-4">
              Handcrafted Items ({order.items.length})
            </h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex space-x-4 pb-4 border-b border-champagne/20">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-20 object-cover border border-champagne/30 flex-shrink-0"
                  />
                  <div className="flex-1 text-xs">
                    <h4 className="font-serif font-medium text-charcoal text-sm">{item.name}</h4>
                    <p className="text-mutedGrey text-[11px] mt-0.5">
                      {item.selectedMetal} • Size: {item.selectedSize}
                    </p>
                    <p className="text-mutedGrey text-[11px]">
                      {item.carat} • {item.cut || 'Ideal Cut'} • Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <span className="font-semibold text-charcoal block">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <span className="text-[10px] text-mutedGrey">Incl. GST</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Financial Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-mutedGrey block mb-1">
                Insured Shipping Destination
              </span>
              <p className="font-medium text-charcoal">{order.customer.name}</p>
              <p className="text-mutedGrey">{order.customer.address}</p>
              <p className="text-mutedGrey">{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
              <p className="text-mutedGrey mt-1">Tel: {order.customer.phone}</p>
            </div>

            <div className="space-y-1.5 text-right sm:border-l sm:border-champagne/30 sm:pl-6">
              <div className="flex justify-between text-mutedGrey">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-mutedGrey">
                <span>GST (3%)</span>
                <span>{formatPrice(order.gst)}</span>
              </div>
              <div className="flex justify-between text-mutedGrey">
                <span>Insured Courier</span>
                <span className="text-champagne-gold font-medium">Free</span>
              </div>
              <div className="border-t border-champagne/30 pt-2 flex justify-between font-semibold text-charcoal text-sm">
                <span>Grand Total</span>
                <span className="text-base text-charcoal">{formatPrice(order.grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Next Steps / Packaging Assurance */}
          <div className="p-4 bg-champagne-subtle border border-champagne/40 text-xs text-charcoal flex items-start space-x-3">
            <Truck size={18} className="text-champagne-gold flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-semibold">White-Glove Insured Dispatch</p>
              <p className="text-mutedGrey text-[11px]">
                Your jewellery is currently undergoing final quality inspection under a gemological lens before being sealed in our signature MJR suede box. A delivery associate will verify receipt via SMS OTP.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-2 text-xs uppercase tracking-wider text-mutedGrey hover:text-charcoal transition-colors"
            >
              <Printer size={14} />
              <span>Print Tax Invoice</span>
            </button>

            <button
              onClick={onContinueShopping}
              className="w-full sm:w-auto px-8 py-3 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-champagne-gold transition-colors flex items-center justify-center space-x-2"
            >
              <span>Explore More Creations</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
