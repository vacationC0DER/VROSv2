import React, { useState } from 'react';
import { X, Calendar, Users, Target, BarChart2 } from 'lucide-react';
import { type Project } from '../../../types/project';
import { ProjectStatusBadge } from '../ProjectStatusBadge';
import { ProjectKeyResults } from './ProjectKeyResults';
import { ProjectInitiatives } from './ProjectInitiatives';
import { ProjectTeam } from './ProjectTeam';
import { DiscussionSection } from '../discussions/DiscussionSection';

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

type Tab = 'details' | 'discussions';

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('details');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
              <p className="mt-1 text-gray-600">{project.description}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>Due {new Date(project.end_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{project.department?.name}</span>
            </div>
            {project.objective && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="h-4 w-4" />
                <span>{project.objective.title}</span>
              </div>
            )}
            <ProjectStatusBadge status={project.status} />
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-6 border-b border-gray-200">
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'details'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'discussions'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('discussions')}
            >
              Discussions
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' ? (
            <div className="space-y-8">
              {/* Progress Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-gray-500" />
                    Progress
                  </h3>
                  <span className="text-lg font-semibold">{project.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </section>

              {/* Key Results */}
              <ProjectKeyResults projectId={project.id} />

              {/* Initiatives */}
              <ProjectInitiatives projectId={project.id} />

              {/* Team */}
              <ProjectTeam projectId={project.id} />
            </div>
          ) : (
            <DiscussionSection projectId={project.id} />
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Update Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}