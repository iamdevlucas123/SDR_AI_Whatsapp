import OpenAI from 'openai';
import { SDR_PROMPT } from '../prompts/sdr.prompt';
import { env } from '../config/env';

function getOpenAIClient() {
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  return new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });
}

export async function generateAIResponse(userMessage: string) {
  const client = getOpenAIClient();

  const response = await client.chat.completions.create({
    model: env.OPENAI_MODEL,
    messages: [
      { role: 'system', content: SDR_PROMPT },
      { role: 'user', content: userMessage },
    ],
  });

  return response.choices[0]?.message?.content?.trim() || 'Não consegui responder agora.';
}
