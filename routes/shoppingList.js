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
            routePrefix + req.params.listId + "/item", {
                where: {
                    shoppingListId: req.params.listId
                }
            });
    });

    router.get('/:listId/item/:itemId', function(req, res) {
        actions.findOne(
            res,
            ShoppingListItem,
            routePrefix + req.params.listId + '/item/' + req.params.itemId, {
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
        var listId = req.params.listId;
        var itemId = req.params.itemId;
        var newQuantity = req.body.data.attributes.quantity;

        actions.findAndUpdate(
            res,
            ShoppingListItem,
            routePrefix + listId + "/item/" + itemId, {
                where: {
                    shoppingListId: req.params.listId,
                    id: req.params.itemId
                }
            }, {
                quantity: newQuantity
            }
        );
    });

    router.post('/:listId/item/:itemId/cart', function(req, res) {
        var listId = req.params.listId;
        var itemId = req.params.itemId;

        actions.findAndUpdate(
            res,
            ShoppingListItem,
            routePrefix + listId + "/item/" + itemId, {
                where: {
                    shoppingListId: listId,
                    id: itemId,
                    inCart: false
                }
            }, {
                inCart: true
            }
        );
    });

    function shoppingListItemLink(item) {
        return routePrefix + item.shoppingListId + "/item/" + item.id;
    }

    return router;
};