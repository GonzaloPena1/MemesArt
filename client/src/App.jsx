import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PostList from "./components/PostList";
import PublishPost from "./components/CreatePost";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import { SessionProvider } from "./contexts/SessionContext";
import ThemeToggle from "./components/ThemeToggle"; // Import the toggle button
import About from "./components/About";
import Terms from "./components/Terms";
import Contact from "./components/Contact";

const App = () => {
  const loggedInUser = "user123";

  return (
    <div>
      <SessionProvider>
        <Header />
        <ThemeToggle /> {/* Add the Theme Toggle button here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/memes"
            element={<PostList loggedInUser={loggedInUser} />}
          />

          <Route path="/upload" element={<PublishPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </SessionProvider>
      <Footer />
    </div>
  );
};

export default App;
