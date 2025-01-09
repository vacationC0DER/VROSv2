import React from 'react';
import { Award } from 'lucide-react';

interface KarmaDisplayProps {
  points: number;
  showIcon?: boolean;
}

export function KarmaDisplay({ points, showIcon = true }: KarmaDisplayProps) {
  return (
    <div className="flex items-center gap-1 text-gray-600">
      {showIcon && <Award className="h-4 w-4" />}
      <span className="text-sm font-medium">
        {points} karma
      </span>
    </div>
  );
}