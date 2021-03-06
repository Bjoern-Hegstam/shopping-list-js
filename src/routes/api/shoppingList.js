"use strict";

import models from '../../models';
import express from 'express';
import HttpStatus from 'http-status-codes';
import { formatSingleItemResponse } from "./../responseFormatter.js";
import {getById, findOne, findAll, findAndUpdate, findAndDestroy} from './../actions.js';

const router = express.Router();

const ShoppingList = models.shoppingList;
const ShoppingListItem = models.shoppingListItem;

router.get('/', (req, res) => {
    findAll(res, ShoppingList);
});

router.get('/:listId', (req, res) => {
    getById(res, ShoppingList, req.params.listId);
});

router.post('/', (req, res) => {
    ShoppingList
        .create(req.body.shopping_list)
        .then(shoppingList => {
            res
                .status(HttpStatus.CREATED)
                .send(formatSingleItemResponse(shoppingList));
        }, err => {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
});

router.get('/:listId/item', (req, res) => {
    findAll(
        res,
        ShoppingListItem, {
            where: {
                shoppingListId: req.params.listId
            }
        });
});

router.get('/:listId/item/:itemId', (req, res) => {
    findOne(
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
                        const responseData = formatSingleItemResponse(item);
                        if (req.accepts('html')) {
                            item.getItemType()
                                .then(itemType => {
                                    const context = responseData.shopping_list_item;
                                    context.item_type = formatSingleItemResponse(itemType).item_type;
                                    context.layout = false;
                                    res.render('partials/shopping_list_item', context);
                                });

                        } else {
                            res.status(HttpStatus.CREATED)
                                .send(responseData);
                        }
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

    findAndUpdate(
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

    findAndDestroy(
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

    findAndDestroy(
        res,
        ShoppingListItem, {
            where: {
                shoppingListId: listId,
                inCart: true
            }
        }
    );
});

export default router;
