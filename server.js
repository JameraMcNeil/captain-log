// ======== DEPENDENCIES ===========

const express = require('express');


// ======== CONFIGURATION ==========
const app = express();
const port = 3000;


// ========= ROUTES ==============

app.get('/logs/new', (req, res) => {
    res.render('new.ejs')
})

app.listen(port, () => {
    console.log('Listening in on port ' + port);
})