// src/models/order.js
const { DataTypes } = require('sequelize') // Import DataTypes
const sequelize = require('../config/database') // Import sequelize instance
const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
})
module.exports = Order
