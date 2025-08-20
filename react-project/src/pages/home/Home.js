
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

import icon1 from "../../assets/icons/icon.png"
import icon2 from "../../assets/icons/icon (1).png"
import icon3 from "../../assets/icons/icon (2).png"
import icon4 from "../../assets/icons/icon (3).png"

const Home = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [topSellers, setTopSellers] = useState([]);

    useEffect(() => {
        fetch('/products.json')
            .then(response => response.json())
            .then(data => setNewArrivals(data));

        fetch('/topSellers.json')
            .then(response => response.json())
            .then(data => setTopSellers(data));
    }, []);

    const handleProductClick = (product) => {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
    };

    return (
        <div>
            <section className="hero-index">
                <div className="hero-overlay">
                    <h2>STYLIST PICKS BEAT THE HEAT</h2>
                    <Link to="#" className="btn">SHOP NOW</Link>
                </div>
            </section>

            <section className="new-arrivals">
                <h3>Discover NEW Arrivals</h3>
                <p>Recently added shirts</p>
                <div className="product-grid">
                    {newArrivals.map(product => (
                        <div className="product-card" key={product.id} onClick={() => handleProductClick(product)}>
                            <Link to="/single-product">
                                <img src={product.image} alt={product.name} />
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">${product.priceAfter.toFixed(2)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="features">
                <div className="feature">
                    <div>
                        <img src={icon1} alt="" />
                    </div>
                    <div>
                        <h4>FREE SHIPPING</h4>
                        <p>On all orders over $50</p>
                    </div>
                </div>
                <div className="feature">
                    <div>
                        <img src={icon2} alt=""/>
                    </div>
                    <div>
                        <h4>SUPPORT 24/7</h4>
                        <p>Contact us anytime</p>
                    </div>
                </div>
                <div className="feature">
                    <div>
                        <img src={icon3} alt="" />
                    </div>
                    <div>
                        <h4>30 DAYS RETURN</h4>
                        <p>Easy & free returns</p>
                    </div>
                </div>
                <div className="feature">
                    <div>
                        <img src={icon4} alt="" />
                    </div>
                    <div>
                        <h4>100% PAYMENT SECURE</h4>
                        <p>Pay with confidence</p>
                    </div>
                </div>
            </section>

            <section className="promotions">
                <div className="promotion-card">
                    <h3>PEACE OF MIND</h3>
                    <p>A one-stop platform for all your fashion needs, hassle-free. Buy with a peace of mind.</p>
                    <Link to="#" className="btn-dark">BUY NOW</Link>
                </div>
                <div className="promotion-card">
                    <h3>BUY 2 GET 1 FREE</h3>
                    <p>End of season sale. Buy any 2 items of your choice and get 1 free.</p>
                    <Link to="#" className="btn-dark">BUY NOW</Link>
                </div>
            </section>

            <section className="top-sellers">
                <h3>Top Sellers</h3>
                <p>Browse our top-selling products</p>
                <div className="product-grid">
                    {topSellers.map(product => (
                        <div className="product-card" key={product.id} onClick={() => handleProductClick(product)}>
                            <Link to="/single-product">
                                <img src={product.image} alt={product.name} />
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">${product.priceAfter.toFixed(2)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
                <Link to="#" className="btn-primary">SHOP NOW</Link>
            </section>
        </div>
    );
};

export default Home;
