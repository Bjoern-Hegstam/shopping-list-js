"use strict";

var models = require("../models");
var express = require("express");
var HttpStatus = require('http-status-codes');
var responseFormatter = require("./responseFormatter.js");
var actions = require('./actions.js');

var router = express.Router();

var ShoppingList = models.shoppingList;
var ShoppingListItem = models.shoppingListItem;

module.exports = function(routePrefix) {
    router.get('/', function(req, res) {
        actions.findAll(res, ShoppingList, routePrefix);
    });

    router.get('/:listId', function(req, res) {
        actions.getById(res, ShoppingList, req.params.listId, routePrefix + req.params.listId);
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

    router.get('/:listId/item', function(req, res) {
        actions.findAll(
            res,
            ShoppingListItem,
            routePrefix + req.params.listId + "/item",
            {
                where: {
                    shoppingListId: req.params.listId
                }
            });
    });

    router.get('/:listId/item/:itemId', function(req, res) {
        actions.findOne(
            res,
            ShoppingListItem,
            routePrefix + req.params.listId + '/item/' + req.params.itemId,
            {
                where: {
                    shoppingListId: req.params.listId,
                    id: req.params.itemId
                }
            }
            );
    });

    router.post('/:listId/item', function(req, res) {
        var data = req.body.data;

        ShoppingListItem
        .findAll({
            where: {
                shoppingListId: req.params.listId,
                itemTypeId: data.itemTypeId
            }
        })
        .then(function(items) {
            if (items.length > 0) {
                res.sendStatus(HttpStatus.CONFLICT);
            } else {
                return ShoppingListItem
                .create({
                    shoppingListId: req.params.listId,
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

    router.patch('/:listId/item/:itemId', function(req, res) {
        var newQuantity = req.body.data.attributes.quantity;

        ShoppingListItem
        .findAll({
            where: {
                shoppingListId: req.params.listId,
                id: req.params.itemId
            }
        })
        .then(function(items) {
            if (items.length === 0) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                items[0]
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