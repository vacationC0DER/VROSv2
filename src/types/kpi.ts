export interface KPI {
  id: string;
  title: string;
  value: string;
  target: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  category: 'financial' | 'customer' | 'internal' | 'enablers';
  description?: string;
}