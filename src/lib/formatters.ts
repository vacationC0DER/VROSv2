import { formatDistanceToNow as formatDistance } from 'date-fns';

export function formatTimeAgo(date: Date | string): string {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return formatDistance(parsedDate, { addSuffix: true });
}