import React from 'react';
import { ListChecks } from 'lucide-react';

interface ProjectInitiativesProps {
  projectId: string;
}

export function ProjectInitiatives({ projectId }: ProjectInitiativesProps) {
  return (
    <section>
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <ListChecks className="h-5 w-5 text-gray-500" />
        Initiatives
      </h3>

      <div className="space-y-2">
        {/* TODO: Implement initiatives list */}
        <p className="text-sm text-gray-600">No initiatives yet</p>
      </div>
    </section>
  );
}