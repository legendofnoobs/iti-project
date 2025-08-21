import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signIn.css";

export default function SignIn() {
  const navigate = useNavigate();
  const [emailinput, setEmailinput] = useState("");
  const [passwordinput, setPasswordinput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let isvalid = true;
    let messages = [];

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailinput)) {
      isvalid = false;
      messages.push("Enter a valid email address.");
    }

    if (passwordinput.trim().length < 6) {
      isvalid = false;
      messages.push("Password must be at least 6 characters.");
    }

    if (!isvalid) {
      alert(messages.join("\n"));
    } else {
      navigate("/");
    }
  };

  return (
    <section className="auth-container">
      <h2 className="auth-title">Sign In</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Your Email"
          required
          value={emailinput}
          onChange={(e) => setEmailinput(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          value={passwordinput}
          onChange={(e) => setPasswordinput(e.target.value)}
        />

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
