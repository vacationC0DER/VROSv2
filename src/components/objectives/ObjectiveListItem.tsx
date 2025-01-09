import React from 'react';
import { ChevronDown, ChevronRight, Target, Users, Calendar } from 'lucide-react';
import { ObjectiveProgress } from './ObjectiveProgress';
import { ObjectiveStatusBadge } from './ObjectiveStatusBadge';
import type { Objective } from '../../types/objective';

interface ObjectiveListItemProps {
  objective: Objective;
  childObjectives: Objective[];
  isExpanded: boolean;
  onToggle: () => void;
  level: number;
}

export function ObjectiveListItem({
  objective,
  childObjectives,
  isExpanded,
  onToggle,
  level
}: ObjectiveListItemProps) {
  const indentClass = level > 0 ? `ml-${level * 8}` : '';

  return (
    <div className={`space-y-2 ${indentClass}`}>
      <div className="bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggle}
              className="text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>

            <div className="flex-1 flex items-center gap-6">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Target className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{objective.title}</h3>
                  {objective.description && (
                    <p className="text-sm text-gray-600 truncate">{objective.description}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Q4 2024</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{objective.department?.name}</span>
                </div>
                <div className="w-32">
                  <ObjectiveProgress progress={objective.progress || 0} />
                </div>
                <ObjectiveStatusBadge status={objective.status} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && childObjectives.length > 0 && (
        <div className="space-y-2 pl-4 border-l-2 border-gray-100">
          {childObjectives.map(childObjective => (
            <ObjectiveListItem
              key={childObjective.id}
              objective={childObjective}
              childObjectives={[]}
              isExpanded={false}
              onToggle={() => {}}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}