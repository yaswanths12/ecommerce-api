// src/routes/products.js
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 *
 * /api/products:
 *   post:
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     tags: [Products]
 *     summary: Get all products with filters
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by product name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *       500:
 *         description: Internal server error
 *
 * /api/products/{id}:
 *   put:
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     summary: Update a product (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a product (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

const express = require('express')
const { body } = require('express-validator')

const router = express.Router()
const productController = require('../controllers/productController')
// const { upload } = require('../middleware/upload')
const upload = require('../middleware/upload')
const validate = require('../middleware/validate')
const { auth, isAdmin } = require('../middleware/auth')

router.post(
  '/',
  auth,
  isAdmin,
  upload.single('image'),
  [
    body('name').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('stock').isInt({ min: 0 }),
    validate,
  ],
  productController.create
)

router.get('/', productController.list)
router.put(
  '/:id',
  auth,
  isAdmin,
  upload.single('image'),
  productController.update
)
router.delete('/:id', auth, isAdmin, productController.delete)
module.exports = router
