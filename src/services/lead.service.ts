import { prisma } from '../database/prisma';
import { LeadUpsertInput, LeadStatus } from '../types';

const POSITIVE_SIGNAL_REGEX =
  /\b(preco|preço|orcamento|orçamento|proposta|demo|demonstracao|demonstração|reuniao|reunião|contratar|implantacao|implantação)\b/i;
const INTEREST_REGEX =
  /\b(whatsapp|automacao|automação|ia|atendimento|leads|vendas|chatbot)\b/gi;
const NAME_REGEX =
  /\b(?:meu nome e|me chamo|sou o|sou a)\s+([a-zà-ÿ]+(?:\s+[a-zà-ÿ]+){0,2})/i;

function normalizeStatus(status?: string): LeadStatus | undefined {
  if (status === 'new' || status === 'qualified' || status === 'lost') {
    return status;
  }

  return undefined;
}

export function extractLeadAttributes(message: string) {
  const trimmedMessage = message.trim();
  const nameMatch = trimmedMessage.match(NAME_REGEX);
  const interestMatches = trimmedMessage.match(INTEREST_REGEX);
  const status: LeadStatus = POSITIVE_SIGNAL_REGEX.test(trimmedMessage) ? 'qualified' : 'new';

  return {
    name: nameMatch?.[1]
      ?.split(' ')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' '),
    interest: interestMatches ? Array.from(new Set(interestMatches.map((term) => term.toLowerCase()))).join(', ') : undefined,
    status,
  };
}

export async function saveLead(input: string | LeadUpsertInput) {
  const payload: LeadUpsertInput = typeof input === 'string' ? { phone: input } : input;
  const status = normalizeStatus(payload.status);

  return prisma.lead.upsert({
    where: { phone: payload.phone },
    update: {
      ...(payload.name ? { name: payload.name } : {}),
      ...(payload.interest ? { interest: payload.interest } : {}),
      ...(status ? { status } : {}),
    },
    create: {
      phone: payload.phone,
      ...(payload.name ? { name: payload.name } : {}),
      ...(payload.interest ? { interest: payload.interest } : {}),
      ...(status ? { status } : {}),
    },
  });
}

export async function findLeadByPhone(phone: string) {
  return prisma.lead.findUnique({
    where: { phone },
  });
}

export async function updateLeadQualification(phone: string, message: string) {
  const leadData = extractLeadAttributes(message);

  return saveLead({
    phone,
    ...leadData,
  });
}
