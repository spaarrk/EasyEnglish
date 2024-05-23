const { TestType } = require('../models/models');
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');
class TestTypeController {
  async create(req, res, next) {
    try {
      const { label } = req.body;
      const item = await TestType.create({ label });
      return res.json(item);
    } catch (e) {
      next(e.message);
    }
  }
  async getAll(req, res) {
    const items = await TestType.findAll();
    return res.json(items);
  }
  async getOne(req, res) {}
}

module.exports = new TestTypeController();
