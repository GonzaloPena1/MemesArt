import React, { useState, useEffect } from "react";
import api from "../api";
import PostCard from "./PostCard";
import "../styles/PostList.css";
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
      <div className="sidebar left-sidebar">
        <div className="ad">
          <h3>Hot Picks</h3>
          <img src="./src/assets/ad.png" alt="Ad 4" className="ad-image" />
        </div>
        <div className="ad">
          <h3>New Deals</h3>
          <img src="./src/assets/ad.png" alt="Ad 5" className="ad-image" />
        </div>
      </div>
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
      {/* Sidebar for Ads  */}
      <div className="sidebar">
        <div className="ad">
          <h3>Meme of the day</h3>
          <img
            src="./src/assets/meme2.jpg"
            alt="Advertisement 2"
            className="ad-image"
          />
        </div>
        <div className="ad">
          <h3> Sponsored Ad </h3>
          <img
            src="./src/assets/ad.png"
            alt="Advertisement 1"
            className="ad-image"
          />
        </div>
        <div className="ad">
          <h3>Trending</h3>
          <img
            src="./src/assets/meme1.jpg"
            alt="Advertisement 3"
            className="ad-image"
          />
        </div>
      </div>
    </div>
  );
};

export default PostList;
