import React, { useState } from 'react';
import { useStrategyMapStore } from '../../../stores/strategyMapStore';

export function MissionStatement() {
  const { mission, updateMission } = useStrategyMapStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(mission.text);

  const handleSave = () => {
    updateMission(editText);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="text-center mb-8">
        <textarea
          className="w-full max-w-2xl mx-auto p-2 text-lg border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          rows={2}
          autoFocus
        />
        <div className="mt-2 space-x-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditText(mission.text);
              setIsEditing(false);
            }}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="text-center mb-8 cursor-pointer group"
      onClick={() => setIsEditing(true)}
    >
      <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors">
        {mission.text}
      </h3>
      <span className="text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
        Click to edit
      </span>
    </div>
  );
}