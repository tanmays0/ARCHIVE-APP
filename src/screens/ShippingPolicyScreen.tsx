import React from 'react';
import { PolicyScreen } from './PolicyScreen';

export function ShippingPolicyScreen() {
  return (
    <PolicyScreen
      eyebrow="Delivery"
      title="Shipping policy"
      subtitle="How authenticated pieces reach you across India."
      sections={[
        {
          heading: 'Domestic shipping',
          body: 'We ship pan-India via trusted couriers. Most orders leave our facility within 1–2 business days after payment confirmation.',
        },
        {
          heading: 'Delivery windows',
          body: 'Metro cities typically arrive in 3–5 business days. Other pin codes may take 5–7 business days. You will receive tracking once the parcel is handed over.',
        },
        {
          heading: 'Packaging',
          body: 'Pieces ship in protective packaging with authenticity tags attached. Do not remove tags if you may return the item.',
        },
        {
          heading: 'Duties & taxes',
          body: 'Listed prices are in INR and inclusive of applicable taxes unless otherwise stated at checkout.',
        },
      ]}
    />
  );
}
