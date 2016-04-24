const HttpStatus = require('http-status-codes');
const frisby = require('frisby');

const baseUrl = 'http://localhost:3000/api';

frisby
    .create('Get all item types')
    .get(baseUrl + '/item_type')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        item_type: Array
    })
    .toss();

createItemType('apiTest_itemType_1', json => {
    const id = json.item_type.id;
    getItemType(id, () => {
        changeItemTypeName(id, () => {
            deleteItemType(id, () => {
                tryGetMissingItemType(id);
            });
        });
    });
});


createItemType('apiTest_itemType_2', () => {
    tryToCreateItemTypeWithUsedName('ApiTest_itemType_2');
});

function createItemType(name, callbackJSON) {
    frisby
        .create('Create item type: ' + name)
        .post(baseUrl + '/item_type', {
            item_type: {
                name: name
            }
        }, { json: true })
        .expectStatus(HttpStatus.CREATED)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            item_type: {
                name: name
            }
        })
        .expectJSONTypes({
            item_type: {
                id: String,
                name: String
            }
        })
        .afterJSON(callbackJSON || noop)
        .toss();
}

function getItemType(id, callback) {
    frisby
        .create('Get existing item type')
        .get(baseUrl + '/item_type/' + id)
        .expectStatus(HttpStatus.OK)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON('item_type', {
            id: id
        })
        .expectJSONTypes({
            item_type: {
                id: String,
                name: String
            }
        })
        .after(callback || noop)
        .toss();
}

function changeItemTypeName(id, callback) {
    frisby
        .create('Change item type name')
        .patch(baseUrl + '/item_type/' + id, {
            item_type: {
                id: id,
                name: 'NewName' + id
            }
        }, { json: true })
        .expectStatus(HttpStatus.OK)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            item_type: {
                id: id,
                name: 'NewName' + id
            }
        })
        .after(callback || noop)
        .toss();
}

function deleteItemType(id, callback) {
    frisby
        .create('Delete item type')
        .delete(baseUrl + '/item_type/' + id)
        .expectStatus(HttpStatus.NO_CONTENT)
        .after(callback || noop)
        .toss();
}


function tryGetMissingItemType(id, callback) {
    frisby
        .create('Try to get missing item type')
        .get(baseUrl + '/item_type/' + id)
        .expectStatus(HttpStatus.NOT_FOUND)
        .after(callback || noop)
        .toss();
}

function tryToCreateItemTypeWithUsedName(name, callback) {
   frisby
        .create('Try to create item type with already taken name')
        .post(baseUrl + '/item_type', {
            item_type: {
                name: name
            }
        }, { json: true })
        .expectStatus(HttpStatus.CONFLICT)
        .after(callback || noop)
        .toss();
}

function noop() {}
