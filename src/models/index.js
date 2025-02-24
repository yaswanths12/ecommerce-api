const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/database') // Import your database connection

const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Cart = require('./cart')
const Order = require('./order')

// Define associations
Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'CASCADE' })
Product.belongsTo(Category, { foreignKey: 'categoryId' })

User.hasMany(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' })
Cart.belongsTo(User, { foreignKey: 'userId' })
Cart.belongsTo(Product, { foreignKey: 'productId' })

User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' })
Order.belongsTo(User, { foreignKey: 'userId' })

// Many-to-Many relationship between Order and Product
const OrderProduct = sequelize.define('OrderProduct', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priceAtPurchase: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
})

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId' })
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' })

// Sync database models
sequelize
  .sync({ alter: true })
  .then(() => console.log('Database synced successfully.'))
  .catch((err) => console.error('Error syncing database:', err))

module.exports = {
  sequelize, // Export sequelize instance
  User,
  Product,
  Category,
  Cart,
  Order,
  OrderProduct,
}
