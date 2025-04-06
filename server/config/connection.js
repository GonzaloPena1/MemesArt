require("dotenv").config();
const { Sequelize } = require("sequelize");
const dns = require("dns");
const { log } = console;

const isProduction = process.env.NODE_ENV === "production";

// DNS cache to prevent repeated lookups
const dnsCache = new Map();

const resolveWithCache = async (hostname) => {
  if (dnsCache.has(hostname)) {
    return dnsCache.get(hostname);
  }
  const address = await dns.promises.lookup(hostname);
  dnsCache.set(hostname, address.address);
  return address.address;
};

const getDbConfig = async () => {
  if (isProduction) {
    const dbUrl = process.env.DATABASE_URL?.trim();
    if (!dbUrl) {
      log("❌ DATABASE_URL is missing");
      process.exit(1);
    }

    try {
      const parsed = new URL(dbUrl);
      const hostname = parsed.hostname;
      const ipAddress = await resolveWithCache(hostname);

      return {
        database: parsed.pathname.slice(1),
        username: parsed.username,
        password: parsed.password,
        host: ipAddress, // Use resolved IP address
        port: parsed.port || 5432,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
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
    logging: console.log,
  };
};

// Async initialization
const initSequelize = async () => {
  try {
    const config = await getDbConfig();
    const sequelize = new Sequelize(config);

    await sequelize.authenticate();
    log("✅ Database connected successfully");

    // Test query
    const [result] = await sequelize.query("SELECT 1+1 AS result");
    log("🔢 Database test query result:", result[0].result);

    return sequelize;
  } catch (err) {
    log("❌ Database connection failed:");
    log("Error:", err.message);
    log("Stack:", err.stack);
    process.exit(1);
  }
};

module.exports = initSequelize();
