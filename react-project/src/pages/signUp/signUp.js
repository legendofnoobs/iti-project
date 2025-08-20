import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const form = document.querySelector(".auth-form");

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const emailinput = document.querySelector("#email");
        const passwordinput = document.querySelector("#password");

        let isvalid = true;
        let messages = [];

        if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailinput.value)
        ) {
          isvalid = false;
          messages.push("Enter a valid email address.");
        }

        if (passwordinput.value.trim().length < 6) {
          isvalid = false;
          messages.push("Password must be at least 6 characters.");
        }

        if (!isvalid) {
          alert(messages.join("\n"));
        } else {
          navigate("/signin");
        }
      });
    }
  }, [navigate]);

  return (
    <section className="auth-container">
      <h2 className="auth-title">Create Account</h2>
      <form className="auth-form">
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
          type="email"
          id="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button type="submit">Sign Up</button>
      </form>
      <div className="auth-footer">
        Already have an account?{" "}
        <a onClick={() => navigate("/signin")}>Sign In</a>
      </div>
    </section>
  );
}
