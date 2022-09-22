const { Sequelize, DataTypes } = require("sequelize");

const db = require("../connections/db");

const sequelize = db.sequelize;

const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Company;
