function createErrorMessageAndFocus(element,message){
    if (!element.nextElementSibling) {
      const errorMessege = document.createElement("p");
      errorMessege.innerText = message;
      errorMessege.classList.add("error-message");
      element.parentNode.appendChild(errorMessege);
    }
    element.scrollIntoView({ behavior: "smooth" });
    element.focus();
}

function handleSubmit(event) {
  event.preventDefault();
  const fullName = document.querySelector(`input[name="billing-form-fullName"`);
  const streetAddress = document.querySelector(
    `input[name="billing-form-streetAddress"]`
  );
  const town = document.querySelector(`input[name="billing-form-town"]`);
  const phone = document.querySelector(`input[name="billing-form-phone"]`);
  const email = document.querySelector(`input[name="billing-form-email"]`);
  
  if (!(/^[a-zA-Z\s-]+$/).test(fullName.value.trim())) {
    createErrorMessageAndFocus(fullName,"Please enter character from a to z or from A to Z !");
    return;
  }

  if (!streetAddress.value.trim()) {
    createErrorMessageAndFocus(streetAddress,"Please enter the street address !");
    return;
  }

  if (!town.value.trim()) {
    createErrorMessageAndFocus(town,"Please enter the town !");
    return;
  }

  if (!(/^[0-9]{11}$/).test(phone.value.trim())) {
    createErrorMessageAndFocus(phone,"Please enter the phone with 11 numbers only !");
    return;
  }

  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value.trim())) {
    createErrorMessageAndFocus(email,"Please enter email as lol@gmail.com");
    return;
  }

  showPopup();

  setTimeout(()=>{
    event.target.submit();
  },3000);
}

function clearErrorMessage(element){
    element.nextElementSibling?.remove();
}

function showPopup() {
  const popup=document.createElement("div");
  popup.id="popup";
  const popupContent=document.createElement("p");
  popupContent.innerText="Order placed successfully 🙌";
  popupContent.classList.add("popup-content");
  popup.appendChild(popupContent);
  const footer = document.getElementById("footer");
  document.body.insertBefore(popup,footer);
  document.getElementById("popup").style.display = "flex";
}
