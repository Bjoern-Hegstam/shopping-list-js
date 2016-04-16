"use strict";

var models = require("../models");
var express = require("express");
var HttpStatus = require('http-status-codes');
var responseFormatter = require("./responseFormatter.js");
var getters = require('./getters.js');

var router = express.Router();

var ItemType = models.itemType;

module.exports = function(routePrefix) {
    router.get('/', function(req, res) {
        ItemType
        .findAll()
        .then(function(itemTypes) {
            res
            .status(HttpStatus.OK)
            .send(responseFormatter.formatCollectionResponse(routePrefix,itemTypes));
        }, function(err) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
    });

    router.get('/:id', function(req, res, next) {
        getters.getById(res, ItemType, req.params.id, routePrefix + req.params.id);
    });

    router.post('/', function(req, res) {
        ItemType
        .create(req.body.data.attributes)
        .then(function(itemType) {
            res
            .status(HttpStatus.CREATED)
            .send(responseFormatter.formatSingleItemResponse(routePrefix + itemType.id, itemType));
        }, function(err) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
    });

    router.patch('/:id', function(req, res) {
        var newName = req.body.data.attributes.name;

        ItemType
        .findById(req.params.id)
        .then(function(itemType) {
            if (!itemType) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                itemType
                .update({name: newName})
                .then(function(savedItemType) {
                    res
                    .status(HttpStatus.OK)
                    .send(responseFormatter.formatSingleItemResponse(routePrefix + savedItemType.id, savedItemType));
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

    return router;
};