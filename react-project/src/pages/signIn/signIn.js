import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signIn.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [emailinput, setEmailinput] = useState("");
  const [passwordinput, setPasswordinput] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailinput)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    if (passwordinput.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      navigate("/");
    }
  };

  return (
    <section className="auth-container">
      <h2 className="auth-title">Sign In</h2>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          placeholder="Your Email"
          value={emailinput}
          onChange={(e) => setEmailinput(e.target.value)}
        />
        
         {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={passwordinput}
          onChange={(e) => setPasswordinput(e.target.value)}
        />
       {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Sign In</button>
      </form>

      <div className="auth-footer">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/signUp")}
        >
          Create one
        </button>
      </div>
    </section>
  );
}
