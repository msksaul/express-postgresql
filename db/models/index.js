const { User, UserSchema }  = require('./user.model')
const { Customer, CustomerSchema } = require('../models/customer.model')
const { Category, CategorySchema } = require('../models/category.model')
const { Product, ProductSchema } = require('../models/product.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Customer.init(CustomerSchema, Customer.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize))
  Product.init(ProductSchema, Product.config(sequelize))

  User.associate(sequelize.models)
  Customer.associate(sequelize.models)
  Category. associate(sequelize.models)
  Product. associate(sequelize.models)
}

module.exports = setupModels