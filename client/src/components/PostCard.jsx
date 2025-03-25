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

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [showReplyInputs, setShowReplyInputs] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplies, setShowReplies] = useState({});

  const checkIfUserReplied = (reply, username) => {
    if (!reply.replies) return false;
    return reply.replies.some((r) => r.username === username);
  };

  const toggleReplies = (id) => {
    setShowReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    try {
      const parsedComments = JSON.parse(post.comments || "[]");
      setComments(parsedComments);
    } catch (error) {
      console.error("Error parsing comments:", error);
      setComments([]);
    }
  }, [post.comments]);

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

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await api.post(`/api/posts/${post.id}/comments`, {
        text: newComment,
        username: loggedInUser,
      });
      setComments(response.data.comments);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  const handleAddReply = async (commentId, replyText, targetReplyId = null) => {
    if (!replyText.trim() || !loggedInUser) return;

    try {
      const response = await api.post(
        `/api/posts/${post.id}/comments/${commentId}/replies`,
        {
          text: replyText,
          username: loggedInUser,
          targetReplyId: targetReplyId,
        }
      );

      setComments(response.data.comments);
      setReplyInputs((prev) => ({ ...prev, [targetReplyId || commentId]: "" }));
      setShowReplyInputs((prev) => ({
        ...prev,
        [targetReplyId || commentId]: false,
      }));
    } catch (error) {
      console.error("Failed to add reply", error);
    }
  };

  const handleReplyInputChange = (id, value) => {
    setReplyInputs((prev) => ({ ...prev, [id]: value }));
  };

  const toggleReplyInput = (id) => {
    setShowReplyInputs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    setIsExpanded(!isExpanded);
  };

  const closeExpandedView = () => {
    setIsExpanded(false);
    setShowComments(false);
  };

  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `http://localhost:3001${post.image}`;

  return (
    <div className={`card ${isExpanded ? "expanded" : ""}`}>
      {isExpanded && (
        <button className="close-button" onClick={closeExpandedView}>
          ×
        </button>
      )}
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
      <div className="image-container">
        <img src={imageUrl} alt={post.title} className="card-image" />
      </div>
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

        {/* <button className="button" onClick={handleLike}>
          {isLiked ? "Unlike" : "Like"}
          <a className="likes-count">{likes}</a>
        </button> */}
        <button className="button" onClick={toggleComments}>
          Comments
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <h3>Comments</h3>
          <div>
            {comments.slice(0, 5).map((comment, index) => (
              <div key={index} className="comment">
                <div>
                  <strong>{comment.username || "Guest"}</strong>: {comment.text}
                </div>
                {loggedInUser && comment.username !== loggedInUser && (
                  <div>
                    <a
                      onClick={() => toggleReplyInput(comment.id)}
                      className="reply-link"
                    >
                      Reply
                    </a>
                  </div>
                )}

                {comment.replies && comment.replies.length > 0 && (
                  <div>
                    <a
                      onClick={() => toggleReplies(comment.id)}
                      className="see-replies-link"
                    >
                      <span className="underscore">__</span> View replies (
                      {comment.replies.length})
                    </a>
                  </div>
                )}

                {showReplies[comment.id] &&
                  comment.replies?.map((reply, idx) => {
                    const canReply =
                      loggedInUser &&
                      reply.username !== loggedInUser &&
                      !checkIfUserReplied(reply, loggedInUser);

                    return (
                      <div key={idx} className="reply">
                        <div>
                          <strong>{reply.username || "Guest"}</strong>:{" "}
                          {reply.text}
                        </div>
                        {canReply && (
                          <div>
                            <a
                              onClick={() => toggleReplyInput(reply.id)}
                              className="reply-link"
                            >
                              Reply
                            </a>
                          </div>
                        )}

                        {canReply && showReplyInputs[reply.id] && (
                          <div className="reply-input">
                            <input
                              type="text"
                              placeholder="Reply to this..."
                              value={replyInputs[reply.id] || ""}
                              onChange={(e) =>
                                handleReplyInputChange(reply.id, e.target.value)
                              }
                            />
                            <button
                              onClick={() =>
                                handleAddReply(
                                  comment.id,
                                  replyInputs[reply.id],
                                  reply.id
                                )
                              }
                              disabled={!replyInputs[reply.id]?.trim()}
                            >
                              Reply
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                {loggedInUser &&
                  comment.username !== loggedInUser &&
                  showReplyInputs[comment.id] && (
                    <div className="reply-input">
                      <input
                        type="text"
                        placeholder="Add a reply..."
                        value={replyInputs[comment.id] || ""}
                        onChange={(e) =>
                          handleReplyInputChange(comment.id, e.target.value)
                        }
                      />
                      <button
                        onClick={() =>
                          handleAddReply(comment.id, replyInputs[comment.id])
                        }
                        disabled={!replyInputs[comment.id]?.trim()}
                      >
                        Reply
                      </button>
                    </div>
                  )}
              </div>
            ))}
          </div>

          <div className="comment-input">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddComment();
                }
              }}
            />
            <button onClick={handleAddComment} disabled={!newComment.trim()}>
              Post
            </button>
          </div>
        </div>
      )}

      <div className="likes-container">
        {isLiked ? (
          <FaHeart className="icon liked" title="Unlike" onClick={handleLike} />
        ) : (
          <FaRegHeart className="icon" title="Like" onClick={handleLike} />
        )}
        <span className="likes-count">{likes}</span>
      </div>
      {/* 
         Clickable Share Icon */}
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
  );
};

export default PostCard;
