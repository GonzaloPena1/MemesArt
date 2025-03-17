import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const { user } = useSession();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleMemesClick = () => {
    if (token) {
      navigate("/memes");
    } else {
      navigate("/");
    }
  };

  //   // const wordCase = (word) => {
  //   //   if (word === undefined) {
  //   //     return "";
  //   //   }
  //   //   return word.charAt(0).toUpperCase() + word.slice(1);
  //   // };
  return (
    <header>
      <h1 onClick={handleMemesClick} style={{ cursor: "pointer" }}>
        {/* <img
//           src={"/public/images/step8up_logo.png"}
//           width={100}
//           height={20}
//           style={{ marginRight: "5px" }}
//           alt="My logo Image"
//         /> */}
        Memes
      </h1>
      <nav>
        {token && <Link to="/memes">All Memes</Link>}
        {token ? (
          <>
            {/* <Link to="/profile">{wordCase(user.username)}'s Courses</Link>  UNCOMMNET TO MAKE PROFILE */}
            <Link to="/upload">Post</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
