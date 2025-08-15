document.addEventListener('DOMContentLoaded', () => {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    if (selectedProduct) {
        document.getElementById('product-name').textContent = selectedProduct.name;
        document.getElementById('product-name').textContent = selectedProduct.name;
        document.getElementById('product-image').src = selectedProduct.image;
        document.getElementById('product-image').alt = selectedProduct.name;
        document.getElementById('product-price').textContent = `$${selectedProduct.priceAfter.toFixed(2)}`;
        document.getElementById('product-original-price').textContent = `$${selectedProduct.priceBefore.toFixed(2)}`;
        document.getElementById('product-description').textContent = selectedProduct.ShortDescription;
        document.getElementById('description-content').textContent = selectedProduct.TallDescription;

        document.getElementById('product-discount').textContent = `-${selectedProduct.discount}%`;
    } else {
        window.location.href = '../index.html';
    }

    const addToCartButton = document.querySelector('.add-to-cart-btn');

    addToCartButton.addEventListener('click', () => {
        const sizeSelect = document.getElementById('size-select');
        const selectedSize = sizeSelect.value;

        if (selectedSize === '#') {
            alert('Please select a size!');
            return;
        }

        const cartItem = {
            ...selectedProduct,
            size: selectedSize,
            quantity: 1
        };

        localStorage.setItem('cartItem', JSON.stringify(cartItem));
        window.location.href = '../pages/cart.html';
    });

    const descriptionTab = document.getElementById('description-tab');
    const reviewsTab = document.getElementById('reviews-tab');
    const descriptionContent = document.getElementById('description-content');
    const reviewsContent = document.getElementById('reviews-content');

    function showTab(tabId) {
        descriptionTab.classList.remove('active');
        reviewsTab.classList.remove('active');
        descriptionContent.classList.remove('active');
        reviewsContent.classList.remove('active');

        if (tabId === 'description') {
            descriptionTab.classList.add('active');
            descriptionContent.classList.add('active');
        } else if (tabId === 'reviews') {
            reviewsTab.classList.add('active');
            reviewsContent.classList.add('active');
        }
    }

    descriptionTab.addEventListener('click', () => {
        showTab('description');
    });

    reviewsTab.addEventListener('click', () => {
        showTab('reviews');
    });
});