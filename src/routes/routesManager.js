import routes from './index';
import login from './login.js';
import itemTypeRoutes from './api/itemType.js';
import shoppingListRoutes from './api/shoppingList.js';
import administration from './administration.js';
import {authIsLoggedIn, authIsAdmin} from './../user_management';

export function use(app) {
    app.use('/', login);

    app.use('/shopping-list', authIsLoggedIn, routes);
    app.use('/api/item_type', authIsLoggedIn, itemTypeRoutes);
    app.use('/api/shopping_list', authIsLoggedIn, shoppingListRoutes);

    app.use('/admin', authIsLoggedIn, authIsAdmin, administration);
}
