
const express = require('express');
const router = express.Router();
const db = require('../db')

router.get("/", async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM schools`)
        res.json(result.rows)
    } catch (error) {
        console.error("Error fetching schools", error);
        res.status(500)
    }
});

module.exports = router;