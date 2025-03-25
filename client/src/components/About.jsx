import React from "react";
import styles from "../styles/About.module.css"; // Updated path

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1>About MemesArt</h1>
      <p>
        Welcome to MemesArt! 🎨😂 This is a platform where you can share, explore, 
        and enjoy the best memes from around the internet.  
      </p>
      <p>
        Our mission is to spread laughter and creativity through memes. Whether you're 
        here to browse or upload your own creations, we’re happy to have you!  
      </p>
    </div>
  );
};

export default About;
