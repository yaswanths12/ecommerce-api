// src/controllers/productController.js
const { Product, Category } = require('../models')
const { Op } = require('sequelize')
const cloudinary = require('../config/cloudinary')

const productController = {
  async create(req, res) {
    try {
      const { name, description, price, stock, categoryId } = req.body
      let imageUrl = ''

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path)
        imageUrl = result.secure_url
      }

      const product = await Product.create({
        name,
        description,
        price,
        stock,
        categoryId,
        imageUrl,
      })

      res.status(201).json(product)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const { name, description, price, stock, categoryId } = req.body

      const product = await Product.findByPk(id)
      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path)
        product.imageUrl = result.secure_url
      }

      await product.update({
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
        stock: stock || product.stock,
        categoryId: categoryId || product.categoryId,
      })

      res.json(product)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params
      const product = await Product.findByPk(id)

      if (!product) {
        return res.status(404).json({ error: 'Product not found' })
      }

      await product.destroy()
      res.json({ message: 'Product deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async list(req, res) {
    try {
      const {
        minPrice,
        maxPrice,
        categoryId,
        search,
        page = 1,
        limit = 10,
      } = req.query

      const where = {}

      if (minPrice || maxPrice) {
        where.price = {}
        if (minPrice) where.price[Op.gte] = parseFloat(minPrice)
        if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice)
      }

      if (categoryId) where.categoryId = categoryId
      if (search) where.name = { [Op.iLike]: `%${search}%` }

      const products = await Product.findAndCountAll({
        where,
        include: [{ model: Category, attributes: ['name'] }],
        limit: parseInt(limit),
        offset: (page - 1) * parseInt(limit),
        order: [['createdAt', 'DESC']],
      })

      res.json({
        products: products.rows,
        total: products.count,
        totalPages: Math.ceil(products.count / limit),
        currentPage: parseInt(page),
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = productController
