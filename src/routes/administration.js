"use strict";

import models from "../models";
import express from "express";
const router = express.Router();

import {formatCollectionResponse} from "./responseFormatter.js";

const ItemType = models.itemType;
const User = models.user;

router.get("/item-types", (req, res) => {
    ItemType
    .findAll()
    .then(itemTypes => {
        res.render('item_types', formatCollectionResponse(ItemType, itemTypes));
    });
});

router.get('/users', (req, res) => {
    User
    .findAll()
    .then(users => {
        res.render('users', formatCollectionResponse(User, users));
    });
});

export default router;