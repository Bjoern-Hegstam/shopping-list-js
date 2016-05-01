"use strict";

const models = require("models");
const express = require("express");
const router = express.Router();

const ShoppingList = models.shoppingList;
const ShoppingListItem = models.shoppingListItem;
const ItemType = models.itemType;

const responseFormatter = require("./responseFormatter.js");

router.get("/", (req, res) => {
    ShoppingList
        .findAll()
        .then(shopppingLists => {
            res.render('shopping_lists', responseFormatter.formatCollectionResponse(ShoppingList, shopppingLists));
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

module.exports = router;
