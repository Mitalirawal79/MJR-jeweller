// Utility helpers for MJR Luxury Diamonds

/**
 * Format a number as Indian Rupee (₹)
 * Example: 245000 -> ₹2,45,000
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generates a clean luxury order reference
 * Example: MJR-2026-8842
 */
export function generateOrderNumber() {
  const random = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `MJR-${year}-${random}`;
}

/**
 * Format date in elegant luxury format
 * Example: 24 November 2026
 */
export function formatLuxuryDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Indian Pincode Delivery Estimator
 * Realistic delivery window calculation for fine jewellery
 */
export function estimatePincodeDelivery(pincode) {
  if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
    return { valid: false, message: 'Please enter a valid 6-digit Indian pincode' };
  }

  const prefix = pincode.substring(0, 2);
  const metroPrefixes = ['11', '40', '56', '50', '60', '70']; // Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata

  const isMetro = metroPrefixes.includes(prefix);
  const days = isMetro ? '2 - 3 Business Days' : '4 - 5 Business Days';
  const expressAvailable = isMetro;

  return {
    valid: true,
    isMetro,
    estimate: days,
    expressAvailable,
    insured: true,
    message: `Complimentary White-Glove Insured Delivery by ${days}.`
  };
}

/**
 * Calculate Cart Breakdown with 3% Jewellery GST
 */
export function calculateCartTotals(items = [], couponDiscount = 0) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * couponDiscount) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  
  // Standard Indian GST for Fine Gold & Diamond Jewellery is 3%
  const gst = Math.round(taxableAmount * 0.03);
  const shipping = 0; // MJR offers 100% complimentary insured shipping on all orders
  const grandTotal = taxableAmount + gst + shipping;

  return {
    subtotal,
    discountAmount,
    taxableAmount,
    gst,
    shipping,
    grandTotal
  };
}
