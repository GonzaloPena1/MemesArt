require("dotenv").config();
const { Sequelize } = require("sequelize");
const { log } = console;

const isProduction = process.env.NODE_ENV === "production";

// Parse database URL if in production
const parseDbUrl = (url) => {
  try {
    const parsed = new URL(url);
    return {
      database: parsed.pathname.slice(1),
      username: parsed.username,
      password: parsed.password,
      host: parsed.hostname,
      port: parsed.port,
    };
  } catch (err) {
    log("⚠️ Error parsing DATABASE_URL:", err.message);
    return null;
  }
};

const getDbConfig = () => {
  if (isProduction) {
    const parsed = parseDbUrl(process.env.DATABASE_URL?.trim());
    if (!parsed) process.exit(1);

    return {
      database: parsed.database,
      username: parsed.username,
      password: parsed.password,
      host: parsed.host,
      port: parsed.port,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: (msg) => log(msg),
      retry: {
        max: 5,
        timeout: 60000,
        match: [
          /ConnectionError/,
          /SequelizeConnectionError/,
          /ECONNREFUSED/,
          /ETIMEDOUT/,
        ],
      },
    };
  }

  return {
    database: process.env.DB_NAME || "memes_db",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: console.log,
  };
};

const sequelize = new Sequelize(getDbConfig());

// Enhanced connection test
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    log("✅ Database connected successfully");

    // Verify database is reachable
    const [result] = await sequelize.query("SELECT 1+1 AS result");
    log("🔢 Database test query result:", result[0].result);

    return true;
  } catch (err) {
    log("❌ Database connection failed:");
    log("Error:", err.message);
    log("Connection Config:", JSON.stringify(getDbConfig(), null, 2));

    if (isProduction) {
      log("ℹ️ Checking database URL format...");
      const parsed = parseDbUrl(process.env.DATABASE_URL?.trim());
      log("Parsed URL:", parsed);
    }

    process.exit(1);
  }
};

testConnection();

module.exports = sequelize;
