const { Grammar, Rule } = require("../models/models");
const ApiError = require("../error/ApiError");
class RuleController {
  async create(req, res) {
    let { topic, content, grammarId } = req.body;
    console.log(grammarId);
    const rule = await Rule.create({ topic, content, grammarId });
    return res.json({ rule });
  }
  async getAll(req, res) {
    const rules = await Rule.findAll();
    return res.json(rules);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const rule = await Rule.findOne({ where: { id } });
    return res.json(rule);
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Rule.destroy({ where: { id } });
      return res.json("deleted");
    } catch (e) {
      next(e.message);
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const rule = await Rule.findOne({ where: { id } });
      if (rule) {
        await rule.update(req.body);
        return res.json(rule);
      }
      return res.json("rule not exists");
    } catch (e) {
      next(e.message);
    }
  }
}

module.exports = new RuleController();
