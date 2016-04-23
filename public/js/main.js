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
    var $nameInput = $('#addItemModal').find('#nameInput');

    $shoppingList
        .find('.btn-finish-shopping')
        .click(function clearInCartItems() {
            console.log('Done shopping');
        });


    $shoppingList
        .find('.btn-add-item')
        .click(function addItemToList() {
            $('#addItemModal').modal('show');
        });


    $nameInput.selectize({
        valueField: 'id',
        labelField: 'name',
        searchField: 'name',
        load: function(query, callback) {
            if (!query.length) {
                return callback();
            }

            findItemTypesWithNameLike(query, 5)
                .done(function (result) {
                    callback(result.item_type);
                });
        },
        create: function(input, callback) {
            createItemType(input)
                .done(callback);
        }
    });


    var $shoppingListItems = $shoppingList.find('.shopping-list-item');


    $shoppingListItems
        .click(function toggleItemInCart(e) {
            if (e.target != this) {
                return;
            }

            console.log('Clicked item: ' + this.getAttribute('data-id'));
        });


    $shoppingListItems
        .find('.btn-item-inc')
        .click(function incrementQuantity() {
            updateItemQuantity($(this).parents('.shopping-list-item'), 1);
        });



    $shoppingListItems
        .find('.btn-item-dec')
        .click(function decrementQuantity() {
            updateItemQuantity($(this).parents('.shopping-list-item'), -1);
        });


    function shoppingListItemApiLink($shoppingListItem) {
        return '../api/shopping_list/' +
            getId($shoppingList) +
            '/item/' +
            getId($shoppingListItem);
    }

    function getId($object) {
        return $object.attr('data-id');
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

        $.ajax({
            url: shoppingListItemApiLink($shoppingListItem),
            type: 'PATCH',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                $quantity.html(result.shopping_list_item.quantity);
            },
            error: ajaxErrorHandler
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


    function findItemTypesWithNameLike(nameStart, maxCount, callback) {
        return $.ajax({
            url: '../api/item_type?name=' + nameStart + '&maxCount=' + maxCount,
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
