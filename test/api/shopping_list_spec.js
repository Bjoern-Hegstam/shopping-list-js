var HttpStatus = require('http-status-codes');
var frisby = require('frisby');

var baseUrl = 'http://localhost:3000/api';

/* TESTS */
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

    setupListWithOneItem(itemTypeId, (listId, itemId) => {
        tryAddItemTypeAlreadyInList(listId, itemTypeId, () => {
            changeQuantity(listId, itemId, () => {
                deleteItem(listId, itemId);
            });
        });
    });
});


createItemType(itemTypeJSON => {
    var itemTypeId = itemTypeJSON.item_type.id;

    setupListWithOneItem(itemTypeId, (listId, itemId) => {
        deleteInCartItems(listId, () => {
            expectShoppingListEmpty(listId, false);
        });
    });
});


createItemType(itemTypeJSON => {
    var itemTypeId = itemTypeJSON.item_type.id;

    setupListWithOneItem(itemTypeId, (listId, itemId) => {
        addItemToCart(listId, itemId, () => {
            deleteInCartItems(listId, () => {
                expectShoppingListEmpty(listId, true);
            });
        });
    });
});



/* HELPERS */
function setupListWithOneItem(itemTypeId, callback) {
    createShoppingList(shoppingListJSON => {
        var listId = shoppingListJSON.shopping_list.id;
        addItem(listId, itemTypeId, (listItemJSON) => {
            callback(listId, listItemJSON.shopping_list_item.id);
        });
    });
}

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
    frisby
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
    frisby
        .create('Add same item type')
        .post(baseUrl + '/shopping_list/' + listId + '/item', {
            shopping_list_item: {
                item_type_id: itemTypeId,
                quantity: 1
            }
        }, { json: true })
        .expectStatus(HttpStatus.CONFLICT)
        .after(callback || noop)
        .toss();
}

function changeQuantity(listId, itemId, callback) {
    frisby
        .create('Change quantity')
        .patch(baseUrl + '/shopping_list/' + listId + '/item/' + itemId, {
            shopping_list_item: {
                quantity: 17
            }
        }, { json: true })
        .expectStatus(HttpStatus.OK)
        .expectJSON('shopping_list_item', {
            quantity: '17'
        })
        .after(callback || noop)
        .toss();
}

function deleteItem(listId, itemId, callback) {
    frisby
        .create('Delete item')
        .delete(baseUrl + '/shopping_list/' + listId + '/item/' + listId)
        .expectStatus(HttpStatus.NO_CONTENT)
        .after(callback || noop)
        .toss();
}

function addItemToCart(listId, itemId, callback) {
    frisby
        .create('Add item to cart')
        .patch(baseUrl + '/shopping_list/' + listId + '/item/' + itemId, {
            shopping_list_item: {
                in_cart: true
            }
        }, { json: true })
        .expectStatus(HttpStatus.OK)
        .expectJSON('shopping_list_item', {
            in_cart: 'true'
        })
        .after(callback || noop)
        .toss();
}

function deleteInCartItems(listId, callback) {
    frisby
        .create('Delete in cart items')
        .delete(baseUrl + '/shopping_list/' + listId + '/cart')
        .after(callback || noop)
        .toss();
}

function expectShoppingListEmpty(listId, expectedEmpty, callback) {
    frisby
        .create('Expect list to be ' + (expectedEmpty ? '' : 'not ') + 'empty')
        .get(baseUrl + '/shopping_list/' + listId + '/item')
        .afterJSON(json => {
            if (expectedEmpty) {
                expect(json.shopping_list_item.length).toEqual(0);
            } else {
                expect(json.shopping_list_item.length).toBeGreaterThan(0);
            }
        })
        .toss();
}

function noop() {}
