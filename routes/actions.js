var HttpStatus = require('http-status-codes');
var responseFormatter = require("./responseFormatter.js");

exports.getById = function(res, model, id) {
    model
        .findById(id)
        .then(function(object) {
            if (!object) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                res
                    .status(HttpStatus.OK)
                    .send(responseFormatter.formatSingleItemResponse(object));
            }
        });
};

exports.findAll = function(res, model, searchOptions) {
    searchOptions = searchOptions || {};

    model
        .findAll(searchOptions)
        .then(function(objects) {
            res
                .status(HttpStatus.OK)
                .send(responseFormatter.formatCollectionResponse(model, objects));
        }, function(err) {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
};

exports.findOne = function(res, model, searchOptions) {
    searchOptions = searchOptions || {};

    model
        .findAll(searchOptions)
        .then(function(objects) {
            if (objects.length === 0) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {

                res
                    .status(HttpStatus.OK)
                    .send(responseFormatter.formatCollectionResponse(model, objects));
            }
        });
};

exports.findAndUpdate = function(res, model, searchOptions, updateAttributes) {
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
                            .send(responseFormatter.formatSingleItemResponse(savedObject));
                    });
            }
        });
};

exports.findAndDestroy = function(res, model, searchOptions) {
    model
        .findAll(searchOptions)
        .then(function(objects) {
            if (objects.length === 0) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                objects[0]
                    .destroy()
                    .then(function() {
                        res.sendStatus(HttpStatus.OK);
                    });
            }
        });
};
