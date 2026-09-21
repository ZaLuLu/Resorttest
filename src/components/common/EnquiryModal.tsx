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
      const summaryText =
        `*Reservation Enquiry — Coorg Laya Resort*\n\n` +
        `• *Guest Name:* ${formData.name}\n` +
        `• *Phone:* ${formData.phone || 'Not provided'}\n` +
        `• *Email:* ${formData.email}\n` +
        `• *Type:* ${formData.enquiryType.toUpperCase()}\n` +
        `• *Dates:* ${formData.checkIn || 'Flexible'} to ${formData.checkOut || 'Flexible'}\n` +
        `• *Guests:* ${formData.guests}\n` +
        `• *Notes:* ${formData.message || 'None'}`;

      const whatsappUrl = `https://wa.me/917411695533?text=${encodeURIComponent(summaryText)}`;
      const subject = encodeURIComponent(`Reservation Enquiry - ${formData.enquiryType.toUpperCase()} - ${formData.name}`);
      const mailtoUrl = `mailto:stay@coorglaya.com?subject=${subject}&body=${encodeURIComponent(summaryText)}`;

      // Attempt to open WhatsApp or Mail client
      window.open(whatsappUrl, '_blank');

      setStatus('sent');
    } catch {
      setStatus('error');
      setErrorMessage('Unable to dispatch. Please message us on WhatsApp at +91 7411695533 or email stay@coorglaya.com');
    }
  };

  const handleCopySummary = () => {
    const summaryText =
      `Reservation Enquiry — Coorg Laya Resort\n` +
      `Guest Name: ${formData.name}\n` +
      `Phone: ${formData.phone || 'Not provided'}\n` +
      `Email: ${formData.email}\n` +
      `Type: ${formData.enquiryType.toUpperCase()}\n` +
      `Dates: ${formData.checkIn || 'Flexible'} to ${formData.checkOut || 'Flexible'}\n` +
      `Guests: ${formData.guests}\n` +
      `Notes: ${formData.message || 'None'}`;
    navigator.clipboard.writeText(summaryText);
    alert('Reservation summary copied to clipboard!');
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl rounded-3xl sm:rounded-4xl bg-[#FAF6EF] text-[#132422] p-6 sm:p-10 shadow-2xl border-2 border-[#E4D9C8] z-10 my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-6 sm:right-6 size-10 rounded-full bg-[#EFE8DC] hover:bg-[#E4D9C8] text-[#132422] flex items-center justify-center transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <X className="size-5" />
            </button>

            {/* Title Header */}
            <div className="space-y-1.5 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-3.5 py-1 text-xs font-bold text-[#A3733E]">
                <Waves className="size-3.5 text-[#137586]" />
                <span className="tracking-wide uppercase">Direct Reservation Desk</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#132422] heading-balance">
                Plan Your Stay or Event
              </h3>
              <p className="text-xs sm:text-sm text-[#2C413E] font-normal prose-pretty">
                Connect directly with our host team in Kushalnagar, Kodagu.
              </p>
            </div>

            {status === 'sent' ? (
              <div className="rounded-3xl bg-white border border-[#E4D9C8] p-6 sm:p-8 text-center space-y-4 shadow-sm">
                <div className="size-14 rounded-full bg-[#0F3C28] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="size-8" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-bold text-[#132422]">
                  Enquiry Dispatched
                </h4>
                <p className="text-xs sm:text-sm text-[#2C413E] font-normal max-w-md mx-auto leading-relaxed prose-pretty">
                  Your reservation request was formatted for our concierge team. Choose an instant channel below to confirm:
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                  <a
                    href={`https://wa.me/917411695533?text=${encodeURIComponent(
                      `Hi Coorg Laya Team, I just submitted an enquiry for ${formData.name} (${formData.enquiryType}). Phone: ${formData.phone || 'N/A'}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#1E7E34] hover:bg-[#155d27] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Open WhatsApp Chat</span>
                  </a>
                  <a
                    href={`mailto:stay@coorglaya.com?subject=${encodeURIComponent(`Reservation Enquiry - ${formData.name}`)}&body=${encodeURIComponent(
                      `Name: ${formData.name}\nPhone: ${formData.phone}\nGuests: ${formData.guests}\nDates: ${formData.checkIn} to ${formData.checkOut}`
                    )}`}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#132422] hover:bg-[#1E3633] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Send via Email</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-[#FAF6EF] border border-[#D5C7B2] hover:bg-[#EFE8DC] text-[#132422] text-xs font-bold transition-all"
                  >
                    <span>Copy Summary</span>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="text-xs text-[#7E9491] hover:text-[#132422] underline cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Stay vs Event Segmented Toggle */}
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#EFE8DC] border border-[#DFD3C0]">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, enquiryType: 'stay' }))}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      formData.enquiryType === 'stay'
                        ? 'bg-[#1A96AA] text-white shadow-sm'
                        : 'text-[#344E4A] hover:text-[#132422]'
                    }`}
                  >
                    Room Stay
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, enquiryType: 'event' }))}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      formData.enquiryType === 'event'
                        ? 'bg-[#A3733E] text-white shadow-sm'
                        : 'text-[#344E4A] hover:text-[#132422]'
                    }`}
                  >
                    500 Lawn Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, enquiryType: 'general' }))}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      formData.enquiryType === 'general'
                        ? 'bg-[#132422] text-white shadow-sm'
                        : 'text-[#344E4A] hover:text-[#132422]'
                    }`}
                  >
                    General Enquiry
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#132422] block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Hegde"
                      className="w-full px-4 py-3 text-sm sm:text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#1A96AA]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#132422] block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 text-sm sm:text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#1A96AA]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#132422] block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 text-sm sm:text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#1A96AA]"
                    />
                  </div>

                  {/* Check-In */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#132422] block">
                      Target Date
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm sm:text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#1A96AA]"
                    />
                  </div>

                  {/* Total Guests */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#132422] block">
                      Total Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm sm:text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#1A96AA]"
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
                  <label className="text-xs font-bold text-[#132422] block">
                    Special Notes or Event Requirements
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Expected dates, room preferences, or lawn requirements..."
                    className="w-full px-4 py-3 text-sm sm:text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium resize-none focus:outline-none focus:border-[#1A96AA]"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-500 font-bold">{errorMessage}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase text-white bg-[#137586] hover:bg-[#0F5E6C] shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
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
