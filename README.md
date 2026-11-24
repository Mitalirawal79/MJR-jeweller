# MJR | The Art of Brilliance — Fine Diamond Jewellery

A luxury diamond jewellery e-commerce and physical showroom web application built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**.

Inspired by global high-jewellery maisons (Cartier, Tiffany & Co., Boucheron, Messika), MJR combines contemporary minimalist elegance with a sophisticated Indian fine diamond jewellery shopping experience.

---

## ✨ Features Implemented

### 1. Brand Identity & Minimalist Luxury Design
- **Brand**: MJR
- **Tagline**: *"THE ART OF BRILLIANCE"*
- **Secondary Tagline**: *"ELEGANCE IN EVERY DETAIL. BRILLIANCE IN EVERY MOMENT."*
- Custom monogram SVG emblem with geometric facet lines and subtle hover dynamics.
- Sophisticated color palette:
  - **Warm Ivory**: `#F7F5F0`
  - **Soft Champagne**: `#E8DFD2`
  - **Champagne Gold**: `#B99B70`
  - **Charcoal**: `#292929`
  - **Deep Charcoal Footer**: `#121212`
  - **Muted Grey**: `#85817A`
  - **Pure White**: `#FFFFFF`
- Refined typography hierarchy:
  - Main Headings: `Cormorant Garamond`
  - Editorial Titles: `Playfair Display`
  - Body & Navigation: `Inter`

### 2. Header, Announcement Bar & Navigation
- **Announcement Bar**: Displays perks, shipping notices, and opens the showroom booking modal. Fully editable via the Admin Dashboard.
- **Sticky Navigation**:
  - Left: MJR Logo with emblem.
  - Center: Home, Collections (with rich Mega Menu dropdown), Rings, Necklaces, Earrings, Bracelets, Our Story, Store.
  - Right: Interactive Search Modal, Account Portal (with Admin indicator), Wishlist counter badge, Shopping Bag drawer counter badge.
  - Responsive mobile drawer menu with smooth transition animations.

### 3. Editorial Hero & Home Sections
- **Hero Section**: Full-screen editorial visual with high-resolution close-up diamond photography, natural skin texture, soft daylight, refined typography, and CTAs (*"EXPLORE COLLECTION"*, *"DISCOVER OUR STORY"*).
- **Shop By Category**: 5 image categories (*Diamond Rings, Diamond Necklaces, Diamond Earrings, Diamond Bracelets, Solitaire Collection*) with subtle hover zoom.
- **Signature Collection**: 4-column desktop grid featuring demo creations with carats, 4Cs, metal alloys, pricing in ₹ INR, Quick View modal trigger, Wishlist toggle, and Add to Bag.
- **The 4Cs of Diamonds**: Interactive educational cards covering Cut, Colour, Clarity, and Carat weight.
- **Brand Story**: Split editorial layout highlighting craftsmanship, GIA/IGI certification, and conflict-free diamond guarantee.
- **Engagement Suite**: *"Forever Begins With A Diamond"* bridal showcase.
- **Physical Showroom Experience**: Showcases Mumbai Flagship Atelier, New Delhi Salon, and Bengaluru Boutique with booking triggers.
- **Customer Testimonials**: *"Words That Shine"* minimal editorial feedback cards with 5-star ratings and verified status.
- **Newsletter**: *"A Touch of Brilliance"* email subscription with toast confirmation.

### 4. Diamond Collection Catalogue & Filter System
- Dedicated catalogue page (`/catalogue`) with active category tabs.
- Multi-dimensional filters:
  - Price Range (₹)
  - Diamond Shape (Round Brilliant, Emerald, Oval, Cushion, Princess, Marquise)
  - Metal Type (18K White Gold, 18K Yellow Gold, 18K Rose Gold, Platinum 950)
  - Cut Grade (Ideal, Excellent, Very Good)
  - Occasion (Bridal, Engagement, Everyday Luxury, Evening, Anniversary)
- Sorting: Most Coveted (Popularity), Newest, Price: Low to High, Price: High to Low.
- Responsive sticky filter sidebar on desktop and slide-over filter drawer on mobile.

### 5. Product Details Experience
- Multi-angle high-resolution image gallery with hover zoom magnification.
- Complete 4Cs specification matrix (Carat, Shape, Cut, Colour, Clarity, GIA/IGI Certificate).
- Precious metal selector and ring size picker with size guide helper.
- Indian 6-digit Pincode delivery estimator with instant calculation.
- Tabbed accordions for Diamond Certification, Delivery & Suede Packaging, and Lifetime Care & Polish.
- Actions: Add to Bag, Buy Now (instant checkout), Wishlist, and Book Showroom Viewing.

### 6. Shopping Bag & Checkout Flow
- Slide-out Cart Drawer with live item quantities (+/-), removal, 3% jewellery GST calculation, and complimentary insured shipping badge.
- Multi-step checkout with recipient address and payment method selection:
  - **Razorpay UPI** (Google Pay / PhonePe / Paytm / BHIM)
  - **Credit / Debit Cards** (Visa, Mastercard, Amex 3D Secure)
  - **Net Banking** (HDFC, ICICI, SBI, Axis)
- **Razorpay Test Mode Simulation Modal**: Realistic popup dialog with instant authorization and confetti celebration upon success.
- Order Confirmation screen with unique reference (e.g. `MJR-2026-9041`), insured tracking number, printable tax invoice, and summary.

### 7. Private Showroom Booking Experience
- Showroom booking modal accessible from navbar, product page, showroom cards, and footer.
- Captures Full Name, Phone, Email, Preferred Date, Time slot, Showroom location, Jewellery Category, Occasion, and Notes.
- Saves directly to state and database, with instant confirmation and review tools in the Admin Dashboard.

### 8. Client Account & Admin Portal
- **Customer Account**: Profile management, saved shipping addresses, order tracking history, booked appointment statuses, and wishlist access.
- **Admin Dashboard (`/admin`)**:
  - **Overview Metrics**: Total Products, Total Orders, Total Revenue (₹), Pending Orders, and Showroom Appointments.
  - **Product Management**: Add new diamond creations with specs and image URL, edit pricing, update stock, or remove items.
  - **Order Management**: View customer orders, payment details, and update dispatch status (*Confirmed -> Dispatched -> Delivered*).
  - **Appointment Management**: View bookings, Confirm, Reschedule, or Cancel salon viewings.
  - **CMS & Website Settings**: Update announcement bar text and view/copy PostgreSQL Supabase SQL Schema.

### 9. Demo Credentials
For easy testing, the portal includes pre-configured demo logins:
- **Admin Portal**: Click *"Admin Demo"* on the sign-in page, or log in with `admin@mjrjewels.com` / `admin123`.
- **Client Account**: Click *"Client Demo"* on the sign-in page, or log in with `priyanka@example.com` / `customer123`.

### 10. Supabase & Database Architecture
- Built with `@supabase/supabase-js`.
- Includes a zero-setup persistent fallback adapter that synchronizes with `localStorage` out of the box.
- To connect a real Supabase project:
  1. Add your credentials to `.env`:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
  2. Copy the SQL schema from the Admin Dashboard or `src/lib/supabase.js` and run it in the Supabase SQL Editor.

---

## 🚀 Running the Project

The development server is running at:
```bash
http://localhost:3000
```

To build for production:
```bash
npm run build
```
