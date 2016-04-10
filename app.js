'use strict';

// Modules
var express = require('express');
var models = require('./models');

var port = 3000;
var app = express();

// Routes
var routes = require('./routes/index');
app.use('/', routes);

// Run server
models
	.sequelize
	.sync()
	.then(startApp);

// Util
function startApp() {
	app.listen(port);
	console.log('App started on port ' + port);
}
