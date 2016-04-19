"use strict";

var models = require("../models");
var express = require("express");
var router = express.Router();

var ShoppingList = models.shoppingList;

var responseFormatter = require("./responseFormatter.js");

router.get("/", (req, res) => {
    ShoppingList
        .findAll()
        .then(shopppingLists => {
            res.render('home', responseFormatter.formatCollectionResponse('', shopppingLists));
        });

});

router.get("/shopping_list/:id", (req, res) => {
    var respData;

    //TODO: Need to get all used ItemTypes so we can show their names

    ShoppingList
        .findById(req.params.id)
        .then(shoppingList => {
            respData = responseFormatter.formatSingleItemResponse('', shoppingList);

            return shoppingList.getShoppingListItems();
        })
        .then(items => {
            respData.included = responseFormatter
                .formatCollectionResponse('', items)
                .data;

            res.render("shopping_list", respData);
        });
});

module.exports = router;