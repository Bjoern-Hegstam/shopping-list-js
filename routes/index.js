"use strict";

var models = require("../models");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
	var itemType = models
	.ItemType
	.build({
		name: 'MyItemType'
	});

	itemType
	.save()
	.then(function(obj) {
		models
		.ItemType
		.findAll()
		.then(function(itemTypes) {
            res.send(itemTypes);
        })
    });
});

module.exports = router;