import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/CreatePost.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handlePublish = async () => {
    if (!title || !image) {
      alert("Please fill in the title and upload an image.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("postedBy", "user123");

    try {
      const response = await api.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        navigate("/memes");
      }
    } catch (error) {
      console.error("Failed to publish post", error);
      alert("Failed to publish post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="create-post-page">
      {" "}
      <div className="create-post">
        <h2>Create a New Post</h2>
        <div id="post-title">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Your title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div id="post-image">
          <label htmlFor="image">Upload Image:</label>
          <input
            className="choose-file"
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button onClick={handlePublish} disabled={isUploading}>
          {isUploading ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
