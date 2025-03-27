import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer
      className={styles.footer}
      style={{
        padding: "50px",
      }}
    >
      <div
        style={{
          marginLeft: "50px",
        }}
      >
        <ul>
          <li className="footer-links">
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/terms-and-conditions">T&C</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div
        style={{
          marginLeft: "20px",
        }}
      >
        <p>&copy; 2025 All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
