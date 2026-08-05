
export interface LeadsInterface {
  id: string;
  name: string;
  category: string;
  contact: number | string;
  stage: string;
  plan: string;
  lastContacted: Date | string;
  dateAdded: Date;
  notes: string;
  earningsFromLead: number;
}