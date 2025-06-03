const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../middleware');

router.get('/', authenticateToken, async (req, res) => {
    const rawSchool = req.query.school;
    const rawGrade = req.query.grade;

    // Log raw inputs
    console.log("Raw query params:", { school: rawSchool, grade: rawGrade });

    const school = parseInt(rawSchool);
    const grade = String(rawGrade);

    // Validate inputs
    if (isNaN(school) || !grade || grade.trim() === "") {
        return res.status(400).json({ error: "Invalid or missing school or grade" });
    }

    try {
        console.log("Final query params:", { school, grade });

        const classmates = await db.query(
            `SELECT * FROM users WHERE school = $1 AND grade = $2`,
            [school, grade]
        );

        const schoolers = await db.query(
            `SELECT * FROM users WHERE school = $1 AND grade != $2`,
            [school, grade]
        );

        res.status(200).json({
            classmates: classmates.rows,
            schoolers: schoolers.rows
        });
    } catch (err) {
        console.error("Database query failed:", err);
        res.status(500).json({ error: "Database error" });
    }
});


module.exports = router;
