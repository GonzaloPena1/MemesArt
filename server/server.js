const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const sequelize = require("./config/connection");

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3001;
const rebuild = process.argv[2] === "--rebuild";

// Serve static files
app.use(express.static(path.join(__dirname, "../client/public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Import routes
const routes = require("./routes");
const userRoutes = require("./routes/user");
app.use("/user", userRoutes);
app.use(routes);

// Health Check Endpoint
app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    const [result] = await sequelize.query("SELECT 1");
    res.status(200).json({
      status: "healthy",
      database: "connected",
    });
  } catch (err) {
    res.status(500).json({
      status: "unhealthy",
      error: err.message,
      database: "disconnected",
    });
  }
});

// Sync database and start server
sequelize
  .sync({ force: rebuild })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to sync database:", err.message);
    process.exit(1);
  });

// Error handlers
process.on("unhandledRejection", (err) => {
  console.error("⚠️ Unhandled Rejection:", err.message);
});

process.on("uncaughtException", (err) => {
  console.error("⚠️ Uncaught Exception:", err.message);
  process.exit(1);
});
