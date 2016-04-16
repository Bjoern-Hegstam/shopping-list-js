function formatData(type, id, attributes) {
    return {
        type: type,
        id: id,
        attributes: attributes
    };
}

exports.formatSingleItemResponse = function(type, id, attributes, selfLink) {
    return {
        links: {
            self: selfLink
        },
        data: formatData(type, id, attributes)
    };
};

exports.formatData = formatData;