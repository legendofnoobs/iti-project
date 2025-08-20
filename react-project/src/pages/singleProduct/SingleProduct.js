
import React, { useEffect, useState } from 'react';
import './singleProduct.css';

const SingleProduct = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        if (selectedProduct) {
            setProduct(selectedProduct);
        }
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="single-product-container">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-details">
                <h2>{product.name}</h2>
                <p className="price">${product.priceAfter.toFixed(2)}</p>
                <p className="description">{product.TallDescription}</p>
                <button className="add-to-cart-btn">Add to Cart</button>
            </div>
        </div>
    );
};

export default SingleProduct;
