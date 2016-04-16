"use strict";

var models = require("../models");
var express = require("express");
var responseFormatter = require("./responseFormatter.js");

var router = express.Router();

var ItemType = models.itemType;

module.exports = function(routePrefix) {
    router.get('/', function(req, res) {
        ItemType
        .findAll()
        .then(function(itemTypes) {
            res.send(formatCollectionResponse(itemTypes));
        }, function(err) {
            res.sendStatus(404);
        });
    });

    router.get('/:id', function(req, res, next) {
        ItemType
        .findById(req.params.id)
        .then(function(itemType) {
            if (!itemType) {
                res.sendStatus(404);
            } else {
                res.send(formatSingleItemTypeResponse(itemType));
            }
        });
    });

    router.post('/', function(req, res) {
        ItemType
        .create(req.body.data.attributes)
        .then(function(itemType) {
            res.status(201).send(formatSingleItemTypeResponse(itemType));
        }, function(err) {
            res.sendStatus(404);
        });
    });

    router.patch('/:id', function(req, res) {
        var newName = req.body.data.attributes.name;

        ItemType
        .findById(req.params.id)
        .then(function(itemType) {
            if (!itemType) {
                res.sendStatus(404);
            } else {
                itemType
                .update({name: newName})
                .then(function(savedItemType) {
                    res.status(200).send(formatSingleItemTypeResponse(savedItemType));
                });
            }
        });
    });

    router.delete('/:id', function(req, res, next) {
        ItemType
        .findById(req.params.id)
        .then(function(itemType) {
            if (!itemType) {
                res.sendStatus(404);
            } else {
                itemType
                .destroy()
                .then(function() {
                    res.sendStatus(204);
                });
            }
        });
    });

    function formatSingleItemTypeResponse(itemType) {
        return responseFormatter.formatSingleItemResponse(
            routePrefix + "itemtype/" + itemType.id,
            itemType
            );
    }

    function formatCollectionResponse(itemTypes) {
        return responseFormatter.formatCollectionResponse(
            routePrefix + "itemtype",
            itemTypes
            );
    }

    return router;
};