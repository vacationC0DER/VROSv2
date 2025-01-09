import React from 'react';
import { format } from 'date-fns';
import { useScheduleStore } from '../../stores/scheduleStore';
import { TaskItem } from './TaskItem';

export function DayView() {
  const { currentDate, tasks } = useScheduleStore();
  const dayTasks = tasks.filter(task => 
    task.day.toLowerCase() === format(currentDate, 'EEEE').toLowerCase()
  );

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="bg-white rounded-lg border border-gray-200">
        {hours.map(hour => {
          const timeLabel = format(new Date().setHours(hour), 'ha');
          const hourTasks = dayTasks.filter(task => task.time?.startsWith(String(hour)));

          return (
            <div key={hour} className="flex border-b border-gray-100 min-h-[64px]">
              <div className="w-20 py-2 px-4 text-right text-sm text-gray-500">
                {timeLabel}
              </div>
              <div className="flex-1 border-l border-gray-100 p-2">
                {hourTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}