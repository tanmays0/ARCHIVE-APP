import React from 'react';
import { PolicyScreen } from './PolicyScreen';

export function PrivacyPolicyScreen() {
  return (
    <PolicyScreen
      eyebrow="Legal"
      title="Privacy policy"
      sections={[
        {
          heading: 'What we collect',
          body: 'Account details, delivery address, order history, and support messages so we can fulfil purchases and improve ARCHIVE.',
        },
        {
          heading: 'How we use data',
          body: 'To process orders, send transactional updates, and — if you opt in — editorial newsletters. We do not sell personal data.',
        },
        {
          heading: 'Storage',
          body: 'Cart and profile preferences may be stored locally on your device. Server-side order records are retained as required for accounting and returns.',
        },
        {
          heading: 'Contact',
          body: 'Privacy questions: privacy@archive.market.',
        },
      ]}
    />
  );
}
