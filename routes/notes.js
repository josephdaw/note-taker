const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
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


module.exports = notes;
