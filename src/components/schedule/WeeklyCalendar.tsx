import React from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { useScheduleStore } from '../../stores/scheduleStore';
import { TaskItem } from './TaskItem';

export function WeeklyCalendar() {
  const { currentDate, tasks } = useScheduleStore();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="flex-1 grid grid-cols-7 gap-4 overflow-hidden">
      {weekDays.map((day, index) => {
        const isToday = isSameDay(day, new Date());
        const dayTasks = tasks.filter(task => task.day.toLowerCase() === format(day, 'EEEE').toLowerCase());

        return (
          <div key={index} className="flex flex-col h-full">
            {/* Day Header */}
            <div className={`text-center p-2 ${isToday ? 'bg-indigo-50 rounded-lg' : ''}`}>
              <p className={`text-sm font-medium ${isToday ? 'text-indigo-600' : 'text-gray-600'}`}>
                {format(day, 'EEE')}
              </p>
              <p className={`text-2xl font-semibold ${isToday ? 'text-indigo-600' : 'text-gray-900'}`}>
                {format(day, 'd')}
              </p>
            </div>

            {/* Tasks Container */}
            <div className="flex-1 bg-gray-50 rounded-lg p-3 space-y-2 overflow-y-auto">
              {dayTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}