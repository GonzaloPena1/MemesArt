import React from "react";
// import "./src/styles/home-page.css";
function HomePage() {
  const backgroundImageUrl = "//src/assets/Bckimg.png"; // Update the path as needed

  return (
    <>
      <div
        className="main-container"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
    </>
  );
}

export default HomePage;
