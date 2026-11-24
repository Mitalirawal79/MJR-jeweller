import { createClient } from '@supabase/supabase-js';
import { INITIAL_PRODUCTS, SHOWROOM_LOCATIONS, TESTIMONIALS } from './initialData';

// Supabase environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// True if real credentials have been provided
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' &&
  !supabaseUrl.includes('your-project')
);

// Initialize Supabase Client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Local Storage Persistence keys for seamless offline / zero-setup demo mode
 */
const STORAGE_KEYS = {
  PRODUCTS: 'mjr_products_db_v1',
  ORDERS: 'mjr_orders_db_v1',
  APPOINTMENTS: 'mjr_appointments_db_v1',
  NEWSLETTER: 'mjr_newsletter_db_v1',
  SETTINGS: 'mjr_settings_db_v1',
  USERS: 'mjr_users_db_v1',
  REVIEWS: 'mjr_reviews_db_v1'
};

// Seed initial state into localStorage if not already present
export function initLocalDatabase() {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
      announcementBar: 'COMPLIMENTARY GIFT PACKAGING | EXQUISITE DIAMOND COLLECTIONS | COMPLIMENTARY INSURED PAN-INDIA DELIVERY',
      freeShippingThreshold: 0,
      heroHeading: 'WHERE BRILLIANCE MEETS ELEGANCE',
      heroSubtitle: 'Discover extraordinary diamond creations designed to celebrate life’s most beautiful moments.',
      contactPhone: '+91 (022) 8800 2400',
      contactEmail: 'concierge@mjrjewels.com'
    }));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
    // Seed sample orders for admin dashboard showcase
    const sampleOrders = [
      {
        id: 'MJR-2026-9041',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        customer: {
          name: 'Priyanka Chopra',
          email: 'priyanka@example.com',
          phone: '+91 98201 99882',
          address: 'Villa 14, Juhu Tara Road',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400049'
        },
        items: [
          {
            id: 'mjr-prod-1',
            name: 'Aethel Solitaire Diamond Ring',
            price: 345000,
            quantity: 1,
            metal: '18K White Gold',
            size: '14',
            carat: '1.50 ct',
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'
          }
        ],
        subtotal: 345000,
        gst: 10350,
        shipping: 0,
        grandTotal: 355350,
        paymentMethod: 'Razorpay UPI (Verified)',
        paymentStatus: 'Paid',
        orderStatus: 'Dispatched',
        trackingNumber: 'MJR-DELHIVERY-774921'
      },
      {
        id: 'MJR-2026-8819',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        customer: {
          name: 'Rohan Kapoor',
          email: 'rohan.kapoor@example.com',
          phone: '+91 98102 33441',
          address: '42, Golf Links',
          city: 'New Delhi',
          state: 'Delhi',
          pincode: '110003'
        },
        items: [
          {
            id: 'mjr-prod-3',
            name: 'Riviera Diamond Tennis Bracelet',
            price: 520000,
            quantity: 1,
            metal: 'Platinum 950',
            size: '7.0 inch',
            carat: '4.20 ct TW',
            image: 'https://images.unsplash.com/photo-1611591475837-1249e0c7ba53?q=80&w=1000&auto=format&fit=crop'
          }
        ],
        subtotal: 520000,
        gst: 15600,
        shipping: 0,
        grandTotal: 535600,
        paymentMethod: 'Credit Card (Axis Magnus)',
        paymentStatus: 'Paid',
        orderStatus: 'Delivered',
        trackingNumber: 'MJR-BLUEDART-889104'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(sampleOrders));
  }

  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    // Seed sample showroom appointments
    const sampleAppointments = [
      {
        id: 'apt-101',
        name: 'Kavita Subramanian',
        email: 'kavita.sub@example.com',
        phone: '+91 99002 44331',
        showroom: 'Mumbai Flagship Atelier',
        date: '2026-11-28',
        time: '3:00 PM',
        category: 'Engagement Rings',
        occasion: 'Engagement Ceremony',
        notes: 'Interested in comparing 1.50ct vs 2.0ct oval cut diamonds in platinum.',
        status: 'Confirmed',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'apt-102',
        name: 'Arjun Singhania',
        email: 'arjun.s@example.com',
        phone: '+91 98711 00293',
        showroom: 'New Delhi Salon',
        date: '2026-11-30',
        time: '5:30 PM',
        category: 'Bridal Jewellery',
        occasion: 'Wedding',
        notes: 'Looking for matching diamond choker and tennis bracelet.',
        status: 'Pending',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(sampleAppointments));
  }

  if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(TESTIMONIALS));
  }
}

/**
 * Universal Database Adapter (works with Supabase when configured, or LocalStorage fallback)
 */
