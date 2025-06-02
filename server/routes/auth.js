const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const authenticateToken = require('../middleware');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {

    const { username, fullname, email, password, grade, school, shownName } = req.body;

    async function emailExists(email) {
      const query = `
        SELECT 1 FROM users 
        WHERE email = $1
        LIMIT 1
      `
      const result = await pool.query(query, [email])
      return result.rowCount > 0
    }

    async function usernameExists(username) {
      const query = `
        SELECT 1 FROM users 
        WHERE username = $1
        LIMIT 1
      `
      const result = await pool.query(query, [username])
      return result.rowCount > 0
    }

    if (await emailExists(email)) {
      res.status(409).json({ errorMessage: "Email already exists"});
      return
    }

    if (await usernameExists(username)) {
      res.status(409).json({ errorMessage: "Username already exists"});
      return
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert user
        const userResult = await pool.query(
        'INSERT INTO users (username, fullname, email, password, grade, school, shownName) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [username, fullname, email, hashedPassword, grade, school, shownName]
        );

        const user = userResult.rows[0];

        // Issue token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token and user data
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            grade: user.grade,
            fullname: user.fullname,
            friends: user.shownName,
            school: user.school
          }
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Internal server error during registration' });
    }
});



// Login Route
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) return res.status(400).json({ error: 'User not found' });

    const isValid = await bcrypt.compare(password, user.rows[0].password);

    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user.rows[0].id, username: user.rows[0].username, email: user.rows[0].email, fullname: user.rows[0].fullname, grade: user.rows[0].grade, friends: user.rows[0].shownName, avatar: user.rows[0].grade, school: user.rows[0].school } });
});


router.get('/me', authenticateToken, async (req, res) => {
  try {
    console.log('=== DEBUG /me route ===');
    console.log('req.user:', req.user);
    console.log('req.user.id:', req.user?.id);
    console.log('typeof req.user.id:', typeof req.user?.id);
    
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    
    console.log('Database query result:', user.rows);
    console.log('Number of rows returned:', user.rows.length);
    
    if (user.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    
    const u = user.rows[0];
    console.log('User found:', u);
    
    res.json({
      user: {
        id: u.id,
        username: u.username,
        email: u.email,
        fullname: u.fullname,
        grade: u.grade,
        friends: u.shownName,
        avatar: u.avatar,
        school: u.school
      }
    });
  } catch (err) {
    console.error('Me route error:', err);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

module.exports = router;