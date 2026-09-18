import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, CheckCircle2, Loader2, Send, 
  Sparkles, MessageSquare, ArrowUpRight, Compass, Clock, ShieldCheck, Instagram
} from 'lucide-react';
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

  const WHATSAPP_NUMBER = '917411695533';
  const PHONE_DISPLAY = '+91 7411695533';
  const INSTAGRAM_URL = 'https://www.instagram.com/p/Ddb0dXLBLPa/?stkn=MTd0ZzN2dGZzOTZrdQ==';
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi Coorg Laya Resort, I would like to enquire about booking a stay.'
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    const subject = encodeURIComponent(`Reservation Enquiry - ${formData.name}`);
    const body = encodeURIComponent(
      `Dear Coorg Laya Resort Team,\n\n` +
      `I would like to enquire about a reservation:\n\n` +
      `• Name: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Guests: ${formData.guests}\n` +
      `• Target Date: ${formData.date || 'Flexible'}\n\n` +
      `Message:\n${formData.message || 'No additional notes'}`
    );

    const mailto = `mailto:stay@coorglaya.com?subject=${subject}&body=${body}`;
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
    <section id="contact" className="relative w-full py-20 sm:py-28 bg-[#F5EFE6] text-[#132422] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Compass className="w-4 h-4 text-[#A3733E]" />
            <span>Direct Concierge Channels</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#132422] font-serif leading-tight">
            Connect with Coorg Laya Resort
          </h2>

          <p className="text-sm sm:text-base text-[#344E4A] font-medium leading-relaxed">
            Reach our on-site team directly via WhatsApp, Instagram, direct call, or submit an unhurried reservation enquiry below.
          </p>
        </div>

        {/* 5 Commercial Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          
          {/* 1. WhatsApp Card */}
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-5 rounded-3xl bg-[#FAF6EF] border-2 border-[#25D366]/30 hover:border-[#25D366] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#25D366]/15 text-[#128C7E] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors shadow-inner">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#128C7E] uppercase tracking-wider block">
                  Instant Chat
                </span>
                <h4 className="font-serif text-lg font-bold text-[#132422]">
                  WhatsApp Concierge
                </h4>
                <p className="text-xs text-[#344E4A] mt-1 font-mono">
                  {PHONE_DISPLAY}
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-[#E4D9C8] flex items-center justify-between text-xs font-bold text-[#128C7E]">
              <span>Start WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* 2. Direct Phone Call Card */}
          <motion.a
            href={`tel:${PHONE_DISPLAY}`}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-5 rounded-3xl bg-[#FAF6EF] border-2 border-[#E4D9C8] hover:border-[#1A96AA] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E5F3F5] text-[#116B7B] flex items-center justify-center group-hover:bg-[#1A96AA] group-hover:text-white transition-colors shadow-inner">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#116B7B] uppercase tracking-wider block">
                  Direct Line
                </span>
                <h4 className="font-serif text-lg font-bold text-[#132422]">
                  Phone Reservations
                </h4>
                <p className="text-xs text-[#344E4A] mt-1 font-mono">
                  {PHONE_DISPLAY}
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-[#E4D9C8] flex items-center justify-between text-xs font-bold text-[#116B7B]">
              <span>Call Reception</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* 3. Instagram Social Card */}
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-5 rounded-3xl bg-[#FAF6EF] border-2 border-[#E1306C]/30 hover:border-[#E1306C] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F58529]/20 via-[#DD2A7B]/20 to-[#8134AF]/20 text-[#DD2A7B] flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-[#F58529] group-hover:via-[#DD2A7B] group-hover:to-[#8134AF] group-hover:text-white transition-colors shadow-inner">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#DD2A7B] uppercase tracking-wider block">
                  Reels & Stories
                </span>
                <h4 className="font-serif text-lg font-bold text-[#132422]">
                  Instagram Feed
                </h4>
                <p className="text-xs text-[#344E4A] mt-1 font-medium">
                  Watch Resort Stories
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-[#E4D9C8] flex items-center justify-between text-xs font-bold text-[#DD2A7B]">
              <span>View On Instagram</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* 4. Email Card */}
          <motion.a
            href="mailto:stay@coorglaya.com"
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-5 rounded-3xl bg-[#FAF6EF] border-2 border-[#E4D9C8] hover:border-[#A3733E] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EFE8DC] text-[#A3733E] flex items-center justify-center group-hover:bg-[#A3733E] group-hover:text-white transition-colors shadow-inner">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#A3733E] uppercase tracking-wider block">
                  Email Support
                </span>
                <h4 className="font-serif text-lg font-bold text-[#132422]">
                  stay@coorglaya.com
                </h4>
                <p className="text-xs text-[#344E4A] mt-1">
                  Bookings & buyout queries
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-[#E4D9C8] flex items-center justify-between text-xs font-bold text-[#A3733E]">
              <span>Send Email</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

          {/* 5. Location Directions Card */}
          <motion.a
            href="https://maps.google.com/?q=Kushalnagar+Coorg+Karnataka"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-5 rounded-3xl bg-[#FAF6EF] border-2 border-[#E4D9C8] hover:border-[#132422] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#EFE8DC] text-[#132422] flex items-center justify-center group-hover:bg-[#132422] group-hover:text-white transition-colors shadow-inner">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#635546] uppercase tracking-wider block">
                  Kushalnagar Hub
                </span>
                <h4 className="font-serif text-lg font-bold text-[#132422]">
                  Resort Location
                </h4>
                <p className="text-xs text-[#344E4A] mt-1 line-clamp-2">
                  Teppadakandi, Kushalnagar, Kodagu
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-[#E4D9C8] flex items-center justify-between text-xs font-bold text-[#132422]">
              <span>Google Maps</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>

        </div>

        {/* Main Reservation Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
          
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 space-y-4 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#132422]">
                Reservation Concierge
              </h3>
              <p className="text-xs sm:text-sm text-[#344E4A] leading-relaxed">
                Whether booking a romantic weekend across our 15 boutique suites or planning a grand celebration on the 500-guest lawn, our dedicated team will assist you personally.
              </p>

              <div className="space-y-3 pt-2 text-xs text-[#344E4A]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#A3733E]" />
                  <span>Reception Active: 24/7 for In-House Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Direct Booking Price Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FAF6EF] border-2 border-[#E4D9C8] p-6 sm:p-8 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#132422] block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#1A96AA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#132422] block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#1A96AA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#132422] block">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 74116 95533"
                    className="w-full px-4 py-3 text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#1A96AA]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#132422] block">Party Size</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#1A96AA]"
                  >
                    <option value="2 Guests">2 Guests (Couple / Deluxe)</option>
                    <option value="4-8 Guests">4–8 Guests (Family / Verandah)</option>
                    <option value="15-30 Guests">15–30 Guests (Group Stays)</option>
                    <option value="Full Resort Buyout">Full Resort Buyout (~45 Guests)</option>
                    <option value="Lawn Event (50-500 Guests)">Lawn Celebration (50–500 Guests)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#132422] block">Target Date of Stay</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium focus:outline-none focus:border-[#1A96AA]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#132422] block">Special Requirements / Notes</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your room preferences, food requirements, or event plans..."
                  className="w-full px-4 py-3 text-xs bg-white rounded-xl border border-[#D5C7B2] text-[#132422] font-medium resize-none focus:outline-none focus:border-[#1A96AA]"
                />
              </div>

              <motion.button
                type="submit"
                disabled={formState !== 'idle'}
                whileHover={formState === 'idle' ? { scale: 1.02 } : {}}
                whileTap={formState === 'idle' ? { scale: 0.98 } : {}}
                transition={springTransition}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#132422] hover:bg-[#1E3633] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {formState === 'loading' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Preparing Request...</span>
                  </>
                )}
                {formState === 'success' && (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Enquiry Dispatched · We will reach out shortly</span>
                  </>
                )}
                {formState === 'idle' && (
                  <>
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                    <span>Submit Reservation Request</span>
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
