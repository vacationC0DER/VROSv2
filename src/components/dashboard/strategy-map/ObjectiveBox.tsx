import React, { useState } from 'react';
import { useStrategyMapStore } from '../../../stores/strategyMapStore';
import { StrategyDetails } from './StrategyDetails';
import { useProjectStore } from '../../../stores/projectStore';

interface ObjectiveBoxProps {
  perspectiveId: string;
  id: string;
  title: string;
  percentage: number;
  color: string;
}

export function ObjectiveBox({ perspectiveId, id, title, percentage, color }: ObjectiveBoxProps) {
  const { updateObjectivePercentage } = useStrategyMapStore();
  const { projects } = useProjectStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(percentage);
  const [showDetails, setShowDetails] = useState(false);

  const handleSave = () => {
    const newValue = Math.min(100, Math.max(0, editValue));
    updateObjectivePercentage(perspectiveId, id, newValue);
    setIsEditing(false);
  };

  const relatedProjects = projects.filter(p => p.objective_id === id);

  const borderColorClass = `border-${color}-200`;
  const bgColorClass = `bg-${color}-50`;
  
  return (
    <>
      <div 
        className={`border-2 ${borderColorClass} ${bgColorClass} rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow`}
        onClick={() => setShowDetails(true)}
      >
        <div className="flex justify-between items-start gap-4">
          <h4 className="text-sm font-medium">{title}</h4>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="w-16 px-2 py-1 text-sm border rounded"
                value={editValue}
                onChange={(e) => setEditValue(Number(e.target.value))}
                min="0"
                max="100"
                autoFocus
                onClick={e => e.stopPropagation()}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave();
                }}
                className="text-xs bg-indigo-600 text-white px-2 py-1 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <span
              className="text-sm font-semibold bg-white px-2 py-1 rounded cursor-pointer hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              {percentage}%
            </span>
          )}
        </div>
      </div>

      {showDetails && (
        <StrategyDetails
          title={title}
          keyResults={[
            { id: '1', title: 'Increase Revenue by 25%', progress: 75, status: 'in_progress' },
            { id: '2', title: 'Reduce Operating Costs by 15%', progress: 40, status: 'at_risk' },
            { id: '3', title: 'Expand to 3 New Markets', progress: 90, status: 'completed' }
          ]}
          initiatives={relatedProjects}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
}