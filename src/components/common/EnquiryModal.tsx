import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Sparkles, ShieldCheck, Waves } from 'lucide-react';
import { resortData } from '../../data/resortData';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEnquiryType?: 'stay' | 'event' | 'general';
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultEnquiryType = 'stay',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guests',
    enquiryType: defaultEnquiryType,
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your name and a valid email address.');
      return;
    }

    try {
      const subject = encodeURIComponent(
        `Reservation Enquiry - ${formData.enquiryType.toUpperCase()} - ${formData.name}`
      );
      const body = encodeURIComponent(
        `Dear Coorg Laya Resort Team,\n\n` +
        `I would like to enquire about a reservation with the following details:\n\n` +
        `• Guest Name: ${formData.name}\n` +
        `• Contact Phone: ${formData.phone || 'Not provided'}\n` +
        `• Email Address: ${formData.email}\n` +
        `• Check-in Date: ${formData.checkIn || 'To be decided'}\n` +
        `• Check-out Date: ${formData.checkOut || 'To be decided'}\n` +
        `• Total Guests: ${formData.guests}\n` +
        `• Enquiry Type: ${formData.enquiryType}\n\n` +
        `Additional Message / Requests:\n${formData.message || 'No additional notes.'}\n\n` +
        `Looking forward to your confirmation.\n\nWarm regards,\n${formData.name}`
      );

      const mailtoUrl = `mailto:${resortData.contact.reservationEmail}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      setTimeout(() => {
        setStatus('sent');
      }, 600);
    } catch {
      setStatus('error');
      setErrorMessage('Unable to open email client. Please email us directly at ' + resortData.contact.reservationEmail);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-riverbed-900/60 backdrop-blur-md"
          />

          {/* Claymorphic Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl rounded-4xl bg-white text-riverbed-900 p-6 sm:p-10 shadow-clay-lg border-2 border-white z-10 my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 size-11 rounded-full bg-sand-100 hover:bg-sand-200 text-riverbed-700 flex items-center justify-center transition-all shadow-clay-sm cursor-pointer active:scale-95"
            >
              <X className="size-5" />
            </button>

            {/* Title Header */}
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-water-200 bg-water-50 px-3.5 py-1 text-xs font-bold text-water-700 shadow-clay-pill">
                <Waves className="size-3.5 text-water-500" />
                <span>Direct Reservation Desk</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-riverbed-900">
                Plan Your Stay or Event
              </h3>
              <p className="text-xs sm:text-sm text-riverbed-500 font-medium">
                Connect directly with our host team in Kushalnagar, Kodagu.
              </p>
            </div>

            {status === 'sent' ? (
              <div className="rounded-3xl bg-sand-50 border-2 border-sand-200 p-8 text-center space-y-4 shadow-clay-sand">
                <div className="size-16 rounded-full bg-water-500 text-white flex items-center justify-center mx-auto shadow-clay-btn-water">
                  <CheckCircle2 className="size-9" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-riverbed-900">
                  Enquiry Prepared
                </h4>
                <p className="text-xs sm:text-sm text-riverbed-600 font-medium max-w-md mx-auto">
                  Your default email client has been opened with your inquiry addressed directly to <strong className="text-water-700">{resortData.contact.reservationEmail}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="clay-btn-water text-xs font-bold"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Stay vs Event Segmented Clay Toggle */}
                <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-sand-100 border border-sand-200 shadow-clay-inset-sand">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, enquiryType: 'stay' }))}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      formData.enquiryType === 'stay'
                        ? 'bg-water-600 text-white shadow-clay-btn-water'
                        : 'text-riverbed-600 hover:text-riverbed-900'
                    }`}
                  >
                    Room Stay
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, enquiryType: 'event' }))}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      formData.enquiryType === 'event'
                        ? 'bg-sand-500 text-white shadow-clay-btn-sand'
                        : 'text-riverbed-600 hover:text-riverbed-900'
                    }`}
                  >
                    500 Lawn Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, enquiryType: 'general' }))}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      formData.enquiryType === 'general'
                        ? 'bg-riverbed-800 text-white shadow-sm'
                        : 'text-riverbed-600 hover:text-riverbed-900'
                    }`}
                  >
                    General Enquiry
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-riverbed-700 block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Hegde"
                      className="w-full clay-input px-4 py-3 text-xs text-riverbed-900"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-riverbed-700 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="w-full clay-input px-4 py-3 text-xs text-riverbed-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-riverbed-700 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full clay-input px-4 py-3 text-xs text-riverbed-900"
                    />
                  </div>

                  {/* Check-In */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-riverbed-700 block">
                      Target Check-In
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full clay-input px-4 py-3 text-xs text-riverbed-900"
                    />
                  </div>

                  {/* Total Guests */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-riverbed-700 block">
                      Total Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full clay-input px-4 py-3 text-xs text-riverbed-900"
                    >
                      <option value="2 Guests">2 Guests (Couple)</option>
                      <option value="4-6 Guests">4–6 Guests (Family)</option>
                      <option value="10-20 Guests">10–20 Guests (Group)</option>
                      <option value="Full Resort Buyout (~45 Guests)">Full Buyout (~45 Guests)</option>
                      <option value="Lawn Event (50-500 Guests)">Lawn Event (50–500 Guests)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-riverbed-700 block">
                    Special Notes or Event Requirements
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Expected dates, room preferences, or lawn requirements..."
                    className="w-full clay-input px-4 py-3 text-xs text-riverbed-900 resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-500 font-bold">{errorMessage}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full clay-btn-water text-xs sm:text-sm font-bold shadow-clay-btn-water cursor-pointer"
                >
                  <Send className="size-4" />
                  <span>{status === 'submitting' ? 'Preparing Enquiry...' : 'Send Reservation Enquiry'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default EnquiryModal;
