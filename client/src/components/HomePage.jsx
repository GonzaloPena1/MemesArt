import React from "react";
import "../styles/home-page.css";

function HomePage() {
  const backgroundImageUrl = "./src/assets/bcg.png";

  return (
    <div className="homepage-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      <div className="homepage-content">
        <div className="text-content">
          <p className="heading-large">MEMES</p>
          <p className="heading-large">ART</p>
          <p className="subheading">
            A place to share memes and <br></br>laugh with friends
          </p>
          <a href="/signup" className="cta-button">
            Start Memeing
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
