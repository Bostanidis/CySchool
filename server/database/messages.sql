CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
    content TEXT,                            -- Optional text
    has_audio BOOLEAN DEFAULT false,
    has_file BOOLEAN DEFAULT false,
    file_url TEXT,                           -- Optional file or audio URL
    file_name TEXT,
    file_type TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
