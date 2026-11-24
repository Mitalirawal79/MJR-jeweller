import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isInfo = toast.type === 'info';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-fade-in shadow-modal">
      <div className="bg-charcoal text-white rounded-none border border-champagne-gold/30 p-4 flex items-start space-x-3 backdrop-blur-md">
        {isSuccess && <CheckCircle2 size={18} className="text-champagne-gold mt-0.5 flex-shrink-0" />}
        {isInfo && <Info size={18} className="text-champagne-light mt-0.5 flex-shrink-0" />}
        {isError && <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />}
        
        <div className="flex-1 text-xs tracking-wide font-sans text-ivory leading-relaxed">
          {toast.message}
        </div>
      </div>
    </div>
  );
}
