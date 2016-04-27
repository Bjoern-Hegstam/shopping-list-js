const routes = require('./index');
const login = require('./login.js');
const itemTypeRoutes = require('./api/itemType.js');
const shoppingListRoutes = require('./api/shoppingList.js');

exports.use = function(app, checkAuth) {
    app.use('/', login);

    app.use('/', checkAuth, routes);
    app.use('/api/item_type', checkAuth, itemTypeRoutes);
    app.use('/api/shopping_list', checkAuth, shoppingListRoutes);
};
