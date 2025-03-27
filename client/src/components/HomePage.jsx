import React from "react";
import "../styles/home-page.css";

function HomePage() {
  const backgroundImageUrl = "./src/assets/bcg.png";

  return (
    <div
      className="main-container"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        marginTop: "var(--header-height)",
        minHeight: "calc(100vh - var(--header-height) - var(--footer-height))",
      }}
    >
      <div className="text-content">
        <p className="heading-large">MEMES</p>
        <p className="heading-large">ART</p>
        <p className="subheading">
          A place to share memes and <br></br>laugh with friends
        </p>

        <a href="/register.html" className="cta-button">
          Start Memeing
        </a>
      </div>
    </div>
  );
}

export default HomePage;
