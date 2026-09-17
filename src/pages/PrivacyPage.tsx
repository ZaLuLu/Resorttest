import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { resortData } from '../data/resortData';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-24 pb-28 bg-sand-50/70 text-riverbed-900 select-none">
      <PageHeader
        badge="Transparency & Privacy"
        title="Privacy Policy"
        description="Our straightforward guest privacy policy and direct reservation guidelines."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div className="clay-card p-6 sm:p-10 border-2 border-white shadow-clay space-y-6 text-sm text-riverbed-600 font-medium leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-riverbed-900">1. Information We Collect</h3>
            <p>
              When you submit an enquiry through our reservation forms, we receive your name, email address, phone number, estimated stay dates, and guest count to facilitate booking availability requests.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-riverbed-900">2. How We Use Your Information</h3>
            <p>
              Your contact details are strictly used to respond to your reservation inquiries, discuss event lawn requirements, and coordinate your visit to Coorg Laya Resort. We never sell, lease, or share personal data with third-party advertisers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-lg font-bold text-riverbed-900">3. Contact Us</h3>
            <p>
              If you have any questions regarding this policy or wish to update your details, please contact us directly at{' '}
              <a href={`mailto:${resortData.contact.reservationEmail}`} className="text-water-700 font-bold underline">
                {resortData.contact.reservationEmail}
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
