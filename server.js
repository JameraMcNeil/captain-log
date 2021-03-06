// ======== DEPENDENCIES ===========

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// ======== CONFIGURATION ==========
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

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

// delete

app.delete('/logs/:id', (req, res) => {
    Log.findByIdAndRemove(req.params.id, (error, deletedLogs) => {
        console.log('Deleting: ' + deletedLogs)
        res.redirect('/logs')
    })
})

// edit

app.get('/logs/:id/edit', (req, res) => {
    Log.findById(req.params.id, (error, foundLogs) => {
        res.render('edit.ejs', {
            log: foundLogs
        })
    })
})

// put Update

app.put('/logs/:id', (req, res) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    }

    // param 1 = id of fruit  we are going to update
    // param 2 - the contents of the update going to the database
    // param 3 = make sure mongoose send us back the changed record
    // param 4 = the callback to execute after the database is updated
    
    Log.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedLog) => {
        res.redirect('/logs');
    })
    // console.log(req.body)
})


app.listen(port, () => {
    console.log('Listening in on port ' + port);
})