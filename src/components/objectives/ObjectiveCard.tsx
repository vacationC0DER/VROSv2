import React from 'react';
import { ChevronRight, ChevronDown, Target } from 'lucide-react';
import { ObjectiveProgress } from './ObjectiveProgress';
import { ObjectiveStatusBadge } from './ObjectiveStatusBadge';
import type { Objective } from '../../types/objective';

interface ObjectiveCardProps {
  objective: Objective;
  childObjectives: Objective[];
  isExpanded: boolean;
  onToggle: () => void;
  level: number;
  onClick: () => void;
}

export function ObjectiveCard({
  objective,
  childObjectives,
  isExpanded,
  onToggle,
  level,
  onClick
}: ObjectiveCardProps) {
  const indentClass = level > 0 ? `ml-${level * 4}` : '';

  return (
    <div className={`space-y-2 ${indentClass}`}>
      <div 
        className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
        onClick={onClick}
      >
        <div className="p-3">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1 bg-indigo-50 rounded">
                  <Target className="h-3.5 w-3.5 text-indigo-600" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 truncate">{objective.title}</h3>
                <ObjectiveStatusBadge status={objective.status} />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <ObjectiveProgress progress={objective.progress || 0} />
                </div>
                <span className="text-xs text-gray-500">Q4 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && childObjectives.length > 0 && (
        <div className="space-y-2 pl-4 border-l-2 border-gray-100">
          {childObjectives.map(childObjective => (
            <ObjectiveCard
              key={childObjective.id}
              objective={childObjective}
              childObjectives={[]}
              isExpanded={false}
              onToggle={() => {}}
              level={level + 1}
              onClick={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}