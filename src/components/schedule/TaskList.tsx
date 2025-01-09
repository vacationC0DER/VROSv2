import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { ScheduleTask } from '../../types/schedule';

interface TaskListProps {
  tasks: ScheduleTask[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg"
        >
          <button className={`mt-0.5 ${task.completed ? 'text-green-500' : 'text-gray-300'}`}>
            <CheckCircle className="h-5 w-5" />
          </button>
          <div>
            <h4 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
              {task.title}
            </h4>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}