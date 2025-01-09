import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useScheduleStore } from '../../stores/scheduleStore';
import type { ScheduleTask } from '../../types/schedule';

interface TaskItemProps {
  task: ScheduleTask;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTaskCompletion } = useScheduleStore();

  return (
    <div className="group flex items-start gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-all">
      <button
        onClick={() => toggleTaskCompletion(task.id)}
        className="mt-0.5 text-gray-400 hover:text-indigo-600"
      >
        {task.completed ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <Circle className="h-5 w-5" />
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-gray-500 truncate">{task.description}</p>
        )}
      </div>
    </div>
  );
}