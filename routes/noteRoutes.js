const fs = require('fs');
const router = require('express').Router();
// A module package that generates a unique id;
const {v4: uuidv4} = require('uuid');

//GET ==> /api/v1/notes (get all notes from db)
//POST ==> /api/v1/notes (add a new note to db)
//PUT ==> /api/v1/notes/:id
//DELETE ==> /api/v1/notes/:id

function getData() {
    const data = fs.readFileSync('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
    });
    const parsedData = JSON.parse(data)
    return parsedData
}

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/notes', (req, res) => {
    // Read the contents of the db.json file.
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});


// POST / api / notes should receive a new note to save on the request body, add 
// it to the db.json file, and then return the new note to the client.
router.post('/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    };
    const data = fs.readFileSync('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
    });
    const parsedData = JSON.parse(data);
    parsedData.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(parsedData, null, 2), (err) => {
        if (err) throw err
    })
    res.json(parsedData);
});

router.delete("/notes/:id", (req, res) => {
    const id = req.params.id
    const updatedData = getData().filter(item => item.id !== id) //iterate over all objects in the array and remove the id that matches the req.params
    fs.writeFileSync("./db/db.json", JSON.stringify(updatedData), (err) => {
        if (err) throw err
    })
    res.json(updatedData)
});

module.exports = router;