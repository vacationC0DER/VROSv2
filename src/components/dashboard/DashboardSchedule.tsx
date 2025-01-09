import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useScheduleStore } from '../../stores/scheduleStore';
import { getCurrentDayName } from '../../utils/dateUtils';
import type { ScheduleTask } from '../../types/schedule';

export function DashboardSchedule() {
  const navigate = useNavigate();
  const { tasks, loading, error } = useScheduleStore();
  
  const today = getCurrentDayName();
  const todaysTasks = tasks.filter(task => task.day === today);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-4 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-600" />
          <h2 className="font-semibold text-gray-900">Today's Schedule</h2>
        </div>
        <button
          onClick={() => navigate('/schedule')}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        {todaysTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}

        {todaysTasks.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-2">
            No tasks scheduled for today
          </p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => navigate('/schedule')}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          View full schedule →
        </button>
      </div>
    </div>
  );
}

function TaskItem({ task }: { task: ScheduleTask }) {
  const { toggleTaskCompletion } = useScheduleStore();

  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
        {task.title}
      </span>
    </div>
  );
}