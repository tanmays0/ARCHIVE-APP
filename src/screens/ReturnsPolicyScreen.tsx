import React from 'react';
import { PolicyScreen } from './PolicyScreen';

export function ReturnsPolicyScreen() {
  return (
    <PolicyScreen
      eyebrow="Care"
      title="Returns & refunds"
      subtitle="14-day as-described guarantee."
      sections={[
        {
          heading: 'Eligibility',
          body: 'Return within 14 days of delivery if the piece is not as described. Authentication tags must remain attached and the item must be unworn beyond a home try-on.',
        },
        {
          heading: 'How to start a return',
          body: 'Contact help@archive.market with your order number and photos. We will share a prepaid return label when the return is approved.',
        },
        {
          heading: 'Refunds',
          body: 'Refunds are issued to the original payment method within 5–7 business days after we inspect the returned piece.',
        },
        {
          heading: 'Final sale',
          body: 'Items marked Final Sale or with removed authentication tags cannot be returned.',
        },
      ]}
    />
  );
}
