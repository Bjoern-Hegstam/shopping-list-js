var stringUtil = require('./../util/stringUtil.js');

function getKey(Model) {
    return stringUtil.camelCaseToSnakeCase(Model.name);
}

exports.formatSingleItemResponse = function(instance) {
    var data = {};
    data[getKey(model)] = instance.toSimpleJSON();
    return data;
};

exports.formatCollectionResponse = function(model, instances) {
    var data = {};
    data[getKey(model)] = instances.map(instance => instance.toSimpleJSON());
    return data;
};
