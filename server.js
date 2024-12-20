const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const allNames = ['Pi Uan', 'Lynn', 'Mr. Supra', 'Plar', 'K. Tse', 'Nom Nuang', 'Ao', 'Pluem', 'Da Tuat', 'Pi Dang', 'Ice', ];
let hatNames = [...allNames]; // Copy of allNames for drawing
let pairs = [];

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to get names for selection
app.get('/names', (req, res) => {
    res.json(allNames);
});

// Endpoint to draw a name
app.post('/draw', (req, res) => {
    const { selectedName } = req.body;

    if (pairs.some(pair => pair.selectedName === selectedName)) {
        return res.status(400).json({ error: 'This person has already been paired.' });
    }

    const remainingNames = hatNames.filter(name => name !== selectedName);
    const drawnName = remainingNames[Math.floor(Math.random() * remainingNames.length)];

    hatNames = hatNames.filter(name => name !== drawnName);

    pairs.push({ selectedName, drawnName });

    res.json({ drawnName });
});

// Endpoint to view current pairs
app.get('/pairs', (req, res) => {
    res.json(pairs);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Open your browser and go to: http://localhost:' + port);
});