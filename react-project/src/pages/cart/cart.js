import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./cart.css";

export default function ShoppingCart() {
  const navigate = useNavigate(); 

  const [cartItem, setCartItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [pricePerItem, setPricePerItem] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("cartItem")) {
      const item = JSON.parse(localStorage.getItem("cartItem"));
      setCartItem(item);
      setPricePerItem(item.priceAfter);
      setQuantity(item.quantity || 1);
    }
  }, []);

  useEffect(() => {
    if (cartItem) {
      const subtotalValue = (pricePerItem * quantity).toFixed(2);
      setSubtotal(subtotalValue);
    }
  }, [cartItem, quantity, pricePerItem]);

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value) || 1;
    if (value < 1) value = 1;
    setQuantity(value);
  };

  const handleRemove = () => {
    setCartItem(null);
    setSubtotal(0);
    localStorage.removeItem("cartItem");
    alert("item removed from cart.");
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setShowCheckoutPopup(true);
  };

  const confirmCheckout = () => {
    const cartData = {
      product: cartItem?.name || "",
      quantity,
      price: pricePerItem.toFixed(2),
      subtotal,
      total: subtotal,
    };
    localStorage.setItem("checkout_data", JSON.stringify(cartData));

    navigate("/checkout");
  };

  const cancelCheckout = () => {
    setShowCheckoutPopup(false);
  };

  return (
    <div>
      <div id="navbar"></div>

      <div className="cart-container">
        <p>
          <span
            className="cart-path"
            onClick={() => navigate("/")} >
            HOME
          </span>{" "}
          / <span className="cart-path-here">SHOPPING CART</span>
        </p>

        <table className="cart-table">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItem && (
              <tr>
                <td>
                  <button className="remove-btn" onClick={handleRemove}>
                    &times;
                  </button>
                </td>
                <td className="product-info">
                  <div className="product-details">
                    <div className="product-image-placeholder">
                      <img
                        id="product-cart-image"
                        src={cartItem.image}
                        alt={cartItem.name}
                      />
                    </div>
                    <span id="product-cart-name">{cartItem.name}</span>
                  </div>
                </td>
                <td id="product-cart-price">${pricePerItem.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    className="quantity-input"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </td>
                <td id="product-cart-row-total">${subtotal}</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="cart-totals-section">
          <h2>Cart Totals</h2>
          <div className="totals-box">
            <div className="totals-row">
              <span>Subtotal</span>
              <span id="cart-subtotal">${subtotal}</span>
            </div>
            <div className="totals-row">
              <span>Shipping Fee</span>
              <span className="free-label">FREE!!!</span>
            </div>
            <div className="totals-row total-final">
              <span>Total</span>
              <span id="cart-total">${subtotal}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {showCheckoutPopup && (
        <div id="checkout_confirm_popUp" className="checkout-popup">
          <div className="checkout-popup-content">
            <p>Are you sure you want to proceed to checkout?</p>
            <div className="checkout-popup-buttons">
              <button id="confirm_checkout" onClick={confirmCheckout}>
                Yes
              </button>
              <button id="cancel_checkout" onClick={cancelCheckout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div id="footer"></div>
    </div>
  );
}
