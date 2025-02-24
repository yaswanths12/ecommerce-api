// src/controllers/authController.js
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const authController = {
  async register(req, res) {
    try {
      const { email, password, role = 'customer' } = req.body

      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' })
      }

      const user = await User.create({ email, password, role })
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      })

      res.status(201).json({
        message: 'User registered successfully',
        user: { id: user.id, email: user.email, role: user.role },
        token,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
      })
      res.json({
        message: 'Login successful',
        user: { id: user.id, email: user.email, role: user.role },
        token,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}
module.exports = authController
