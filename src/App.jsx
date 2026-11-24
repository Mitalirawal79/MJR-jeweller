import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider, useStore } from './context/StoreContext';

// Common Components
import AnnouncementBar from './components/common/AnnouncementBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Toast from './components/common/Toast';
import CartDrawer from './components/cart/CartDrawer';
import QuickViewModal from './components/common/QuickViewModal';
import SearchModal from './components/common/SearchModal';
import BookingModal from './components/showroom/BookingModal';

// Pages
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ShowroomsPage from './pages/ShowroomsPage';
import OurStoryPage from './pages/OurStoryPage';
import EducationPage from './pages/EducationPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import AccountPage from './pages/AccountPage';
import AdminDashboard from './pages/AdminDashboard';

function MainLayout() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  const { setBookingModalOpen, setSelectedShowroomForBooking, setIsCartOpen } = useStore();

  const handleNavigate = (route, category = null) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentRoute('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookShowroom = (showroom = null) => {
    setSelectedShowroomForBooking(showroom);
    setBookingModalOpen(true);
  };

  const handleOrderSuccess = (order) => {
    setLastOrder(order);
    setCurrentRoute('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-ivory text-charcoal font-sans selection:bg-champagne-gold selection:text-white">
      
      {/* Top Fixed Area */}
      <div>
        <AnnouncementBar onOpenShowroom={() => handleBookShowroom()} />
        <Navbar 
          currentRoute={currentRoute} 
          setCurrentRoute={setCurrentRoute}
          onSelectCategory={(cat) => handleNavigate('catalogue', cat)}
        />
      </div>

      {/* Main Dynamic View */}
      <main className="flex-grow">
        {currentRoute === 'home' && (
          <HomePage 
            onExploreCollections={() => handleNavigate('catalogue')}
            onSelectCategory={(cat) => handleNavigate('catalogue', cat)}
            onSelectProduct={handleSelectProduct}
            onOurStory={() => handleNavigate('story')}
            onShowrooms={() => handleNavigate('showrooms')}
            onBookShowroom={handleBookShowroom}
            onEducation={() => handleNavigate('education')}
          />
        )}

        {currentRoute === 'catalogue' && (
          <CataloguePage 
            initialCategory={selectedCategory}
            onSelectProduct={handleSelectProduct}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'product' && (
          <ProductDetailsPage 
            productId={selectedProductId}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateCatalogue={() => handleNavigate('catalogue')}
            onProceedToCheckout={() => handleNavigate('checkout')}
          />
        )}

        {currentRoute === 'showrooms' && (
          <ShowroomsPage 
            onBookSpecificShowroom={handleBookShowroom}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentRoute === 'story' && (
          <OurStoryPage 
            onExploreCollections={() => handleNavigate('catalogue')}
            onBookViewing={() => handleBookShowroom()}
          />
        )}

        {currentRoute === 'education' && (
          <EducationPage 
            onExploreCatalogue={() => handleNavigate('catalogue')}
            onBookViewing={() => handleBookShowroom()}
          />
        )}

        {currentRoute === 'wishlist' && (
          <WishlistPage 
            onSelectProduct={handleSelectProduct}
            onExploreCollections={() => handleNavigate('catalogue')}
          />
        )}

        {currentRoute === 'checkout' && (
          <CheckoutPage 
            onOrderSuccess={handleOrderSuccess}
            onBackToCart={() => setIsCartOpen(true)}
            onNavigateLogin={() => handleNavigate('account')}
          />
        )}

        {currentRoute === 'order-confirmation' && (
          <OrderConfirmationPage 
            order={lastOrder}
            onContinueShopping={() => handleNavigate('catalogue')}
          />
        )}

        {currentRoute === 'account' && (
          <AccountPage 
            onNavigateCatalogue={() => handleNavigate('catalogue')}
            onNavigateWishlist={() => handleNavigate('wishlist')}
          />
        )}

        {currentRoute === 'admin' && (
          <AdminDashboard 
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Global Modals & Notifications */}
      <CartDrawer 
        onProceedToCheckout={() => handleNavigate('checkout')}
        onContinueShopping={() => handleNavigate('catalogue')}
      />

      <QuickViewModal 
        onNavigateToProduct={handleSelectProduct}
      />

      <SearchModal 
        onSelectProduct={handleSelectProduct}
        onSelectCategory={(cat) => handleNavigate('catalogue', cat)}
      />

      <BookingModal />
      <Toast />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <MainLayout />
      </StoreProvider>
    </AuthProvider>
  );
}
