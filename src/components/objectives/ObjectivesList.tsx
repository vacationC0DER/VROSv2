import React, { useState, useEffect } from 'react';
import { ObjectiveCard } from './ObjectiveCard';
import { ObjectiveListItem } from './ObjectiveListItem';
import { useObjectiveStore } from '../../stores/objectiveStore';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { EmptyState } from '../shared/EmptyState';

export function ObjectivesList() {
  const { loading, error, fetchObjectives, getFilteredObjectives, viewMode } = useObjectiveStore();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchObjectives();
  }, [fetchObjectives]);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-600">{error}</div>;

  const filteredObjectives = getFilteredObjectives();
  
  if (!filteredObjectives.length) {
    return (
      <EmptyState
        title="No objectives found"
        description="No objectives match your current filters"
        actionLabel="Clear Filters"
        onAction={() => {
          useObjectiveStore.getState().setSelectedCategory(null);
          useObjectiveStore.getState().setSelectedStatus(null);
        }}
      />
    );
  }

  // Filter core objectives (those without parents)
  const coreObjectives = filteredObjectives.filter(obj => !obj.parent_objective_id);

  return (
    <div className="space-y-6">
      {coreObjectives.map(objective => (
        viewMode === 'grid' ? (
          <ObjectiveCard
            key={objective.id}
            objective={objective}
            childObjectives={filteredObjectives.filter(obj => obj.parent_objective_id === objective.id)}
            isExpanded={expandedIds.has(objective.id)}
            onToggle={() => toggleExpanded(objective.id)}
            level={0}
          />
        ) : (
          <ObjectiveListItem
            key={objective.id}
            objective={objective}
            childObjectives={filteredObjectives.filter(obj => obj.parent_objective_id === objective.id)}
            isExpanded={expandedIds.has(objective.id)}
            onToggle={() => toggleExpanded(objective.id)}
            level={0}
          />
        )
      ))}
    </div>
  );
}