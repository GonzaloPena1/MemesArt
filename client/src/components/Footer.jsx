import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
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
      <p>&copy; 2025 Made with ❤️ By MemesArt. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
