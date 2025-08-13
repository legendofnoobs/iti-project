function handleSubmit(event) {
  event.preventDefault();
  const fullName = document.querySelector(`input[name="billing-form-fullName"`);
  const streetAddress = document.querySelector(
    `input[name="billing-form-streetAddress"]`
  );
  const town = document.querySelector(`input[name="billing-form-town"]`);
  const phone = document.querySelector(`input[name="billing-form-phone"]`);
  const email = document.querySelector(`input[name="billing-form-email"]`);
  
  if (!(/^[a-zA-Z\s-]+$/).test(fullName.value)) {
    if (!fullName.nextElementSibling) {
      const errorMessege = document.createElement("p");
      errorMessege.innerText =
        "Please enter character from a to z or from A to Z !";
      errorMessege.classList.add("error-message");
      fullName.parentNode.appendChild(errorMessege);
    }
    fullName.scrollIntoView({ behavior: "smooth" });
    fullName.focus();
    return;
  }

  if (!streetAddress.value) {
    if (!streetAddress.nextElementSibling) {
      const errorMessege = document.createElement("p");
      errorMessege.innerText =
        "Please enter the street address !";
      errorMessege.classList.add("error-message");
      streetAddress.parentNode.appendChild(errorMessege);
    }
    streetAddress.scrollIntoView({ behavior: "smooth" });
    streetAddress.focus();
    return;
  }

  if (!town.value) {
    if (!town.nextElementSibling) {
      const errorMessege = document.createElement("p");
      errorMessege.innerText =
        "Please enter the town !";
      errorMessege.classList.add("error-message");
      town.parentNode.appendChild(errorMessege);
    }
    town.scrollIntoView({ behavior: "smooth" });
    town.focus();
    return;
  }

  if (!(/^[0-9]{11}$/).test(phone.value)) {
    if (!phone.nextElementSibling) {
      const errorMessege = document.createElement("p");
      errorMessege.innerText =
        "Please enter the phone with 11 numbers only !";
      errorMessege.classList.add("error-message");
      phone.parentNode.appendChild(errorMessege);
    }
    phone.scrollIntoView({ behavior: "smooth" });
    phone.focus();
    return;
  }

  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value)) {
    if (!email.nextElementSibling) {
      const errorMessege = document.createElement("p");
      errorMessege.innerText =
        "Please enter email as lol@gmail.com";
      errorMessege.classList.add("error-message");
      email.parentNode.appendChild(errorMessege);
    }
    email.scrollIntoView({ behavior: "smooth" });
    email.focus();
    return;
  }

  showPopup();

  setTimeout(()=>{
    event.target.submit();
  },3000);
}

function clearErrorMessage(element){
  if(element.nextElementSibling){
    element.nextElementSibling.remove();
  }
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