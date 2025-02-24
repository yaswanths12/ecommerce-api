// src/controllers/cartController.js
const { Cart, Product, Order, OrderProduct } = require('../models')
const sequelize = require('../config/database')

const cartController = {
  async addToCart(req, res) {
    const transaction = await sequelize.transaction()
    try {
      const { productId, quantity = 1 } = req.body
      const userId = req.user.id

      const product = await Product.findByPk(productId)
      if (!product) {
        await transaction.rollback()
        return res.status(404).json({ error: 'Product not found' })
      }

      if (product.stock < quantity) {
        await transaction.rollback()
        return res.status(400).json({ error: 'Insufficient stock' })
      }

      let cartItem = await Cart.findOne({
        where: { userId, productId },
        transaction,
      })

      if (cartItem) {
        cartItem.quantity += parseInt(quantity)
        await cartItem.save({ transaction })
      } else {
        cartItem = await Cart.create(
          {
            userId,
            productId,
            quantity,
            priceAtAdd: product.price,
          },
          { transaction }
        )
      }

      await transaction.commit()

      const cart = await Cart.findOne({
        where: { id: cartItem.id },
        include: [
          { model: Product, attributes: ['name', 'price', 'imageUrl'] },
        ],
      })

      res.json(cart)
    } catch (error) {
      await transaction.rollback()
      res.status(500).json({ error: error.message })
    }
  },

  async viewCart(req, res) {
    try {
      const cart = await Cart.findAll({
        where: { userId: req.user.id },
        include: [
          { model: Product, attributes: ['name', 'price', 'imageUrl'] },
        ],
      })

      const total = cart.reduce(
        (sum, item) => sum + item.priceAtAdd * item.quantity,
        0
      )

      res.json({ cart, total })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async removeFromCart(req, res) {
    try {
      const { id } = req.params
      const cartItem = await Cart.findOne({
        where: { id, userId: req.user.id },
      })

      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' })
      }

      await cartItem.destroy()
      res.json({ message: 'Item removed from cart' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async checkout(req, res) {
    const transaction = await sequelize.transaction()
    try {
      const cart = await Cart.findAll({
        where: { userId: req.user.id },
        include: [Product],
        transaction,
      })

      if (!cart.length) {
        await transaction.rollback()
        return res.status(400).json({ error: 'Cart is empty' })
      }

      const totalAmount = cart.reduce(
        (sum, item) => sum + item.priceAtAdd * item.quantity,
        0
      )

      const order = await Order.create(
        {
          userId: req.user.id,
          totalAmount,
          status: 'pending',
        },
        { transaction }
      )

      for (const item of cart) {
        await OrderProduct.create(
          {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtAdd,
          },
          { transaction }
        )

        await item.destroy({ transaction })
      }

      await transaction.commit()
      res.json({
        message: 'Order placed successfully',
        order,
      })
    } catch (error) {
      await transaction.rollback()
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = cartController
