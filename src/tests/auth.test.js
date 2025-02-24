// src/tests/auth.test.js
const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const sequelize = require('../config/database')

beforeAll(async () => {
  await sequelize.sync({ force: true })
})

describe('Authentication Tests', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} })
  })

  test('Should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('token')
    expect(response.body.user).toHaveProperty('email', 'test@example.com')
  })

  test('Should login existing user', async () => {
    // First create a user
    await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
    })

    // Then try to login
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })
})
