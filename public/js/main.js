$(document).ready(function() {
    var setActiveNavItem = function() {
        var url = window.location;

        $('ul.nav a')
            .filter(function() {
                console.log(this.href);

                return this.href == url;
            })
            .parent()
            .addClass('active');
    };
    setActiveNavItem();


    // Wire up shopping list buttons
    var $shoppingList = $('.shopping-list');
    var $addItemModal = $('#addItemModal');
    var $nameInput = $addItemModal.find('#nameInput');

    $shoppingList
        .find('.btn-finish-shopping')
        .click(function clearInCartItems() {
            console.log('Done shopping');
        });


    $shoppingList
        .find('.btn-add-item')
        .click(function addItemToList() {
            $addItemModal.modal('show');
        });


    $nameInput
        .selectize({
            valueField: 'id',
            labelField: 'name',
            searchField: 'name',
            load: function(query, callback) {
                if (!query.length) {
                    return callback();
                }

                findItemTypesWithNameLike(query, 5)
                    .done(function(result) {
                        callback(result.item_type);
                    });
            },
            create: function(input, callback) {
                var self = this;
                createItemType(input)
                    .done(function(result) {
                        $addItemModal.modal('hide');
                        addToShoppingList(result.item_type.id);
                    });
            },
            onItemAdd: function(value, $item) {
                $addItemModal.modal('hide');
                addToShoppingList(value);
            }
        });


    var $shoppingListItems = $shoppingList.find('.shopping-list-item');


    $shoppingListItems
        .click(function toggleItemInCart(e) {
            var $shoppingListItem = $(this);
            var isInCart = $shoppingListItem.hasClass('in-cart');

            updateShoppingListItem($shoppingListItem, { in_cart: !isInCart })
                .done(function(result) {
                    $shoppingListItem.toggleClass('in-cart');
                });
        });


    $shoppingListItems
        .find('.btn-item-inc')
        .click(function incrementQuantity(e) {
            e.stopPropagation();

            updateItemQuantity($(this).parents('.shopping-list-item'), 1);
        });



    $shoppingListItems
        .find('.btn-item-dec')
        .click(function decrementQuantity(e) {
            e.stopPropagation();

            updateItemQuantity($(this).parents('.shopping-list-item'), -1);
        });


    function shoppingListItemApiLink($shoppingListItem) {
        return '../api/shopping_list/' + getId($shoppingList) + '/item/' + getId($shoppingListItem);
    }


    function getId($object) {
        return $object.attr('data-id');
    }


    function addToShoppingList(itemTypeId) {
        var listId = getId($shoppingList);

        var data = {
            shopping_list_item: {
                item_type_id: itemTypeId,
                quantity: 1
            }
        };

        $.ajax({
            url: '../api/shopping_list/' + listId + '/item',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                console.log(JSON.stringify(result.shopping_list_item, null, 2));
            },
            error: ajaxErrorHandler
        });
    }


    function updateItemQuantity($shoppingListItem, dQuantity) {
        var id = getId($shoppingListItem);
        var $quantity = $shoppingListItem.find('.quantity');
        var quantity = +($quantity.text());

        if (quantity + dQuantity <= 0) {
            deleteShoppingListItem($shoppingListItem);
            return;
        }

        var data = {
            shopping_list_item: {
                quantity: quantity + dQuantity
            }
        };

        updateShoppingListItem($shoppingListItem, { quantity: quantity + dQuantity })
            .done(function(result) {
                $quantity.html(result.shopping_list_item.quantity);
            });
    }


    function deleteShoppingListItem($shoppingListItem) {
        $.ajax({
            url: shoppingListItemApiLink($shoppingListItem),
            type: 'DELETE',
            success: function(result) {
                $shoppingListItem.remove();
            },
            error: ajaxErrorHandler
        });
    }


    function updateShoppingListItem($shoppingListItem, values) {
        var data = {
            shopping_list_item: values
        };

        return $.ajax({
            url: shoppingListItemApiLink($shoppingListItem),
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(data),
            error: ajaxErrorHandler
        });
    }


    function findItemTypesWithNameLike(nameStart, limit, callback) {
        return $.ajax({
            url: '../api/item_type?name=' + nameStart + '&limit=' + limit,
            type: 'GET',
            error: ajaxErrorHandler
        });
    }


    function createItemType(name, callback) {
        var data = {
            item_type: {
                name: name
            }
        };

        return $.ajax({
            url: '../api/item_type',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            error: ajaxErrorHandler
        });
    }

    function ajaxErrorHandler(xhr, status, error) {
        console.log(xhr.responseText);
    }
});
