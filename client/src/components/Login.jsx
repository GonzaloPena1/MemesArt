import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { useSession } from "../contexts/SessionContext";

const defaultUser = {
  email: "gonzalo1@gmail.com",
  password: "123456789",
};

const Login = () => {
  const [email, setEmail] = useState(defaultUser.email);
  const [password, setPassword] = useState(defaultUser.password);
  const navigate = useNavigate();

  const { setUser } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/users/login", {
        email: email,
        password: password,
      });
      const data = response.data;

      setUser({
        username: data.user.username,
        id: data.user.id,
      });

      localStorage.setItem("authToken", data.token);
      navigate("/memes");
      window.location.reload();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="email"
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
