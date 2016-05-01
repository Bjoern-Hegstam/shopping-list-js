"use strict";

const models = require("models");
const express = require("express");
const HttpStatus = require('http-status-codes');
const responseFormatter = require("./../responseFormatter.js");
const actions = require('./../actions.js');

const router = express.Router();

const ItemType = models.itemType;

router.get('/', (req, res) => {
    const where = {};
    const searchOptions = { where: where };

    if (req.query.name) {
        where.name = {
            like: '%' + req.query.name + '%'
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
                    $or: {
                        $like: '%' + name + '%',
                        $like: name.charAt(0).toUppercase() + name.slice(1) + '%'
                    }
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

module.exports = router;
