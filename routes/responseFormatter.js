var modelAttributeMapper = require('./modelAttributeMapper.js');

function formatModelInstance(instance) {
    return {
        type: instance.Model.name.toLowerCase(),
        id: instance.id,
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