import { renderAsync } from '@react-email/components';
import React from 'react';

const MagicLinkEmail: React.FC = () => {
  return (
    <div>
      <h1>Magic Link</h1>
      <p>Click the link below to sign in:</p>
      <a href="https://8zense.com/magic-link">Sign In</a>
    </div>
  );
};

export default MagicLinkEmail;