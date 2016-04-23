var HttpStatus = require('http-status-codes');
var frisby = require('frisby');

var baseUrl = 'http://localhost:3000/api';

frisby
    .create('Get all item types')
    .get(baseUrl + '/item_type')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        item_type: Array
    })
    .toss();

createItemType()
    .afterJSON(function(body) {
        var id = body.item_type.id;
        getItemType(id)
            .after(function() {
                changeItemTypeName(id)
                    .after(function() {
                        deleteItemType(id)
                            .after(function() {
                                tryGetMissingItemType(id)
                                    .toss();
                            })
                            .toss();
                    })
                    .toss();
            })
            .toss();
    })
    .toss();


function createItemType() {
    return frisby
        .create('Create item type')
        .post(baseUrl + '/item_type', {
            item_type: {
                name: 'TestItemType'
            }
        }, { json: true })
        .expectStatus(HttpStatus.CREATED)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            item_type: {
                name: 'TestItemType'
            }
        })
        .expectJSONTypes({
            item_type: {
                id: Number,
                name: String
            }
        });
}

function getItemType(id) {
    return frisby
        .create('Get existing item type')
        .get(baseUrl + '/item_type/' + id)
        .expectStatus(HttpStatus.OK)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON('item_type', {
            id: id
        })
        .expectJSONTypes({
            item_type: {
                id: Number,
                name: String
            }
        });
}

function changeItemTypeName(id) {
    return frisby
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
}

function deleteItemType(id) {
    return frisby
        .create('Delete item type')
        .delete(baseUrl + '/item_type/' + id)
        .expectStatus(HttpStatus.NO_CONTENT)
}


function tryGetMissingItemType(id) {
    return frisby
        .create('Try to get missing item type')
        .get(baseUrl + '/item_type/' + id)
        .expectStatus(HttpStatus.NOT_FOUND);
}
