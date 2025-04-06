require("dotenv").config();
const Sequelize = require("sequelize");

// For local development (MySQL)
if (process.env.NODE_ENV === "development") {
  if (process.env.DB_PASSWORD === "ChangeMe!") {
    console.error("Please update the .env file with your database password.");
    process.exit(1);
  }

  var sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: process.env.DB_PORT || 3306,
      logging: console.log,
    }
  );
}
// For production (PostgreSQL on Render)
else {
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
}

module.exports = sequelize;
