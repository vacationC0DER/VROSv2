import React, { useState } from 'react';
import { TaskList } from '../tasks/TaskList';

const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Conduct expense audit across departments',
    dueDate: '2024-02-15',
    assignee: {
      name: 'Sarah Finance',
      initials: 'SF'
    },
    status: 'pending' as const
  },
  {
    id: '2',
    title: 'Identify top cost-saving opportunities',
    dueDate: '2024-02-28',
    assignee: {
      name: 'Mike Analyst',
      initials: 'MA'
    },
    status: 'pending' as const
  },
  {
    id: '3',
    title: 'Develop implementation plan for cost reductions',
    dueDate: '2024-03-15',
    assignee: {
      name: 'Lisa Project',
      initials: 'LP'
    },
    status: 'pending' as const
  },
  {
    id: '4',
    title: 'Present findings to leadership team',
    dueDate: '2024-03-30',
    assignee: {
      name: 'James Director',
      initials: 'JD'
    },
    status: 'pending' as const
  }
];

export function CostOptimizationSection() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const handleTaskStatusChange = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  return (
    <div className="mt-4">
      <TaskList 
        tasks={tasks}
        onTaskStatusChange={handleTaskStatusChange}
      />
    </div>
  );
}