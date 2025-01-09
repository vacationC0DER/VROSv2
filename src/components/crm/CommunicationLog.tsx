import React from 'react';
import { Mail, Phone, MessageSquare, Clock } from 'lucide-react';
import { formatTimeAgo } from '../../utils/formatters';
import type { Communication } from '../../types/crm';

interface CommunicationLogProps {
  communications: Communication[];
  onAddCommunication: () => void;
}

export function CommunicationLog({ communications, onAddCommunication }: CommunicationLogProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'phone':
        return <Phone className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'text-green-600';
      case 'received':
        return 'text-blue-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Communication History</h3>
        <button
          onClick={onAddCommunication}
          className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg"
        >
          Log Communication
        </button>
      </div>

      <div className="space-y-4">
        {communications.map((comm) => (
          <div key={comm.id} className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200">
            <div className={`p-2 rounded-lg ${
              comm.type === 'email' ? 'bg-blue-100' :
              comm.type === 'phone' ? 'bg-green-100' :
              'bg-purple-100'
            }`}>
              {getIcon(comm.type)}
            </div>

            <div className="flex-1">
              {comm.subject && (
                <h4 className="font-medium text-gray-900">{comm.subject}</h4>
              )}
              <p className="text-sm text-gray-600 mt-1">{comm.content}</p>
              
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className={`capitalize ${getStatusColor(comm.status)}`}>
                  {comm.direction} • {comm.status}
                </span>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeAgo(comm.sent_at || comm.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {communications.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No communications logged yet
          </p>
        )}
      </div>
    </div>
  );
}