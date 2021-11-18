const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)));
});

// POST route for adding a new note
notes.post('/', (req, res) => {
    if (req.body) {

        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4(),
        }

        readAndAppend(newNote, './db/db.json')
        res.json('Note added successfully.')
    } else {
        res.json('There was an error adding the note.')
    }
})

// DELETE Route for removing a specific note
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of notes except for the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`${noteId} has been deleted 🗑️`);
    });
});


module.exports = notes;
