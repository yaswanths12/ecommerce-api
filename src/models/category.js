// src/models/category.js
const { DataTypes } = require('sequelize') // Import DataTypes
const sequelize = require('../config/database') // Import sequelize instance
const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: DataTypes.TEXT,
})
module.exports = Category
