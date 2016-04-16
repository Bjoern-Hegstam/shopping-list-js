"use strict";

var models = require("../models");
var express = require("express");
var responseFormatter = require("./responseFormatter.js");

var router = express.Router();

var ItemType = models.itemType;

module.exports = function(routePrefix) {
    router.get('/', function(req, res) {
        ItemType
        .findAll(req.params.id)
        .then(function(itemTypes) {
            res.send(itemTypes.toJSON());
        }, function(err) {
            res.render('error', {'message': err.message});
        });
    });

    router.get('/:id', function(req, res, next) {
        ItemType
        .findById(req.params.id)
        .then(function(itemType) {
            if (!itemType) {
                return next();
            }

            res.send(formatGetItemTypeResponse(itemType));
        });
    });

    router.post('/', function(req, res) {
        ItemType
        .create(req.body.data.attributes)
        .then(function(itemType) {
            res.status(201).send(formatCreatedItemTypeResponse(itemType));
        }, function(err) {
            res.render('error', {'message': err.message});
        });
    });

    router.delete('/:id', function(req, res, next) {
        ItemType
        .findById(req.params.id)
        .then(function(itemType) {
            if (!itemType) {
                return next();
            }

            itemType.destroy();
            res.status(204); // Delete, no content in response
            res.send();
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