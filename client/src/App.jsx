import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PostList from "./components/PostList";
import PublishPost from "./components/CreatePost";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import { SessionProvider } from "./contexts/SessionContext";

import About from "./components/About"; // Import the About page


import api from "./api";

import ThemeToggle from "./components/ThemeToggle"; // Import the toggle button



const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await api.get("/user/me");
        if (response.data.user) {
          setLoggedInUser(response.data.user.username);
        }
      } catch (error) {
        console.error("Failed to fetch logged-in user:", error);
      }
    };

    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <SessionProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/memes"
            element={<PostList loggedInUser={loggedInUser} />}
          />
          <Route path="/upload" element={<PublishPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} /> {/* Add About Route */}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </SessionProvider>
    </div>
  );
};

export default App;
