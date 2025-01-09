import React from 'react';

interface ObjectiveProgressProps {
  progress: number;
}

export function ObjectiveProgress({ progress }: ObjectiveProgressProps) {
  const getProgressColor = () => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-600">{progress}%</span>
    </div>
  );
}