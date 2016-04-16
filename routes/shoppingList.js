"use strict";

var models = require("../models");
var express = require("express");
var responseFormatter = require("./responseFormatter.js");

var router = express.Router();

var ShoppingList = models.shoppingList;

module.exports = function(routePrefix) {
    router.get('/', function(req, res) {
        ShoppingList
        .findAll()
        .then(function(shoppingLists) {
            res.send(formatCollectionResponse(shoppingLists));
        }, function(err) {
            res.sendStatus(404);
        });
    });

    router.post('/', function(req, res) {
        ShoppingList
        .create(req.body.data.attributes)
        .then(function(shoppingList) {
            res.status(201).send(formatSingleShoppingListResponse(shoppingList));
        }, function(err) {
            res.sendStatus(404);
        });
    });

    function formatSingleShoppingListResponse(itemType) {
        return responseFormatter.formatSingleItemResponse(
            routePrefix + itemType.id,
            itemType
            );
    }

    function formatCollectionResponse(shoppingLists) {
        return responseFormatter.formatCollectionResponse(
            routePrefix,
            shoppingLists
            );
    }

    return router;
};