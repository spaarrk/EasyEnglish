const { sTopics } = require('../models/models');
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');
class STopicController {
  async create(req, res, next) {
    try {
      const { content } = req.body;
      const item = await sTopics.create({ content });
      return res.json(item);
    } catch (e) {
      next(e.message);
    }
  }
  async getAll(req, res) {
    const items = await sTopics.findAll();
    return res.json(items.map((oneItem) => ({ id: oneItem.id, label: oneItem.content })));
  }
  async getOne(req, res) {
  }
}

module.exports = new STopicController();
