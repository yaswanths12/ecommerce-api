const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Category = require('./category') // Import Category model

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  imageUrl: DataTypes.STRING,
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category, // Reference Category table
      key: 'id',
    },
    onDelete: 'CASCADE', // If category is deleted, delete associated products
  },
})

module.exports = Product
