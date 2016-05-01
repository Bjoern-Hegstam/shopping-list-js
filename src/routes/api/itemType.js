"use strict";

import models from "models";
import express from "express";
import HttpStatus from 'http-status-codes';
import responseFormatter from "./../responseFormatter.js";
import actions from './../actions.js';

const router = express.Router();

const ItemType = models.itemType;

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

    actions.findAll(res, ItemType, searchOptions);
});

router.get('/:id', (req, res, next) => {
    actions.getById(res, ItemType, req.params.id);
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
                            .send(responseFormatter.formatSingleItemResponse(itemType));
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
                            .send(responseFormatter.formatSingleItemResponse(savedItemType));
                    });
            }
        });
});

router.delete('/:id', (req, res, next) => {
    ItemType
        .findById(req.params.id)
        .then(itemType => {
            if (!itemType) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                itemType
                    .destroy()
                    .then(() => {
                        res.sendStatus(HttpStatus.NO_CONTENT);
                    });
            }
        });
});

export default router;
