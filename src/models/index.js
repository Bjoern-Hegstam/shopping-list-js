'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const debug = require('debug')('models:index');
const config = require('./../../config/config.json')[env];


let sequelize;
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false
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
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

function isModelFile(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
}

function loadModel(file) {
    debug('Loading: ' + file);
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
}