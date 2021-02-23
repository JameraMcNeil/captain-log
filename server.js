// ======== DEPENDENCIES ===========

const express = require('express');


// ======== CONFIGURATION ==========
const app = express();
const port = 3000;
app.use(express.urlencoded({extended:true}));

// ========= ROUTES ==============

app.get('/logs/new', (req, res) => {
    res.render('new.ejs')
})

// create
app.post('/logs/', (req, res) => {
    if (req.body.shipIsBroken === 'on') { // if checked, req.body shipIsBroken is 'on'
    req.body.shipIsBroken = true;
    } else { //if not checked, req.body.shipIsBroken is undefined
        req.body.shipIsBroken = false;
    }
    console.log(req.body)
    res.send(req.body)
})

app.listen(port, () => {
    console.log('Listening in on port ' + port);
})