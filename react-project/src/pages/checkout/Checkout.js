import "./checkout.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../store/DataContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { checkoutData, setCartData, setCheckoutData } = useData();
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const inputsRef = {
    fullName: useRef(),
    streetAddress: useRef(),
    town: useRef(),
    phone: useRef(),
    email: useRef(),
  };

  useEffect(() => {
    if (!checkoutData) {
      showPopup("Please choose product");
      setTimeout(() => navigate("/"), 3000);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!/^[a-zA-Z\s-]+$/.test(inputs.fullName || "")) {
      newErrors.fullName =
        "Please enter character from a to z or from A to Z !";
    }

    if (!inputs.streetAddress) {
      newErrors.streetAddress = "Please enter the street address !";
    }

    if (!inputs.town) {
      newErrors.town = "Please enter the town !";
    }

    if (!/^[0-9]{11}$/.test(inputs.phone || "")) {
      newErrors.phone = "Please enter the phone with 11 digits only !";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email || "")) {
      newErrors.email = "Please enter email as lol@gmail.com";
    }

    setErrors(newErrors);

    for (const key in inputsRef) {
      if (key in newErrors) {
        inputsRef[key].current.focus();
        break;
      }
    }

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
        showPopup("Order placed successfully 🙌");
        setInputs({});
        setErrors({});
        setCartData(null);
        setCheckoutData(null);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch(() => {
        setErrors((error) => {
          return { ...error, placeOrder: "Try again later, Please :(" };
        });
      });
  };

  return (
    <>
      <form
        className="checkoutContainer"
        method="post"
        noValidate
        onSubmit={handleSubmit}
      >
        <p className="checkoutPath">
          home / <span className="checkoutPathHere">checkout</span>
        </p>
        <h2>Billing details</h2>
        <div className="billingForm">
          <div className="billingFormField">
            <label htmlFor="fullName">Full Name</label>
            <input
              ref={inputsRef.fullName}
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
          <div className="billingFormField">
            <label htmlFor="streetAddress">Street address</label>
            <input
              ref={inputsRef.streetAddress}
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
          <div className="billingFormField">
            <label htmlFor="town">Town / City</label>
            <input
              ref={inputsRef.town}
              id="town"
              name="town"
              type="text"
              value={inputs.town || ""}
              onChange={handleChange}
            />
            {errors.town && <p className="errorMessage">{errors.town}</p>}
          </div>
          <div className="billingFormField">
            <label htmlFor="phone">Phone</label>
            <input
              ref={inputsRef.phone}
              id="phone"
              name="phone"
              type="text"
              value={inputs.phone || ""}
              onChange={handleChange}
            />
            {errors.phone && <p className="errorMessage">{errors.phone}</p>}
          </div>
          <div className="billingFormField">
            <label htmlFor="email">Email address</label>
            <input
              ref={inputsRef.email}
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
        <table className="orderSummary">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="orderProduct">
                {checkoutData?.product} &times; {checkoutData?.quantity}
              </td>
              <td id="orderProductPrice">
                {(checkoutData?.price * checkoutData?.quantity || 0).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>Subtotal</td>
              <td>{checkoutData?.subtotal}</td>
            </tr>
            <tr>
              <td></td>
              <td id="orderTotal">{checkoutData?.total}</td>
            </tr>
          </tbody>
        </table>
        <div className="placeOrder">
          <div className="paymentNote">
            Cash on delivery. Please contact us if you require assistance or
            wish to make alternate arrangements.
          </div>
          <div className="placeOrderBtnLocate">
            <button id="placeOrderBtn" type="submit">
              Place Order
            </button>
            {errors.placeOrder && (
              <p className="errorMessage">{errors.placeOrder}</p>
            )}
          </div>
        </div>
      </form>
      {popupIsOpened && (
        <div id="popup">
          <p className="popupContent">{popupMessage}</p>
        </div>
      )}
    </>
  );
}
