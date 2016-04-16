"use strict";

var models = require("../models");
var express = require("express");
var HttpStatus = require('http-status-codes');
var responseFormatter = require("./responseFormatter.js");
var getters = require('./getters.js');

var router = express.Router();

var ShoppingList = models.shoppingList;
var ShoppingListItem = models.shoppingListItem;

module.exports = function(routePrefix) {
    router.get('/', function(req, res) {
        ShoppingList
        .findAll()
        .then(function(shoppingLists) {
            res
            .status(HttpStatus.OK)
            .send(responseFormatter.formatCollectionResponse(routePrefix, shoppingLists));
        }, function(err) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
    });

    router.get('/:id', function(req, res) {
        getters.getById(res, ShoppingList, req.params.id, routePrefix + req.params.id);
    });

    router.post('/', function(req, res) {
        ShoppingList
        .create(req.body.data.attributes)
        .then(function(shoppingList) {
            res
            .status(HttpStatus.CREATED)
            .send(responseFormatter.formatSingleItemResponse(routePrefix + shoppingList.id, shoppingList));
        }, function(err) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
    });

    router.get('/:id/item', function(req, res) {
        ShoppingListItem
        .findAll({
            where: {
                shoppingListId: req.params.id
            }
        })
        .then(function(items) {
            res
            .status(HttpStatus.OK)
            .send(responseFormatter.formatCollectionResponse(
                routePrefix + req.params.id + "/item",
                items
                ));
        });
    });

    router.get('/:id/item/:itemId', function(req, res) {
        getters.getById(res, ShoppingListItem, req.params.itemId, routePrefix + req.params.id + '/item/' + req.params.itemId);
    });

    router.post('/:id/item', function(req, res) {
        var data = req.body.data;

        ShoppingListItem
        .findAll({
            where: {
                shoppingListId: req.params.id,
                itemTypeId: data.itemTypeId
            }
        })
        .then(function(items) {
            if (items.length > 0) {
                res.sendStatus(HttpStatus.CONFLICT);
            } else {
                return ShoppingListItem
                .create({
                    shoppingListId: req.params.id,
                    itemTypeId: data.itemTypeId,
                    quantity: data.quantity
                })
                .then(function(item) {
                    res
                    .status(HttpStatus.CREATED)
                    .send(responseFormatter.formatSingleItemResponse(shoppingListItemLink(item), item));
                });
            }
        });
    });

    router.patch('/:id/item/:itemId', function(req, res) {
        var newQuantity = req.body.data.quantity;

        ShoppingListItem
        .findById(req.params.itemId)
        .then(function(item) {
            if (!item) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                item
                .update({quantity: newQuantity})
                .then(function(savedItem) {
                    res
                    .status(HttpStatus.OK)
                    .send(responseFormatter.formatSingleItemResponse(shoppingListItemLink(savedItem), savedItem));
                });
            }
        });
    });

    function shoppingListItemLink(item) {
        return routePrefix + item.shoppingListId + "/item/" + item.id;
    }

    return router;
};