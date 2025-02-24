// src/middleware/auth.js
const jwt = require('jsonwebtoken')
const { User } = require('../models')
console.log('Auth middleware is running')
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(decoded.id)
    console.log('Request Headers:', req.headers)
    console.log('Token received:', token)
    if (!user) {
      throw new Error()
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' })
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' })
  }
  next()
}
module.exports = { auth, isAdmin }
