const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
});

module.exports = User;
