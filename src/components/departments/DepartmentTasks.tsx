import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import type { Task } from '../../types/task';

interface DepartmentTasksProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: 'pending' | 'completed') => void;
}

export function DepartmentTasks({ tasks, onStatusChange }: DepartmentTasksProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200"
        >
          <button
            onClick={() => onStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
            className={`mt-1 ${task.status === 'completed' ? 'text-green-500' : 'text-gray-400'}`}
          >
            <CheckCircle className="h-5 w-5" />
          </button>

          <div className="flex-1">
            <h4 className={`font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
              {task.title}
            </h4>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Due {new Date(task.due_date).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {task.assignee.first_name[0]}{task.assignee.last_name[0]}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {task.assignee.first_name} {task.assignee.last_name}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}