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
            var id = $(this).parents('.shopping-list-item').attr('data-id');
            console.log('Increment quantity: ' + id);
        });

    $shoppingListItems
        .find('.btn-item-dec')
        .click(function decrementQuantity() {
            var id = $(this).parents('.shopping-list-item').attr('data-id');
            console.log('Decrement quantity: ' + id);
        });
});
