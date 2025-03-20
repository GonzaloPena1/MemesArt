import React from "react";
// import "./styles/home-page.css";
function HomePage() {
  const backgroundImageUrl = "./src/assets/Bckimg.png";

  return (
    <div
      className="main-container"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundColor: "#f0f0f0",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "40px",
      }}
    >
      <div className="text-content">
        <p className="heading-large">Human</p>
        <p className="heading-large">stories & ideas</p>
        <p className="subheading">
          A place to share memes, and laugh with your friends
        </p>
        <a href="/register.html" className="cta-button">
          Start reading
        </a>
      </div>

      {/* <div className="brand-image">
        <img
          alt="Brand image"
          src="./src/assets/Bckimg.png"
          width="1920"
          height="600"
          loading="eager"
        />
      </div> */}
    </div>
  );
}

export default HomePage;
