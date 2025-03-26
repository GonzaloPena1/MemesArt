// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSession } from "../contexts/SessionContext";
// import {
//   FaSignInAlt,
//   FaUserPlus,
//   FaSignOutAlt,
//   FaUpload,
//   FaRegImage,
//   FaHome,
// } from "react-icons/fa"; // Add icons from React Icons

// const Header = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("authToken");

//   const { user } = useSession();

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   const handleMemesClick = () => {
//     if (token) {
//       navigate("/memes");
//     } else {
//       navigate("/");
//     }
//   };

//   return (
//     <header>
//       <h1 onClick={handleMemesClick} style={{ cursor: "pointer" }}>
//         MemesArt
//       </h1>
//       <nav>
//         {token && (
//           <Link to="/memes" title="All Memes">
//             <FaHome className="icon" />
//           </Link>
//         )}
//         {token ? (
//           <>
// {/*
//             <Link to="/upload">Post</Link>
//             <button onClick={handleLogout}>Logout</button> */}

//             <Link to="/upload" title="Post a Meme">
//               <FaUpload className="icon" />
//             </Link>
//             <button onClick={handleLogout} title="Logout">
//               <FaSignOutAlt className="icon" />
//             </button>

//           </>
//         ) : (
//           <>
//             <Link to="/login" title="Login">
//               <FaSignInAlt className="icon" />
//             </Link>
//             <Link to="/signup" title="Sign Up">
//               <FaUserPlus className="icon" />
//             </Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUpload,
  FaRegImage,
  FaHome,
} from "react-icons/fa"; // Add icons from React Icons

import ThemeToggle from "./ThemeToggle"; // Import the toggle button

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
  return (
    <header>
      <h1 onClick={handleMemesClick} style={{ cursor: "pointer" }}>
        MemesArt
      </h1>
      <nav className="navbar">
        {/* Move Theme Toggle to the beginning */}
        <ThemeToggle />
        {token && (
          <Link to="/memes" title="All Memes">
            <FaHome className="icon" />
          </Link>
        )}
        {token ? (
          <>
            <Link to="/upload" title="Post a Meme">
              <FaUpload className="icon" />
            </Link>
            <button onClick={handleLogout} title="Logout">
              <FaSignOutAlt className="icon" />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" title="Login">
              <FaSignInAlt className="icon" />
            </Link>
            <Link to="/signup" title="Sign Up">
              <FaUserPlus className="icon" />
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};
export default Header;
