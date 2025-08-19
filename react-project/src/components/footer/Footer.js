import style from "./footer.module.css";
import Visa from "../../assets/images/footerVisa.jpg";
import MasterCard from "../../assets/images/footerMasterCard.jpg";
import PayPal from "../../assets/images/footerPayPal.jpg"
import VisaElectron from "../../assets/images/footerVisaElectron.jpg"

export function Footer() {
  const createErrorMessageAndFocus = (element, message) => {
    if (!element.nextElementSibling) {
      const errorMessege = document.createElement("p");
      errorMessege.innerText = message;
      errorMessege.classList.add("error-message");
      element.parentNode.appendChild(errorMessege);
    }

    element.scrollIntoView({ behavior: "smooth" });
    element.focus();
  };

  const clearErrorMessage = (element) => {
    element.nextElementSibling?.remove();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = document.querySelector(`input[name="email"]`);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      createErrorMessageAndFocus(email, "Please enter email as lol@gmail.com");
      return;
    }
    /* just any api that make response.ok = true */
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:email.value,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .then(() => {

      })
      .catch(() => {
        createErrorMessageAndFocus(
          "Try again later, Please :("
        );
      });
  };
  return (
    <div className={style.footerContainer}>
      <div className={style.upperFooter}>
        <div className={style.footerColumn}>
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

        <div className={style.footerColumn}>
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

        <div className={style.footerColumn}>
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

        <div className={style.footerColumn}>
          <p>get in the know</p>
          <form method="post" onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter email" />
            <button type="submit">&rsaquo;</button>
          </form>
        </div>
      </div>

      <div className={style.lowerFooter}>
        <div className={style.lowerFooterLeftSide}>
          <p>&copy; 2020 NorthStar eCommerce</p>
          <div className={style.policy}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
        <div className={style.lowerFooterRightSide}>
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
    </div>
  );
}
