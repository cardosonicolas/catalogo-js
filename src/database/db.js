const { Sequelize } = require("sequelize");
const database = require("../config/dbConfig");
const dbURL = process.env.DATABASE_URL;

const sequelize = dbURL
  ? new Sequelize(dbURL)
  : new Sequelize(database.database, database.usermane, database.password, {
      dialect: "sqlite",
      storage: "./src/database/db.sqlite",
    });

module.exports = sequelize;
