import React from 'react';

interface StatusBadgeProps {
  status: 'on_track' | 'caution' | 'at_risk';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'on_track':
        return 'bg-green-100 text-green-800';
      case 'caution':
        return 'bg-yellow-100 text-yellow-800';
      case 'at_risk':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status.replace('_', ' ')}
    </span>
  );
}