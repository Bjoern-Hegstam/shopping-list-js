const HttpStatus = require('http-status-codes');
const responseFormatter = require("./responseFormatter.js");

exports.getById = (res, model, id) => {
    model
        .findById(id)
        .then(object => {
            if (!object) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                res
                    .status(HttpStatus.OK)
                    .send(responseFormatter.formatSingleItemResponse(object));
            }
        });
};

exports.findAll = (res, model, searchOptions) => {
    searchOptions = searchOptions || {};

    model
        .findAll(searchOptions)
        .then(objects => {
            res
                .status(HttpStatus.OK)
                .send(responseFormatter.formatCollectionResponse(model, objects));
        }, err => {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
};

exports.findOne = (res, model, searchOptions) => {
    searchOptions = searchOptions || {};

    model
        .findAll(searchOptions)
        .then(objects => {
            if (objects.length === 0) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {

                res
                    .status(HttpStatus.OK)
                    .send(responseFormatter.formatCollectionResponse(model, objects));
            }
        });
};

exports.findAndUpdate = (res, model, searchOptions, updateAttributes) => {
    model
        .findAll(searchOptions)
        .then(objects => {
            if (objects.length === 0) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                objects[0]
                    .update(updateAttributes)
                    .then(savedObject => {
                        res
                            .status(HttpStatus.OK)
                            .send(responseFormatter.formatSingleItemResponse(savedObject));
                    });
            }
        });
};

exports.findAndDestroy = (res, model, searchOptions) => {
    model
        .destroy(searchOptions)
        .then(count => {
            res.sendStatus(count === 0 ? HttpStatus.NOT_FOUND : HttpStatus.NO_CONTENT);
        });
};
