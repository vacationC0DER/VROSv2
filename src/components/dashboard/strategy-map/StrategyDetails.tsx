import React from 'react';
import { Target, CheckCircle, ArrowRight } from 'lucide-react';
import type { Objective } from '../../../types/objective';
import type { Project } from '../../../types/project';

interface StrategyDetailsProps {
  title: string;
  description?: string;
  keyResults: {
    id: string;
    title: string;
    progress: number;
    status: string;
  }[];
  initiatives: Project[];
  onClose: () => void;
}

export function StrategyDetails({ 
  title, 
  description,
  keyResults,
  initiatives,
  onClose 
}: StrategyDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Target className="h-5 w-5 text-indigo-600" />
                {title}
              </h2>
              {description && (
                <p className="mt-1 text-gray-600">{description}</p>
              )}
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Key Results */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Key Results</h3>
            <div className="space-y-4">
              {keyResults.map(kr => (
                <div 
                  key={kr.id}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{kr.title}</h4>
                      <div className="mt-2">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-600 transition-all duration-300"
                            style={{ width: `${kr.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <span className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                      kr.status === 'completed' ? 'bg-green-100 text-green-800' :
                      kr.status === 'at_risk' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {kr.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Initiatives */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Initiatives</h3>
            <div className="space-y-4">
              {initiatives.map(initiative => (
                <div 
                  key={initiative.id}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{initiative.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {initiative.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>Progress: {initiative.progress}%</span>
                        <span>Status: {initiative.status}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}