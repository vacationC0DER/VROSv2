import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';

export function formatMessageTime(dateString: string): string {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return format(date, 'HH:mm');
  }
  
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  
  if (new Date().getFullYear() === date.getFullYear()) {
    return format(date, 'MMM d');
  }
  
  return format(date, 'MM/dd/yyyy');
}

export function formatTimeAgo(date: Date | string): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(parsedDate, { addSuffix: true });
}