/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new category (Admin only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     summary: Update a category (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a category (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */

const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const { auth, isAdmin } = require('../middleware/auth')

// Create a new category (Admin only)
router.post('/', auth, isAdmin, categoryController.create)

// Get all categories
router.get('/', categoryController.list)

// Update a category (Admin only)
router.put('/:id', auth, isAdmin, categoryController.update)

// Delete a category (Admin only)
router.delete('/:id', auth, isAdmin, categoryController.delete)

module.exports = router
