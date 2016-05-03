import HttpStatus from 'http-status-codes';
import {formatSingleItemResponse, formatCollectionResponse} from "./responseFormatter.js";

export function getById(res, model, id) {
    model
        .findById(id)
        .then(object => {
            if (!object) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {
                res
                    .status(HttpStatus.OK)
                    .send(formatSingleItemResponse(object));
            }
        });
}

export function findAll(res, model, searchOptions) {
    searchOptions = searchOptions || {};

    model
        .findAll(searchOptions)
        .then(objects => {
            res
                .status(HttpStatus.OK)
                .send(formatCollectionResponse(model, objects));
        }, err => {
            res.sendStatus(HttpStatus.NOT_FOUND);
        });
}

export function findOne(res, model, searchOptions) {
    searchOptions = searchOptions || {};

    model
        .findAll(searchOptions)
        .then(objects => {
            if (objects.length === 0) {
                res.sendStatus(HttpStatus.NOT_FOUND);
            } else {

                res
                    .status(HttpStatus.OK)
                    .send(formatCollectionResponse(model, objects));
            }
        });
}

export function findAndUpdate(res, model, searchOptions, updateAttributes) {
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
                            .send(formatSingleItemResponse(savedObject));
                    });
            }
        });
}

export function findAndDestroy(res, model, searchOptions) {
    model
        .destroy(searchOptions)
        .then(count => {
            res.sendStatus(count === 0 ? HttpStatus.NOT_FOUND : HttpStatus.NO_CONTENT);
        });
}
