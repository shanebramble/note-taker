const fs = require('fs');
const path = require('path');


const createNotes = (body, notesArray) => {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'), notesArray);
    // return notesArray;
};


module.exports = createNotes;