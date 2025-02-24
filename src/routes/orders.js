// src/routes/orders.js
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management APIs
 *
 * /api/orders/place-order:
 *   post:
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     summary: Place an order from the user's cart
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Cart is empty or invalid request
 *       500:
 *         description: Internal server error
 *
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     summary: List user orders (Admin can view all orders)
 *     responses:
 *       200:
 *         description: List of orders retrieved successfully
 *       500:
 *         description: Internal server error
 */

const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const { auth } = require('../middleware/auth')

router.post('/place-order', auth, orderController.placeOrder)
router.get('/', auth, orderController.listOrders)

module.exports = router
