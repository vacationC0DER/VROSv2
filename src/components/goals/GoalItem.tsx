import React from 'react';
import { ChevronDown, ChevronRight, Calendar, Users } from 'lucide-react';
import { type Objective } from '../../types';
import { ProjectsList } from './ProjectsList';

interface GoalItemProps {
  objective: Objective;
  isExpanded: boolean;
  onToggle: () => void;
}

export function GoalItem({ objective, isExpanded, onToggle }: GoalItemProps) {
  const getStatusColor = () => {
    switch (objective.status) {
      case 'completed': return 'text-green-600';
      case 'at_risk': return 'text-red-600';
      case 'in_progress': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-2">
      <div 
        className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
      >
        <button className="text-gray-500">
          {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </button>

        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{objective.title}</h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Q4 2024</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{objective.department?.name}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-32">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${objective.progress || 0}%` }}
              />
            </div>
          </div>

          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {objective.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      {isExpanded && <ProjectsList objectiveId={objective.id} />}
    </div>
  );
}