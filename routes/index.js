"use strict";

var models = require("../models");
var express = require("express");
var router = express.Router();

var ShoppingList = models.shoppingList;
var ShoppingListItem = models.shoppingListItem;
var ItemType = models.itemType;

var responseFormatter = require("./responseFormatter.js");

router.get("/", (req, res) => {
    res.redirect("/shopping-lists");
});

router.get("/shopping-lists", (req, res) => {
    ShoppingList
        .findAll()
        .then(shopppingLists => {
            res.render('shopping_lists', responseFormatter.formatCollectionResponse(ShoppingList, shopppingLists));
        });
});

router.get("/shopping_list/:id", (req, res) => {
    var respData;

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
                var itemData = item.toSimpleJSON();
                itemData.item_type = item.itemType.toSimpleJSON();

                return itemData;
            });

            res.render("shopping_list", respData);
        });
});

router.get("/item-types", (req, res) => {
    ItemType
    .findAll()
    .then(itemTypes => {
        res.render('item_types', responseFormatter.formatCollectionResponse(ItemType, itemTypes));
    });
});

module.exports = router;
