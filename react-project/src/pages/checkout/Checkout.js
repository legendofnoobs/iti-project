import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./checout.module.css";

export function Checkout() {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState(null);
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCheckoutData(JSON.parse(localStorage.getItem("checkout_data")));
    if (!checkoutData) {
      showPopup("Please choose product");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  }, []);

  const showPopup = (message) => {
    setPopupIsOpened(true);
    setPopupMessage(message);
  };

  const handleChange = (event) => {
    setInputs((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value.trim() };
    });

    setErrors(({ [event.target.name]: removed, placeOrder, ...rest }) => rest);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!/^[a-zA-Z\s-]+$/.test(inputs.fullName)) {
      newErrors.fullName =
        "Please enter character from a to z or from A to Z !";
    }

    if (!inputs.streetAddress) {
      newErrors.streetAddress = "Please enter the street address !";
    }

    if (!inputs.town) {
      newErrors.town = "Please enter the town !";
    }

    if (!/^[0-9]{11}$/.test(inputs.phone)) {
      newErrors.phone = "Please enter the phone with 11 digits only !";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      newErrors.email = "Please enter email as lol@gmail.com";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;

    /* just any api that make response.ok = true */
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...inputs,
        checkoutData,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(() => {
        showPopup("Order placed successfully &#128588");
        event.target.reset();
        setTimeout(() => {
          localStorage.removeItem("checkout_data");
          navigate("/home");
        }, 3000);
      })
      .catch(() => {
        setErrors((error) => {
          return { ...error, placeOrder: "Try again later, Please :(" };
        });
      });
  }

  return (
    <>
      <form
        className={style.checkoutContainer}
        method="post"
        novalidate
        onSubmit={handleSubmit}
      >
        <p className={style.checkoutPath}>
          home / <span className={style.checkoutPathHere}>checkout</span>
        </p>
        <h2>Billing details</h2>
        <div className={style.billingForm}>
          <div className={style.billingFormField}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={inputs.fullName || ""}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="errorMessage">{errors.fullName}</p>
            )}
          </div>
          <div className={style.billingFormField}>
            <label htmlFor="streetAddress">Street address</label>
            <input
              id="streetAddress"
              name="streetAddress"
              type="text"
              placeholder="House number and street name"
              value={inputs.streetAddress || ""}
              onChange={handleChange}
            />
            {errors.streetAddress && (
              <p className="errorMessage">{errors.streetAddress}</p>
            )}
          </div>
          <div className={style.billingFormField}>
            <label htmlFor="town">Town / City</label>
            <input
              id="town"
              name="town"
              type="text"
              value={inputs.town || ""}
              onChange={handleChange}
            />
            {errors.town && <p className="errorMessage">{errors.town}</p>}
          </div>
          <div className={style.billingFormField}>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={inputs.phone || ""}
              onChange={handleChange}
            />
            {errors.phone && <p className="errorMessage">{errors.phone}</p>}
          </div>
          <div className={style.billingFormField}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
            {errors.email && <p className="errorMessage">{errors.email}</p>}
          </div>
        </div>
        <h2>Your order</h2>
        <table className={style.orderSummary}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={style.orderProduct}>
                {checkoutData.product} &times; {checkoutData.quantity}
              </td>
              <td className={style.orderProductPrice}>
                {(checkoutData.price * checkoutData.quantity).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td>{checkoutData.subtotal}</td>
            </tr>
            <tr>
              <td></td>
              <td className={style.orderTotal}>{checkoutData.total}</td>
            </tr>
          </tbody>
        </table>
        <div className={style.placeOrder}>
          <div className={style.paymentNote}>
            Cash on delivery. Please contact us if you require assistance or
            wish to make alternate arrangements.
          </div>
          <div className={style.placeOrderBtnLocate}>
            <button className={style.placeOrderBtn} type="submit">
              Place Order
            </button>
            {errors.placeOrder && (
              <p className="errorMessage">{errors.placeOrder}</p>
            )}
          </div>
        </div>
      </form>
      {popupIsOpened && (
        <div className="popup">
          <p className="popupContent">{popupMessage}</p>
        </div>
      )}
    </>
  );
}
