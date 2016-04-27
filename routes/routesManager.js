const routes = require('./index');
const itemTypeRoutes = require('./itemType.js');
const shoppingListRoutes = require('./shoppingList.js');

exports.use = function(app) {
    app.use('/', routes);
    app.use('/api/item_type', itemTypeRoutes);
    app.use('/api/shopping_list', shoppingListRoutes);
};
