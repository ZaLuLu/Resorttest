import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Mail, User, Phone, MessageSquare, Send, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
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
      setErrorMessage('Unable to initialize email client. Please email us directly at ' + resortData.contact.reservationEmail);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-primary/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl rounded-3xl border border-ink-primary/15 bg-white p-6 sm:p-8 shadow-2xl z-10 my-8 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-5 top-5 rounded-full p-2 text-ink-muted hover:bg-sand-50 hover:text-ink-primary transition-colors cursor-pointer"
              aria-label="Close enquiry modal"
            >
              <X className="size-5" />
            </button>

            {status === 'sent' ? (
              <div className="py-8 text-center space-y-4">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-powder-50 text-powder-600 border border-powder-200">
                  <CheckCircle className="size-8" />
                </div>
                <h3 className="font-heading text-2xl text-ink-primary font-medium">
                  Enquiry Prepared
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
                  Your enquiry has been formatted and opened in your email client addressed directly to{' '}
                  <span className="text-butter-700 font-semibold">{resortData.contact.reservationEmail}</span>.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <a
                    href={`mailto:${resortData.contact.reservationEmail}`}
                    className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-6 py-3 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-colors shadow-sm"
                  >
                    Open Email Client Again <ExternalLink className="size-3.5" />
                  </a>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      onClose();
                    }}
                    className="rounded-full border border-ink-primary/15 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-ink-primary hover:bg-sand-50 transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-butter-700">
                    <Sparkles className="size-3 text-butter-500" />
                    <span>Direct Reservation & Event Enquiries</span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-medium text-ink-primary">
                    Plan Your Experience
                  </h2>
                  <p className="text-xs text-ink-muted">
                    Send your reservation or celebration details directly to our reservations team.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-ink-primary mb-1.5">
                        Your Name <span className="text-butter-600">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 size-4 text-ink-muted" />
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Arjun Sharma"
                          className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-ink-primary placeholder-ink-muted/50 focus:border-butter-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-butter-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink-primary mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 size-4 text-ink-muted" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-ink-primary placeholder-ink-muted/50 focus:border-butter-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-butter-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Enquiry Type */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-ink-primary mb-1.5">
                        Email Address <span className="text-butter-600">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 size-4 text-ink-muted" />
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="arjun@example.com"
                          className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-ink-primary placeholder-ink-muted/50 focus:border-butter-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-butter-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink-primary mb-1.5">
                        Enquiry Type
                      </label>
                      <select
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50 py-2.5 px-3.5 text-xs sm:text-sm text-ink-primary focus:border-butter-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-butter-400 cursor-pointer"
                      >
                        <option value="stay">Resort Stay (15 Rooms / ~45 Guests)</option>
                        <option value="event">Event / Celebration (Up to ~500 Guests)</option>
                        <option value="general">General Enquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Dates & Guests */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-xs font-semibold text-ink-primary mb-1.5">
                        Check-in Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3 size-4 text-ink-muted" />
                        <input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50 py-2.5 pl-10 pr-2 text-xs sm:text-sm text-ink-primary focus:border-butter-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-butter-400 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink-primary mb-1.5">
                        Check-out Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3 size-4 text-ink-muted" />
                        <input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50 py-2.5 pl-10 pr-2 text-xs sm:text-sm text-ink-primary focus:border-butter-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-butter-400 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink-primary mb-1.5">
                        Guests
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-3 size-4 text-ink-muted" />
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50 py-2.5 pl-10 pr-2 text-xs sm:text-sm text-ink-primary focus:border-butter-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-butter-400 cursor-pointer"
                        >
                          <option value="1-2 Guests">1 - 2 Guests</option>
                          <option value="3-5 Guests">3 - 5 Guests (Family)</option>
                          <option value="6-15 Guests">6 - 15 Guests (Group)</option>
                          <option value="16-45 Guests">16 - 45 Guests (Full Resort)</option>
                          <option value="50-100 Guests">50 - 100 Guests (Event)</option>
                          <option value="100-500 Guests">100 - 500 Guests (Celebration)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-ink-primary mb-1.5">
                      Message / Special Requests
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3 size-4 text-ink-muted" />
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your expected dates, group requirements, or questions..."
                        className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-ink-primary placeholder-ink-muted/50 focus:border-butter-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-butter-400"
                      />
                    </div>
                  </div>

                  {/* Note on Delivery */}
                  <p className="text-[0.68rem] text-ink-muted italic">
                    Submitting this form prepares your enquiry addressed directly to{' '}
                    <span className="text-butter-700 font-semibold">{resortData.contact.reservationEmail}</span>.
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-full px-5 py-2.5 text-xs font-semibold text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center gap-2 rounded-full bg-butter-400 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all shadow-md disabled:opacity-50 cursor-pointer border border-butter-500/20"
                    >
                      {status === 'submitting' ? 'Preparing...' : 'Send Direct Enquiry'}
                      <Send className="size-3.5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
