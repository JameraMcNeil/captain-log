// ======== DEPENDENCIES ===========

const express = require('express');


// ======== CONFIGURATION ==========
const app = express();
const port = 3000;


// ========= ROUTES ==============

app.listen(port, () => {
    console.log('Listening in on port ' + port);
})