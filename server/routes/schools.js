
const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware');

router.get("/", authenticateToken, async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM schools`)
        res.json(result.rows)
    } catch (error) {
        console.error("Error fetching schools", error);
        res.status(500)
    }
});

module.exports = router;