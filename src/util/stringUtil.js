export function camelCaseToSnakeCase(text) {
    return text.replace(new RegExp('[A-Z]', 'g'), match => '_' + match.toLowerCase());
};