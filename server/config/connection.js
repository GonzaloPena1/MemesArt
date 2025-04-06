require("dotenv").config();
const { Sequelize } = require("sequelize");
const { log } = console;
const dns = require("dns");

const isProduction = process.env.NODE_ENV === "production";

const resolveHost = async (hostname) => {
  try {
    const addresses = await dns.promises.resolve(hostname);
    return addresses[0]; // Return first IP address
  } catch (err) {
    log(`❌ DNS resolution failed for ${hostname}:`, err.message);
    return hostname; // Fallback to original hostname
  }
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
      const port = parsed.port || 5432;

      // Resolve hostname to IP address
      const host = await resolveHost(hostname);

      return {
        database: parsed.pathname.slice(1),
        username: parsed.username,
        password: parsed.password,
        host: host,
        port: port,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        retry: {
          max: 5,
          timeout: 30000,
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
  };
};

// Create and export the Sequelize instance
module.exports = (async () => {
  try {
    const config = await getDbConfig();
    const sequelize = new Sequelize(config);

    await sequelize.authenticate();
    log("✅ Database connected successfully");
    return sequelize;
  } catch (err) {
    log("❌ Database connection failed:");
    log(err.message);
    process.exit(1);
  }
})();
