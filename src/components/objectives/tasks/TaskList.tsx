import React from 'react';
import { TaskItem } from './TaskItem';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  assignee: {
    name: string;
    initials: string;
  };
  status: 'pending' | 'completed';
}

interface TaskListProps {
  tasks: Task[];
  onTaskStatusChange: (taskId: string) => void;
}

export function TaskList({ tasks, onTaskStatusChange }: TaskListProps) {
  return (
    <div className="space-y-2 ml-8 mt-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          dueDate={task.dueDate}
          assignee={task.assignee}
          status={task.status}
          onStatusChange={() => onTaskStatusChange(task.id)}
        />
      ))}
    </div>
  );
}