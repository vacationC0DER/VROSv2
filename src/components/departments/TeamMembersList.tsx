import React from 'react';
import { Mail, Phone } from 'lucide-react';
import type { User } from '../../types/user';

interface TeamMembersListProps {
  members: User[];
}

export function TeamMembersList({ members }: TeamMembersListProps) {
  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div 
          key={member.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {member.first_name[0]}{member.last_name[0]}
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">
                {member.first_name} {member.last_name}
              </h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <Mail className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <Phone className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}