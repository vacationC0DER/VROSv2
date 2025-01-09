import React from 'react';
import { Clock, RotateCcw } from 'lucide-react';
import { useScheduleStore } from '../../stores/scheduleStore';
import { TaskItem } from './TaskItem';

export function TasksSidebar() {
  const { tasks } = useScheduleStore();
  const recurringTasks = tasks.filter(task => task.recurring);
  const incompleteTasks = tasks.filter(task => !task.completed);

  return (
    <div className="w-80 border-l border-gray-200 bg-white p-6 overflow-y-auto">
      {/* Upcoming Tasks */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-indigo-600" />
          <h2 className="font-semibold">Upcoming Tasks</h2>
        </div>
        <div className="space-y-2">
          {incompleteTasks.slice(0, 5).map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>

      {/* Recurring Tasks */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <RotateCcw className="h-5 w-5 text-indigo-600" />
          <h2 className="font-semibold">Recurring Tasks</h2>
        </div>
        <div className="space-y-2">
          {recurringTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}