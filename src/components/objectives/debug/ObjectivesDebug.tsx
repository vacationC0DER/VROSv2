import React from 'react';
import { useObjectiveStore } from '../../../stores/objectiveStore';

export function ObjectivesDebug() {
  const { objectives, loading, error } = useObjectiveStore();

  return (
    <div className="p-4 bg-gray-50 rounded-lg mb-4">
      <h3 className="font-medium mb-2">Debug Info:</h3>
      <div className="space-y-2 text-sm">
        <p>Loading: {loading.toString()}</p>
        <p>Error: {error || 'None'}</p>
        <p>Objectives Count: {objectives?.length || 0}</p>
        {error && (
          <pre className="bg-red-50 p-2 rounded text-red-600 whitespace-pre-wrap">
            {error}
          </pre>
        )}
        {objectives && objectives.length > 0 && (
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(objectives[0], null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}