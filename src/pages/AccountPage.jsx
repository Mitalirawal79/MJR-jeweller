import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { formatPrice, formatLuxuryDate } from '../lib/utils';
import { 
  User, 
  Package, 
  Calendar, 
  Heart, 
  LogOut, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Clock, 
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export default function AccountPage({ onNavigateCatalogue, onNavigateWishlist }) {
  const { user, login, signup, logout, updateUserProfile, isAdmin } = useAuth();
  const { orders, appointments, showToast } = useStore();

  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'appointments', 'profile'
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPhone, setSignupPhone] = useState('');

  // Profile edit form state
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editAddress, setEditAddress] = useState(user?.address || '');
  const [editCity, setEditCity] = useState(user?.city || '');
  const [editPincode, setEditPincode] = useState(user?.pincode || '');

  // Filter orders for logged-in user or show sample demo orders
  const userOrders = orders.filter(o => 
    !user || o.customer?.email?.toLowerCase() === user.email?.toLowerCase() || user.role === 'admin'
  );

  // Filter appointments
  const userAppointments = appointments.filter(a =>
    !user || a.email?.toLowerCase() === user.email?.toLowerCase() || user.role === 'admin'
  );

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginEmail, loginPassword);
      showToast('Welcome to your MJR client portal.');
    } catch (err) {
      showToast(err.message || 'Login failed', 'error');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(signupName, signupEmail, signupPassword, signupPhone);
      showToast('Welcome to MJR. Your client dossier has been initiated.');
    } catch (err) {
      showToast(err.message || 'Signup failed', 'error');
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      phone: editPhone,
      address: editAddress,
      city: editCity,
      pincode: editPincode
    });
    showToast('Client profile updated successfully.');
  };

  const fillDemoAccount = (role) => {
    if (role === 'admin') {
      setLoginEmail('admin@mjrjewels.com');
      setLoginPassword('admin123');
    } else {
      setLoginEmail('priyanka@example.com');
      setLoginPassword('customer123');
    }
  };

  // If NOT logged in, show Auth Screen
  if (!user) {
    return (
      <div className="bg-ivory min-h-screen py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-white p-8 border border-champagne/40 shadow-luxury space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <span className="text-[10px] font-sans uppercase tracking-[0.28em] text-champagne-gold font-semibold block">
                Privileged Access
              </span>
              <h1 className="font-serif text-3xl text-charcoal">
                {authMode === 'login' ? 'Client Sign In' : 'Create MJR Account'}
              </h1>
              <p className="text-xs text-mutedGrey">
                Access your orders, saved diamonds, and private salon appointments.
              </p>
            </div>

            {/* Quick Demo Login Helpers */}
            <div className="p-3 bg-champagne-subtle border border-champagne/40 space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-mutedGrey font-medium block">
                Quick Demo One-Click Fill:
              </span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => fillDemoAccount('customer')}
                  className="flex-1 py-1.5 bg-white border border-champagne/60 text-[11px] text-charcoal hover:border-charcoal transition-colors font-medium"
                >
                  Client Demo
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoAccount('admin')}
                  className="flex-1 py-1.5 bg-charcoal text-white text-[11px] hover:bg-champagne-gold transition-colors font-medium font-mono"
                >
                  Admin Demo
                </button>
              </div>
            </div>

            {/* Form */}
            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    Password
                  </label>
                  <input 
                    type="password" 
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-champagne-gold transition-colors"
                >
                  Sign In to Dossier
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    placeholder="e.g. Radhika Merchant"
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    Mobile Phone
                  </label>
                  <input 
                    type="tel" 
                    value={signupPhone}
                    onChange={e => setSignupPhone(e.target.value)}
                    placeholder="+91 98200 XXXXX"
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    Password
                  </label>
                  <input 
                    type="password" 
                    required
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    placeholder="Create Password"
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-champagne-gold transition-colors"
                >
                  Create Account
                </button>
              </form>
            )}

            {/* Toggle */}
            <div className="pt-2 text-center text-xs text-mutedGrey border-t border-champagne/30">
              {authMode === 'login' ? (
                <p>
                  New to MJR?{' '}
                  <button 
                    onClick={() => setAuthMode('signup')}
                    className="text-champagne-gold font-medium hover:underline ml-1"
                  >
                    Create an Account
                  </button>
                </p>
              ) : (
                <p>
                  Already registered?{' '}
                  <button 
                    onClick={() => setAuthMode('login')}
                    className="text-champagne-gold font-medium hover:underline ml-1"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="bg-ivory min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* User Hero Banner */}
        <div className="bg-white p-6 sm:p-8 border border-champagne/40 shadow-luxury flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-charcoal text-champagne-gold flex items-center justify-center font-serif text-2xl font-light">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl text-charcoal font-medium">{user.name}</h1>
                <span className="text-[10px] uppercase tracking-wider bg-champagne-subtle text-champagne-gold px-2 py-0.5 border border-champagne-gold/40 font-sans">
                  {user.role === 'admin' ? 'Curator Admin' : 'Privileged Connoisseur'}
                </span>
              </div>
              <p className="text-xs text-mutedGrey font-sans mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateWishlist}
              className="px-4 py-2 border border-champagne/60 text-charcoal text-xs uppercase tracking-wider hover:border-charcoal transition-colors flex items-center space-x-1.5"
            >
              <Heart size={14} className="text-champagne-gold" />
              <span>Wishlist</span>
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 bg-ivory text-charcoal text-xs uppercase tracking-wider hover:bg-charcoal hover:text-white transition-colors flex items-center space-x-1.5"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-champagne/40 text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 mr-8 uppercase tracking-widest font-sans font-medium transition-colors ${
              activeTab === 'orders' ? 'border-b-2 border-champagne-gold text-charcoal' : 'text-mutedGrey hover:text-charcoal'
            }`}
          >
            Order History ({userOrders.length})
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 mr-8 uppercase tracking-widest font-sans font-medium transition-colors ${
              activeTab === 'appointments' ? 'border-b-2 border-champagne-gold text-charcoal' : 'text-mutedGrey hover:text-charcoal'
            }`}
          >
            Showroom Appointments ({userAppointments.length})
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 uppercase tracking-widest font-sans font-medium transition-colors ${
              activeTab === 'profile' ? 'border-b-2 border-champagne-gold text-charcoal' : 'text-mutedGrey hover:text-charcoal'
            }`}
          >
            Client Profile & Addresses
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {userOrders.length === 0 ? (
              <div className="bg-white p-12 text-center border border-champagne/40 space-y-4">
                <Package size={32} className="mx-auto text-champagne-gold" />
                <h3 className="font-serif text-xl text-charcoal">No Orders Placed Yet</h3>
                <p className="text-xs text-mutedGrey max-w-sm mx-auto">
                  Your acquisitions will appear here along with live insured courier tracking details.
                </p>
                <button
                  onClick={onNavigateCatalogue}
                  className="px-6 py-2.5 bg-charcoal text-white text-xs uppercase tracking-widest hover:bg-champagne-gold transition-colors"
                >
                  Explore Diamond Collections
                </button>
              </div>
            ) : (
              userOrders.map((order) => (
                <div key={order.id} className="bg-white p-6 sm:p-8 border border-champagne/40 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-champagne/30 text-xs gap-2">
                    <div>
                      <span className="font-serif text-base font-semibold text-charcoal">{order.id}</span>
                      <span className="text-mutedGrey ml-2">• Placed on {formatLuxuryDate(order.createdAt)}</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`px-2.5 py-1 uppercase text-[10px] tracking-wider font-medium ${
                        order.orderStatus === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.orderStatus === 'Dispatched' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                      <span className="font-semibold text-charcoal font-sans text-sm">{formatPrice(order.grandTotal)}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover border border-champagne/30" />
                        <div className="flex-1 text-xs">
                          <h4 className="font-serif font-medium text-charcoal">{item.name}</h4>
                          <p className="text-[11px] text-mutedGrey">{item.selectedMetal} • Size: {item.selectedSize} • Qty: {item.quantity}</p>
                        </div>
                        <span className="font-sans text-xs font-medium text-charcoal">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-champagne/20 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-mutedGrey gap-2">
                    <div className="flex items-center space-x-2">
                      <Truck size={14} className="text-champagne-gold" />
                      <span>Tracking ID: <strong className="font-mono text-charcoal">{order.trackingNumber}</strong></span>
                    </div>
                    <span>Paid via {order.paymentMethod}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {userAppointments.length === 0 ? (
              <div className="bg-white p-12 text-center border border-champagne/40 space-y-4">
                <Calendar size={32} className="mx-auto text-champagne-gold" />
                <h3 className="font-serif text-xl text-charcoal">No Showroom Appointments</h3>
                <p className="text-xs text-mutedGrey max-w-sm mx-auto">
                  Experience our diamonds in private viewing salons in Mumbai, Delhi or Bengaluru.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userAppointments.map((apt) => (
                  <div key={apt.id} className="bg-white p-6 border border-champagne/40 space-y-4 shadow-sm">
                    <div className="flex justify-between items-start pb-3 border-b border-champagne/30">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-champagne-gold font-semibold block">
                          Salon Viewing
                        </span>
                        <h4 className="font-serif text-lg text-charcoal font-medium mt-0.5">{apt.showroom}</h4>
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 ${
                        apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {apt.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-charcoal-light">
                      <p className="flex items-center space-x-2">
                        <Clock size={13} className="text-champagne-gold" />
                        <span>{apt.date} at {apt.time}</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Sparkles size={13} className="text-champagne-gold" />
                        <span>Interest: {apt.category} ({apt.occasion})</span>
                      </p>
                      {apt.notes && (
                        <p className="text-[11px] text-mutedGrey italic pt-1">
                          "{apt.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROFILE EDIT */}
        {activeTab === 'profile' && (
          <div className="bg-white p-8 border border-champagne/40 shadow-luxury max-w-2xl">
            <h3 className="font-serif text-xl text-charcoal pb-3 border-b border-champagne/30 mb-6">
              Client Contact & Saved Shipping Address
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                  Primary Mobile Number
                </label>
                <input 
                  type="tel" 
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                  Default Delivery Address
                </label>
                <textarea 
                  rows={2}
                  value={editAddress}
                  onChange={e => setEditAddress(e.target.value)}
                  className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    City
                  </label>
                  <input 
                    type="text" 
                    value={editCity}
                    onChange={e => setEditCity(e.target.value)}
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    Pincode
                  </label>
                  <input 
                    type="text" 
                    value={editPincode}
                    onChange={e => setEditPincode(e.target.value)}
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold font-mono"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 bg-charcoal text-white text-xs uppercase tracking-widest hover:bg-champagne-gold transition-colors"
                >
                  Save Dossier Updates
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
