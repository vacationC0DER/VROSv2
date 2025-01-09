import React from 'react';
import { Plus } from 'lucide-react';
import { ViewOptions } from './ViewOptions';

export function ObjectivesHeader() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Objectives</h1>
        <p className="text-gray-600">Track and manage strategic objectives</p>
      </div>
      
      <div className="flex items-center gap-4">
        <ViewOptions />
        <button className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
          <span>Add Objective</span>
        </button>
      </div>
    </div>
  );
}