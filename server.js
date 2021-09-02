const express = require('express');
const path = require('path');
// Reference the db json file.
const {db} = require('./db/db');

const app = express();
// The following code to serve images, CSS files, and JavaScript files in a directory named public:
app.use(express.static('public'))

const PORT = process.env.PORT || 3001;

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/db', (req, res) => {
    res.json(db);
});

// A route to serve main index.html when loaded first.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// * should return the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Listen to any incomming requests from an established PORT.
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});