const quantity = document.querySelector('.quantity-input');
const subtotal = document.querySelector('.totals-row:nth-child(1) span:last-child');
const total = document.querySelector('.total-final span:last-child');
const remove_button = document.querySelector('.remove-btn');
const cart = document.querySelector('.cart-table tbody tr');
const row_total_cell = cart.querySelector('td:last-child');
const price_per_item = parseFloat(cart.querySelector('td:nth-child(3)').textContent.trim().replace('$', '')) || 0;

if (localStorage.getItem('cart_quantity')) {
    quantity.value = localStorage.getItem('cart_quantity');
    update_totals();
}

quantity.addEventListener('input', () => {
    if (quantity.value < 1) quantity.value = 1;
    localStorage.setItem('cart_quantity', quantity.value);
    update_totals();
});

remove_button.addEventListener('click', () => {
    cart.remove();
    subtotal.textContent = '$0.00';
    total.textContent = '$0.00';
    localStorage.removeItem('cart_quantity');
    alert('item removed from cart.');
});

function update_totals() {
    const quantity_value = parseInt(quantity.value) || 1;
    const subtotal_value = (price_per_item * quantity_value).toFixed(2);

    row_total_cell.textContent =`$${subtotal_value}`;
    subtotal.textContent =`$${subtotal_value}`;
    total.textContent = `$${subtotal_value}`;
}

const checkout_button = document.querySelector('.checkout-btn');
const checkout_confirm_popUp = document.getElementById('checkout_confirm_popUp');
const confirm_button_checkout = document.getElementById('confirm_checkout');
const cancel_button_checkout = document.getElementById('cancel_checkout');

checkout_button.addEventListener('click', (e) => {
    e.preventDefault();
    checkout_confirm_popUp.style.display ='block';
});

confirm_button_checkout.addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

cancel_button_checkout.addEventListener('click', () => {
    checkout_confirm_popUp.style.display = 'none';
});


//save data to give to checkout
confirm_button_checkout.addEventListener('click', () => {
    const productName = cart.querySelector('.product-details span').textContent.trim();
    const quantityValue = parseInt(quantity.value) || 1;
    const pricePerItem = price_per_item.toFixed(2);
    const subtotalValue = (price_per_item * quantityValue).toFixed(2);

    const cartData = {
        product: productName,
        quantity: quantityValue,
        price: pricePerItem,
        subtotal: subtotalValue,
        total: subtotalValue
    };

    localStorage.setItem('checkout_data', JSON.stringify(cartData));

    window.location.href = 'checkout.html';
});
