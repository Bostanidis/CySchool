const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware');

router.get('/', authenticateToken ,async (req, res) => {

  const { selectedConversationId } = req.body

  try {
    const result = await db.query(`
      SELECT * FROM messages WHERE ${selectedConversationId}=conversation_id;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.post("/", async (req, res) => {
  const { conversation_id, sender_id, content } = req.body;
  try {
    const result = await db.query(`
      INSERT INTO messages (conversation_id, sender_id, content)
      VALUES (${conversation_id}, ${sender_id}, ${content})
      `)
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// router.post('/', async (req, res) => {
//   const { name, address } = req.body;
//   try {
//     const result = await db.query(
//       'INSERT INTO schools (name, address) VALUES ($1, $2) RETURNING *',
//       [name, address]
//     );
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: 'Database error' });
//   }
// });

module.exports = router;
