"use strict";

var models = require("../models");
var express = require("express");
var router = express.Router();

var ShoppingList = models.shoppingList;
var ShoppingListItem = models.shoppingListItem;
var ItemType = models.itemType;

var modelAttributeMapper = require('./modelAttributeMapper.js');

router.get("/", (req, res) => {
    ShoppingList
        .findAll()
        .then(shopppingLists => {
            res.render('home', responseFormatter.formatCollectionResponse('', shopppingLists));
        });

});

router.get("/shopping_list/:id", (req, res) => {
    var respData;

    ShoppingList
        .findById(req.params.id)
        .then(shoppingList => {
            respData = {
                shopping_list: modelAttributeMapper[ShoppingList.name](shoppingList)
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
                var itemData = modelAttributeMapper[ShoppingListItem.name](item);;
                itemData.item_type = modelAttributeMapper[ItemType.name](item.itemType);

                return itemData;
            });

            res.render("shopping_list", respData);
        })
});

module.exports = router;
