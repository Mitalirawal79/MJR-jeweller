import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, initLocalDatabase } from '../lib/supabase';
import { INITIAL_PRODUCTS, SHOWROOM_LOCATIONS, TESTIMONIALS } from '../lib/initialData';
import { calculateCartTotals } from '../lib/utils';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Initialize local DB on first render
  useEffect(() => {
    initLocalDatabase();
  }, []);

  // Products
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('mjr_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('mjr_wishlist');
    return saved ? JSON.parse(saved) : ['mjr-prod-1', 'mjr-prod-3'];
  });

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Showroom Booking Modal
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedShowroomForBooking, setSelectedShowroomForBooking] = useState(null);

  // Orders
  const [orders, setOrders] = useState([]);

  // Showroom Appointments
  const [appointments, setAppointments] = useState([]);

  // CMS Settings (Announcement Bar, etc.)
  const [settings, setSettings] = useState({
    announcementBar: 'COMPLIMENTARY GIFT PACKAGING | EXQUISITE DIAMOND COLLECTIONS | COMPLIMENTARY INSURED PAN-INDIA DELIVERY',
    heroHeading: 'WHERE BRILLIANCE MEETS ELEGANCE',
    heroSubtitle: 'Discover extraordinary diamond creations designed to celebrate life’s most beautiful moments.',
    contactPhone: '+91 (022) 8800 2400',
    contactEmail: 'concierge@mjrjewels.com'
  });

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Load initial remote/local data
  useEffect(() => {
    async function loadData() {
      try {
        const [prods, ords, apts, sett] = await Promise.all([
          db.getProducts(),
          db.getOrders(),
          db.getAppointments(),
          db.getSettings()
        ]);
        if (prods && prods.length > 0) setProducts(prods);
        if (ords) setOrders(ords);
        if (apts) setAppointments(apts);
        if (sett) setSettings(sett);
      } catch (err) {
        console.error('Error loading initial data:', err);
      } finally {
        setLoadingProducts(false);
      }
    }
    loadData();
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('mjr_cart', JSON.stringify(cart));
  }, [cart]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    localStorage.setItem('mjr_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart operations
  const addToCart = (product, quantity = 1, selectedSize = null, selectedMetal = null) => {
    const sizeToUse = selectedSize || (product.availableSizes ? product.availableSizes[0] : 'Standard');
    const metalToUse = selectedMetal || product.metal || '18K White Gold';

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.selectedSize === sizeToUse && item.selectedMetal === metalToUse
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          ...product,
          quantity,
          selectedSize: sizeToUse,
          selectedMetal: metalToUse,
          cartItemId: `${product.id}_${sizeToUse}_${metalToUse}_${Date.now()}`
        }
      ];
    });

    showToast(`Added ${product.name} to shopping bag.`);
  };

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Item removed from shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from your Wishlist.' : 'Saved to your Wishlist.', exists ? 'info' : 'success');
      return updated;
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Cart totals
  const cartTotals = calculateCartTotals(cart);

  // Admin Product Operations
  const saveProduct = async (productData) => {
    const updatedList = await db.saveProduct(productData);
    setProducts(updatedList);
    showToast('Product updated successfully.');
    return updatedList;
  };

  const deleteProduct = async (productId) => {
    const updatedList = await db.deleteProduct(productId);
    setProducts(updatedList);
    showToast('Product removed.', 'info');
    return updatedList;
  };

  // Orders
  const placeOrder = async (orderData) => {
    const created = await db.createOrder(orderData);
    setOrders(prev => [created, ...prev]);
    clearCart();
    return created;
  };

  const updateOrderStatus = async (orderId, status) => {
    const updated = await db.updateOrderStatus(orderId, status);
    setOrders(updated);
    showToast(`Order status updated to ${status}.`);
  };

  // Appointments
  const bookAppointment = async (appointmentData) => {
    const aptWithId = {
      ...appointmentData,
      id: 'apt_' + Date.now(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    const saved = await db.createAppointment(aptWithId);
    setAppointments(prev => [saved, ...prev]);
    showToast('Your private viewing appointment has been requested. Our concierge will contact you shortly.');
    return saved;
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    const updated = await db.updateAppointmentStatus(appointmentId, status);
    setAppointments(updated);
    showToast(`Appointment status updated to ${status}.`);
  };

  // Update Settings
  const updateSettings = async (newSettings) => {
    const updated = await db.saveSettings(newSettings);
    setSettings(updated);
    showToast('Store settings updated.');
  };

  return (
    <StoreContext.Provider value={{
      // Data
      products,
      loadingProducts,
      cart,
      wishlist,
      orders,
      appointments,
      settings,
      cartTotals,
      toast,

      // Modals & UI State
      isCartOpen,
      setIsCartOpen,
      isSearchOpen,
      setIsSearchOpen,
      searchQuery,
      setSearchQuery,
      quickViewProduct,
      setQuickViewProduct,
      bookingModalOpen,
      setBookingModalOpen,
      selectedShowroomForBooking,
      setSelectedShowroomForBooking,

      // Actions
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      isInWishlist,
      showToast,
      saveProduct,
      deleteProduct,
      placeOrder,
      updateOrderStatus,
      bookAppointment,
      updateAppointmentStatus,
      updateSettings,
      showrooms: SHOWROOM_LOCATIONS,
      testimonials: TESTIMONIALS
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
