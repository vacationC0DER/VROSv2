import React, { useEffect, useRef } from 'react';
import { useLMSStore } from '../../stores/lmsStore';

interface CoursePlayerProps {
  courseId: string;
  packagePath: string;
  entryPoint: string;
}

export function CoursePlayer({ courseId, packagePath, entryPoint }: CoursePlayerProps) {
  const { updateProgress } = useLMSStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fullPath = `${packagePath}/${entryPoint}`;

  useEffect(() => {
    // Set up SCORM API bridge
    const handleScormMessage = (event: MessageEvent) => {
      if (event.data.type === 'SCORM_DATA') {
        updateProgress(courseId, event.data.progress, event.data.scormData);
      }
    };

    window.addEventListener('message', handleScormMessage);
    return () => window.removeEventListener('message', handleScormMessage);
  }, [courseId, updateProgress]);

  return (
    <div className="w-full h-[calc(100vh-theme(spacing.16))]">
      <iframe
        ref={iframeRef}
        src={fullPath}
        className="w-full h-full border-0"
        title="Course Content"
        sandbox="allow-same-origin allow-scripts allow-forms"
      />
    </div>
  );
}