import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

export default function Contact(){
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [Error, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (Error[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (FormData.name.trim() === "") {
      newErrors.name = "Please enter name";
    }

    if (FormData.email.trim() === "") {
      newErrors.email = "Please enter a VALID email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(FormData.email.trim())) {
      newErrors.email = "Please enter a VALID email";
    }

    if (FormData.message.trim() === "") {
      newErrors.message = "Please enter a message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowSuccessModal(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  const closeModel = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <section className="hero">
        <h1>CONTACT US</h1>
      </section>

      <main className="container-contact">
        <div className="grid">
          <section>
            <h2>We would love to hear from you</h2>
            <p className="lead">
              If you have any query or any type of suggestion, you can contact
              us here. we would love to hear from you
            </p>

            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="row-2">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={FormData.name}
                    onChange={handleChange}
                    required
                  ></input>
                  {Error.name && <div className="error">{Error.name}</div>}
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={FormData.email}
                    onChange={handleChange}
                    required
                  ></input>
                  {Error.email && <div className="error">{Error.email}</div>}
                </div>
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="messsage"
                  name="message"
                  value={FormData.message}
                  onChange={handleChange}
                ></textarea>
                {Error.message && (
                  <div className="error">{Error.message}</div>
                )}
              </div>
              <button className="btn" type="submit">
                SEND MESSAGE
              </button>
            </form>
          </section>

          <aside className="side">
            <div className="block">
              <h3>Visit Us</h3>
              <p>
                UET Lahore, Punjab, Pakistan
                <br />
                Phone: +923003989987
              </p>
            </div>

            <div className="block">
              <h3>Get In Touch</h3>
              <p>You can get in touch with us on this provided email.</p>
              <p className="kbd">itiproject@gmail.com</p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};
