const { Sequelize, DataTypes } = require("sequelize");

const db = require("../connections/db");

const sequelize = db.sequelize;

const Project = sequelize.define("Project", {
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

module.exports = Project;
