'use strict';

// Add base path
require('app-module-path').addPath(__dirname);

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import viewHelpers from './view_helpers';
import {loadUserForSession} from './user_management';
import models from './models';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session handling
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionSettings = {
    name: 'sessionId',
    secret: process.env.SESSION_SECRET || 'verysecret'
};

if (process.env.NODE_ENV == 'production') {
    sessionSettings.store = new SequelizeStore({
        db: models.sequelize,
        table: 'Session'
    });
}

app.use(session(sessionSettings));

// Session-persisted message middleware
app.use((req, res, next) => {
    const transferMessage = (name) => {
        if (req.session[name]) {
            res.locals[name] = req.session[name];
            delete req.session[name];
        }
    };

    transferMessage('error');
    transferMessage('info');
    transferMessage('success');

    next();
});

// static
app.use('/static', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// User
app.use(loadUserForSession);

// Routes
require('./routes/routesManager.js').use(app);

// views
const hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: viewHelpers
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

export default app;
