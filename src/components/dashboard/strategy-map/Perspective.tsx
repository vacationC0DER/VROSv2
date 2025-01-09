import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ObjectiveBox } from './ObjectiveBox';
import type { Objective } from '../../../stores/strategyMapStore';

interface PerspectiveProps {
  perspectiveId: string;
  title: string;
  color: string;
  icon: LucideIcon;
  objectives: Objective[];
}

export function Perspective({ 
  perspectiveId,
  title,
  color,
  icon: Icon,
  objectives 
}: PerspectiveProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className={`bg-${color}-100 p-2 rounded-lg`}>
          <Icon className={`h-5 w-5 text-${color}-600`} />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {objectives.map((objective) => (
          <ObjectiveBox
            key={objective.id}
            perspectiveId={perspectiveId}
            {...objective}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}