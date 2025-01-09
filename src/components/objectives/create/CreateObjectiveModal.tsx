import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useObjectiveStore } from '../../../stores/objectiveStore';
import { useAuth } from '../../../contexts/AuthContext';
import { DepartmentSelect } from './DepartmentSelect';

interface CreateObjectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateObjectiveModal({ isOpen, onClose }: CreateObjectiveModalProps) {
  const { user } = useAuth();
  const { createObjective } = useObjectiveStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'F1',
    department_id: '',
    status: 'not_started',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await createObjective({
        ...formData,
        owner_id: user.id,
        progress: 0,
      });
      onClose();
    } catch (error) {
      console.error('Failed to create objective:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Objective</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="F1">Financial 1</option>
                <option value="F2">Financial 2</option>
                <option value="C1">Customer 1</option>
                <option value="C2">Customer 2</option>
                <option value="P1">Process 1</option>
                <option value="P2">Process 2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <DepartmentSelect
                required
                value={formData.department_id}
                onChange={(value) => setFormData({ ...formData, department_id: value })}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Create Objective
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}