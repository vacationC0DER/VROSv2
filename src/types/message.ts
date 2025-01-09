export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read_at: string | null;
  created_at: string;
  updated_at: string;
  sender?: {
    first_name: string;
    last_name: string;
  };
}

export interface Conversation {
  id: string;
  created_at: string;
  updated_at: string;
  participants: {
    user_id: string;
    user: {
      first_name: string;
      last_name: string;
    };
  }[];
  last_message?: Message;
}