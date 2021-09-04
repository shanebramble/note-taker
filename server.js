const express = require('express');
const path = require('path');
const fs = require('fs');
// Reference the db.json file.
const {db} = require('./db/db');
// A module package that generates a unique id;
const { v4: uuidv4 } = require('uuid');
const createNotes = require('./lib/createNotes');

const app = express();
// The following code to serve images, CSS files, and JavaScript files in a directory named public:
app.use(express.static('public'))
// Middleware for post request.
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
const PORT = process.env.PORT || 3001;

function getData() {
    const data = fs.readFileSync('db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
    });
    const parsedData = JSON.parse(data)
    return parsedData
}

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    // Read the contents of the db.json file.
    fs.readFile('db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

//GET ==> /api/v1/notes (get all notes from db)
//POST ==> /api/v1/notes (add a new note to db)
//PUT ==> /api/v1/notes/:id
//DELETE ==> /api/v1/notes/:id

// POST / api / notes should receive a new note to save on the request body, add 
// it to the db.json file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
    const newNote = {
           title: req.body.title,
           text: req.body.text,
           id: uuidv4()
        };
         const data = fs.readFileSync('db/db.json', 'utf-8', (err, data) => {
             if (err) throw err;
         });
         const parsedData = JSON.parse(data)
         parsedData.push(newNote)
         fs.writeFileSync("./db/db.json", JSON.stringify(parsedData), (err) => {
             if(err) throw err
         })
        res.json(parsedData)
});

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id
    const updatedData = getData().filter(item => item.id !== id) //iterate over all objects in the array and remove the id that matches the req.params
    fs.writeFileSync("./db/db.json", JSON.stringify(updatedData), (err) => {
        if (err) throw err
    })
    res.json(updatedData)
})

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