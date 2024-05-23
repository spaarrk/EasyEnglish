const { Grammar, Rule } = require('../models/models');
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');
class GrammarController {
  async create(req, res) {
    let { topic } = req.body;
    const grammar = await Grammar.create({ topic });
    // if(rules){
    //     rules = JSON.parse(rules)
    //     rules.forEach(i => {
    //         Rule.create({
    //             topic: i.topic,
    //             content: i.content,
    //             grammarid: grammar.id
    //         })
    //     });
    // }
    return res.json({ grammar });
  }
  async getAll(req, res) {
    const grammars = await Grammar.findAll();
    return res.json(grammars);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const grammar = await Grammar.findOne({ where: { id } });
    return res.json(grammar);
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Grammar.destroy({ where: { id } });
      return res.json('deleted');
    } catch (e) {
      next(e.message);
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const grammar = await Grammar.findOne({ where: { id } });
      if (grammar) {
        await grammar.update(req.body);
        return res.json(grammar);
      }
      return res.json('grammar not exists');
    } catch (e) {
      next(e.message);
    }
  }
}

module.exports = new GrammarController();
