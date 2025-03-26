import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  // State to track whether the footer is visible
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      // Adjust the scroll threshold as needed
      setIsVisible(true); // Show footer
    } else {
      setIsVisible(false); // Hide footer
    }
  };

  // Add and remove scroll event listener on mount/unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className={styles.footer}
      style={{
        display: isVisible ? "flex" : "none", // Conditionally show/hide the footer
        transition: "all 0.3s ease", // Smooth transition for visibility change
      }}
    >
      {/* Navigation Links */}
      <ul className={styles.footerNav}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/memes">Memes</Link>
        </li>
      </ul>

      {/* Social Media Icons */}
      <ul className={styles.footerSocial}>
        <li>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className={styles.iconFacebook} />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className={styles.iconTwitter} />
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className={styles.iconInstagram} />
          </a>
        </li>
        <li>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className={styles.iconYoutube} />
          </a>
        </li>
      </ul>

      {/* Copyright */}
      <p className={styles.copyright}>
        &copy; 2025 Made with ❤️ By MemesArt All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
