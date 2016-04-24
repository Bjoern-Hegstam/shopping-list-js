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
* PATCH - Update quantity
* DELETE

/api/shopping_list/1/cart
* GET - Get all items in cart for given shopping list
* DELETE - Delete all items in cart (removes them from the shopping list)

/api/shopping_list/1/item/2/cart
* POST - Add to cart
* DELETE - Remove from cart

TODO
---------

* Convert server-side code to ES6, checkout babel for client-side js?

* Keep current error reponse for api requests, but add a proper error page for non-api requests.

* Change all DB-calls in main.js to return $.ajax instead of baking in the callback in the success attribute.
  * Also extract all DB-calls to separate js-file

* Prevent creation of item types with same name

* Sanitize input
