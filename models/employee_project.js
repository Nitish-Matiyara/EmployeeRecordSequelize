const { Sequelize, DataTypes } = require("sequelize");

const db = require("../connections/db");

const EmployeeRecord = db.EmployeeRecord;
const Project = db.Project;
const sequelize = db.sequelize;

const Employee_project = sequelize.define("Employee_project", {
  EmployeeRecordId: {
    type: DataTypes.INTEGER,
    references: {
      model: EmployeeRecord,
      key: "id",
    },
  },
  ProjectId: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: "id",
    },
  },
});

module.exports = Employee_project;
