import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { SHOWROOM_LOCATIONS } from '../../lib/initialData';
import { X, Calendar, Clock, MapPin, CheckCircle, Sparkles } from 'lucide-react';

export default function BookingModal() {
  const { 
    bookingModalOpen, 
    setBookingModalOpen, 
    selectedShowroomForBooking, 
    bookAppointment 
  } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '3:00 PM',
    showroom: selectedShowroomForBooking?.name || SHOWROOM_LOCATIONS[0].name,
    category: 'Engagement Rings',
    occasion: 'Engagement Ceremony',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!bookingModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await bookAppointment(formData);
      setSubmitted(true);
    } catch (err) {
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setBookingModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-ivory shadow-modal border border-champagne/50 overflow-hidden animate-fade-in">
          
          {/* Close button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 text-mutedGrey hover:text-charcoal transition-colors"
          >
            <X size={20} />
          </button>

          {submitted ? (
            <div className="p-8 sm:p-12 text-center space-y-4 bg-white">
              <div className="w-16 h-16 mx-auto rounded-full bg-champagne-light/70 flex items-center justify-center text-champagne-gold">
                <CheckCircle size={32} />
              </div>
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-champagne-gold font-semibold block">
                Appointment Requested
              </span>
              <h3 className="font-serif text-2xl text-charcoal">
                We Look Forward to Welcoming You
              </h3>
              <p className="text-xs text-mutedGrey max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-charcoal font-semibold">{formData.name}</strong>. Your private viewing at our <span className="text-charcoal font-medium">{formData.showroom}</span> on <span className="text-charcoal font-medium">{formData.date} at {formData.time}</span> has been scheduled.
              </p>
              <div className="p-4 bg-ivory border border-champagne/40 text-xs text-charcoal-light max-w-sm mx-auto">
                Our Senior Gemologist Concierge will contact you at <strong>{formData.phone}</strong> to confirm your bespoke tray curation.
              </div>
              <button
                onClick={handleClose}
                className="mt-6 px-8 py-3 bg-charcoal text-white text-xs uppercase tracking-widest hover:bg-champagne-gold transition-colors"
              >
                Return to Exploration
              </button>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-champagne-gold font-semibold block">
                  Private Salon Viewing
                </span>
                <h3 className="font-serif text-2xl text-charcoal mt-1">
                  Book an Intimate Showroom Experience
                </h3>
                <p className="text-xs text-mutedGrey mt-1">
                  Enjoy private champagne lounges, gemologist consultations and hand-curated diamond selections.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal block mb-1 font-medium">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Merchant"
                      className="w-full bg-white border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal block mb-1 font-medium">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 XXXXX"
                      className="w-full bg-white border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal block mb-1 font-medium">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-white border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>

                {/* Showroom & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal block mb-1 font-medium">
                      Select Showroom *
                    </label>
                    <select
                      value={formData.showroom}
                      onChange={e => setFormData({ ...formData, showroom: e.target.value })}
                      className="w-full bg-white border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                    >
                      {SHOWROOM_LOCATIONS.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal block mb-1 font-medium">
                      Jewellery Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-white border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                    >
                      <option value="Engagement Rings">Engagement Rings</option>
                      <option value="Wedding Jewellery">Wedding Jewellery & Bridal Sets</option>
                      <option value="Diamond Necklaces">Diamond Necklaces & Chokers</option>
                      <option value="Everyday Diamond Jewellery">Everyday Diamond Jewellery</option>
                      <option value="Private Collection Viewing">Private High-Jewellery Vault</option>
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal block mb-1 font-medium">
                      Preferred Date *
                    </label>
                    <input 
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-charcoal block mb-1 font-medium">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={formData.time}
                      onChange={e => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-white border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                    >
                      <option value="11:30 AM">11:30 AM (Morning Salon)</option>
                      <option value="1:30 PM">1:30 PM (Afternoon View)</option>
                      <option value="3:30 PM">3:30 PM (High Tea Slot)</option>
                      <option value="5:30 PM">5:30 PM (Evening Lounge)</option>
                      <option value="7:00 PM">7:00 PM (Twilight Viewing)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-charcoal block mb-1 font-medium">
                    Specific Requests / Diamond Preferences (Optional)
                  </label>
                  <textarea 
                    rows={2}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Mention preferred carats (e.g. 2 ct oval), metals, or personal milestones..."
                    className="w-full bg-white border border-champagne/60 px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-champagne-gold"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-champagne-gold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Sparkles size={14} className="text-champagne-gold" />
                    <span>{loading ? 'Confirming with Concierge...' : 'Confirm Showroom Viewing'}</span>
                  </button>
                  <p className="text-[10px] text-mutedGrey text-center mt-2">
                    Complimentary valet parking & personal styling included.
                  </p>
                </div>

              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
