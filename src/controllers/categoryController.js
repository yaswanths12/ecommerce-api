// src/controllers/categoryController.js
const { Category } = require('../models')

const categoryController = {
  async create(req, res) {
    try {
      const { name, description } = req.body
      const category = await Category.create({ name, description })
      res.status(201).json(category)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async list(req, res) {
    try {
      const categories = await Category.findAll()
      res.json(categories)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const { name, description } = req.body

      const category = await Category.findByPk(id)
      if (!category) {
        return res.status(404).json({ error: 'Category not found' })
      }

      await category.update({ name, description })
      res.json(category)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params
      const category = await Category.findByPk(id)

      if (!category) {
        return res.status(404).json({ error: 'Category not found' })
      }

      await category.destroy()
      res.json({ message: 'Category deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = categoryController
