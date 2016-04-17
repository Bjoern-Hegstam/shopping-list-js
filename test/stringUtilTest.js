var stringUtil = require('./../util/stringUtil.js');

module.exports = {
    camelCaseToSnakeCase: function(test) {
        test.equal(stringUtil.camelCaseToSnakeCase(''), '');
        test.equal(stringUtil.camelCaseToSnakeCase('abc'), 'abc');
        test.equal(stringUtil.camelCaseToSnakeCase('abcDef'), 'abc_def');
        test.equal(stringUtil.camelCaseToSnakeCase('abcDefGhi'), 'abc_def_ghi');
        test.done();
    }
};