import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import "../styles/Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { setUser } = useSession();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const displayError = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const validatePassword = () => {
    if (password !== password2) {
      displayError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    try {
      const response = await api.post("/api/users", {
        username: userName,
        email: email,
        password: password,
        password2: password2,
      });
      const data = response.data;
      setUser({
        username: data.user.username,
        id: data.user.id,
      });
      navigate("/login");
    } catch (error) {
      console.error("Signup failed", error);
      displayError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
