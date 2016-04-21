$(document).ready(function() {
    var $shoppingList = $('.shopping-list');

    $shoppingList
        .find('.btn-finish-shopping')
        .click(function clearInCartItems() {
            console.log('Done shopping');
        });

    $shoppingList
        .find('.btn-add-item')
        .click(function addItemToList() {
            console.log('Add item');
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
            var $shoppingListItem = $(this).parents('.shopping-list-item');
            var id = $shoppingListItem.attr('data-id');
            var $quantity = $shoppingListItem.find('.quantity');
            var quantity = +($quantity.text());

            $.ajax({
                url: '../api/shopping_list/' + $shoppingList.attr('data-id') + '/item/' + id,
                type: 'PATCH',
                contentType: 'application/json',
                data: JSON.stringify({
                    data: {
                        attributes: {
                            quantity: quantity + 1
                        }
                    }
                }),
                success: function(result) {
                    $quantity.html(result.shopping_list_item.quantity);
                },
                error: function(xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });
        });

    $shoppingListItems
        .find('.btn-item-dec')
        .click(function decrementQuantity() {
            var id = $(this).parents('.shopping-list-item').attr('data-id');
            console.log('Decrement quantity: ' + id);
        });
});
