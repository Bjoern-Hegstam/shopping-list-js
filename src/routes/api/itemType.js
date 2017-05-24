"use strict";

import models from "../../models";
import express from "express";
import HttpStatus from 'http-status-codes';
import {formatSingleItemResponse} from "./../responseFormatter.js";
import {findAll, getById} from './../actions.js';

const router = express.Router();

const ItemType = models.itemType;
const ShoppingListItem = models.shoppingListItem;

router.get('/', (req, res) => {
    const where = {};
    const searchOptions = { where: where };

    const queryName = req.query.name;
    if (queryName) {
        where.name = {
            $or: [
                {$like: '%' + queryName + '%'},
                {$like: queryName.charAt(0).toUpperCase() + queryName.slice(1) + '%'}
            ]
        };
    }

    if (req.query.limit) {
        searchOptions.limit = req.query.limit;
    }

    findAll(res, ItemType, searchOptions);
});

router.get('/:id', (req, res, next) => {
    getById(res, ItemType, req.params.id);
});

router.post('/', (req, res) => {
    const name = req.body.item_type.name;
    ItemType
        .findAll({
            where: {
                name: {
                    $like: name
                }
            }
        })
        .then(itemTypes => {
            if (itemTypes.length > 0) {
                res.sendStatus(HttpStatus.CONFLICT);
            } else {
                ItemType
                    .create(req.body.item_type)
                    .then(itemType => {
                        res
                            .status(HttpStatus.CREATED)
                            .send(formatSingleItemResponse(itemType));
                    }, err => {
                        res.sendStatus(HttpStatus.NOT_FOUND);
                    });
            }
        });
});

router.patch('/:id', (req, res) => {
    const newName = req.body.item_type.name;

    ItemType
        .findById(req.params.id)
        .then(itemType => {
            if (!itemType) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                itemType
                    .update({
                        name: newName
                    })
                    .then(savedItemType => {
                        res
                            .status(HttpStatus.OK)
                            .send(formatSingleItemResponse(savedItemType));
                    });
            }
        });
});

router.delete('/:id', (req, res, next) => {
    ShoppingListItem
        .destroy({
            where: {
                itemTypeId: req.params.id
            }
        }).then(affectedRows => {
            return ItemType.destroy({
                where: {
                    id: req.params.id
                }
            });
        }).then(affectedRows => {
            if (affectedRows > 0) {
                // Item type was found and deleted
                res.sendStatus(HttpStatus.NO_CONTENT);
            } else {
                res.sendStatus(HttpStatus.NOT_FOUND);
            }
        });
});

export default router;
