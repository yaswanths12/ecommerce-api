// src/models/user.js
const { DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
const sequelize = require('../config/database')

const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'customer'),
      defaultValue: 'customer',
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10)
      },
    },
  }
)
module.exports = User
