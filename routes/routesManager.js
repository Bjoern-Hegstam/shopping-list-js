const routes = require('./index');
const login = require('./login.js');
const itemTypeRoutes = require('./api/itemType.js');
const shoppingListRoutes = require('./api/shoppingList.js');

const authenticate = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }

    res.redirect('/login');
};

exports.use = function(app) {
    app.use('/', login);

    app.use('/', authenticate, routes);
    app.use('/api/item_type', authenticate, itemTypeRoutes);
    app.use('/api/shopping_list', authenticate, shoppingListRoutes);
};
