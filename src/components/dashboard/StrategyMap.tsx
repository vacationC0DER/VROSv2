import React from 'react';
import { DollarSign, Users, Briefcase, BookOpen } from 'lucide-react';
import { Perspective } from './strategy-map/Perspective';
import { MissionStatement } from './strategy-map/MissionStatement';
import { useStrategyMapStore } from '../../stores/strategyMapStore';

const perspectiveIcons = {
  financial: DollarSign,
  customer: Users,
  internal: Briefcase,
  enablers: BookOpen
};

export function StrategyMap() {
  const { perspectives } = useStrategyMapStore();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Strategy Map</h2>
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <MissionStatement />
        
        <div className="space-y-8">
          {Object.entries(perspectives).map(([id, perspective]) => (
            <Perspective
              key={id}
              perspectiveId={id}
              title={perspective.title}
              color={perspective.color}
              icon={perspectiveIcons[id as keyof typeof perspectiveIcons]}
              objectives={perspective.objectives}
            />
          ))}
        </div>
      </div>
    </div>
  );
}