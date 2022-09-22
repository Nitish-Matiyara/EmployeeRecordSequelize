const {Sequelize, DataTypes} = require("sequelize")
const db = require("../connections/db")

const sequelize = db.sequelize

const Setting = sequelize.define("Setting", {
    theme : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    autoLogin : {
        type : DataTypes.BOOLEAN,
        allowNull : false
    }
})

module.exports = Setting;