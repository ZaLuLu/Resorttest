import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  ExternalLink,
  User,
  Phone,
  Calendar,
  Users,
  MessageSquare,
  Send,
  CheckCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { resortData } from '../data/resortData';
import { PageHeader } from '../components/common/PageHeader';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guests',
    enquiryType: 'stay',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
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
      setErrorMessage('Please provide your name and email address.');
      return;
    }

    try {
      const subject = encodeURIComponent(
        `Reservation Enquiry - ${formData.enquiryType.toUpperCase()} - ${formData.name}`
      );
      const body = encodeURIComponent(
        `Dear Coorg Laya Resort Team,\n\n` +
        `I would like to enquire with the following details:\n\n` +
        `• Guest Name: ${formData.name}\n` +
        `• Contact Phone: ${formData.phone || 'Not provided'}\n` +
        `• Email Address: ${formData.email}\n` +
        `• Check-in Date: ${formData.checkIn || 'To be decided'}\n` +
        `• Check-out Date: ${formData.checkOut || 'To be decided'}\n` +
        `• Total Guests: ${formData.guests}\n` +
        `• Enquiry Type: ${formData.enquiryType}\n\n` +
        `Additional Message / Requests:\n${formData.message || 'No additional notes.'}\n\n` +
        `Warm regards,\n${formData.name}`
      );

      const mailtoUrl = `mailto:${resortData.contact.reservationEmail}?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;

      setTimeout(() => {
        setStatus('sent');
      }, 600);
    } catch {
      setStatus('error');
      setErrorMessage('Unable to dispatch email. Please email us directly at ' + resortData.contact.reservationEmail);
    }
  };

  return (
    <div className="space-y-24 pb-28 text-ink-primary overflow-x-hidden">
      <PageHeader
        badge="RESERVATION DESK"
        title="Contact & Reservations"
        description="Connect directly with our reservation team for room availability, group vacations, and celebration enquiries in Kushalnagar, Kodagu."
        bgImage="https://coorglayaresort.com/_next/static/immutable/media/garden-terrace.3ya05pwj-jknx.jpeg"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Details & Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl border border-ink-primary/8 bg-white p-8 space-y-6 shadow-sm sleek-card">
              <span className="text-xs uppercase tracking-[0.25em] text-butter-700 font-semibold block">
                Official Resort Details
              </span>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-butter-100 text-butter-700 border border-butter-200 shrink-0 mt-1">
                  <MapPin className="size-6" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <span className="text-[0.68rem] uppercase tracking-wider text-ink-muted font-semibold block">
                    Resort Address
                  </span>
                  <p className="text-ink-primary font-bold">{resortData.brand.name}</p>
                  <p className="text-ink-secondary font-light">{resortData.contact.address.line1},</p>
                  <p className="text-ink-secondary font-light">{resortData.contact.address.line2},</p>
                  <p className="text-ink-secondary font-light">
                    {resortData.contact.address.town} - {resortData.contact.address.pincode},
                  </p>
                  <p className="text-ink-secondary font-light">
                    {resortData.contact.address.district}, {resortData.contact.address.state}, {resortData.contact.address.country}
                  </p>
                  <div className="pt-2">
                    <a
                      href={resortData.contact.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-butter-700 hover:text-powder-700 uppercase tracking-wider font-bold"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pt-4 border-t border-ink-primary/8">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-powder-100 text-powder-700 border border-powder-200 shrink-0 mt-1">
                  <Mail className="size-6" />
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <span className="text-[0.68rem] uppercase tracking-wider text-ink-muted font-semibold block">
                    Reservation Email
                  </span>
                  <a
                    href={`mailto:${resortData.contact.reservationEmail}`}
                    className="text-ink-primary hover:text-butter-700 transition-colors font-medium break-all block"
                  >
                    {resortData.contact.reservationEmail}
                  </a>
                  <p className="text-[0.7rem] text-ink-muted italic">
                    Direct verified channel for booking dates and celebration confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Summary Box */}
            <div className="rounded-3xl border border-powder-200 bg-powder-50/70 p-8 space-y-3 text-xs shadow-sm">
              <span className="text-[0.68rem] uppercase tracking-wider text-powder-800 font-bold block">
                Sanctuary Overview
              </span>
              <ul className="space-y-2 text-ink-secondary font-light">
                <li>• 15 Private Rooms (~45 overnight guests)</li>
                <li>• Open lawn event space for up to ~500 guests</li>
                <li>• Swimming pool, kids trampoline, badminton & volleyball</li>
              </ul>
            </div>
          </div>

          {/* Right: 7-Field Enquiry Form */}
          <div id="enquiry" className="lg:col-span-7 rounded-3xl border border-ink-primary/8 bg-white p-8 sm:p-12 shadow-sm sleek-card space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-butter-700 font-semibold block mb-1">
                Reservation & Celebration Enquiry
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl text-ink-primary font-normal">
                Send a Direct Message
              </h3>
              <p className="text-xs text-ink-muted mt-1">
                Fill in your anticipated travel dates or event scale. We will respond via email.
              </p>
            </div>

            {status === 'sent' ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-butter-100 text-butter-700 border border-butter-200">
                  <CheckCircle className="size-8" />
                </div>
                <h4 className="font-heading text-2xl text-ink-primary">Enquiry Prepared</h4>
                <p className="text-xs sm:text-sm text-ink-secondary max-w-md mx-auto leading-relaxed">
                  Your enquiry has been formatted and opened in your email client addressed to{' '}
                  <span className="text-butter-700 font-medium">{resortData.contact.reservationEmail}</span>.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="rounded-full border border-ink-primary/15 px-6 py-2.5 text-xs text-ink-primary hover:bg-sand-50 transition-colors"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-50 p-4 text-xs text-red-700">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary mb-1.5">
                      Your Full Name <span className="text-butter-700">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 size-4 text-ink-muted" />
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rohith Kumar"
                        className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50/50 py-3 pl-10 pr-4 text-sm text-ink-primary placeholder-ink-muted/60 focus:border-butter-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 size-4 text-ink-muted" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50/50 py-3 pl-10 pr-4 text-sm text-ink-primary placeholder-ink-muted/60 focus:border-butter-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary mb-1.5">
                      Email Address <span className="text-butter-700">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 size-4 text-ink-muted" />
                      <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rohith@example.com"
                        className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50/50 py-3 pl-10 pr-4 text-sm text-ink-primary placeholder-ink-muted/60 focus:border-butter-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary mb-1.5">
                      Enquiry Category
                    </label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50/50 py-3 px-4 text-sm text-ink-primary focus:border-butter-500 focus:bg-white focus:outline-none transition-all"
                    >
                      <option value="stay">Resort Stay (15 Rooms / ~45 Guests)</option>
                      <option value="event">Outdoor Event (Up to 500 Guests)</option>
                      <option value="general">General Information</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary mb-1.5">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3.5 size-4 text-ink-muted" />
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50/50 py-3 pl-10 pr-2 text-sm text-ink-primary focus:border-butter-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary mb-1.5">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-3.5 size-4 text-ink-muted" />
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50/50 py-3 pl-10 pr-2 text-sm text-ink-primary focus:border-butter-500 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-secondary mb-1.5">
                      Guest Count
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3.5 top-3.5 size-4 text-ink-muted" />
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50/50 py-3 pl-10 pr-2 text-sm text-ink-primary focus:border-butter-500 focus:bg-white focus:outline-none transition-all"
                      >
                        <option value="1-2 Guests">1 - 2 Guests</option>
                        <option value="3-5 Guests">3 - 5 Guests (Family)</option>
                        <option value="6-15 Guests">6 - 15 Guests (Group)</option>
                        <option value="16-45 Guests">16 - 45 Guests (Full Stay)</option>
                        <option value="50-100 Guests">50 - 100 Guests (Event)</option>
                        <option value="100-500 Guests">100 - 500 Guests (Event)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1.5">
                    Your Message / Special Requests
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 size-4 text-ink-muted" />
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please mention dates, number of rooms required, or event type..."
                      className="w-full rounded-2xl border border-ink-primary/15 bg-sand-50/50 py-3 pl-10 pr-4 text-sm text-ink-primary placeholder-ink-muted/60 focus:border-butter-500 focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <span className="text-[0.72rem] text-ink-muted italic">
                    Emails directly to {resortData.contact.reservationEmail}
                  </span>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-butter-400 px-9 py-3.5 text-xs font-bold uppercase tracking-wider text-ink-primary hover:bg-butter-300 transition-all shadow-md border border-butter-500/20 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{status === 'submitting' ? 'Preparing...' : 'Send Enquiry'}</span>
                    <Send className="size-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
