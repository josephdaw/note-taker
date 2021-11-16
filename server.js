const express = require('express');
const app = express();

const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=>{
    console.log(`Application listening at http://localhost:${PORT}`);
});