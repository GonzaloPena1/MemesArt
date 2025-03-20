import React, { useState, useEffect } from "react";
import api from "../api";
import PostCard from "./PostCard";
import "../styles/PostList.css"; // Import the CSS file for styling

const PostList = ({ loggedInUser }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleUpdate = (id, newTitle) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, title: newTitle } : post
      )
    );
  };

  return (
    <div className="container">
      {/* Main content for posts */}
      <div className="post-list">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            loggedInUser={loggedInUser}
          />
        ))}
      </div>

      {/* Sidebar for ads */}
      <div className="sidebar">
        <img
          src="./src/assets/ad.png" //  image for ad
          alt="Advertisement"
          className="ad-image"
        />
      </div>
    </div>
  );
};

export default PostList;
