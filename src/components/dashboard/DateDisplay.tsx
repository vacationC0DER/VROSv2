import React from 'react';
import { format } from 'date-fns';

export function DateDisplay() {
  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM d, yyyy');

  return (
    <div className="text-right text-gray-600">
      <p className="text-sm font-medium">{formattedDate}</p>
    </div>
  );
}