export interface Communication {
  id: string;
  type: 'email' | 'phone' | 'sms';
  subject?: string;
  content: string;
  direction: 'inbound' | 'outbound';
  status: 'draft' | 'sent' | 'received' | 'failed';
  sent_at?: string;
  created_at: string;
  created_by: string;
}

export interface Contact {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  propertyValue?: string;
  communications?: Communication[];
}

export interface Stage {
  id: string;
  title: string;
  color: string;
  contacts: Contact[];
}