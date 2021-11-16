const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const app = express();
const PORT = process.env.PORT || 3000;

// listen for requests
app.listen(PORT, () => {
    console.log(`Application listening at http://localhost:${PORT}`);
});

// serve up the static pages in the public folder
app.use(express.static('public'));

// route to api
app.use('/api', api);

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// wildcard redirect to homepage
app.get('*', (req, res) => res.redirect('/'));
