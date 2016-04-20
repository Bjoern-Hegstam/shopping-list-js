"use strict";

var models = require("../models");
var express = require("express");
var router = express.Router();

var ShoppingList = models.shoppingList;
var ShoppingListItem = models.shoppingListItem;
var ItemType = models.itemType;

var responseFormatter = require("./responseFormatter.js");

router.get("/", (req, res) => {
    ShoppingList
        .findAll()
        .then(shopppingLists => {
            res.render('home', responseFormatter.formatCollectionResponse(ShoppingList, shopppingLists));
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

module.exports = router;
