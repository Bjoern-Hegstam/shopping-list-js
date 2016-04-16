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
            res.send(itemTypes);
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
                res.send(formatGetItemTypeResponse(itemType));
            }
        });
    });

    router.post('/', function(req, res) {
        ItemType
        .create(req.body.data.attributes)
        .then(function(itemType) {
            res.status(201).send(formatCreatedItemTypeResponse(itemType));
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
                    console.log(savedItemType);

                    res.status(200).send(formatGetItemTypeResponse(savedItemType));
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
                itemType.destroy();
                res.sendStatus(204);
            }
        });
    });

    function formatGetItemTypeResponse(itemType) {
        return responseFormatter.formatGetResponse(
            itemType.Model.name.toLowerCase(),
            itemType.id,
            {
                name: itemType.name
            },
            routePrefix + "itemtype/" + itemType.id
            );
    }

    function formatCreatedItemTypeResponse(itemType) {
        return responseFormatter.formatCreatedResponse(
            itemType.Model.name.toLowerCase(),
            itemType.id,
            {
                name: itemType.name
            },
            routePrefix + "itemtype/" + itemType.id
            );
    }

    return router;
};