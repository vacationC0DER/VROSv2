-- Drop existing policies
DROP POLICY IF EXISTS "Users can view conversations they participate in" ON conversations;
DROP POLICY IF EXISTS "Users can create conversations" ON conversations;
DROP POLICY IF EXISTS "Users can view conversation participants" ON conversation_participants;
DROP POLICY IF EXISTS "Users can add conversation participants" ON conversation_participants;
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON messages;
DROP POLICY IF EXISTS "Users can send messages" ON messages;

-- Create simplified policies for conversations
CREATE POLICY "Anyone can read conversations"
  ON conversations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can create conversations"
  ON conversations FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create simplified policies for conversation participants
CREATE POLICY "Anyone can read participants"
  ON conversation_participants FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can add participants"
  ON conversation_participants FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create simplified policies for messages
CREATE POLICY "Anyone can read messages"
  ON messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can send messages to conversations they're in"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM conversation_participants
      WHERE conversation_id = messages.conversation_id
      AND user_id = auth.uid()
    )
  );

-- Add indexes to improve query performance
CREATE INDEX IF NOT EXISTS idx_conversation_participants_user_id ON conversation_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_conversation_participants_conversation_id ON conversation_participants(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);