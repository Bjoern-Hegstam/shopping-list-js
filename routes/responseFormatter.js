var stringUtil = require('./../util/stringUtil.js');

function getKey(model) {
    return stringUtil.camelCaseToSnakeCase(model.name);
}

exports.formatSingleItemResponse = function(instance) {
    var data = {};
    data[getKey(instance.Model)] = instance.toSimpleJSON();
    return data;
};

exports.formatCollectionResponse = function(model, instances) {
    var data = {};
    data[getKey(model)] = instances.map(instance => instance.toSimpleJSON());
    return data;
};
