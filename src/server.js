// src/server.js
require('dotenv').config()
const app = require('./app')
const sequelize = require('./config/database')

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await sequelize.authenticate()
    console.log('Database connected successfully')

    //Sync database models
    await sequelize.sync({ alter: true })
    console.log('Database models synchronized')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(
        `Swagger documentation available at http://localhost:${PORT}/api-docs`
      )
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
