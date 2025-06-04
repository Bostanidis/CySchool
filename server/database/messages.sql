CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID, -- REFERENCES conversations(id) ON DELETE CASCADE
    sender_id UUID, --REFERENCES users(id) ON DELETE SET NULL
    content TEXT,                            
    has_audio BOOLEAN DEFAULT false,
    has_file BOOLEAN DEFAULT false,
    file_url TEXT DEFAULT '',                         
    file_name TEXT DEFAULT '',
    file_type TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO messages (conversation_id, sender_id, content) VALUES ('a3b226b0-46df-4804-9cfb-2f6b688167e7'::UUID, 'd0f2cce3-2891-484d-a29c-814c2994ae25'::UUID, 'Hello Giorgos');

SELECT * FROM messages;