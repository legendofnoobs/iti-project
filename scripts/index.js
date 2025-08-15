async function loadProducts() {
    const response = await fetch('./scripts/products.json');
    const products = await response.json();

    const productGrid = document.querySelector('.new-arrivals .product-grid');
    productGrid.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const productName = document.createElement('p');
        productName.classList.add('product-name');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = `$${product.priceAfter.toFixed(2)}`;
        
        productCard.appendChild(img);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productGrid.appendChild(productCard);

        productCard.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = 'pages/singleProduct.html';
        });
    });
}

loadProducts();

async function loadTopSellers() {
    const response = await fetch('./scripts/topSellers.json');
    const products = await response.json();

    const productGrid = document.querySelector('.top-sellers .product-grid');
    productGrid.innerHTML = ''; // Clear existing products

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;

        const productName = document.createElement('p');
        productName.classList.add('product-name');
        productName.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = `$${product.priceAfter.toFixed(2)}`;

        productCard.appendChild(img);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productGrid.appendChild(productCard);

        productCard.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            window.location.href = 'pages/singleProduct.html';
        });
    });
}

loadTopSellers();