'use strict';

// Modules
var express = require('express');
var models = require('./models');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

// Routes
var routes = require('./routes/index');
var itemTypeRoutes = require('./routes/itemType.js');
var shoppingListRoutes = require('./routes/shoppingList.js');

app.use('/', routes);
app.use('/api/itemtype', itemTypeRoutes('/api/itemtype/'));
app.use('/api/shoppinglist', shoppingListRoutes('/api/shoppinglist/'));

// Other conf
app.set('view engine', 'pug');
app.use('/static', express.static(__dirname + '/public'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;