import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    let newErrors = { email: "", password: "" };
    let isValid = true;

   
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    if (formData.password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      navigate("/signIn");
    }
  };

  return (
    <section className="auth-container">
      <h2 className="auth-title">Create Account</h2>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Sign Up</button>
      </form>

      <div className="auth-footer">
        Already have an account?{" "}
        <a onClick={() => navigate("/signIn")}>Sign In</a>
      </div>
    </section>
  );
}
