// ======== DEPENDENCIES ===========

const express = require('express');
const mongoose = require('mongoose')

// ======== CONFIGURATION ==========
const app = express();
const port = 3000;
app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

// ========= MODELS ============

const Log = require('./models/logs')

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
    Log.create(req.body, (error, logEntry) => {
        res.send(logEntry)
        res.redirect('show.ejs')
    })
})

app.listen(port, () => {
    console.log('Listening in on port ' + port);
})