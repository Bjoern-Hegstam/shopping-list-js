API
---

General data structure:
{
    class_name: {
        key: 'value'
    }
}

/api/item_type
* GET - Get all
* POST - Create new

/api/item_type/1
* GET
* PATCH - Update name
* DELETE

/api/shopping_list
* GET - Get all
* POST - Create new

/api/shopping_list/1
* GET
* PATCH - Update name
* DELETE

/api/shopping_list/1/item
* GET
* POST - Add to shopping list

/api/shopping_list/1/item/2
* GET
* PATCH - Change quantity, toggle cart status
* DELETE

/api/shopping_list/1/cart
* DELETE - Delete all items in cart (removes them from the shopping list)

* User flow
  * New user is registered
  * Needs to be confirmed by admin before able to login
  * Once logged in, can create new lists, add item types, add/remove items

TODO
---------

* Setup migration framework
  * Create migration files for existing models
  * Script production DB to think it already ran the base migrations
    * Create migration meta data table
    * Insert records for migrations that should be ignored
    * Migration name format looks like: yyyyMMddHHmmss-{{name}}.js
  * Figure out how to handle data migration, e.g. when adding new columns that need to be filled with data.

* Administration tools for
  * Shopping lists
  * Item types

* User management - Available for admin users
  * Admin can edit item types, delete users, change user role and confirm new users

* Make navbar collapsible

* For the future: Look into rebuild using React
