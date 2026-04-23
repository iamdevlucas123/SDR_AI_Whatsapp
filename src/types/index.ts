export type LeadStatus = 'new' | 'qualified' | 'lost';

export interface LeadUpsertInput {
  phone: string;
  name?: string;
  interest?: string;
  status?: LeadStatus;
}
