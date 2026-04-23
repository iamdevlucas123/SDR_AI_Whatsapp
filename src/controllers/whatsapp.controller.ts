import { Request, Response } from 'express';
import { generateAIResponse } from '../services/openai.service';
import { findLeadByPhone, saveLead, updateLeadQualification } from '../services/lead.service';
import { sendMessage } from '../services/whatsapp.service';

export async function handleIncomingMessage(req: Request, res: Response) {
  try {
    const message = typeof req.body?.Body === 'string' ? req.body.Body.trim() : '';
    const from = typeof req.body?.From === 'string' ? req.body.From.trim() : '';

    if (!message || !from) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    const lead = await findLeadByPhone(from);

    if (!lead) {
      await saveLead({ phone: from, status: 'new' });
    }

    await updateLeadQualification(from, message);

    const aiResponse = await generateAIResponse(message);
    await sendMessage(from, aiResponse);

    return res.sendStatus(200);
  } catch (error) {
    console.error('Failed to handle incoming WhatsApp message', error);
    return res.sendStatus(500);
  }
}
