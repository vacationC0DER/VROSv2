import React from 'react';
import { ChevronDown, ChevronRight, Users, Calendar, Target } from 'lucide-react';
import { ObjectiveProgress } from '../ObjectiveProgress';
import { ObjectiveStatusBadge } from '../ObjectiveStatusBadge';
import type { Objective } from '../../../types/objective';

interface ObjectiveCardProps {
  objective: Objective;
  isExpanded: boolean;
  onToggle: () => void;
  level?: number;
}

export function ObjectiveCard({ objective, isExpanded, onToggle, level = 0 }: ObjectiveCardProps) {
  return (
    <div className={`border border-gray-200 rounded-lg bg-white ${level > 0 ? 'ml-8' : ''}`}>
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
      >
        <div className="flex items-start gap-3">
          <button className="mt-1 text-gray-400 hover:text-gray-600">
            {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-indigo-50 rounded-lg">
                  <Target className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{objective.title}</h3>
                  {objective.description && (
                    <p className="mt-1 text-sm text-gray-600">{objective.description}</p>
                  )}
                </div>
              </div>
              <ObjectiveStatusBadge status={objective.status} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Q4 2024</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{objective.department?.name}</span>
                </div>
              </div>

              <div>
                <ObjectiveProgress progress={objective.progress || 0} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}