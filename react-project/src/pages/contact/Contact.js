import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact=()=>{const navigate = useNavigate;
    const[FormData, setFormData] = useState ({
        name:"",
        email:"",
        message:""

    });
    const [Error, setErrors] = useState({
        name:"",
        email:"",
        message:""
    });

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData (prev => ({...prev, [name]:value}));

    if(error[name]) {
        setErrors (prev => ({...prev, [name]:""}))
    }
}


const validateForm = () => {
    const newErrors = {};

    if (FormData.name.trim()==="") {
        newErrors.name = "Please enter name";
    }

    if (FormData.email.trim()==="") {
        newErrors.email = "Please enter a VALID email";
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = "Please enter a VALID email";
    }

    if (formData.message.trim()==="") {
        newErrors.message = "Please enter a message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length===(0);
};

const handleSubmit = (e) => {
    e.preventDefault();

    if(validateForm()) {
        setShowSuccessModal(true);
        setFormData ({
            name:"",
            email:"",
            message:""
        });
    }
}

const closeModel = () => {
    setShowSuccessModal (false);
};

return(
    <>
    <section className="contact-hero">
        <h1>CONTACT US</h1>
    </section>

    <main className="contact-container">
        <div className="contact-grid">
            <section>
                <h2>We would love to hear from you</h2>
                <p className="contact-lead">If you have any query or any type of suggestion, you can contact us here. we would love to hear from you</p>

                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    <div className="contact-row-2">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" name="name" type="text" value={formData.name} onChange={handleinputChange} required></input>
                            {errors.name && <div className = "contact-error">{errors.name}</div>}
                        </div>
                    
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" value={formData.email} onChange={handleinputChange} required></input>
                            {errors.email && <div className = "contact-error">{errors.email}</div>}
                        </div>
                    </div>
                        
                        <div>
                            <label htmlFor="message">Message</label>
                            <textarea id="messsage" name="message" value={formData.message} onChange={handleinputChange}></textarea>
                            {errors.message && <div className = "contact-error">{errors.message}</div>}
                        </div>
                    <button className="contact-btn" type="submit">SEND MESSAGE</button>
                </form>
            </section>
                
                <aside className="contact-side">
                    <div className="contact-block">
                        <h3>Visit Us</h3>
                        <p>UET Lahore, Punjab, Pakistan<br />Phone: +923003989987</p>
                    </div>
                    
                    <div className="contact-block">
                        <h3>Get In Touch</h3>
                        <p>You can get in touch with us on this provided email.</p>
                        <p className="kbd">itiproject@gmail.com</p>
                    </div>
                </aside>
        </div>
    </main>
    </>

)
};
