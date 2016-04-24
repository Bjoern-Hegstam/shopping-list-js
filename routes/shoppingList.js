"use strict";

const models = require("../models");
const express = require("express");
const HttpStatus = require('http-status-codes');
const responseFormatter = require("./responseFormatter.js");
const actions = require('./actions.js');

const router = express.Router();

const ShoppingList = models.shoppingList;
const ShoppingListItem = models.shoppingListItem;

router.get('/', (req, res) => {
    actions.findAll(res, ShoppingList);
});

router.get('/:listId', (req, res) => {
    actions.getById(res, ShoppingList, req.params.listId);
});

router.post('/', (req, res) => {
    ShoppingList
        .create(req.body.shopping_list)
        .then(shoppingList => {
            res
                .status(HttpStatus.CREATED)
                .send(responseFormatter.formatSingleItemResponse(shoppingList));
        }, err => {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
});

router.get('/:listId/item', (req, res) => {
    actions.findAll(
        res,
        ShoppingListItem, {
            where: {
                shoppingListId: req.params.listId
            }
        });
});

router.get('/:listId/item/:itemId', (req, res) => {
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

router.post('/:listId/item', (req, res) => {
    const data = req.body.shopping_list_item;

    ShoppingListItem
        .findAll({
            where: {
                shoppingListId: req.params.listId,
                itemTypeId: data.item_type_id
            }
        })
        .then(items => {
            if (items.length > 0) {
                res.sendStatus(HttpStatus.CONFLICT);
            } else {
                return ShoppingListItem
                    .create({
                        shoppingListId: req.params.listId,
                        itemTypeId: data.item_type_id,
                        quantity: data.quantity
                    })
                    .then(item => {
                        res
                            .status(HttpStatus.CREATED)
                            .send(responseFormatter.formatSingleItemResponse(item));
                    });
            }
        });
});

router.patch('/:listId/item/:itemId', (req, res) => {
    const listId = req.params.listId;
    const itemId = req.params.itemId;

    const reqItem = req.body.shopping_list_item;

    const updateAttributes = {};
    if (reqItem.quantity) {
        updateAttributes.quantity = reqItem.quantity;
    }

    if (typeof reqItem.in_cart == 'boolean') {
        updateAttributes.inCart = reqItem.in_cart;
    }

    actions.findAndUpdate(
        res,
        ShoppingListItem, {
            where: {
                shoppingListId: req.params.listId,
                id: req.params.itemId
            }
        }, updateAttributes
    );
});

router.delete('/:listId/item/:itemId', (req, res) => {
    const listId = req.params.listId;
    const itemId = req.params.itemId;

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

router.delete('/:listId/cart', (req, res) => {
    const listId = req.params.listId;
    const itemId = req.params.itemId;

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
