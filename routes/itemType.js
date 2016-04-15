"use strict";

var models = require("../models");
var express = require("express");
var router = express.Router();

var ItemType = models.itemType;

router.get('/', function(req, res) {
    ItemType
    .findAll(req.params.id)
    .then(function(itemTypes) {
        res.send(itemTypes);
    }, function(err) {
        res.render('error', {
            'message': err.name,
            'error': err.message
        });
    });
});

router.get('/:id', function(req, res) {
    ItemType
    .findById(req.params.id)
    .then(function(itemType) {
        res.send(itemType.toJSON());
    }, function(err) {
        res.render('error', {
            'message': err.name,
            'error': err.message
        });
    });
});

router.post('/', function(req, res) {
    ItemType
    .create(req.body)
    .then(function(itemType) {
        res.send(itemType.toJSON());
    }, function(err) {
        res.render('error', {
            'message': err.name,
            'error': err.message
        });
    });
});

module.exports = router;