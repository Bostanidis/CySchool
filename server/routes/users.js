
const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware');

router.get("/", authenticateToken, async (req, res) => {

    const { participants } = req.query;

    const participantIds = Array.isArray(participants)
        ? participants
        : typeof participants === 'string'
        ? [participants]
        : [];

    try {
        const result = await db.query(`SELECT * FROM users WHERE id = ANY($1::uuid[])`, [participantIds])
        res.json(result.rows)
    } catch (error) {
        console.error("Error fetching schools", error);
        res.status(500)
    }
});

module.exports = router;