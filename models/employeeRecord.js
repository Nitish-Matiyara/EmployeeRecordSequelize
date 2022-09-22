const { Sequelize, DataTypes } = require("sequelize");

const db = require("../connections/db");
const sequelize = db.sequelize;

const EmployeeRecord = sequelize.define("EmployeeRecord", {
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

module.exports = EmployeeRecord;
