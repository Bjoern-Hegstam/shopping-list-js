const stringUtil = require('./../util/stringUtil.js');

function getKey(model) {
    return stringUtil.camelCaseToSnakeCase(model.name);
}

exports.formatSingleItemResponse = instance => {
    const data = {};
    data[getKey(instance.Model)] = instance.toSimpleJSON();
    return data;
};

exports.formatCollectionResponse = (model, instances) => {
    const data = {};
    data[getKey(model)] = instances.map(instance => instance.toSimpleJSON());
    return data;
};
