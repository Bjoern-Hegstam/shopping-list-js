const routes = require('./index');
const login = require('./login.js');
const itemTypeRoutes = require('./api/itemType.js');
const shoppingListRoutes = require('./api/shoppingList.js');
const administration = require('./administration.js');
const userManagement = require('./../user_management');

exports.use = function(app) {
    app.use('/', login);

    app.use('/', userManagement.authIsLoggedIn, routes);
    app.use('/admin', userManagement.authIsLoggedIn, userManagement.authIsAdmin, administration);
    app.use('/api/item_type', userManagement.authIsLoggedIn, itemTypeRoutes);
    app.use('/api/shopping_list', userManagement.authIsLoggedIn, shoppingListRoutes);
};
