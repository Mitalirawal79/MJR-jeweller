import React from 'react';
import FilterSidebar from './FilterSidebar';
import { X } from 'lucide-react';

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  setFilters,
  resetFilters,
  totalResults
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-xs bg-ivory shadow-drawer flex flex-col justify-between">

          <div className="p-5 border-b border-champagne/40 flex items-center justify-between bg-white">
            <span className="text-xs uppercase tracking-widest font-semibold text-charcoal">
              Filter Diamond Jewels
            </span>
            <button onClick={onClose} className="p-1 text-mutedGrey hover:text-charcoal">
              <X size={18} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              totalResults={totalResults}
            />
          </div>

          <div className="p-4 bg-white border-t border-champagne/40">
            <button
              onClick={onClose}
              className="w-full py-3 bg-charcoal text-white text-xs uppercase tracking-widest font-medium hover:bg-champagne-gold transition-colors"
            >
              Apply Filters ({totalResults})
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
