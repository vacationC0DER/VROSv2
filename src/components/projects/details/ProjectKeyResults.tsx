import React from 'react';
import { Target } from 'lucide-react';
import { useKeyResults } from '../../../hooks/useKeyResults';

interface ProjectKeyResultsProps {
  projectId: string;
}

export function ProjectKeyResults({ projectId }: ProjectKeyResultsProps) {
  const { keyResults, loading } = useKeyResults(projectId);

  if (loading) {
    return (
      <section className="animate-pulse">
        <h3 className="text-lg font-semibold mb-4">Key Results</h3>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <Target className="h-5 w-5 text-gray-500" />
        Key Results
      </h3>

      <div className="space-y-4">
        {keyResults.map((kr) => (
          <div 
            key={kr.id}
            className="p-4 bg-white border border-gray-200 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{kr.title}</h4>
                {kr.description && (
                  <p className="mt-1 text-sm text-gray-600">{kr.description}</p>
                )}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {kr.current_value} / {kr.target_value}
              </span>
            </div>

            <div className="mt-3">
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ 
                    width: `${(kr.current_value / kr.target_value) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}