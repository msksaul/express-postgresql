const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize')

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newcategory = await models.Category.create(data)
    return newcategory;
  }

  async find() {
    const categories = await models.Category.findAll()
    return categories
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    })
    return category
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
