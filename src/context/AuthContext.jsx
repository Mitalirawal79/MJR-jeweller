import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mjr_auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const u = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
            role: session.user.email.includes('admin') ? 'admin' : 'customer'
          };
          setUser(u);
          localStorage.setItem('mjr_auth_user', JSON.stringify(u));
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const u = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
            role: session.user.email.includes('admin') ? 'admin' : 'customer'
          };
          setUser(u);
          localStorage.setItem('mjr_auth_user', JSON.stringify(u));
        } else {
          // If no session from supabase, check if we had a local demo user
          // Keep local user if user signed in with demo account
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  // Demo / Standard Login
  const login = async (email, password) => {
    // If Supabase is connected
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const u = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name || data.user.email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'customer'
      };
      setUser(u);
      localStorage.setItem('mjr_auth_user', JSON.stringify(u));
      return u;
    }

    // Seamless Local Demo Authentication
    // Admin check
    if (email.toLowerCase().includes('admin')) {
      const adminUser = {
        id: 'usr_admin_001',
        name: 'Mitali Rawal (Head Curator)',
        email: email,
        role: 'admin',
        title: 'Executive Jewellery Director'
      };
      setUser(adminUser);
      localStorage.setItem('mjr_auth_user', JSON.stringify(adminUser));
      return adminUser;
    }

    // Customer check
    const customerUser = {
      id: 'usr_cust_101',
      name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
      email: email,
      role: 'customer',
      phone: '+91 98200 12345',
      address: 'Penthouse 12B, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018'
    };
    setUser(customerUser);
    localStorage.setItem('mjr_auth_user', JSON.stringify(customerUser));
    return customerUser;
  };

  const signup = async (name, email, password, phone = '') => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name, phone }
        }
      });
      if (error) throw error;
      const u = {
        id: data.user?.id || 'usr_' + Date.now(),
        email: email,
        name: name,
        phone: phone,
        role: email.includes('admin') ? 'admin' : 'customer'
      };
      setUser(u);
      localStorage.setItem('mjr_auth_user', JSON.stringify(u));
      return u;
    }

    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      phone,
      role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001'
    };
    setUser(newUser);
    localStorage.setItem('mjr_auth_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('mjr_auth_user');
  };

  const updateUserProfile = (updatedFields) => {
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    localStorage.setItem('mjr_auth_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: user?.role === 'admin',
      isCustomer: user?.role === 'customer',
      login,
      signup,
      logout,
      updateUserProfile,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
