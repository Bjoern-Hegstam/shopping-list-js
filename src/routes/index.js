"use strict";

import models from "../models";
import express from "express";
const router = express.Router();

const ShoppingList = models.shoppingList;
const ShoppingListItem = models.shoppingListItem;
const ItemType = models.itemType;

import {formatCollectionResponse} from "./responseFormatter.js";

router.get("/", (req, res) => {
    ShoppingList
        .findAll()
        .then(shopppingLists => {
            res.render('shopping_lists', formatCollectionResponse(ShoppingList, shopppingLists));
        });
});

router.get("/:id", (req, res) => {
    let respData;

    ShoppingList
        .findById(req.params.id)
        .then(shoppingList => {
            respData = {
                shopping_list: shoppingList.toSimpleJSON()
            };

            return shoppingList
                .getShoppingListItems({
                    include: {
                        model: ItemType
                    }
                });
        })
        .then(items => {
            respData.shopping_list.items = items.map(item => {
                const itemData = item.toSimpleJSON();
                itemData.item_type = item.itemType.toSimpleJSON();

                return itemData;
            });

            res.render("shopping_list", respData);
        });
});

export default router;
