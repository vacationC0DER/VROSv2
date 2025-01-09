import React from 'react';

interface ArrowProps {
  direction: 'up' | 'diagonal-right' | 'diagonal-left';
}

export function Arrow({ direction }: ArrowProps) {
  const getPath = () => {
    switch (direction) {
      case 'up':
        return 'M 10,50 L 10,10 L 20,20 L 10,10 L 0,20';
      case 'diagonal-right':
        return 'M 0,50 L 40,10 L 35,20 L 40,10 L 30,5';
      case 'diagonal-left':
        return 'M 40,50 L 0,10 L 5,20 L 0,10 L 10,5';
    }
  };

  return (
    <div className="flex justify-center">
      <svg width="40" height="60" className="text-gray-400">
        <path
          d={getPath()}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}