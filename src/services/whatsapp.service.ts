import twilio from 'twilio';
import { env } from '../config/env';

const client = twilio(
  env.TWILIO_ACCOUNT_SID,
  env.TWILIO_AUTH_TOKEN
);

export async function sendMessage(to: string, message: string) {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_WHATSAPP_NUMBER) {
    throw new Error('Twilio environment variables are not configured');
  }

  await client.messages.create({
    body: message,
    from: env.TWILIO_WHATSAPP_NUMBER,
    to,
  });
}
