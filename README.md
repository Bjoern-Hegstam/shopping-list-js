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

TODO
---------

* Keep current error reponse for api requests, but add a proper error page for non-api requests. (Flash error message over navbar?)

* Sanitize input

* For the future: Look into rebuild using React
