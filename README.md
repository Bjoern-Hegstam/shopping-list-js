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

* Keep extracting common actions
  * delete
  * patch

* Continue on REST API
  * Continue API for shopping list
  * Add API for working with shopping list items, e.g. api/shoppinglist/2/item
    * Missing: delete and some getters

* Start on shopping list view
  * Show shopping list with contents
  * Tap on item in list to toggle status (in basked/not in basket)
  * Button for removing item from list

* Add option to add item type to shopping list
  * from existing item types
  * or from a newly created item type

* Move config for starting webapp in development mode from npm start to grunt