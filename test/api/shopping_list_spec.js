var HttpStatus = require('http-status-codes');
var frisby = require('frisby');

var baseUrl = 'http://localhost:3000/api';

frisby
    .create('Get all shopping lists')
    .get(baseUrl + '/shopping_list')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        shopping_list: Array
    })
    .toss();


createItemType(itemTypeJSON => {
    var itemTypeId = itemTypeJSON.item_type.id;
    createShoppingList(shoppingListJSON => {
        var listId = shoppingListJSON.shopping_list.id;
        addItem(listId, itemTypeId, (listItemJSON) => {
            var itemId = listItemJSON.shopping_list_item.id;
            tryAddItemTypeAlreadyInList(listId, itemTypeId, () => {
                changeQuantity(listId, itemId, () => {
                    deleteItem(listId, itemId);
                });
            });
        });
    });
});

// Create item type (First thing for all tests)
// Create shopping list
// Add item
// Try to re-add existing item, should give 409
// Change quantity
// Delete item

// Delete cart items, verify none remove

// Add item to cart
// Delete cart items, verify item removed

function createItemType(callbackJSON) {
    return frisby
        .create('Create item type')
        .post(baseUrl + '/item_type', {
            item_type: {
                name: 'TestItemType'
            }
        }, { json: true })
        .afterJSON(callbackJSON || noop)
        .toss();
}

function createShoppingList(callbackJSON) {
    frisby
        .create('Create shopping list')
        .post(baseUrl + '/shopping_list', {
            shopping_list: {
                name: 'TestShoppingList'
            }
        }, { json: true })
        .expectStatus(HttpStatus.CREATED)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            shopping_list: {
                name: 'TestShoppingList'
            }
        })
        .expectJSONTypes({
            shopping_list: {
                id: String,
                name: String
            }
        })
        .afterJSON(callbackJSON || noop)
        .toss();
}

function addItem(listId, itemTypeId, callbackJSON) {
    return frisby
        .create('Add item')
        .post(baseUrl + '/shopping_list/' + listId + '/item', {
            shopping_list_item: {
                item_type_id: itemTypeId,
                quantity: 2
            }
        }, { json: true })
        .expectStatus(HttpStatus.CREATED)
        .expectHeaderContains('content-type', 'application/json')
        .expectJSON({
            shopping_list_item: {
                shopping_list_id: listId,
                item_type_id: itemTypeId,
                quantity: "2",
                in_cart: "false"
            }
        })
        .expectJSONTypes({
            shopping_list_item: {
                id: String,
                shopping_list_id: String,
                item_type_id: String,
                quantity: String,
                in_cart: String
            }
        })
        .afterJSON(callbackJSON || noop)
        .toss();
}

function tryAddItemTypeAlreadyInList(listId, itemTypeId, callback) {
    return frisby
    .create('Add same item type')
    .post(baseUrl + '/shopping_list/' + listId + '/item', {
        shopping_list_item: {
            item_type_id: itemTypeId,
            quantity: 1
        }
    }, {json: true})
    .expectStatus(HttpStatus.CONFLICT)
    .after(callback || noop)
    .toss();
}

function changeQuantity(listId, itemId, callback) {
    return frisby
    .create('Change quantity')
    .patch(baseUrl + '/shopping_list/' + listId + '/item/' + itemId, {
        shopping_list_item: {
            quantity: 17
        }
    }, {json: true})
    .expectStatus(HttpStatus.OK)
    .expectJSON('shopping_list_item', {
        quantity: '17'
    })
    .after(callback || noop)
    .toss();
}

function deleteItem(listId, itemId, callback) {
    return frisby
    .create('Delete item')
    .delete(baseUrl + '/shopping_list/' + listId + '/item/' + listId)
    .expectStatus(HttpStatus.NO_CONTENT)
    .after(callback || noop)
    .toss();
}

function noop() {}
