"use strict";

const models = require("models");
const express = require("express");
const router = express.Router();

const actions = require('./actions.js');
const responseFormatter = require("./responseFormatter.js");

const ItemType = models.itemType;
const User = models.user;

router.get("/item-types", (req, res) => {
    ItemType
    .findAll()
    .then(itemTypes => {
        res.render('item_types', responseFormatter.formatCollectionResponse(ItemType, itemTypes));
    });
});

router.get('/users', (req, res) => {
    User
    .findAll()
    .then(users => {
        res.render('users', responseFormatter.formatCollectionResponse(User, users));
    })
});

module.exports = router;