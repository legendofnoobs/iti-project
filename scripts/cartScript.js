const quantity = document.querySelector('.quantity-input');
const subtotalElement = document.getElementById('cart-subtotal');
const totalElement = document.getElementById('cart-total');
const removeButton = document.querySelector('.remove-btn');
const cartRow = document.querySelector('.cart-table tbody tr');
const rowTotalCell = document.getElementById('product-cart-row-total');
const pricePerItemElement = document.getElementById('product-cart-price');
const productImageElement = document.getElementById('product-cart-image');
const productNameElement = document.getElementById('product-cart-name');

let pricePerItem = 0;
let cartItem = null;

if (localStorage.getItem('cartItem')) {
    cartItem = JSON.parse(localStorage.getItem('cartItem'));

    productNameElement.textContent = cartItem.name;
    productImageElement.src = cartItem.image;
    productImageElement.alt = cartItem.name;
    pricePerItem = cartItem.priceAfter;
    pricePerItemElement.textContent = `$${pricePerItem.toFixed(2)}`;

    quantity.value = cartItem.quantity || 1;

    updateTotals();
}

if (localStorage.getItem('cart_quantity')) {
    quantity.value = localStorage.getItem('cart_quantity');
    updateTotals();
}

quantity.addEventListener('input', () => {
    if (quantity.value < 1) quantity.value = 1;
    localStorage.setItem('cart_quantity', quantity.value);
    updateTotals();
});

removeButton.addEventListener('click', () => {
    cartRow.remove();
    subtotalElement.textContent = '$0.00';
    totalElement.textContent = '$0.00';
    localStorage.removeItem('cartItem');
    localStorage.removeItem('cart_quantity');
    alert('item removed from cart.');
});

function updateTotals() {
    const quantityValue = parseInt(quantity.value) || 1;
    const subtotalValue = (pricePerItem * quantityValue).toFixed(2);

    rowTotalCell.textContent = `$${subtotalValue}`;
    subtotalElement.textContent = `$${subtotalValue}`;
    totalElement.textContent = `$${subtotalValue}`;
}

const checkoutButton = document.querySelector('.checkout-btn');
const checkoutConfirmPopup = document.getElementById('checkout_confirm_popUp');
const confirmButtonCheckout = document.getElementById('confirm_checkout');
const cancelButtonCheckout = document.getElementById('cancel_checkout');

checkoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    checkoutConfirmPopup.style.display = 'block';
});

confirmButtonCheckout.addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

cancelButtonCheckout.addEventListener('click', () => {
    checkoutConfirmPopup.style.display = 'none';
});

confirmButtonCheckout.addEventListener('click', () => {
    const productName = cartRow.querySelector('#product-cart-name').textContent.trim();
    const quantityValue = parseInt(quantity.value) || 1;
    const pricePerItemValue = pricePerItem.toFixed(2);
    const subtotalValue = (pricePerItem * quantityValue).toFixed(2);

    const cartData = {
        product: productName,
        quantity: quantityValue,
        price: pricePerItemValue,
        subtotal: subtotalValue,
        total: subtotalValue
    };

    localStorage.setItem('checkout_data', JSON.stringify(cartData));

    window.location.href = '../pages/checkout.html';
});