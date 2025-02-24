// src/controllers/orderController.js
const { Order, OrderProduct, Cart, Product } = require('../models')
const sequelize = require('../config/database')

const orderController = {
  async placeOrder(req, res) {
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
            priceAtPurchase: item.priceAtAdd, // Persistent price
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

  async listOrders(req, res) {
    try {
      const where = req.user.role === 'admin' ? {} : { userId: req.user.id }

      const orders = await Order.findAll({
        where,
        include: [
          {
            model: Product,
            through: {
              attributes: ['quantity', 'priceAtPurchase'],
            },
          },
        ],
        order: [['createdAt', 'DESC']],
      })

      res.json(orders)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = orderController
