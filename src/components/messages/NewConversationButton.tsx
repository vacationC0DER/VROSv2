import React, { useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { useUsers } from '../../hooks/useUsers';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function NewConversationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { users, loading } = useUsers();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const filteredUsers = users.filter(user => 
    user.id !== currentUser?.id &&
    (user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     user.last_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const startConversation = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc(
        'get_or_create_conversation',
        { 
          user1_id: currentUser?.id,
          user2_id: userId
        }
      );
      
      if (error) throw error;
      
      navigate(`/messages/${data}`);
      setIsOpen(false);
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100 rounded-lg"
      >
        <Plus className="h-5 w-5" />
        <span>New Conversation</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">New Conversation</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="max-h-96 overflow-y-auto">
              {loading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => startConversation(user.id)}
                      className="w-full p-3 flex items-center gap-3 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {user.first_name[0]}{user.last_name[0]}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{user.first_name} {user.last_name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}