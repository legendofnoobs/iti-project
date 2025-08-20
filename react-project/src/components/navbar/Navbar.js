import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import userIcon from '../../assets/icons/user 1.png';
import shoppingBagIcon from '../../assets/icons/shopping-bag 1.png';
import menuIcon from '../../assets/icons/menu 1.png';

const Navbar = () => {
    const [isSidebarActive, setIsSidebarActive] = React.useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    return (
        <>
            <header>
                <nav>
                    <div>
                        <h1>NorthStar</h1>
                    </div>
                    <div className="main-nav">
                        <ul className="nav-links">
                            <li><Link to="/" className="links-hover">HOME</Link></li>
                            <li><Link to="/about" className="links-hover">ABOUT</Link></li>
                            <li><Link to="/contact" className="links-hover">CONTACT US</Link></li>
                        </ul>
                    </div>
                    <div className="main-nav">
                        <ul className="nav-icons">
                            <li>
                                <Link to="/signin">
                                    <img src={userIcon} alt="user" />
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart">
                                    <img src={shoppingBagIcon} alt="shopping cart" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div id="menuButton" className="menu-button" onClick={toggleSidebar}>
                        <img src={menuIcon} alt="menu" />
                    </div>
                </nav>
            </header>
            <div id="sidebar" className={`sidebar ${isSidebarActive ? 'active' : ''}`}>
                <button id="close-sidebar" onClick={toggleSidebar}>x</button>
                <ul className="nav-links">
                    <li><Link to="/" className="links-hover">HOME</Link></li>
                    <li><Link to="/about" className="links-hover">ABOUT</Link></li>
                    <li><Link to="/contact" className="links-hover">CONTACT US</Link></li>
                </ul>
                <ul className="nav-icons">
                    <li>
                        <Link to="/signin">
                            <img src={userIcon} alt="user" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart">
                            <img src={shoppingBagIcon} alt="shopping cart" />
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
