import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PostList from "./components/PostList";
// import PostDetails from "./components/PostDetails";
// import ProfilePicture from "./components/Profile";
import PublishPost from "./components/CreatePost";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import { SessionProvider } from "./contexts/SessionContext";

const App = () => {
  const loggedInUser = "user123";

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
          {/* <Route path="/course/:id" element={<PostDetails />} /> Uncomment to get individual post page */}
          {/* <Route path="/profile" element={<ProfilePicture />} />   Uncomment to link to profile */}
          <Route path="/upload" element={<PublishPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </SessionProvider>
    </div>
  );
};

export default App;
