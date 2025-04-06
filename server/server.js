// Import required packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// Initialize Express application
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for any paths from the client
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

// Import routes after initializing sequelize
let routes, userRoutes;
const initializeRoutes = async () => {
  routes = require("./routes");
  userRoutes = require("./routes/user");

  app.use("/user", userRoutes);
  app.use(routes);
};

// Database and Server Initialization
const startServer = async () => {
  try {
    // Import sequelize after modifications
    const sequelize = require("./config/connection");

    // Test connection immediately
    await sequelize.authenticate();
    console.log("✅ Database connection established");

    // Perform test query
    const [testResult] = await sequelize.query("SELECT 1+1 AS result");
    console.log("🔢 Database test query result:", testResult[0].result);

    // Initialize routes after successful connection
    await initializeRoutes();

    // Health Check Endpoint
    app.get("/health", async (req, res) => {
      try {
        await sequelize.authenticate();
        const [result] = await sequelize.query("SELECT 1");
        res.status(200).json({
          status: "healthy",
          database: "connected",
          uptime: process.uptime(),
          timestamp: new Date(),
        });
      } catch (err) {
        res.status(500).json({
          status: "unhealthy",
          error: err.message,
          database: "disconnected",
          timestamp: new Date(),
        });
      }
    });

    // Sync database and start server
    await sequelize.sync({ force: rebuild });
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:");
    console.error(err.message);
    console.error("Stack trace:", err.stack);

    // Enhanced error reporting for production
    if (process.env.NODE_ENV === "production") {
      console.log("ℹ️ Production Environment Variables:");
      console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
      console.log(
        `- DATABASE_URL: ${process.env.DATABASE_URL ? "exists" : "missing"}`
      );
      console.log(`- PORT: ${process.env.PORT}`);
    }

    process.exit(1);
  }
};

// Start the server
startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("⚠️ Unhandled Rejection:", err.message);
  // Optionally exit the process
  // process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("⚠️ Uncaught Exception:", err.message);
  process.exit(1);
});
