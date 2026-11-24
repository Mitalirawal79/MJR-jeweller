import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatPrice, estimatePincodeDelivery } from '../lib/utils';
import { 
  Heart, 
  ShoppingBag, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  MapPin, 
  Check, 
  Sparkles,
  Info,
  Calendar,
  Compass
} from 'lucide-react';

export default function ProductDetailsPage({ 
  productId, 
  onNavigateHome, 
  onNavigateCatalogue,
  onProceedToCheckout
}) {
  const { 
    products, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    setBookingModalOpen,
    setSelectedShowroomForBooking
  } = useStore();

  const product = products.find(p => p.id === productId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState(product?.metal || '18K White Gold');
  const [selectedSize, setSelectedSize] = useState(product?.availableSizes ? product.availableSizes[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);
  const [activeTab, setActiveTab] = useState('specs');

  if (!product) return null;

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const inWishlist = isInWishlist(product.id);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    const res = estimatePincodeDelivery(pincode);
    setPincodeResult(res);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedMetal);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, selectedMetal);
    if (onProceedToCheckout) onProceedToCheckout();
  };

  const handleOpenBooking = () => {
    setSelectedShowroomForBooking(null);
    setBookingModalOpen(true);
  };

  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-[11px] text-mutedGrey uppercase tracking-widest mb-8">
          <button onClick={onNavigateHome} className="hover:text-charcoal transition-colors">
            Home
          </button>
          <ChevronRight size={12} />
          <button onClick={onNavigateCatalogue} className="hover:text-charcoal transition-colors">
            Catalogue
          </button>
          <ChevronRight size={12} />
          <span className="text-charcoal font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Gallery & Zoom Showcase (7 columns) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-square bg-white border border-champagne/40 overflow-hidden shadow-luxury group">
              <img 
                src={gallery[activeImageIndex] || product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 cursor-zoom-in"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 bg-charcoal text-white text-[10px] uppercase tracking-widest px-3 py-1.5 shadow-sm">
                  {product.badge}
                </span>
              )}

              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-wider text-charcoal px-3 py-1 border border-champagne/40">
                Hover to magnify 2x
              </div>
            </div>

            {/* Thumbnail Slider */}
            {gallery.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 bg-white border flex-shrink-0 overflow-hidden transition-all ${
                      activeImageIndex === idx 
                        ? 'border-champagne-gold ring-1 ring-champagne-gold' 
                        : 'border-champagne/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Assurance Guarantees Bar */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-champagne/30 text-center">
              <div className="p-3 bg-white border border-champagne/30 flex flex-col items-center">
                <ShieldCheck size={20} className="text-champagne-gold mb-1" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-charcoal">GIA / IGI Certified</span>
                <span className="text-[10px] text-mutedGrey">Individual Dossier</span>
              </div>

              <div className="p-3 bg-white border border-champagne/30 flex flex-col items-center">
                <Truck size={20} className="text-champagne-gold mb-1" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-charcoal">Insured Transit</span>
                <span className="text-[10px] text-mutedGrey">Pan-India Delivery</span>
              </div>

              <div className="p-3 bg-white border border-champagne/30 flex flex-col items-center">
                <RotateCcw size={20} className="text-champagne-gold mb-1" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-charcoal">Lifetime Exchange</span>
                <span className="text-[10px] text-mutedGrey">At Any MJR Salon</span>
              </div>
            </div>

          </div>

          {/* Right: Product Details & Buying Actions (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block mb-1">
                {product.subCategory || 'Fine Diamond Jewellery'} • {product.certificate}
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-light leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline space-x-3">
                <span className="font-sans text-2xl sm:text-3xl font-semibold text-charcoal">
                  {formatPrice(product.price)}
                </span>
                <span className="text-[11px] text-mutedGrey uppercase tracking-wider">
                  (Incl. of all taxes & 3% GST)
                </span>
              </div>

              <p className="text-xs text-charcoal-light font-sans leading-relaxed mt-4">
                {product.description}
              </p>
            </div>

            {/* 4Cs Diamond Highlight Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-white p-4 border border-champagne/40">
              <div className="border-r border-b border-champagne/20 pb-2 pr-2">
                <span className="text-[10px] uppercase tracking-wider text-mutedGrey block">Carat Weight</span>
                <span className="font-semibold text-charcoal text-sm">{product.carat}</span>
              </div>

              <div className="border-b border-champagne/20 pb-2 pl-2">
                <span className="text-[10px] uppercase tracking-wider text-mutedGrey block">Cut Grade</span>
                <span className="font-semibold text-charcoal text-sm">{product.cut}</span>
              </div>

              <div className="border-r border-champagne/20 pt-2 pr-2">
                <span className="text-[10px] uppercase tracking-wider text-mutedGrey block">Diamond Shape</span>
                <span className="font-semibold text-charcoal text-sm">{product.shape}</span>
              </div>

              <div className="pt-2 pl-2">
                <span className="text-[10px] uppercase tracking-wider text-mutedGrey block">Colour & Clarity</span>
                <span className="font-semibold text-charcoal text-sm">{product.color} • {product.clarity}</span>
              </div>
            </div>

            {/* Precious Metal Selector */}
            {product.metalOptions && (
              <div>
                <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-2">
                  Select Precious Metal: <span className="font-normal text-mutedGrey">{selectedMetal}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.metalOptions.map((metal) => (
                    <button
                      key={metal}
                      onClick={() => setSelectedMetal(metal)}
                      className={`text-xs px-3.5 py-2 border transition-all ${
                        selectedMetal === metal
                          ? 'border-charcoal bg-charcoal text-white font-medium'
                          : 'border-champagne/60 bg-white text-charcoal hover:border-charcoal'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Ring / Chain Size Selector */}
            {product.availableSizes && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold">
                    Select Size: <span className="font-normal text-mutedGrey">{selectedSize}</span>
                  </label>
                  <button className="text-[10px] uppercase tracking-wider text-champagne-gold hover:underline">
                    Ring Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`text-xs min-w-[38px] h-9 px-2 border flex items-center justify-center transition-all ${
                        selectedSize === size
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

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-champagne/40">
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-charcoal text-white text-xs uppercase tracking-[0.24em] font-medium hover:bg-champagne-gold transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingBag size={15} />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`px-4 border transition-colors ${
                    inWishlist 
                      ? 'border-champagne-gold bg-champagne-gold/10 text-champagne-gold' 
                      : 'border-champagne/60 bg-white text-charcoal hover:text-champagne-gold'
                  }`}
                  title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-champagne-gold text-charcoal text-xs uppercase tracking-[0.24em] font-semibold hover:bg-white hover:text-charcoal border border-champagne-gold transition-colors"
              >
                BUY NOW (INSTANT CHECKOUT)
              </button>

              <button
                onClick={handleOpenBooking}
                className="w-full py-3 bg-white text-charcoal text-xs uppercase tracking-[0.2em] font-medium border border-charcoal/30 hover:border-charcoal transition-colors flex items-center justify-center space-x-2"
              >
                <Compass size={14} className="text-champagne-gold" />
                <span>BOOK A PRIVATE SHOWROOM VIEWING</span>
              </button>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="p-4 bg-white border border-champagne/40 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block">
                Check Delivery & Showroom Availability
              </span>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input 
                  type="text" 
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode (e.g. 400050)"
                  className="flex-1 bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold font-mono"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-charcoal text-white text-xs uppercase tracking-wider hover:bg-champagne-gold transition-colors"
                >
                  Check
                </button>
              </form>

              {pincodeResult && (
                <div className={`text-xs pt-1 ${pincodeResult.valid ? 'text-charcoal' : 'text-red-500'}`}>
                  {pincodeResult.valid ? (
                    <div className="flex items-start space-x-1.5 text-[11px] text-charcoal">
                      <Check size={14} className="text-champagne-gold flex-shrink-0 mt-0.5" />
                      <span>{pincodeResult.message}</span>
                    </div>
                  ) : (
                    <span>{pincodeResult.message}</span>
                  )}
                </div>
              )}
            </div>

            {/* Editorial Tabbed Information */}
            <div className="pt-6 border-t border-champagne/40">
              <div className="flex border-b border-champagne/40 text-xs">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 mr-6 uppercase tracking-wider font-sans font-medium transition-colors ${
                    activeTab === 'specs' ? 'border-b-2 border-champagne-gold text-charcoal' : 'text-mutedGrey hover:text-charcoal'
                  }`}
                >
                  Certification
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 mr-6 uppercase tracking-wider font-sans font-medium transition-colors ${
                    activeTab === 'shipping' ? 'border-b-2 border-champagne-gold text-charcoal' : 'text-mutedGrey hover:text-charcoal'
                  }`}
                >
                  Delivery & Packaging
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 uppercase tracking-wider font-sans font-medium transition-colors ${
                    activeTab === 'care' ? 'border-b-2 border-champagne-gold text-charcoal' : 'text-mutedGrey hover:text-charcoal'
                  }`}
                >
                  Care & Polish
                </button>
              </div>

              <div className="py-4 text-xs text-charcoal-light leading-relaxed font-sans">
                {activeTab === 'specs' && (
                  <div className="space-y-2">
                    <p>
                      Every natural diamond set in this creation is certified by the Gemological Institute of America (GIA) or International Gemological Institute (IGI).
                    </p>
                    <p>
                      A physical laser-inscribed gemological certificate accompanies your piece, detailing its 4Cs grading, weight, proportion symmetry, and conflict-free origin.
                    </p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-2">
                    <p>
                      Delivered in our signature MJR hand-crafted suede jewellery casket, accompanied by a microfiber care cloth and velvet travel pouch.
                    </p>
                    <p>
                      100% insured courier via specialized security transit partners with tamper-evident OTP verification upon arrival.
                    </p>
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="space-y-2">
                    <p>
                      To preserve its eternal brilliance, clean with lukewarm water and a soft-bristled brush. Avoid direct contact with perfume sprays and harsh household detergents.
                    </p>
                    <p>
                      Complimentary ultrasonic cleaning and prong inspection is offered for life at all MJR flagship salons in Mumbai, Delhi, and Bengaluru.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
