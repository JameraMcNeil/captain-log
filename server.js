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

// index
app.get('/logs', (req, res) => {
    Log.find({}, (error, logs) => {
        res.render('index.ejs', {
            allLogs: logs
        })
    })
    
})

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
        res.redirect('/logs')
    })
})

// show
app.get('/logs/:id', (req, res) => {
    Log.findById(req.params.id, (error, logs) => {
        res.render('show.ejs', {
            logEntry : logs
        })
    })
})

app.listen(port, () => {
    console.log('Listening in on port ' + port);
})