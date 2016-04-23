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
        placeholder: 'Name',
        create: true
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


    function findItemTypesStartingWith(nameStart) {
        var itemTypes = {
            item_type: [{
                id: 1,
                name: 'Abc'
            }, {
                id: 2,
                name: 'Def'
            }]
        };

        return itemTypes;
    }


    function ajaxErrorHandler(xhr, status, error) {
        console.log(xhr.responseText);
    }
});
