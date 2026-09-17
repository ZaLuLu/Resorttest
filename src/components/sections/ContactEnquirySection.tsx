import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle2, Loader2, Send, Sparkles, Waves } from 'lucide-react';
import { springTransition, fadeUp } from '../../utils/motionVariants';
import { resortData } from '../../data/resortData';

export const ContactEnquirySection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2 Guests',
    date: '',
    message: '',
  });

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    const subject = encodeURIComponent(`Reservation Enquiry - ${formData.name}`);
    const body = encodeURIComponent(
      `Dear Coorg Laya Resort Team,\n\n` +
      `I would like to enquire about reservation:\n\n` +
      `• Name: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Guests: ${formData.guests}\n` +
      `• Target Date: ${formData.date || 'Flexible'}\n\n` +
      `Message:\n${formData.message || 'No additional notes'}`
    );

    const mailto = `mailto:${resortData.contact.reservationEmail}?subject=${subject}&body=${body}`;
    window.location.href = mailto;

    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        setFormState('idle');
        setFormData({ name: '', email: '', phone: '', guests: '2 Guests', date: '', message: '' });
      }, 4000);
    }, 800);
  };

  return (
    <section id="contact" className="relative w-full py-20 sm:py-28 bg-sand-50/90 text-riverbed-900 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white px-4 py-1.5 text-xs font-bold text-sand-700 shadow-clay-pill">
              <Waves className="size-4 text-water-500" />
              <span>Direct Reservations</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-riverbed-900 leading-tight">
              Begin your unhurried escape.
            </h2>

            <p className="text-sm sm:text-base text-riverbed-600 font-medium leading-relaxed">
              Our reservation team assists directly with private family stays across 15 suites and full 500-guest celebration lawn bookings.
            </p>

            <div className="space-y-4 pt-2 text-xs sm:text-sm text-riverbed-700 font-medium">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border-2 border-white shadow-clay-sm">
                <MapPin className="size-5 text-water-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Teppadakandi, Siddapura Main Road, Basavanahalli Village, Gudde Hosur Post, Kushalnagar - 571234, Kodagu, Karnataka
                </span>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border-2 border-white shadow-clay-sm">
                <Mail className="size-5 text-water-600 shrink-0" />
                <a href={`mailto:${resortData.contact.reservationEmail}`} className="text-water-700 font-bold hover:underline">
                  {resortData.contact.reservationEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Right Tactile Clay Form */}
          <div className="lg:col-span-7 clay-card p-6 sm:p-10 border-2 border-white shadow-clay-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-riverbed-700 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full clay-input px-4 py-3 text-xs text-riverbed-900 font-medium"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-riverbed-700 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full clay-input px-4 py-3 text-xs text-riverbed-900 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-riverbed-700 block">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full clay-input px-4 py-3 text-xs text-riverbed-900 font-medium"
                  />
                </div>

                {/* Guests */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-riverbed-700 block">Number of Guests</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full clay-input px-4 py-3 text-xs text-riverbed-900 font-medium"
                  >
                    <option value="2 Guests">2 Guests (Couple)</option>
                    <option value="4-8 Guests">4–8 Guests (Family)</option>
                    <option value="15-25 Guests">15–25 Guests (Group)</option>
                    <option value="Full Resort Buyout (~45 Guests)">Full Buyout (~45 Guests)</option>
                    <option value="Lawn Event (50-500 Guests)">Lawn Event (50–500 Guests)</option>
                  </select>
                </div>
              </div>

              {/* Target Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-riverbed-700 block">Target Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full clay-input px-4 py-3 text-xs text-riverbed-900 font-medium"
                />
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-riverbed-700 block">Dates & Special Requirements</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your dates, suite preferences, or event setup..."
                  className="w-full clay-input px-4 py-3 text-xs text-riverbed-900 font-medium resize-none"
                />
              </div>

              {/* Morphing Submit Button */}
              <motion.button
                type="submit"
                disabled={formState !== 'idle'}
                whileHover={formState === 'idle' ? { scale: 1.02 } : {}}
                whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
                transition={springTransition}
                className="w-full clay-btn-water text-xs sm:text-sm font-bold shadow-clay-btn-water cursor-pointer"
              >
                {formState === 'loading' && (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Preparing Mail Request...</span>
                  </>
                )}
                {formState === 'success' && (
                  <>
                    <CheckCircle2 className="size-4" />
                    <span>Mail Client Dispatched · Thank You!</span>
                  </>
                )}
                {formState === 'idle' && (
                  <>
                    <Send className="size-4" />
                    <span>Send Reservation Enquiry</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
export default ContactEnquirySection;
