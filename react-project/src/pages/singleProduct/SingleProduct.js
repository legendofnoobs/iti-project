import React, { useEffect, useState } from 'react';
import './singleProduct.css';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../store/DataContext';

const SingleProduct = () => {
    const {selectedProduct,setCartData}=useData();
    const [product, setProduct] = useState({});
    const [activeTab, setActiveTab] = useState('description');
    const [selectedSize, setSelectedSize] = useState('');
    const navigate = useNavigate();
    const { setCartData } = useData();

    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        } else {
            navigate('/');
        }
    }, []);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size!');
            return;
        }
        const cartItem = {
            ...product,
            size: selectedSize,
            quantity: 1
        };
        setCartData(cartItem);
        navigate('/cart');
    };

    if (!product.name) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main className="container-single-product">
                <section className="product-section">
                    <div className="product-image">
                        {product.discount && <span className="product-badge">-{product.discount}%</span>}
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                        <h1>{product.name}</h1>
                        <div className="product-rating">★★★★★</div>
                        <div className="product-price">
                            {product.priceAfter && <span>${product.priceAfter.toFixed(2)}</span>}
                            {product.priceBefore && <span className="original-price">${product.priceBefore.toFixed(2)}</span>}
                        </div>
                        <p className="description-text">{product.ShortDescription}</p>
                        <select className="size-selector" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                            <option value="">Select size</option>
                            <option value="s">Small</option>
                            <option value="m">Medium</option>
                            <option value="l">Large</option>
                            <option value="xl">XL</option>
                        </select>
                        <br />
                        <button className="add-to-cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
                    </div>
                </section>

                <section className="details-section">
                    <div className="details-tabs">
                        <button
                            className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews(0)
                        </button>
                    </div>
                    <div className={`tab-content ${activeTab === 'description' ? 'active' : ''}`}>
                        {product.TallDescription}
                    </div>
                    <div className={`tab-content ${activeTab === 'reviews' ? 'active' : ''}`}>
                        <p>
                            There are no reviews for this product yet. Be the first to write one!
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
};

export default SingleProduct;
