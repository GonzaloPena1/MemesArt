import React from "react";

function HomePage() {
  return (
    <>
      <div className="main-container">
        <div className="text-content">
          <p className="heading-large">Human</p>
          <p className="heading-large">stories & ideas</p>
          <p className="subheading">
            A place to share mames, and laugh with your friends
          </p>
          <a href="register.html" className="cta-button">
            Start reading
          </a>
        </div>

        <div className="brand-image">
          <img
            alt="Brand image"
            src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
            width="460"
            height="600"
            loading="eager"
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
