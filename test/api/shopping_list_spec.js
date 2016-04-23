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
.expectJSONLength('item_type', 0)
.toss();

frisby
.create('Create item type')
.post(baseUrl + '/item_type', {
    item_type: {
        name: 'TestItemType'
    }
}, {json: true})
.expectStatus(201)
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
})
.toss();