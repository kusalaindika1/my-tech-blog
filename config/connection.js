const Sequelize = require("sequelize");
require("dotenv").config();

// IF we have a HEROKU connection
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // IF we have a local connection
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3310,
    }
  );
}

module.exports = sequelize;
