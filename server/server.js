const express = require('express');
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config(); // Move higher to load envs early

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Next.js client
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const messagesRoutes = require("./routes/messages")
const schoolsRouter = require("./routes/schools");
const authRoutes = require('./routes/auth');
const classmateRoutes = require('./routes/classmates');
const conversationRoutes = require("./routes/conversations")

// Routes
app.use("/api/schools", schoolsRouter);
app.use('/api/auth', authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/classmates", classmateRoutes);
app.use("/api/conversations", conversationRoutes)

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('send-message', (message) => {
    io.emit('receive-message', message); // Broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// ✅ Start the HTTP server, not the app
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
