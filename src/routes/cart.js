// // src/routes/cart.js
// /**
//  * @swagger
//  * /api/cart:
//  *   get:
//  *     tags: [Cart]
//  *     security:
//  *       - bearerAuth: []
//  *     summary: View user's cart
//  */
// const express = require('express')
// const router = express.Router()
// // const { cartController } = require('../controllers/cartController')
// const cartController = require('../controllers/cartController')

// const { auth, isAdmin } = require('../middleware/auth')

// router.post('/add', auth, cartController.addToCart)
// router.get('/', auth, cartController.viewCart)
// router.delete('/:id', auth, cartController.removeFromCart)
// router.post('/checkout', auth, cartController.checkout)

// module.exports = router
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: User shopping cart management
 */
const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')
const { auth } = require('../middleware/auth')

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     summary: Add an item to the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/add', auth, cartController.addToCart)

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     summary: View user's cart
 *     responses:
 *       200:
 *         description: Returns the cart details
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, cartController.viewCart)

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     summary: Remove an item from the cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart item ID
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       404:
 *         description: Item not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', auth, cartController.removeFromCart)

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     summary: Checkout the cart
 *     responses:
 *       200:
 *         description: Checkout successful
 *       400:
 *         description: Checkout failed due to invalid input or stock issues
 *       401:
 *         description: Unauthorized
 */
router.post('/checkout', auth, cartController.checkout)

module.exports = router
