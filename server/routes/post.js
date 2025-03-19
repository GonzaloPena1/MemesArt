const app = require("express").Router();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

app.use(cors());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// import the models
const { Post } = require("../models/index");

// import AuthMiddleware
const { authMiddleware } = require("../utils/auth");

app.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { title, postedBy } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image) {
      console.error("Image upload failed: No file uploaded");
      return res.status(400).json({ error: "Image is required" });
    }

    console.log("Creating post with:", { title, postedBy, image });
    const post = await Post.create({ title, postedBy, image });

    console.log("Post created successfully:", post);
    res.status(201).json(post);
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ error: "Error adding post" });
  }
});

// Route to get all posts
app.get("/", authMiddleware, async (_, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving post", error: error });
  }
});

// Route to get a single post by ID
app.get("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving post" });
  }
});

// Route to update a post
app.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;
    await Post.update({ title }, { where: { id: req.params.id } });
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
});

// Route to delete a post
app.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.id } });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
});
//Route to like and unlike a post
app.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const userId = req.user.id;

    let likedBy = [];
    try {
      likedBy = JSON.parse(post.likedBy || "[]");
    } catch (error) {
      console.error("Error parsing likedBy:", error);
      likedBy = [];
    }

    const userIndex = likedBy.indexOf(userId);

    if (userIndex === -1) {
      post.likes += 1;
      likedBy.push(userId);
    } else {
      post.likes = Math.max(post.likes - 1, 0);
      likedBy.splice(userIndex, 1);
    }

    post.likedBy = JSON.stringify(likedBy);

    await post.save();

    console.log("Updated post:", post.toJSON());

    res.json({ likes: post.likes, likedBy: likedBy });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Error toggling like" });
  }
});
// export the router
module.exports = app;
