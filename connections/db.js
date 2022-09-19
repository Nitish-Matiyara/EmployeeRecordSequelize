const config = require("./config.js");
const Sequelize = require("sequelize");
const mysql = require("mysql2")

module.exports = db = {};

// create db if it doesn't already exist
const { host, port, user, password, database } = config.database;

const pool = mysql.createPool({ host, port, user, password });

pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

// connect to db
const sequelize = new Sequelize(database, user, password, {
  dialect: "mysql",
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

db.sequelize = sequelize;

db.Employee = require("../models/employee")

sequelize.sync()
