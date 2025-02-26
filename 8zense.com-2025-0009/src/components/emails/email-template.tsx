import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  message,
}) => (
  <div>
    <h1>Hello, I am {firstName}!</h1>
    <p>You have received a new message from your Portfolio:</p>
    <p>{message}</p>
  </div>
);

export default EmailTemplate;           