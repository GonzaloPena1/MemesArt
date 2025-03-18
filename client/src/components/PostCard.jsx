// export default PostCard;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  XIcon,
  WhatsappIcon,
} from "react-share";

const PostCard = ({ post, onDelete, onUpdate, loggedInUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [count, setCount] = useState(0);

  const handleUpdate = async () => {
    try {
      await api.put(`/api/posts/${post.id}`, { title: updatedTitle });
      onUpdate(post.id, updatedTitle);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/posts/${post.id}`);
      onDelete(post.id);
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  // Construct the full image URL
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `http://localhost:3001${post.image}`;

  return (
    <div className="card">
      <div className="card-description" style={{ textAlign: "center" }}>
        {isEditing ? (
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
        ) : (
          `${post.title}`
        )}
      </div>
      <img
        src={imageUrl}
        alt={post.title}
        className="card-image"
        style={{
          width: "300px",
          height: "300px",
          display: "block",
          margin: "0 auto",
        }}
      />
      <div className="card-options">
        {loggedInUser && post.postedBy === loggedInUser && (
          <>
            {isEditing ? (
              <button className="button" onClick={handleUpdate}>
                Save
              </button>
            ) : (
              <button className="button" onClick={() => setIsEditing(true)}>
                Update
              </button>
            )}
            <button className="button" onClick={handleDelete}>
              Delete
            </button>
          </>
        )}
        <button
          className="button"
          onClick={() => setCount((count) => count + 1)}
        >
          Likes
          <a className="likes-count">{count}</a>
        </button>
      </div>
      <EmailShareButton url={imageUrl}>
        <EmailIcon size={42} round={true} style={{ margin: "5px" }} />
      </EmailShareButton>
      <FacebookShareButton url={imageUrl}>
        <FacebookIcon size={42} round={true} style={{ margin: "5px" }} />
      </FacebookShareButton>
      <LinkedinShareButton url={imageUrl}>
        <LinkedinIcon size={42} round={true} style={{ margin: "5px" }} />
      </LinkedinShareButton>
      <RedditShareButton url={imageUrl}>
        <RedditIcon size={42} round={true} style={{ margin: "5px" }} />
      </RedditShareButton>
      <TwitterShareButton url={imageUrl}>
        <XIcon size={42} round={true} style={{ margin: "5px" }} />
      </TwitterShareButton>
      <WhatsappShareButton url={imageUrl}>
        <WhatsappIcon size={42} round={true} style={{ margin: "5px" }} />
      </WhatsappShareButton>
    </div>
  );
};

export default PostCard;
