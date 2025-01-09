import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { useScheduleStore } from '../../stores/scheduleStore';
import { TaskItem } from './TaskItem';

export function MonthView() {
  const { currentDate, tasks } = useScheduleStore();
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
      {/* Week day headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="bg-gray-50 p-2 text-center">
          <span className="text-sm font-medium text-gray-600">{day}</span>
        </div>
      ))}

      {/* Calendar days */}
      {days.map((day, index) => {
        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, currentDate);
        const dayTasks = tasks.filter(task => task.day.toLowerCase() === format(day, 'EEEE').toLowerCase());

        return (
          <div
            key={index}
            className={`min-h-[120px] bg-white p-2 ${
              !isCurrentMonth ? 'bg-gray-50' : ''
            }`}
          >
            <div className={`text-right mb-2 ${
              isToday ? 'bg-indigo-50 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center ml-auto' : ''
            }`}>
              <span className={`text-sm ${
                isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {format(day, 'd')}
              </span>
            </div>
            <div className="space-y-1">
              {dayTasks.slice(0, 3).map(task => (
                <TaskItem key={task.id} task={task} compact />
              ))}
              {dayTasks.length > 3 && (
                <div className="text-xs text-gray-500 pl-2">
                  +{dayTasks.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}