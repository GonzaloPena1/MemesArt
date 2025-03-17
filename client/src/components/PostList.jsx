import React, { useState, useEffect } from "react";
import api from "../api";
import PostCard from "./PostCard";

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
    <div>
      <h2>All Posts</h2>
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
    </div>
  );
};

export default PostList;
