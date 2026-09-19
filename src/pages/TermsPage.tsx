import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { resortData } from '../data/resortData';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-24 pb-28 bg-[#FAF7F2] text-[#18110D] select-none">
      <PageHeader
        badge="Guest Guidelines & Policies"
        title="Terms & Booking Policy"
        description="Clear, transparent terms covering reservations, check-in, event hosting, and cancellations at Coorg Laya Resort."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="rounded-3xl bg-white p-6 sm:p-10 border border-[#E4D9C8] shadow-sm space-y-6 text-sm text-[#344E4A] font-medium leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#132422]">1. Reservations & Confirmation</h3>
            <p>
              Coorg Laya Resort operates 15 private guest suites and a 500-guest outdoor lawn. Reservations are confirmed upon advance payment or written confirmation from our concierge desk. Tariffs are subject to applicable government taxes.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#132422]">2. Check-In & Check-Out Timings</h3>
            <p>
              Standard check-in is at 1:00 PM and check-out is at 11:00 AM. Early check-in or late check-out is subject to room availability and prior arrangement with the management. Valid government-issued photo ID is required for all adult guests at check-in.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#132422]">3. Cancellation & Rescheduling Policy</h3>
            <p>
              Cancellations made 7 or more days prior to the scheduled arrival date are eligible for full rescheduling or refund subject to standard processing fees. Cancellations within 7 days of arrival may incur a retention charge equal to one night's stay. Event lawn buyouts follow custom contractual terms communicated during booking.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#132422]">4. Swimming Pool & Outdoor Amenities</h3>
            <p>
              The swimming pool, kids trampoline, badminton, and volleyball areas are amenities provided for registered resident guests. Children must be supervised by adults at all times around water bodies and play areas.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-[#132422]">5. Contact & Inquiries</h3>
            <p>
              For booking assistance, rate queries, or buyout details, contact our concierge directly at{' '}
              <a href={`mailto:${resortData.contact.email}`} className="text-[#1A96AA] font-bold underline">
                {resortData.contact.email}
              </a>{' '}
              or via WhatsApp at{' '}
              <a href={`https://wa.me/${resortData.contact.whatsapp}`} className="text-[#1A96AA] font-bold underline">
                {resortData.contact.phone}
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
