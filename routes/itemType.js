"use strict";

var models = require("../models");
var express = require("express");
var HttpStatus = require('http-status-codes');
var responseFormatter = require("./responseFormatter.js");
var actions = require('./actions.js');

var router = express.Router();

var ItemType = models.itemType;

router.get('/', function(req, res) {
    var where = {};
    var searchOptions = { where: where };

    if (req.query.name) {
        where.name = {
            like: '%' + req.query.name + '%'
        };
    }

    if (req.query.limit) {
        searchOptions.limit = req.query.limit;
    }

    actions.findAll(res, ItemType, searchOptions);
});

router.get('/:id', function(req, res, next) {
    actions.getById(res, ItemType, req.params.id);
});

router.post('/', function(req, res) {
    ItemType
        .create(req.body.item_type)
        .then(function(itemType) {
            res
                .status(HttpStatus.CREATED)
                .send(responseFormatter.formatSingleItemResponse(itemType));
        }, function(err) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
});

router.patch('/:id', function(req, res) {
    var newName = req.body.item_type.name;

    ItemType
        .findById(req.params.id)
        .then(function(itemType) {
            if (!itemType) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                itemType
                    .update({
                        name: newName
                    })
                    .then(function(savedItemType) {
                        res
                            .status(HttpStatus.OK)
                            .send(responseFormatter.formatSingleItemResponse(savedItemType));
                    });
            }
        });
});

router.delete('/:id', function(req, res, next) {
    ItemType
        .findById(req.params.id)
        .then(function(itemType) {
            if (!itemType) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                itemType
                    .destroy()
                    .then(function() {
                        res.sendStatus(HttpStatus.NO_CONTENT);
                    });
            }
        });
});

module.exports = router;
