import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
      <div>
        <h3 className="text-sm font-medium text-red-800">Error</h3>
        <p className="text-sm text-red-600 mt-1">{message}</p>
      </div>
    </div>
  );
}