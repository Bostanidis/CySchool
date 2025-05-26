const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
require('dotenv').config();

// Import routes
const usersRouter = require('./routes/users');

const schoolsRouter = require("./routes/schools");


// Routes

app.use("/api/schools", schoolsRouter);

// Use the users router for any requests to /api/users

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
