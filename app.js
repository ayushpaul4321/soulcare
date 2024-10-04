const express = require('express');
const crisisRoutes = require('./routes/crisis.js');
const moodRoutes = require('./routes/mood.js');

const app = express();

app.use(express.json());

app.use('/crisis', crisisRoutes);
app.use('/mood', moodRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'It works!' });
});

module.exports = app;
