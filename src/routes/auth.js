// src/routes/auth.js
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, customer]
 *     responses:
 *       201:
 *         description: User registered successfully
 */
const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const authController = require('../controllers/authController')
const validate = require('../middleware/validate')
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('role').optional().isIn(['admin', 'customer']),
    validate,
  ],
  authController.register
)

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists(),
    validate,
  ],
  authController.login
)
module.exports = router
