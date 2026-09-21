import React, { useState } from 'react';
import { 
  Mail, MapPin, Compass, Phone, MessageSquare, Clock, 
  Car, Navigation, CheckCircle2, ArrowRight, Sparkles, Send, Instagram
} from 'lucide-react';
import { ContactEnquirySection } from '../components/sections/ContactEnquirySection';
import { PageHeader } from '../components/common/PageHeader';
import { CinematicReveal } from '../components/common/CinematicReveal';
import { Clay3DCard } from '../components/3d/Clay3DCard';
import { ClayImage } from '../components/common/ClayImage';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    stayType: '15 Suites Stay',
    guests: '2-4 Guests',
    dates: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const WHATSAPP_NUMBER = '917411695533';
  const PHONE_DISPLAY = '+91 7411695533';
  const INSTAGRAM_URL = 'https://www.instagram.com/p/Ddb0dXLBLPa/?stkn=MTd0ZzN2dGZzOTZrdQ==';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summary =
      `*Reservation Enquiry — Coorg Laya Resort*\n\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Phone:* ${formData.phone || 'Not provided'}\n` +
      `• *Email:* ${formData.email}\n` +
      `• *Stay Type:* ${formData.stayType}\n` +
      `• *Guests:* ${formData.guests}\n` +
      `• *Dates:* ${formData.dates || 'Flexible'}\n` +
      `• *Notes:* ${formData.message || 'None'}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const routes = [
    {
      from: 'From Bangalore (Bengaluru)',
      dist: '220 km · ~4 Hours',
      route: 'Bangalore-Mysore Expressway (NH 275) → Srirangapatna → Hunsur bypass → Kushalnagar',
      highlights: 'Smooth 10-lane expressway up to Mysore bypass, followed by scenic 4-lane state highway.',
    },
    {
      from: 'From Mysore (Mysuru)',
      dist: '85 km · ~1.5 - 2 Hours',
      route: 'Mysore Ring Road → Hunsur → Kushalnagar (NH 275)',
      highlights: 'Closest major railhead and domestic airport connection to Coorg Laya.',
    },
    {
      from: 'From Mangalore (Mangaluru)',
      dist: '135 km · ~3.5 Hours',
      route: 'Mangalore → Bantwal → Mani → Puttur → Sullia → Madikeri → Kushalnagar',
      highlights: 'Picturesque Western Ghats mountain pass via Sampaje ghat road.',
    },
  ];

  return (
    <div className="pt-24 pb-28 bg-[#FAF6EF] text-[#132422] space-y-20 select-none">
      
      {/* Page Header */}
      <PageHeader
        badge="Connect & Reserve"
        title="Contact Our Desk"
        description="Reach our direct reservation desk for room bookings, 500-guest lawn dates, and private resort buyout enquiries."
        bgImage="/images/resort/covered-seating.jpeg"
      />

      {/* Main Interactive Contact Section */}
      <ContactEnquirySection />

      {/* Direct Interactive Multi-Channel Reservation Suite */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Quick Channels & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <CinematicReveal className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
                <Sparkles className="w-4 h-4 text-[#A3733E]" />
                <span className="tracking-wide uppercase">Direct Concierge</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#132422] font-display leading-tight heading-balance">
                Get in Touch Instantly
              </h2>
              <p className="text-sm text-[#2C413E] font-normal leading-relaxed prose-pretty">
                Whether you have questions about our 15 private suites, catering for the 500-guest lawn, or local Kushalnagar sightseeing cabs, we are always here.
              </p>
            </CinematicReveal>

            <div className="space-y-4 pt-2">
              <CinematicReveal delay={0.1}>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Coorg Laya Team, I would like to enquire about booking suites at your resort.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#E8F8EE] text-[#1E7E34] flex items-center justify-center shadow-sm">
                    <MessageSquare className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase text-[#1E7E34]">Fastest Response</span>
                    <h4 className="font-display text-base font-bold text-[#132422]">WhatsApp Reservation Desk</h4>
                    <p className="text-xs text-[#2C413E] font-medium">{PHONE_DISPLAY} (9 AM – 9 PM)</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#1E7E34] group-hover:translate-x-1 transition-transform" />
                </a>
              </CinematicReveal>

              <CinematicReveal delay={0.15}>
                <a
                  href={`tel:${PHONE_DISPLAY}`}
                  className="p-5 rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6EF] border border-[#D5C7B2] text-[#A3733E] flex items-center justify-center shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase text-[#A3733E]">Direct Voice Call</span>
                    <h4 className="font-display text-base font-bold text-[#132422]">Resort Phone Line</h4>
                    <p className="text-xs text-[#2C413E] font-medium">{PHONE_DISPLAY}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A3733E] group-hover:translate-x-1 transition-transform" />
                </a>
              </CinematicReveal>

              <CinematicReveal delay={0.18}>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6EF] border border-[#D5C7B2] text-[#A3733E] flex items-center justify-center shadow-sm">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase text-[#A3733E]">Stories & Reels</span>
                    <h4 className="font-display text-base font-bold text-[#132422]">Instagram Profile</h4>
                    <p className="text-xs text-[#2C413E] font-medium">Follow our daily retreat moments</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#A3733E] group-hover:translate-x-1 transition-transform" />
                </a>
              </CinematicReveal>

              <CinematicReveal delay={0.2}>
                <a
                  href="mailto:stay@coorglaya.com"
                  className="p-5 rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] shadow-sm hover:shadow-md transition-all flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF6EF] border border-[#D5C7B2] text-[#137586] flex items-center justify-center shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] font-bold uppercase text-[#137586]">Event & Buyout RFPs</span>
                    <h4 className="font-display text-base font-bold text-[#132422]">Email Desk</h4>
                    <p className="text-xs text-[#2C413E] font-medium">stay@coorglaya.com</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#137586] group-hover:translate-x-1 transition-transform" />
                </a>
              </CinematicReveal>
            </div>
          </div>

          {/* Right: Direct Reservation Consultation Form */}
          <div className="lg:col-span-7">
            <CinematicReveal delay={0.2}>
              <div className="rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] p-6 sm:p-8 md:p-10 shadow-lg space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#132422]">
                    Submit Stay or Event Inquiry
                  </h3>
                  <p className="text-xs text-[#344E4A] mt-1">
                    Our host team responds within 2 hours with customized rates and confirmed suite allocations.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#132422] mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ananya Rao"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F5EFE6] border border-[#E4D9C8] text-xs font-medium text-[#132422] focus:outline-none focus:border-[#1A96AA]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#132422] mb-1.5">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F5EFE6] border border-[#E4D9C8] text-xs font-medium text-[#132422] focus:outline-none focus:border-[#1A96AA]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#132422] mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. ananya@example.com"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F5EFE6] border border-[#E4D9C8] text-xs font-medium text-[#132422] focus:outline-none focus:border-[#1A96AA]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#132422] mb-1.5">Type of Enquiry</label>
                      <select
                        value={formData.stayType}
                        onChange={(e) => setFormData({ ...formData, stayType: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-[#F5EFE6] border border-[#E4D9C8] text-xs font-medium text-[#132422] focus:outline-none focus:border-[#1A96AA]"
                      >
                        <option value="15 Suites Stay">Suite Booking (1 - 4 Suites)</option>
                        <option value="Exclusive 15-Suite Buyout">Full 15-Suite Resort Buyout (~45 Guests)</option>
                        <option value="500-Guest Lawn Wedding">Grand Lawn Wedding / Sangeet (Up to 500)</option>
                        <option value="Corporate Offsite">Corporate & Wellness Retreat</option>
                        <option value="Family Milestone">Family Birthday / Anniversary</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#132422] mb-1.5">Estimated Guests</label>
                      <input
                        type="text"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        placeholder="e.g. 6 Adults, 2 Kids"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F5EFE6] border border-[#E4D9C8] text-xs font-medium text-[#132422] focus:outline-none focus:border-[#1A96AA]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#132422] mb-1.5">Intended Dates</label>
                      <input
                        type="text"
                        value={formData.dates}
                        onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                        placeholder="e.g. 24th Oct - 27th Oct"
                        className="w-full px-4 py-3 rounded-2xl bg-[#F5EFE6] border border-[#E4D9C8] text-xs font-medium text-[#132422] focus:outline-none focus:border-[#1A96AA]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#132422] mb-1.5">Special Requests or Questions</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Interested in lawn dinner setup, extra rollaway bed, and early check-in."
                      className="w-full px-4 py-3 rounded-2xl bg-[#F5EFE6] border border-[#E4D9C8] text-xs font-medium text-[#132422] focus:outline-none focus:border-[#1A96AA]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-xs sm:text-sm font-bold tracking-wide uppercase text-white bg-[#137586] hover:bg-[#0F5E6C] shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Reservation Request</span>
                  </button>
                </form>
              </div>
            </CinematicReveal>
          </div>

        </div>
      </div>

      {/* Getting Here Driving Guide */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <CinematicReveal className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D5C7B2] bg-[#FAF6EF] px-4 py-1.5 text-xs font-bold text-[#A3733E] shadow-sm">
            <Car className="w-4 h-4 text-[#A3733E]" />
            <span className="tracking-wide uppercase">Travel & Accessibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#132422] font-display heading-balance leading-tight">
            Getting to Coorg Laya Resort
          </h2>
          <p className="text-sm text-[#2C413E] font-normal leading-relaxed prose-pretty">
            Kushalnagar, Kodagu District, Karnataka · 850m Altitude above sea level.
          </p>
        </CinematicReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routes.map((rt, idx) => (
            <CinematicReveal key={idx} delay={idx * 0.1}>
              <div className="p-6 rounded-3xl bg-[#FAF6EF] border border-[#E4D9C8] space-y-3 shadow-sm h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF6EF] text-[#137586] border border-[#D5C7B2] inline-block">
                    {rt.dist}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#132422]">
                    {rt.from}
                  </h3>
                  <p className="text-xs font-mono text-[#A3733E] font-bold">
                    {rt.route}
                  </p>
                  <p className="text-xs text-[#2C413E] font-normal leading-relaxed prose-pretty pt-1">
                    {rt.highlights}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4D9C8]/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#137586]">GPS Navigation Ready</span>
                  <Navigation className="w-4 h-4 text-[#137586]" />
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ContactPage;
