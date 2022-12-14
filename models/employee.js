const { Sequelize, DataTypes } = require("sequelize");

const db = require("../connections/db");
const sequelize = db.sequelize;

const Employee = sequelize.define("Employee", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Employee;
