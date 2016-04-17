exports.camelCaseToSnakeCase = function(text) {
    return text.replace(new RegExp('[A-Z]', 'g'), function(match) {
        return '_' + match.toLowerCase();
    });
}