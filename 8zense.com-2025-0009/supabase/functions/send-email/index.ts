import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Webhook } from 'standardwebhooks';
import { Resend } from 'resend';
import { renderAsync } from '@react-email/components';

const resend = new Resend(process.env.RESEND_API_KEY as string);
const hookSecret = process.env.SEND_EMAIL_HOOK_SECRET as string;

const handler = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method !== 'POST') {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('not allowed');
    return;
  }

  let payload = '';
  req.on('data', chunk => {
    payload += chunk;
  });

  req.on('end', async () => {
    const headers = req.headers as Record<string, string>;
    const wh = new Webhook(hookSecret);
    try {
      const {
        user,
        email_data: { token, token_hash, redirect_to, email_action_type },
      } = wh.verify(payload, headers) as {
        user: {
          email: string;
        };
        email_data: {
          token: string;
          token_hash: string;
          redirect_to: string;
          email_action_type: string;
        };
      };

      // Your logic here

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: (error as Error).message }));
    }
  });
};

const server = createServer(handler);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});