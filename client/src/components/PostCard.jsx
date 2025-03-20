import React, { useState, useEffect, useRef } from "react";
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
import {
  FaShareAlt,
  FaEdit,
  FaTrash,
  FaHeart,
  FaRegHeart,
  FaSave,
} from "react-icons/fa";

const PostCard = ({ post, onDelete, onUpdate, loggedInUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.likedBy.includes(loggedInUser));
  const [showShare, setShowShare] = useState(false);
  const shareRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShowShare(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleLike = async () => {
    try {
      const response = await api.post(`/api/posts/${post.id}/like`);
      setLikes(response.data.likes);
      setIsLiked(response.data.likedBy.includes(loggedInUser));
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

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
            onBlur={handleUpdate}
            autoFocus
            className="edit-input"
          />
        ) : (
          <span onClick={() => setIsEditing(true)} className="editable-title">
            {post.title}
          </span>
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
              <FaSave className="icon" title="Save" onClick={handleUpdate} />
            ) : (
              <FaEdit
                className="icon"
                title="Edit"
                onClick={() => setIsEditing(true)}
              />
            )}
            <FaTrash
              className="icon delete-icon"
              title="Delete"
              onClick={handleDelete}
            />
          </>
        )}
        <div className="likes-container">
          {isLiked ? (
            <FaHeart
              className="icon liked"
              title="Unlike"
              onClick={handleLike}
            />
          ) : (
            <FaRegHeart className="icon" title="Like" onClick={handleLike} />
          )}
          <span className="likes-count">{likes}</span>
        </div>

        {/* ✅ Clickable Share Icon */}
        <div className="share-container" ref={shareRef}>
          <FaShareAlt
            className="icon"
            title="Share"
            onClick={() => setShowShare(!showShare)}
          />
          {showShare && (
            <div className="share-popup">
              <EmailShareButton url={imageUrl}>
                <EmailIcon size={32} round />
              </EmailShareButton>
              <FacebookShareButton url={imageUrl}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <LinkedinShareButton url={imageUrl}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
              <RedditShareButton url={imageUrl}>
                <RedditIcon size={32} round />
              </RedditShareButton>
              <TwitterShareButton url={imageUrl}>
                <XIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={imageUrl}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
