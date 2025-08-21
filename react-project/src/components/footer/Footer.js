import "./footer.css";
import Visa from "../../assets/images/footerVisa.jpg";
import MasterCard from "../../assets/images/footerMasterCard.jpg";
import PayPal from "../../assets/images/footerPayPal.jpg";
import VisaElectron from "../../assets/images/footerVisaElectron.jpg";
import { useState } from "react";

export default function Footer() {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [popupIsOpened, setPopupIsOpened] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleChange = (event) => {
    setInputs((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value.trim() };
    });

    setErrors(({ [event.target.name]: removed, sent, ...rest }) => rest);
  };

  const showPopup = (message) => {
    setPopupIsOpened(true);
    setPopupMessage(message);
  };

  const hidePopup=()=>{
    setPopupIsOpened(false);
    setPopupMessage("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email || "")) {
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
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(() => {
        showPopup("You will notified about all news");
        event.target.reset();
        setTimeout(()=>{
          hidePopup();
        },3000);
      })
      .catch(() => {
        setErrors((error) => {
          return { ...error, sent: "Try again later, Please :(" };
        });
      });
  };

  return (
    <>
      <footer id="footerContainer">
        <div id="upperFooter">
          <div className="footerColumn">
            <p>company info</p>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Latest Posts</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Shop</a>
              </li>
            </ul>
          </div>

          <div className="footerColumn">
            <p>help links</p>
            <ul>
              <li>
                <a href="#">Tracking</a>
              </li>
              <li>
                <a href="#">Order Status</a>
              </li>
              <li>
                <a href="#">Delivery</a>
              </li>
              <li>
                <a href="#">Shipping Info</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="footerColumn">
            <p>useful links</p>
            <ul>
              <li>
                <a href="#">Special Offers</a>
              </li>
              <li>
                <a href="#">Gift Cards</a>
              </li>
              <li>
                <a href="#">Advertising</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
            </ul>
          </div>

          <div className="footerColumn">
            <p>get in the know</p>
            <form method="post" onSubmit={handleSubmit} noValidate>
              <input
                name="email"
                type="email"
                value={inputs.email || ""}
                onChange={handleChange}
                placeholder="Enter email"
              />
              <button type="submit">&rsaquo;</button>
            </form>
            {errors.email && <div className="errorMessage">{errors.email}</div>}
            {errors.sent && <div className="errorMessage">{errors.sent}</div>}
          </div>
        </div>

        <div id="lowerFooter">
          <div id="lowerFooterLeftSide">
            <p id="copyRight">&copy; 2020 NorthStar eCommerce</p>
            <div id="policy">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
            </div>
          </div>
          <div id="lowerFooterRightSide">
            <a href="#">
              <img src={Visa} alt="Visa" />
            </a>
            <a href="#">
              <img src={MasterCard} alt="MasterCard" />
            </a>
            <a href="#">
              <img src={PayPal} alt="PayPal" />
            </a>
            <a href="#">
              <img src={VisaElectron} alt="Visa Electron" />
            </a>
          </div>
        </div>
      </footer>
      {popupIsOpened && (
        <div id="popup">
          <p className="popupContent">{popupMessage}</p>
        </div>
      )}
    </>
  );
}
