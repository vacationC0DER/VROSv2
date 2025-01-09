import React, { useState, useEffect } from 'react';
import { CoreObjectiveCard } from './CoreObjectiveCard';
import { ObjectiveCard } from './ObjectiveCard';
import { ProjectCard } from './ProjectCard';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { ErrorAlert } from '../../shared/ErrorAlert';
import { useCoreObjectiveStore } from '../../../stores/coreObjectiveStore';
import { useObjectiveStore } from '../../../stores/objectiveStore';
import { useProjectStore } from '../../../stores/projectStore';

export function ObjectiveHierarchy() {
  const { coreObjectives, loading: loadingCore, error: coreError, fetchCoreObjectives } = useCoreObjectiveStore();
  const { objectives, loading: loadingObjectives, error: objectivesError, fetchObjectives } = useObjectiveStore();
  const { projects, loading: loadingProjects, error: projectsError, fetchProjects } = useProjectStore();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchCoreObjectives();
    fetchObjectives();
    fetchProjects();
  }, [fetchCoreObjectives, fetchObjectives, fetchProjects]);

  const loading = loadingCore || loadingObjectives || loadingProjects;
  const error = coreError || objectivesError || projectsError;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message={error} />;
  }

  const toggleObjective = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  return (
    <div className="space-y-8">
      {coreObjectives.map((coreObjective) => {
        const childObjectives = objectives.filter(
          obj => obj.parent_objective_id === coreObjective.id
        );
        const isExpanded = expandedIds.has(coreObjective.id);

        return (
          <div key={coreObjective.id} className="space-y-4">
            <CoreObjectiveCard
              objective={coreObjective}
              isExpanded={isExpanded}
              onToggle={() => toggleObjective(coreObjective.id)}
            />

            {isExpanded && childObjectives.map((childObjective) => {
              const childIsExpanded = expandedIds.has(childObjective.id);
              const relatedProjects = projects.filter(
                p => p.objective_id === childObjective.id
              );

              return (
                <div key={childObjective.id} className="space-y-4">
                  <ObjectiveCard
                    objective={childObjective}
                    isExpanded={childIsExpanded}
                    onToggle={() => toggleObjective(childObjective.id)}
                    level={1}
                  />

                  {childIsExpanded && relatedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}