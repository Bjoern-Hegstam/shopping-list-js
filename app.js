'use strict';

// Modules
var express = require('express');

var port = 3000;
var app = express();

// Routes
require('./config/routes.js')(app)

// Run server
startApp();

// Util
function startApp() {
	app.listen(port);
	console.log('App started on port ' + port);
}