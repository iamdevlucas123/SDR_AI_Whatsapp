import { prisma } from '../database/prisma';

export async function saveLead(phone: string) {
  return prisma.lead.upsert({
    where: { phone },
    update: {},
    create: { phone },
  });
}
