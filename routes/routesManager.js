const routes = require('./index');
const login = require('./login.js');
const itemTypeRoutes = require('./api/itemType.js');
const shoppingListRoutes = require('./api/shoppingList.js');

exports.use = function(app) {
    app.use('/', routes);
    app.use('/login', login);
    app.use('/api/item_type', itemTypeRoutes);
    app.use('/api/shopping_list', shoppingListRoutes);
};
