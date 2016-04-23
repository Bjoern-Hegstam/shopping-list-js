var frisby = require('frisby');

var baseUrl = 'http://localhost:3000/api';

frisby
.create('Get all item types')
.get(baseUrl + '/item_type')
.expectStatus(200)
.expectHeaderContains('content-type', 'application/json')
.expectJSON({
    item_type: []
})
.toss();