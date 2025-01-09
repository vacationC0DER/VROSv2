import React from 'react';

interface ObjectiveStatusBadgeProps {
  status: string;
}

export function ObjectiveStatusBadge({ status }: ObjectiveStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'at_risk':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'in_progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`px-1.5 py-0.5 text-xs font-medium rounded-full border ${getStatusStyles()}`}>
      {status.replace('_', ' ')}
    </span>
  );
}