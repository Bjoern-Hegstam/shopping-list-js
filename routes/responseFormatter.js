exports.formatGetResponse = function (type, id, attributes, selfLink) {
    return {
        data: {
            type: type,
            id: id,
            attributes: attributes,
            links: {
                self: selfLink
            }
        }
    };
};

exports.formatCreatedResponse = function (type, id, attributes, selfLink) {
    return {
        data: {
            type: type,
            id: id,
            attributes: attributes,
            links: {
                self: selfLink
            }
        }
    };
};