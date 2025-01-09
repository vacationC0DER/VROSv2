import React from 'react';
import { useScheduleStore } from '../stores/scheduleStore';
import { TaskList } from '../components/schedule/TaskList';
import { DateDisplay } from '../components/dashboard/DateDisplay';

export function Schedule() {
  const { tasks } = useScheduleStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">My Focus</h1>
          <p className="text-gray-600">Track and manage your daily priorities</p>
        </div>
        <DateDisplay />
      </div>

      {/* Key Results Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">My key results</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>No check-ins to do!</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Start a streak by completing your check-ins!</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">0x</span>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">My tasks</h2>
        {tasks.length > 0 ? (
          <TaskList tasks={tasks} />
        ) : (
          <p className="text-gray-600">Tasks assigned to you will appear here</p>
        )}
      </div>

      {/* Feed Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Feed</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm">ALL</button>
            <button className="px-3 py-1 hover:bg-gray-100 text-gray-700 rounded-lg text-sm">PLANS WATCHED</button>
            <button className="px-3 py-1 hover:bg-gray-100 text-gray-700 rounded-lg text-sm">PEOPLE FOLLOWED</button>
            <button className="px-3 py-1 hover:bg-gray-100 text-gray-700 rounded-lg text-sm">MY TEAMS</button>
          </div>
        </div>
        
        <div className="text-center py-12">
          <img 
            src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=200"
            alt="Waiting"
            className="mx-auto mb-4 w-32 h-32"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Waiting for new updates</h3>
          <p className="text-gray-600 mb-4">Create a check-in to start seeing updates in this feed</p>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm">Learn more</button>
        </div>
      </div>
    </div>
  );
}