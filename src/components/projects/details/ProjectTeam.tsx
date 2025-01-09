import React from 'react';
import { Users } from 'lucide-react';
import { useProjectMembers } from '../../../hooks/useProjectMembers';

interface ProjectTeamProps {
  projectId: string;
}

export function ProjectTeam({ projectId }: ProjectTeamProps) {
  const { members, loading } = useProjectMembers(projectId);

  if (loading) {
    return (
      <section className="animate-pulse">
        <h3 className="text-lg font-semibold mb-4">Team</h3>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-gray-500" />
        Team
      </h3>

      <div className="space-y-2">
        {members.map((member) => (
          <div 
            key={member.user_id}
            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
          >
            <div>
              <h4 className="font-medium">
                {member.user.first_name} {member.user.last_name}
              </h4>
              <p className="text-sm text-gray-600">{member.user.email}</p>
            </div>
            <span className="text-sm font-medium text-gray-600 capitalize">
              {member.role}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}