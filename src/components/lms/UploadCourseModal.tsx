import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useLMSStore } from '../../stores/lmsStore';
import JSZip from 'jszip';

interface UploadCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadCourseModal({ isOpen, onClose }: UploadCourseModalProps) {
  const { categories, uploadCourse, loading } = useLMSStore();
  const [scormPackage, setScormPackage] = useState<File | null>(null);
  const [entryPoint, setEntryPoint] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateScormPackage = async (file: File) => {
    try {
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);
      
      // Look for imsmanifest.xml
      if (!contents.file('imsmanifest.xml')) {
        throw new Error('Invalid SCORM package: missing imsmanifest.xml');
      }

      // Find potential entry points
      const htmlFiles = Object.keys(contents.files).filter(
        path => path.endsWith('.html') || path.endsWith('.htm')
      );

      if (htmlFiles.length === 0) {
        throw new Error('No HTML entry point found in SCORM package');
      }

      // Default to index.html if present, otherwise take first HTML file
      const defaultEntry = htmlFiles.find(f => f.toLowerCase().includes('index')) || htmlFiles[0];
      setEntryPoint(defaultEntry);
      setScormPackage(file);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate SCORM package');
      setScormPackage(null);
      setEntryPoint('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (scormPackage) {
      formData.append('scormPackage', scormPackage);
      formData.append('entryPoint', entryPoint);
    }
    
    try {
      await uploadCourse(formData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload course');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upload New Course</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SCORM Package
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        accept=".zip"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) validateScormPackage(file);
                        }}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">ZIP file containing SCORM package</p>
                  {entryPoint && (
                    <p className="text-xs text-green-600">Entry point: {entryPoint}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !scormPackage}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              Upload Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}