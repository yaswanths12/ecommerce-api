// src/models/cart.js
const { DataTypes } = require('sequelize') // Import DataTypes
const sequelize = require('../config/database') // Import sequelize instance
const Cart = sequelize.define('Cart', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 1,
    },
  },
  priceAtAdd: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
})
module.exports = Cart
