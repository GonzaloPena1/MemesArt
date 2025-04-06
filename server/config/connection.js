require("dotenv").config();
const { Sequelize } = require("sequelize");
const { log } = console;

const isProduction = process.env.NODE_ENV === "production";

const dbConfig = isProduction
  ? {
      connectionString: process.env.DATABASE_URL,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    }
  : {
      database: process.env.DB_NAME || "memes_db",
      username: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      host: process.env.DB_HOST || "localhost",
      dialect: "mysql",
      port: process.env.DB_PORT || 3306,
      logging: console.log,
    };

// Create connection
const sequelize = new Sequelize(dbConfig);

// Test connection
sequelize
  .authenticate()
  .then(() => log("✅ Database connected successfully"))
  .catch((err) => {
    log("❌ Database connection error:");
    log(err.message);
    if (isProduction) {
      log(
        "ℹ️ Production DB URL:",
        process.env.DATABASE_URL ? "exists" : "missing"
      );
      log("ℹ️ Connection Config:", JSON.stringify(dbConfig, null, 2));
    }
    process.exit(1); // Exit with error code
  });

module.exports = sequelize;
