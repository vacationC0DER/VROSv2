import React from 'react';
import { ChevronDown, ChevronRight, Target, BarChart2 } from 'lucide-react';
import type { CoreObjective } from '../../../types/objective';

interface CoreObjectiveCardProps {
  objective: CoreObjective;
  isExpanded: boolean;
  onToggle: () => void;
}

export function CoreObjectiveCard({ objective, isExpanded, onToggle }: CoreObjectiveCardProps) {
  const getCategoryColor = () => {
    switch (objective.category) {
      case 'financial': return 'bg-blue-50 text-blue-700';
      case 'customer': return 'bg-emerald-50 text-emerald-700';
      case 'process': return 'bg-purple-50 text-purple-700';
      case 'enabler': return 'bg-amber-50 text-amber-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50"
        onClick={onToggle}
      >
        <div className="flex items-start gap-4">
          <button className="mt-1 text-gray-400 hover:text-gray-600">
            {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getCategoryColor()}`}>
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{objective.title}</h3>
                  {objective.description && (
                    <p className="mt-1 text-sm text-gray-600">{objective.description}</p>
                  )}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getCategoryColor()}`}>
                {objective.category}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Overall Progress</span>
                  <span className="font-medium">{objective.overall_progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${objective.overall_progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <BarChart2 className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Objectives</p>
                  <p className="font-medium">{objective.total_objectives}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Target className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="font-medium">{objective.completed_objectives}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}