import { format } from 'date-fns';

export function getCurrentDayName(): string {
  return format(new Date(), 'EEEE').toLowerCase() as 
    'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
}