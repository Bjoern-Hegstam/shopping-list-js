var modelAttributeMapper = require('./modelAttributeMapper.js');
var stringUtil = require('./../util/stringUtil.js');

function formatModelInstance(instance) {
    return {
        type: stringUtil.camelCaseToSnakeCase(instance.Model.name),
        id: instance.id.toString(),
        attributes: modelAttributeMapper[instance.Model.name](instance)
    };
}

exports.formatSingleItemResponse = function(selfLink, instance) {
    return {
        links: {
            self: selfLink
        },
        data: formatModelInstance(instance)
    };
};

exports.formatCollectionResponse = function(selfLink, instances) {
    return {
        links: {
            self: selfLink
        },
        data: instances.map(formatModelInstance)
    };
};