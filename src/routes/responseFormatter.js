import stringUtil from './../util/stringUtil.js';

function getKey(model) {
    return stringUtil.camelCaseToSnakeCase(model.name);
}

export function formatSingleItemResponse(instance) {
    const data = {};
    data[getKey(instance.Model)] = instance.toSimpleJSON();
    return data;
}

export function formatCollectionResponse(model, instances) {
    const data = {};
    data[getKey(model)] = instances.map(instance => instance.toSimpleJSON());
    return data;
}
