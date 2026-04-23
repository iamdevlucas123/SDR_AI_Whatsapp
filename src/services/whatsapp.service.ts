import twilio from 'twilio';
import { env } from '../config/env';

function getTwilioClient() {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN || !env.TWILIO_WHATSAPP_NUMBER) {
    throw new Error('Twilio environment variables are not configured');
  }

  if (!env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
    throw new Error('TWILIO_ACCOUNT_SID must start with AC');
  }

  return twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
}

export async function sendMessage(to: string, message: string) {
  const client = getTwilioClient();

  await client.messages.create({
    body: message,
    from: env.TWILIO_WHATSAPP_NUMBER,
    to,
  });
}
