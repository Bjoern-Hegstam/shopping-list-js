var HttpStatus = require('http-status-codes');
var responseFormatter = require("./responseFormatter.js");

exports.getById = function(res, model, id, link) {
    model
        .findById(id)
        .then(function(object) {
            if (!object) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                res
                    .status(HttpStatus.OK)
                    .send(responseFormatter.formatSingleItemResponse(link, object));
            }
        });
};

exports.findAll = function(res, model, link, searchOptions) {
    searchOptions = searchOptions || {};

    model
        .findAll(searchOptions)
        .then(function(objects) {
            res
                .status(HttpStatus.OK)
                .send(responseFormatter.formatCollectionResponse(link, objects));
        }, function(err) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
};

exports.findOne = function(res, model, link, searchOptions) {
    searchOptions = searchOptions || {};

    model
        .findAll(searchOptions)
        .then(function(objects) {
            if (objects.length === 0) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {

                res
                    .status(HttpStatus.OK)
                    .send(responseFormatter.formatCollectionResponse(link, objects));
            }
        });
};

exports.findAndUpdate = function(res, model, link, searchOptions, updateAttributes) {
    model
        .findAll(searchOptions)
        .then(function(objects) {
            if (objects.length === 0) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                objects[0]
                    .update(updateAttributes)
                    .then(function(savedObject) {
                        res
                            .status(HttpStatus.OK)
                            .send(responseFormatter.formatSingleItemResponse(link, savedObject));
                    });
            }
        });
};