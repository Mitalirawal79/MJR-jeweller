import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, formatLuxuryDate } from '../lib/utils';
import { SUPABASE_SCHEMA_SQL, isSupabaseConfigured } from '../lib/supabase';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  Copy,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function AdminDashboard({ onNavigateHome }) {
  const { 
    products, 
    orders, 
    appointments, 
    settings, 
    saveProduct, 
    deleteProduct, 
    updateOrderStatus, 
    updateAppointmentStatus, 
    updateSettings,
    showToast 
  } = useStore();

  const { user, login } = useAuth();

  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // 'overview', 'products', 'orders', 'appointments', 'cms'
  
  // Product Add/Edit Modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'rings',
    subCategory: 'Solitaire Rings',
    price: 295000,
    carat: '1.20 ct',
    metal: '18K White Gold',
    cut: 'Ideal',
    color: 'D (Colorless)',
    clarity: 'VVS1',
    shape: 'Round Brilliant',
    certificate: 'GIA Certified',
    badge: 'Signature',
    stock: 5,
    description: '',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'
  });

  // CMS Settings Form
  const [cmsAnnouncement, setCmsAnnouncement] = useState(settings.announcementBar || '');

  // Quick stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;
  const pendingAppointments = appointments.filter(a => a.status === 'Pending').length;

  // Open modal for adding
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      category: 'rings',
      subCategory: 'Solitaire Rings',
      price: 295000,
      carat: '1.20 ct',
      metal: '18K White Gold',
      cut: 'Ideal',
      color: 'D (Colorless)',
      clarity: 'VVS1',
      shape: 'Round Brilliant',
      certificate: 'GIA Certified',
      badge: 'New Arrival',
      stock: 5,
      description: 'Handcrafted natural diamond creation.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop'
    });
    setProductModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setProdForm({
      ...product
    });
    setProductModalOpen(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const toSave = {
      ...prodForm,
      id: editingProduct ? editingProduct.id : 'mjr-prod-' + Date.now(),
      price: Number(prodForm.price),
      stock: Number(prodForm.stock),
      gallery: editingProduct?.gallery || [prodForm.image],
      availableSizes: editingProduct?.availableSizes || ['12', '14', '16'],
      metalOptions: editingProduct?.metalOptions || ['18K White Gold', '18K Yellow Gold', 'Platinum 950']
    };

    await saveProduct(toSave);
    setProductModalOpen(false);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    showToast('Supabase SQL Schema copied to clipboard.');
  };

  const handleSaveCMS = async (e) => {
    e.preventDefault();
    await updateSettings({
      ...settings,
      announcementBar: cmsAnnouncement
    });
  };

  return (
    <div className="bg-ivory min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="bg-charcoal text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-luxury">
          <div>
            <div className="flex items-center space-x-2 text-champagne-gold">
              <Sparkles size={14} />
              <span className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold">
                Staff Executive Portal
              </span>
            </div>
            <h1 className="font-serif text-3xl font-light mt-1">
              MJR Management Suite
            </h1>
            <p className="text-xs text-ivory-200 mt-0.5">
              Role: Head Curator & Gemological Inventory Director
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 border font-mono ${
              isSupabaseConfigured 
                ? 'border-green-500 text-green-400 bg-green-950/40' 
                : 'border-champagne-gold/60 text-champagne-gold bg-charcoal-light'
            }`}>
              {isSupabaseConfigured ? '● Supabase Cloud Synced' : '● Local Zero-Setup Mode'}
            </span>

            <button
              onClick={onNavigateHome}
              className="px-4 py-2 bg-champagne-gold text-charcoal text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors"
            >
              Live Website →
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-champagne/40 text-xs overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview Metrics' },
            { id: 'products', label: `Products Vault (${products.length})` },
            { id: 'orders', label: `Orders (${orders.length})` },
            { id: 'appointments', label: `Showroom Bookings (${appointments.length})` },
            { id: 'cms', label: 'CMS & Settings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id)}
              className={`pb-2 mr-8 uppercase tracking-widest font-sans font-medium whitespace-nowrap transition-colors ${
                activeAdminTab === tab.id 
                  ? 'border-b-2 border-champagne-gold text-charcoal' 
                  : 'text-mutedGrey hover:text-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-6 border border-champagne/40 shadow-sm space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-mutedGrey block font-medium">Total Revenue</span>
                <span className="font-sans text-xl sm:text-2xl font-bold text-charcoal">{formatPrice(totalRevenue)}</span>
                <span className="text-[10px] text-green-600 block">From {orders.length} orders</span>
              </div>

              <div className="bg-white p-6 border border-champagne/40 shadow-sm space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-mutedGrey block font-medium">Vault Items</span>
                <span className="font-sans text-xl sm:text-2xl font-bold text-charcoal">{products.length}</span>
                <span className="text-[10px] text-mutedGrey block">Certified diamonds</span>
              </div>

              <div className="bg-white p-6 border border-champagne/40 shadow-sm space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-mutedGrey block font-medium">Pending Orders</span>
                <span className="font-sans text-xl sm:text-2xl font-bold text-amber-700">{pendingOrders}</span>
                <span className="text-[10px] text-mutedGrey block">Awaiting dispatch</span>
              </div>

              <div className="bg-white p-6 border border-champagne/40 shadow-sm space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-mutedGrey block font-medium">Salon Appointments</span>
                <span className="font-sans text-xl sm:text-2xl font-bold text-champagne-gold">{appointments.length}</span>
                <span className="text-[10px] text-mutedGrey block">{pendingAppointments} pending review</span>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white p-6 border border-champagne/40 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-champagne/30">
                <h3 className="font-serif text-lg text-charcoal">Recent Patron Orders</h3>
                <button onClick={() => setActiveAdminTab('orders')} className="text-xs uppercase text-champagne-gold hover:underline">
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-champagne/20 text-mutedGrey uppercase text-[10px] tracking-wider">
                      <th className="py-2">Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-champagne/10">
                    {orders.slice(0, 4).map(o => (
                      <tr key={o.id} className="py-2">
                        <td className="py-2.5 font-mono font-medium text-charcoal">{o.id}</td>
                        <td>{o.customer.name}</td>
                        <td>{o.items.length} pcs</td>
                        <td className="font-semibold">{formatPrice(o.grandTotal)}</td>
                        <td>
                          <span className={`px-2 py-0.5 text-[10px] uppercase ${
                            o.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {o.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeAdminTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif text-2xl text-charcoal">Diamond Inventory Directory</h2>
                <p className="text-xs text-mutedGrey">Create, modify carats, adjust pricing, or remove pieces.</p>
              </div>
              <button
                onClick={handleOpenAdd}
                className="px-5 py-2.5 bg-charcoal text-white text-xs uppercase tracking-widest font-medium hover:bg-champagne-gold transition-colors flex items-center space-x-1.5"
              >
                <Plus size={14} />
                <span>Add Diamond Jewel</span>
              </button>
            </div>

            <div className="bg-white border border-champagne/40 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-ivory border-b border-champagne/30 text-mutedGrey uppercase text-[10px] tracking-wider">
                    <th className="p-3">Creation</th>
                    <th>Category</th>
                    <th>Diamond Specs</th>
                    <th>Metal</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th className="text-right p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne/20">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-ivory/50">
                      <td className="p-3 flex items-center space-x-3">
                        <img src={p.image} alt={p.name} className="w-12 h-12 object-cover border border-champagne/30" />
                        <div>
                          <span className="font-medium text-charcoal block">{p.name}</span>
                          <span className="text-[10px] text-mutedGrey">{p.certificate} • {p.badge || 'Standard'}</span>
                        </div>
                      </td>
                      <td className="uppercase text-[11px] text-mutedGrey">{p.category}</td>
                      <td>{p.carat} • {p.cut} • {p.shape}</td>
                      <td>{p.metal}</td>
                      <td className="font-semibold text-charcoal">{formatPrice(p.price)}</td>
                      <td>{p.stock} units</td>
                      <td className="text-right p-3 space-x-2">
                        <button 
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-mutedGrey hover:text-charcoal"
                          title="Edit Product"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-mutedGrey hover:text-red-500"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Client Order Dispatch Management</h2>
              <p className="text-xs text-mutedGrey">Update tracking numbers and fulfill white-glove courier status.</p>
            </div>

            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-6 border border-champagne/40 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-champagne/30 gap-2">
                    <div>
                      <span className="font-mono font-bold text-sm text-charcoal">{order.id}</span>
                      <span className="text-mutedGrey text-xs ml-3">Patron: {order.customer.name} ({order.customer.phone})</span>
                    </div>

                    {/* Change Status Dropdown */}
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase tracking-wider text-mutedGrey">Status:</span>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="bg-ivory border border-champagne/60 px-2.5 py-1 text-xs text-charcoal font-medium focus:outline-none focus:border-champagne-gold"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-mutedGrey block">Deliver To</span>
                      <p className="text-charcoal">{order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
                      <p className="text-mutedGrey mt-1">Payment: {order.paymentMethod} ({order.paymentStatus})</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase text-mutedGrey block">Insured Total</span>
                      <span className="font-sans font-bold text-base text-charcoal">{formatPrice(order.grandTotal)}</span>
                      <p className="text-mutedGrey text-[11px] mt-1 font-mono">Tracking: {order.trackingNumber}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: APPOINTMENTS MANAGEMENT */}
        {activeAdminTab === 'appointments' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Showroom Appointment Bookings</h2>
              <p className="text-xs text-mutedGrey">Confirm, reschedule, or manage private viewing salon requests.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map(apt => (
                <div key={apt.id} className="bg-white p-6 border border-champagne/40 shadow-sm space-y-4">
                  <div className="flex justify-between items-start pb-3 border-b border-champagne/30">
                    <div>
                      <span className="font-serif text-lg font-medium text-charcoal">{apt.name}</span>
                      <p className="text-xs text-mutedGrey">{apt.email} • {apt.phone}</p>
                    </div>
                    <span className={`text-[10px] uppercase px-2 py-0.5 ${
                      apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {apt.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-charcoal-light">
                    <p><strong>Showroom:</strong> {apt.showroom}</p>
                    <p><strong>Date & Time:</strong> {apt.date} at {apt.time}</p>
                    <p><strong>Category:</strong> {apt.category} ({apt.occasion})</p>
                    {apt.notes && <p className="italic text-mutedGrey text-[11px]">"{apt.notes}"</p>}
                  </div>

                  <div className="pt-3 border-t border-champagne/30 flex space-x-2">
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                      className="flex-1 py-1.5 bg-charcoal text-white text-[11px] uppercase tracking-wider hover:bg-champagne-gold transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'Rescheduled')}
                      className="px-3 py-1.5 border border-champagne/60 text-[11px] text-charcoal hover:border-charcoal"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                      className="px-3 py-1.5 border border-red-200 text-red-600 text-[11px] hover:bg-red-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CMS & SETTINGS */}
        {activeAdminTab === 'cms' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Announcement Editor */}
            <div className="bg-white p-6 sm:p-8 border border-champagne/40 shadow-sm space-y-4">
              <h3 className="font-serif text-xl text-charcoal pb-3 border-b border-champagne/30">
                Top Announcement Bar Editor
              </h3>
              <form onSubmit={handleSaveCMS} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">
                    Announcement Bar Text
                  </label>
                  <textarea 
                    rows={3}
                    value={cmsAnnouncement}
                    onChange={e => setCmsAnnouncement(e.target.value)}
                    className="w-full bg-ivory border border-champagne/60 p-3 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-charcoal text-white text-xs uppercase tracking-widest hover:bg-champagne-gold transition-colors"
                >
                  Save Announcement
                </button>
              </form>
            </div>

            {/* Supabase Schema Tool */}
            <div className="bg-white p-6 sm:p-8 border border-champagne/40 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-champagne/30">
                <h3 className="font-serif text-xl text-charcoal">Supabase SQL Schema</h3>
                <button 
                  onClick={handleCopySql}
                  className="text-xs uppercase tracking-wider text-champagne-gold hover:underline flex items-center space-x-1"
                >
                  <Copy size={12} />
                  <span>Copy SQL</span>
                </button>
              </div>
              <p className="text-xs text-mutedGrey leading-relaxed">
                Want to connect to your own Supabase project? Copy this SQL schema into your Supabase SQL editor to create all required tables and Row Level Security policies instantly.
              </p>
              <pre className="bg-charcoal text-ivory p-4 text-[10px] font-mono h-48 overflow-y-auto border border-charcoal-light">
                {SUPABASE_SCHEMA_SQL}
              </pre>
            </div>
          </div>
        )}

        {/* Product Add/Edit Modal */}
        {productModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white max-w-xl w-full p-6 sm:p-8 border border-champagne/50 shadow-modal my-8 animate-fade-in space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-champagne/30">
                <h3 className="font-serif text-2xl text-charcoal">
                  {editingProduct ? 'Edit Diamond Creation' : 'Add New Diamond Jewel'}
                </h3>
                <button onClick={() => setProductModalOpen(false)} className="text-mutedGrey hover:text-charcoal">✕</button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">Creation Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={prodForm.name} 
                    onChange={e => setProdForm({ ...prodForm, name: e.target.value })}
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">Category *</label>
                    <select
                      value={prodForm.category}
                      onChange={e => setProdForm({ ...prodForm, category: e.target.value })}
                      className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none"
                    >
                      <option value="rings">Diamond Rings</option>
                      <option value="necklaces">Diamond Necklaces</option>
                      <option value="earrings">Diamond Earrings</option>
                      <option value="bracelets">Diamond Bracelets</option>
                      <option value="solitaires">Solitaires Vault</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">Price (₹ INR) *</label>
                    <input 
                      type="number" 
                      required 
                      value={prodForm.price} 
                      onChange={e => setProdForm({ ...prodForm, price: e.target.value })}
                      className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">Carat Weight *</label>
                    <input 
                      type="text" 
                      value={prodForm.carat} 
                      onChange={e => setProdForm({ ...prodForm, carat: e.target.value })}
                      className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">Diamond Shape *</label>
                    <input 
                      type="text" 
                      value={prodForm.shape} 
                      onChange={e => setProdForm({ ...prodForm, shape: e.target.value })}
                      className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">Cut Grade *</label>
                    <input 
                      type="text" 
                      value={prodForm.cut} 
                      onChange={e => setProdForm({ ...prodForm, cut: e.target.value })}
                      className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">Metal Setting</label>
                    <input 
                      type="text" 
                      value={prodForm.metal} 
                      onChange={e => setProdForm({ ...prodForm, metal: e.target.value })}
                      className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">Badge (Optional)</label>
                    <input 
                      type="text" 
                      value={prodForm.badge} 
                      onChange={e => setProdForm({ ...prodForm, badge: e.target.value })}
                      placeholder="e.g. Best Seller, Exclusive"
                      className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">Image URL</label>
                  <input 
                    type="url" 
                    required 
                    value={prodForm.image} 
                    onChange={e => setProdForm({ ...prodForm, image: e.target.value })}
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none" 
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal font-semibold block mb-1">Product Description</label>
                  <textarea 
                    rows={2} 
                    value={prodForm.description} 
                    onChange={e => setProdForm({ ...prodForm, description: e.target.value })}
                    className="w-full bg-ivory border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none" 
                  />
                </div>

                <div className="pt-3 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setProductModalOpen(false)}
                    className="px-4 py-2 border border-champagne/60 text-charcoal text-xs uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-charcoal text-white text-xs uppercase tracking-widest hover:bg-champagne-gold"
                  >
                    Save to Vault
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
