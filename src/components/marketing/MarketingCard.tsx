import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Download } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  format: string;
  downloadUrl: string;
}

interface SubCategory {
  title: string;
  icon: React.ReactNode;
  resources: Resource[];
}

interface MarketingCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  resources: Resource[];
  subCategories?: SubCategory[];
}

export function MarketingCard({ 
  title, 
  description, 
  icon,
  resources,
  subCategories
}: MarketingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-50 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
        >
          {isExpanded ? (
            <>
              <ChevronDown className="h-4 w-4" />
              <span>Hide resources</span>
            </>
          ) : (
            <>
              <ChevronRight className="h-4 w-4" />
              <span>View resources</span>
            </>
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {subCategories ? (
              // Render subcategories if they exist
              subCategories.map((subCategory, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    {subCategory.icon}
                    <span>{subCategory.title}</span>
                  </div>
                  <div className="space-y-2">
                    {subCategory.resources.map((resource, resourceIndex) => (
                      <ResourceItem key={resourceIndex} resource={resource} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Render resources directly if no subcategories
              <div className="space-y-2">
                {resources.map((resource, index) => (
                  <ResourceItem key={index} resource={resource} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ResourceItem({ resource }: { resource: Resource }) {
  return (
    <div className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-lg">
      <div>
        <h4 className="text-sm font-medium text-gray-900">{resource.title}</h4>
        <p className="text-sm text-gray-600">{resource.description}</p>
        <p className="text-xs text-gray-500 mt-1">Format: {resource.format}</p>
      </div>
      <button 
        className="flex-shrink-0 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
        title="Download template"
      >
        <Download className="h-4 w-4" />
      </button>
    </div>
  );
}