export const db = {
  // PRODUCTS
  async getProducts() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) return data;
      } catch (e) {
        console.warn('Supabase product fetch failed, falling back to local DB:', e);
      }
    }
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return raw ? JSON.parse(raw) : INITIAL_PRODUCTS;
  },

  async saveProduct(product) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('products').upsert(product);
      } catch (e) {
        console.warn('Supabase saveProduct error:', e);
      }
    }
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    let updated;
    if (index >= 0) {
      updated = [...products];
      updated[index] = product;
    } else {
      updated = [product, ...products];
    }
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    return updated;
  },

  async deleteProduct(productId) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('products').delete().eq('id', productId);
      } catch (e) {
        console.warn('Supabase deleteProduct error:', e);
      }
    }
    const products = await this.getProducts();
    const updated = products.filter(p => p.id !== productId);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    return updated;
  },

  // ORDERS
  async getOrders() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase order fetch fallback:', e);
      }
    }
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return raw ? JSON.parse(raw) : [];
  },

  async createOrder(orderData) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('orders').insert([orderData]).select().single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase createOrder fallback:', e);
      }
    }
    const orders = await this.getOrders();
    const updated = [orderData, ...orders];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    return orderData;
  },

  async updateOrderStatus(orderId, status) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('orders').update({ orderStatus: status }).eq('id', orderId);
      } catch (e) {
        console.warn('Supabase updateOrderStatus fallback:', e);
      }
    }
    const orders = await this.getOrders();
    const updated = orders.map(o => o.id === orderId ? { ...o, orderStatus: status } : o);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    return updated;
  },

  // APPOINTMENTS
  async getAppointments() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase appointment fetch fallback:', e);
      }
    }
    const raw = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return raw ? JSON.parse(raw) : [];
  },

  async createAppointment(appointment) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('appointments').insert([appointment]).select().single();
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase createAppointment fallback:', e);
      }
    }
    const appointments = await this.getAppointments();
    const updated = [appointment, ...appointments];
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    return appointment;
  },

  async updateAppointmentStatus(appointmentId, status) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('appointments').update({ status }).eq('id', appointmentId);
      } catch (e) {
        console.warn('Supabase updateAppointmentStatus fallback:', e);
      }
    }
    const appointments = await this.getAppointments();
    const updated = appointments.map(a => a.id === appointmentId ? { ...a, status } : a);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(updated));
    return updated;
  },

  // SETTINGS / CMS
  async getSettings() {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : {
      announcementBar: 'COMPLIMENTARY GIFT PACKAGING | EXQUISITE DIAMOND COLLECTIONS | COMPLIMENTARY INSURED PAN-INDIA DELIVERY',
      heroHeading: 'WHERE BRILLIANCE MEETS ELEGANCE',
      heroSubtitle: 'Discover extraordinary diamond creations designed to celebrate life’s most beautiful moments.',
      contactPhone: '+91 (022) 8800 2400',
      contactEmail: 'concierge@mjrjewels.com'
    };
  },

  async saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return settings;
  },

  // NEWSLETTER
  async subscribeNewsletter(email) {
    const raw = localStorage.getItem(STORAGE_KEYS.NEWSLETTER);
    const list = raw ? JSON.parse(raw) : [];
    if (!list.includes(email)) {
      list.push(email);
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(list));
    }
    return { success: true };
  }
};

/**
 * SQL Schema for easy one-click setup in Supabase SQL editor
 */
export const SUPABASE_SCHEMA_SQL = `
-- MJR Fine Diamond Jewellery - Supabase SQL Schema
-- Run this in your Supabase SQL Editor if you want to use cloud PostgreSQL storage

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT,
  price NUMERIC NOT NULL,
  carat TEXT NOT NULL,
  metal TEXT NOT NULL,
  cut TEXT NOT NULL,
  color TEXT NOT NULL,
  clarity TEXT NOT NULL,
  shape TEXT NOT NULL,
  certificate TEXT DEFAULT 'GIA Certified',
  badge TEXT,
  is_new BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  is_signature BOOLEAN DEFAULT false,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  description TEXT,
  image TEXT NOT NULL,
  gallery JSONB,
  available_sizes JSONB,
  metal_options JSONB,
  stock INTEGER DEFAULT 5,
  occasion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  customer JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  gst NUMERIC NOT NULL,
  shipping NUMERIC DEFAULT 0,
  grand_total NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'Paid',
  order_status TEXT DEFAULT 'Confirmed',
  tracking_number TEXT
);

CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  showroom TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  category TEXT,
  occasion TEXT,
  notes TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Public products are viewable by everyone" ON products FOR SELECT USING (true);

-- Allow public to create orders and appointments
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can book appointments" ON appointments FOR INSERT WITH CHECK (true);
`;
