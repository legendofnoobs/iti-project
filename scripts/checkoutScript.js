function showPopup() {
  const popup = document.createElement("div");
  popup.id = "popup";
  const popupContent = document.createElement("p");
  popupContent.innerText = "Order placed successfully 🙌";
  popupContent.classList.add("popup-content");
  popup.appendChild(popupContent);
  const footer = document.getElementById("footer");
  document.body.insertBefore(popup, footer);
  document.getElementById("popup").style.display = "flex";
}

function createErrorMessageAndFocus(element, message) {
  if (!element.nextElementSibling) {
    const errorMessege = document.createElement("p");
    errorMessege.innerText = message;
    errorMessege.classList.add("error-message");
    element.parentNode.appendChild(errorMessege);
  }
  element.scrollIntoView({ behavior: "smooth" });
  element.focus();
}

function clearErrorMessage(element) {
  element.nextElementSibling?.remove();
}

function handleSubmit(event) {
  event.preventDefault();
  const placeOrderButton = document.getElementById("place-order-btn");
  const fullName = document.querySelector(`input[name="billing-form-fullName"`);
  const streetAddress = document.querySelector(
    `input[name="billing-form-streetAddress"]`
  );
  const town = document.querySelector(`input[name="billing-form-town"]`);
  const phone = document.querySelector(`input[name="billing-form-phone"]`);
  const email = document.querySelector(`input[name="billing-form-email"]`);
  const checkoutData = JSON.parse(localStorage.getItem("checkout_data"));


  clearErrorMessage(placeOrderButton);

  if (!/^[a-zA-Z\s-]+$/.test(fullName.value.trim())) {
    createErrorMessageAndFocus(
      fullName,
      "Please enter character from a to z or from A to Z !"
    );
    return;
  }

  if (!streetAddress.value.trim()) {
    createErrorMessageAndFocus(
      streetAddress,
      "Please enter the street address !"
    );
    return;
  }

  if (!town.value.trim()) {
    createErrorMessageAndFocus(town, "Please enter the town !");
    return;
  }

  if (!/^[0-9]{11}$/.test(phone.value.trim())) {
    createErrorMessageAndFocus(
      phone,
      "Please enter the phone with 11 numbers only !"
    );
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    createErrorMessageAndFocus(email, "Please enter email as lol@gmail.com");
    return;
  }

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, streetAddress, town, phone, email, checkoutData }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then(() => {
      showPopup();
      event.target.reset();
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 3000);
    })
    .catch(() => {
      createErrorMessageAndFocus(
        placeOrderButton,
        "Try again later, Please :("
      );
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const checkoutData = JSON.parse(localStorage.getItem("checkout_data"));
  if (checkoutData) {
    document.querySelector(
      ".order-product"
    ).innerText = `${checkoutData.product} × ${checkoutData.quantity}`;

    document.querySelector(".order-product-price").innerText = `$${(
      checkoutData.price * checkoutData.quantity
    ).toFixed(2)}`;

    document.getElementById("subTotal").innerText = `$${checkoutData.subtotal}`;

    document.querySelector(".order-total").innerText = `$${checkoutData.total}`;
  }
});
