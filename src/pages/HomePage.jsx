import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import SignatureSection from '../components/home/SignatureSection';
import DiamondEducation from '../components/home/DiamondEducation';
import BrandStorySection from '../components/home/BrandStorySection';
import EngagementSection from '../components/home/EngagementSection';
import ShowroomBanner from '../components/home/ShowroomBanner';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSection from '../components/home/NewsletterSection';

export default function HomePage({ 
  onExploreCollections, 
  onSelectCategory, 
  onSelectProduct, 
  onOurStory, 
  onShowrooms,
  onBookShowroom,
  onEducation 
}) {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection 
        onExplore={onExploreCollections} 
        onOurStory={onOurStory} 
      />

      {/* 2. Shop by Category */}
      <CategorySection 
        onSelectCategory={onSelectCategory} 
      />

      {/* 3. The MJR Signature Collection */}
      <SignatureSection 
        onSelectProduct={onSelectProduct} 
        onExploreAll={onExploreCollections} 
      />

      {/* 4. Understanding the 4Cs of Diamonds */}
      <DiamondEducation 
        onExploreEducation={onEducation} 
      />

      {/* 5. Brand Story */}
      <BrandStorySection 
        onReadMore={onOurStory} 
      />

      {/* 6. Forever Begins With A Diamond (Engagement Campaign) */}
      <EngagementSection 
        onExploreEngagement={() => onSelectCategory('rings')} 
      />

      {/* 7. Physical Showroom Experience */}
      <ShowroomBanner 
        onBookViewing={onBookShowroom} 
        onExploreShowrooms={onShowrooms} 
      />

      {/* 8. Patron Testimonials */}
      <TestimonialsSection />

      {/* 9. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
