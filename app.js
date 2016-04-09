'use strict';

var express = require('express');
var app = express();

var port = 3000;

require('./config/routes.js')(app)

app.listen(port, function() {
	console.log('App listening on port ' + port);
});