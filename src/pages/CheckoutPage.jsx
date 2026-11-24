import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, generateOrderNumber, estimatePincodeDelivery } from '../lib/utils';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  ArrowLeft, 
  CheckCircle,
  Truck,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function CheckoutPage({ onOrderSuccess, onBackToCart, onNavigateLogin }) {
  const { cart, cartTotals, placeOrder, showToast } = useStore();
  const { user } = useAuth();

  const [customer, setCustomer] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Mumbai',
    state: user?.state || 'Maharashtra',
    pincode: user?.pincode || '400050'
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay-upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [razorpayStep, setRazorpayStep] = useState('select'); // 'select', 'processing', 'success'

  const deliveryEstimate = estimatePincodeDelivery(customer.pincode);

  if (cart.length === 0) {
    return (
      <div className="bg-ivory min-h-screen py-20">
        <div className="max-w-md mx-auto bg-white p-8 border border-champagne/40 text-center shadow-luxury space-y-4">
          <h2 className="font-serif text-2xl text-charcoal">Your Shopping Bag is Empty</h2>
          <p className="text-xs text-mutedGrey">Please add diamonds to your shopping bag before proceeding to checkout.</p>
          <button 
            onClick={onBackToCart}
            className="px-6 py-2.5 bg-charcoal text-white text-xs uppercase tracking-widest hover:bg-champagne-gold"
          >
            Explore Collections
          </button>
        </div>
      </div>
    );
  }

  const handleStartPayment = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address || !customer.pincode) {
      showToast('Please complete all required shipping fields.', 'error');
      return;
    }

    setShowRazorpayModal(true);
    setRazorpayStep('select');
  };

  const handleSimulateRazorpaySuccess = async () => {
    setRazorpayStep('processing');
    
    setTimeout(async () => {
      setRazorpayStep('success');

      // Create Order
      const newOrder = {
        id: generateOrderNumber(),
        createdAt: new Date().toISOString(),
        customer,
        items: cart,
        subtotal: cartTotals.subtotal,
        gst: cartTotals.gst,
        shipping: 0,
        grandTotal: cartTotals.grandTotal,
        paymentMethod: paymentMethod === 'razorpay-upi' ? 'Razorpay UPI (Verified)' : paymentMethod === 'card' ? 'Credit Card (Visa/Mastercard 3D Secure)' : 'Net Banking (HDFC Bank Verified)',
        paymentStatus: 'Paid',
        orderStatus: 'Confirmed',
        trackingNumber: `MJR-INSURED-${Math.floor(100000 + Math.random() * 900000)}`
      };

      try {
        const savedOrder = await placeOrder(newOrder);

        // Confetti celebration
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#B99B70', '#E8DFD2', '#292929']
          });
        } catch (e) {}

        setShowRazorpayModal(false);
        if (onOrderSuccess) onOrderSuccess(savedOrder);
      } catch (err) {
        showToast('Error recording order. Please contact support.', 'error');
        setRazorpayStep('select');
      }
    }, 1500);
  };

  return (
    <div className="bg-ivory min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button 
          onClick={onBackToCart}
          className="flex items-center space-x-1 text-xs uppercase tracking-widest text-mutedGrey hover:text-charcoal mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Shopping Bag</span>
        </button>

        {/* Header */}
        <div className="mb-10 pb-4 border-b border-champagne/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-gold font-semibold block">
              Secure Luxury Checkout
            </span>
            <h1 className="font-serif text-3xl text-charcoal">
              DELIVERY & PAYMENT
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-xs text-mutedGrey">
            <Lock size={14} className="text-champagne-gold" />
            <span>256-Bit SSL Encrypted & RBI Guideline Compliant</span>
          </div>
        </div>

        {/* Main Grid: Left Form (7 cols), Right Summary (5 cols) */}
        <form onSubmit={handleStartPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Form */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Customer Authentication Notice */}
            {!user && (
              <div className="p-4 bg-white border border-champagne/50 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-charcoal">Already have an MJR account?</span>
                  <p className="text-mutedGrey text-[11px]">Sign in to load saved addresses & view lifetime loyalty tier.</p>
                </div>
                <button
                  type="button"
                  onClick={onNavigateLogin}
                  className="px-4 py-1.5 bg-champagne-subtle border border-champagne-gold/60 text-charcoal uppercase tracking-wider font-medium text-[11px] hover:bg-champagne-gold hover:text-white transition-colors"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Shipping Address */}
            <div className="bg-white p-6 sm:p-8 border border-champagne/40 space-y-4">
              <h2 className="font-serif text-xl text-charcoal pb-3 border-b border-champagne/30">
                1. Delivery Destination
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={customer.name}
                    onChange={e => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="Recipient's Name"
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    Mobile Phone (For OTP Verification) *
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={customer.phone}
                    onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="+91 98200 XXXXX"
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                  Email Address (For Tax Invoice & GIA Cert) *
                </label>
                <input 
                  type="email" 
                  required
                  value={customer.email}
                  onChange={e => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                  Street Address & Apartment / Villa *
                </label>
                <textarea 
                  rows={2}
                  required
                  value={customer.address}
                  onChange={e => setCustomer({ ...customer, address: e.target.value })}
                  placeholder="Flat No, Wing, Building Name, Street..."
                  className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    City *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={customer.city}
                    onChange={e => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    State *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={customer.state}
                    onChange={e => setCustomer({ ...customer, state: e.target.value })}
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    Pincode *
                  </label>
                  <input 
                    type="text" 
                    required
                    maxLength={6}
                    value={customer.pincode}
                    onChange={e => setCustomer({ ...customer, pincode: e.target.value.replace(/\D/g, '') })}
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold font-mono"
                  />
                </div>
              </div>

              {/* Delivery Window banner */}
              <div className="p-3 bg-champagne-subtle border border-champagne/40 text-xs text-charcoal flex items-center space-x-2">
                <Truck size={16} className="text-champagne-gold flex-shrink-0" />
                <span>
                  {deliveryEstimate.message}
                </span>
              </div>
            </div>

            {/* Payment Options Selection */}
            <div className="bg-white p-6 sm:p-8 border border-champagne/40 space-y-4">
              <h2 className="font-serif text-xl text-charcoal pb-3 border-b border-champagne/30">
                2. Payment Method
              </h2>

              <div className="space-y-3">
                {/* Razorpay UPI */}
                <label className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'razorpay-upi' ? 'border-champagne-gold bg-champagne-subtle/50' : 'border-champagne/40 hover:border-charcoal'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={paymentMethod === 'razorpay-upi'} 
                      onChange={() => setPaymentMethod('razorpay-upi')}
                      className="accent-champagne-gold"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <Smartphone size={16} className="text-champagne-gold" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Razorpay UPI (Google Pay / PhonePe / Paytm / BHIM)
                        </span>
                      </div>
                      <span className="text-[11px] text-mutedGrey block mt-0.5">
                        Instant zero-charge UPI payment via Razorpay secure gateway
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest bg-charcoal text-champagne-gold px-2 py-0.5 font-mono">
                    FASTEST
                  </span>
                </label>

                {/* Credit / Debit Cards */}
                <label className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-champagne-gold bg-champagne-subtle/50' : 'border-champagne/40 hover:border-charcoal'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')}
                      className="accent-champagne-gold"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <CreditCard size={16} className="text-champagne-gold" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Credit / Debit Card (Visa, MasterCard, Amex, RuPay)
                        </span>
                      </div>
                      <span className="text-[11px] text-mutedGrey block mt-0.5">
                        3D Secure 2.0 OTP authentication via Indian bank gateways
                      </span>
                    </div>
                  </div>
                </label>

                {/* Net Banking */}
                <label className={`p-4 border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'netbanking' ? 'border-champagne-gold bg-champagne-subtle/50' : 'border-champagne/40 hover:border-charcoal'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      checked={paymentMethod === 'netbanking'} 
                      onChange={() => setPaymentMethod('netbanking')}
                      className="accent-champagne-gold"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <Building2 size={16} className="text-champagne-gold" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                          Net Banking (All Major Indian Banks)
                        </span>
                      </div>
                      <span className="text-[11px] text-mutedGrey block mt-0.5">
                        HDFC, ICICI, SBI, Axis, Kotak & 50+ banking institutions
                      </span>
                    </div>
                  </div>
                </label>
              </div>

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-charcoal text-white text-xs uppercase tracking-[0.24em] font-medium hover:bg-champagne-gold transition-colors flex items-center justify-center space-x-2 shadow-luxury"
            >
              <Lock size={14} className="text-champagne-gold" />
              <span>PAY {formatPrice(cartTotals.grandTotal)} VIA SECURE GATEWAY</span>
            </button>

          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-champagne/40 shadow-luxury space-y-6">
              
              <h3 className="font-serif text-xl text-charcoal pb-3 border-b border-champagne/30">
                Order Summary ({cart.length})
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex space-x-3 pb-3 border-b border-champagne/20">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover border border-champagne/30 flex-shrink-0"
                    />
                    <div className="flex-1 text-xs">
                      <h4 className="font-serif font-medium text-charcoal line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] text-mutedGrey mt-0.5">{item.selectedMetal} • Size: {item.selectedSize}</p>
                      <p className="text-[10px] text-mutedGrey">{item.carat} • Qty: {item.quantity}</p>
                      <span className="font-semibold text-charcoal block mt-1">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-charcoal pt-2">
                <div className="flex justify-between text-mutedGrey">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-mutedGrey">
                  <span>GST (3% Fine Jewellery)</span>
                  <span>{formatPrice(cartTotals.gst)}</span>
                </div>
                <div className="flex justify-between text-mutedGrey">
                  <span>Insured Pan-India Transit</span>
                  <span className="text-champagne-gold font-medium uppercase text-[10px]">Complimentary</span>
                </div>
                <div className="flex justify-between text-mutedGrey">
                  <span>Signature Suede Packaging</span>
                  <span className="text-champagne-gold font-medium uppercase text-[10px]">Included</span>
                </div>
                <div className="border-t border-champagne/30 pt-3 flex justify-between font-sans text-base font-semibold text-charcoal">
                  <span>Total Payable</span>
                  <span className="text-lg text-charcoal">{formatPrice(cartTotals.grandTotal)}</span>
                </div>
              </div>

              {/* Assurances */}
              <div className="pt-4 border-t border-champagne/30 space-y-2 text-[11px] text-mutedGrey">
                <div className="flex items-center space-x-2">
                  <ShieldCheck size={14} className="text-champagne-gold" />
                  <span>Verified IGI / GIA Diamond Certification dossier</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck size={14} className="text-champagne-gold" />
                  <span>Tamper-proof seal with OTP verification upon handover</span>
                </div>
              </div>

            </div>
          </div>

        </form>

        {/* Razorpay Test Mode Simulation Modal */}
        {showRazorpayModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm">
            <div className="bg-white max-w-md w-full border border-champagne/60 shadow-modal overflow-hidden animate-fade-in">
              
              {/* Razorpay Header */}
              <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B99B70] font-sans font-semibold">
                    Razorpay Gateway (Test Mode)
                  </span>
                  <h3 className="font-serif text-lg font-normal">MJR Luxury Fine Diamonds</h3>
                </div>
                <span className="font-mono text-sm font-semibold">{formatPrice(cartTotals.grandTotal)}</span>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {razorpayStep === 'select' && (
                  <>
                    <p className="text-xs text-charcoal-light">
                      This is an authenticated demo transaction for <strong>{customer.name}</strong> ({customer.phone}).
                    </p>

                    <div className="p-3 bg-ivory border border-champagne/40 text-xs text-charcoal space-y-1">
                      <div className="flex justify-between">
                        <span className="text-mutedGrey">Method:</span>
                        <span className="font-semibold">{paymentMethod.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-mutedGrey">Amount:</span>
                        <span className="font-semibold">{formatPrice(cartTotals.grandTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-mutedGrey">Status:</span>
                        <span className="text-green-600 font-semibold">Simulated Gateway Ready</span>
                      </div>
                    </div>

                    <div className="pt-2 flex space-x-3">
                      <button
                        type="button"
                        onClick={handleSimulateRazorpaySuccess}
                        className="flex-1 py-3 bg-[#0C2340] text-white text-xs uppercase tracking-widest font-medium hover:bg-champagne-gold hover:text-charcoal transition-colors"
                      >
                        Authorize Payment (Success)
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowRazorpayModal(false)}
                        className="px-4 py-3 border border-charcoal/20 text-xs uppercase tracking-widest text-mutedGrey hover:text-charcoal"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}

                {razorpayStep === 'processing' && (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-10 h-10 border-2 border-champagne-gold border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="font-serif text-base text-charcoal">Verifying Secure Payment...</p>
                    <p className="text-[11px] text-mutedGrey">Communicating with Reserve Bank of India gateway token...</p>
                  </div>
                )}

                {razorpayStep === 'success' && (
                  <div className="py-6 text-center space-y-2">
                    <CheckCircle size={36} className="text-green-600 mx-auto" />
                    <p className="font-serif text-lg text-charcoal">Payment Verified!</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
