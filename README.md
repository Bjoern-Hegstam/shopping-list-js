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

* Simplify data format for API.
  * Checkout frisby for migrating postman tests to pure code

* Convert server-side code to ES6, checkout babel for client-side js?

* Implement DELETE /api/shopping_list/1/cart

* Add option to add item type to shopping list
  * from existing item types
  * or from a newly created item type

  Would be cool to do the, not uncommon feature, where you start with a dropdown with a selection of the most common item types. Then you can type to narrow down the selection.

* Keep current error reponse for api requests, but add a proper error page for non-api requests.

* Change all DB-calls in main.js to return $.ajax instead of baking in the callback in the success attribute.

* Prevent creation of item types with same name