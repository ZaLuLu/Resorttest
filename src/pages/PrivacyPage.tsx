import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { resortData } from '../data/resortData';
import { PageHeader } from '../components/common/PageHeader';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-28 text-ink-primary overflow-x-hidden">
      <PageHeader
        badge="TRANSPARENCY & DATA"
        title="Privacy Notice"
        description="A plain-language explanation of how your information is handled when you enquire with Coorg Laya Resort."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-ink-primary/8 bg-white p-8 sm:p-14 space-y-8 text-xs sm:text-sm text-ink-secondary leading-relaxed font-light shadow-sm sleek-card">
          <div className="flex items-center gap-3 text-butter-700 border-b border-ink-primary/8 pb-4">
            <ShieldCheck className="size-6 text-butter-600" />
            <h2 className="font-heading text-2xl text-ink-primary font-medium">
              Guest Privacy Commitment
            </h2>
          </div>

          <section className="space-y-3">
            <h3 className="font-heading text-lg text-ink-primary font-medium">
              1. Information Collected Through Enquiries
            </h3>
            <p>
              When you submit a reservation or event enquiry through this website, we collect only the necessary contact details you choose to share:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-ink-muted">
              <li>Your Name</li>
              <li>Your Email Address</li>
              <li>Your Phone Number (if provided)</li>
              <li>Expected Check-in / Check-out Dates & Number of Guests</li>
              <li>Any optional message or special celebration notes</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-heading text-lg text-ink-primary font-medium">
              2. How Your Information Is Used
            </h3>
            <p>
              Your details are used solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-ink-muted">
              <li>Respond to your stay and event availability enquiries</li>
              <li>Confirm booking dates and tariff quotations directly with you</li>
              <li>Assist with resort check-in coordination and hospitality requests</li>
            </ul>
            <p className="text-ink-muted italic">
              We never sell, trade, or distribute your personal information to third-party marketing companies.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-heading text-lg text-ink-primary font-medium">
              3. Data Security & Contact
            </h3>
            <p>
              Enquiries are delivered directly to our official reservation team at{' '}
              <a
                href={`mailto:${resortData.contact.reservationEmail}`}
                className="text-butter-700 font-medium underline hover:text-powder-700"
              >
                {resortData.contact.reservationEmail}
              </a>
              . If you have any questions or wish to update your details, please reach out to us at this address.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
