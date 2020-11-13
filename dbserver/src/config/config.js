require("dotenv").config();
module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "supply_chain",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: "0",
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
