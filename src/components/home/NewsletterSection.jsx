import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { db } from '../../lib/supabase';
import { Mail, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setLoading(true);
    try {
      await db.subscribeNewsletter(email);
      setSubscribed(true);
      showToast('Thank you for subscribing to MJR Inspirations.');
    } catch (err) {
      showToast('Subscription error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-charcoal text-ivory border-t border-charcoal-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center space-x-2 text-champagne-gold">
          <Sparkles size={14} />
          <span className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold">
            The MJR Journal
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-white">
          A TOUCH OF BRILLIANCE
        </h2>

        <p className="text-xs sm:text-sm text-ivory-200 font-sans max-w-lg mx-auto leading-relaxed">
          Be the first to discover new collections, exclusive designs and timeless inspirations delivered directly to your private inbox.
        </p>

        {subscribed ? (
          <div className="p-4 bg-charcoal-light/60 border border-champagne-gold/40 text-xs text-champagne-light inline-flex items-center space-x-2">
            <Check size={16} className="text-champagne-gold" />
            <span>You have been added to our private connoisseur guestlist.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mutedGrey" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-charcoal-dark border border-charcoal-light pl-10 pr-4 py-3.5 text-xs text-white placeholder:text-mutedGrey focus:outline-none focus:border-champagne-gold"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-6 py-3.5 bg-champagne-gold text-charcoal font-sans text-xs uppercase tracking-[0.2em] font-medium hover:bg-white transition-colors flex-shrink-0 flex items-center justify-center space-x-1"
            >
              <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
              <ArrowRight size={13} />
            </button>
          </form>
        )}

        <p className="text-[10px] text-mutedGrey">
          We honor your privacy. Unsubscribe at any time with a single click.
        </p>

      </div>
    </section>
  );
}
