import "./footer.css";
import Visa from "../../assets/images/footerVisa.jpg";
import MasterCard from "../../assets/images/footerMasterCard.jpg";
import PayPal from "../../assets/images/footerPayPal.jpg";
import VisaElectron from "../../assets/images/footerVisaElectron.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

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
                <Link to="#">About Us</Link>
              </li>
              <li>
                <Link to="#">Latest Posts</Link>
              </li>
              <li>
                <Link to="#">Contact Us</Link>
              </li>
              <li>
                <Link to="#">Shop</Link>
              </li>
            </ul>
          </div>

          <div className="footerColumn">
            <p>help Links</p>
            <ul>
              <li>
                <Link to="#">Tracking</Link>
              </li>
              <li>
                <Link to="#">Order Status</Link>
              </li>
              <li>
                <Link to="#">Delivery</Link>
              </li>
              <li>
                <Link to="#">Shipping Info</Link>
              </li>
              <li>
                <Link to="#">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="footerColumn">
            <p>useful Links</p>
            <ul>
              <li>
                <Link to="#">Special Offers</Link>
              </li>
              <li>
                <Link to="#">Gift Cards</Link>
              </li>
              <li>
                <Link to="#">Advertising</Link>
              </li>
              <li>
                <Link to="#">Terms of Use</Link>
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
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Terms & Conditions</Link>
            </div>
          </div>
          <div id="lowerFooterRightSide">
            <Link to="#">
              <img src={Visa} alt="Visa" />
            </Link>
            <Link to="#">
              <img src={MasterCard} alt="MasterCard" />
            </Link>
            <Link to="#">
              <img src={PayPal} alt="PayPal" />
            </Link>
            <Link to="#">
              <img src={VisaElectron} alt="Visa Electron" />
            </Link>
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
