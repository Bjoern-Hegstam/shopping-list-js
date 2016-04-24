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
        .find('.btn-add-item')
        .click(function addItemToList() {
            $addItemModal.modal();
        });


    var $selectNameInput = $nameInput
        .selectize({
            valueField: 'id',
            labelField: 'name',
            searchField: 'name',
            load: function(query, callback) {
                if (!query.length) {
                    return callback();
                }

                Db.findItemTypesWithNameLike(query, 5)
                    .done(function(result) {
                        callback(result.item_type);
                    });
            },
            create: function(input, callback) {
                var self = this;
                Db.createItemType(input)
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


    $addItemModal
        .on('shown.bs.modal', function focusOnNameInput() {
            $selectNameInput[0].selectize.focus();
        });


    var $shoppingListItems = $shoppingList.find('.shopping-list-item');


    $shoppingListItems
        .click(function toggleItemInCart(e) {
            var $shoppingListItem = $(this);
            var isInCart = $shoppingListItem.hasClass('in-cart');

            Db.updateShoppingListItem($shoppingListItem, { in_cart: !isInCart })
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


    function getId($object) {
        return $object.attr('data-id');
    }


    function addToShoppingList(itemTypeId) {
        Db.addToShoppingList(getId($shoppingList), itemTypeId)
            .done(function(result) {
                console.log(JSON.stringify(result.shopping_list_item, null, 2));
            });
    }


    function updateItemQuantity($shoppingListItem, dQuantity) {
        var id = getId($shoppingListItem);
        var $quantity = $shoppingListItem.find('.quantity');
        var quantity = +($quantity.text());

        if (quantity + dQuantity <= 0) {
            Db.deleteShoppingListItem($shoppingListItem)
                .done(function() {
                    $shoppingListItem.remove();
                });
            return;
        }

        Db.updateShoppingListItem($shoppingListItem, { quantity: quantity + dQuantity })
            .done(function(result) {
                $quantity.html(result.shopping_list_item.quantity);
            });
    }


    $shoppingList
        .find('.btn-finish-shopping')
        .click(function clearInCartItems() {
            var $inCartItems = $shoppingList.find('.in-cart');
            if ($inCartItems.length === 0) {
                return;
            }

            Db.deleteItemsInCart(getId($shoppingList))
                .done(function(result) {
                    $shoppingList
                        .find('.in-cart')
                        .remove();
                });
        });


    /* AJAX CALLS */
    function ajaxErrorHandler(xhr, status, error) {
        console.log(xhr.responseText);
    }

    var Db = {
        addToShoppingList: function(listId, itemTypeId) {
            var data = {
                shopping_list_item: {
                    item_type_id: itemTypeId,
                    quantity: 1
                }
            };

            return $.ajax({
                url: '../api/shopping_list/' + listId + '/item',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                error: ajaxErrorHandler
            });
        },

        deleteShoppingListItem: function($shoppingListItem) {
            return $.ajax({
                url: '../api/shopping_list/' + getId($shoppingList) + '/item/' + getId($shoppingListItem),
                type: 'DELETE',
                error: ajaxErrorHandler
            });
        },

        updateShoppingListItem: function($shoppingListItem, values) {
            var data = {
                shopping_list_item: values
            };

            return $.ajax({
                url: '../api/shopping_list/' + getId($shoppingList) + '/item/' + getId($shoppingListItem),
                type: 'PATCH',
                contentType: 'application/json',
                data: JSON.stringify(data),
                error: ajaxErrorHandler
            });
        },

        deleteItemsInCart: function(listId) {
            return $.ajax({
                url: '../api/shopping_list/' + listId + '/cart',
                type: 'DELETE',
                error: ajaxErrorHandler
            });
        },


        findItemTypesWithNameLike: function(nameStart, limit, callback) {
            return $.ajax({
                url: '../api/item_type?name=' + nameStart + '&limit=' + limit,
                type: 'GET',
                error: ajaxErrorHandler
            });
        },


        createItemType: function(name, callback) {
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
    };
});
