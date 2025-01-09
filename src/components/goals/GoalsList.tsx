import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Target, Users, Calendar } from 'lucide-react';
import { useObjectiveStore } from '../../stores/objectiveStore';
import { useProjectStore } from '../../stores/projectStore';

export function GoalsList() {
  const { objectives } = useObjectiveStore();
  const { projects } = useProjectStore();
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());

  const toggleGoal = (id: string) => {
    const newExpanded = new Set(expandedGoals);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedGoals(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'at_risk': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressBar = (progress: number) => (
    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-indigo-600"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  return (
    <div className="space-y-4">
      {objectives.map((objective) => {
        const relatedProjects = projects.filter(p => p.objective_id === objective.id);
        const isExpanded = expandedGoals.has(objective.id);

        return (
          <div key={objective.id} className="space-y-2">
            {/* Goal Header */}
            <div 
              className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleGoal(objective.id)}
            >
              <button className="text-gray-500">
                {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>
              
              <Target className="h-5 w-5 text-indigo-600" />
              
              <div className="flex-1">
                <h3 className="font-medium">{objective.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
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

              {getProgressBar(objective.progress || 0)}
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(objective.status)}`}>
                {objective.status.replace('_', ' ')}
              </span>
            </div>

            {/* Projects List */}
            {isExpanded && relatedProjects.length > 0 && (
              <div className="ml-10 space-y-2">
                {relatedProjects.map((project) => (
                  <div 
                    key={project.id}
                    className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-gray-600">{project.description}</p>
                    </div>

                    {getProgressBar(project.progress)}
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}