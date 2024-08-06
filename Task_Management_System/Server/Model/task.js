const { DataTypes } = require('sequelize');
const sequelize = require("../config/db");
const User = require('./User'); 

const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Todo', 'In Progress', 'Done'),
        defaultValue: 'Todo'
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Medium'
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: User,
            key: 'id'
        }
    },
    createdBy:{
        type:DataTypes.STRING,
        allowNull:true
    }
});


Task.beforeUpdate((task, options) => {
    task.updatedAt = new Date();
});

module.exports = Task;
