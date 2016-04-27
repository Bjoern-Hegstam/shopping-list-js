'use strict';

// Add base path
require('app-module-path').addPath(__dirname);

// Modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const models = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(session({
    name: 'sessionId',
    secret: 'verysecret'
}));

// static
app.use('/static', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

function checkAuth(req, res, next) {
    if (req.session.userId) {
        return next();
    }

    res.redirect('/login');
}

// Routes
require('./routes/routesManager.js').use(app, checkAuth);

// views
const hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        toggleClass: function(val, classTrue, classFalse) {
            return val === 'true' ? classTrue : classFalse;
        }
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === 'test') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500).send(JSON.stringify(err));
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
});

module.exports = app;
