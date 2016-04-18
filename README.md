API
---

* API based on JSON API specification (http://jsonapi.org/)
* URI:s use snake_case

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

Next step
---------

* pug/jade situation seems to be fubar. Move to different template engine.
  * Mustache? Essential that templates can be reused on the client to avoid duplicated code.

* Implement DELETE /api/shopping_list/1/cart

* Keep extracting common actions
  * delete
  * patch

* Start on shopping list view
  * Show shopping list with contents
  * Tap on item in list to toggle status (in basked/not in basket)
  * Button for removing item from list

* Add option to add item type to shopping list
  * from existing item types
  * or from a newly created item type