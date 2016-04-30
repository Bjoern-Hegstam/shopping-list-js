const routes = require('./index');
const login = require('./login.js');
const itemTypeRoutes = require('./api/itemType.js');
const shoppingListRoutes = require('./api/shoppingList.js');
const administration = require('./administration.js');

const authenticate = (req, res, next) => {
    if (res.locals.user) {
        return next();
    }

    res.redirect('/login');
};

const isAdmin = (req, res, next) => {
    if (res.locals.user && res.locals.user.role == 'ADMIN') {
        return next();
    }

    res.redirect('/');
};

exports.use = function(app) {
    app.use('/', login);

    app.use('/', authenticate, routes);
    app.use('/admin', authenticate, isAdmin, administration);
    app.use('/api/item_type', authenticate, itemTypeRoutes);
    app.use('/api/shopping_list', authenticate, shoppingListRoutes);
};
