const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {

    const { name, email, password, grade, school, shownName } = req.body;

    // Encryption
    const hashedPassword = await bcrypt.hash(password, 12);

    // Adding user
    const user = await pool.query(
        'INSERT INTO users (name, email, password, grade, school, shownName) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, email, hashedPassword, grade, school, shownName]
    );

    res.json(user.rows[0]);

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

module.exports = router;