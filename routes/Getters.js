var HttpStatus = require('http-status-codes');
var responseFormatter = require("./responseFormatter.js");

exports.getById = function (res, model, id, link) {
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