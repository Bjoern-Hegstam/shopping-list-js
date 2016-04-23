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

createShoppingList()
    .toss();

function createShoppingList() {
    return frisby
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
                id: Number,
                name: String
            }
        });
}
