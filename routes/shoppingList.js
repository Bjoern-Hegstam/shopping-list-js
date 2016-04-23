"use strict";

var models = require("../models");
var express = require("express");
var HttpStatus = require('http-status-codes');
var responseFormatter = require("./responseFormatter.js");
var actions = require('./actions.js');

var router = express.Router();

var ShoppingList = models.shoppingList;
var ShoppingListItem = models.shoppingListItem;

router.get('/', function(req, res) {
    actions.findAll(res, ShoppingList);
});

router.get('/:listId', function(req, res) {
    actions.getById(res, ShoppingList, req.params.listId);
});

router.post('/', function(req, res) {
    ShoppingList
        .create(req.body.shopping_list)
        .then(function(shoppingList) {
            res
                .status(HttpStatus.CREATED)
                .send(responseFormatter.formatSingleItemResponse(shoppingList));
        }, function(err) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
});

router.get('/:listId/item', function(req, res) {
    actions.findAll(
        res,
        ShoppingListItem, {
            where: {
                shoppingListId: req.params.listId
            }
        });
});

router.get('/:listId/item/:itemId', function(req, res) {
    actions.findOne(
        res,
        ShoppingListItem, {
            where: {
                shoppingListId: req.params.listId,
                id: req.params.itemId
            }
        }
    );
});

router.post('/:listId/item', function(req, res) {
    var data = req.body.shopping_list_item;

    ShoppingListItem
        .findAll({
            where: {
                shoppingListId: req.params.listId,
                itemTypeId: data.item_type_id
            }
        })
        .then(function(items) {
            if (items.length > 0) {
                res.sendStatus(HttpStatus.CONFLICT);
            } else {
                return ShoppingListItem
                    .create({
                        shoppingListId: req.params.listId,
                        itemTypeId: data.item_type_id,
                        quantity: data.quantity
                    })
                    .then(function(item) {
                        res
                            .status(HttpStatus.CREATED)
                            .send(responseFormatter.formatSingleItemResponse(item));
                    });
            }
        });
});

router.patch('/:listId/item/:itemId', function(req, res) {
    var listId = req.params.listId;
    var itemId = req.params.itemId;
    var newQuantity = req.body.shopping_list_item.quantity;

    actions.findAndUpdate(
        res,
        ShoppingListItem, {
            where: {
                shoppingListId: req.params.listId,
                id: req.params.itemId
            }
        }, {
            quantity: newQuantity
        }
    );
});

router.delete('/:listId/item/:itemId', function(req, res) {
    var listId = req.params.listId;
    var itemId = req.params.itemId;

    actions.findAndDestroy(
        res,
        ShoppingListItem, {
            where: {
                shoppingListId: req.params.listId,
                id: req.params.itemId
            }
        }
    );
});

router.post('/:listId/item/:itemId/cart', function(req, res) {
    var listId = req.params.listId;
    var itemId = req.params.itemId;

    actions.findAndUpdate(
        res,
        ShoppingListItem, {
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

router.delete('/:listId/cart', function(req, res) {
    var listId = req.params.listId;
    var itemId = req.params.itemId;

    actions.findAndDestroy(
        res,
        ShoppingListItem, {
            where: {
                shoppingListId: listId,
                inCart: true
            }
        }
    );
});

module.exports = router;
