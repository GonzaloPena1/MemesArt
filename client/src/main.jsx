import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext"; // Import ThemeProvider

import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// import './styles/style.css';

root.render(
  <ThemeProvider>
    {" "}
    {/* Wrap the app in ThemeProvider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
