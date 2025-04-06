require("dotenv").config();
const { Sequelize } = require("sequelize");
const { log } = console;

const isProduction = process.env.NODE_ENV === "production";

const getDbConfig = () => {
  if (isProduction) {
    const dbUrl = process.env.DATABASE_URL?.trim();
    if (!dbUrl) {
      log("❌ DATABASE_URL is missing");
      process.exit(1);
    }

    try {
      const parsed = new URL(dbUrl);
      return {
        database: parsed.pathname.slice(1),
        username: parsed.username,
        password: parsed.password,
        host: parsed.hostname,
        port: parsed.port || 5432,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      };
    } catch (err) {
      log("❌ Error parsing DATABASE_URL:", err.message);
      process.exit(1);
    }
  }

  return {
    database: process.env.DB_NAME || "memes_db",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
  };
};

// Create and export the Sequelize instance directly
const sequelize = new Sequelize(getDbConfig());

// Test connection
sequelize
  .authenticate()
  .then(() => log("✅ Database connected successfully"))
  .catch((err) => {
    log("❌ Database connection failed:");
    log(err.message);
    process.exit(1);
  });

module.exports = sequelize;
