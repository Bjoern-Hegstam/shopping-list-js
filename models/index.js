"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const debug = require("debug")("models:index");
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];


let sequelize;
if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        port: match[4],
        host: match[3],
        logging: true
    });
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {};

debug('db config: ' + JSON.stringify(config, null, 2));

fs
    .readdirSync(__dirname)
    .filter(isModelFile)
    .forEach(loadModel);

Object.keys(db).forEach(modelName => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

function isModelFile(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
}

function loadModel(file) {
    debug("Loading: " + file);
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
}