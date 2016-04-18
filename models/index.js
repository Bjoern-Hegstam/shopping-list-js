"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var debug     = require("debug")("models:index");
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

debug('db config: ' + JSON.stringify(config, null, 2));

fs
.readdirSync(__dirname)
.filter(isModelFile)
.forEach(loadModel);

Object.keys(db).forEach(function(modelName) {
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
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
}