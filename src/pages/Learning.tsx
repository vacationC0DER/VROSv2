import React, { useState, useEffect } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { useLMSStore } from '../stores/lmsStore';
import { CourseCard } from '../components/lms/CourseCard';
import { CoursePlayer } from '../components/lms/CoursePlayer';
import { UploadCourseModal } from '../components/lms/UploadCourseModal';

export function Learning() {
  const { courses, userProgress, loading, fetchCourses, fetchUserProgress, fetchCategories } = useLMSStore();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchUserProgress();
    fetchCategories();
  }, [fetchCourses, fetchUserProgress, fetchCategories]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const selectedCourseData = courses.find(c => c.id === selectedCourse);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Learning & Development</h1>
          <p className="text-gray-600">Enhance your skills with our training courses</p>
        </div>
        
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          <span>Upload Course</span>
        </button>
      </div>

      {selectedCourse && selectedCourseData ? (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedCourse(null)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back to Courses
          </button>
          <CoursePlayer 
            courseId={selectedCourse}
            scormUrl={selectedCourseData.scorm_url}
          />
        </div>
      ) : (
        <>
          {courses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No courses yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by uploading your first course.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Course
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  progress={userProgress.find(p => p.course_id === course.id)}
                  onClick={() => setSelectedCourse(course.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {showUploadModal && (
        <UploadCourseModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
}