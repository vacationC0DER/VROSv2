import React from 'react';
import { TaskItem } from './TaskItem';
import type { ScheduleTask } from '../../types/schedule';

interface DayScheduleProps {
  day: string;
  tasks: ScheduleTask[];
}

export function DaySchedule({ day, tasks }: DayScheduleProps) {
  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">{formatDay(day)}</h3>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}

        {tasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-2">No tasks scheduled</p>
        )}
      </div>
    </div>
  );
}