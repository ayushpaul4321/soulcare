const express = require('express');
const router = express.Router();

let moodHistory = [];

router.post('/', (req, res) => {
    const { mood, emotions, thoughts } = req.body;

    if (!mood || !emotions || !thoughts) {
        return res.status(400).json({ message: 'Please provide mood, emotions, and thoughts.' });
    }
    const moodData = { mood, emotions, thoughts, date: new Date() };
    moodHistory.push(moodData);

    // Respond back to the client
    res.status(201).json({
        message: 'Mood recorded successfully!',
        data: moodData
    });
});

// GET /mood/history: Route to retrieve mood history
router.get('/history', (req, res) => {
    const { startDate, endDate } = req.query;
    let filteredHistory = moodHistory;

    if (startDate) {
        filteredHistory = filteredHistory.filter(item => new Date(item.date) >= new Date(startDate));
    }

    if (endDate) {
        filteredHistory = filteredHistory.filter(item => new Date(item.date) <= new Date(endDate));
    }
    res.status(200).json({
        message: 'Mood history retrieved successfully!',
        data: filteredHistory
    });
});

module.exports = router;
