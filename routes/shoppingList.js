"use strict";

var models = require("../models");
var express = require("express");
var responseFormatter = require("./responseFormatter.js");

var router = express.Router();

var ShoppingList = models.shoppingList;
var ShoppingListItem = models.shoppingListItem;

module.exports = function(routePrefix) {
    router.get('/', function(req, res) {
        ShoppingList
        .findAll()
        .then(function(shoppingLists) {
            res
            .status(200)
            .send(responseFormatter.formatCollectionResponse(routePrefix, shoppingLists));
        }, function(err) {
            res.sendStatus(404);
        });
    });

    router.post('/', function(req, res) {
        ShoppingList
        .create(req.body.data.attributes)
        .then(function(shoppingList) {
            res
            .status(201)
            .send(responseFormatter.formatSingleItemResponse(routePrefix + shoppingList.id, shoppingList));
        }, function(err) {
            res.sendStatus(404);
        });
    });

    router.post('/:id/item', function(req, res) {
        var data = req.body.data;

        ShoppingListItem
        .create({
            shoppingListId: req.params.id,
            itemTypeId: data.itemTypeId,
            quantity: data.quantity
        })
        .then(function(item) {
            var selfLink = routePrefix + item.shoppingListId + "/item/" + item.id;
            
            res
            .status(201)
            .send(responseFormatter.formatSingleItemResponse(selfLink, item));
        }, function(err) {
            res.sendStatus(404);
        });
    });

    return router;
};