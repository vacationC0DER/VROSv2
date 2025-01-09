import React from 'react';
import { DaySchedule } from './DaySchedule';
import { CreateTaskModal } from './CreateTaskModal';
import { useScheduleStore } from '../../stores/scheduleStore';
import type { ScheduleTask } from '../../types/schedule';

export function WeeklySchedule() {
  const { tasks, loading, error } = useScheduleStore();
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  const groupedTasks = React.useMemo(() => {
    return tasks.reduce((acc, task) => {
      if (!acc[task.day]) {
        acc[task.day] = [];
      }
      acc[task.day].push(task);
      return acc;
    }, {} as Record<string, ScheduleTask[]>);
  }, [tasks]);

  if (loading) {
    return <div className="flex justify-center p-8">Loading schedule...</div>;
  }

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Weekly Schedule</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <DaySchedule day="monday" tasks={groupedTasks.monday || []} />
        <DaySchedule day="tuesday" tasks={groupedTasks.tuesday || []} />
        <DaySchedule day="wednesday" tasks={groupedTasks.wednesday || []} />
        <DaySchedule day="thursday" tasks={groupedTasks.thursday || []} />
        <DaySchedule day="friday" tasks={groupedTasks.friday || []} />
      </div>

      {showCreateModal && (
        <CreateTaskModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
}