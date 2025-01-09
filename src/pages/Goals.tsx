import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { GoalItem } from '../components/goals/GoalItem';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorAlert } from '../components/shared/ErrorAlert';
import { EmptyState } from '../components/shared/EmptyState';
import { useObjectiveStore } from '../stores/objectiveStore';
import { useProjectStore } from '../stores/projectStore';

export function Goals() {
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());
  const { objectives, loading: objectivesLoading, error: objectivesError, fetchObjectives } = useObjectiveStore();
  const { loading: projectsLoading, error: projectsError, fetchProjects } = useProjectStore();

  useEffect(() => {
    fetchObjectives();
    fetchProjects();
  }, [fetchObjectives, fetchProjects]);

  const loading = objectivesLoading || projectsLoading;
  const error = objectivesError || projectsError;

  const toggleGoal = (id: string) => {
    const newExpanded = new Set(expandedGoals);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedGoals(newExpanded);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!objectives?.length) {
    return (
      <EmptyState
        title="No goals found"
        description="Get started by creating your first goal"
        actionLabel="Create Goal"
        onAction={() => {/* TODO: Implement create goal */}}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Goals & Projects</h1>
          <p className="text-gray-600">Track and manage strategic objectives and their related projects</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            <span>View options</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          className="text-sm text-gray-600 hover:text-gray-900"
          onClick={() => setExpandedGoals(new Set())}
        >
          Collapse All
        </button>
        <button className="text-sm text-gray-600 hover:text-gray-900">
          View options
        </button>
      </div>

      <div className="space-y-4">
        {objectives.map((objective) => (
          <GoalItem
            key={objective.id}
            objective={objective}
            isExpanded={expandedGoals.has(objective.id)}
            onToggle={() => toggleGoal(objective.id)}
          />
        ))}
      </div>
    </div>
  );
}