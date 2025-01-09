import React from 'react';
import { Calendar, MessageCircle, Award } from 'lucide-react';
import { useForumProfile } from '../../../hooks/useForumProfile';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { ErrorAlert } from '../../shared/ErrorAlert';
import { formatTimeAgo } from '../../../utils/formatters';

interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const { profile, karmaHistory, loading, error } = useForumProfile(userId);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error.message} />;
  if (!profile) return <ErrorAlert message="Profile not found" />;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-start gap-4">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-500">
                {profile.title?.[0] || '?'}
              </span>
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-xl font-bold">{profile.title || 'Forum Member'}</h2>
            {profile.bio && (
              <p className="text-gray-600 mt-1">{profile.bio}</p>
            )}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {formatTimeAgo(profile.created_at)}
              </div>
              {profile.last_seen_at && (
                <div>
                  Last seen {formatTimeAgo(profile.last_seen_at)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Award className="h-5 w-5" />
            <h3 className="font-semibold">Karma Points</h3>
          </div>
          <p className="text-2xl font-bold">{profile.karma_points}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <MessageCircle className="h-5 w-5" />
            <h3 className="font-semibold">Posts</h3>
          </div>
          <p className="text-2xl font-bold">{profile.posts_count}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <MessageCircle className="h-5 w-5" />
            <h3 className="font-semibold">Comments</h3>
          </div>
          <p className="text-2xl font-bold">{profile.comments_count}</p>
        </div>
      </div>

      {/* Karma History */}
      {karmaHistory.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Karma Activity</h3>
          <div className="space-y-4">
            {karmaHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium">{item.reason}</p>
                  <p className="text-sm text-gray-600">
                    {formatTimeAgo(item.created_at)}
                  </p>
                </div>
                <span className={`font-medium ${
                  item.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.amount > 0 ? '+' : ''}{item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}