import React from 'react';
import { Clock, BookOpen, CheckCircle } from 'lucide-react';
import type { Course, CourseProgress } from '../../types/lms';

interface CourseCardProps {
  course: Course;
  progress?: CourseProgress;
  onClick: () => void;
}

export function CourseCard({ course, progress, onClick }: CourseCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      {course.thumbnail_url && (
        <img 
          src={course.thumbnail_url} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{course.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{course.duration} mins</span>
          </div>
          
          {progress ? (
            <div className="flex items-center gap-2">
              {progress.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <>
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 transition-all duration-300"
                      style={{ width: `${progress.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{progress.progress}%</span>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-indigo-600">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">Start Course</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}