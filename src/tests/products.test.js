// src/tests/products.test.js
describe('Product Management Tests', () => {
  let adminToken
  let testCategoryId

  beforeAll(async () => {
    // Create admin user and get token
    const adminResponse = await request(app).post('/api/auth/register').send({
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    })
    adminToken = adminResponse.body.token

    // Create test category
    const categoryResponse = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Test Category',
        description: 'Test Description',
      })
    testCategoryId = categoryResponse.body.id
  })

  test('Should create a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .field('name', 'Test Product')
      .field('price', '99.99')
      .field('stock', '10')
      .field('categoryId', testCategoryId)
      .attach('image', 'src/tests/testImage.jpg')

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('name', 'Test Product')
    expect(response.body).toHaveProperty('imageUrl')
  })
})
