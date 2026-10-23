import React from 'react';
import { PolicyScreen } from './PolicyScreen';

export function TermsOfServiceScreen() {
  return (
    <PolicyScreen
      eyebrow="Legal"
      title="Terms of service"
      sections={[
        {
          heading: 'Independent marketplace',
          body: 'ARCHIVE is an independent curated resale marketplace. We are not affiliated with, authorized by, or endorsed by the brands listed on this app. All trademarks belong to their respective owners.',
        },
        {
          heading: 'As-is listings',
          body: 'All items are pre-owned and sold as described. Condition grades and photography are provided so you can buy with clarity.',
        },
        {
          heading: 'Orders',
          body: 'Placing an order constitutes an offer to purchase. We may cancel orders for pricing errors, stock issues, or suspected fraud.',
        },
        {
          heading: 'Governing law',
          body: 'These terms are governed by the laws of India. For disputes, contact help@archive.market first so we can resolve them quickly.',
        },
      ]}
    />
  );
}
