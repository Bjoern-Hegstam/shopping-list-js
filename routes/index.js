"use strict";

var models = require("../models");
var express = require("express");
var router = express.Router();

var responseFormatter = require("./responseFormatter.js");

router.get("/", function(req, res) {
    models
    .shoppingList
    .findAll()
    .then(shopppingLists => {
        res.render('home', responseFormatter.formatCollectionResponse('', shopppingLists));
    });

});

module.exports = router;