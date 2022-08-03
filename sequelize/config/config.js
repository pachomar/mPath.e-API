const path = require('path');
const dotenv = require("dotenv").config({ path: path.resolve("../../", ".env")});

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "port": process.env.DB_PORT,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME_TEST,
    "port": process.env.DB_PORT,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME_PROD,
    "port": process.env.DB_PORT,
    "host": process.env.DB_HOST,
    "dialect": "mysql"
  }
}
