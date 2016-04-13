"use strict";

var models = require("../models");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
	models
	.itemType
	.findAll()
	.then(function(itemTypes) {
		res.render('itemType',  {'itemTypes': itemTypes});
	});
});

module.exports = router;