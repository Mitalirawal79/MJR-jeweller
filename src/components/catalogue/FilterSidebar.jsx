import React from 'react';
import { RotateCcw, Check } from 'lucide-react';

export default function FilterSidebar({ 
  filters, 
  setFilters, 
  resetFilters, 
  totalResults 
}) {
  const shapes = ['All', 'Round Brilliant', 'Emerald', 'Oval', 'Cushion', 'Princess', 'Marquise'];
  const metals = ['All', '18K White Gold', '18K Yellow Gold', '18K Rose Gold', 'Platinum 950'];
  const cuts = ['All', 'Ideal', 'Excellent', 'Very Good'];
  const clarities = ['All', 'FL (Flawless)', 'VVS1', 'VVS2', 'VS1'];
  const colors = ['All', 'D (Colorless)', 'E (Colorless)', 'F (Colorless)'];
  const occasions = ['All', 'Engagement', 'Bridal', 'Everyday Luxury', 'Evening', 'Anniversary'];

  return (
    <aside className="w-full space-y-7 text-xs font-sans">
      
      {/* Top Filter Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-champagne/40">
        <div>
          <span className="text-[11px] uppercase tracking-widest font-semibold text-charcoal">
            Refine By
          </span>
          <span className="text-[10px] text-mutedGrey block mt-0.5">
            {totalResults} creations
          </span>
        </div>
        <button 
          onClick={resetFilters}
          className="text-[10px] uppercase tracking-wider text-mutedGrey hover:text-champagne-gold transition-colors flex items-center space-x-1"
        >
          <RotateCcw size={11} />
          <span>Reset</span>
        </button>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="text-[11px] uppercase tracking-widest text-charcoal font-semibold mb-3">
          Price Range (₹)
        </h4>
        <div className="space-y-1.5 text-mutedGrey">
          {[
            { label: 'All Prices', min: 0, max: 9999999 },
            { label: 'Under ₹2,50,000', min: 0, max: 250000 },
            { label: '₹2,50,000 – ₹5,00,000', min: 250000, max: 500000 },
            { label: 'Above ₹5,00,000', min: 500000, max: 9999999 }
          ].map((tier, idx) => (
            <label key={idx} className="flex items-center space-x-2 cursor-pointer hover:text-charcoal py-1">
              <input 
                type="radio" 
                name="priceTier"
                checked={filters.maxPrice === tier.max && filters.minPrice === tier.min}
                onChange={() => setFilters(prev => ({ ...prev, minPrice: tier.min, maxPrice: tier.max }))}
                className="accent-champagne-gold"
              />
              <span className={filters.maxPrice === tier.max && filters.minPrice === tier.min ? 'text-charcoal font-medium' : ''}>
                {tier.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Diamond Shape */}
      <div>
        <h4 className="text-[11px] uppercase tracking-widest text-charcoal font-semibold mb-3">
          Diamond Shape
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {shapes.map((s) => (
            <button
              key={s}
              onClick={() => setFilters(prev => ({ ...prev, shape: s === 'All' ? '' : s }))}
              className={`px-2.5 py-1.5 border text-left truncate transition-colors text-[11px] ${
                (s === 'All' && !filters.shape) || filters.shape === s
                  ? 'border-charcoal bg-charcoal text-white font-medium'
                  : 'border-champagne/50 bg-white text-charcoal hover:border-charcoal'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Metal Type */}
      <div>
        <h4 className="text-[11px] uppercase tracking-widest text-charcoal font-semibold mb-3">
          Precious Metal
        </h4>
        <div className="space-y-1.5 text-mutedGrey">
          {metals.map((m) => (
            <label key={m} className="flex items-center space-x-2 cursor-pointer hover:text-charcoal py-1">
              <input 
                type="radio" 
                name="metalType"
                checked={(m === 'All' && !filters.metal) || filters.metal === m}
                onChange={() => setFilters(prev => ({ ...prev, metal: m === 'All' ? '' : m }))}
                className="accent-champagne-gold"
              />
              <span className={filters.metal === m ? 'text-charcoal font-medium' : ''}>{m}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Diamond Cut */}
      <div>
        <h4 className="text-[11px] uppercase tracking-widest text-charcoal font-semibold mb-3">
          Cut Grade
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {cuts.map((c) => (
            <button
              key={c}
              onClick={() => setFilters(prev => ({ ...prev, cut: c === 'All' ? '' : c }))}
              className={`px-2.5 py-1 border transition-colors text-[11px] ${
                (c === 'All' && !filters.cut) || filters.cut === c
                  ? 'border-champagne-gold bg-champagne-gold text-white font-medium'
                  : 'border-champagne/50 bg-white text-charcoal hover:border-charcoal'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <h4 className="text-[11px] uppercase tracking-widest text-charcoal font-semibold mb-3">
          Occasion
        </h4>
        <div className="space-y-1.5 text-mutedGrey">
          {occasions.map((occ) => (
            <label key={occ} className="flex items-center space-x-2 cursor-pointer hover:text-charcoal py-0.5">
              <input 
                type="radio" 
                name="occasionFilter"
                checked={(occ === 'All' && !filters.occasion) || filters.occasion === occ}
                onChange={() => setFilters(prev => ({ ...prev, occasion: occ === 'All' ? '' : occ }))}
                className="accent-champagne-gold"
              />
              <span className={filters.occasion === occ ? 'text-charcoal font-medium' : ''}>{occ}</span>
            </label>
          ))}
        </div>
      </div>

    </aside>
  );
}
