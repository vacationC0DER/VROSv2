import React, { useState } from 'react';
import { Calendar, Users, Target, X, MessageSquare, Link2, Wand2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Objective } from '../../../types';

interface ObjectiveDetailsProps {
  objective: Objective;
  onClose: () => void;
}

export function ObjectiveDetails({ objective, onClose }: ObjectiveDetailsProps) {
  const [activeTab, setActiveTab] = useState<'checkins' | 'details' | 'coaching'>('checkins');
  
  // Sample progress data - in production this would come from your backend
  const progressData = [
    { date: '4 Oct', value: 0 },
    { date: '11 Oct', value: 15 },
    { date: '18 Oct', value: 25 },
    { date: '25 Oct', value: 45 },
    { date: '1 Nov', value: 68 },
    { date: 'Today', value: objective.progress || 0 },
  ];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{objective.title}</h2>
            <p className="text-sm text-gray-500">Turn affiliates into a core leads channel</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
            Create check-in
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-3/4 overflow-y-auto border-r border-gray-200">
          {/* Progress Graph */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{objective.progress}%</span>
                <span className="text-sm text-gray-500">of 300 leads</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Target:</span>
                <span className="text-sm font-medium">100%</span>
              </div>
            </div>
            <div className="h-[300px] bg-white rounded-lg">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    domain={[0, 100]}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#4F46E5' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Latest Check-in */}
          <div className="px-6 pb-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-300" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">120 leads</span>
                    <span className="text-green-600 text-sm">+5%</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    We're back on track with our lead target after a slow start. New, high-performing affiliates have
                    boosted our numbers, and improved assets for existing affiliates are driving better engagement.
                  </p>
                  <p className="text-gray-600 mb-4">
                    We're now aligned with our goal of 300 leads by quarter's end.
                  </p>
                  <p className="text-gray-600">
                    Key risk: over-relying on top affiliates, so we're working to diversify our base to stay steady.
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">🚀</span>
                      <span className="text-sm text-gray-600">23</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">👍</span>
                      <span className="text-sm text-gray-600">15</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm">⚡️</span>
                      <span className="text-sm text-gray-600">8</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">Yesterday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/4 overflow-y-auto">
          <div className="p-6">
            <div className="space-y-6">
              {/* Relationships */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">RELATIONSHIPS</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-blue-50 rounded">
                      <Target className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm">Contributes to</p>
                      <p className="text-sm font-medium">Increase revenue growth</p>
                      <p className="text-xs text-gray-500">Sales OKRs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">DETAILS</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Due date</span>
                    </div>
                    <span className="text-sm font-medium">Dec 31, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Owner</span>
                    </div>
                    <span className="text-sm font-medium">
                      {objective.owner?.first_name} {objective.owner?.last_name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">LINKS</h3>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <Link2 className="h-4 w-4" />
                  <span>Add link</span>
                </button>
              </div>

              {/* Coaching */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">COACHING</h3>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <Wand2 className="h-4 w-4" />
                  <span>Get help from AI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}