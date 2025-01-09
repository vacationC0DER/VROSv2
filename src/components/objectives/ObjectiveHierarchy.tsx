import React, { useState, useEffect } from 'react';
import { ObjectiveCard } from './ObjectiveCard';
import { ProjectCard } from './ProjectCard';
import { fetchObjectives } from '../../lib/api/objectives';
import type { Objective } from '../../types/objective';

export function ObjectiveHierarchy() {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadObjectives() {
      try {
        const data = await fetchObjectives();
        setObjectives(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load objectives');
      } finally {
        setLoading(false);
      }
    }

    loadObjectives();
  }, []);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  if (loading) {
    return <div className="text-center py-8">Loading objectives...</div>;
  }

  if (error) {
    return <div className="text-red-600 py-8">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-6">
        <button 
          className="text-sm text-gray-600 hover:text-gray-900"
          onClick={() => setExpandedIds(new Set())}
        >
          Collapse All
        </button>
        <button className="text-sm text-gray-600 hover:text-gray-900">
          View options
        </button>
      </div>

      <div className="space-y-4">
        {objectives.map((objective) => (
          <ObjectiveCard
            key={objective.id}
            id={objective.id}
            title={objective.title}
            progress={objective.progress}
            status={objective.status}
            dueDate={new Date(objective.created_at).getFullYear().toString()}
            department={objective.department?.name || 'Unknown'}
            keyPoints={objective.description ? [objective.description] : undefined}
            isExpanded={expandedIds.has(objective.id)}
            onToggle={() => toggleExpanded(objective.id)}
          >
            {objective.children?.map((child) => (
              <div key={child.id} className="ml-8">
                <ObjectiveCard
                  id={child.id}
                  title={child.title}
                  progress={child.progress}
                  status={child.status}
                  dueDate={`Q${Math.ceil((new Date(child.created_at).getMonth() + 1) / 3)} ${new Date(child.created_at).getFullYear()}`}
                  department={objective.department?.name || 'Unknown'}
                  isExpanded={expandedIds.has(child.id)}
                  onToggle={() => toggleExpanded(child.id)}
                />
              </div>
            ))}
          </ObjectiveCard>
        ))}
      </div>
    </div>
  );
}