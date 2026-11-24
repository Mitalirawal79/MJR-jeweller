import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import FilterSidebar from '../components/catalogue/FilterSidebar';
import FilterDrawer from '../components/catalogue/FilterDrawer';
import { formatPrice } from '../lib/utils';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  Heart, 
  Eye, 
  ShoppingBag, 
  Sparkles,
  ChevronRight 
} from 'lucide-react';

export default function CataloguePage({ 
  initialCategory = null, 
  onSelectProduct, 
  onNavigateHome 
}) {
  const { 
    products, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    setQuickViewProduct 
  } = useStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'all');
  const [sortBy, setSortBy] = useState('popularity');

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 9999999,
    shape: '',
    metal: '',
    cut: '',
    occasion: ''
  });

  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 9999999,
      shape: '',
      metal: '',
      cut: '',
      occasion: ''
    });
    setActiveCategory('all');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category check
      if (activeCategory !== 'all') {
        if (activeCategory === 'solitaires' && !p.subCategory?.toLowerCase().includes('solitaire') && p.category !== 'solitaires') {
          return false;
        } else if (activeCategory !== 'solitaires' && p.category !== activeCategory) {
          return false;
        }
      }

      // Price range
      if (p.price < filters.minPrice || p.price > filters.maxPrice) {
        return false;
      }

      // Shape
      if (filters.shape && p.shape !== filters.shape) {
        return false;
      }

      // Metal
      if (filters.metal && p.metal !== filters.metal && !p.metalOptions?.includes(filters.metal)) {
        return false;
      }

      // Cut
      if (filters.cut && p.cut !== filters.cut) {
        return false;
      }

      // Occasion
      if (filters.occasion && p.occasion !== filters.occasion) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // Popularity (rating * reviews)
      return (b.rating * b.reviewCount) - (a.rating * a.reviewCount);
    });
  }, [products, activeCategory, filters, sortBy]);

  const categories = [
    { id: 'all', name: 'All Jewellery' },
    { id: 'rings', name: 'Rings & Bands' },
    { id: 'necklaces', name: 'Necklaces & Pendants' },
    { id: 'earrings', name: 'Earrings' },
    { id: 'bracelets', name: 'Bracelets & Cuffs' },
    { id: 'solitaires', name: 'Solitaires Vault' },
  ];

  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-[11px] text-mutedGrey uppercase tracking-widest mb-6">
          <button onClick={onNavigateHome} className="hover:text-charcoal transition-colors">
            Home
          </button>
          <ChevronRight size={12} />
          <span className="text-charcoal font-medium">Diamond Jewellery Catalogue</span>
        </nav>

        {/* Hero Header */}
        <div className="mb-10 pb-6 border-b border-champagne/40">
          <div className="max-w-3xl">
            <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block mb-1">
              Natural Certified Diamonds
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-light tracking-wide">
              THE DIAMOND COLLECTION
            </h1>
            <p className="text-xs sm:text-sm text-mutedGrey font-sans mt-2 leading-relaxed">
              Precision cuts, colorless grades and architectural silhouettes hand-finished by master Indian goldsmiths. Every diamond is accompanied by authentic GIA or IGI laboratory certification.
            </p>
          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 mt-8">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`text-xs px-4 py-2 border transition-all whitespace-nowrap uppercase tracking-wider font-sans ${
                  activeCategory === c.id
                    ? 'border-charcoal bg-charcoal text-white font-medium'
                    : 'border-champagne/60 bg-white text-charcoal hover:border-charcoal'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar: Result Count & Sort Options */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-champagne/30 text-xs gap-4">
          
          <div className="flex items-center space-x-4">
            <span className="text-mutedGrey">
              Showing <strong className="text-charcoal font-semibold">{filteredProducts.length}</strong> creations
            </span>

            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-1.5 px-3 py-1.5 border border-champagne/60 bg-white text-charcoal"
            >
              <SlidersHorizontal size={13} />
              <span>Filter By</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown size={14} className="text-champagne-gold" />
            <span className="text-mutedGrey uppercase tracking-wider text-[11px]">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-champagne/60 px-3 py-1.5 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
            >
              <option value="popularity">Most Coveted (Popularity)</option>
              <option value="newest">Newest Additions</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Main Content: Left Filter Sidebar + Right Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white p-6 border border-champagne/40">
              <FilterSidebar 
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                totalResults={filteredProducts.length}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white p-12 text-center border border-champagne/40 space-y-4">
                <Sparkles size={32} className="mx-auto text-champagne-gold" />
                <h3 className="font-serif text-2xl text-charcoal">No Diamond Pieces Match Your Filter</h3>
                <p className="text-xs text-mutedGrey max-w-sm mx-auto leading-relaxed">
                  We invite you to broaden your carat, shape, or price parameters, or reset filters to browse our full vault.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-6 py-2.5 bg-charcoal text-white text-xs uppercase tracking-widest hover:bg-champagne-gold transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const inWishlist = isInWishlist(product.id);

                  return (
                    <div 
                      key={product.id}
                      className="group relative flex flex-col justify-between bg-white border border-champagne/40 transition-all duration-300 hover:shadow-luxury-hover"
                    >
                      {/* Image Box */}
                      <div className="relative aspect-square overflow-hidden bg-ivory-50">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover luxury-image-hover" 
                        />

                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-charcoal text-white text-[9px] uppercase tracking-widest px-2.5 py-1 z-10">
                            {product.badge}
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
                            inWishlist 
                              ? 'bg-white text-champagne-gold shadow-sm' 
                              : 'bg-white/80 text-charcoal hover:text-champagne-gold hover:bg-white'
                          }`}
                        >
                          <Heart size={15} fill={inWishlist ? 'currentColor' : 'none'} />
                        </button>

                        {/* Hover Quick Actions */}
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

                      {/* Info */}
                      <div 
                        className="p-5 flex-1 flex flex-col justify-between cursor-pointer"
                        onClick={() => onSelectProduct(product.id)}
                      >
                        <div>
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
            )}
          </div>

        </div>

      </div>

      {/* Mobile Drawer */}
      <FilterDrawer 
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        totalResults={filteredProducts.length}
      />
    </div>
  );
}
