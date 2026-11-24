import React, { useState } from 'react';
import { EDUCATION_4CS } from '../lib/initialData';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function EducationPage({ onExploreCatalogue, onBookViewing }) {
  const [selectedTopic, setSelectedTopic] = useState('cut');

  const currentTopic = EDUCATION_4CS.find(c => c.id === selectedTopic) || EDUCATION_4CS[0];

  return (
    <div className="bg-ivory min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block">
            Gemological Connoisseurship
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal font-light tracking-wide">
            UNDERSTANDING THE 4Cs OF DIAMONDS
          </h1>
          <p className="text-xs sm:text-sm text-mutedGrey font-sans leading-relaxed">
            The universal standard created by the GIA (Gemological Institute of America) to evaluate diamond quality: Cut, Colour, Clarity, and Carat Weight.
          </p>
        </div>

        {/* 4C Selector Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-white border border-champagne/50 shadow-sm">
            {EDUCATION_4CS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedTopic(c.id)}
                className={`px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-sans transition-all ${
                  selectedTopic === c.id
                    ? 'bg-charcoal text-white font-medium shadow-sm'
                    : 'text-charcoal hover:text-champagne-gold'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active 4C Interactive Showcase */}
        <div className="bg-white border border-champagne/40 shadow-luxury overflow-hidden p-8 sm:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Deep Analysis */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-champagne-gold font-semibold">
                  Standard {currentTopic.metric}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">
                  {currentTopic.title} — {currentTopic.subtitle}
                </h2>
                <div className="inline-block px-3 py-1 bg-champagne-subtle text-charcoal text-xs uppercase tracking-wider font-medium mt-3 border border-champagne/40">
                  MJR Selection Standard: {currentTopic.gradeRange}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-charcoal-light leading-relaxed font-sans">
                {currentTopic.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-champagne/30">
                <span className="text-xs uppercase tracking-widest text-charcoal font-semibold block">
                  Why It Matters at MJR:
                </span>
                {currentTopic.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-charcoal">
                    <CheckCircle2 size={16} className="text-champagne-gold flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual Diagram Card */}
            <div className="lg:col-span-5 bg-ivory p-8 border border-champagne/40 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-white border border-champagne-gold/40 flex items-center justify-center text-champagne-gold shadow-sm">
                <Sparkles size={32} />
              </div>

              <h4 className="font-serif text-xl text-charcoal">
                The MJR Difference
              </h4>

              <p className="text-xs text-mutedGrey leading-relaxed">
                While commercial retail jewellers frequently compromise on cut proportions to maximize rough diamond yield, MJR rejects stones that do not attain absolute triple-excellent symmetry.
              </p>

              <div className="pt-4 border-t border-champagne/30 text-left text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-champagne/20">
                  <span className="text-mutedGrey">Certification:</span>
                  <span className="font-medium text-charcoal">GIA / IGI Laser Inscribed</span>
                </div>
                <div className="flex justify-between py-1 border-b border-champagne/20">
                  <span className="text-mutedGrey">Colour Minimum:</span>
                  <span className="font-medium text-charcoal">F or Higher</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-mutedGrey">Eye Clean Guarantee:</span>
                  <span className="font-medium text-charcoal">100% Guaranteed</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CTAs */}
        <div className="text-center space-y-4 pt-6">
          <h3 className="font-serif text-2xl text-charcoal">
            Ready to find your perfect diamond?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onExploreCatalogue}
              className="px-8 py-3.5 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-champagne-gold transition-colors flex items-center space-x-2"
            >
              <span>BROWSE CERTIFIED DIAMONDS</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={onBookViewing}
              className="px-8 py-3.5 border border-charcoal text-charcoal text-xs uppercase tracking-[0.2em] font-medium hover:bg-charcoal hover:text-white transition-colors"
            >
              SCHEDULE A GEMOLOGIST SESSION
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
