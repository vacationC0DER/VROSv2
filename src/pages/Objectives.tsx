import React from 'react';
import { ObjectivesList } from '../components/objectives/ObjectivesList';
import { ObjectivesHeader } from '../components/objectives/ObjectivesHeader';
import { ObjectivesFilters } from '../components/objectives/ObjectivesFilters';

export function Objectives() {
  return (
    <div className="space-y-6">
      <ObjectivesHeader />
      <ObjectivesFilters />
      <ObjectivesList />
    </div>
  );
}