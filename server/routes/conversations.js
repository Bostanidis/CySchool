const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {

  const { user_id } = req.body;

  try {
    const result = await db.query(
      'SELECT * FROM conversations WHERE $1 = ANY(participants)',
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.post("/", async (req, res) => {
    const { user_id, target_ids, is_direct } = req.body;
    const participants = [user_id, ...target_ids];

    try {
        const result = await db.query(
          `INSERT INTO conversations (is_direct, participants)
          VALUES ($1, $2)`,
          [is_direct, participants]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;
