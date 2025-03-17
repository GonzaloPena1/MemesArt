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

// export the router
module.exports = app;
